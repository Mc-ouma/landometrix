import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Privacy Policy | Transparent Data Handling",
  description: "Read how Landometrix IT Solutions protects client data, respects visitor privacy, and uses privacy-first analytics.",
};

export default function PrivacyPage() {
  return (
    <div className="py-16 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="bg-white dark:bg-[#0F172A] rounded-3xl border border-slate-200/90 dark:border-slate-800 p-8 sm:p-12 shadow-sm ring-1 ring-slate-900/5">
        <div className="mb-10 pb-8 border-b border-slate-200 dark:border-slate-800">
          <h1 className="text-3xl sm:text-4xl font-extrabold text-[#0B1F4B] dark:text-white tracking-tight mb-2 font-[family-name:var(--font-space-grotesk)]">
            Privacy Policy
          </h1>
          <p className="text-xs text-slate-500 font-mono">
            Last updated: October 2026 • Landometrix IT Solutions
          </p>
        </div>

        <div className="space-y-8 text-slate-700 dark:text-slate-300 leading-relaxed text-sm sm:text-base">
          <section className="space-y-3">
            <h2 className="text-xl font-bold text-[#0B1F4B] dark:text-white font-[family-name:var(--font-space-grotesk)]">
              1. Our Privacy Commitment
            </h2>
            <p>
              As a data analytics and engineering agency, Landometrix IT Solutions
              takes data stewardship seriously. We do not sell your personal data,
              we do not run third-party surveillance ad trackers, and we only collect
              the minimum information required to deliver services, respond to
              inquiries, or fulfill contractual agreements.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-xl font-bold text-[#0B1F4B] dark:text-white font-[family-name:var(--font-space-grotesk)]">
              2. Information We Collect
            </h2>
            <p>
              <strong>Inquiry Information:</strong> When you submit a consultation request
              or contact form, we collect your name, email address, company name, and the
              description of your challenge.
            </p>
            <p>
              <strong>Privacy-Friendly Analytics:</strong> We use privacy-first analytics
              (such as Plausible or Umami) that do not use intrusive persistent tracking cookies,
              do not track you across other websites, and anonymize IP addresses. This helps us
              understand page popularity and aggregated website performance without profiling individuals.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-xl font-bold text-[#0B1F4B] dark:text-white font-[family-name:var(--font-space-grotesk)]">
              3. Client Data &amp; Non-Disclosure
            </h2>
            <p>
              When engaged for data analytics, visualization, or custom software projects, all
              client datasets, database credentials, schemas, and proprietary metrics are
              governed by rigorous non-disclosure agreements (NDAs). Client data is stored in
              encrypted environments and never reused, repurposed, or exposed to third parties.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-xl font-bold text-[#0B1F4B] dark:text-white font-[family-name:var(--font-space-grotesk)]">
              4. Contact Us
            </h2>
            <p>
              If you have questions regarding this Privacy Policy or wish to have your contact
              inquiry removed from our records, email us directly at{" "}
              <a
                href="mailto:privacy@landometrix.com"
                className="text-blue-600 dark:text-sky-400 font-semibold hover:underline"
              >
                privacy@landometrix.com
              </a>{" "}
              or write to Landometrix IT Solutions, Nairobi, Kenya.
            </p>
          </section>
        </div>

        <div className="mt-12 pt-8 border-t border-slate-200 dark:border-slate-800">
          <Link
            href="/"
            className="tap-target inline-flex items-center text-sm font-semibold text-blue-600 dark:text-sky-400 hover:underline"
          >
            ← Return to Homepage
          </Link>
        </div>
      </div>
    </div>
  );
}
