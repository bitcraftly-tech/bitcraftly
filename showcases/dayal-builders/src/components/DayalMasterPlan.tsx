'use client';

import { motion } from 'framer-motion';
import { useState } from 'react';

import DayalReveal from '@bitcraftly/showcase-dayal-builders/components/DayalReveal';

const ZONES = [
  { id: 'towers', label: 'Residential Towers', x: 28, y: 35 },
  { id: 'club', label: 'Clubhouse', x: 55, y: 48 },
  { id: 'green', label: 'Central Greens', x: 42, y: 62 },
  { id: 'commercial', label: 'Retail Plaza', x: 72, y: 38 },
  { id: 'parking', label: 'Basement Parking', x: 38, y: 78 },
] as const;

export default function DayalMasterPlan() {
  const [active, setActive] = useState<string>('towers');
  const zone = ZONES.find((z) => z.id === active) ?? ZONES[0];

  return (
    <section id="master-plan" className="bg-[#0b1633] py-16 text-white lg:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <DayalReveal className="text-center">
          <p className="text-xs font-semibold uppercase tracking-[0.25em] text-[#c8a46b]">
            Master Plan
          </p>
          <h2 className="dayal-serif mt-3 text-3xl font-semibold sm:text-4xl">
            Explore the Township Layout
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-white/70">
            Interactive zones highlight towers, clubhouse, green belts, and connectivity — designed
            for clarity before your site visit.
          </p>
        </DayalReveal>

        <DayalReveal delay={0.1} className="mt-12">
          <div className="grid gap-8 lg:grid-cols-3">
            <div className="relative aspect-[4/3] overflow-hidden rounded-2xl border border-[#c8a46b]/30 bg-[#152a52] lg:col-span-2 lg:aspect-auto lg:min-h-[420px]">
              <div
                className="absolute inset-0 opacity-30"
                style={{
                  backgroundImage:
                    'linear-gradient(#c8a46b22 1px, transparent 1px), linear-gradient(90deg, #c8a46b22 1px, transparent 1px)',
                  backgroundSize: '40px 40px',
                }}
              />
              {ZONES.map((z) => (
                <button
                  key={z.id}
                  type="button"
                  className="absolute -translate-x-1/2 -translate-y-1/2"
                  style={{ left: `${z.x}%`, top: `${z.y}%` }}
                  onClick={() => setActive(z.id)}
                  aria-label={z.label}
                >
                  <motion.span
                    className={`block h-4 w-4 rounded-full border-2 ${
                      active === z.id
                        ? 'border-[#c8a46b] bg-[#c8a46b] shadow-[0_0_24px_#c8a46b]'
                        : 'border-white/60 bg-white/20'
                    }`}
                    animate={active === z.id ? { scale: [1, 1.35, 1] } : { scale: 1 }}
                    transition={{ repeat: active === z.id ? Infinity : 0, duration: 2 }}
                  />
                </button>
              ))}
              <motion.div
                className="pointer-events-none absolute rounded-full border-2 border-[#c8a46b]/60 bg-[#c8a46b]/10"
                style={{
                  left: `${zone.x - 12}%`,
                  top: `${zone.y - 12}%`,
                  width: '24%',
                  height: '24%',
                }}
                layoutId="zone-glow"
                transition={{ type: 'spring', stiffness: 200, damping: 24 }}
              />
            </div>

            <div className="flex flex-col justify-center rounded-2xl border border-white/10 bg-white/5 p-8 backdrop-blur">
              <p className="text-xs uppercase tracking-widest text-[#c8a46b]">Selected Zone</p>
              <h3 className="dayal-serif mt-2 text-2xl font-semibold">{zone.label}</h3>
              <p className="mt-4 text-sm leading-relaxed text-white/70">
                Premium plotted zones with wide internal roads, landscaped buffers, and strategic
                tower placement for light, ventilation, and privacy.
              </p>
              <ul className="mt-6 space-y-2 text-sm text-white/80">
                {ZONES.map((z) => (
                  <li key={z.id}>
                    <button
                      type="button"
                      onClick={() => setActive(z.id)}
                      className={`w-full rounded-lg px-3 py-2 text-left transition ${
                        active === z.id ? 'bg-[#c8a46b]/20 text-[#c8a46b]' : 'hover:bg-white/5'
                      }`}
                    >
                      {z.label}
                    </button>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </DayalReveal>
      </div>
    </section>
  );
}
