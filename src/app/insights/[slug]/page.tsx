import { notFound } from "next/navigation";
import Link from "next/link";
import type { Metadata } from "next";
import CTASection from "@/components/CTASection";
import { BLOG_POSTS } from "@/data/blogPosts";

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return BLOG_POSTS.map((post) => ({
    slug: post.slug,
  }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const post = BLOG_POSTS.find((p) => p.slug === slug);
  if (!post) return { title: "Article Not Found" };

  return {
    title: `${post.title} | Insights`,
    description: post.excerpt,
    openGraph: {
      title: `${post.title} | Landometrix Insights`,
      description: post.excerpt,
    },
  };
}

export default async function BlogPostDetailPage({ params }: PageProps) {
  const { slug } = await params;
  const post = BLOG_POSTS.find((p) => p.slug === slug);

  if (!post) {
    notFound();
  }

  return (
    <article className="flex flex-col w-full">
      {/* Header */}
      <section className="relative pt-16 pb-16 bg-page border-b border-line overflow-hidden">
        {/* Signature data-grid dot texture */}
        <div className="absolute inset-0 bg-dots pointer-events-none opacity-40" />

        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <Link
            href="/insights"
            className="tap-target inline-flex items-center text-xs font-semibold text-brand hover:underline mb-6 font-mono"
          >
            ← Back to all articles
          </Link>

          <div className="flex flex-wrap items-center gap-2 mb-4 text-xs font-mono">
            {post.tags.map((tag) => (
              <span
                key={tag}
                className="px-2.5 py-0.5 rounded-full bg-subtle border border-line-highlight text-brand font-semibold"
              >
                {tag}
              </span>
            ))}
            <span className="text-fg-muted">•</span>
            <span className="text-fg-muted">{post.publishedDate}</span>
            <span className="text-fg-muted">•</span>
            <span className="text-fg-muted">{post.readTime}</span>
          </div>

          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-heading tracking-tight mb-6 leading-tight font-[family-name:var(--font-space-grotesk)]">
            {post.title}
          </h1>

          <div className="flex items-center space-x-3 pt-2 text-xs text-fg-secondary">
            <div className="w-9 h-9 rounded-full bg-primary-blue text-white flex items-center justify-center font-bold font-mono shadow-sm">
              LM
            </div>
            <div>
              <div className="font-semibold text-heading">
                {post.author.name}
              </div>
              <div className="text-fg-muted text-[11px]">
                {post.author.title}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Reading Body */}
      <section className="py-16 max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        {/* Intro Excerpt Callout */}
        <div className="card p-6 bg-subtle border border-line-highlight shadow-sm mb-10">
          <p className="text-lg sm:text-xl text-fg font-medium leading-relaxed">
            {post.excerpt}
          </p>
        </div>

        {/* Content Sections */}
        <div className="space-y-10 text-fg-secondary leading-relaxed text-base sm:text-lg">
          {post.content.map((section, idx) => (
            <div key={idx} className="space-y-4">
              {section.sectionHeading && (
                <h2 className="text-2xl font-bold text-heading pt-4 font-[family-name:var(--font-space-grotesk)]">
                  {section.sectionHeading}
                </h2>
              )}
              {section.paragraphs.map((para, pIdx) => (
                <p key={pIdx} className="leading-relaxed">
                  {para}
                </p>
              ))}
            </div>
          ))}
        </div>

        {/* Author Bio Box */}
        <div className="mt-16 card p-6 flex items-center space-x-4 shadow-sm">
          <div className="w-12 h-12 rounded-full bg-primary-blue text-white flex items-center justify-center font-bold font-mono text-base flex-shrink-0 shadow-sm">
            LM
          </div>
          <div>
            <div className="font-bold text-heading text-sm">
              Published by {post.author.name}
            </div>
            <div className="text-xs text-fg-muted mt-0.5">
              Part of Landometrix IT Solutions engineering dispatches from Nairobi, Kenya.
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <CTASection
        title="Have questions about your organization's data architecture?"
        subtitle="Book a free consultation with our team to map out a clear, actionable plan."
        primaryCtaText="Book a Free Consultation"
      />
    </article>
  );
}
