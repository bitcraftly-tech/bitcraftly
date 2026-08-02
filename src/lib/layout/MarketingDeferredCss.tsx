'use client';

import { useEffect } from 'react';

/**
 * Loads deferred chrome widget CSS after first paint
 * so they are not render-blocking on LCP.
 * Footer + newsletter skins load sync via marketing layout.
 */
export function MarketingDeferredCss() {
  useEffect(() => {
    let cancelled = false;
    let raf2 = 0;

    const raf1 = window.requestAnimationFrame(() => {
      raf2 = window.requestAnimationFrame(() => {
        if (!cancelled) {
          void import('./marketing-deferred-styles').catch(() => {
            /* non-critical */
          });
        }
      });
    });

    return () => {
      cancelled = true;
      window.cancelAnimationFrame(raf1);
      window.cancelAnimationFrame(raf2);
    };
  }, []);

  return null;
}
