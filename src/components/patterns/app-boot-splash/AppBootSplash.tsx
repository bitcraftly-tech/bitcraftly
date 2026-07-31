'use client';

import { useEffect, useState } from 'react';

import { BOOT_FADE_OUT_MS, revealBootedDocument, waitUntilBootReady } from './boot-ready';
import { isInteractiveDemoPath } from './boot-path';

/**
 * Bitcraftly brand boot splash — marketing / platform pages only.
 * Interactive demos use {@link DemoBootSplash} instead.
 */
export function AppBootSplash() {
  const [phase, setPhase] = useState<'booting' | 'leaving' | 'gone' | 'skip'>('booting');

  useEffect(() => {
    const root = document.documentElement;
    const path = root.getAttribute('data-demo-path') || location.pathname;
    if (
      root.classList.contains('bc-demo-booting') ||
      root.getAttribute('data-demo-boot') === '1' ||
      isInteractiveDemoPath(path)
    ) {
      setPhase('skip');
      return;
    }

    let cancelled = false;
    let leaveTimer = 0;

    void (async () => {
      await waitUntilBootReady();
      if (cancelled) return;

      revealBootedDocument();
      setPhase('leaving');
      leaveTimer = window.setTimeout(() => {
        if (!cancelled) setPhase('gone');
      }, BOOT_FADE_OUT_MS);
    })();

    return () => {
      cancelled = true;
      window.clearTimeout(leaveTimer);
    };
  }, []);

  if (phase === 'gone' || phase === 'skip') {
    return null;
  }

  return (
    <div
      id="bc-boot-splash"
      role="status"
      aria-live="polite"
      aria-busy={phase === 'booting'}
      aria-label="Loading Bitcraftly"
      data-done={phase === 'leaving' ? 'true' : undefined}
    >
      <div className="bc-boot-splash__inner">
        <div className="bc-boot-splash__logo-wrap" aria-hidden>
          <span className="bc-boot-splash__ring bc-boot-splash__ring--delayed" />
          <span className="bc-boot-splash__ring" />
          <span className="bc-boot-splash__logo-glow" />
          {/* Native img — available before Next/Image hydrates; matches header brand icon. */}
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            className="bc-boot-splash__logo"
            src="/brand/icon.webp"
            alt=""
            width={28}
            height={28}
            decoding="async"
            fetchPriority="high"
          />
        </div>
      </div>
    </div>
  );
}
