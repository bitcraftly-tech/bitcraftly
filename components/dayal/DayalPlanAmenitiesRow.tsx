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
import { motion } from "framer-motion";
import Image from "next/image";
import { useState } from "react";

import DayalReveal from "@/components/dayal/DayalReveal";
import { AMENITIES } from "@/lib/dayal/data";

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

const ZONES = ["Tower A", "Tower B", "Clubhouse", "Central Greens", "Retail Plaza"] as const;

export default function DayalPlanAmenitiesRow() {
  const [active, setActive] = useState(0);

  return (
    <section className="py-16 lg:py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid gap-10 lg:grid-cols-2 lg:gap-14">
          <DayalReveal id="master-plan">
            <p className="text-xs font-semibold uppercase tracking-[0.25em] text-[#c8a46b]">
              Master Plan
            </p>
            <h2 className="dayal-serif mt-2 text-2xl font-semibold text-[#0b1633] sm:text-3xl">
              Township Layout
            </h2>
            <div className="relative mt-6 aspect-[4/3] overflow-hidden rounded-2xl bg-[#0b1633] shadow-xl">
              <Image
                src="https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=900&q=80"
                alt="Dayal City master plan aerial view"
                fill
                className="object-cover opacity-70"
                sizes="50vw"
              />
              {ZONES.map((label, i) => (
                <button
                  key={label}
                  type="button"
                  className="absolute -translate-x-1/2 -translate-y-1/2 rounded-full bg-white/90 px-2 py-1 text-[10px] font-semibold text-[#0b1633] shadow-md transition hover:bg-[#c8a46b] hover:text-white"
                  style={{
                    left: `${20 + i * 15}%`,
                    top: `${30 + (i % 3) * 18}%`,
                  }}
                  onClick={() => setActive(i)}
                >
                  {label}
                </button>
              ))}
              <motion.div
                className="absolute bottom-4 left-4 rounded-lg bg-[#0b1633]/80 px-3 py-2 text-xs text-white backdrop-blur"
                key={active}
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
              >
                Selected: {ZONES[active]}
              </motion.div>
            </div>
            <a href="#contact" className="dayal-btn-outline mt-6 inline-flex">
              View Master Plan
            </a>
          </DayalReveal>

          <DayalReveal delay={0.1} id="amenities">
            <p className="text-xs font-semibold uppercase tracking-[0.25em] text-[#c8a46b]">
              World-Class Amenities
            </p>
            <h2 className="dayal-serif mt-2 text-2xl font-semibold text-[#0b1633] sm:text-3xl">
              Everything Inside the Township
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
