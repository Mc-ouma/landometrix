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
      className={`py-20 sm:py-24 bg-inverse text-on-inverse relative overflow-hidden ${className}`}
    >
      {/* Signature faint data-grid dot texture */}
      <div className="absolute inset-0 bg-dots pointer-events-none opacity-30" />

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
        {/* Monogram watermark icon */}
        <div className="inline-flex justify-center items-center w-10 h-12 mb-6 text-brand opacity-40 dark:opacity-30">
          <svg
            viewBox="0 0 219 268"
            fill="none"
            className="w-full h-full"
            aria-hidden="true"
          >
            <path
              d="M40 208C40 219.046 48.9543 228 60 228H198.448C209.494 228 218.448 236.954 218.448 248C218.448 259.046 209.494 268 198.448 268H20C8.95431 268 0 259.046 0 248V20C0 8.9543 8.95431 0 20 0C31.0457 0 40 8.95431 40 20V208Z"
              fill="currentColor"
              opacity="0.85"
            />
            <rect x="60" width="40" height="220" rx="20" fill="currentColor" />
            <path
              d="M138 110C149.046 110 158 118.954 158 130V200C158 211.046 149.046 220 138 220C126.954 220 118 211.046 118 200V130C118 118.954 126.954 110 138 110ZM198 0C209.046 0 218 8.95431 218 20V200C218 211.046 209.046 220 198 220C186.954 220 178 211.046 178 200V20C178 8.95431 186.954 0 198 0Z"
              fill="currentColor"
            />
          </svg>
        </div>

        <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight max-w-3xl mx-auto mb-6 text-on-inverse font-[family-name:var(--font-heading)]">
          {title}
        </h2>

        <p className="text-lg sm:text-xl text-blue-100 dark:text-fg-secondary max-w-2xl mx-auto mb-10 leading-relaxed">
          {subtitle}
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <Link
            href={primaryCtaHref}
            className="tap-target w-full sm:w-auto inline-flex items-center justify-center px-8 py-3.5 rounded-xl bg-white text-deep-navy hover:bg-slate-100 font-bold text-base transition-all shadow-md hover:shadow-lg hover:-translate-y-0.5 focus-visible:ring-4 focus-visible:ring-white/40"
          >
            {primaryCtaText}
            <svg
              className="ml-2 w-5 h-5 text-deep-navy"
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
            className="tap-target w-full sm:w-auto inline-flex items-center justify-center px-6 py-3.5 rounded-xl border border-line-strong text-on-inverse hover:bg-white/10 font-semibold text-base transition-colors"
          >
            {secondaryCtaText}
          </a>
        </div>

        {/* Reassurance Microcopy */}
        <p className="text-xs text-blue-200/80 dark:text-fg-muted mt-6">
          Response within 24 hours • Non-disclosure agreement guaranteed • Direct communication
        </p>
      </div>
    </section>
  );
}
