# Landometrix

Landometrix is a Next.js site configured for static export and hosting on
Cloudflare Pages. The contact form is handled by a Pages Function at
`/api/contact`.

## Local development

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Deploy to Cloudflare Pages

1. Push this repository to GitHub or another Git provider supported by Pages.
2. In the Cloudflare dashboard, create a **Pages** project and choose
   **Connect to Git**. Do not create a **Worker** project or configure a
   Wrangler deploy command for this site.
3. Use these build settings:
   - Framework preset: **Next.js (Static HTML Export)**, or **None** if that
     preset is unavailable
   - Build command: `npm run build`
   - Build output directory: `out`
   - Root directory: `/`
4. Add the contact form settings in **Settings → Variables and Secrets** for
   both Production and Preview deployments:
   - `RESEND_API_KEY` — a secret containing the API key from Resend
   - `CONTACT_EMAIL` — the address that should receive inquiries
5. Deploy. Pages serves the static export and automatically discovers the
   `functions/` directory, which provides `POST /api/contact`.
6. To use a custom domain, add it under the Pages project’s **Custom domains**
   settings and follow Cloudflare’s DNS instructions.

The site uses Next.js `output: "export"` in `next.config.ts`, so the build
generates the static site in `out/`. Server-rendered routes and Next.js API
routes are not part of this deployment; dynamic server functionality must be
implemented as Cloudflare Pages Functions. The contact function requires the
Resend settings above to send real email.

### Troubleshooting a Wrangler/OpenNext build failure

The Next.js build should finish with the static files exported to `out/`.
If Cloudflare then runs `npx wrangler deploy` or `opennextjs-cloudflare build`,
the project was set up as a Worker rather than a Pages static-site project.
Remove that Worker deployment configuration and deploy using the Pages
settings above. This app's static export does not produce the standalone
Next.js server files required by OpenNext.
