'use client';

import { AnimatePresence, motion, useReducedMotion } from 'framer-motion';
import {
  BatteryCharging,
  Bath,
  Blocks,
  Car,
  Cctv,
  Church,
  Compass,
  Dumbbell,
  Footprints,
  Landmark,
  Sofa,
  Trees,
  Waves,
} from 'lucide-react';
import type { LucideIcon } from 'lucide-react';
import { useState } from 'react';

import DayalReveal from '@bitcraftly/showcase-dayal-builders/components/DayalReveal';
import DayalSectionLink from '@bitcraftly/showcase-dayal-builders/components/DayalSectionLink';
import { AMENITIES } from '@bitcraftly/showcase-dayal-builders/lib/data';
import { FLOOR_PLANS } from '@bitcraftly/showcase-dayal-builders/lib/estate';

const AMENITY_ICONS: Record<string, LucideIcon> = {
  club: Landmark,
  gym: Dumbbell,
  garden: Trees,
  play: Blocks,
  track: Footprints,
  temple: Church,
  cctv: Cctv,
  pool: Waves,
  power: BatteryCharging,
  parking: Car,
};

const ACCENT_ROOMS = [
  'Living / Dining',
  'Living',
  'Master Bed',
  'Master Suite',
  'Buildable Envelope',
];

export default function DayalEstatePlans() {
  const reduce = useReducedMotion();
  const [activeId, setActiveId] = useState(FLOOR_PLANS[1]?.id ?? FLOOR_PLANS[0].id);
  const plan = FLOOR_PLANS.find((item) => item.id === activeId) ?? FLOOR_PLANS[0];

  return (
    <section
      id="amenities"
      className="dre-section dre-section--tint dre-anchor"
      aria-label="Floor plans and amenities"
    >
      <div className="dayal-container">
        <DayalReveal className="max-w-2xl">
          <p className="dre-eyebrow">Configurations</p>
          <h2 className="dre-title mt-3">Floor plans &amp; amenities</h2>
          <p className="dre-lead mt-3">
            Compare layouts before you visit — carpet area, built-up area and indicative pricing for
            every configuration we build.
          </p>
        </DayalReveal>

        <DayalReveal
          delay={0.06}
          className="mt-6 flex flex-wrap gap-2"
          aria-label="Choose a layout"
        >
          {FLOOR_PLANS.map((item) => (
            <button
              key={item.id}
              type="button"
              className={`dre-chip${item.id === plan.id ? ' is-active' : ''}`}
              aria-pressed={item.id === plan.id}
              onClick={() => setActiveId(item.id)}
            >
              {item.config}
            </button>
          ))}
        </DayalReveal>

        <div className="dre-plan mt-7">
          <AnimatePresence mode="wait" initial={false}>
            <motion.div
              key={plan.id}
              className="dre-plan__canvas"
              role="img"
              aria-label={`${plan.config} layout schematic for ${plan.project}`}
              initial={reduce ? false : { opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={reduce ? undefined : { opacity: 0, y: -8 }}
              transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
            >
              {plan.rooms.map((room) => (
                <span
                  key={room.name}
                  className={`dre-plan__room${
                    ACCENT_ROOMS.includes(room.name) ? ' dre-plan__room--accent' : ''
                  }`}
                  style={{
                    gridColumn: `${room.col} / span ${room.colSpan}`,
                    gridRow: `${room.row} / span ${room.rowSpan}`,
                  }}
                >
                  {room.name}
                </span>
              ))}
            </motion.div>
          </AnimatePresence>

          <div className="flex min-w-0 flex-col gap-4">
            <div>
              <p className="text-xs font-bold uppercase tracking-[0.16em] text-[#c8a46b]">
                {plan.project}
              </p>
              <h3 className="dre-subtitle mt-1">{plan.config} layout</h3>
            </div>

            <dl className="dre-plan__facts">
              <div className="dre-plan__fact">
                <dt>Carpet area</dt>
                <dd>{plan.carpet} sq ft</dd>
              </div>
              <div className="dre-plan__fact">
                <dt>Built-up area</dt>
                <dd>{plan.builtUp} sq ft</dd>
              </div>
              <div className="dre-plan__fact">
                <dt>Starting price</dt>
                <dd>₹{plan.price} L</dd>
              </div>
              <div className="dre-plan__fact">
                <dt>Facing</dt>
                <dd>{plan.facing}</dd>
              </div>
            </dl>

            <ul className="flex flex-wrap gap-2 text-sm text-[#5c6478]">
              <li className="inline-flex items-center gap-1.5 rounded-lg border border-[#0b1633]/10 bg-white px-2.5 py-1.5">
                <Sofa className="h-3.5 w-3.5 text-[#c8a46b]" aria-hidden />
                {plan.config}
              </li>
              <li className="inline-flex items-center gap-1.5 rounded-lg border border-[#0b1633]/10 bg-white px-2.5 py-1.5">
                <Bath className="h-3.5 w-3.5 text-[#c8a46b]" aria-hidden />
                {plan.bath} bath
              </li>
              <li className="inline-flex items-center gap-1.5 rounded-lg border border-[#0b1633]/10 bg-white px-2.5 py-1.5">
                <Compass className="h-3.5 w-3.5 text-[#c8a46b]" aria-hidden />
                {plan.balcony} balcony
              </li>
            </ul>

            <p className="dre-note">
              Schematic layout for reference — final dimensions vary by tower and floor.
            </p>

            <div className="mt-1 flex flex-wrap gap-2">
              <DayalSectionLink href="#contact" className="dre-btn-solid">
                Request detailed plan
              </DayalSectionLink>
              <DayalSectionLink href="#emi" className="dre-btn-quiet">
                Check EMI
              </DayalSectionLink>
            </div>
          </div>
        </div>

        <DayalReveal className="mt-12">
          <p className="dre-eyebrow">Amenities</p>
          <h3 className="dre-title dre-title--sm mt-2">What every Dayal address includes</h3>
        </DayalReveal>

        <ul className="mt-6 grid grid-cols-1 gap-2.5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5">
          {AMENITIES.map((amenity, index) => {
            const Icon = AMENITY_ICONS[amenity.icon] ?? Landmark;
            return (
              <DayalReveal as="li" key={amenity.name} delay={index * 0.03} className="min-w-0">
                <div className="dre-amenity h-full">
                  <span aria-hidden>
                    <Icon className="h-4 w-4" />
                  </span>
                  {amenity.name}
                </div>
              </DayalReveal>
            );
          })}
        </ul>
      </div>
    </section>
  );
}
