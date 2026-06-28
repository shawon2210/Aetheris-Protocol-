'use client';

import { useEffect, useRef, useState } from 'react';

interface PollingState<T> {
  data: T | null;
  error: string | null;
  loading: boolean;
}

/**
 * Calls `fetcher` immediately, then every `intervalMs`, and exposes the
 * latest result. Used to keep HUD telemetry cards feeling "live" without
 * pulling in a data-fetching library for what is otherwise a simple poll.
 */
export function usePolling<T>(
  fetcher: () => Promise<T>,
  intervalMs: number,
): PollingState<T> {
  const [data, setData] = useState<T | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const fetcherRef = useRef(fetcher);
  fetcherRef.current = fetcher;

  useEffect(() => {
    let cancelled = false;

    const run = async () => {
      try {
        const result = await fetcherRef.current();
        if (!cancelled) {
          setData(result);
          setError(null);
        }
      } catch (err) {
        if (!cancelled) {
          setError(err instanceof Error ? err.message : 'UNKNOWN_FAULT');
        }
      } finally {
        if (!cancelled) {
          setLoading(false);
        }
      }
    };

    run();
    const id = setInterval(run, intervalMs);

    return () => {
      cancelled = true;
      clearInterval(id);
    };
  }, [intervalMs]);

  return { data, error, loading };
}
