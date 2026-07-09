/**
 * lib/validators.ts
 * Server-side input validation utilities.
 * - Open-redirect prevention for Google URLs
 * - Pakistani WhatsApp number format enforcement
 */

const ALLOWED_GOOGLE_DOMAINS = [
  /^https:\/\/(www\.)?google\.com\//,
  /^https:\/\/g\.page\//,
  /^https:\/\/goo\.gl\//,
  /^https:\/\/maps\.google\.com\//,
  /^https:\/\/maps\.app\.goo\.gl\//,
];

/**
 * Validates that a URL is a legitimate Google review / business destination.
 * Rejects anything that does not start with https:// AND match an approved domain.
 */
export function validateGoogleReviewUrl(url: string): boolean {
  if (!url.startsWith("https://")) return false;
  return ALLOWED_GOOGLE_DOMAINS.some((pattern) => pattern.test(url));
}

/**
 * Validates WhatsApp number for Pakistani format: 92 followed by exactly 10 digits.
 * Example valid: 923001234567
 */
const PAKISTAN_WHATSAPP_RE = /^92[0-9]{10}$/;

export function validateManagerWhatsApp(number: string): boolean {
  return PAKISTAN_WHATSAPP_RE.test(number);
}

/**
 * Validates language_preference is one of the accepted enum values.
 */
const ALLOWED_LANGUAGES = new Set(["english", "roman_urdu", "urdu"]);

export function validateLanguage(lang: string): boolean {
  return ALLOWED_LANGUAGES.has(lang);
}

/**
 * Validates action_type for scan_logs.
 */
const ALLOWED_ACTIONS = new Set(["page_view", "review_click", "manager_click"]);

export function validateActionType(action: string): boolean {
  return ALLOWED_ACTIONS.has(action);
}
