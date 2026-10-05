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
      <section className="pt-16 pb-20 bg-gradient-to-b from-[#EFF6FF] via-white to-white dark:from-[#0d255a] dark:via-[#0B1F4B] dark:to-[#0B1F4B] border-b border-slate-100 dark:border-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center max-w-4xl">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 dark:bg-slate-800 border border-blue-200 dark:border-slate-700 text-blue-700 dark:text-sky-300 text-xs font-semibold uppercase tracking-wider mb-4 font-mono">
            Case Studies • Quantifiable Results
          </div>
          <h1 className="text-4xl sm:text-5xl font-extrabold text-slate-900 dark:text-white tracking-tight mb-6 font-[family-name:var(--font-space-grotesk)]">
            Our Work in Action
          </h1>
          <p className="text-lg sm:text-xl text-slate-600 dark:text-slate-300 leading-relaxed max-w-3xl mx-auto">
            Explore how we partner with companies and NGOs to turn chaotic
            operational spreadsheets into fast, reliable software and verified
            insights.
          </p>
        </div>
      </section>

      {/* Case Studies Grid */}
      <section className="py-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {CASE_STUDIES.map((cs) => (
            <div
              key={cs.slug}
              className="bg-white dark:bg-[#0F172A] rounded-2xl border border-slate-200 dark:border-slate-800 p-8 flex flex-col justify-between shadow-sm hover:shadow-md transition-shadow"
            >
              <div>
                <div className="flex items-center justify-between text-xs mb-4">
                  <span className="px-2.5 py-1 rounded bg-blue-50 dark:bg-slate-800 text-blue-700 dark:text-sky-300 font-semibold font-mono">
                    {cs.category}
                  </span>
                  <span className="text-slate-400 font-mono text-xs">
                    {cs.publishedDate}
                  </span>
                </div>

                <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-2 leading-snug font-[family-name:var(--font-space-grotesk)]">
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

                {/* Key Metrics */}
                <div className="grid grid-cols-3 gap-2 p-3 bg-slate-50 dark:bg-slate-900/60 rounded-xl mb-6 border border-slate-100 dark:border-slate-800 text-center">
                  {cs.metrics.map((m, i) => (
                    <div key={i}>
                      <div className="text-base font-extrabold text-blue-600 dark:text-sky-400 font-mono">
                        {m.value}
                      </div>
                      <div className="text-[10px] text-slate-500 dark:text-slate-400 font-medium">
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
                      className="text-[11px] px-2 py-0.5 rounded bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 font-mono"
                    >
                      {tool}
                    </span>
                  ))}
                </div>

                <Link
                  href={`/work/${cs.slug}`}
                  className="tap-target w-full inline-flex items-center justify-center px-4 py-2.5 rounded-lg border border-blue-600 text-blue-600 dark:text-sky-400 hover:bg-blue-50 dark:hover:bg-slate-800 font-semibold text-sm transition-colors"
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
