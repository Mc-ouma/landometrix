import Link from "next/link";
import type { Metadata } from "next";
import CTASection from "@/components/CTASection";
import { CASE_STUDIES } from "@/data/caseStudies";

export const metadata: Metadata = {
  title: "Work & Case Studies | Proven Client Outcomes",
  description:
    "See how Landometrix IT Solutions solves operational data bottlenecks, builds custom visual dashboards, and launches scalable web platforms.",
};

export default function WorkPage() {
  return (
    <div className="flex flex-col w-full">
      {/* Header */}
      <section className="relative pt-16 pb-20 bg-page border-b border-line overflow-hidden">
        {/* Signature data-grid dot texture */}
        <div className="absolute inset-0 bg-dots pointer-events-none opacity-40" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center max-w-4xl relative z-10">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-surface border border-line-highlight text-brand text-xs font-semibold uppercase tracking-wider mb-4 font-mono shadow-sm">
            Case Studies • Quantifiable Results
          </div>
          <h1 className="text-4xl sm:text-5xl font-extrabold text-heading tracking-tight mb-6 font-[family-name:var(--font-space-grotesk)]">
            Our Work in Action
          </h1>
          <p className="text-lg sm:text-xl text-fg-secondary leading-relaxed max-w-3xl mx-auto font-normal">
            Explore how we partner with companies and NGOs to turn chaotic
            operational spreadsheets into fast, reliable software and verified
            insights.
          </p>
        </div>
      </section>

      {/* Case Studies Grid */}
      <section className="py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {CASE_STUDIES.map((cs) => (
            <div
              key={cs.slug}
              className="card card-hover p-8 flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between text-xs mb-4">
                  <span className="px-3 py-1 rounded-full bg-subtle text-brand border border-line-highlight font-semibold font-mono text-xs">
                    {cs.category}
                  </span>
                  <span className="text-fg-muted font-mono text-xs">
                    {cs.publishedDate}
                  </span>
                </div>

                <h2 className="text-2xl font-bold text-heading mb-2 leading-snug font-[family-name:var(--font-space-grotesk)]">
                  <Link
                    href={`/work/${cs.slug}`}
                    className="hover:text-brand transition-colors"
                  >
                    {cs.title}
                  </Link>
                </h2>

                <p className="text-xs font-semibold text-fg-muted mb-4">
                  Client: {cs.client}
                </p>

                <p className="text-sm text-fg-secondary mb-6 leading-relaxed">
                  {cs.overview}
                </p>

                {/* Key Metrics Strip */}
                <div className="grid grid-cols-3 gap-2 p-3.5 bg-subtle rounded-xl mb-6 border border-line text-center">
                  {cs.metrics.map((m, i) => (
                    <div key={i}>
                      <div className="text-base font-extrabold text-brand font-mono">
                        {m.value}
                      </div>
                      <div className="text-[10px] text-fg-muted font-medium">
                        {m.label}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div>
                <div className="flex flex-wrap gap-1.5 mb-6">
                  {cs.toolsUsed.map((tool) => (
                    <span
                      key={tool}
                      className="text-[11px] px-2.5 py-0.5 rounded bg-surface text-fg-secondary font-mono border border-line"
                    >
                      {tool}
                    </span>
                  ))}
                </div>

                <Link
                  href={`/work/${cs.slug}`}
                  className="tap-target w-full inline-flex items-center justify-center px-4 py-2.5 rounded-lg border border-line-strong bg-surface hover:border-line-highlight text-brand font-bold text-sm transition-all shadow-xs"
                >
                  Read Full Case Study →
                </Link>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Reassurance CTA */}
      <CTASection
        title="Have a similar data or web challenge?"
        subtitle="Book a free 30-minute consultation. We'll examine your specific data structure and outline how we would solve it."
      />
    </div>
  );
}
