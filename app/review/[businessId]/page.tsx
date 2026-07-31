import type { Metadata } from "next";
import { getBusinessById, supabase } from "@/lib/supabase";
import { getLocale } from "@/lib/localization";
import { getTheme } from "@/lib/themes";

export const dynamic = "force-dynamic";
export const revalidate = 0;
export const fetchCache = "force-no-store";

type PageProps = {
  params: Promise<{ businessId: string }>;
};

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { businessId } = await params;
  const decodedId = decodeURIComponent(businessId);
  const business = await getBusinessById(decodedId);

  if (!business) {
    return { title: "Check-in Not Found" };
  }

  return {
    title: `${business.name} — ${business.branch_name}`,
    description: `Share your feedback with ${business.name}.`,
  };
}

function StatusCard({
  title,
  message,
}: {
  title: string;
  message: string;
}) {
  return (
    <div className="flex min-h-[100dvh] items-center justify-center bg-neutral-950 px-4 py-8 text-center text-neutral-100">
      <div className="w-full max-w-[420px] rounded-3xl border border-neutral-800 bg-neutral-900 px-6 py-10 shadow-2xl">
        <div className="mx-auto mb-5 flex h-14 w-14 items-center justify-center rounded-2xl border border-neutral-800 bg-neutral-950 text-2xl text-emerald-400">
          ◌
        </div>
        <h1 className="text-xl font-bold tracking-tight text-white">{title}</h1>
        <p className="mt-3 text-sm leading-relaxed text-neutral-400">{message}</p>
      </div>
    </div>
  );
}

