'use client';

import Image from 'next/image';
import { CalendarCheck, Play, Sparkles } from 'lucide-react';

import ShowcaseAnchor from '@/components/portfolio/ShowcaseAnchor';

import { CLINIC_HERO } from '@/app/portfolio/clinic-healthcare-showcase/clinic-data';

import ClinicReveal from './ClinicReveal';

export default function ClinicHero() {
  return (
    <section className="cl-hero" aria-labelledby="clinic-hero-heading">
      <div className="cl-hero__bg" aria-hidden>
        <Image
          src={CLINIC_HERO.backgroundImage}
          alt=""
          fill
          priority
          sizes="100vw"
          className="select-none"
        />
      </div>
      <div className="cl-hero__veil" aria-hidden />

      <div className="cl-container cl-hero__grid">
        <div className="cl-hero__copy">
          <ClinicReveal>
            <p className="cl-eyebrow">
              <Sparkles className="h-3.5 w-3.5" aria-hidden />
              Trusted healthcare centre
            </p>
          </ClinicReveal>

          <ClinicReveal delay={0.06}>
            <h1 id="clinic-hero-heading" className="cl-display cl-hero__title">
              <span className="block">{CLINIC_HERO.titleLead}</span>
              <span className="block cl-hero__title-accent">{CLINIC_HERO.titleAccent}</span>
            </h1>
          </ClinicReveal>

          <ClinicReveal delay={0.12}>
            <p className="cl-body cl-hero__desc">{CLINIC_HERO.description}</p>
          </ClinicReveal>

          <ClinicReveal delay={0.18}>
            <div className="cl-hero__actions">
              <ShowcaseAnchor href="#appointment" className="cl-btn cl-btn--primary">
                <CalendarCheck className="h-4 w-4" aria-hidden />
                Book Appointment
              </ShowcaseAnchor>
              <ShowcaseAnchor href="#telehealth" className="cl-btn cl-btn--outline">
                <span className="cl-btn__play" aria-hidden>
                  <Play className="h-3 w-3" fill="currentColor" strokeWidth={0} />
                </span>
                Watch Our Story
              </ShowcaseAnchor>
            </div>
          </ClinicReveal>

          <ul className="cl-hero-trust" aria-label="Why patients choose Clinic & Healthcare">
            {CLINIC_HERO.trustPoints.map(({ icon: Icon, title, copy }, index) => (
              <ClinicReveal
                as="li"
                key={title}
                delay={0.24 + index * 0.05}
                className="cl-hero-trust__item"
              >
                <span className="cl-hero-trust__icon" aria-hidden>
                  <Icon className="h-5 w-5" strokeWidth={1.8} />
                </span>
                <span className="cl-hero-trust__title">{title}</span>
                <span className="cl-hero-trust__copy">{copy}</span>
              </ClinicReveal>
            ))}
          </ul>
        </div>

        <div className="cl-hero__figure">
          <span className="cl-hero__glow" aria-hidden />
          <Image
            src={CLINIC_HERO.image}
            alt={CLINIC_HERO.imageAlt}
            fill
            priority
            fetchPriority="high"
            sizes="(max-width: 640px) 78vw, (max-width: 1024px) 48vw, 36vw"
            className="select-none object-contain object-bottom"
            style={{ objectFit: 'contain', objectPosition: 'bottom center' }}
          />
        </div>
      </div>
    </section>
  );
}
