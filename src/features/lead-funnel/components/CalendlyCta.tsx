'use client';

import Link from 'next/link';
import { Icon } from '@/components/ui/icon';
import { trackLeadEvent } from '../analytics';
import { isCalendlyConfigured, LEAD_FUNNEL_CONFIG } from '../lead-funnel.config';
import { cn } from '@/lib/cn';

interface CalendlyCtaProps {
  label?: string;
  source?: string;
  className?: string;
}

/**
 * Calendly booking CTA.
 * Uses `NEXT_PUBLIC_CALENDLY_URL` when set; otherwise routes to contact discovery intent.
 */
export function CalendlyCta({
  label = 'Schedule with Calendly',
  source = 'calendly-cta',
  className,
}: CalendlyCtaProps) {
  const configured = isCalendlyConfigured();
  const href = configured ? LEAD_FUNNEL_CONFIG.calendlyUrl : LEAD_FUNNEL_CONFIG.bookCallHref;

  return (
    <Link
      href={href}
      {...(configured ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
      className={cn('lead-funnel__channel-btn', className)}
      onClick={() => {
        trackLeadEvent('calendly_click', {
          source,
          channel: 'calendly',
          configured,
        });
      }}
      aria-label={
        configured
          ? 'Open Calendly to schedule a call'
          : 'Book a discovery call — Calendly URL not configured yet'
      }
    >
      <Icon name="calendar" size="sm" aria-hidden />
      <span>{configured ? label : 'Book a discovery call'}</span>
    </Link>
  );
}
