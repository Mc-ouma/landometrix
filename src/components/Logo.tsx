import Link from "next/link";

interface LogoProps {
  iconOnly?: boolean;
  className?: string;
  size?: "sm" | "md" | "lg";
}

export default function Logo({
  iconOnly = false,
  className = "",
  size = "md",
}: LogoProps) {
  // SVG dimensions for the 72:56 ratio
  const dimensions = {
    sm: { width: 28, height: 22, text: "text-lg", gap: "gap-2.5" },
    md: { width: 36, height: 28, text: "text-xl", gap: "gap-3" },
    lg: { width: 48, height: 38, text: "text-2xl", gap: "gap-4" },
  }[size];

  return (
    <Link
      href="/"
      className={`inline-flex items-center ${dimensions.gap} text-current group focus-visible:ring-2 focus-visible:ring-primary-blue rounded p-1 transition-opacity hover:opacity-90 ${className}`}
      aria-label="Landometrix Home"
    >
      {/* Inlined monochrome LM monogram using currentColor */}
      <span className="flex-shrink-0 flex items-center justify-center">
        <svg
          width={dimensions.width}
          height={dimensions.height}
          viewBox="0 0 72 56"
          fill="none"
          stroke="currentColor"
          strokeWidth="7"
          strokeLinecap="square"
          strokeLinejoin="miter"
          role="img"
          aria-hidden="true"
        >
          <path d="M8 6V50H24" />
          <path d="M34 50V6L50 30L66 6V50" />
        </svg>
      </span>

      {!iconOnly && (
        <span
          className={`font-bold tracking-tight text-current font-[family-name:var(--font-space-grotesk)] ${dimensions.text}`}
        >
          Landometrix
        </span>
      )}
    </Link>
  );
}
