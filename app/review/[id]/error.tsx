"use client";

export default function Error({
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <div className="min-h-[100dvh] bg-[#09090b] flex items-center justify-center px-4 py-8 text-center">
      <div className="w-full max-w-[420px] rounded-3xl border border-white/10 bg-white/[0.03] px-6 py-10">
        <h1 className="text-xl font-semibold text-white">Something went wrong</h1>
        <p className="mt-3 text-[15px] leading-relaxed text-zinc-400">
          We could not load this check-in page. Please try again.
        </p>
        <button
          type="button"
          onClick={reset}
          className="mt-6 min-h-[48px] w-full rounded-2xl bg-white px-5 py-3 text-[15px] font-semibold text-[#09090b]"
        >
          Try again
        </button>
      </div>
    </div>
  );
}
