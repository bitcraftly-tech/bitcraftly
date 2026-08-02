'use client';

import { useState } from 'react';
import { Icon } from '@/components/ui/icon';
import { Section } from '@/components/ui/section';
import { trackLeadEvent } from './analytics';
import { ContactLeadFormLazy } from './components/ContactLeadFormLazy';
import { LeadChannelGrid } from './components/LeadChannelGrid';
import type { LeadFunnelDefaults, LeadIntent } from './types';
import './lead-funnel.css';

interface ContactLeadSectionProps {
  defaults?: LeadFunnelDefaults;
}

const TRUST_ITEMS = [
  { icon: 'check' as const, label: 'Reply within 1 business day' },
  { icon: 'shield' as const, label: 'Founder-led, no spam' },
  { icon: 'message' as const, label: 'WhatsApp available' },
];

/**
 * Contact-page conversion section — form + multi-channel CTAs.
 * Channel buttons apply distinct form intents (discovery vs audit).
 */
export function ContactLeadSection({ defaults }: ContactLeadSectionProps) {
  const [appliedIntent, setAppliedIntent] = useState<LeadIntent | undefined>(defaults?.intent);
  const [intentFocusToken, setIntentFocusToken] = useState(0);

  function applyChannelIntent(intent: Extract<LeadIntent, 'discovery' | 'audit'>) {
    setAppliedIntent(intent);
    setIntentFocusToken((token) => token + 1);
    trackLeadEvent(intent === 'audit' ? 'audit_cta_click' : 'calendly_click', {
      source: defaults?.source ?? 'contact-page',
      channel: intent === 'audit' ? 'contact' : 'calendly',
      intent,
    });

    window.requestAnimationFrame(() => {
      document
        .getElementById('contact-lead')
        ?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    });
  }

  const mergedDefaults: LeadFunnelDefaults = {
    ...defaults,
    intent: appliedIntent ?? defaults?.intent,
    source: defaults?.source ?? 'contact-page',
  };

  return (
    <Section
      id="contact-lead"
      spacing="lg"
      background="default"
      aria-labelledby="contact-lead-form-heading"
      className="border-t border-border/40"
    >
      <header className="lead-funnel__intro section-intro-row">
        <p className="lead-funnel__eyebrow">Get started</p>
        <h2 id="contact-lead-form-heading" className="lead-funnel__heading">
          Tell us about your project
        </h2>
        <p className="lead-funnel__lede">
          Share goals, timeline, and constraints. We reply with clear next steps — consultation,
          audit, or a written estimate.
        </p>
        <ul className="lead-funnel__trust">
          {TRUST_ITEMS.map((item) => (
            <li key={item.label} className="lead-funnel__trust-item">
              <Icon
                name={item.icon}
                size="sm"
                aria-hidden
                className="h-[14px] w-[14px] shrink-0 text-primary"
              />
              <span>{item.label}</span>
            </li>
          ))}
        </ul>
      </header>

      <div className="lead-funnel__section">
        <div className="lead-funnel__panel">
          <ContactLeadFormLazy defaults={mergedDefaults} intentFocusToken={intentFocusToken} />
        </div>
        <LeadChannelGrid
          source={defaults?.source ?? 'contact-page'}
          onApplyIntent={applyChannelIntent}
        />
      </div>
    </Section>
  );
}
