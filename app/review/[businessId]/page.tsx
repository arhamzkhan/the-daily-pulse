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
      className="min-h-[100dvh] bg-neutral-950 font-sans antialiased text-neutral-100 flex items-center justify-center px-4 py-8 relative overflow-hidden"
    >
      {/* Signature warm/cozy dark ambient radial background */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_15%,rgba(16,185,129,0.06)_0%,rgba(0,0,0,0)_60%)] pointer-events-none" />

      <div className="w-full max-w-[420px] relative z-10">
        <article className="overflow-hidden rounded-3xl border border-neutral-800/80 bg-neutral-900/60 backdrop-blur-md p-6 text-center shadow-2xl relative">
          
          <header className="pb-2">
            <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-emerald-400">
              {business.industry_type || "Feedback"}
            </p>
            <h1 className="mt-2 text-2xl font-extrabold tracking-tight text-white leading-tight">
              {business.name}
            </h1>
            <p className="text-xs text-neutral-400 mt-1">
              {business.branch_name}
            </p>
          </header>

          <div className="my-5 border-t border-neutral-800/60" />

          <section className="text-center">
            <h2 className="text-sm font-semibold tracking-wide text-neutral-300 mb-6 leading-relaxed px-1">
              {locale.tagline}
            </h2>

            {/* Stacked Google-compliant routing options utilizing the signature dark/cozy aesthetic */}
            <div className="flex flex-col gap-4">
              
              {/* Option 1: Write a Google Review */}
              <a
                href={googleClickUrl}
                className="group flex items-center gap-4 p-4 rounded-2xl border border-neutral-800/80 bg-neutral-950/40 hover:bg-neutral-900/80 hover:border-emerald-500/50 active:scale-[0.98] transition-all duration-200 text-left w-full"
                style={{ contentVisibility: "auto" }}
              >
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-emerald-500/10 text-emerald-400 group-hover:bg-emerald-500/20 group-hover:text-emerald-300 transition-colors">
                  <svg
                    className="h-6 w-6 fill-current"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path d="M12 17.27L18.18 21L16.54 13.97L22 9.24L14.81 8.63L12 2L9.19 8.63L2 9.24L7.46 13.97L5.82 21L12 17.27Z" />
                  </svg>
                </div>
                <div className="flex-1 min-w-0">
                  <h3 className="text-sm font-bold text-white group-hover:text-emerald-400 transition-colors truncate">
                    {locale.buttonA}
                  </h3>
                  <p className="text-[11px] text-neutral-400 mt-0.5 leading-snug">
                    Share your positive experience with the world on Google Maps
                  </p>
                </div>
                <div className="text-neutral-600 group-hover:text-emerald-400 transition-colors">
                  <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                  </svg>
                </div>
              </a>

              {/* Option 2: Connect directly on WhatsApp */}
              <a
                href={whatsappClickUrl}
                className="group flex items-center gap-4 p-4 rounded-2xl border border-neutral-800/80 bg-neutral-950/40 hover:bg-neutral-900/80 hover:border-emerald-500/50 active:scale-[0.98] transition-all duration-200 text-left w-full"
              >
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-green-500/10 text-green-400 group-hover:bg-green-500/20 group-hover:text-green-300 transition-colors">
                  <svg
                    className="h-6 w-6 fill-current"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946C.06 5.348 5.397.01 12.008.01c3.202.001 6.212 1.246 8.477 3.513 2.266 2.268 3.507 5.28 3.505 8.484-.004 6.657-5.34 11.997-11.953 11.997-2.005-.001-3.973-.502-5.717-1.456L0 24zm6.59-4.846c1.6.95 3.188 1.449 4.725 1.451 5.436 0 9.86-4.37 9.864-9.799.002-2.63-1.023-5.101-2.884-6.965C16.488 1.977 14.03 1.053 11.432 1.053c-5.44 0-9.866 4.372-9.87 9.802 0 1.83.504 3.616 1.458 5.181L2.01 21.99l6.046-1.579c1.517.828 3.02 1.242 4.591 1.242zm11.458-7.613c-.302-.15-1.788-.882-2.064-.983-.277-.101-.478-.15-.678.15-.2.3-.775.983-.95 1.185-.177.2-.353.226-.655.075-.302-.15-1.276-.47-2.43-1.498-.897-.8-1.503-1.789-1.68-2.091-.176-.302-.019-.465.131-.614.136-.134.302-.353.453-.529.15-.177.2-.303.302-.504.101-.2.05-.378-.026-.529-.075-.151-.678-1.636-.929-2.24-.244-.587-.492-.507-.678-.517-.175-.01-.377-.012-.578-.012-.2 0-.528.075-.804.378-.277.301-1.057 1.032-1.057 2.52 0 1.488 1.082 2.923 1.232 3.124.15.201 2.13 3.253 5.16 4.561.72.311 1.282.497 1.72.637.723.23 1.381.197 1.901.12.58-.086 1.788-.73 2.039-1.437.252-.705.252-1.31.176-1.437-.076-.127-.277-.201-.578-.352z" />
                  </svg>
                </div>
                <div className="flex-1 min-w-0">
                  <h3 className="text-sm font-bold text-white group-hover:text-emerald-400 transition-colors truncate">
                    {locale.buttonB}
                  </h3>
                  <p className="text-[11px] text-neutral-400 mt-0.5 leading-snug">
                    Chat directly with management to resolve any issues or complaints privately
                  </p>
                </div>
                <div className="text-neutral-600 group-hover:text-emerald-400 transition-colors">
                  <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                  </svg>
                </div>
              </a>

            </div>
          </section>

          <footer className="mt-8 border-t border-neutral-800/40 pt-4 flex flex-col items-center gap-2">
            <span className="text-[9px] uppercase tracking-[0.18em] text-neutral-500 font-bold">
              The Daily Pulse
            </span>
            <p className="text-[10px] text-neutral-500 max-w-[320px] leading-relaxed normal-case font-normal">
              Anonymous telemetry (device type, timestamp, business ID) is processed solely for business analytics.{" "}
              <a href="/privacy-policy" className="underline hover:text-neutral-300 transition-colors">
                Privacy Policy
              </a>
            </p>
          </footer>
        </article>
      </div>
    </div>
  );
}
