import Link from "next/link";
import type { Metadata } from "next";
import CTASection from "@/components/CTASection";
import { BLOG_POSTS } from "@/data/blogPosts";

export const metadata: Metadata = {
  title: "Insights & Engineering Articles",
  description:
    "Practical perspectives on data engineering, low-bandwidth visualization, and custom web architecture from Landometrix.",
};

export default function InsightsPage() {
  return (
    <div className="flex flex-col w-full">
      {/* Header */}
      <section className="pt-16 pb-20 bg-gradient-to-b from-[#EFF6FF] via-[#F8FAFC] to-white dark:from-[#0d255a] dark:via-[#0B1F4B] dark:to-[#0B1F4B] border-b border-slate-200/80 dark:border-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center max-w-4xl">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white dark:bg-slate-800 border border-blue-200 dark:border-slate-700 text-blue-700 dark:text-sky-300 text-xs font-semibold uppercase tracking-wider mb-4 font-mono shadow-2xs">
            Practical Engineering • No Jargon
          </div>
          <h1 className="text-4xl sm:text-5xl font-extrabold text-[#0B1F4B] dark:text-white tracking-tight mb-6 font-[family-name:var(--font-space-grotesk)]">
            Insights &amp; Architectural Notes
          </h1>
          <p className="text-lg sm:text-xl text-slate-700 dark:text-slate-300 leading-relaxed max-w-3xl mx-auto font-normal">
            Essays on moving beyond brittle spreadsheets, engineering for
            emerging market networks, and building data products that teams
            actually love using.
          </p>
        </div>
      </section>

      {/* Articles Grid */}
      <section className="py-20 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        <div className="space-y-8">
          {BLOG_POSTS.map((post) => (
            <article
              key={post.slug}
              className="p-8 sm:p-10 rounded-2xl border border-slate-200/90 dark:border-slate-800 bg-white dark:bg-[#0F172A] shadow-[0_4px_20px_-4px_rgba(11,31,75,0.06)] dark:shadow-none hover:shadow-[0_16px_36px_-6px_rgba(29,78,216,0.1)] hover:border-blue-300 dark:hover:border-blue-700/60 transition-all duration-200 flex flex-col justify-between"
            >
              <div>
                <div className="flex flex-wrap items-center gap-3 text-xs mb-4">
                  <div className="flex gap-1.5">
                    {post.tags.map((tag) => (
                      <span
                        key={tag}
                        className="px-2.5 py-0.5 rounded-md bg-blue-50 text-blue-700 border border-blue-200/60 font-semibold font-mono text-xs dark:bg-slate-800 dark:text-sky-300 dark:border-slate-700"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                  <span className="text-slate-400 font-mono text-[11px]">•</span>
                  <span className="text-slate-500 font-mono text-xs">
                    {post.publishedDate}
                  </span>
                  <span className="text-slate-400 font-mono text-[11px]">•</span>
                  <span className="text-slate-500 font-mono text-xs">
                    {post.readTime}
                  </span>
                </div>

                <h2 className="text-2xl sm:text-3xl font-bold text-[#0B1F4B] dark:text-white mb-4 leading-snug font-[family-name:var(--font-space-grotesk)]">
                  <Link
                    href={`/insights/${post.slug}`}
                    className="hover:text-blue-600 dark:hover:text-sky-400 transition-colors"
                  >
                    {post.title}
                  </Link>
                </h2>

                <p className="text-base text-slate-600 dark:text-slate-300 leading-relaxed mb-6 font-normal">
                  {post.excerpt}
                </p>
              </div>

              <div className="pt-6 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between">
                <div className="text-xs text-slate-500 dark:text-slate-400">
                  By{" "}
                  <span className="font-semibold text-slate-800 dark:text-slate-200">
                    {post.author.name}
                  </span>{" "}
                  ({post.author.title})
                </div>

                <Link
                  href={`/insights/${post.slug}`}
                  className="tap-target inline-flex items-center text-sm font-bold text-blue-600 dark:text-sky-400 hover:underline"
                >
                  Read Article →
                </Link>
              </div>
            </article>
          ))}
        </div>
      </section>

      {/* CTA */}
      <CTASection
        title="Want to discuss how these principles apply to your business?"
        subtitle="Schedule a free 30-minute consultation with our engineering team."
        primaryCtaText="Book a Free Consultation"
      />
    </div>
  );
}
