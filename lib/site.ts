export const REVIEW_BASE_URL = "https://slotly.pk";

export function getReviewUrl(businessId: string): string {
  return `${REVIEW_BASE_URL}/review/${businessId}`;
}

export const STANDEE_PRICE_PKR = 599;
