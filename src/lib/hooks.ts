import { useEffect, useState } from 'react';
import type { RefObject } from 'react';
import type { FetchResult } from './fetchJson';

export type AsyncState<T> =
  | { status: 'loading' }
  | { status: 'error'; message: string }
  | { status: 'success'; data: T; fromCache: boolean; savedAt: number };

/** Runs an async loader when `enabled` is true and reports loading / error / success. */
export function useAsync<T>(
  load: () => Promise<FetchResult<T>>,
  enabled: boolean,
  deps: unknown[],
): AsyncState<T> {
  const [state, setState] = useState<AsyncState<T>>({ status: 'loading' });

  useEffect(() => {
    if (!enabled) return;
    let alive = true;
    setState({ status: 'loading' });
    load()
      .then((r) => {
        if (alive) setState({ status: 'success', data: r.data, fromCache: r.fromCache, savedAt: r.savedAt });
      })
      .catch((e: unknown) => {
        if (alive) setState({ status: 'error', message: e instanceof Error ? e.message : 'Request failed' });
      });
    return () => {
      alive = false;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [enabled, ...deps]);

  return state;
}

/** Becomes true once the element has come near the viewport (and stays true). */
export function useInView<T extends Element>(ref: RefObject<T>, rootMargin = '250px'): boolean {
  const [seen, setSeen] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el || seen) return;
    if (typeof IntersectionObserver === 'undefined') {
      setSeen(true);
      return;
    }
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setSeen(true);
          io.disconnect();
        }
      },
      { rootMargin },
    );
    io.observe(el);
    return () => io.disconnect();
  }, [ref, rootMargin, seen]);
  return seen;
}

export function formatDate(ms: number): string {
  return new Date(ms).toLocaleString(undefined, { dateStyle: 'medium', timeStyle: 'short' });
}
