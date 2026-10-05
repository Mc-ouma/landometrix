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
      <section className="pt-16 pb-20 bg-gradient-to-b from-[#EFF6FF] via-[#F8FAFC] to-white dark:from-[#0d255a] dark:via-[#0B1F4B] dark:to-[#0B1F4B] border-b border-slate-200/80 dark:border-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center max-w-4xl">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white dark:bg-slate-800 border border-blue-200 dark:border-slate-700 text-blue-700 dark:text-sky-300 text-xs font-semibold uppercase tracking-wider mb-4 font-mono shadow-2xs">
            Clear Deliverables • Fixed Sprints • Measurable ROI
          </div>
          <h1 className="text-4xl sm:text-5xl font-extrabold text-[#0B1F4B] dark:text-white tracking-tight mb-6 font-[family-name:var(--font-space-grotesk)]">
            Services engineered to turn data into business momentum
          </h1>
          <p className="text-lg sm:text-xl text-slate-700 dark:text-slate-300 leading-relaxed max-w-3xl mx-auto font-normal">
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
            className="scroll-mt-28 p-8 sm:p-12 rounded-3xl border border-slate-200/90 dark:border-slate-800 bg-white dark:bg-[#0F172A] shadow-[0_8px_30px_-6px_rgba(11,31,75,0.06)] dark:shadow-sm"
          >
            <div className="flex flex-col lg:flex-row gap-12 items-start justify-between">
              {/* Left Column: Overview, Target Audience, and Tools */}
              <div className="lg:w-7/12 space-y-6">
                <div className="inline-flex items-center space-x-3">
                  <div className="w-12 h-12 rounded-xl bg-[#EFF6FF] dark:bg-blue-900/40 text-blue-700 dark:text-sky-400 border border-blue-100 dark:border-blue-800 flex items-center justify-center">
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
                    <span className="text-xs font-mono font-bold text-blue-700 dark:text-sky-400 uppercase tracking-wider">
                      Service 0{index + 1}
                    </span>
                    <h2 className="text-2xl sm:text-3xl font-extrabold text-[#0B1F4B] dark:text-white font-[family-name:var(--font-space-grotesk)]">
                      {srv.title}
                    </h2>
                  </div>
                </div>

                <p className="text-lg font-semibold text-blue-900 dark:text-sky-300 leading-snug">
                  {srv.headline}
                </p>

                <p className="text-slate-700 dark:text-slate-300 leading-relaxed text-sm sm:text-base">
                  {srv.shortDescription}
                </p>

                {/* Who It's For */}
                <div className="bg-[#F8FAFC] dark:bg-slate-900/60 p-5 rounded-2xl border border-slate-200/70 dark:border-slate-800">
                  <h3 className="text-xs font-bold uppercase tracking-wider text-slate-600 dark:text-slate-400 font-mono mb-2">
                    Who This Is For
                  </h3>
                  <p className="text-sm text-slate-800 dark:text-slate-300 leading-relaxed">
                    {srv.targetAudience}
                  </p>
                </div>

                {/* Tools & Typical Timeline */}
                <div className="flex flex-wrap items-center gap-6 pt-2 text-xs font-mono">
                  <div>
                    <span className="text-slate-400 block mb-1">TECH &amp; TOOLS</span>
                    <div className="flex flex-wrap gap-1.5">
                      {srv.toolsUsed.map((tool) => (
                        <span
                          key={tool}
                          className="px-2.5 py-1 rounded-md bg-slate-100 dark:bg-slate-800 text-slate-800 dark:text-slate-300 font-semibold border border-slate-200/60 dark:border-slate-700"
                        >
                          {tool}
                        </span>
                      ))}
                    </div>
                  </div>
                  <div>
                    <span className="text-slate-400 block mb-1">TYPICAL TIMELINE</span>
                    <span className="font-bold text-[#0B1F4B] dark:text-slate-200">
                      {srv.typicalTimeline}
                    </span>
                  </div>
                </div>
              </div>

              {/* Right Column: Deliverables, Outcomes, and CTA */}
              <div className="lg:w-5/12 w-full space-y-6 bg-[#EFF6FF]/60 dark:bg-slate-900/50 p-6 sm:p-8 rounded-2xl border border-blue-100 dark:border-slate-800 shadow-[0_4px_16px_rgba(11,31,75,0.03)] dark:shadow-none">
                <div>
                  <h3 className="text-xs font-bold uppercase tracking-wider text-blue-800 dark:text-sky-400 font-mono mb-3">
                    What We Deliver
                  </h3>
                  <ul className="space-y-2.5 text-sm text-slate-800 dark:text-slate-300">
                    {srv.deliverables.map((deliv, i) => (
                      <li key={i} className="flex items-start">
                        <span className="text-blue-700 dark:text-sky-400 mr-2 font-black">
                          •
                        </span>
                        <span>{deliv}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="pt-4 border-t border-blue-200/60 dark:border-slate-800">
                  <h3 className="text-xs font-bold uppercase tracking-wider text-emerald-800 dark:text-emerald-400 font-mono mb-3">
                    Typical Client Outcomes
                  </h3>
                  <ul className="space-y-2 text-sm text-slate-800 dark:text-slate-300">
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
                    className="tap-target w-full inline-flex items-center justify-center px-6 py-3 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-sm transition-all shadow-sm hover:shadow"
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
