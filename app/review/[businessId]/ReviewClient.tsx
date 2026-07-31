"use client";

import { useEffect, useState } from "react";
import type { Business } from "@/lib/supabase";
import { getLocale } from "@/lib/localization";

type ReviewClientProps = {
  business: Business;
};

const LOCALIZED_TEXTS = {
  english: {
    prompt: "How was your experience today?",
    redirectingGoogle: "Thank you! Redirecting to Google Reviews...",
    lowRatingHeading: "We appreciate your honest feedback.",
    lowRatingSubtext: "Would you like to resolve this directly with the manager?",
    whatsappCta: "Resolve instantly with the Manager on WhatsApp",
    googleFallback: "Or continue to leave a review on Google Maps",
  },
  roman_urdu: {
    prompt: "Aap ka aaj ka experience kaisa raha?",
    redirectingGoogle: "Shukriya! Aap ko Google review page par bheja ja raha hai...",
    lowRatingHeading: "Aap ke feedback ka shukriya.",
    lowRatingSubtext: "Kya aap manager se seedha baat karna chahein ge?",
    whatsappCta: "Manager se WhatsApp par baat karein",
    googleFallback: "Ya Google Maps par review dein",
  },
  urdu: {
    prompt: "آپ کا آج کا تجربہ کیسا رہا؟",
    redirectingGoogle: "شکریہ! آپ کو گوگل ریویو پیج پر ری ڈائریکٹ کیا جا رہا ہے۔۔۔",
    lowRatingHeading: "آپ کے فیڈ بیک کا شکریہ۔",
    lowRatingSubtext: "کیا آپ مینیجر سے براہ راست بات کرنا چاہیں گے؟",
    whatsappCta: "مینیجر سے واٹس ایپ پر بات کریں",
    googleFallback: "یا گوگل میپس پر ریویو دیں",
  },
};

function sendBeacon(businessId: string, actionType: string) {
  const payload = JSON.stringify({ businessId, actionType });
  if (typeof navigator !== "undefined" && navigator.sendBeacon) {
    navigator.sendBeacon("/api/log", payload);
  } else {
    fetch("/api/log", { method: "POST", body: payload, keepalive: true }).catch(() => {});
  }
}

