export function getReviewUrl(businessSlug: string): string {
  const origin = typeof window !== "undefined" && window.location?.origin
    ? window.location.origin
    : (process.env.NEXT_PUBLIC_APP_URL || "https://slotly.pk");
  return `${origin}/review/${businessSlug}`;
}

export const STANDEE_PRICE_PKR = 599;
