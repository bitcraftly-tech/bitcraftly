'use client';

import Image from 'next/image';
import { Check, Video } from 'lucide-react';

import ShowcaseAnchor from '@/components/portfolio/ShowcaseAnchor';

import { CLINIC_TELEHEALTH } from '@/app/portfolio/clinic-healthcare-showcase/clinic-data';

import ClinicReveal from './ClinicReveal';

export default function ClinicTelehealth() {
  return (
    <section id="telehealth" aria-labelledby="clinic-telehealth-heading">
      <div className="cl-container cl-section--tight">
        <div
          className="grid items-center gap-8 rounded-[1.75rem] px-6 py-8 sm:px-9 lg:grid-cols-2 lg:gap-12 lg:px-12 lg:py-12"
          style={{
            background:
              'linear-gradient(135deg, var(--cl-surface-tint) 0%, color-mix(in srgb, var(--cl-accent) 16%, var(--cl-surface-tint)) 100%)',
            border: '1px solid var(--cl-border)',
          }}
        >
          <ClinicReveal direction="left">
            {/* Laptop mock keeps the video-consult framing without shipping a device photo. */}
            <div className="mx-auto w-full max-w-md">
              <div className="rounded-2xl bg-[#1e293b] p-2 shadow-[0_18px_40px_rgb(15_23_42_/_0.25)]">
                <div className="cl-media relative aspect-[16/10] overflow-hidden rounded-xl">
                  <Image
                    src={CLINIC_TELEHEALTH.image}
                    alt={CLINIC_TELEHEALTH.imageAlt}
                    fill
                    loading="lazy"
                    sizes="(max-width: 1024px) 88vw, 30rem"
                    className="object-cover"
                  />
                </div>
              </div>
              <div className="mx-auto h-2.5 w-[86%] rounded-b-xl bg-[#334155]" aria-hidden />
            </div>
          </ClinicReveal>

          <div>
            <ClinicReveal direction="right">
              <p className="cl-eyebrow">
                <Video className="h-3.5 w-3.5" aria-hidden />
                {CLINIC_TELEHEALTH.eyebrow}
              </p>
              <h2 id="clinic-telehealth-heading" className="cl-h2 mt-4">
                {CLINIC_TELEHEALTH.title}
              </h2>
              <p className="cl-body mt-4 max-w-lg">{CLINIC_TELEHEALTH.copy}</p>
            </ClinicReveal>

            <ul className="mt-6 space-y-3">
              {CLINIC_TELEHEALTH.benefits.map((benefit, index) => (
                <ClinicReveal
                  as="li"
                  key={benefit}
                  delay={0.1 + index * 0.07}
                  direction="right"
                  className="flex items-start gap-2.5 text-[0.9375rem]"
                >
                  <span
                    className="mt-0.5 inline-flex h-5 w-5 shrink-0 items-center justify-center rounded-full"
                    style={{
                      background: 'linear-gradient(135deg, var(--cl-primary), var(--cl-accent))',
                      color: 'var(--cl-on-primary)',
                    }}
                    aria-hidden
                  >
                    <Check className="h-3 w-3" strokeWidth={3} />
                  </span>
                  <span style={{ color: 'var(--cl-muted)' }}>{benefit}</span>
                </ClinicReveal>
              ))}
            </ul>

            <ClinicReveal delay={0.32} direction="right">
              <ShowcaseAnchor href="#appointment" className="cl-btn cl-btn--primary mt-7">
                <Video className="h-4 w-4" aria-hidden />
                Start Video Consultation
              </ShowcaseAnchor>
            </ClinicReveal>
          </div>
        </div>
      </div>
    </section>
  );
}
