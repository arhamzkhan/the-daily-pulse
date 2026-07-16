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
    <article className="overflow-hidden rounded-3xl border border-neutral-800 bg-neutral-900 p-6 text-center shadow-2xl relative">
      {rating !== null && (
        <button
          type="button"
          onClick={() => setRating(null)}
          className="w-full mb-4 py-2.5 px-4 rounded-xl border border-neutral-800 bg-neutral-800/50 hover:bg-neutral-800 text-neutral-300 hover:text-white transition font-medium text-sm flex items-center justify-center gap-2"
          aria-label="Back to rating"
        >
          ← Go Back
        </button>
      )}

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

      {/* STATE 2: Rating selected — show dual-option UI */}
      {rating !== null && (
        <section className="py-4 flex flex-col items-center gap-4">
          <h2 className="text-base font-semibold text-white px-4 leading-snug">
            {getDynamicHeading()}
          </h2>

          {rating >= 4 ? (
            <>
              {/* Primary CTA — Google Maps */}
              <a
                href={googleClickUrl}
                onClick={() => sendBeacon(business.id, "review_click")}
                className="w-full flex items-center justify-center gap-2 min-h-[52px] rounded-2xl bg-emerald-500 px-5 py-3.5 text-[14px] font-semibold text-white shadow-lg shadow-emerald-500/25 transition active:scale-[0.97] hover:bg-emerald-400"
              >
                Write a Review on Google Maps
              </a>

              {/* Secondary Link — WhatsApp Support */}
              <a
                href={whatsappClickUrl}
                onClick={() => sendBeacon(business.id, "manager_click")}
                className="text-xs font-medium text-neutral-400 underline underline-offset-4 decoration-neutral-700 hover:text-neutral-200 transition"
              >
                Chat with Support / Management
              </a>
            </>
          ) : (
            <>
              {/* Primary CTA — WhatsApp Manager */}
              <a
                href={whatsappClickUrl}
                onClick={() => sendBeacon(business.id, "manager_click")}
                className="w-full flex items-center justify-center gap-2 min-h-[52px] rounded-2xl bg-emerald-500 px-5 py-3.5 text-[14px] font-semibold text-white shadow-lg shadow-emerald-500/25 transition active:scale-[0.97] hover:bg-emerald-400"
              >
                Resolve instantly with Manager on WhatsApp
              </a>

              {/* Secondary Link — Google Maps */}
              <a
                href={googleClickUrl}
                onClick={() => sendBeacon(business.id, "review_click")}
                className="text-xs font-medium text-neutral-400 underline underline-offset-4 decoration-neutral-700 hover:text-neutral-200 transition"
              >
                Or continue to leave a review on Google Maps
              </a>
            </>
          )}
        </section>
      )}

      <footer className="mt-8 border-t border-neutral-800/40 pt-4 text-[9px] uppercase tracking-[0.18em] text-neutral-500 font-bold">
        The Daily Pulse
      </footer>
    </article>
  );
}
