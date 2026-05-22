"use client";

import { Award, Building2, Map, Users } from "lucide-react";
import type { LucideIcon } from "lucide-react";

import DayalCounter from "@/components/dayal/DayalCounter";
import DayalReveal from "@/components/dayal/DayalReveal";
import { METRICS } from "@/lib/dayal/data";

const METRIC_ICONS: Record<string, LucideIcon> = {
  award: Award,
  users: Users,
  map: Map,
  building: Building2,
};

export default function DayalTrustBar() {
  return (
    <section id="about" className="bg-[#0b1633] py-10 lg:py-12">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <DayalReveal>
          <div className="flex flex-col gap-10 lg:flex-row lg:items-center lg:justify-between">
            <div className="grid flex-1 grid-cols-2 gap-8 sm:grid-cols-4">
              {METRICS.map((m) => {
                const Icon = METRIC_ICONS[m.icon] ?? Award;
                return (
                  <div key={m.label} className="text-center sm:text-left">
                    <Icon className="mx-auto h-6 w-6 text-[#c8a46b] sm:mx-0" strokeWidth={1.5} />
                    <p className="dayal-serif mt-3 text-3xl font-bold text-white sm:text-4xl">
                      <DayalCounter value={m.value} suffix={m.suffix} />
                    </p>
                    <p className="mt-1 text-xs font-medium uppercase tracking-wider text-[#c8a46b]">
                      {m.label}
                    </p>
                  </div>
                );
              })}
            </div>
            <p className="dayal-serif max-w-sm text-center text-xl leading-snug text-white/90 lg:text-right lg:text-2xl">
              Building <span className="text-[#c8a46b]">more than</span> homes,{" "}
              <span className="text-[#c8a46b]">we build</span> relationships.
            </p>
          </div>
        </DayalReveal>
      </div>
    </section>
  );
}
