'use client';

import { Icon } from '@/components/ui/icon';
import { cn } from '@/lib/cn';
import { CalendlyCta } from './CalendlyCta';
import { FreeAuditCta } from './FreeAuditCta';
import { WhatsAppCta } from './WhatsAppCta';
import { isCalendlyConfigured } from '../lead-funnel.config';
import type { LeadIntent } from '../types';

interface LeadChannelGridProps {
  source?: string;
  /**
   * When set (contact page), discovery/audit update the lead form in-place
   * instead of navigating to the same `/contact` URL.
   */
  onApplyIntent?: (intent: Extract<LeadIntent, 'discovery' | 'audit'>) => void;
}

const channelButtonClassName = cn('lead-funnel__channel-btn', 'lead-funnel__channel-card-cta');

/**
 * Secondary contact channels beside the main lead form.
 */
export function LeadChannelGrid({ source = 'contact-page', onApplyIntent }: LeadChannelGridProps) {
  const calendlyReady = isCalendlyConfigured();

  return (
    <aside className="lead-funnel__channels" aria-labelledby="lead-channels-heading">
      <div className="lead-funnel__channels-intro">
        <p className="lead-funnel__channels-eyebrow">Prefer another channel?</p>
        <h3 id="lead-channels-heading" className="lead-funnel__channels-title">
          Other ways to connect
        </h3>
        <p className="lead-funnel__channels-desc">
          Chat, book a call, or request an audit — same founder-led team.
        </p>
      </div>

      <ul className="lead-funnel__channels-list">
        <li className="lead-funnel__channel-card">
          <div className="lead-funnel__channel-card-header">
            <span className="lead-funnel__channel-card-icon" aria-hidden>
              <Icon name="message" size="sm" className="h-[16px] w-[16px]" />
            </span>
            <div className="lead-funnel__channel-card-copy">
              <p className="lead-funnel__channel-card-label">WhatsApp</p>
              <p className="lead-funnel__channel-card-meta">Fast chat — often same-day replies</p>
            </div>
          </div>
          <WhatsAppCta
            source={source}
            variant="primary"
            className="lead-funnel__channel-card-cta"
          />
        </li>

        <li className="lead-funnel__channel-card">
          <div className="lead-funnel__channel-card-header">
            <span className="lead-funnel__channel-card-icon" aria-hidden>
              <Icon name="calendar" size="sm" className="h-[16px] w-[16px]" />
            </span>
            <div className="lead-funnel__channel-card-copy">
              <p className="lead-funnel__channel-card-label">Discovery call</p>
              <p className="lead-funnel__channel-card-meta">
                {calendlyReady
                  ? 'Pick a slot on our calendar'
                  : 'Prefills the form for a discovery call'}
              </p>
            </div>
          </div>
          {calendlyReady ? (
            <CalendlyCta source={source} className="lead-funnel__channel-card-cta" />
          ) : onApplyIntent ? (
            <button
              type="button"
              className={channelButtonClassName}
              onClick={() => onApplyIntent('discovery')}
            >
              <Icon name="calendar" size="sm" aria-hidden />
              <span>Book a discovery call</span>
            </button>
          ) : (
            <CalendlyCta source={source} className="lead-funnel__channel-card-cta" />
          )}
        </li>

        <li className="lead-funnel__channel-card">
          <div className="lead-funnel__channel-card-header">
            <span className="lead-funnel__channel-card-icon" aria-hidden>
              <Icon name="search" size="sm" className="h-[16px] w-[16px]" />
            </span>
            <div className="lead-funnel__channel-card-copy">
              <p className="lead-funnel__channel-card-label">Website audit</p>
              <p className="lead-funnel__channel-card-meta">
                {onApplyIntent
                  ? 'Prefills the form for a free website audit'
                  : 'Free performance and conversion review'}
              </p>
            </div>
          </div>
          {onApplyIntent ? (
            <button
              type="button"
              className={cn(
                channelButtonClassName,
                'lead-funnel__channel-card-cta--outline',
                'lead-funnel__channel-btn--primary',
              )}
              onClick={() => onApplyIntent('audit')}
            >
              <Icon name="search" size="sm" aria-hidden />
              <span>Get a free website audit</span>
            </button>
          ) : (
            <FreeAuditCta
              source={source}
              className="lead-funnel__channel-card-cta lead-funnel__channel-card-cta--outline"
            />
          )}
        </li>
      </ul>
    </aside>
  );
}
