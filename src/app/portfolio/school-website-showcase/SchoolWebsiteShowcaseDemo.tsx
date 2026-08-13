'use client';

import { Check, Eye, Heart, Play, Target } from 'lucide-react';

import { CONTAINER } from '@/lib/constants';

import { useSchoolDemo } from './SchoolDemoContext';
import SchoolCampusLife from './SchoolCampusLife';
import SchoolCtaBanner from './SchoolCtaBanner';
import SchoolContactSection from './SchoolContactSection';
import SchoolFacilities from './SchoolFacilities';
import SchoolHero from './SchoolHero';
import SchoolNewsEventsGallery from './SchoolNewsEventsGallery';
import SchoolProgramsSlider from './SchoolProgramsSlider';
import SchoolQuickActions from './SchoolQuickActions';
import { ABOUT_FEATURES, IMAGES, VISION_MISSION } from './school-demo-data';
import { SchoolLazyImage } from './SchoolLazyImage';

const VM_ICONS = { eye: Eye, target: Target, heart: Heart } as const;

export default function SchoolWebsiteShowcaseDemo() {
  const { scrollToSection, setVideoOpen } = useSchoolDemo();

  return (
    <div>
      <SchoolHero />
      <SchoolQuickActions />

      <section id="about" className={`${CONTAINER} scroll-mt-28 py-16 lg:py-20`}>
        <div className="grid gap-10 lg:grid-cols-[minmax(0,1.05fr)_minmax(0,0.95fr)_minmax(0,0.9fr)] lg:items-start lg:gap-12">
          <div className="school-about-collage relative">
            <div className="school-about-collage__primary group school-media relative">
              <div className="school-media__visual h-full">
                <SchoolLazyImage
                  src={IMAGES.aboutCampus}
                  alt="Modern school classroom with desks and natural light"
                  wrapperClassName="h-full w-full"
                  className="h-full w-full object-cover"
                  fallbackSeed="campus"
                  fallbackSrc={IMAGES.aboutCampusFallback}
                  eager
                />
              </div>
              <button
                type="button"
                onClick={() => setVideoOpen(true)}
                className="absolute left-1/2 top-1/2 flex h-14 w-14 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full bg-[var(--school-orange)] text-white shadow-lg transition hover:scale-105 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--school-orange)]"
                aria-label="Play campus video"
              >
                <Play className="h-6 w-6 fill-current" aria-hidden />
              </button>
              <p className="absolute bottom-4 left-4 rounded-md bg-white/95 px-3 py-1.5 text-xs font-semibold text-[var(--school-navy)] shadow">
                A Campus Beyond Classrooms
              </p>
            </div>
            <div className="school-about-collage__secondary group school-media hidden sm:block">
              <div className="school-media__visual h-full">
                <SchoolLazyImage
                  src={IMAGES.aboutCampusSecondary}
                  alt="Students collaborating in a bright learning space"
                  wrapperClassName="h-full w-full"
                  className="h-full w-full object-cover"
                  fallbackSeed="campus-secondary"
                />
              </div>
            </div>
          </div>

          <div className="lg:pt-2">
            <p className="school-section-label">Welcome to Elevate</p>
            <h2 className="mt-2 text-2xl font-bold leading-tight text-[var(--school-navy)] sm:text-3xl">
              A Place Where Potential <span className="school-highlight">Meets Opportunity</span>
            </h2>
            <p className="school-text-muted mt-4 text-sm leading-relaxed sm:text-[15px]">
              From playgroup to grade XII, we blend academic rigour with arts, sports and leadership
              — nurturing confident, compassionate global citizens on a world-class campus.
            </p>
            <ul className="mt-6 space-y-3">
              {ABOUT_FEATURES.map((f) => (
                <li
                  key={f}
                  className="flex items-center gap-2.5 text-sm font-medium text-[var(--school-text)]"
                >
                  <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-[var(--school-accent-soft)]">
                    <Check className="h-3.5 w-3.5 text-[var(--school-orange)]" aria-hidden />
                  </span>
                  {f}
                </li>
              ))}
            </ul>
            <button
              type="button"
              onClick={() => scrollToSection('programs')}
              className="school-btn-navy mt-8 rounded-md px-6 py-2.5 text-sm font-bold uppercase tracking-wide"
            >
              Learn More
            </button>
          </div>

          <div className="school-vm-panel rounded-2xl border school-border p-5 sm:p-6 lg:mt-1">
            {VISION_MISSION.map((v) => {
              const Icon = VM_ICONS[v.icon as keyof typeof VM_ICONS];
              return (
                <div
                  key={v.id}
                  className="flex gap-4 border-b school-border py-5 first:pt-0 last:border-0 last:pb-0"
                >
                  <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-white text-[var(--school-orange)] shadow-sm">
                    <Icon className="h-5 w-5" aria-hidden />
                  </span>
                  <div>
                    <h3 className="font-bold text-[var(--school-navy)]">{v.title}</h3>
                    <p className="school-text-muted mt-1.5 text-sm leading-relaxed">{v.desc}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      <SchoolCampusLife />

      <section id="programs" className="school-bg-surface scroll-mt-28 py-16 lg:py-20">
        <div className={CONTAINER}>
          <div className="school-programs-heading mx-auto max-w-xl text-center">
            <p className="school-section-label">Our Programs</p>
            <h2 className="mt-2 text-3xl font-bold text-[var(--school-navy)]">Academic Programs</h2>
            <p className="school-text-muted mt-3 text-sm leading-relaxed">
              Clear pathways from foundation years through senior secondary — each stage designed for
              depth, confidence and curiosity.
            </p>
          </div>
          <SchoolProgramsSlider />
        </div>
      </section>

      <SchoolNewsEventsGallery />
      <SchoolFacilities />
      <SchoolCtaBanner />
      <SchoolContactSection />
    </div>
  );
}
