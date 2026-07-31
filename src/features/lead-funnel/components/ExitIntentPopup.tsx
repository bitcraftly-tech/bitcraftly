'use client';

import { useCallback, useEffect, useId, useRef, useState } from 'react';
import { usePathname } from 'next/navigation';
import { Icon } from '@/components/ui/icon';
import { Button } from '@/components/ui/button';
import { trackLeadEvent } from '../analytics';
import { LEAD_FUNNEL_CONFIG } from '../lead-funnel.config';
import { FreeAuditCta } from './FreeAuditCta';
import { WhatsAppCta } from './WhatsAppCta';

function wasDismissed(): boolean {
  try {
    return sessionStorage.getItem(LEAD_FUNNEL_CONFIG.exitIntentStorageKey) === '1';
  } catch {
    return false;
  }
}

function markDismissed(): void {
  try {
    sessionStorage.setItem(LEAD_FUNNEL_CONFIG.exitIntentStorageKey, '1');
  } catch {
    // ignore quota / private mode
  }
}

/**
 * Exit-intent popup — WCAG dialog pattern with focus trap and Escape.
 * Skips the contact page (form is already the conversion surface).
 */
export function ExitIntentPopup() {
  const pathname = usePathname();
  const titleId = useId();
  const descId = useId();
  const dialogRef = useRef<HTMLDivElement>(null);
  const previouslyFocused = useRef<HTMLElement | null>(null);
  const [open, setOpen] = useState(false);
  const armedRef = useRef(false);

  const close = useCallback((reason: 'dismiss' | 'cta') => {
    setOpen(false);
    markDismissed();
    trackLeadEvent(reason === 'cta' ? 'exit_intent_cta_click' : 'exit_intent_dismiss', {
      source: 'exit-intent',
    });
    previouslyFocused.current?.focus();
  }, []);

  useEffect(() => {
    if (pathname === LEAD_FUNNEL_CONFIG.contactHref || wasDismissed()) {
      return;
    }

    const armTimer = window.setTimeout(() => {
      armedRef.current = true;
    }, 8000);

    const onMouseOut = (event: MouseEvent) => {
      if (!armedRef.current || open || wasDismissed()) {
        return;
      }
      if (event.clientY <= 0 && event.relatedTarget === null && !event.buttons) {
        previouslyFocused.current = document.activeElement as HTMLElement | null;
        setOpen(true);
        trackLeadEvent('exit_intent_shown', { source: 'exit-intent' });
        armedRef.current = false;
      }
    };

    document.addEventListener('mouseout', onMouseOut);
    return () => {
      window.clearTimeout(armTimer);
      document.removeEventListener('mouseout', onMouseOut);
    };
  }, [open, pathname]);

  useEffect(() => {
    if (!open) {
      return;
    }

    const dialog = dialogRef.current;
    const focusable = dialog?.querySelectorAll<HTMLElement>(
      'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])',
    );
    focusable?.[0]?.focus();

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        event.preventDefault();
        close('dismiss');
        return;
      }
      if (event.key !== 'Tab' || !focusable || focusable.length === 0) {
        return;
      }
      const first = focusable[0];
      const last = focusable[focusable.length - 1];
      if (!first || !last) {
        return;
      }
      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    };

    document.addEventListener('keydown', onKeyDown);
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';

    return () => {
      document.removeEventListener('keydown', onKeyDown);
      document.body.style.overflow = previousOverflow;
    };
  }, [close, open]);

  if (!open) {
    return null;
  }

  return (
    <div className="lead-funnel__exit" role="presentation">
      <button
        type="button"
        className="lead-funnel__exit-backdrop"
        aria-label="Dismiss offer"
        onClick={() => close('dismiss')}
      />
      <div
        ref={dialogRef}
        className="lead-funnel__exit-dialog"
        role="dialog"
        aria-modal="true"
        aria-labelledby={titleId}
        aria-describedby={descId}
      >
        <button
          type="button"
          className="lead-funnel__exit-close"
          aria-label="Close"
          onClick={() => close('dismiss')}
        >
          <Icon name="close" size="sm" aria-hidden />
        </button>
        <p className="lead-funnel__exit-eyebrow">Before you go</p>
        <h2 id={titleId} className="lead-funnel__exit-title">
          Get a free website audit
        </h2>
        <p id={descId} className="lead-funnel__exit-text">
          Speed, mobile UX, and lead-capture checklist — no obligation. Founder reply within one
          business day.
        </p>
        <div className="lead-funnel__exit-actions">
          <FreeAuditCta source="exit-intent" onNavigate={() => close('cta')} />
          <WhatsAppCta
            href={LEAD_FUNNEL_CONFIG.whatsappAuditHref}
            label="WhatsApp the audit request"
            source="exit-intent"
            onNavigate={() => close('cta')}
          />
        </div>
        <Button type="button" variant="ghost" size="sm" onClick={() => close('dismiss')}>
          No thanks
        </Button>
      </div>
    </div>
  );
}
