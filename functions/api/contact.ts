// Cloudflare Pages Function: /api/contact
// Automatically recognized by Cloudflare Pages when deployed

interface Env {
  RESEND_API_KEY?: string;
  CONTACT_EMAIL?: string;
}

interface EventContext<E> {
  request: Request;
  env: E;
  params?: Record<string, string | string[]>;
  waitUntil?: (promise: Promise<unknown>) => void;
  next?: (input?: Request | string, init?: RequestInit) => Promise<Response>;
  data?: Record<string, unknown>;
}

export const onRequestPost = async (context: EventContext<Env>): Promise<Response> => {
  try {
    const data = await context.request.json() as {
      name?: string;
      email?: string;
      company?: string;
      service?: string;
      message?: string;
      website_hp?: string;
    };

    // 1. Honeypot verification: reject spam bots silently
    if (data.website_hp && data.website_hp.trim().length > 0) {
      return new Response(
        JSON.stringify({ success: true, note: "Request processed" }),
        { status: 200, headers: { "Content-Type": "application/json" } }
      );
    }

    // 2. Server-side validation
    if (!data.name || !data.email || !data.message) {
      return new Response(
        JSON.stringify({ success: false, error: "Missing required fields" }),
        { status: 400, headers: { "Content-Type": "application/json" } }
      );
    }

    const resendApiKey = context.env?.RESEND_API_KEY;
    const recipientEmail = context.env?.CONTACT_EMAIL || "hello@landometrix.com";

    // 3. Dispatch via Resend if API key is configured
    if (resendApiKey) {
      const resendResponse = await fetch("https://api.resend.com/emails", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${resendApiKey}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          from: "Landometrix Inquiries <inbound@landometrix.com>",
          to: [recipientEmail],
          reply_to: data.email,
          subject: `New Consultation Request: ${data.name} (${data.service || "General"})`,
          text: `
Name: ${data.name}
Email: ${data.email}
Company: ${data.company || "Not provided"}
Service: ${data.service}

Message:
${data.message}
          `.trim(),
        }),
      });

      if (!resendResponse.ok) {
        const errorText = await resendResponse.text();
        console.error("Resend API error:", errorText);
      }
    } else {
      console.info("Simulated email dispatch (RESEND_API_KEY not set):", data);
    }

    return new Response(
      JSON.stringify({ success: true, message: "Inquiry received successfully" }),
      { status: 200, headers: { "Content-Type": "application/json" } }
    );
  } catch (err: unknown) {
    const errorMsg = err instanceof Error ? err.message : "Internal error";
    return new Response(
      JSON.stringify({ success: false, error: errorMsg }),
      { status: 500, headers: { "Content-Type": "application/json" } }
    );
  }
};
