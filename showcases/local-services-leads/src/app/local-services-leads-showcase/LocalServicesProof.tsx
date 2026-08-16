'use client';

import { Check } from 'lucide-react';

import { CONTAINER } from '@/lib/constants';

import LocalServicesCounter from './LocalServicesCounter';
import LocalServicesReveal from './LocalServicesReveal';
import { OPERATOR_NOTES, PROOF_STATS } from './local-services.content';

/** Dark proof band with animated metrics and operator notes. */
export default function LocalServicesProof() {
  return (
    <section id="proof" className="lsx-section lsx-proof scroll-mt-28" aria-labelledby="lsx-proof-heading">
      <div className={CONTAINER}>
        <div className="lsx-proof__split">
          <LocalServicesReveal className="lsx-head">
            <p className="lsx-eyebrow">Operator outcomes</p>
            <h2 id="lsx-proof-heading" className="lsx-title">
              Numbers operators understand
            </h2>
            <p className="lsx-lead">
              Illustrative KPIs for a WhatsApp-native home-services funnel — the same patterns we
              wire into CRM, telephony and Cloud API deployments.
            </p>
          </LocalServicesReveal>

          <LocalServicesReveal delay={0.1}>
            <ul className="lsx-proof__list">
              {OPERATOR_NOTES.map((note) => (
                <li key={note}>
                  <Check size={15} strokeWidth={2.5} aria-hidden />
                  {note}
                </li>
              ))}
            </ul>
          </LocalServicesReveal>
        </div>

        <ul className="lsx-proof__grid">
          {PROOF_STATS.map((stat, index) => {
            const Icon = stat.icon;
            return (
              <LocalServicesReveal key={stat.id} as="li" delay={index * 0.06}>
                <span className="lsx-proof__icon" aria-hidden>
                  <Icon size={16} strokeWidth={1.85} />
                </span>
                <strong>
                  <LocalServicesCounter
                    value={stat.value}
                    suffix={stat.suffix}
                    durationMs={1400}
                  />
                </strong>
                <p>{stat.label}</p>
                <small>{stat.detail}</small>
              </LocalServicesReveal>
            );
          })}
        </ul>
      </div>
    </section>
  );
}
