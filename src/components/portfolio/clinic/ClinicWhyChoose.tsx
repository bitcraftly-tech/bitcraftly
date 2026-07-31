'use client';

import Image from 'next/image';

import {
  CLINIC_REASONS,
  CLINIC_WHY_IMAGE,
} from '@/app/portfolio/clinic-healthcare-showcase/clinic-data';

import ClinicReveal from './ClinicReveal';

export default function ClinicWhyChoose() {
  return (
    <section id="why-us" className="cl-bg-surface" aria-labelledby="clinic-why-heading">
      <div className="cl-container cl-section grid items-center gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:gap-14">
        <ClinicReveal direction="left">
          <div
            className="cl-media relative aspect-[4/3] w-full rounded-[1.75rem] lg:aspect-square"
            style={{ boxShadow: 'var(--cl-shadow-md)' }}
          >
            <Image
              src={CLINIC_WHY_IMAGE.src}
              alt={CLINIC_WHY_IMAGE.alt}
              fill
              loading="lazy"
              sizes="(max-width: 1024px) 92vw, 40vw"
              className="object-cover"
            />
          </div>
        </ClinicReveal>

        <div>
          <ClinicReveal direction="right">
            <h2 id="clinic-why-heading" className="cl-h2">
              Why Choose Clinic & Healthcare?
            </h2>
            <span className="cl-rule mt-4" style={{ marginInline: 0 }} aria-hidden />
            <p className="cl-body mt-4 max-w-xl">
              Because your health deserves the best — from the first consultation to the last
              follow-up call.
            </p>
          </ClinicReveal>

          <ul className="mt-8 grid gap-5 sm:grid-cols-2">
            {CLINIC_REASONS.map(({ icon: Icon, title, copy }, index) => (
              <ClinicReveal
                as="li"
                key={title}
                delay={0.08 + index * 0.08}
                direction="right"
                className="flex gap-3"
              >
                <span className="cl-icon-tile shrink-0">
                  <Icon className="h-5 w-5" aria-hidden />
                </span>
                <span className="min-w-0">
                  <span className="block text-[0.9375rem] font-semibold">{title}</span>
                  <span className="cl-small mt-1 block">{copy}</span>
                </span>
              </ClinicReveal>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
