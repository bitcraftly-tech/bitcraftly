'use client';

import { useEffect } from 'react';

/**
 * Loads below-hero decorative CSS after first paint.
 * Visibility fail-open rules live in homepage-critical.css so content
 * never depends on this file to become visible (avoids blank mid-page).
 */
export function HomepageDeferredCss() {
  useEffect(() => {
    let cancelled = false;
    let raf2 = 0;

    const raf1 = window.requestAnimationFrame(() => {
      raf2 = window.requestAnimationFrame(() => {
        if (!cancelled) {
          void import('./homepage-deferred-styles').catch(() => {
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
