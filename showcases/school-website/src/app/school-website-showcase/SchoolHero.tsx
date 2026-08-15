'use client';

import { Award, Monitor, Play, Shield, Sparkles, Users } from 'lucide-react';

import { CONTAINER } from '@/lib/constants';

import SchoolAnimatedStats from './SchoolAnimatedStats';
import { SchoolAdmissionForm } from './SchoolAdmissionForm';
import { useSchoolDemo } from './SchoolDemoContext';
import { HERO_BADGES, HERO_SUBHEADLINE, IMAGES } from './school-demo-data';
import { SchoolLazyImage } from './SchoolLazyImage';

const BADGE_ICONS = [Shield, Monitor, Users, Sparkles] as const;

export default function SchoolHero() {
  const { scrollToEnquiry, setVideoOpen } = useSchoolDemo();

  return (
    <section
      id="top"
      className="school-hero relative min-h-[560px] overflow-hidden bg-[var(--school-navy)] sm:min-h-[600px] lg:min-h-[640px]"
    >
      <div className="school-hero-photo absolute inset-0 z-0">
        <SchoolLazyImage
          src={IMAGES.heroBg}
          alt="Students learning together in a bright classroom"
          wrapperClassName="h-full w-full"
          className="h-full w-full object-cover object-[75%_42%] lg:object-[78%_38%]"
          eager
          fallbackSrc={IMAGES.heroBgFallback}
        />
      </div>

      <div className="school-hero-navy-panel absolute inset-y-0 left-0 z-[1]" aria-hidden />

      <div className={`${CONTAINER} relative z-10`}>
        <div className="school-hero-body grid gap-8 py-10 sm:py-12 lg:grid-cols-[minmax(0,1fr)_minmax(260px,320px)] lg:items-start lg:gap-8 lg:py-14 xl:gap-10">
          <div className="school-hero-copy max-w-xl lg:max-w-[540px] lg:pt-3">
            <p className="text-[11px] font-bold uppercase tracking-[0.18em] text-[var(--school-orange)]">
              Admissions 2026-27 open
            </p>
            <h1 className="mt-3 text-[1.9rem] font-bold leading-[1.12] text-white sm:text-4xl lg:text-[2.65rem]">
              Inspiring Excellence, <span className="school-highlight">Building Tomorrow</span>
            </h1>
            <p className="mt-4 max-w-md text-sm leading-relaxed text-white/92 sm:text-[15px]">
              {HERO_SUBHEADLINE}
            </p>

            <ul className="mt-7 flex flex-wrap gap-x-5 gap-y-3 sm:gap-x-6">
              {HERO_BADGES.slice(0, 3).map((b, i) => {
                const Icon = BADGE_ICONS[i] ?? Award;
                return (
                  <li key={b.label} className="flex items-center gap-2">
                    <Icon
                      className="h-5 w-5 shrink-0 text-[var(--school-orange)]"
                      strokeWidth={1.5}
                      aria-hidden
                    />
                    <span className="text-xs font-medium text-white sm:text-sm">{b.label}</span>
                  </li>
                );
              })}
            </ul>

            <div className="mt-8 flex flex-wrap gap-3">
              <button
                type="button"
                onClick={scrollToEnquiry}
                className="school-btn-orange rounded-md px-7 py-3 text-sm font-bold uppercase tracking-wide"
              >
                Apply Now
              </button>
              <button
                type="button"
                onClick={() => setVideoOpen(true)}
                className="school-btn-hero-video inline-flex items-center gap-3 rounded-md px-2 py-2 pr-5 text-sm font-bold uppercase tracking-wide sm:px-3 sm:pr-6 sm:py-3"
              >
                <span
                  className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-white/90"
                  aria-hidden
                >
                  <Play className="h-3.5 w-3.5 fill-current text-white" />
                </span>
                Watch Video
              </button>
            </div>
          </div>

          <div
            id="enquiry-form"
            className="school-enquiry-card relative z-20 scroll-mt-28 overflow-hidden rounded-2xl bg-white lg:mt-1 lg:justify-self-end"
          >
            <div className="border-b school-border bg-[var(--school-accent-soft)] px-5 py-4 text-center">
              <p className="text-[11px] font-semibold uppercase tracking-wide text-[var(--school-muted)]">
                Session 2026-27
              </p>
              <p className="mt-0.5 text-lg font-bold leading-tight text-[var(--school-navy)]">
                Admissions Open
              </p>
            </div>
            <div className="p-4 sm:p-5">
              <SchoolAdmissionForm hero />
            </div>
          </div>
        </div>

        <SchoolAnimatedStats embedded />
      </div>
    </section>
  );
}
