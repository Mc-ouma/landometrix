You are a senior web designer and front-end developer. Build a professional, modern, unique marketing website for Landometrix IT Solutions, an agency offering data analytics, data visualization, and web development services. The agency is based in Kenya and serves clients locally and internationally.

## Goal
Convert visitors into leads. The primary call to action is "Book a free consultation" or "Request a quote", and it should be visible on every page.

## Audience
Small and mid-sized businesses, startups, NGOs, and agencies that need to turn raw data into decisions and need a reliable web presence. Visitors are often on mobile and on variable connections.

## Positioning
Landometrix turns messy data into clear decisions and builds the web products to deliver them. Write a sharp one-line headline around this idea (offer 3 options), followed by a short supporting sentence. Avoid generic phrases like "innovative solutions" or "cutting-edge technology".

## Tech stack
- Astro + TypeScript + Tailwind CSS (Tailwind configured with CSS-variable design tokens).
- Content collections (Markdown/MDX) for case studies and blog posts, so adding one means adding a file.
- D3 or Observable Plot for the visualization showcase, loaded as an Astro island so the rest of the site ships minimal JavaScript.
- Hosting: Cloudflare Pages. Contact form handled by a Cloudflare Pages Function that sends email via Resend, with a honeypot field and Cloudflare Turnstile for spam protection.
- Privacy-friendly analytics (Plausible or Umami) with event tracking on CTA clicks and form submissions.
- Briefly justify any deviation from this stack.

## Logo and brand assets
- The logo is a monochrome "LM" monogram provided as `logo.svg` (place at /public/logo.svg and inline it in the header and footer component). If the file is not provided, use the starter SVG below.
- The logo must be single-color and use `currentColor`, so it renders dark navy on light backgrounds, white on dark mode and on the blue hero, and works at small sizes.
- Derive from it: favicon (SVG plus PNG fallbacks), apple-touch-icon, and an Open Graph share image (1200x630) using the logo on the brand blue.
- Pair the logo with the wordmark "Landometrix" in the heading font. Provide a horizontal lockup and an icon-only version.
- Keep clear space around the logo of at least the height of the "L" stem, and never recolor it outside the palette below.

Starter logo.svg:

<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 72 56" fill="none" stroke="currentColor" stroke-width="7" stroke-linecap="square" stroke-linejoin="miter" role="img" aria-label="Landometrix LM logo">
  <path d="M8 6V50H24"/>
  <path d="M34 50V6L50 30L66 6V50"/>
</svg>

## Pages and structure
1. Home: hero with headline, subhead, primary CTA, and a live or animated data-visualization element; a short services overview; 3 featured case studies; a 3-step process; testimonials; a final CTA band.
2. Services: separate sections for Data Analytics, Data Visualization, and Web Development. For each: who it's for, what's delivered, typical outcomes, and a CTA.
3. Work / Case studies: problem, approach, result (with real or realistic metrics), and tools used. Use placeholder content clearly marked for replacement.
4. About: the story, values, team, and credentials.
5. Insights (blog): 3 starter article templates and a clean reading layout.
6. Contact: a short form (name, email, company, service of interest, message), email, phone, WhatsApp link, and location. Validate inputs and show clear success and error states.
7. Custom 404 page with personality.
8. Privacy policy and terms pages.

## Signature feature (do this exceptionally well)
An interactive data-visualization showcase: a section where visitors can switch between sample datasets or chart types (bar, line, map) and see them animate. This should demonstrate the agency's skill directly. Keep it lightweight and accessible, with a text or table alternative for screen readers. Consider echoing the peaks of the M in the logo as a recurring motif in the chart styling.

## Visual identity
- Modern, clean, confident. Generous whitespace and a blue-led palette:
  - Primary blue: #1D4ED8
  - Deep navy (headings, dark mode base): #0B1F4B
  - Sky accent (use sparingly for highlights, chart emphasis, hover states): #38BDF8
  - Light tint (section backgrounds): #EFF6FF
  - Slate neutrals: #0F172A, #475569, #E2E8F0
  Verify all text and UI combinations meet WCAG AA contrast, and adjust shades if needed, documenting any changes.
- Typography: Space Grotesk or Sora for headings, Inter for body text (Google Fonts, self-hosted or preconnected, with fallbacks). Define a type scale.
- Consistent components: buttons, cards, forms, and navigation share one design language. Use design tokens (CSS variables).
- Light and dark mode, with the logo adapting automatically.
- Imagery: no generic stock-photo look. Use custom SVG illustrations, abstract data-inspired graphics, and clearly marked slots for real photography of the team and work.

## Voice and content
Plain, confident, human. Speak directly to the client's problem, use specifics (timelines, deliverables, outcomes), and show personality. Write all real copy for every page, with placeholders only for facts I must supply (client names, metrics, team bios). Microcopy on buttons, forms, and errors should be thoughtful and on-brand.

## Navigation and UX
Short, predictable top menu (Home, Services, Work, About, Insights, Contact) with the logo on the left and a highlighted CTA button on the right. Sticky header, clear footer with links, contact details, and social icons. Every page has one obvious next step.

## Technical requirements
- Mobile-first and fully responsive, tested at 360px, 768px, 1024px, and 1440px. Tap targets of at least 44px.
- Performance: target Lighthouse 90+ on all categories. Compress and lazy-load images, use modern formats, minimize render-blocking scripts, and keep total page weight low for slower mobile connections.
- Accessibility: WCAG 2.1 AA. Semantic HTML, a logical heading hierarchy, alt text, visible focus states, keyboard navigation, sufficient contrast, and respect for prefers-reduced-motion.
- SEO: unique titles and meta descriptions per page, Open Graph and Twitter cards, structured data (Organization with logo, and Service), sitemap.xml, robots.txt, and clean URLs.
- Trust: HTTPS-ready, visible contact details, privacy and cookie notice, and a testimonials section.
- Code: clean, commented, maintainable. Keep content easy to edit, with a simple structure for adding case studies and blog posts.

## Restraint
Be distinctive in branding, copy, and the one signature feature, but keep navigation, forms, and layouts familiar. Do not add gimmicks that hurt speed or clarity.

## Deliverables
1. A short design rationale (palette, typography, logo usage, layout decisions).
2. The complete website code, organized by file, including /public/logo.svg and the derived favicon and share-image assets.
3. A checklist of placeholders I need to replace.
4. Deployment instructions for Cloudflare Pages and a post-launch checklist (analytics, Search Console, form testing, performance audit).

Before building, state any assumptions you're making in a few lines. Ask at most one clarifying question only if something essential is missing, otherwise proceed.
