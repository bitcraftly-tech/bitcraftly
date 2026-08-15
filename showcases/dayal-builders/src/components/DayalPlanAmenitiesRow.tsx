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

import DayalReveal from '@bitcraftly/showcase-dayal-builders/components/DayalReveal';
import { AMENITIES, ONGOING_PROJECTS } from '@bitcraftly/showcase-dayal-builders/lib/data';

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
    <section className="dayal-section dayal-section--white" aria-label="Legacy and amenities">
      <div className="dayal-container">
        <div className="grid items-start gap-12 lg:grid-cols-2 lg:gap-16 xl:gap-20">
          <DayalReveal>
            <p className="dayal-eyebrow">Meet Our Legacy</p>
            <div className="dayal-gold-line mt-3" aria-hidden />
            <h2 className="dayal-section-title mt-4">Landmarks of quality living</h2>
            <p className="dayal-body mt-4 max-w-xl">
              Dayal Galaxy, Dayal Vatika, Dayal Enclave, and Teg Bahadur Block have become symbols
              of quality living. With every new venture, we raise the bar in design, durability, and
              community planning.
            </p>
            {legacyImage ? (
              <div className="dayal-media-skeleton dayal-media-zoom relative mt-7 aspect-[4/3] overflow-hidden rounded-2xl shadow-[0_20px_48px_-28px_rgba(11,22,51,0.45)] ring-1 ring-[#0b1633]/8">
                <Image
                  src={legacyImage}
                  alt="Teg Bahadur Block — Dayal Builders ongoing project"
                  fill
                  className="object-cover"
                  sizes="(max-width: 1024px) 100vw, 50vw"
                />
              </div>
            ) : null}
            <a
              href="https://www.dayalbuilder.com/"
              target="_blank"
              rel="noopener noreferrer"
              className="dayal-btn-outline mt-7 inline-flex"
            >
              View more on dayalbuilder.com
            </a>
          </DayalReveal>

          <DayalReveal delay={0.1} id="amenities" className="scroll-mt-28">
            <p className="dayal-eyebrow">Project Amenities</p>
            <div className="dayal-gold-line mt-3" aria-hidden />
            <h2 className="dayal-section-title mt-4">Thoughtfully planned spaces</h2>
            <p className="dayal-body mt-4 max-w-xl">
              Everyday comforts and shared spaces designed for families — not just apartments on a
              plan.
            </p>
            <ul className="mt-7 grid grid-cols-2 gap-3 sm:grid-cols-3 sm:gap-3.5">
              {AMENITIES.map((item, i) => {
                const Icon = ICON_MAP[item.icon] ?? Building;
                return (
                  <DayalReveal as="li" key={item.name} delay={0.1 + i * 0.04}>
                    <div className="dayal-amenity-tile h-full">
                      <span className="dayal-amenity-tile__icon">
                        <Icon className="h-5 w-5" strokeWidth={1.5} aria-hidden />
                      </span>
                      <p className="text-xs font-semibold leading-snug text-[#0b1633] sm:text-[0.8125rem]">
                        {item.name}
                      </p>
                    </div>
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
