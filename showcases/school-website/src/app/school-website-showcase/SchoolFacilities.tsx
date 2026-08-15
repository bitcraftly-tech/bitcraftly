'use client';

import { Building2, Bus, FlaskConical, HeartHandshake, Mic2, Monitor } from 'lucide-react';

import { CONTAINER } from '@/lib/constants';

import { useSchoolDemo } from './SchoolDemoContext';
import { FACILITIES_LIST } from './school-demo-data';

const ICONS = [Monitor, FlaskConical, Building2, Bus, Mic2, HeartHandshake] as const;

export default function SchoolFacilities() {
  const { showToast } = useSchoolDemo();

  return (
    <section id="facilities" className="scroll-mt-28 bg-white py-16 lg:py-20">
      <div className={CONTAINER}>
        <div className="mx-auto max-w-2xl text-center">
          <p className="school-section-label">World-Class Infrastructure</p>
          <h2 className="mt-2 text-3xl font-bold tracking-tight text-[var(--school-navy)] sm:text-4xl">
            Campus Facilities
          </h2>
          <p className="school-text-muted mt-3 text-sm leading-relaxed">
            Purpose-built spaces designed for safety, discovery and excellence across every grade.
          </p>
        </div>
        <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {FACILITIES_LIST.map((f, i) => {
            const Icon = ICONS[i] ?? Monitor;
            return (
              <button
                key={f.title}
                type="button"
                onClick={() => showToast(`${f.title} · virtual tour demo`)}
                className="school-tile school-tile--row school-tile--navy"
              >
                <span className="school-tile__icon">
                  <Icon className="h-6 w-6" aria-hidden />
                </span>
                <div>
                  <h3 className="font-bold text-[var(--school-navy)]">{f.title}</h3>
                  <p className="school-text-muted mt-1 text-sm leading-relaxed">{f.desc}</p>
                </div>
              </button>
            );
          })}
        </div>
      </div>
    </section>
  );
}
