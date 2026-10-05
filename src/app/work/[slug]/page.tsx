import { notFound } from "next/navigation";
import Link from "next/link";
import type { Metadata } from "next";
import CTASection from "@/components/CTASection";
import { CASE_STUDIES } from "@/data/caseStudies";

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return CASE_STUDIES.map((cs) => ({
    slug: cs.slug,
  }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const cs = CASE_STUDIES.find((item) => item.slug === slug);
  if (!cs) return { title: "Case Study Not Found" };

  return {
    title: `${cs.title} | Case Study`,
    description: cs.overview,
    openGraph: {
      title: `${cs.title} | Landometrix Case Study`,
      description: cs.overview,
    },
  };
}

export default async function CaseStudyDetailPage({ params }: PageProps) {
  const { slug } = await params;
  const cs = CASE_STUDIES.find((item) => item.slug === slug);

  if (!cs) {
    notFound();
  }

  return (
    <article className="flex flex-col w-full">
      {/* Header */}
      <section className="pt-16 pb-16 bg-gradient-to-b from-[#EFF6FF] via-[#F8FAFC] to-white dark:from-[#0d255a] dark:via-[#0B1F4B] dark:to-[#0B1F4B] border-b border-slate-200/80 dark:border-slate-800">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <Link
            href="/work"
            className="tap-target inline-flex items-center text-xs font-semibold text-blue-700 dark:text-sky-400 hover:underline mb-6 font-mono"
          >
            ← Back to all case studies
          </Link>

          <div className="flex flex-wrap items-center gap-3 mb-4 text-xs font-mono">
            <span className="px-3 py-1 rounded-full bg-blue-100 text-blue-800 dark:bg-slate-800 dark:text-sky-300 font-semibold border border-blue-200/60 dark:border-slate-700">
              {cs.category}
            </span>
            <span className="text-slate-400">•</span>
            <span className="text-slate-500 font-mono">{cs.publishedDate}</span>
          </div>

          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-[#0B1F4B] dark:text-white tracking-tight mb-4 font-[family-name:var(--font-space-grotesk)]">
            {cs.title}
          </h1>

          <p className="text-lg sm:text-xl text-slate-700 dark:text-slate-300 leading-relaxed font-medium">
            {cs.tagline}
          </p>

          <div className="mt-6 p-4 rounded-xl bg-amber-50 dark:bg-amber-950/30 border border-amber-200 dark:border-amber-900/50 text-xs text-amber-900 dark:text-amber-300">
            <strong>Placeholder Notice:</strong> Client name &quot;{cs.client}&quot; and specific telemetry metrics are modeled after verified production work and ready for exact client substitution.
          </div>
        </div>
      </section>

      {/* Main Case Study Narrative */}
      <section className="py-16 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 w-full space-y-12">
        {/* Results Metrics Banner */}
        <div className="p-8 rounded-2xl bg-[#EFF6FF] dark:bg-[#0F172A] border border-blue-200/80 dark:border-slate-800 shadow-[0_4px_20px_-4px_rgba(11,31,75,0.06)] dark:shadow-sm">
          <h2 className="text-xs font-bold uppercase tracking-wider text-blue-800 dark:text-sky-400 font-mono mb-6 text-center">
            Verified Outcomes &amp; Impact
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-center">
            {cs.metrics.map((m, i) => (
              <div key={i} className="p-5 rounded-xl bg-white dark:bg-slate-900 border border-blue-100 dark:border-slate-800 shadow-xs">
                <div className="text-3xl font-black text-blue-700 dark:text-sky-400 font-mono mb-1">
                  {m.value}
                </div>
                <div className="text-xs font-bold text-[#0B1F4B] dark:text-white mb-0.5">
                  {m.label}
                </div>
                <div className="text-[11px] text-slate-600 dark:text-slate-400">
                  {m.detail}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* The Problem */}
        <div className="space-y-4">
          <h2 className="text-2xl font-bold text-[#0B1F4B] dark:text-white font-[family-name:var(--font-space-grotesk)]">
            The Problem
          </h2>
          <p className="text-base sm:text-lg text-slate-700 dark:text-slate-300 leading-relaxed">
            {cs.problem}
          </p>
        </div>

        {/* The Approach */}
        <div className="space-y-4">
          <h2 className="text-2xl font-bold text-[#0B1F4B] dark:text-white font-[family-name:var(--font-space-grotesk)]">
            Our Approach &amp; Implementation
          </h2>
          <p className="text-base sm:text-lg text-slate-700 dark:text-slate-300 leading-relaxed">
            {cs.approach}
          </p>
        </div>

        {/* The Result */}
        <div className="space-y-4">
          <h2 className="text-2xl font-bold text-[#0B1F4B] dark:text-white font-[family-name:var(--font-space-grotesk)]">
            The Result
          </h2>
          <p className="text-base sm:text-lg text-slate-700 dark:text-slate-300 leading-relaxed">
            {cs.result}
          </p>
        </div>

        {/* Technologies Used */}
        <div className="pt-6 border-t border-slate-200 dark:border-slate-800">
          <h3 className="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 font-mono mb-3">
            Technology Stack &amp; Infrastructure
          </h3>
          <div className="flex flex-wrap gap-2">
            {cs.toolsUsed.map((tool) => (
              <span
                key={tool}
                className="px-3 py-1.5 rounded-lg bg-slate-100 dark:bg-slate-800 text-slate-800 dark:text-slate-200 font-mono text-xs font-semibold border border-slate-200 dark:border-slate-700"
              >
                {tool}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <CTASection
        title="Achieve similar results for your business"
        subtitle="Book a free consultation with our engineering team to review your current bottlenecks and estimate a project timeline."
        primaryCtaText="Book a Free Consultation"
      />
    </article>
  );
}
