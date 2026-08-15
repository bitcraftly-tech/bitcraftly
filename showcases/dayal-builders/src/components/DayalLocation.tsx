'use client';

import { GraduationCap, HeartPulse, Plane, ShoppingBag, TrainFront, Route } from 'lucide-react';
import type { LucideIcon } from 'lucide-react';

import DayalReveal from '@bitcraftly/showcase-dayal-builders/components/DayalReveal';
import { DAYAL, NEARBY } from '@bitcraftly/showcase-dayal-builders/lib/data';

const NEARBY_ICONS: Record<string, LucideIcon> = {
  school: GraduationCap,
  hospital: HeartPulse,
  train: TrainFront,
  market: ShoppingBag,
  highway: Route,
  plane: Plane,
};

export default function DayalLocation() {
  return (
    <section id="location" className="py-16 lg:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <DayalReveal className="text-center">
          <p className="text-xs font-semibold uppercase tracking-[0.25em] text-[#c8a46b]">
            Location Advantage
          </p>
          <h2 className="dayal-serif mt-3 text-3xl font-semibold text-[#0b1633] sm:text-4xl">
            Prime Connectivity at {DAYAL.location}
          </h2>
        </DayalReveal>

        <div className="mt-12 grid gap-8 lg:grid-cols-2">
          <DayalReveal>
            <div className="relative min-h-[320px] overflow-hidden rounded-2xl bg-[#0b1633] shadow-xl">
              <div
                className="absolute inset-0 opacity-40"
                style={{
                  background: 'radial-gradient(circle at 50% 45%, #c8a46b55 0%, transparent 55%)',
                }}
              />
              <div className="absolute left-1/2 top-1/2 h-4 w-4 -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#c8a46b] shadow-[0_0_30px_#c8a46b]" />
              <div className="absolute inset-0 flex items-end p-6">
                <div className="rounded-xl border border-white/20 bg-white/10 px-4 py-3 backdrop-blur-md">
                  <p className="text-xs text-white/70">Township Center</p>
                  <p className="font-semibold text-white">Dayal City — Govindpur</p>
                </div>
              </div>
            </div>
          </DayalReveal>

          <div className="grid gap-4 sm:grid-cols-2">
            {NEARBY.map((place, i) => {
              const Icon = NEARBY_ICONS[place.icon] ?? Route;
              return (
                <DayalReveal key={place.name} delay={i * 0.05}>
                  <div className="flex items-center gap-4 rounded-xl border border-[#0b1633]/8 bg-white/80 p-5 shadow-sm backdrop-blur transition hover:border-[#c8a46b]/40 hover:shadow-md">
                    <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-lg bg-[#c8a46b]/15 text-[#c8a46b]">
                      <Icon className="h-5 w-5" />
                    </span>
                    <div>
                      <p className="font-semibold text-[#0b1633]">{place.name}</p>
                      <p className="text-sm text-[#5c6478]">{place.time} drive</p>
                    </div>
                  </div>
                </DayalReveal>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
