/**
 * lib/rateLimit.ts
 * In-memory 5-second duplicate-suppression window.
 *
 * CGNAT & shared-Wi-Fi mitigation: if the same (businessId + actionType)
 * pair arrives from the exact same User-Agent string within 5 seconds of
 * the previous accepted entry, the new entry is discarded.
 *
 * Note: This is a process-level cache. For multi-instance deployments,
 * replace with a Redis SETNX+TTL implementation.
 */

interface CacheEntry {
  expiresAt: number; // Unix ms
}

// Key: "<businessId>::<actionType>::<ua_hash>"
const cache = new Map<string, CacheEntry>();

const WINDOW_MS = 5_000;

/** Returns true if the event should be DISCARDED (duplicate within window). */
export function isDuplicate(
  businessId: string,
  actionType: string,
  userAgent: string
): boolean {
  const key = `${businessId}::${actionType}::${userAgent}`;
  const now = Date.now();

  const existing = cache.get(key);
  if (existing && existing.expiresAt > now) {
    return true; // duplicate — discard
  }

  // Accept and register
  cache.set(key, { expiresAt: now + WINDOW_MS });

  // Lazy eviction — purge expired entries to prevent unbounded growth
  if (cache.size > 10_000) {
    for (const [k, v] of cache) {
      if (v.expiresAt <= now) cache.delete(k);
    }
  }

  return false;
}
