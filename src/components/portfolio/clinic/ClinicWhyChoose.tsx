'use client';

import Image from 'next/image';

import {
  CLINIC_REASONS,
  CLINIC_WHY_IMAGE,
} from '@/app/portfolio/clinic-healthcare-showcase/clinic-data';

import ClinicReveal from './ClinicReveal';

export default function ClinicWhyChoose() {
  return (
    <section id="why-us" className="cl-why cl-bg-surface" aria-labelledby="clinic-why-heading">
      <div className="cl-container cl-section">
        <div className="cl-why__grid">
          <ClinicReveal direction="left" className="cl-why__media-wrap">
            <div className="cl-media cl-why__media">
              <Image
                src={CLINIC_WHY_IMAGE.src}
                alt={CLINIC_WHY_IMAGE.alt}
                fill
                loading="lazy"
                sizes="(max-width: 1024px) 92vw, 44vw"
                className="object-cover"
              />
            </div>
          </ClinicReveal>

          <div className="cl-why__content">
            <ClinicReveal direction="right">
              <h2 id="clinic-why-heading" className="cl-h2">
                Why Choose Clinic & Healthcare?
              </h2>
              <span className="cl-rule mt-4" style={{ marginInline: 0 }} aria-hidden />
              <p className="cl-body cl-why__intro">
                Because your health deserves the best — from the first consultation to the last
                follow-up call.
              </p>
            </ClinicReveal>

            <ul className="cl-why__reasons">
              {CLINIC_REASONS.map(({ icon: Icon, title, copy }, index) => (
                <ClinicReveal as="li" key={title} delay={0.06 + index * 0.06} direction="right">
                  <div className="cl-why-reason">
                    <span className="cl-icon-tile cl-why-reason__icon">
                      <Icon className="h-5 w-5" strokeWidth={1.8} aria-hidden />
                    </span>
                    <div className="cl-why-reason__text">
                      <h3 className="cl-why-reason__title">{title}</h3>
                      <p className="cl-why-reason__copy">{copy}</p>
                    </div>
                  </div>
                </ClinicReveal>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
