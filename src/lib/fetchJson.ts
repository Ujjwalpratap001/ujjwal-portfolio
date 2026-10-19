export interface FetchResult<T> {
  data: T;
  /** true when the data came from the browser cache instead of a fresh request */
  fromCache: boolean;
  /** when the data was last fetched successfully (ms since 1970) */
  savedAt: number;
}

interface CacheEntry<T> {
  savedAt: number;
  data: T;
}

/**
 * Fetches JSON with a timeout and a localStorage cache.
 *  - If a fresh cached copy exists, it is used (no network request).
 *  - If the request fails but an older copy exists, the old copy is returned and marked fromCache.
 *  - If neither works, the error is thrown so the UI can show an honest fallback.
 */
export async function fetchJsonCached<T>(
  key: string,
  url: string,
  ttlMs: number,
  timeoutMs = 8000,
): Promise<FetchResult<T>> {
  const cacheKey = `portfolio:${key}`;
  let stale: CacheEntry<T> | null = null;

  try {
    const raw = localStorage.getItem(cacheKey);
    if (raw) {
      const entry = JSON.parse(raw) as CacheEntry<T>;
      stale = entry;
      if (Date.now() - entry.savedAt < ttlMs) {
        return { data: entry.data, fromCache: true, savedAt: entry.savedAt };
      }
    }
  } catch {
    /* storage unavailable: continue without cache */
  }

  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), timeoutMs);
  try {
    const res = await fetch(url, { signal: controller.signal });
    if (!res.ok) throw new Error(`Request failed (HTTP ${res.status})`);
    const data = (await res.json()) as T;
    const savedAt = Date.now();
    try {
      localStorage.setItem(cacheKey, JSON.stringify({ savedAt, data }));
    } catch {
      /* ignore quota or privacy-mode errors */
    }
    return { data, fromCache: false, savedAt };
  } catch (err) {
    if (stale) return { data: stale.data, fromCache: true, savedAt: stale.savedAt };
    throw err instanceof Error ? err : new Error('Request failed');
  } finally {
    clearTimeout(timer);
  }
}
