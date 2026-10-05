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
      <section className="relative pt-16 pb-20 bg-page border-b border-line overflow-hidden">
        {/* Signature data-grid dot texture */}
        <div className="absolute inset-0 bg-dots pointer-events-none opacity-40" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center max-w-4xl relative z-10">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-surface border border-line-highlight text-brand text-xs font-semibold uppercase tracking-wider mb-4 font-mono shadow-sm">
            Practical Engineering • No Jargon
          </div>
          <h1 className="text-4xl sm:text-5xl font-extrabold text-heading tracking-tight mb-6 font-[family-name:var(--font-space-grotesk)]">
            Insights &amp; Architectural Notes
          </h1>
          <p className="text-lg sm:text-xl text-fg-secondary leading-relaxed max-w-3xl mx-auto font-normal">
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
              className="card card-hover p-8 sm:p-10 flex flex-col justify-between"
            >
              <div>
                <div className="flex flex-wrap items-center gap-3 text-xs mb-4">
                  <div className="flex gap-1.5">
                    {post.tags.map((tag) => (
                      <span
                        key={tag}
                        className="px-2.5 py-0.5 rounded-md bg-subtle text-brand border border-line-highlight font-semibold font-mono text-xs"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                  <span className="text-fg-muted font-mono text-[11px]">•</span>
                  <span className="text-fg-muted font-mono text-xs">
                    {post.publishedDate}
                  </span>
                  <span className="text-fg-muted font-mono text-[11px]">•</span>
                  <span className="text-fg-muted font-mono text-xs">
                    {post.readTime}
                  </span>
                </div>

                <h2 className="text-2xl sm:text-3xl font-bold text-heading mb-4 leading-snug font-[family-name:var(--font-space-grotesk)]">
                  <Link
                    href={`/insights/${post.slug}`}
                    className="hover:text-brand transition-colors"
                  >
                    {post.title}
                  </Link>
                </h2>

                <p className="text-base text-fg-secondary leading-relaxed mb-6 font-normal">
                  {post.excerpt}
                </p>
              </div>

              <div className="pt-6 border-t border-line flex items-center justify-between">
                <div className="text-xs text-fg-muted">
                  By{" "}
                  <span className="font-semibold text-heading">
                    {post.author.name}
                  </span>{" "}
                  ({post.author.title})
                </div>

                <Link
                  href={`/insights/${post.slug}`}
                  className="tap-target inline-flex items-center text-sm font-bold text-brand hover:underline"
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
