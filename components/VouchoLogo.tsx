/**
 * components/VouchoLogo.tsx
 *
 * Placeholder logo component for Voucho.
 * Replace the SVG mark and wordmark with the real brand asset when ready.
 * Accepts a `size` prop for flexible usage across the app.
 */

type LogoSize = "sm" | "md" | "lg";

const sizeConfig: Record<LogoSize, { mark: number; text: string; gap: string }> = {
  sm: { mark: 20, text: "text-base", gap: "gap-1.5" },
  md: { mark: 26, text: "text-xl",   gap: "gap-2"   },
  lg: { mark: 34, text: "text-2xl",  gap: "gap-2.5" },
};

export default function VouchoLogo({ size = "md" }: { size?: LogoSize }) {
  const { mark, text, gap } = sizeConfig[size];

  return (
    <span className={`inline-flex items-center ${gap} select-none`} aria-label="Voucho">
      {/* ── Icon mark — geometric "V" shape ── */}
      <svg
        width={mark}
        height={mark}
        viewBox="0 0 32 32"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        aria-hidden="true"
      >
        <rect width="32" height="32" rx="7" fill="#0f766e" />
        {/* Left stroke of V */}
        <path
          d="M8 9L14 23"
          stroke="white"
          strokeWidth="3"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        {/* Right stroke of V */}
        <path
          d="M24 9L14 23"
          stroke="white"
          strokeWidth="3"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>

      {/* ── Wordmark ── */}
      <span
        className={`font-bold tracking-tight leading-none ${text}`}
        style={{ fontFamily: "Inter, ui-sans-serif, system-ui, sans-serif" }}
      >
        Voucho
      </span>
    </span>
  );
}
