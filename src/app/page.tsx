import Link from "next/link";
import DataShowcase from "@/components/DataShowcase";
import CTASection from "@/components/CTASection";
import { SERVICES_DATA } from "@/data/services";
import { CASE_STUDIES } from "@/data/caseStudies";

export default function Home() {
  return (
    <div className="flex flex-col w-full">
      {/* ============================================================ */}
      {/* 1. HERO SECTION                                              */}
      {/* ============================================================ */}
      <section className="relative pt-16 pb-20 md:pt-24 md:pb-28 overflow-hidden bg-page">
        {/* Signature data-grid dot texture */}
        <div className="absolute inset-0 bg-dots pointer-events-none opacity-40" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center max-w-4xl mx-auto">
            {/* Origin & Positioning Badge */}
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-surface border border-line-highlight text-brand text-xs font-semibold uppercase tracking-wider mb-6 shadow-sm">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
              Nairobi, Kenya • Serving Local &amp; Global Clients
            </div>

            {/* Primary Headline */}
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-heading leading-[1.12] mb-6 font-[family-name:var(--font-space-grotesk)]">
              Turn messy data into{" "}
              <span className="text-brand underline decoration-sky-accent/60 underline-offset-8">
                decisive action.
              </span>
            </h1>

            {/* Supporting Sentence */}
            <p className="text-lg sm:text-xl text-fg-secondary max-w-3xl mx-auto mb-10 leading-relaxed font-normal">
              Landometrix helps businesses, startups, and NGOs across Kenya and
              worldwide transform scattered spreadsheets and databases into clear
              dashboards, predictive insights, and custom web applications.
            </p>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-16">
              <Link
                href="/contact"
                className="btn-primary text-base px-8 py-3.5 shadow-md"
              >
                Book a Free Consultation
                <svg
                  className="w-5 h-5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M14 5l7 7m0 0l-7 7m7-7H3"
                  />
                </svg>
              </Link>
              <Link
                href="/work"
                className="tap-target w-full sm:w-auto inline-flex items-center justify-center px-7 py-3.5 rounded-xl border border-line-strong bg-surface text-fg hover:border-line-highlight font-semibold text-base transition-all shadow-sm"
              >
                See Case Studies
              </Link>
            </div>
          </div>

          {/* Signature Feature: Interactive Data Visualization Showcase */}
          <div className="max-w-5xl mx-auto">
            <DataShowcase />
          </div>
        </div>
      </section>

      {/* ============================================================ */}
      {/* 2. SERVICES OVERVIEW                                         */}
      {/* ============================================================ */}
      <section className="py-24 bg-page border-t border-line">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-xs font-bold uppercase tracking-widest text-brand mb-2 font-mono">
              Core Capabilities
            </h2>
            <h3 className="text-3xl sm:text-4xl font-extrabold text-heading font-[family-name:var(--font-space-grotesk)]">
              Three focused services. Zero fluff.
            </h3>
            <p className="mt-4 text-base sm:text-lg text-fg-secondary">
              We don&apos;t build generic websites or produce unreadable 80-page slide
              decks. We build what directly impacts your bottom line.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {SERVICES_DATA.map((srv) => (
              <div
                key={srv.id}
                className="card card-hover p-8 flex flex-col justify-between"
              >
                <div>
                  <div className="w-12 h-12 rounded-xl bg-subtle text-brand border border-line flex items-center justify-center mb-6">
                    <svg
                      className="w-6 h-6"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d={srv.iconSvg}
                      />
                    </svg>
                  </div>
                  <h4 className="text-xl font-bold text-heading mb-3 font-[family-name:var(--font-space-grotesk)]">
                    {srv.title}
                  </h4>
                  <p className="text-sm text-fg-secondary leading-relaxed mb-6">
                    {srv.shortDescription}
                  </p>
                  <div className="border-t border-line pt-4 mb-6">
                    <div className="text-xs font-semibold text-fg-muted uppercase tracking-wider mb-2 font-mono">
                      Typical Outcomes:
                    </div>
                    <ul className="space-y-1.5 text-xs text-fg">
                      {srv.outcomes.map((outc, i) => (
                        <li key={i} className="flex items-start">
                          <span className="text-emerald-600 dark:text-emerald-400 mr-2 font-bold">✓</span>
                          <span>{outc}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                <Link
                  href={`/services#${srv.id}`}
                  className="tap-target inline-flex items-center text-sm font-semibold text-brand hover:underline pt-2"
                >
                  Explore {srv.title} details →
                </Link>
              </div>
            ))}
          </div>

          <div className="mt-12 text-center">
            <Link
              href="/services"
              className="inline-flex items-center text-sm font-semibold text-fg-secondary hover:text-brand"
            >
              Compare deliverables, tools &amp; timelines on our Services Page →
            </Link>
          </div>
        </div>
      </section>

      {/* ============================================================ */}
      {/* 3. FEATURED CASE STUDIES                                     */}
      {/* ============================================================ */}
      <section className="py-24 bg-page border-t border-line">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-12">
            <div>
              <h2 className="text-xs font-bold uppercase tracking-widest text-brand mb-2 font-mono">
                Proven Track Record
              </h2>
              <h3 className="text-3xl sm:text-4xl font-extrabold text-heading font-[family-name:var(--font-space-grotesk)]">
                Real problems. Quantifiable results.
              </h3>
            </div>
            <Link
              href="/work"
              className="mt-4 md:mt-0 inline-flex items-center text-sm font-semibold text-brand hover:underline"
            >
              View all case studies →
            </Link>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {CASE_STUDIES.map((cs) => (
              <div
                key={cs.slug}
                className="card card-hover p-8 flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between text-xs mb-3">
                    <span className="px-3 py-1 rounded-full bg-subtle text-brand border border-line-highlight font-semibold font-mono text-xs">
                      {cs.category}
                    </span>
                    <span className="text-fg-muted font-mono text-[11px]">
                      {cs.publishedDate}
                    </span>
                  </div>

                  <h4 className="text-xl font-bold text-heading mb-2 leading-snug font-[family-name:var(--font-space-grotesk)]">
                    <Link
                      href={`/work/${cs.slug}`}
                      className="hover:text-brand transition-colors"
                    >
                      {cs.title}
                    </Link>
                  </h4>

                  <p className="text-xs font-semibold text-fg-muted mb-4">
                    Client: {cs.client}
                  </p>

                  <p className="text-sm text-fg-secondary mb-6 leading-relaxed">
                    {cs.overview}
                  </p>

                  {/* Highlights Grid */}
                  <div className="grid grid-cols-2 gap-3 p-3.5 bg-subtle rounded-xl mb-6 border border-line">
                    {cs.metrics.slice(0, 2).map((m, i) => (
                      <div key={i}>
                        <div className="text-xl font-black text-brand font-mono">
                          {m.value}
                        </div>
                        <div className="text-[11px] font-medium text-fg-muted">
                          {m.label}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="pt-4 border-t border-line flex items-center justify-between">
                  <div className="flex flex-wrap gap-1.5">
                    {cs.toolsUsed.slice(0, 3).map((tool) => (
                      <span
                        key={tool}
                        className="text-[10px] px-2 py-0.5 rounded bg-surface text-fg-muted font-mono border border-line"
                      >
                        {tool}
                      </span>
                    ))}
                  </div>
                  <Link
                    href={`/work/${cs.slug}`}
                    className="tap-target inline-flex items-center text-xs font-bold text-brand hover:underline"
                  >
                    Read Story →
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ============================================================ */}
      {/* 4. THREE-STEP PROCESS                                        */}
      {/* ============================================================ */}
      <section className="py-24 bg-page border-t border-line">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-xs font-bold uppercase tracking-widest text-brand mb-2 font-mono">
              How We Work
            </h2>
            <h3 className="text-3xl sm:text-4xl font-extrabold text-heading font-[family-name:var(--font-space-grotesk)]">
              From audit to hand-off in 3 simple phases
            </h3>
            <p className="mt-4 text-base sm:text-lg text-fg-secondary">
              No endless committees or hidden scope creep. We operate in tight,
              transparent sprints with clear weekly deliverables.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 relative">
            {/* Step 1 */}
            <div className="card card-hover p-8 relative">
              <span className="text-5xl font-black text-brand/20 font-mono mb-4 block">
                01
              </span>
              <h4 className="text-xl font-bold text-heading mb-3 font-[family-name:var(--font-space-grotesk)]">
                Audit &amp; Isolate Bottlenecks
              </h4>
              <p className="text-sm text-fg-secondary leading-relaxed mb-4">
                We review your actual raw files, database exports, and manual
                touchpoints. We find where calculations break, where time is lost,
                and what decision needs to be made faster.
              </p>
              <div className="inline-block px-3 py-1 rounded-md bg-subtle text-brand border border-line-highlight font-mono font-semibold text-xs">
                Timeline: Week 1
              </div>
            </div>

            {/* Step 2 */}
            <div className="card card-hover p-8 relative">
              <span className="text-5xl font-black text-brand/20 font-mono mb-4 block">
                02
              </span>
              <h4 className="text-xl font-bold text-heading mb-3 font-[family-name:var(--font-space-grotesk)]">
                Clean, Model &amp; Build
              </h4>
              <p className="text-sm text-fg-secondary leading-relaxed mb-4">
                We structure an automated ingestion pipeline, construct predictive
                models, and build the custom web dashboard or application with
                sub-second mobile responsiveness.
              </p>
              <div className="inline-block px-3 py-1 rounded-md bg-subtle text-brand border border-line-highlight font-mono font-semibold text-xs">
                Timeline: Weeks 2–4
              </div>
            </div>

            {/* Step 3 */}
            <div className="card card-hover p-8 relative">
              <span className="text-5xl font-black text-brand/20 font-mono mb-4 block">
                03
              </span>
              <h4 className="text-xl font-bold text-heading mb-3 font-[family-name:var(--font-space-grotesk)]">
                Deploy, Train &amp; Empower
              </h4>
              <p className="text-sm text-fg-secondary leading-relaxed mb-4">
                We deploy to secure edge infrastructure, connect automated alerts,
                and train your team. You receive 100% code ownership and clear
                documentation for complete self-reliance.
              </p>
              <div className="inline-block px-3 py-1 rounded-md bg-subtle text-brand border border-line-highlight font-mono font-semibold text-xs">
                Timeline: Week 5 &amp; Beyond
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ============================================================ */}
      {/* 5. TESTIMONIALS                                              */}
      {/* ============================================================ */}
      <section className="py-24 bg-page border-t border-line">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-xs font-bold uppercase tracking-widest text-brand mb-2 font-mono">
              Client Feedback
            </h2>
            <h3 className="text-3xl sm:text-4xl font-extrabold text-heading font-[family-name:var(--font-space-grotesk)]">
              Trusted by leaders who value clarity
            </h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="card card-hover p-8 flex flex-col justify-between">
              <div className="text-brand/30 text-4xl font-serif mb-2 font-bold">“</div>
              <p className="text-base text-fg leading-relaxed italic mb-6">
                &ldquo;Before Landometrix, our warehouse dispatchers waited 48 hours
                for manual spreadsheets from regional farms. The pipeline they built
                cut wastage by 38% and gave us live numbers right on our phones.&rdquo;
              </p>
              <div>
                <div className="font-bold text-heading text-base">
                  Josephine Kariuki
                </div>
                <div className="text-xs text-fg-muted">
                  Head of Operations, KilimoTrack
                </div>
              </div>
            </div>

            <div className="card card-hover p-8 flex flex-col justify-between">
              <div className="text-brand/30 text-4xl font-serif mb-2 font-bold">“</div>
              <p className="text-base text-fg leading-relaxed italic mb-6">
                &ldquo;Standard BI tools crashed on our mobile connections.
                Landometrix built an SVG dashboard that loads in under 500ms and
                lets our on-call engineers spot payment route errors in minutes instead
                of hours.&rdquo;
              </p>
              <div>
                <div className="font-bold text-heading text-base">
                  Samuel Ndung&apos;u
                </div>
                <div className="text-xs text-fg-muted">
                  VP Engineering, NuruPay
                </div>
              </div>
            </div>

            <div className="card card-hover p-8 flex flex-col justify-between">
              <div className="text-brand/30 text-4xl font-serif mb-2 font-bold">“</div>
              <p className="text-base text-fg leading-relaxed italic mb-6">
                &ldquo;Our quarterly donor reporting used to take 3 weeks of manual
                assembly. The impact portal Landometrix delivered automated the
                entire process and gave our international funders complete confidence.&rdquo;
              </p>
              <div>
                <div className="font-bold text-heading text-base">
                  Dr. Amina Abdi
                </div>
                <div className="text-xs text-fg-muted">
                  Executive Director, AfyaTrust
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ============================================================ */}
      {/* 6. FINAL CTA BAND (Navy contrast moment)                     */}
      {/* ============================================================ */}
      <CTASection />
    </div>
  );
}
