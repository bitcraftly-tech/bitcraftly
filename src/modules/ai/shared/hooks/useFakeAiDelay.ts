'use client';

import { useCallback, useState } from 'react';

/**
 * Tiny fake latency helper for showcase AI demos.
 * Resolves with the producer result after `ms` (skipped when reduced motion is preferred).
 */
export function useFakeAiDelay(ms = 1400) {
  const [busy, setBusy] = useState(false);

  const run = useCallback(
    async <T>(producer: () => T | Promise<T>): Promise<T> => {
      setBusy(true);
      try {
        const reduced =
          typeof window !== 'undefined' &&
          window.matchMedia('(prefers-reduced-motion: reduce)').matches;
        if (!reduced) {
          await new Promise((resolve) => {
            window.setTimeout(resolve, ms);
          });
        }
        return await producer();
      } finally {
        setBusy(false);
      }
    },
    [ms],
  );

  return { busy, run } as const;
}
