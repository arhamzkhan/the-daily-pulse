export default function Loading() {
  return (
    <div className="min-h-[100dvh] bg-[#09090b] flex items-center justify-center px-4 py-8">
      <div className="w-full max-w-[420px] animate-pulse rounded-3xl border border-white/10 bg-white/[0.03] p-6">
        <div className="mx-auto mb-6 h-5 w-32 rounded bg-white/10" />
        <div className="mx-auto mb-3 h-8 w-48 rounded bg-white/10" />
        <div className="mx-auto mb-8 h-4 w-36 rounded bg-white/5" />
        <div className="flex flex-col gap-3">
          <div className="h-[58px] rounded-2xl bg-white/10" />
          <div className="h-[58px] rounded-2xl bg-white/5" />
        </div>
      </div>
    </div>
  );
}
