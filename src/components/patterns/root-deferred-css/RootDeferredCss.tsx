'use client';

import { useEffect } from 'react';

/** Loads non-ATF global motion CSS after first paint (all routes). */
export function RootDeferredCss() {
  useEffect(() => {
    let cancelled = false;
    let raf2 = 0;
    const raf1 = window.requestAnimationFrame(() => {
      raf2 = window.requestAnimationFrame(() => {
        if (!cancelled) {
          void import('@/styles/animations.css').catch(() => {
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
