'use client';

import ShowcaseAnchor from '@/components/portfolio/ShowcaseAnchor';

import {
  CLINIC_QUICK_CTA,
  CLINIC_QUICK_SERVICES,
} from '@/app/portfolio/clinic-healthcare-showcase/clinic-data';

import ClinicReveal from './ClinicReveal';

export default function ClinicQuickServices() {
  const { icon: CtaIcon, label, href } = CLINIC_QUICK_CTA;

  return (
    <section aria-labelledby="clinic-quick-heading" className="cl-quick">
      <div className="cl-container">
        <h2 id="clinic-quick-heading" className="sr-only">
          Quick services
        </h2>

        <ul className="cl-quick-grid">
          {CLINIC_QUICK_SERVICES.map(({ icon: Icon, title, copy, href: to }, index) => (
            <ClinicReveal as="li" key={title} delay={index * 0.07}>
              <ShowcaseAnchor href={to} className="cl-card cl-card--lift cl-quick-card">
                <span className="cl-icon-tile">
                  <Icon className="h-5 w-5" strokeWidth={1.8} aria-hidden />
                </span>
                <span className="cl-quick-card__title">{title}</span>
                <span className="cl-quick-card__copy">{copy}</span>
              </ShowcaseAnchor>
            </ClinicReveal>
          ))}

          <ClinicReveal as="li" delay={CLINIC_QUICK_SERVICES.length * 0.07}>
            <ShowcaseAnchor href={href} className="cl-quick-cta">
              <CtaIcon className="h-5 w-5 shrink-0" strokeWidth={1.8} aria-hidden />
              {label}
            </ShowcaseAnchor>
          </ClinicReveal>
        </ul>
      </div>
    </section>
  );
}
