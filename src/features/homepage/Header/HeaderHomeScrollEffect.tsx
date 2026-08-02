'use client';

import { useEffect } from 'react';
import { usePathname } from 'next/navigation';
import { ROUTES } from '@/constants/navigation';

/**
 * Minimal scroll island — toggles document data attributes for header CSS.
 * Non-home routes skip scroll listeners entirely.
 */
export function HeaderHomeScrollEffect() {
  const pathname = usePathname();
  const isHome = pathname === ROUTES.home;

  useEffect(() => {
    const root = document.documentElement;

    if (!isHome) {
      root.dataset.headerMode = 'solid';
      delete root.dataset.headerScrolled;
      return;
    }

    root.dataset.headerMode = 'home';
    let frame = 0;
    let idleId = 0;
    let timeoutId = 0;
    let attached = false;

    function updateScrolled() {
      if (window.scrollY > 12) {
        root.dataset.headerScrolled = 'true';
      } else {
        delete root.dataset.headerScrolled;
      }
    }

    function onScroll() {
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(updateScrolled);
    }

    function attach() {
      if (attached) return;
      attached = true;
      window.addEventListener('scroll', onScroll, { passive: true });
      frame = requestAnimationFrame(updateScrolled);
    }

    if (typeof window.requestIdleCallback === 'function') {
      idleId = window.requestIdleCallback(attach, { timeout: 1200 });
    } else {
      timeoutId = window.setTimeout(attach, 200);
    }

    return () => {
      if (idleId && typeof window.cancelIdleCallback === 'function') {
        window.cancelIdleCallback(idleId);
      }
      if (timeoutId) window.clearTimeout(timeoutId);
      cancelAnimationFrame(frame);
      if (attached) {
        window.removeEventListener('scroll', onScroll);
      }
      delete root.dataset.headerMode;
      delete root.dataset.headerScrolled;
    };
  }, [isHome]);

  return null;
}
