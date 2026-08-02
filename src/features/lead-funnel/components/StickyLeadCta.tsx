'use client';

import { useEffect, useState, useSyncExternalStore } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Icon } from '@/components/ui/icon';
import { NAV_ACTIONS } from '@/constants/navigation';
import { trackLeadEvent } from '../analytics';
import { LEAD_FUNNEL_CONFIG } from '../lead-funnel.config';
import { WhatsAppCta } from './WhatsAppCta';

const dismissListeners = new Set<() => void>();

function subscribeDismiss(onStoreChange: () => void): () => void {
  dismissListeners.add(onStoreChange);
  return () => {
    dismissListeners.delete(onStoreChange);
  };
}

function getDismissedSnapshot(): boolean {
  try {
    return sessionStorage.getItem(LEAD_FUNNEL_CONFIG.stickyCtaStorageKey) === '1';
  } catch {
    return false;
  }
}

function getDismissedServerSnapshot(): boolean {
  return false;
}

function markDismissed(): void {
  try {
    sessionStorage.setItem(LEAD_FUNNEL_CONFIG.stickyCtaStorageKey, '1');
  } catch {
    // ignore
  }
  dismissListeners.forEach((listener) => listener());
}

/**
 * Sticky conversion bar — hidden on contact (form is primary) and when dismissed.
 */
export function StickyLeadCta() {
  const pathname = usePathname();
  const dismissed = useSyncExternalStore(
    subscribeDismiss,
    getDismissedSnapshot,
    getDismissedServerSnapshot,
  );
  const [scrolledPast, setScrolledPast] = useState(false);
  const [trackedShow, setTrackedShow] = useState(false);

  const onContact = pathname === LEAD_FUNNEL_CONFIG.contactHref;
  const visible = !onContact && !dismissed && scrolledPast;

  useEffect(() => {
    const onScroll = () => {
      setScrolledPast(window.scrollY > 480);
    };

    window.addEventListener('scroll', onScroll, { passive: true });
    const timer = window.setTimeout(onScroll, 0);

    return () => {
      window.clearTimeout(timer);
      window.removeEventListener('scroll', onScroll);
    };
  }, [pathname]);

  useEffect(() => {
    if (!visible || trackedShow) {
      return;
    }
    const timer = window.setTimeout(() => {
      trackLeadEvent('sticky_cta_shown', { source: 'sticky-cta' });
      setTrackedShow(true);
    }, 0);
    return () => window.clearTimeout(timer);
  }, [trackedShow, visible]);

  if (!visible) {
    return null;
  }

  return (
    <aside className="lead-funnel__sticky" aria-label="Quick contact options">
      <div className="lead-funnel__sticky-inner">
        <p className="lead-funnel__sticky-copy">
          Ready to talk? Free consultation — reply within 24 hours.
        </p>
        <div className="lead-funnel__sticky-actions">
          <Link
            href={`${LEAD_FUNNEL_CONFIG.contactHref}?intent=consultation&source=sticky-cta`}
            className="lead-funnel__channel-btn lead-funnel__channel-btn--primary lead-funnel__sticky-primary"
            onClick={() => {
              trackLeadEvent('sticky_cta_click', {
                source: 'sticky-cta',
                channel: 'contact',
              });
            }}
          >
            <Icon name="calendar" size="sm" aria-hidden />
            <span>{NAV_ACTIONS.freeConsultation.label}</span>
          </Link>
          <WhatsAppCta
            source="sticky-cta"
            label="WhatsApp"
            className="lead-funnel__sticky-whatsapp"
          />
        </div>
        <button
          type="button"
          className="lead-funnel__sticky-dismiss"
          aria-label="Dismiss sticky contact bar"
          onClick={() => {
            markDismissed();
            trackLeadEvent('sticky_cta_dismiss', { source: 'sticky-cta' });
          }}
        >
          <Icon name="close" size="sm" aria-hidden />
        </button>
      </div>
    </aside>
  );
}
