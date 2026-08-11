'use client';

import { ArrowRight } from 'lucide-react';

import ShowcaseAnchor from '@/components/portfolio/ShowcaseAnchor';

import { CLINIC_SERVICES } from '@/app/portfolio/clinic-healthcare-showcase/clinic-data';

import ClinicReveal from './ClinicReveal';
import ClinicSectionHeading from './ClinicSectionHeading';

export default function ClinicServices() {
  return (
    <section id="services" className="cl-bg-tint" aria-labelledby="clinic-services-heading">
      <div className="cl-container cl-section">
        <ClinicSectionHeading
          id="clinic-services-heading"
          title="Our Healthcare Services"
          subtitle="Eight departments under one roof, so referrals stay inside your care plan."
        />

        <ul className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {CLINIC_SERVICES.map(({ icon: Icon, title, copy }, index) => (
            <ClinicReveal as="li" key={title} delay={Math.min(index, 4) * 0.06} className="h-full">
              <ShowcaseAnchor
                href="#appointment"
                className="cl-card cl-card--lift group flex h-full flex-col p-5"
                aria-label={`${title} — book a consultation`}
              >
                <span className="flex items-start justify-between gap-3">
                  <span className="cl-icon-tile">
                    <Icon className="h-5 w-5" aria-hidden />
                  </span>
                  <ArrowRight
                    className="h-4 w-4 shrink-0 translate-x-0 transition-transform duration-300 group-hover:translate-x-1"
                    style={{ color: 'var(--cl-primary)' }}
                    aria-hidden
                  />
                </span>
                <span className="cl-h3 mt-4 block">{title}</span>
                <span className="cl-small mt-1.5 block">{copy}</span>
              </ShowcaseAnchor>
            </ClinicReveal>
          ))}
        </ul>
      </div>
    </section>
  );
}
