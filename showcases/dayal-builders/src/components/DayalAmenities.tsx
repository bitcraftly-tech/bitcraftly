'use client';

import DayalSectionLink from '@bitcraftly/showcase-dayal-builders/components/DayalSectionLink';
import {
  Baby,
  Car,
  Dumbbell,
  Flower2,
  Footprints,
  Landmark,
  Shield,
  Waves,
  Zap,
  Building,
} from 'lucide-react';
import type { LucideIcon } from 'lucide-react';

import DayalReveal from '@bitcraftly/showcase-dayal-builders/components/DayalReveal';
import { AMENITIES } from '@bitcraftly/showcase-dayal-builders/lib/data';

const ICON_MAP: Record<string, LucideIcon> = {
  club: Building,
  gym: Dumbbell,
  garden: Flower2,
  play: Baby,
  track: Footprints,
  temple: Landmark,
  cctv: Shield,
  pool: Waves,
  power: Zap,
  parking: Car,
};

export default function DayalAmenities() {
  return (
    <section id="amenities" className="py-16 lg:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <DayalReveal className="text-center">
          <p className="text-xs font-semibold uppercase tracking-[0.25em] text-[#c8a46b]">
            World Class Amenities
          </p>
          <h2 className="dayal-serif mt-3 text-3xl font-semibold text-[#0b1633] sm:text-4xl">
            Everything You Need, Inside the Township
          </h2>
        </DayalReveal>

        <div className="mt-12 grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-5 lg:gap-6">
          {AMENITIES.map((item, i) => {
            const Icon = ICON_MAP[item.icon] ?? Building;
            return (
              <DayalReveal key={item.name} delay={i * 0.04}>
                <div className="group flex flex-col items-center rounded-2xl bg-white px-4 py-8 text-center shadow-md ring-1 ring-[#0b1633]/5 transition hover:shadow-lg hover:ring-[#c8a46b]/40">
                  <span className="flex h-14 w-14 items-center justify-center rounded-full border border-[#c8a46b]/50 text-[#c8a46b] transition group-hover:bg-[#c8a46b]/10 group-hover:shadow-[0_0_20px_rgba(200,164,107,0.35)]">
                    <Icon className="h-6 w-6" strokeWidth={1.5} />
                  </span>
                  <p className="mt-4 text-sm font-medium text-[#0b1633]">{item.name}</p>
                </div>
              </DayalReveal>
            );
          })}
        </div>

        <DayalReveal className="mt-10 text-center">
          <DayalSectionLink
            href="#contact"
            className="inline-flex items-center gap-2 text-sm font-semibold text-[#c8a46b] transition hover:gap-3"
          >
            View All Amenities on Site Visit
            <span aria-hidden>→</span>
          </DayalSectionLink>
        </DayalReveal>
      </div>
    </section>
  );
}