export default async function ReviewPage({ params }: PageProps) {
  const { businessId } = await params;
  const cleanId = decodeURIComponent(businessId).trim().toLowerCase();

  // Direct query from Supabase to bypass caching
  const { data: business, error: fetchError } = await supabase
    .from("businesses")
    .select("*")
    .eq("id", cleanId)
    .single();

  if (fetchError || !business) {
    return (
      <StatusCard
        title="Check-in Point Not Found"
        message="This link may be incorrect or no longer active. Please ask the staff for the correct QR code."
      />
    );
  }

  if (!business.user_id || !business.is_active) {
    return (
      <StatusCard
        title="Service Suspended"
        message="This check-in point is currently inactive. Please contact the branch management for assistance."
      />
    );
  }

  // 1. Increment scans asynchronously via RPC
  const { error: scanError } = await supabase.rpc("increment_scans", {
    business_id: cleanId,
  });
  if (scanError) {
    console.error("[Tracking] increment_scans failed:", scanError.message);
  }

  // 2. Insert page view log into 'scan_logs' table in the background
  const { error: logError } = await supabase
    .from("scan_logs")
    .insert({
      business_id: cleanId,
      action_type: "page_view",
    });
  if (logError) {
    console.error("[Tracking] scan_logs page_view insert failed:", logError.message);
  }

  const lang = (business.language_preference || "english") as "english" | "roman_urdu" | "urdu";
  const locale = getLocale(lang);
  const isRtl = locale.direction === "rtl";
  const theme = getTheme(business.industry_type);

  // Precompute Redirect URLs
  const googleClickUrl = `/api/click?id=${encodeURIComponent(business.id)}&type=google&url=${encodeURIComponent(business.google_review_url)}`;
  const waText = encodeURIComponent(locale.waText);
  const whatsappTarget = `https://wa.me/${business.manager_whatsapp}?text=${waText}`;
  const whatsappClickUrl = `/api/click?id=${encodeURIComponent(business.id)}&type=whatsapp&url=${encodeURIComponent(whatsappTarget)}`;

  return (
    <div
      dir={isRtl ? "rtl" : "ltr"}
      className="min-h-[100dvh] bg-[#0a0a0c] font-sans antialiased text-zinc-100 flex items-center justify-center px-4 py-8 relative overflow-hidden"
    >
      {/* Signature warm/cozy dark ambient radial background */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_15%,rgba(245,158,11,0.06)_0%,rgba(0,0,0,0)_60%)] pointer-events-none" />

      <div className="w-full max-w-[420px] relative z-10">
        <article className="overflow-hidden rounded-3xl border border-zinc-800/80 bg-[#111115] p-6 text-center shadow-2xl relative">
          
          <header className="pb-2 flex flex-col items-center">
            {/* Top Avatar */}
            <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-full overflow-hidden border border-amber-500/20 bg-amber-500/10 text-xl font-bold text-amber-400">
              {business.logo_url ? (
                <img src={business.logo_url} alt={business.name} className="h-full w-full object-cover" />
              ) : (
                (business.name || "B").charAt(0).toUpperCase()
              )}
            </div>

            <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-amber-500">
              {business.industry_type || "Feedback"}
            </p>
            <h1 className="mt-2 text-2xl font-extrabold tracking-tight text-white leading-tight">
              {business.name}
            </h1>
            <p className="text-xs text-zinc-400 mt-1">
              {business.branch_name}
            </p>
          </header>

          <div className="my-5 border-t border-zinc-800/60" />

          <section className="text-center">
            <h2 className="text-sm font-semibold tracking-wide text-zinc-300 mb-6 leading-relaxed px-1">
              Thank you for visiting us! Please select your preferred option to connect with us.
            </h2>

            {/* Stacked Google-compliant routing options utilizing the signature dark/cozy aesthetic */}
            <div className="flex flex-col gap-4">
              
              {/* Option 1: Write a Google Review */}
              <a
                href={googleClickUrl}
                className="group flex items-center gap-4 p-4 rounded-2xl border border-zinc-800/80 bg-[#0a0a0c]/40 hover:bg-zinc-900/40 hover:border-amber-500/50 active:scale-[0.98] transition-all duration-200 text-left w-full"
                style={{ contentVisibility: "auto" }}
              >
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-white/5 text-white transition-colors">
                  <svg
                    className="h-6 w-6"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
                    <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
                    <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z" fill="#FBBC05"/>
                    <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z" fill="#EA4335"/>
                  </svg>
                </div>
                <div className="flex-1 min-w-0">
                  <h3 className="text-sm font-bold text-white group-hover:text-amber-400 transition-colors break-words whitespace-normal">
                    {locale.buttonA}
                  </h3>
                  <p className="text-[11px] text-zinc-400 mt-0.5 leading-snug break-words whitespace-normal">
                    Share your positive experience with the world on Google Maps
                  </p>
                </div>
                <div className="text-zinc-600 group-hover:text-amber-400 transition-colors">
                  <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                  </svg>
                </div>
              </a>

              {/* Option 2: Connect directly on WhatsApp */}
              <a
                href={whatsappClickUrl}
                className="group flex items-center gap-4 p-4 rounded-2xl border border-zinc-800/80 bg-[#0a0a0c]/40 hover:bg-zinc-900/40 hover:border-amber-500/50 active:scale-[0.98] transition-all duration-200 text-left w-full"
              >
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-emerald-500/10 text-emerald-400 transition-colors">
                  <svg
                    className="h-6 w-6 fill-current"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946C.06 5.348 5.397.01 12.008.01c3.202.001 6.212 1.246 8.477 3.513 2.266 2.268 3.507 5.28 3.505 8.484-.004 6.657-5.34 11.997-11.953 11.997-2.005-.001-3.973-.502-5.717-1.456L0 24zm6.59-4.846c1.6.95 3.188 1.449 4.725 1.451 5.436 0 9.86-4.37 9.864-9.799.002-2.63-1.023-5.101-2.884-6.965C16.488 1.977 14.03 1.053 11.432 1.053c-5.44 0-9.866 4.372-9.87 9.802 0 1.83.504 3.616 1.458 5.181L2.01 21.99l6.046-1.579c1.517.828 3.02 1.242 4.591 1.242zm11.458-7.613c-.302-.15-1.788-.882-2.064-.983-.277-.101-.478-.15-.678.15-.2.3-.775.983-.95 1.185-.177.2-.353.226-.655.075-.302-.15-1.276-.47-2.43-1.498-.897-.8-1.503-1.789-1.68-2.091-.176-.302-.019-.465.131-.614.136-.134.302-.353.453-.529.15-.177.2-.303.302-.504.101-.2.05-.378-.026-.529-.075-.151-.678-1.636-.929-2.24-.244-.587-.492-.507-.678-.517-.175-.01-.377-.012-.578-.012-.2 0-.528.075-.804.378-.277.301-1.057 1.032-1.057 2.52 0 1.488 1.082 2.923 1.232 3.124.15.201 2.13 3.253 5.16 4.561.72.311 1.282.497 1.72.637.723.23 1.381.197 1.901.12.58-.086 1.788-.73 2.039-1.437.252-.705.252-1.31.176-1.437-.076-.127-.277-.201-.578-.352z" />
                  </svg>
                </div>
                <div className="flex-1 min-w-0">
                  <h3 className="text-sm font-bold text-white group-hover:text-amber-400 transition-colors break-words whitespace-normal">
                    {locale.buttonB}
                  </h3>
                  <p className="text-[11px] text-zinc-400 mt-0.5 leading-snug break-words whitespace-normal">
                    Chat directly with management to resolve any issues or complaints privately
                  </p>
                </div>
                <div className="text-zinc-600 group-hover:text-amber-400 transition-colors">
                  <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                  </svg>
                </div>
              </a>

            </div>
          </section>

          <footer className="mt-8 border-t border-zinc-800/40 pt-4 flex flex-col items-center gap-2">
            <span className="text-[9px] uppercase tracking-[0.18em] text-zinc-500 font-bold">
              Voucho
            </span>
            <p className="text-[10px] text-zinc-500 max-w-[320px] leading-relaxed normal-case font-normal">
              Anonymous telemetry (device type, timestamp, business ID) is processed solely for business analytics.{" "}
              <a href="/privacy-policy" className="underline hover:text-zinc-300 transition-colors">
                Privacy Policy
              </a>
            </p>
          </footer>
        </article>
      </div>
    </div>
  );
}
