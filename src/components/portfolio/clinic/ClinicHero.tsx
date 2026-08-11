'use client';

import Image from 'next/image';
import { CalendarCheck, Play } from 'lucide-react';

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

      <div className="cl-container grid gap-8 pt-10 pb-10 lg:grid-cols-[1.28fr_0.72fr] lg:gap-8 lg:pt-14 lg:pb-0">
        <div className="flex flex-col justify-center lg:pb-14">
          <ClinicReveal>
            <h1 id="clinic-hero-heading" className="cl-display">
              <span className="block">{CLINIC_HERO.titleLead}</span>
              <span className="block" style={{ color: 'var(--cl-primary)' }}>
                {CLINIC_HERO.titleAccent}
              </span>
            </h1>
          </ClinicReveal>

          <ClinicReveal delay={0.08}>
            <p className="cl-body mt-5 max-w-xl">{CLINIC_HERO.description}</p>
          </ClinicReveal>

          <ClinicReveal delay={0.16}>
            <div className="mt-8 flex flex-wrap gap-3">
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

          <ul className="cl-hero-trust mt-10" aria-label="Why patients choose Clinic & Healthcare">
            {CLINIC_HERO.trustPoints.map(({ icon: Icon, title, copy }, index) => (
              <ClinicReveal
                as="li"
                key={title}
                delay={0.24 + index * 0.07}
                className="cl-hero-trust__item"
              >
                <span className="inline-flex" style={{ color: 'var(--cl-primary)' }} aria-hidden>
                  <Icon className="h-5 w-5" strokeWidth={1.8} />
                </span>
                <span className="text-[0.8125rem] leading-snug font-semibold">{title}</span>
                <span className="text-xs" style={{ color: 'var(--cl-faint)' }}>
                  {copy}
                </span>
              </ClinicReveal>
            ))}
          </ul>
        </div>

        <div className="cl-hero__figure order-first lg:order-none">
          <span className="cl-hero__glow" aria-hidden />
          <Image
            src={CLINIC_HERO.image}
            alt={CLINIC_HERO.imageAlt}
            fill
            priority
            fetchPriority="high"
            sizes="(max-width: 640px) 70vw, (max-width: 1024px) 46vw, 34vw"
            className="select-none object-contain object-bottom"
            style={{ objectFit: 'contain', objectPosition: 'bottom center' }}
          />
        </div>
      </div>
    </section>
  );
}
