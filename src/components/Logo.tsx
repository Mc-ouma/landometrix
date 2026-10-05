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
  // Dimensions for the 219:268 ratio of the provided logo
  const dimensions = {
    sm: { width: 23, height: 28, text: "text-lg", gap: "gap-2.5" },
    md: { width: 28, height: 34, text: "text-xl", gap: "gap-3" },
    lg: { width: 36, height: 44, text: "text-2xl", gap: "gap-3.5" },
  }[size];

  return (
    <Link
      href="/"
      className={`inline-flex items-center ${dimensions.gap} text-current group focus-visible:ring-2 focus-visible:ring-primary-blue rounded p-1 transition-opacity hover:opacity-90 ${className}`}
      aria-label="Landometrix Home"
    >
      {/* Inlined monochrome LM monogram from provided logo.svg using currentColor */}
      <span className="flex-shrink-0 flex items-center justify-center">
        <svg
          width={dimensions.width}
          height={dimensions.height}
          viewBox="0 0 219 268"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          role="img"
          aria-hidden="true"
        >
          {/* L-bracket outer frame */}
          <path
            d="M40 208C40 219.046 48.9543 228 60 228H198.448C209.494 228 218.448 236.954 218.448 248C218.448 259.046 209.494 268 198.448 268H20C8.95431 268 0 259.046 0 248V20C0 8.9543 8.95431 0 20 0C31.0457 0 40 8.95431 40 20V208Z"
            fill="currentColor"
            opacity="0.85"
          />
          {/* M - First vertical pillar */}
          <rect x="60" width="40" height="220" rx="20" fill="currentColor" />
          {/* M - Second & Third pillars */}
          <path
            d="M138 110C149.046 110 158 118.954 158 130V200C158 211.046 149.046 220 138 220C126.954 220 118 211.046 118 200V130C118 118.954 126.954 110 138 110ZM198 0C209.046 0 218 8.95431 218 20V200C218 211.046 209.046 220 198 220C186.954 220 178 211.046 178 200V20C178 8.95431 186.954 0 198 0Z"
            fill="currentColor"
          />
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
