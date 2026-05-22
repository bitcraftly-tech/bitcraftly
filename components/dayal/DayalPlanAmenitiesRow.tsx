"use client";

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
} from "lucide-react";
import type { LucideIcon } from "lucide-react";
import Image from "next/image";

import DayalReveal from "@/components/dayal/DayalReveal";
import { AMENITIES, ONGOING_PROJECTS } from "@/lib/dayal/data";

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
    <section className="dayal-section dayal-section-ivory">
      <div className="dayal-container">
        <div className="grid gap-14 lg:grid-cols-2 lg:gap-16">
          <DayalReveal>
            <p className="dayal-eyebrow">Meet Our Legacy</p>
            <h2 className="dayal-heading dayal-heading-lg mt-5">Landmarks of Quality Living</h2>
            <div className="dayal-gold-line mt-5" />
            <p className="mt-6 text-sm leading-relaxed dayal-text-muted sm:text-base">
              Dayal Galaxy, Dayal Vatika, Dayal Enclave, and Teg Bahadur Block have become symbols of
              quality living. With every new venture, we continue to raise the bar in design,
              durability, and community planning.
            </p>
            {legacyImage && (
              <div className="dayal-image-frame relative mt-8 aspect-[4/3]">
                <Image src={legacyImage} alt="Dayal Builders project" fill className="object-cover" sizes="50vw" />
              </div>
            )}
            <a
              href="https://www.dayalbuilder.com/"
              target="_blank"
              rel="noopener noreferrer"
              className="dayal-btn-outline mt-8 inline-flex"
            >
              View More Projects
            </a>
          </DayalReveal>

          <DayalReveal delay={0.1} id="amenities">
            <p className="dayal-eyebrow">Project Amenities</p>
            <h2 className="dayal-heading dayal-heading-lg mt-5">Thoughtfully Planned Spaces</h2>
            <div className="mt-8 grid grid-cols-2 gap-3 sm:grid-cols-3">
              {AMENITIES.map((item) => {
                const Icon = ICON_MAP[item.icon] ?? Building;
                return (
                  <div key={item.name} className="dayal-amenity-tile group">
                    <span
                      className="flex h-11 w-11 items-center justify-center rounded-full transition group-hover:scale-105"
                      style={{
                        border: "1px solid rgba(201, 169, 98, 0.4)",
                        color: "var(--dayal-gold-dark)",
                        background: "var(--dayal-champagne)",
                      }}
                    >
                      <Icon className="h-5 w-5" strokeWidth={1.5} />
                    </span>
                    <p className="mt-3 text-[11px] font-semibold leading-tight sm:text-xs">{item.name}</p>
                  </div>
                );
              })}
            </div>
          </DayalReveal>
        </div>
      </div>
    </section>
  );
}
