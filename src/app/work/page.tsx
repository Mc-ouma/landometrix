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
      <section className="pt-16 pb-20 bg-gradient-to-b from-[#EFF6FF] via-[#F8FAFC] to-white dark:from-[#0d255a] dark:via-[#0B1F4B] dark:to-[#0B1F4B] border-b border-slate-200/80 dark:border-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center max-w-4xl">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white dark:bg-slate-800 border border-blue-200 dark:border-slate-700 text-blue-700 dark:text-sky-300 text-xs font-semibold uppercase tracking-wider mb-4 font-mono shadow-2xs">
            Case Studies • Quantifiable Results
          </div>
          <h1 className="text-4xl sm:text-5xl font-extrabold text-[#0B1F4B] dark:text-white tracking-tight mb-6 font-[family-name:var(--font-space-grotesk)]">
            Our Work in Action
          </h1>
          <p className="text-lg sm:text-xl text-slate-700 dark:text-slate-300 leading-relaxed max-w-3xl mx-auto font-normal">
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
              className="bg-white dark:bg-[#0F172A] rounded-2xl border border-slate-200/90 dark:border-slate-800 p-8 flex flex-col justify-between shadow-[0_4px_20px_-4px_rgba(11,31,75,0.06)] dark:shadow-none hover:shadow-[0_16px_36px_-6px_rgba(29,78,216,0.12)] hover:border-blue-300 dark:hover:border-blue-700/60 transition-all duration-200"
            >
              <div>
                <div className="flex items-center justify-between text-xs mb-4">
                  <span className="px-3 py-1 rounded-full bg-blue-50 text-blue-700 border border-blue-200/60 font-semibold font-mono text-xs dark:bg-slate-800 dark:text-sky-300 dark:border-slate-700">
                    {cs.category}
                  </span>
                  <span className="text-slate-400 font-mono text-xs">
                    {cs.publishedDate}
                  </span>
                </div>

                <h2 className="text-2xl font-bold text-[#0B1F4B] dark:text-white mb-2 leading-snug font-[family-name:var(--font-space-grotesk)]">
                  <Link
                    href={`/work/${cs.slug}`}
                    className="hover:text-blue-600 dark:hover:text-sky-400 transition-colors"
                  >
                    {cs.title}
                  </Link>
                </h2>

                <p className="text-xs font-semibold text-slate-500 dark:text-slate-400 mb-4">
                  Client: {cs.client}
                </p>

                <p className="text-sm text-slate-600 dark:text-slate-300 mb-6 leading-relaxed">
                  {cs.overview}
                </p>

                {/* Key Metrics Strip */}
                <div className="grid grid-cols-3 gap-2 p-3.5 bg-[#EFF6FF]/60 dark:bg-slate-900/60 rounded-xl mb-6 border border-blue-100/90 dark:border-slate-800 text-center">
                  {cs.metrics.map((m, i) => (
                    <div key={i}>
                      <div className="text-base font-extrabold text-blue-700 dark:text-sky-400 font-mono">
                        {m.value}
                      </div>
                      <div className="text-[10px] text-slate-600 dark:text-slate-400 font-medium">
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
                      className="text-[11px] px-2.5 py-0.5 rounded bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-400 font-mono border border-slate-200/60 dark:border-slate-700"
                    >
                      {tool}
                    </span>
                  ))}
                </div>

                <Link
                  href={`/work/${cs.slug}`}
                  className="tap-target w-full inline-flex items-center justify-center px-4 py-2.5 rounded-lg border-2 border-blue-600/40 text-blue-700 dark:text-sky-400 hover:bg-blue-600 hover:text-white dark:hover:bg-slate-800 font-bold text-sm transition-all"
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
