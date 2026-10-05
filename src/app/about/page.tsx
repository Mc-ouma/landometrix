import type { Metadata } from "next";
import CTASection from "@/components/CTASection";
import { COMPANY_STORY, COMPANY_VALUES, TEAM_MEMBERS } from "@/data/about";

export const metadata: Metadata = {
  title: "About Us | Our Story, Values & Leadership Team",
  description:
    "Learn about Landometrix IT Solutions, our engineering-first philosophy, Kenyan roots, and team of data scientists and web developers.",
};

export default function AboutPage() {
  return (
    <div className="flex flex-col w-full">
      {/* Header */}
      <section className="pt-16 pb-20 bg-gradient-to-b from-[#EFF6FF] via-[#F8FAFC] to-white dark:from-[#0d255a] dark:via-[#0B1F4B] dark:to-[#0B1F4B] border-b border-slate-200/80 dark:border-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center max-w-4xl">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white dark:bg-slate-800 border border-blue-200 dark:border-slate-700 text-blue-700 dark:text-sky-300 text-xs font-semibold uppercase tracking-wider mb-4 font-mono shadow-2xs">
            Founded in Nairobi, Kenya • Global Engineering Standards
          </div>
          <h1 className="text-4xl sm:text-5xl font-extrabold text-[#0B1F4B] dark:text-white tracking-tight mb-6 font-[family-name:var(--font-space-grotesk)]">
            Built to turn messy records into decisive clarity
          </h1>
          <p className="text-lg sm:text-xl text-slate-700 dark:text-slate-300 leading-relaxed max-w-3xl mx-auto font-normal">
            We are a team of data engineers, visualization architects, and web
            developers who believe companies shouldn&apos;t be held back by fragile
            spreadsheets or bloated, expensive software.
          </p>
        </div>
      </section>

      {/* Origin Story & Mission */}
      <section className="py-24 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12 items-center">
          <div className="md:col-span-5 space-y-6">
            <div className="p-8 sm:p-10 rounded-3xl bg-gradient-to-br from-blue-700 via-blue-600 to-[#0B1F4B] text-white shadow-xl relative overflow-hidden">
              <div className="text-xs font-mono uppercase tracking-widest text-sky-200 mb-3 font-semibold">
                Our Mission
              </div>
              <p className="text-xl font-bold leading-snug">
                {COMPANY_STORY.mission}
              </p>
              <div className="mt-10 pt-6 border-t border-blue-400/30 flex justify-between text-xs font-mono text-blue-100">
                <div>
                  <span className="block text-sky-300">HQ</span>
                  {COMPANY_STORY.headquarters}
                </div>
                <div>
                  <span className="block text-sky-300">EST.</span>
                  {COMPANY_STORY.foundedYear}
                </div>
                <div>
                  <span className="block text-sky-300">SCOPE</span>
                  Worldwide
                </div>
              </div>
            </div>
          </div>

          <div className="md:col-span-7 space-y-4 text-slate-700 dark:text-slate-300 leading-relaxed text-base sm:text-lg">
            <h2 className="text-2xl sm:text-3xl font-extrabold text-[#0B1F4B] dark:text-white font-[family-name:var(--font-space-grotesk)] mb-6">
              Why We Founded Landometrix
            </h2>
            {COMPANY_STORY.narrative.map((p, idx) => (
              <p key={idx} className="leading-relaxed">
                {p}
              </p>
            ))}
          </div>
        </div>
      </section>

      {/* Core Values */}
      <section className="py-24 bg-[#F8FAFC] dark:bg-[#0F172A]/40 border-t border-slate-200/80 dark:border-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-xs font-bold uppercase tracking-widest text-blue-700 dark:text-sky-400 mb-2 font-mono">
              Guiding Principles
            </h2>
            <h3 className="text-3xl sm:text-4xl font-extrabold text-[#0B1F4B] dark:text-white font-[family-name:var(--font-space-grotesk)]">
              Our Core Values
            </h3>
            <p className="mt-4 text-base text-slate-600 dark:text-slate-300">
              How we approach every dataset, design sprint, and line of code.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {COMPANY_VALUES.map((val) => (
              <div
                key={val.id}
                className="p-8 rounded-2xl bg-white dark:bg-[#0B1F4B] border border-slate-200/90 dark:border-slate-800 shadow-[0_4px_16px_rgba(11,31,75,0.04)] dark:shadow-none hover:border-blue-300 transition-colors"
              >
                <div className="w-10 h-10 rounded-xl bg-[#EFF6FF] dark:bg-blue-900/40 text-blue-700 dark:text-sky-400 border border-blue-100 dark:border-blue-800 flex items-center justify-center mb-5 font-bold">
                  ✓
                </div>
                <h4 className="text-lg font-bold text-[#0B1F4B] dark:text-white mb-2.5 font-[family-name:var(--font-space-grotesk)]">
                  {val.title}
                </h4>
                <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
                  {val.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Leadership & Engineering Team */}
      <section className="py-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-xs font-bold uppercase tracking-widest text-blue-700 dark:text-sky-400 mb-2 font-mono">
            Leadership &amp; Talent
          </h2>
          <h3 className="text-3xl sm:text-4xl font-extrabold text-[#0B1F4B] dark:text-white font-[family-name:var(--font-space-grotesk)]">
            Meet the Team
          </h3>
          <p className="mt-4 text-base text-slate-600 dark:text-slate-300">
            A tight-knit engineering team combining mathematical rigor with modern
            front-end craftsmanship.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {TEAM_MEMBERS.map((member) => (
            <div
              key={member.id}
              className="p-8 rounded-2xl border border-slate-200/90 dark:border-slate-800 bg-white dark:bg-[#0F172A] shadow-[0_4px_20px_-4px_rgba(11,31,75,0.06)] dark:shadow-none hover:shadow-[0_16px_36px_-6px_rgba(29,78,216,0.12)] hover:border-blue-300 dark:hover:border-blue-700/60 transition-all duration-200 flex flex-col justify-between"
            >
              <div>
                {/* Avatar Placeholder with initials */}
                <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-blue-700 to-sky-400 text-white flex items-center justify-center text-xl font-bold font-mono mb-6 shadow-md">
                  {member.initials}
                </div>

                <div className="text-xs text-amber-700 dark:text-amber-400 font-mono mb-1.5 font-medium">
                  {member.avatarPlaceholder}
                </div>

                <h4 className="text-xl font-bold text-[#0B1F4B] dark:text-white mb-1 font-[family-name:var(--font-space-grotesk)]">
                  {member.name}
                </h4>

                <div className="text-sm font-semibold text-blue-700 dark:text-sky-400 mb-4">
                  {member.role}
                </div>

                <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed mb-6">
                  {member.bio}
                </p>
              </div>

              <div className="pt-4 border-t border-slate-100 dark:border-slate-800">
                <span className="text-[11px] font-mono text-slate-500 uppercase tracking-wider block mb-1">
                  Credentials
                </span>
                <span className="text-xs font-semibold text-slate-800 dark:text-slate-300">
                  {member.credentials}
                </span>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <CTASection
        title="Ready to work with our team?"
        subtitle="Book a free consultation directly with our lead engineers to map out your next data or web initiative."
        primaryCtaText="Book a Free Consultation"
      />
    </div>
  );
}
