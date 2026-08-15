'use client';

import { Award, Briefcase, Brain, ClipboardCheck, Presentation } from 'lucide-react';
import type { CSSProperties } from 'react';

import { RPYTECH_CERTIFICATIONS, RPYTECH_CONTAINER } from '@/lib/rpytechShowcaseData';

import { useRpytechReveal } from './useRpytechReveal';

const SERVICE_ICONS = {
  training: Presentation,
  inspection: ClipboardCheck,
} as const;

const STEP_ICONS = {
  skills: Brain,
  certified: Award,
  job: Briefcase,
} as const;

function scrollToTarget(id: string) {
  document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' });
}

function CertWave() {
  return (
    <svg
      className="rpytech-cert-wave"
      viewBox="0 0 400 28"
      preserveAspectRatio="none"
      aria-hidden="true"
    >
      <path d="M0 16 C80 0, 120 0, 200 14 C280 28, 320 28, 400 14 L400 28 L0 28 Z" />
    </svg>
  );
}

export default function RpytechCertificationsSection() {
  const { ref, visible } = useRpytechReveal(0.12);

  return (
    <section
      id="certifications"
      ref={ref}
      className={`rpytech-certs-section rpytech-page-section scroll-mt-28${visible ? ' rpytech-certs-section--visible' : ''}`}
    >
      <div className={RPYTECH_CONTAINER}>
        <p
          className="rpytech-section-label rpytech-section-label--left rpytech-reveal"
          style={{ '--reveal-delay': '0ms' } as CSSProperties}
        >
          {RPYTECH_CERTIFICATIONS.label}
        </p>

        <div className="rpytech-certs-services">
          {RPYTECH_CERTIFICATIONS.services.map((service, index) => {
            const Icon = SERVICE_ICONS[service.icon];
            const cardId =
              service.targetId === 'inspection-services' ? 'inspection-services' : undefined;

            return (
              <article
                key={service.title}
                id={cardId}
                className={`rpytech-cert-service rpytech-cert-service--${service.tone} rpytech-reveal scroll-mt-28`}
                style={{ '--reveal-delay': `${120 + index * 120}ms` } as CSSProperties}
              >
                <div className="rpytech-cert-service-visual">
                  <div className="rpytech-cert-service-visual-inner" aria-hidden="true">
                    <Icon className="rpytech-cert-service-watermark" strokeWidth={1.25} />
                    <span>{service.imageLabel}</span>
                  </div>
                  <CertWave />
                </div>
                <div className="rpytech-cert-service-body">
                  <h3>{service.title}</h3>
                  <button
                    type="button"
                    className="rpytech-cert-service-btn"
                    onClick={() => scrollToTarget(service.targetId)}
                  >
                    VIEW MORE
                  </button>
                </div>
              </article>
            );
          })}
        </div>

        <div className="rpytech-certs-steps">
          {RPYTECH_CERTIFICATIONS.steps.map((step, index) => {
            const Icon = STEP_ICONS[step.icon];

            return (
              <article
                key={step.title}
                className={`rpytech-cert-step rpytech-cert-step--${step.tone} rpytech-reveal`}
                style={{ '--reveal-delay': `${360 + index * 100}ms` } as CSSProperties}
              >
                <div className="rpytech-cert-step-icon" aria-hidden="true">
                  <Icon className="size-6" strokeWidth={1.75} />
                </div>
                <h4>{step.title}</h4>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
