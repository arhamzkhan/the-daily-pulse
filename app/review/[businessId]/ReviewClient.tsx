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
    if (rating !== null || redirecting) return;
    setRating(selectedRating);

    // 4 or 5 stars: immediate redirect to Google
    if (selectedRating >= 4) {
      setRedirecting(true);
      sendBeacon(business.id, "review_click");
      setTimeout(() => {
        window.location.href = googleClickUrl;
      }, 600);
    }
    // 1-3 stars: show interstitial with both options (no auto-redirect)
  };

  return (
    <article className="overflow-hidden rounded-3xl border border-neutral-800 bg-neutral-900 p-6 text-center shadow-2xl">
      <header className="pb-4">
        <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-emerald-400">
          {business.industry_type || "Feedback"}
        </p>
        <h1 className="mt-2 text-2xl font-bold tracking-tight text-white">
          {business.name}
        </h1>
        <p className="text-xs text-neutral-400 mt-1">
          {business.branch_name}
        </p>
      </header>

      <div className="my-6 border-t border-neutral-800/80" />

      {/* STATE 1: No rating selected yet — show star picker */}
      {rating === null && (
        <section>
          <h2 className="text-sm font-semibold tracking-wide text-neutral-300 mb-6">
            {texts.prompt}
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
                      ? "text-emerald-400 fill-emerald-400"
                      : "text-neutral-700"
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

      {/* STATE 2: High rating (4-5) — spinner + instant redirect to Google */}
      {rating !== null && rating >= 4 && (
        <section className="py-4 flex flex-col items-center">
          <svg
            className="animate-spin h-8 w-8 text-emerald-400 mb-4"
            fill="none"
            viewBox="0 0 24 24"
          >
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
          </svg>
          <p className="text-sm font-medium text-neutral-300">
            {texts.redirectingGoogle}
          </p>
        </section>
      )}

      {/* STATE 3: Low rating (1-3) — show WhatsApp CTA + Google review link */}
      {rating !== null && rating < 4 && (
        <section className="py-4 flex flex-col items-center gap-3">
          <p className="text-base font-semibold text-white">
            {texts.lowRatingHeading}
          </p>
          <p className="text-xs text-neutral-400 max-w-[280px]">
            {texts.lowRatingSubtext}
          </p>

          {/* Primary CTA — WhatsApp */}
          <a
            href={whatsappClickUrl}
            onClick={() => sendBeacon(business.id, "manager_click")}
            className="mt-2 w-full flex items-center justify-center gap-2.5 min-h-[52px] rounded-2xl bg-emerald-500 px-5 py-3.5 text-[14px] font-semibold text-white shadow-lg shadow-emerald-500/25 transition active:scale-[0.97] hover:bg-emerald-400"
          >
            <svg width="18" height="18" viewBox="0 0 24 24" aria-hidden="true" className="text-current">
              <path fill="currentColor" d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L0 24l6.335-1.662c1.746.953 3.71 1.456 5.705 1.457h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
            </svg>
            {texts.whatsappCta}
          </a>

          {/* Secondary link — Google Reviews (always visible, never blocked) */}
          <a
            href={googleClickUrl}
            onClick={() => sendBeacon(business.id, "review_click")}
            className="text-xs font-medium text-neutral-400 underline underline-offset-4 decoration-neutral-700 hover:text-neutral-200 transition"
          >
            {texts.googleFallback}
          </a>
        </section>
      )}

      <footer className="mt-8 border-t border-neutral-800/40 pt-4 text-[9px] uppercase tracking-[0.18em] text-neutral-500 font-bold">
        The Daily Pulse
      </footer>
    </article>
  );
}
