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

      <section id="about" className={`${CONTAINER} scroll-mt-28 py-14 lg:py-16`}>
        <div className="grid gap-8 lg:grid-cols-3 lg:gap-10">
          <div className="relative">
            <SchoolLazyImage
              src={IMAGES.aboutCampus}
              alt="Modern school classroom"
              wrapperClassName="aspect-[4/5] w-full rounded-xl shadow-lg"
              fallbackSeed="campus"
              fallbackSrc={IMAGES.aboutCampusFallback}
              eager
            />
            <button
              type="button"
              onClick={() => setVideoOpen(true)}
              className="absolute left-1/2 top-1/2 flex h-14 w-14 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full bg-[var(--school-orange)] text-white shadow-lg transition hover:scale-105"
              aria-label="Play campus video"
            >
              <Play className="h-6 w-6 fill-current" aria-hidden />
            </button>
            <p className="absolute bottom-4 left-4 rounded-md bg-white/95 px-3 py-1.5 text-xs font-semibold text-[var(--school-navy)] shadow">
              A Campus Beyond Classrooms
            </p>
          </div>
          <div>
            <p className="school-section-label">Welcome to Elevate</p>
            <h2 className="mt-2 text-2xl font-bold text-[var(--school-navy)] sm:text-3xl">
              A Place Where Potential <span className="school-highlight">Meets Opportunity</span>
            </h2>
            <p className="school-text-muted mt-4 text-sm leading-relaxed">
              From playgroup to grade XII, we blend academic rigour with arts, sports and leadership
              — nurturing confident, compassionate global citizens on a world-class campus.
            </p>
            <ul className="mt-5 space-y-2.5">
              {ABOUT_FEATURES.map((f) => (
                <li
                  key={f}
                  className="flex items-center gap-2 text-sm font-medium text-[var(--school-text)]"
                >
                  <Check className="h-4 w-4 shrink-0 text-[var(--school-orange)]" aria-hidden />
                  {f}
                </li>
              ))}
            </ul>
            <button
              type="button"
              onClick={() => scrollToSection('programs')}
              className="school-btn-navy mt-7 rounded-md px-6 py-2.5 text-sm font-bold uppercase"
            >
              Know More About Us
            </button>
          </div>
          <div className="school-vm-panel rounded-2xl border school-border p-5 lg:p-6">
            {VISION_MISSION.map((v) => {
              const Icon = VM_ICONS[v.icon as keyof typeof VM_ICONS];
              return (
                <div
                  key={v.id}
                  className="flex gap-4 border-b school-border py-4 first:pt-0 last:border-0 last:pb-0"
                >
                  <Icon
                    className="mt-0.5 h-5 w-5 shrink-0 text-[var(--school-orange)]"
                    aria-hidden
                  />
                  <div>
                    <h3 className="font-bold text-[var(--school-navy)]">{v.title}</h3>
                    <p className="school-text-muted mt-1 text-sm leading-relaxed">{v.desc}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      <SchoolCampusLife />

      <section id="programs" className="school-bg-surface scroll-mt-28 py-14">
        <div className={CONTAINER}>
          <div className="school-programs-heading mx-auto max-w-xl text-center">
            <p className="school-section-label">Our Programs</p>
            <h2 className="mt-2 text-3xl font-bold text-[var(--school-navy)]">Academic Programs</h2>
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
