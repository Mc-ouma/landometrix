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
      <section className="pt-16 pb-16 bg-gradient-to-b from-[#EFF6FF] via-white to-white dark:from-[#0d255a] dark:via-[#0B1F4B] dark:to-[#0B1F4B] border-b border-slate-100 dark:border-slate-800">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <Link
            href="/insights"
            className="tap-target inline-flex items-center text-xs font-semibold text-blue-600 dark:text-sky-400 hover:underline mb-6 font-mono"
          >
            ← Back to all articles
          </Link>

          <div className="flex flex-wrap items-center gap-2 mb-4 text-xs font-mono">
            {post.tags.map((tag) => (
              <span
                key={tag}
                className="px-2.5 py-0.5 rounded-full bg-blue-100 dark:bg-slate-800 text-blue-800 dark:text-sky-300 font-semibold"
              >
                {tag}
              </span>
            ))}
            <span className="text-slate-400">•</span>
            <span className="text-slate-500">{post.publishedDate}</span>
            <span className="text-slate-400">•</span>
            <span className="text-slate-500">{post.readTime}</span>
          </div>

          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-slate-900 dark:text-white tracking-tight mb-6 leading-tight font-[family-name:var(--font-space-grotesk)]">
            {post.title}
          </h1>

          <div className="flex items-center space-x-3 pt-2 text-xs text-slate-600 dark:text-slate-300">
            <div className="w-9 h-9 rounded-full bg-blue-600 text-white flex items-center justify-center font-bold font-mono">
              LM
            </div>
            <div>
              <div className="font-semibold text-slate-900 dark:text-white">
                {post.author.name}
              </div>
              <div className="text-slate-500 dark:text-slate-400 text-[11px]">
                {post.author.title}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Reading Body */}
      <section className="py-16 max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        {/* Intro Excerpt Callout */}
        <p className="text-lg sm:text-xl text-slate-700 dark:text-slate-200 font-medium leading-relaxed mb-10 pb-8 border-b border-slate-100 dark:border-slate-800">
          {post.excerpt}
        </p>

        {/* Content Sections */}
        <div className="space-y-10 text-slate-700 dark:text-slate-300 leading-relaxed text-base sm:text-lg">
          {post.content.map((section, idx) => (
            <div key={idx} className="space-y-4">
              {section.sectionHeading && (
                <h2 className="text-2xl font-bold text-slate-900 dark:text-white pt-4 font-[family-name:var(--font-space-grotesk)]">
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
        <div className="mt-16 pt-8 border-t border-slate-200 dark:border-slate-800 flex items-center space-x-4">
          <div className="w-12 h-12 rounded-full bg-blue-600 text-white flex items-center justify-center font-bold font-mono text-base flex-shrink-0">
            LM
          </div>
          <div>
            <div className="font-bold text-slate-900 dark:text-white text-sm">
              Published by {post.author.name}
            </div>
            <div className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
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
