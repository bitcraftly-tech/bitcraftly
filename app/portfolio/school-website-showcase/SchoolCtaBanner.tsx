"use client";

import { ArrowRight, CalendarCheck, Shield, Sparkles } from "lucide-react";

import { CONTAINER } from "@/lib/constants";

import { useSchoolDemo } from "./SchoolDemoContext";
import { IMAGES } from "./school-demo-data";

const TRUST_PILLS = [
  { icon: Shield, label: "CBSE Curriculum" },
  { icon: Sparkles, label: "Holistic Learning" },
  { icon: CalendarCheck, label: "2026-27 Seats Open" },
] as const;

export default function SchoolCtaBanner() {
  const { scrollToEnquiry, bookCampusVisit } = useSchoolDemo();

  return (
    <section className={`school-cta-section ${CONTAINER} py-14 lg:py-16`}>
      <div className="school-cta-spotlight relative overflow-hidden rounded-3xl border border-[var(--school-border)] bg-white shadow-[0_24px_60px_rgba(15,39,68,0.12)]">
        <div
          className="pointer-events-none absolute -right-16 -top-16 h-56 w-56 rounded-full bg-[var(--school-orange)]/15 blur-2xl"
          aria-hidden
        />
        <div
          className="pointer-events-none absolute -bottom-20 left-1/3 h-48 w-48 rounded-full bg-[var(--school-navy)]/10 blur-2xl"
          aria-hidden
        />

        <div className="grid lg:grid-cols-[minmax(0,1.05fr)_minmax(0,0.95fr)]">
          {/* Content — navy panel with wave edge on desktop */}
          <div className="school-cta-spotlight__content relative z-10 px-6 py-10 sm:px-10 sm:py-12 lg:px-12 lg:py-14">
            <span className="inline-flex items-center rounded-full bg-[var(--school-orange)] px-4 py-1.5 text-[11px] font-bold uppercase tracking-wider text-white">
              Admissions 2026-27
            </span>

            <h2 className="mt-5 text-2xl font-bold leading-[1.15] text-white sm:text-3xl lg:text-[2.15rem]">
              Give Your Child the Best Start for a{" "}
              <span className="text-[var(--school-orange)]">Bright Future</span>
            </h2>

            <p className="mt-4 max-w-md text-sm leading-relaxed text-white/88 sm:text-[15px]">
              Limited seats for the new academic year. Tour our campus, meet our faculty and secure your child&apos;s place
              today.
            </p>

            <ul className="mt-6 flex flex-wrap gap-2">
              {TRUST_PILLS.map(({ icon: Icon, label }) => (
                <li
                  key={label}
                  className="inline-flex items-center gap-1.5 rounded-full border border-white/20 bg-white/10 px-3 py-1.5 text-xs font-semibold text-white backdrop-blur-sm"
                >
                  <Icon className="h-3.5 w-3.5 text-[var(--school-orange)]" aria-hidden />
                  {label}
                </li>
              ))}
            </ul>

            <div className="mt-8 flex flex-wrap gap-3">
              <button
                type="button"
                onClick={scrollToEnquiry}
                className="school-btn-orange inline-flex items-center gap-2 rounded-full px-7 py-3 text-sm font-bold uppercase tracking-wide"
              >
                Apply Now
                <ArrowRight className="h-4 w-4" aria-hidden />
              </button>
              <button
                type="button"
                onClick={bookCampusVisit}
                className="school-btn-cta-outline rounded-full px-7 py-3 text-sm font-bold uppercase tracking-wide"
              >
                Book Campus Visit
              </button>
            </div>

            <p className="school-cta-spotlight__quote mt-8 border-l-4 border-[var(--school-orange)] pl-4 text-sm font-semibold leading-snug text-white/95">
              A Journey of Excellence Begins Here!
            </p>
          </div>

          {/* Photo panel */}
          <div className="relative min-h-[260px] sm:min-h-[300px] lg:min-h-[380px]">
            <img
              src={IMAGES.ctaPanel}
              alt="Students learning at Elevate International School"
              className="absolute inset-0 h-full w-full object-cover"
              loading="lazy"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[var(--school-navy)]/75 via-transparent to-transparent lg:bg-gradient-to-l lg:from-[var(--school-navy)]/40 lg:via-transparent lg:to-transparent" />

            <div className="absolute bottom-5 left-5 right-5 rounded-2xl border border-white/30 bg-white/95 p-4 shadow-lg backdrop-blur-sm sm:left-auto sm:right-6 sm:max-w-[260px]">
              <p className="text-[11px] font-bold uppercase tracking-wide text-[var(--school-orange)]">Why Elevate?</p>
              <p className="mt-1 text-sm font-bold leading-snug text-[var(--school-navy)]">
                25+ years of legacy · 100% board results · world-class campus
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
