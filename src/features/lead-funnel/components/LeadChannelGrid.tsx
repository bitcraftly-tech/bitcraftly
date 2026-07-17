"use client";

import { CalendlyCta } from "./CalendlyCta";
import { FreeAuditCta } from "./FreeAuditCta";
import { WhatsAppCta } from "./WhatsAppCta";
import { isCalendlyConfigured } from "../lead-funnel.config";

interface LeadChannelGridProps {
  source?: string;
}

export function LeadChannelGrid({ source = "contact-page" }: LeadChannelGridProps) {
  const calendlyReady = isCalendlyConfigured();

  return (
    <div className="lead-funnel__channels">
      <h3 className="lead-funnel__channels-title">Other ways to connect</h3>
      <p className="lead-funnel__channels-desc">
        Prefer chat or a calendar invite? Pick a channel — same founder-led team.
      </p>
      <ul className="lead-funnel__channels-list">
        <li>
          <WhatsAppCta source={source} variant="primary" />
        </li>
        <li>
          <CalendlyCta source={source} />
          {!calendlyReady ? (
            <p className="lead-funnel__channels-hint">
              Set <code>NEXT_PUBLIC_CALENDLY_URL</code> to enable live Calendly.
            </p>
          ) : null}
        </li>
        <li>
          <FreeAuditCta source={source} />
        </li>
      </ul>
    </div>
  );
}
