'use client';

import Image from 'next/image';
import { Check, Video } from 'lucide-react';

import ShowcaseAnchor from '@bitcraftly/showcase-shared/ShowcaseAnchor';

import { CLINIC_TELEHEALTH } from '@bitcraftly/showcase-clinic-healthcare/app/clinic-healthcare-showcase/clinic-data';

import ClinicReveal from './ClinicReveal';

export default function ClinicTelehealth() {
  return (
    <section id="telehealth" className="cl-telehealth" aria-labelledby="clinic-telehealth-heading">
      <div className="cl-container cl-section--tight">
        <div className="cl-telehealth__panel">
          <ClinicReveal direction="left" className="cl-telehealth__media-wrap">
            <div className="cl-telehealth__device" aria-hidden={false}>
              <div className="cl-telehealth__bezel">
                <div className="cl-media cl-telehealth__screen">
                  <Image
                    src={CLINIC_TELEHEALTH.image}
                    alt={CLINIC_TELEHEALTH.imageAlt}
                    fill
                    loading="lazy"
                    sizes="(max-width: 1024px) 90vw, 34rem"
                    className="object-cover"
                  />
                </div>
              </div>
              <div className="cl-telehealth__stand" aria-hidden />
            </div>
          </ClinicReveal>

          <div className="cl-telehealth__content">
            <ClinicReveal direction="right">
              <p className="cl-eyebrow">
                <Video className="h-3.5 w-3.5" aria-hidden />
                {CLINIC_TELEHEALTH.eyebrow}
              </p>
              <h2 id="clinic-telehealth-heading" className="cl-h2 cl-telehealth__title">
                {CLINIC_TELEHEALTH.title}
              </h2>
              <p className="cl-body cl-telehealth__copy">{CLINIC_TELEHEALTH.copy}</p>
            </ClinicReveal>

            <ul className="cl-telehealth__benefits">
              {CLINIC_TELEHEALTH.benefits.map((benefit, index) => (
                <ClinicReveal as="li" key={benefit} delay={0.08 + index * 0.06} direction="right">
                  <div className="cl-telehealth__benefit">
                    <span className="cl-telehealth__check" aria-hidden>
                      <Check className="h-3.5 w-3.5" strokeWidth={3} />
                    </span>
                    <span className="cl-telehealth__benefit-text">{benefit}</span>
                  </div>
                </ClinicReveal>
              ))}
            </ul>

            <ClinicReveal delay={0.28} direction="right">
              <ShowcaseAnchor
                href="#appointment"
                className="cl-btn cl-btn--primary cl-telehealth__cta"
              >
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
