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
    <section className="py-16 lg:py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid gap-10 lg:grid-cols-2 lg:gap-14">
          <DayalReveal>
            <p className="text-xs font-semibold uppercase tracking-[0.25em] text-[#c8a46b]">
              Meet Our Legacy
            </p>
            <h2 className="dayal-serif mt-2 text-2xl font-semibold text-[#0b1633] sm:text-3xl">
              Landmarks of Quality Living
            </h2>
            <p className="mt-4 text-sm leading-relaxed text-[#5c6478] sm:text-base">
              Dayal Galaxy, Dayal Vatika, Dayal Enclave, and Teg Bahadur Block have become symbols of
              quality living. With every new venture, we continue to raise the bar in design,
              durability, and community planning.
            </p>
            {legacyImage && (
              <div className="relative mt-6 aspect-[4/3] overflow-hidden rounded-2xl shadow-xl">
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
            <p className="text-xs font-semibold uppercase tracking-[0.25em] text-[#c8a46b]">
              Project Amenities
            </p>
            <h2 className="dayal-serif mt-2 text-2xl font-semibold text-[#0b1633] sm:text-3xl">
              Thoughtfully Planned Spaces
            </h2>
            <div className="mt-6 grid grid-cols-2 gap-3 sm:grid-cols-3">
              {AMENITIES.map((item) => {
                const Icon = ICON_MAP[item.icon] ?? Building;
                return (
                  <div
                    key={item.name}
                    className="group flex flex-col items-center rounded-xl bg-white px-3 py-5 text-center shadow-sm ring-1 ring-[#0b1633]/5 transition hover:ring-[#c8a46b]/50 hover:shadow-md"
                  >
                    <span className="flex h-11 w-11 items-center justify-center rounded-full border border-[#c8a46b]/40 text-[#c8a46b] transition group-hover:bg-[#c8a46b]/10 group-hover:shadow-[0_0_16px_rgba(200,164,107,0.3)]">
                      <Icon className="h-5 w-5" strokeWidth={1.5} />
                    </span>
                    <p className="mt-3 text-[11px] font-medium leading-tight text-[#0b1633] sm:text-xs">
                      {item.name}
                    </p>
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
