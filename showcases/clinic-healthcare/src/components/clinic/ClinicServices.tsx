'use client';

import { ArrowRight } from 'lucide-react';

import ShowcaseAnchor from '@bitcraftly/showcase-shared/ShowcaseAnchor';

import { CLINIC_SERVICES } from '@bitcraftly/showcase-clinic-healthcare/app/clinic-healthcare-showcase/clinic-data';

import ClinicReveal from './ClinicReveal';
import ClinicSectionHeading from './ClinicSectionHeading';

export default function ClinicServices() {
  return (
    <section
      id="services"
      className="cl-services cl-bg-tint"
      aria-labelledby="clinic-services-heading"
    >
      <div className="cl-container cl-section">
        <ClinicSectionHeading
          id="clinic-services-heading"
          title="Our Healthcare Services"
          subtitle="Eight departments under one roof, so referrals stay inside your care plan."
        />

        <ul className="cl-services__grid">
          {CLINIC_SERVICES.map(({ icon: Icon, title, copy }, index) => (
            <ClinicReveal as="li" key={title} delay={Math.min(index, 4) * 0.05} className="h-full">
              <ShowcaseAnchor
                href="#appointment"
                className="cl-card cl-card--lift cl-service-card group"
                aria-label={`${title} — book a consultation`}
              >
                <span className="cl-service-card__top">
                  <span className="cl-icon-tile cl-service-card__icon">
                    <Icon className="h-5 w-5" strokeWidth={1.8} aria-hidden />
                  </span>
                  <span className="cl-service-card__arrow" aria-hidden>
                    <ArrowRight className="h-4 w-4" strokeWidth={2} />
                  </span>
                </span>

                <span className="cl-service-card__body">
                  <span className="cl-service-card__title">{title}</span>
                  <span className="cl-service-card__copy">{copy}</span>
                </span>
              </ShowcaseAnchor>
            </ClinicReveal>
          ))}
        </ul>
      </div>
    </section>
  );
}
