'use client';

import {
  Baby,
  Building,
  Car,
  Dumbbell,
  Flower2,
  Footprints,
  Landmark,
  Shield,
  Waves,
  Zap,
} from 'lucide-react';
import type { LucideIcon } from 'lucide-react';
import Image from 'next/image';

import DayalReveal from '@/components/dayal/DayalReveal';
import { AMENITIES, ONGOING_PROJECTS } from '@/lib/dayal/data';

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

export default function DayalPlanAmenitiesRow() {
  const legacyImage = ONGOING_PROJECTS[0]?.image;

  return (
    <section className="py-12">
      <div className="dayal-container">
        <div className="grid gap-10 lg:grid-cols-2 lg:gap-14">
          <DayalReveal>
            <p className="dayal-eyebrow">Meet Our Legacy</p>
            <h2 className="dayal-section-title mt-2">Landmarks of Quality Living</h2>
            <p className="dayal-body mt-4">
              Dayal Galaxy, Dayal Vatika, Dayal Enclave, and Teg Bahadur Block have become symbols
              of quality living. With every new venture, we continue to raise the bar in design,
              durability, and community planning.
            </p>
            {legacyImage && (
              <div className="dayal-media-skeleton relative mt-6 aspect-[4/3] overflow-hidden rounded-2xl shadow-xl">
                <Image
                  src={legacyImage}
                  alt="Dayal Builders ongoing project"
                  fill
                  className="object-cover"
                  sizes="50vw"
                />
              </div>
            )}
            <a
              href="https://www.dayalbuilder.com/"
              target="_blank"
              rel="noopener noreferrer"
              className="dayal-btn-outline mt-6 inline-flex"
            >
              View More Projects
            </a>
          </DayalReveal>

          <DayalReveal delay={0.1} id="amenities">
            <p className="dayal-eyebrow">Project Amenities</p>
            <h2 className="dayal-section-title mt-2">Thoughtfully Planned Spaces</h2>
            <ul className="mt-6 grid grid-cols-2 gap-3 sm:grid-cols-3">
              {AMENITIES.map((item, i) => {
                const Icon = ICON_MAP[item.icon] ?? Building;
                return (
                  <DayalReveal
                    as="li"
                    key={item.name}
                    delay={0.12 + i * 0.05}
                    className="group flex flex-col items-center rounded-xl bg-white px-3 py-5 text-center shadow-sm ring-1 ring-[#0b1633]/5 transition hover:ring-[#c8a46b]/50 hover:shadow-md"
                  >
                    <span className="flex h-11 w-11 items-center justify-center rounded-full border border-[#c8a46b]/40 text-[#c8a46b] transition group-hover:bg-[#c8a46b]/10 group-hover:shadow-[0_0_16px_rgba(200,164,107,0.3)]">
                      <Icon className="h-5 w-5" strokeWidth={1.5} />
                    </span>
                    <p className="dayal-caption mt-3 font-medium leading-tight text-[#0b1633]">
                      {item.name}
                    </p>
                  </DayalReveal>
                );
              })}
            </ul>
          </DayalReveal>
        </div>
      </div>
    </section>
  );
}
