'use client';

import { useEffect } from 'react';

const REVEAL_SELECTOR = '[data-cc-reveal], [data-cc-reveal-group]';

/**
 * Homepage entrance choreography — a single IntersectionObserver marks
 * `data-cc-reveal` targets as revealed. Reveal styles are gated behind the
 * `data-cc-anim` flag set here, so content stays visible without JS and for
 * visitors who prefer reduced motion.
 */
export default function ClayCraftScrollReveal() {
  useEffect(() => {
    if (typeof IntersectionObserver === 'undefined') return;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    const targets = Array.from(document.querySelectorAll<HTMLElement>(REVEAL_SELECTOR));
    if (targets.length === 0) return;

    const root = document.documentElement;
    root.dataset.ccAnim = 'on';

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (!entry.isIntersecting) continue;
          (entry.target as HTMLElement).dataset.ccRevealed = 'true';
          observer.unobserve(entry.target);
        }
      },
      { rootMargin: '0px 0px -6% 0px', threshold: 0.1 },
    );

    targets.forEach((target) => observer.observe(target));

    return () => {
      observer.disconnect();
      delete root.dataset.ccAnim;
    };
  }, []);

  return null;
}
