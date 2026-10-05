import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Terms of Service | Transparent Engineering Standards",
  description: "Terms and conditions governing consulting engagements, code ownership, and services provided by Landometrix IT Solutions.",
};

export default function TermsPage() {
  return (
    <div className="py-16 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="bg-white dark:bg-[#0F172A] rounded-3xl border border-slate-200/90 dark:border-slate-800 p-8 sm:p-12 shadow-sm ring-1 ring-slate-900/5">
        <div className="mb-10 pb-8 border-b border-slate-200 dark:border-slate-800">
          <h1 className="text-3xl sm:text-4xl font-extrabold text-[#0B1F4B] dark:text-white tracking-tight mb-2 font-[family-name:var(--font-space-grotesk)]">
            Terms of Service
          </h1>
          <p className="text-xs text-slate-500 font-mono">
            Last updated: October 2026 • Landometrix IT Solutions
          </p>
        </div>

        <div className="space-y-8 text-slate-700 dark:text-slate-300 leading-relaxed text-sm sm:text-base">
          <section className="space-y-3">
            <h2 className="text-xl font-bold text-[#0B1F4B] dark:text-white font-[family-name:var(--font-space-grotesk)]">
              1. Scope of Engagement
            </h2>
            <p>
              Landometrix IT Solutions delivers professional data analytics, data
              visualization, and custom web software services. All client engagements
              are governed by an agreed Statement of Work (SOW) specifying deliverables,
              milestones, sprint timelines, and acceptance criteria.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-xl font-bold text-[#0B1F4B] dark:text-white font-[family-name:var(--font-space-grotesk)]">
              2. Code Ownership &amp; Intellectual Property
            </h2>
            <p>
              Upon settlement of final project invoices, clients receive 100% ownership
              of custom codebases, database models, dashboards, and assets developed
              specifically for their project. Landometrix does not enforce proprietary
              vendor lock-in.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-xl font-bold text-[#0B1F4B] dark:text-white font-[family-name:var(--font-space-grotesk)]">
              3. Accuracy &amp; Client Data Warranties
            </h2>
            <p>
              Our analytics and visualization pipelines are constructed following rigorous
              engineering standards. However, predictive forecasts and operational models
              depend on the integrity and timeliness of data inputs provided by the client.
              Clients retain responsibility for verifying operational business decisions.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-xl font-bold text-[#0B1F4B] dark:text-white font-[family-name:var(--font-space-grotesk)]">
              4. Jurisdiction &amp; Governing Law
            </h2>
            <p>
              These terms and related agreements shall be governed by and construed in
              accordance with the laws of Kenya, without prejudice to international
              arbitration standards for overseas engagements.
            </p>
          </section>
        </div>

        <div className="mt-12 pt-8 border-t border-slate-200 dark:border-slate-800">
          <Link
            href="/"
            className="tap-target inline-flex items-center text-sm font-semibold text-blue-600 dark:text-sky-400 hover:underline"
          >
            ← Return to Homepage
          </Link>
        </div>
      </div>
    </div>
  );
}
