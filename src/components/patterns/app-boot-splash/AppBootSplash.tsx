'use client';

import { useEffect, useState } from 'react';

import {
  BOOT_DOM_FAILSAFE_MS,
  BOOT_FADE_OUT_MS,
  revealBootedDocument,
  waitUntilBootReady,
} from './boot-ready';
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
    let finished = false;

    const finish = () => {
      if (cancelled || finished) return;
      finished = true;
      revealBootedDocument();
      setPhase('leaving');
      leaveTimer = window.setTimeout(() => {
        if (!cancelled) setPhase('gone');
      }, BOOT_FADE_OUT_MS);
    };

    void (async () => {
      try {
        const currentPath = location.pathname || '';
        const fastHome = currentPath === '/' || currentPath === '';
        await waitUntilBootReady({ fast: fastHome });
      } catch {
        /* fail-open — never trap the page behind the splash */
      } finally {
        finish();
      }
    })();

    // Absolute failsafe if async work stalls (timers throttled, etc.)
    const hardTimer = window.setTimeout(finish, BOOT_DOM_FAILSAFE_MS);

    return () => {
      cancelled = true;
      window.clearTimeout(leaveTimer);
      window.clearTimeout(hardTimer);
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
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            className="bc-boot-splash__logo"
            src="/brand/logo-mark.webp"
            alt=""
            width={40}
            height={28}
            decoding="async"
            fetchPriority="high"
          />
        </div>
      </div>
    </div>
  );
}