export default function ReviewClient({ business }: ReviewClientProps) {
  const [rating, setRating] = useState<number | null>(null);
  const [hoveredRating, setHoveredRating] = useState<number | null>(null);
  const [redirecting, setRedirecting] = useState(false);

  const lang = (business.language_preference || "english") as "english" | "roman_urdu" | "urdu";
  const texts = LOCALIZED_TEXTS[lang] || LOCALIZED_TEXTS.english;
  const locale = getLocale(lang);

  // Precompute URLs
  const googleClickUrl = `/api/click?id=${encodeURIComponent(business.id)}&type=google&url=${encodeURIComponent(business.google_review_url)}`;
  const waText = encodeURIComponent(locale.waText);
  const whatsappTarget = `https://wa.me/${business.manager_whatsapp}?text=${waText}`;
  const whatsappClickUrl = `/api/click?id=${encodeURIComponent(business.id)}&type=whatsapp&url=${encodeURIComponent(whatsappTarget)}`;

  // Log page_view via sendBeacon on mount
  useEffect(() => {
    sendBeacon(business.id, "page_view");
  }, [business.id]);

  // Rating handler — compliant gating logic
  const handleRatingSelect = (selectedRating: number) => {
    if (rating !== null) return;
    setRating(selectedRating);
  };

  const getDynamicHeading = () => {
    if (rating === null) return "";
    if (rating >= 4) {
      return "Thank you for your support! Please help us grow by sharing your review on Google.";
    }
    return "We're sorry to hear about your experience. Would you like to resolve this directly with our management team?";
  };

  return (
    <article className="overflow-hidden rounded-3xl border border-zinc-800/80 bg-[#111115] p-6 text-center shadow-2xl relative">
      {rating !== null && (
        <button
          type="button"
          onClick={() => setRating(null)}
          className="w-full mb-4 py-2.5 px-4 rounded-xl border border-zinc-800/60 bg-zinc-900 hover:bg-zinc-800 text-zinc-300 hover:text-white transition font-medium text-sm flex items-center justify-center gap-2"
          aria-label="Back to rating"
        >
          ← Go Back
        </button>
      )}

      <header className="pb-4 flex flex-col items-center">
        {/* Top Avatar */}
        <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-full overflow-hidden border border-amber-500/20 bg-amber-500/10 text-xl font-bold text-amber-400">
          {(business as any)?.logo_url ? (
            <img src={(business as any).logo_url} alt={business.name} className="h-full w-full object-cover" />
          ) : (
            (business.name || "B").charAt(0).toUpperCase()
          )}
        </div>

        <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-amber-500">
          {business.industry_type || "Feedback"}
        </p>
        <h1 className="mt-2 text-2xl font-bold tracking-tight text-white">
          {business.name}
        </h1>
        <p className="text-xs text-zinc-400 mt-1">
          {business.branch_name}
        </p>
      </header>

      <div className="my-6 border-t border-zinc-800/60" />

      {/* STATE 1: No rating selected yet — show star picker */}
      {rating === null && (
        <section>
          <h2 className="text-sm font-semibold tracking-wide text-zinc-300 mb-6 leading-relaxed px-1">
            Thank you for visiting us! Please select your preferred option to connect with us.
          </h2>
          <div className="flex justify-center gap-2.5">
            {[1, 2, 3, 4, 5].map((star) => (
              <button
                key={star}
                type="button"
                onClick={() => handleRatingSelect(star)}
                onMouseEnter={() => setHoveredRating(star)}
                onMouseLeave={() => setHoveredRating(null)}
                aria-label={`Rate ${star} star${star > 1 ? "s" : ""}`}
                className="group relative p-1 transition-transform duration-100 hover:scale-110 active:scale-95"
              >
                <svg
                  width="36"
                  height="36"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  className={`transition-colors duration-150 ${
                    star <= (hoveredRating ?? 0)
                      ? "text-amber-400 fill-amber-400"
                      : "text-zinc-700"
                  }`}
                >
                  <path
                    d="M12 17.27L18.18 21L16.54 13.97L22 9.24L14.81 8.63L12 2L9.19 8.63L2 9.24L7.46 13.97L5.82 21L12 17.27Z"
                    fill="currentColor"
                  />
                </svg>
              </button>
            ))}
          </div>
        </section>
      )}

      {/* STATE 2: Rating selected — show dual-option UI */}
      {rating !== null && (
        <section className="py-4 flex flex-col items-center gap-4 w-full">
          <h2 className="text-base font-semibold text-white px-4 leading-snug break-words whitespace-normal">
            {getDynamicHeading()}
          </h2>

          {rating >= 4 ? (
            <>
              {/* Primary CTA — Google Maps */}
              <a
                href={googleClickUrl}
                onClick={() => sendBeacon(business.id, "review_click")}
                className="w-full flex items-center justify-center gap-3 min-h-[52px] rounded-2xl bg-amber-500 px-5 py-3.5 text-[14px] font-semibold text-zinc-950 shadow-lg shadow-amber-500/10 transition active:scale-[0.98] hover:bg-amber-400"
              >
                <div className="flex h-6 w-6 shrink-0 items-center justify-center rounded bg-white/5 p-0.5">
                  <svg className="h-full w-full" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
                    <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
                    <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z" fill="#FBBC05"/>
                    <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z" fill="#EA4335"/>
                  </svg>
                </div>
                <span className="break-words whitespace-normal">Write a Review on Google Maps</span>
              </a>

              {/* Secondary Link — WhatsApp Support */}
              <a
                href={whatsappClickUrl}
                onClick={() => sendBeacon(business.id, "manager_click")}
                className="w-full flex items-center justify-center gap-2 text-xs font-medium text-zinc-400 hover:text-zinc-200 transition break-words whitespace-normal"
              >
                <div className="flex h-5 w-5 shrink-0 items-center justify-center rounded bg-emerald-500/10 p-0.5">
                  <svg className="h-full w-full fill-emerald-500" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946C.06 5.348 5.397.01 12.008.01c3.202.001 6.212 1.246 8.477 3.513 2.266 2.268 3.507 5.28 3.505 8.484-.004 6.657-5.34 11.997-11.953 11.997-2.005-.001-3.973-.502-5.717-1.456L0 24zm6.59-4.846c1.6.95 3.188 1.449 4.725 1.451 5.436 0 9.86-4.37 9.864-9.799.002-2.63-1.023-5.101-2.884-6.965C16.488 1.977 14.03 1.053 11.432 1.053c-5.44 0-9.866 4.372-9.87 9.802 0 1.83.504 3.616 1.458 5.181L2.01 21.99l6.046-1.579c1.517.828 3.02 1.242 4.591 1.242zm11.458-7.613c-.302-.15-1.788-.882-2.064-.983-.277-.101-.478-.15-.678.15-.2.3-.775.983-.95 1.185-.177.2-.353.226-.655.075-.302-.15-1.276-.47-2.43-1.498-.897-.8-1.503-1.789-1.68-2.091-.176-.302-.019-.465.131-.614.136-.134.302-.353.453-.529.15-.177.2-.303.302-.504.101-.2.05-.378-.026-.529-.075-.151-.678-1.636-.929-2.24-.244-.587-.492-.507-.678-.517-.175-.01-.377-.012-.578-.012-.2 0-.528.075-.804.378-.277.301-1.057 1.032-1.057 2.52 0 1.488 1.082 2.923 1.232 3.124.15.201 2.13 3.253 5.16 4.561.72.311 1.282.497 1.72.637.723.23 1.381.197 1.901.12.58-.086 1.788-.73 2.039-1.437.252-.705.252-1.31.176-1.437-.076-.127-.277-.201-.578-.352z" />
                  </svg>
                </div>
                <span>Chat with Support / Management</span>
              </a>
            </>
          ) : (
            <>
              {/* Primary CTA — WhatsApp Manager */}
              <a
                href={whatsappClickUrl}
                onClick={() => sendBeacon(business.id, "manager_click")}
                className="w-full flex items-center justify-center gap-3 min-h-[52px] rounded-2xl bg-emerald-500 px-5 py-3.5 text-[14px] font-semibold text-zinc-950 shadow-lg shadow-emerald-500/10 transition active:scale-[0.98] hover:bg-emerald-400"
              >
                <div className="flex h-6 w-6 shrink-0 items-center justify-center rounded bg-emerald-500/10 p-0.5">
                  <svg className="h-full w-full fill-current" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946C.06 5.348 5.397.01 12.008.01c3.202.001 6.212 1.246 8.477 3.513 2.266 2.268 3.507 5.28 3.505 8.484-.004 6.657-5.34 11.997-11.953 11.997-2.005-.001-3.973-.502-5.717-1.456L0 24zm6.59-4.846c1.6.95 3.188 1.449 4.725 1.451 5.436 0 9.86-4.37 9.864-9.799.002-2.63-1.023-5.101-2.884-6.965C16.488 1.977 14.03 1.053 11.432 1.053c-5.44 0-9.866 4.372-9.87 9.802 0 1.83.504 3.616 1.458 5.181L2.01 21.99l6.046-1.579c1.517.828 3.02 1.242 4.591 1.242zm11.458-7.613c-.302-.15-1.788-.882-2.064-.983-.277-.101-.478-.15-.678.15-.2.3-.775.983-.95 1.185-.177.2-.353.226-.655.075-.302-.15-1.276-.47-2.43-1.498-.897-.8-1.503-1.789-1.68-2.091-.176-.302-.019-.465.131-.614.136-.134.302-.353.453-.529.15-.177.2-.303.302-.504.101-.2.05-.378-.026-.529-.075-.151-.678-1.636-.929-2.24-.244-.587-.492-.507-.678-.517-.175-.01-.377-.012-.578-.012-.2 0-.528.075-.804.378-.277.301-1.057 1.032-1.057 2.52 0 1.488 1.082 2.923 1.232 3.124.15.201 2.13 3.253 5.16 4.561.72.311 1.282.497 1.72.637.723.23 1.381.197 1.901.12.58-.086 1.788-.73 2.039-1.437.252-.705.252-1.31.176-1.437-.076-.127-.277-.201-.578-.352z" />
                  </svg>
                </div>
                <span className="break-words whitespace-normal">Resolve instantly with Manager on WhatsApp</span>
              </a>

              {/* Secondary Link — Google Maps */}
              <a
                href={googleClickUrl}
                onClick={() => sendBeacon(business.id, "review_click")}
                className="w-full flex items-center justify-center gap-2 text-xs font-medium text-zinc-400 hover:text-zinc-200 transition break-words whitespace-normal"
              >
                <div className="flex h-5 w-5 shrink-0 items-center justify-center rounded bg-white/5 p-0.5">
                  <svg className="h-full w-full" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
                    <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
                    <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z" fill="#FBBC05"/>
                    <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z" fill="#EA4335"/>
                  </svg>
                </div>
                <span>Or continue to leave a review on Google Maps</span>
              </a>
            </>
          )}
        </section>
      )}

      <footer className="mt-8 border-t border-zinc-800/40 pt-4 text-[9px] uppercase tracking-[0.18em] text-zinc-500 font-bold">
        Voucho
      </footer>
    </article>
  );
}
