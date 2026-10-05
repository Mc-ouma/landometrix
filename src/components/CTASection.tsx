import Link from "next/link";

interface CTASectionProps {
  title?: string;
  subtitle?: string;
  primaryCtaText?: string;
  primaryCtaHref?: string;
  secondaryCtaText?: string;
  secondaryCtaHref?: string;
  className?: string;
}

export default function CTASection({
  title = "Ready to turn your scattered data into clear, decisive action?",
  subtitle = "Book a free 30-minute consultation. We'll audit your current data bottlenecks and outline a practical path forward — no high-pressure sales, just clarity.",
  primaryCtaText = "Book a Free Consultation",
  primaryCtaHref = "/contact",
  secondaryCtaText = "Message on WhatsApp",
  secondaryCtaHref = "https://wa.me/254700000000?text=Hi%20Landometrix,%20I'd%20like%20to%20discuss%20a%20project",
  className = "",
}: CTASectionProps) {
  return (
    <section
      className={`py-16 sm:py-20 bg-gradient-to-br from-[#0B1F4B] via-[#1D4ED8] to-[#0B1F4B] text-white relative overflow-hidden ${className}`}
    >
      {/* Subtle background geometric grid accent */}
      <div className="absolute inset-0 opacity-10 bg-[linear-gradient(to_right,#ffffff_1px,transparent_1px),linear-gradient(to_bottom,#ffffff_1px,transparent_1px)] bg-[size:4rem_4rem]" />

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
        {/* Monogram watermark icon */}
        <div className="inline-flex justify-center items-center w-12 h-10 mb-6 text-sky-300 opacity-90">
          <svg
            viewBox="0 0 72 56"
            fill="none"
            stroke="currentColor"
            strokeWidth="7"
            strokeLinecap="square"
            strokeLinejoin="miter"
            className="w-full h-full"
            aria-hidden="true"
          >
            <path d="M8 6V50H24" />
            <path d="M34 50V6L50 30L66 6V50" />
          </svg>
        </div>

        <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight max-w-3xl mx-auto mb-6 text-white font-[family-name:var(--font-heading)]">
          {title}
        </h2>

        <p className="text-lg sm:text-xl text-blue-100 max-w-2xl mx-auto mb-10 leading-relaxed">
          {subtitle}
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <Link
            href={primaryCtaHref}
            className="tap-target w-full sm:w-auto inline-flex items-center justify-center px-8 py-3.5 rounded-lg bg-white text-blue-900 hover:bg-blue-50 font-bold text-base transition-all shadow-lg hover:shadow-xl hover:-translate-y-0.5 focus-visible:ring-4 focus-visible:ring-white/40"
          >
            {primaryCtaText}
            <svg
              className="ml-2 w-5 h-5 text-blue-900"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M14 5l7 7m0 0l-7 7m7-7H3"
              />
            </svg>
          </Link>

          <a
            href={secondaryCtaHref}
            target="_blank"
            rel="noopener noreferrer"
            className="tap-target w-full sm:w-auto inline-flex items-center justify-center px-6 py-3.5 rounded-lg border border-sky-300/40 text-sky-200 hover:text-white hover:bg-white/10 font-semibold text-base transition-colors"
          >
            {secondaryCtaText}
          </a>
        </div>

        {/* Reassurance Microcopy */}
        <p className="text-xs text-blue-200/80 mt-6">
          Response within 24 hours • Non-disclosure agreement guaranteed • Direct communication
        </p>
      </div>
    </section>
  );
}
