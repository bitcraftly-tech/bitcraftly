'use client';

import { useEffect, useState, type CSSProperties } from 'react';

import {
  BOOT_FADE_OUT_MS,
  hasBootRevealCompleted,
  revealBootedDocument,
  waitUntilBootReady,
} from './boot-ready';
import { resolveDemoBootBrand, type DemoBootBrand } from './demo-boot-brands';

function isDarkBackground(hex: string): boolean {
  const raw = hex.replace('#', '');
  if (raw.length !== 6) return false;
  const r = Number.parseInt(raw.slice(0, 2), 16);
  const g = Number.parseInt(raw.slice(2, 4), 16);
  const b = Number.parseInt(raw.slice(4, 6), 16);
  const luminance = (0.299 * r + 0.587 * g + 0.114 * b) / 255;
  return luminance < 0.45;
}

/**
 * Interactive-demo boot splash — brand logo or monogram for the active showcase.
 * Never shows the Bitcraftly logo.
 */
export function DemoBootSplash({
  active = false,
  pathname = '',
}: {
  active?: boolean;
  pathname?: string;
}) {
  const [phase, setPhase] = useState<'booting' | 'leaving' | 'gone' | 'skip'>(() =>
    hasBootRevealCompleted() ? 'gone' : 'booting',
  );
  const [brand, setBrand] = useState<DemoBootBrand>(() =>
    resolveDemoBootBrand(pathname || (typeof location !== 'undefined' ? location.pathname : '')),
  );

  useEffect(() => {
    if (hasBootRevealCompleted()) {
      revealBootedDocument();
      setPhase('gone');
      return;
    }

    const root = document.documentElement;
    const onDemo =
      active ||
      root.classList.contains('bc-demo-booting') ||
      root.getAttribute('data-demo-boot') === '1';

    if (!onDemo) {
      setPhase('skip');
      return;
    }

    const next = resolveDemoBootBrand(
      pathname ||
        root.getAttribute('data-demo-path') ||
        (typeof location !== 'undefined' ? location.pathname : ''),
    );
    setBrand(next);
    root.style.setProperty('--demo-boot-bg', next.background);
    root.style.setProperty('--demo-boot-accent', next.accent);
    root.style.setProperty(
      '--demo-boot-fg',
      isDarkBackground(next.background) ? '#f8fafc' : '#0f172a',
    );

    let cancelled = false;
    let leaveTimer = 0;

    void (async () => {
      await waitUntilBootReady();
      if (cancelled) return;

      revealBootedDocument();
      root.style.removeProperty('--demo-boot-bg');
      root.style.removeProperty('--demo-boot-accent');
      root.style.removeProperty('--demo-boot-fg');
      setPhase('leaving');
      leaveTimer = window.setTimeout(() => {
        if (!cancelled) setPhase('gone');
      }, BOOT_FADE_OUT_MS);
    })();

    return () => {
      cancelled = true;
      window.clearTimeout(leaveTimer);
    };
  }, [active, pathname]);

  const label = `Loading ${brand.name}`;

  if (phase === 'gone' || phase === 'skip') {
    return null;
  }

  const splashStyle = {
    ['--demo-boot-bg']: brand.background,
    ['--demo-boot-accent']: brand.accent,
    ['--demo-boot-fg']: isDarkBackground(brand.background) ? '#f8fafc' : '#0f172a',
  } as CSSProperties;

  return (
    <div
      id="bc-demo-boot-splash"
      role="status"
      aria-live="polite"
      aria-busy={phase === 'booting'}
      aria-label={label}
      data-done={phase === 'leaving' ? 'true' : undefined}
      suppressHydrationWarning
      style={splashStyle}
    >
      <div className="bc-demo-boot__inner">
        <div className="bc-demo-boot__mark-wrap" aria-hidden>
          <span className="bc-demo-boot__ring bc-demo-boot__ring--delayed" />
          <span className="bc-demo-boot__ring" />
          <span className="bc-demo-boot__glow" />
          {brand.logo ? (
            // eslint-disable-next-line @next/next/no-img-element -- boot splash must not depend on next/image hydration
            <img
              className="bc-demo-boot__logo"
              src={brand.logo}
              alt=""
              width={40}
              height={40}
              decoding="async"
            />
          ) : (
            <span className="bc-demo-boot__mark">{brand.monogram}</span>
          )}
        </div>
        <p className="bc-demo-boot__name" suppressHydrationWarning>
          {brand.name}
        </p>
        <p className="bc-demo-boot__hint">Loading demo</p>
      </div>
    </div>
  );
}
