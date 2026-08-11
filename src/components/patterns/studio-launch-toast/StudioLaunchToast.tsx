'use client';

import { useCallback, useEffect, useId, useState } from 'react';
import { createPortal } from 'react-dom';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Icon } from '@/components/ui/icon';
import { ROUTES } from '@/constants/navigation';
import { getAiStudioUrl } from '@/lib/seo/ai-studio-url';
import { cn } from '@/lib/cn';
import './studio-launch-toast.css';

const SHOW_DELAY_MS = 600;

const SKIP_PREFIXES = ['/ai-studio', '/admin', '/owner', '/portfolio', '/login'] as const;

function shouldSkipPath(pathname: string): boolean {
  return SKIP_PREFIXES.some(
    (prefix) => pathname === prefix || pathname.startsWith(`${prefix}/`),
  );
}

/**
 * Soft launch toast for Bitcraftly AI Studio.
 * Shows on each page load until the user dismisses (no session storage).
 */
export function StudioLaunchToast() {
  const pathname = usePathname();
  const titleId = useId();
  const descId = useId();
  const [mounted, setMounted] = useState(false);
  const [visible, setVisible] = useState(false);
  const [exiting, setExiting] = useState(false);

  const dismiss = useCallback(() => {
    setExiting(true);
    window.setTimeout(() => {
      setVisible(false);
      setExiting(false);
    }, 280);
  }, []);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!mounted || shouldSkipPath(pathname)) {
      setVisible(false);
      setExiting(false);
      return;
    }

    setExiting(false);
    setVisible(false);

    const showTimer = window.setTimeout(() => {
      setVisible(true);
    }, SHOW_DELAY_MS);

    return () => window.clearTimeout(showTimer);
  }, [mounted, pathname]);

  useEffect(() => {
    if (!visible || exiting) {
      return;
    }

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        event.preventDefault();
        dismiss();
      }
    };

    document.addEventListener('keydown', onKeyDown);
    return () => document.removeEventListener('keydown', onKeyDown);
  }, [visible, exiting, dismiss]);

  if (!mounted || !visible) {
    return null;
  }

  const studioUrl = getAiStudioUrl();

  return createPortal(
    <div
      className={cn('studio-toast', exiting && 'studio-toast--exit')}
      role="status"
      aria-live="polite"
      aria-labelledby={titleId}
      aria-describedby={descId}
    >
      <div className="studio-toast__accent" aria-hidden />
      <div className="studio-toast__body">
        <span className="studio-toast__icon" aria-hidden>
          <Icon name="sparkles" size="sm" />
        </span>
        <div className="studio-toast__copy">
          <p id={titleId} className="studio-toast__title">
            Bitcraftly AI Studio is live
          </p>
          <p id={descId} className="studio-toast__desc">
            Create reels, posts, and more — open the studio workspace.
          </p>
          <div className="studio-toast__actions">
            <a
              href={studioUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="studio-toast__cta"
              onClick={dismiss}
            >
              Open Studio
              <Icon name="arrow-up-right" size="sm" aria-hidden className="h-[13px] w-[13px]" />
            </a>
            <Link href={ROUTES.aiStudio} className="studio-toast__link" onClick={dismiss}>
              Learn more
            </Link>
          </div>
        </div>
        <button
          type="button"
          className="studio-toast__close"
          aria-label="Dismiss AI Studio notification"
          onClick={dismiss}
        >
          <Icon name="x" size="sm" aria-hidden />
        </button>
      </div>
    </div>,
    document.body,
  );
}
