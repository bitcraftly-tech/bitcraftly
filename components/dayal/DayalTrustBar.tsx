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
    <section className="dayal-trust-bar relative py-12 lg:py-14">
      <div className="dayal-container relative">
        <DayalReveal>
          <div className="flex flex-col gap-10 lg:flex-row lg:items-center lg:justify-between">
            <div className="grid flex-1 grid-cols-2 gap-8 sm:grid-cols-4">
              {ABOUT_PILLARS.map((p) => {
                const Icon = PILLAR_ICONS[p.icon] ?? Building2;
                return (
                  <div key={p.label} className="text-center sm:text-left">
                    <span
                      className="mx-auto flex h-12 w-12 items-center justify-center rounded-full sm:mx-0"
                      style={{
                        border: "1px solid rgba(201, 169, 98, 0.4)",
                        background: "rgba(201, 169, 98, 0.1)",
                        color: "var(--dayal-gold-light)",
                      }}
                    >
                      <Icon className="h-5 w-5" strokeWidth={1.5} />
                    </span>
                    <p className="dayal-serif mt-4 text-sm font-semibold leading-snug text-white sm:text-base">
                      {p.label}
                    </p>
                  </div>
                );
              })}
            </div>
            <p className="dayal-serif max-w-sm text-center text-xl leading-snug text-white/90 lg:text-right lg:text-2xl">
              Building <span style={{ color: "var(--dayal-gold)" }}>more than</span> homes —{" "}
              <span style={{ color: "var(--dayal-gold)" }}>we build</span> relationships.
            </p>
          </div>
        </DayalReveal>
      </div>
    </section>
  );
}
