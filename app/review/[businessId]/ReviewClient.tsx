"use client";

import { useEffect, useState, useTransition } from "react";
import type { Business } from "@/lib/supabase";
import { getLocale } from "@/lib/localization";

type ReviewClientProps = {
  business: Business;
};

const LOCALIZED_TEXTS = {
  english: {
    prompt: "How was your experience today?",
    redirectingGoogle: "Thank you! Redirecting to Google Reviews...",
    redirectingWa: "Thank you for your feedback. Redirecting to WhatsApp...",
  },
  roman_urdu: {
    prompt: "Aap ka aaj ka experience kaisa raha?",
    redirectingGoogle: "Shukriya! Aap ko Google review page par bheja ja raha hai...",
    redirectingWa: "Aap ke feedback ka shukriya. Aap ko WhatsApp par redirect kiya ja raha hai...",
  },
  urdu: {
    prompt: "آپ کا آج کا تجربہ کیسا رہا؟",
    redirectingGoogle: "شکریہ! آپ کو گوگل ریویو پیج پر ری ڈائریکٹ کیا جا رہا ہے۔۔۔",
    redirectingWa: "آپ کے فیڈ بیک کا شکریہ۔ آپ کو واٹس ایپ پر ری ڈائریکٹ کیا جا رہا ہے۔۔۔",
  },
};

export default function ReviewClient({ business }: ReviewClientProps) {
  const [rating, setRating] = useState<number | null>(null);
  const [hoveredRating, setHoveredRating] = useState<number | null>(null);
  const [isPending, startTransition] = useTransition();

  const lang = (business.language_preference || "english") as "english" | "roman_urdu" | "urdu";
  const texts = LOCALIZED_TEXTS[lang] || LOCALIZED_TEXTS.english;
  const locale = getLocale(lang);

  // 1. Log page_view via sendBeacon on mount
  useEffect(() => {
    const payload = JSON.stringify({
      businessId: business.id,
      actionType: "page_view",
    });

    if (typeof navigator !== "undefined" && navigator.sendBeacon) {
      navigator.sendBeacon("/api/log", payload);
    } else {
      fetch("/api/log", {
        method: "POST",
        body: payload,
        keepalive: true,
      }).catch(() => {});
    }
  }, [business.id]);

  // 2. Rating handler (Compliance Logic)
  const handleRatingSelect = (selectedRating: number) => {
    if (rating !== null || isPending) return;
    setRating(selectedRating);

    startTransition(async () => {
      const isPositive = selectedRating >= 4;
      const actionType = isPositive ? "review_click" : "manager_click";

      // Fire beacon for the action type click
      const payload = JSON.stringify({
        businessId: business.id,
        actionType,
      });

      if (typeof navigator !== "undefined" && navigator.sendBeacon) {
        navigator.sendBeacon("/api/log", payload);
      } else {
        await fetch("/api/log", {
          method: "POST",
          body: payload,
          keepalive: true,
        }).catch(() => {});
      }

      // Determine redirect URL
      let targetUrl = "";
      if (isPositive) {
        // High rating -> Google
        targetUrl = `/api/click?id=${encodeURIComponent(business.id)}&type=google&url=${encodeURIComponent(business.google_review_url)}`;
      } else {
        // Low rating -> WhatsApp feedback with prefilled text
        const waText = encodeURIComponent(locale.waText);
        const whatsappTarget = `https://wa.me/${business.manager_whatsapp}?text=${waText}`;
        targetUrl = `/api/click?id=${encodeURIComponent(business.id)}&type=whatsapp&url=${encodeURIComponent(whatsappTarget)}`;
      }

      // Wait 800ms to let the user see the transition state, then redirect
      await new Promise((resolve) => setTimeout(resolve, 800));
      window.location.href = targetUrl;
    });
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

      {rating === null ? (
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
                      : star <= (rating ?? 0)
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
      ) : (
        <section className="py-4 flex flex-col items-center">
          {/* Transition & redirect state spinner */}
          <svg
            className="animate-spin -ml-1 mr-3 h-8 w-8 text-emerald-400 mb-4"
            fill="none"
            viewBox="0 0 24 24"
          >
            <circle
              className="opacity-25"
              cx="12"
              cy="12"
              r="10"
              stroke="currentColor"
              strokeWidth="4"
            />
            <path
              className="opacity-75"
              fill="currentColor"
              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
            />
          </svg>
          <p className="text-sm font-medium text-neutral-300">
            {rating >= 4 ? texts.redirectingGoogle : texts.redirectingWa}
          </p>
        </section>
      )}

      <footer className="mt-8 border-t border-neutral-800/40 pt-4 text-[9px] uppercase tracking-[0.18em] text-neutral-500 font-bold">
        The Daily Pulse
      </footer>
    </article>
  );
}
