export default function Loading() {
  return (
    <div className="min-h-[100dvh] bg-neutral-950 flex items-center justify-center px-4 py-8">
      <div className="w-full max-w-[420px] animate-pulse rounded-3xl border border-neutral-800 bg-neutral-900 p-6 text-center">
        <div className="mx-auto mb-4 h-3.5 w-24 rounded bg-neutral-800" />
        <div className="mx-auto mb-2 h-7 w-48 rounded bg-neutral-800" />
        <div className="mx-auto mb-6 h-4 w-36 rounded bg-neutral-800/60" />
        <div className="my-6 border-t border-neutral-850" />
        <div className="mx-auto mb-4 h-4 w-40 rounded bg-neutral-800/80" />
        <div className="flex justify-center gap-3">
          {[1, 2, 3, 4, 5].map((star) => (
            <div key={star} className="h-9 w-9 rounded bg-neutral-800" />
          ))}
        </div>
        <div className="mx-auto mt-8 h-3.5 w-28 rounded bg-neutral-800/40" />
      </div>
    </div>
  );
}
