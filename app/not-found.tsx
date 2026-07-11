import Link from "next/link";
import MarketingShell, { MarketingCard } from "@/components/MarketingShell";

export default function NotFound() {
  return (
    <MarketingShell maxWidth="md">
      <div className="flex min-h-[80dvh] items-center justify-center text-center">
        <MarketingCard>
          <div className="mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-2xl border border-[#1a5c4d]/20 bg-[#1a5c4d]/8">
            <span className="text-4xl font-bold text-[#1a5c4d]">?</span>
          </div>
          <h1 className="text-3xl font-bold text-[#1e1e24]">Page Not Found</h1>
          <p className="mx-auto mt-3 max-w-sm leading-relaxed text-[#1e1e24]/60">
            This QR code does not point to an active business profile. Please contact the venue for
            an updated code.
          </p>
          <Link
            href="/"
            className="mt-8 inline-block rounded-xl border border-[#1a5c4d]/20 bg-[#1a5c4d]/8 px-6 py-3 text-sm font-medium text-[#1a5c4d] transition hover:bg-[#1a5c4d]/12"
          >
            Go Home
          </Link>
        </MarketingCard>
      </div>
    </MarketingShell>
  );
}
