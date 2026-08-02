'use client';

import { BookOpen, Globe, KeyRound, Laptop, RefreshCw, TrendingUp } from 'lucide-react';
import type { CSSProperties } from 'react';

import { RPYTECH_CONTAINER, RPYTECH_ELEARNING } from '@/lib/rpytechShowcaseData';

import { useRpytechReveal } from './useRpytechReveal';

const BENEFIT_ICONS = {
  skills: TrendingUp,
  self: BookOpen,
  knowledge: Laptop,
  access: KeyRound,
  refresh: RefreshCw,
  global: Globe,
} as const;

function scrollToTarget(id: string) {
  document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' });
}

export default function RpytechELearningSection() {
  const { ref, visible } = useRpytechReveal(0.12);

  return (
    <section
      id="e-learning"
      ref={ref}
      className={`rpytech-elearning-section rpytech-page-section scroll-mt-28${visible ? ' rpytech-elearning-section--visible' : ''}`}
    >
      <div className={RPYTECH_CONTAINER}>
        <div className="rpytech-elearning-header">
          <p
            className="rpytech-section-label rpytech-section-label--left rpytech-reveal"
            style={{ '--reveal-delay': '0ms' } as CSSProperties}
          >
            {RPYTECH_ELEARNING.label}
          </p>
          <button
            type="button"
            className="rpytech-elearning-cta rpytech-reveal"
            style={{ '--reveal-delay': '80ms' } as CSSProperties}
            onClick={() => scrollToTarget(RPYTECH_ELEARNING.ctaTargetId)}
          >
            {RPYTECH_ELEARNING.ctaLabel}
          </button>
        </div>

        <div className="rpytech-elearning-grid">
          {RPYTECH_ELEARNING.benefits.map((benefit, index) => {
            const Icon = BENEFIT_ICONS[benefit.icon];

            return (
              <article
                key={benefit.title}
                className={`rpytech-elearning-card rpytech-elearning-card--${benefit.tone} rpytech-reveal`}
                style={{ '--reveal-delay': `${140 + index * 70}ms` } as CSSProperties}
              >
                <div className="rpytech-elearning-icon" aria-hidden="true">
                  <Icon className="size-6" strokeWidth={1.75} />
                </div>
                <h3>{benefit.title}</h3>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
