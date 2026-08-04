export function getReviewUrl(businessSlug: string): string {
  const origin = typeof window !== "undefined" && window.location?.origin
    ? window.location.origin
    : (process.env.NEXT_PUBLIC_APP_URL || "https://slotly.pk");
  return `${origin}/review/${businessSlug}`;
}

export const STANDEE_PRICE_PKR = 599;

/**
 * WhatsApp number used across marketing pages for "Book a Demo" links.
 * Format: country code + number, no spaces or dashes (e.g. "923001234567").
 * Replace this with your actual WhatsApp Business number.
 */
export const WHATSAPP_NUMBER = "WHATSAPP_NUMBER";
