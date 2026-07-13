"use client";

export default function Error({
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <div className="min-h-[100dvh] bg-neutral-950 flex items-center justify-center px-4 py-8 text-center">
      <div className="w-full max-w-[420px] rounded-3xl border border-neutral-800 bg-neutral-900 px-6 py-10 shadow-2xl">
        <h1 className="text-xl font-bold text-white">Something went wrong</h1>
        <p className="mt-3 text-sm leading-relaxed text-neutral-400">
          We could not load this check-in page. Please try again.
        </p>
        <button
          type="button"
          onClick={reset}
          className="mt-6 min-h-[48px] w-full rounded-2xl bg-neutral-100 px-5 py-3 text-sm font-semibold text-neutral-950 transition hover:bg-white active:scale-95"
        >
          Try again
        </button>
      </div>
    </div>
  );
}
