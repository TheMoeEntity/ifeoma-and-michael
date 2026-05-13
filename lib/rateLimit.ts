interface Entry {
  count: number;
  resetAt: number;
}

const WINDOW_MS = 60 * 60 * 1000; // 1 hour
const MAX_PER_WINDOW = 5;

// Module-level store — persists across requests within the same process
const store = new Map<string, Entry>();

export function isRateLimited(ip: string): boolean {
  const now = Date.now();

  // Purge expired entries periodically to avoid unbounded growth
  if (store.size > 5000) {
    for (const [key, entry] of store) {
      if (now > entry.resetAt) store.delete(key);
    }
  }

  const entry = store.get(ip);
  if (!entry || now > entry.resetAt) {
    store.set(ip, { count: 1, resetAt: now + WINDOW_MS });
    return false;
  }

  if (entry.count >= MAX_PER_WINDOW) return true;
  entry.count++;
  return false;
}
