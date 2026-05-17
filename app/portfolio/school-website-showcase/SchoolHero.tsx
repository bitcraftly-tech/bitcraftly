"use client";

import { Award, Monitor, Play, Shield, Sparkles, Users } from "lucide-react";

import { CONTAINER } from "@/lib/constants";

import SchoolAnimatedStats from "./SchoolAnimatedStats";
import { SchoolAdmissionForm } from "./SchoolAdmissionForm";
import { useSchoolDemo } from "./SchoolDemoContext";
import { HERO_BADGES, HERO_SUBHEADLINE, IMAGES } from "./school-demo-data";
import { SchoolLazyImage } from "./SchoolLazyImage";

const BADGE_ICONS = [Shield, Monitor, Users, Sparkles] as const;

export default function SchoolHero() {
  const { scrollToSection, setVideoOpen } = useSchoolDemo();

  return (
    <section id="top" className="school-hero relative min-h-[520px] overflow-hidden bg-[var(--school-navy)] sm:min-h-[560px] lg:min-h-[580px]">
      {/* Classroom photo — right side only (desktop) */}
      <div className="school-hero-photo absolute inset-0 z-0">
        <SchoolLazyImage
          src={IMAGES.heroBg}
          alt="Students in classroom"
          wrapperClassName="h-full w-full"
          className="h-full w-full object-cover object-[75%_42%] lg:object-[78%_38%]"
          eager
          fallbackSrc={IMAGES.heroBgFallback}
        />
      </div>

      {/* Navy panel with smooth curved right edge (not stretched SVG) */}
      <div className="school-hero-navy-panel absolute inset-y-0 left-0 z-[1]" aria-hidden />

      <div className={`${CONTAINER} relative z-10`}>
        <div className="school-hero-body grid gap-8 py-10 sm:py-11 lg:grid-cols-[minmax(0,1fr)_minmax(280px,340px)] lg:items-start lg:gap-6 lg:py-12 xl:gap-8">
          <div className="school-hero-copy max-w-xl lg:max-w-[520px] lg:pt-2">
            <h1 className="text-[1.85rem] font-bold leading-[1.12] text-white sm:text-4xl lg:text-[2.55rem]">
              Inspiring Excellence, <span className="school-highlight">Building Tomorrow.</span>
            </h1>
            <p className="mt-4 max-w-md text-sm leading-relaxed text-white/95 sm:text-[15px]">{HERO_SUBHEADLINE}</p>

            <ul className="mt-7 flex flex-wrap gap-x-5 gap-y-3 sm:gap-x-6">
              {HERO_BADGES.map((b, i) => {
                const Icon = BADGE_ICONS[i] ?? Award;
                return (
                  <li key={b.label} className="flex items-center gap-2">
                    <Icon className="h-5 w-5 shrink-0 text-[var(--school-orange)]" strokeWidth={1.5} aria-hidden />
                    <span className="text-xs font-medium text-white sm:text-sm">{b.label}</span>
                  </li>
                );
              })}
            </ul>

            <div className="mt-8 flex flex-wrap gap-3">
              <button
                type="button"
                onClick={() => scrollToSection("programs")}
                className="school-btn-orange rounded px-7 py-3 text-sm font-bold uppercase tracking-wide"
              >
                Explore More
              </button>
              <button
                type="button"
                onClick={() => setVideoOpen(true)}
                className="school-btn-hero-video inline-flex items-center gap-3 rounded px-2 py-2 pr-5 text-sm font-bold uppercase tracking-wide sm:px-3 sm:pr-6 sm:py-3"
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
            className="school-enquiry-card relative z-20 scroll-mt-28 overflow-hidden rounded-2xl bg-white shadow-[0_12px_40px_rgba(15,39,68,0.28)] lg:mt-2 lg:justify-self-end"
          >
            <div className="border-b school-border px-5 py-4 text-center">
              <p className="text-xs font-medium text-[var(--school-text)]">2026-27</p>
              <p className="mt-0.5 text-lg font-bold leading-tight text-[var(--school-orange)]">Admissions Open</p>
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
