/**
 * components/VouchoLogo.tsx
 *
 * Placeholder logo component for Voucho.
 * Wordmark renders as uppercase VOUCHO in Serif font per design spec.
 */

type LogoSize = "sm" | "md" | "lg";

const sizeConfig: Record<LogoSize, { mark: number; text: string; gap: string }> = {
  sm: { mark: 18, text: "text-base tracking-wider", gap: "gap-1.5" },
  md: { mark: 24, text: "text-xl tracking-wider",   gap: "gap-2"   },
  lg: { mark: 32, text: "text-2xl tracking-wider",  gap: "gap-2.5" },
};

export default function VouchoLogo({ size = "md" }: { size?: LogoSize }) {
  const { mark, text, gap } = sizeConfig[size];

  return (
    <span className={`inline-flex items-center ${gap} select-none`} aria-label="Voucho">
      {/* ── Icon mark — geometric V placeholder (kept as placeholder only) ── */}
      <svg
        width={mark}
        height={mark}
        viewBox="0 0 32 32"
        fill="none"
        xmlns="http://www.w3.org/2050/svg"
        aria-hidden="true"
      >
        <rect width="32" height="32" rx="7" fill="#0f766e" />
        <path
          d="M8 9L14 23"
          stroke="white"
          strokeWidth="3"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M24 9L14 23"
          stroke="white"
          strokeWidth="3"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>

      {/* ── Wordmark: VOUCHO (Serif) ── */}
      <span
        className={`font-serif font-bold leading-none uppercase ${text}`}
      >
        Voucho
      </span>
    </span>
  );
}
