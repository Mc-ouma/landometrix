import Link from "next/link";
import type { Metadata } from "next";
import CTASection from "@/components/CTASection";
import { SERVICES_DATA } from "@/data/services";

export const metadata: Metadata = {
  title: "Services | Data Analytics, Visualization & Web Development",
  description:
    "Explore Landometrix core services: End-to-end Data Analytics, Low-Bandwidth Data Visualization, and Custom Web Products engineered for high performance.",
};

export default function ServicesPage() {
  return (
    <div className="flex flex-col w-full">
      {/* Hero Header */}
      <section className="relative pt-16 pb-20 bg-page border-b border-line overflow-hidden">
        {/* Signature data-grid dot texture */}
        <div className="absolute inset-0 bg-dots pointer-events-none opacity-40" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center max-w-4xl relative z-10">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-surface border border-line-highlight text-brand text-xs font-semibold uppercase tracking-wider mb-4 font-mono shadow-sm">
            Clear Deliverables • Fixed Sprints • Measurable ROI
          </div>
          <h1 className="text-4xl sm:text-5xl font-extrabold text-heading tracking-tight mb-6 font-[family-name:var(--font-space-grotesk)]">
            Services engineered to turn data into business momentum
          </h1>
          <p className="text-lg sm:text-xl text-fg-secondary leading-relaxed max-w-3xl mx-auto font-normal">
            Whether you need to untangle disparate operational records, build a
            blazing-fast executive dashboard, or launch a custom web portal, we
            deliver with speed, precision, and zero bloated retainers.
          </p>
        </div>
      </section>

      {/* Services In-Depth Sections */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 space-y-20">
        {SERVICES_DATA.map((srv, index) => (
          <section
            key={srv.id}
            id={srv.id}
            className="scroll-mt-28 p-8 sm:p-12 card shadow-md"
          >
            <div className="flex flex-col lg:flex-row gap-12 items-start justify-between">
              {/* Left Column: Overview, Target Audience, and Tools */}
              <div className="lg:w-7/12 space-y-6">
                <div className="inline-flex items-center space-x-3">
                  <div className="w-12 h-12 rounded-xl bg-subtle text-brand border border-line flex items-center justify-center">
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
                  <div>
                    <span className="text-xs font-mono font-bold text-brand uppercase tracking-wider">
                      Service 0{index + 1}
                    </span>
                    <h2 className="text-2xl sm:text-3xl font-extrabold text-heading font-[family-name:var(--font-space-grotesk)]">
                      {srv.title}
                    </h2>
                  </div>
                </div>

                <p className="text-lg font-semibold text-brand leading-snug">
                  {srv.headline}
                </p>

                <p className="text-fg-secondary leading-relaxed text-sm sm:text-base">
                  {srv.shortDescription}
                </p>

                {/* Who It's For */}
                <div className="bg-subtle p-5 rounded-2xl border border-line">
                  <h3 className="text-xs font-bold uppercase tracking-wider text-fg-muted font-mono mb-2">
                    Who This Is For
                  </h3>
                  <p className="text-sm text-fg leading-relaxed">
                    {srv.targetAudience}
                  </p>
                </div>

                {/* Tools & Typical Timeline */}
                <div className="flex flex-wrap items-center gap-6 pt-2 text-xs font-mono">
                  <div>
                    <span className="text-fg-muted block mb-1">TECH &amp; TOOLS</span>
                    <div className="flex flex-wrap gap-1.5">
                      {srv.toolsUsed.map((tool) => (
                        <span
                          key={tool}
                          className="px-2.5 py-1 rounded-md bg-surface text-fg-secondary font-semibold border border-line"
                        >
                          {tool}
                        </span>
                      ))}
                    </div>
                  </div>
                  <div>
                    <span className="text-fg-muted block mb-1">TYPICAL TIMELINE</span>
                    <span className="font-bold text-heading">
                      {srv.typicalTimeline}
                    </span>
                  </div>
                </div>
              </div>

              {/* Right Column: Deliverables, Outcomes, and CTA */}
              <div className="lg:w-5/12 w-full space-y-6 bg-subtle p-6 sm:p-8 rounded-2xl border border-line shadow-xs">
                <div>
                  <h3 className="text-xs font-bold uppercase tracking-wider text-brand font-mono mb-3">
                    What We Deliver
                  </h3>
                  <ul className="space-y-2.5 text-sm text-fg">
                    {srv.deliverables.map((deliv, i) => (
                      <li key={i} className="flex items-start">
                        <span className="text-brand mr-2 font-black">
                          •
                        </span>
                        <span>{deliv}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="pt-4 border-t border-line">
                  <h3 className="text-xs font-bold uppercase tracking-wider text-emerald-600 dark:text-emerald-400 font-mono mb-3">
                    Typical Client Outcomes
                  </h3>
                  <ul className="space-y-2 text-sm text-fg">
                    {srv.outcomes.map((outc, i) => (
                      <li key={i} className="flex items-start">
                        <span className="text-emerald-600 dark:text-emerald-400 mr-2 font-bold">✓</span>
                        <span className="font-medium">{outc}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="pt-4">
                  <Link
                    href={`/contact?service=${srv.slug}`}
                    className="btn-primary w-full text-center text-sm shadow-sm"
                  >
                    Request a Quote for {srv.title}
                  </Link>
                </div>
              </div>
            </div>
          </section>
        ))}
      </div>

      {/* Final Reassurance & CTA */}
      <CTASection
        title="Not sure which service fits your exact bottleneck?"
        subtitle="Book a free consultation call. We will review your current systems, files, and priorities and recommend the leanest, most cost-effective path forward."
        primaryCtaText="Book a Free Consultation"
      />
    </div>
  );
}
