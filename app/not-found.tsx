/**
 * app/not-found.tsx
 * Custom 404 page — consistent with the premium dark theme.
 */
import Link from "next/link";

export default function NotFound() {
  return (
    <div className="min-h-screen bg-[#0a0f1e] flex flex-col items-center justify-center px-4 text-center">
      <div className="mb-6 flex items-center justify-center w-20 h-20 rounded-2xl bg-emerald-500/10 border border-emerald-500/20">
        <span className="text-4xl font-bold text-emerald-400">?</span>
      </div>
      <h1 className="text-3xl font-bold text-white mb-3">Page Not Found</h1>
      <p className="text-slate-400 max-w-sm leading-relaxed">
        This QR code does not point to an active business profile. Please
        contact the venue for an updated code.
      </p>
      <Link
        href="/"
        className="mt-8 px-6 py-3 rounded-xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-sm font-medium hover:bg-emerald-500/20 transition-colors"
      >
        Go Home
      </Link>
    </div>
  );
}
