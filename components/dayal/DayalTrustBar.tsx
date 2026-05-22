"use client";

import { Building2, MapPin, Palette, Users } from "lucide-react";
import type { LucideIcon } from "lucide-react";

import DayalReveal from "@/components/dayal/DayalReveal";
import { ABOUT_PILLARS } from "@/lib/dayal/data";

const PILLAR_ICONS: Record<string, LucideIcon> = {
  design: Palette,
  build: Building2,
  location: MapPin,
  people: Users,
};

export default function DayalTrustBar() {
  return (
    <section className="bg-[#0b1633] py-10 lg:py-12">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <DayalReveal>
          <div className="flex flex-col gap-10 lg:flex-row lg:items-center lg:justify-between">
            <div className="grid flex-1 grid-cols-2 gap-8 sm:grid-cols-4">
              {ABOUT_PILLARS.map((p) => {
                const Icon = PILLAR_ICONS[p.icon] ?? Building2;
                return (
                  <div key={p.label} className="text-center sm:text-left">
                    <Icon className="mx-auto h-6 w-6 text-[#c8a46b] sm:mx-0" strokeWidth={1.5} />
                    <p className="dayal-serif mt-3 text-sm font-semibold leading-snug text-white sm:text-base">
                      {p.label}
                    </p>
                  </div>
                );
              })}
            </div>
            <p className="dayal-serif max-w-sm text-center text-xl leading-snug text-white/90 lg:text-right lg:text-2xl">
              Building <span className="text-[#c8a46b]">more than</span> homes —{" "}
              <span className="text-[#c8a46b]">we build</span> relationships.
            </p>
          </div>
        </DayalReveal>
      </div>
    </section>
  );
}
