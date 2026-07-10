import type { Metadata } from "next";
import { getBusinessById, supabase } from "@/lib/supabase";

export const dynamic = "force-dynamic";

type PageProps = {
  params: Promise<{ id: string }>;
};

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { id } = await params;
  const business = await getBusinessById(id);

  if (!business) {
    return { title: "Check-in Not Found" };
  }

  return {
    title: `${business.name} — ${business.branch_name}`,
    description: `Share your feedback with ${business.name}.`,
  };
}

function Shell({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex min-h-[100dvh] items-center justify-center bg-[#09090b] px-4 py-8 sm:px-6">
      <div className="pointer-events-none fixed inset-0 bg-[radial-gradient(circle_at_50%_0%,#18181b_0%,#09090b_70%)]" />
      <div className="relative z-10 w-full max-w-[420px]">{children}</div>
    </div>
  );
}

function StatusCard({ title, message }: { title: string; message: string }) {
  return (
    <Shell>
      <div className="rounded-3xl border border-white/10 bg-[#111115] px-6 py-10 text-center shadow-2xl shadow-black/40">
        <div className="mx-auto mb-5 flex h-14 w-14 items-center justify-center rounded-2xl border border-white/10 bg-white/[0.04] text-2xl text-zinc-500">
          ◌
        </div>
        <h1 className="text-xl font-semibold tracking-tight text-white">{title}</h1>
        <p className="mt-3 text-[15px] leading-relaxed text-zinc-400">{message}</p>
      </div>
    </Shell>
  );
}

export default async function ReviewPage({ params }: PageProps) {
  const { id } = await params;

  const { error: scanError } = await supabase.rpc("increment_scans", {
    business_id: id,
  });
  if (scanError) {
    console.error("[Tracking] increment_scans failed:", scanError.message);
  }

  const business = await getBusinessById(id);

  if (!business) {
    return (
      <StatusCard
        title="Check-in point not found"
        message="This link may be incorrect or no longer active. Please ask staff for the correct QR code."
      />
    );
  }

  if (!business.is_active) {
    return (
      <StatusCard
        title="This check-in point is currently unavailable"
        message="Please speak with a team member at the venue for assistance."
      />
    );
  }

  const googleClickUrl = `/api/click?id=${encodeURIComponent(id)}&type=google&url=${encodeURIComponent(business.google_review_url)}`;
  const whatsappTarget = `https://wa.me/${business.manager_whatsapp}`;
  const whatsappClickUrl = `/api/click?id=${encodeURIComponent(id)}&type=whatsapp&url=${encodeURIComponent(whatsappTarget)}`;

  return (
    <Shell>
      <article className="overflow-hidden rounded-3xl border border-white/10 bg-[#111115] shadow-2xl shadow-black/40">
        <header className="border-b border-white/8 px-6 pb-6 pt-8 text-center">
          <p className="mb-3 text-[11px] font-semibold uppercase tracking-[0.18em] text-zinc-500">
            Your feedback matters
          </p>
          <h1 className="text-[1.75rem] font-bold leading-tight tracking-tight text-white">
            {business.name}
          </h1>
          <p className="mt-2 text-sm font-medium text-zinc-400">{business.branch_name}</p>
        </header>

        <div className="flex flex-col gap-3 px-5 py-6 sm:flex-row">
          <a
            href={googleClickUrl}
            className="flex min-h-[58px] flex-1 items-center justify-center gap-3 rounded-2xl bg-white px-5 py-4 text-[15px] font-semibold text-[#09090b] shadow-lg shadow-white/10 transition active:scale-[0.98]"
          >
            <GoogleIcon />
            Leave a Google Review
          </a>

          <a
            href={whatsappClickUrl}
            className="flex min-h-[58px] flex-1 items-center justify-center gap-3 rounded-2xl bg-[#25D366] px-5 py-4 text-[15px] font-semibold text-white shadow-lg shadow-[#25D366]/20 transition active:scale-[0.98]"
          >
            <WhatsAppIcon />
            Contact Management
          </a>
        </div>

        <footer className="border-t border-white/8 px-6 py-4 text-center text-[11px] font-medium uppercase tracking-[0.12em] text-zinc-600">
          The Daily Pulse
        </footer>
      </article>
    </Shell>
  );
}

function GoogleIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" aria-hidden="true">
      <path
        d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
        fill="#4285F4"
      />
      <path
        d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
        fill="#34A853"
      />
      <path
        d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"
        fill="#FBBC05"
      />
      <path
        d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"
        fill="#EA4335"
      />
    </svg>
  );
}

function WhatsAppIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" aria-hidden="true" className="text-white">
      <path
        fill="currentColor"
        d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L0 24l6.335-1.662c1.746.953 3.71 1.456 5.705 1.457h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"
      />
    </svg>
  );
}
