'use client';

import { useState } from 'react';
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion';
import { MapPin } from 'lucide-react';

import { CONTAINER } from '@/lib/constants';

import LocalServicesReveal from './LocalServicesReveal';
import { ZONES } from './local-services.content';

/** Interactive coverage radar — selecting a locality highlights the pin and ETA. */
export default function LocalServicesZones() {
  const reduceMotion = useReducedMotion();
  const [activeId, setActiveId] = useState(ZONES[0].id);
  const active = ZONES.find((zone) => zone.id === activeId) ?? ZONES[0];

  return (
    <section
      id="zones"
      className="lsx-section lsx-zones scroll-mt-28"
      aria-labelledby="lsx-zones-heading"
    >
      <div className={CONTAINER}>
        <div className="lsx-zones__layout">
          <div>
            <LocalServicesReveal>
              <p className="lsx-eyebrow">
                <MapPin size={13} aria-hidden />
                Service areas
              </p>
              <h2 id="lsx-zones-heading" className="lsx-title">
                Hyperlocal dispatch rings
              </h2>
              <p className="lsx-lead">
                Named pockets build SEO trust and set clear ETAs — tap a locality to preview the
                crew ring and expected response band.
              </p>
            </LocalServicesReveal>

            <ul className="lsx-zones__chips" aria-label="Service localities">
              {ZONES.map((zone) => (
                <li key={zone.id}>
                  <button
                    type="button"
                    className="lsx-zone-chip"
                    data-active={zone.id === activeId}
                    aria-pressed={zone.id === activeId}
                    onClick={() => setActiveId(zone.id)}
                  >
                    <i aria-hidden />
                    {zone.name}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          <LocalServicesReveal direction="right" delay={0.12}>
            <div className="lsx-radar" aria-live="polite">
              {[28, 48, 68, 88].map((size) => (
                <span
                  key={size}
                  className="lsx-radar__ring"
                  style={{ width: `${size}%`, height: `${size}%` }}
                  aria-hidden
                />
              ))}
              {!reduceMotion ? <span className="lsx-radar__sweep" aria-hidden /> : null}

              {ZONES.map((zone) => (
                <motion.button
                  key={zone.id}
                  type="button"
                  className="lsx-radar__pin"
                  data-active={zone.id === activeId}
                  aria-label={`${zone.name}, ${zone.eta}`}
                  style={{
                    left: `${zone.x}%`,
                    top: `${zone.y}%`,
                    transform: 'translate(-50%, -50%)',
                  }}
                  onClick={() => setActiveId(zone.id)}
                  whileHover={reduceMotion ? undefined : { scale: 1.06 }}
                  whileTap={reduceMotion ? undefined : { scale: 0.96 }}
                >
                  {zone.name}
                </motion.button>
              ))}

              <div className="lsx-radar__core">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={active.id}
                    initial={reduceMotion ? false : { opacity: 0, scale: 0.92 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={reduceMotion ? undefined : { opacity: 0, scale: 0.94 }}
                    transition={{ duration: 0.28 }}
                  >
                    <strong>{active.eta}</strong>
                    <span>
                      {active.name}
                      <br />
                      {active.crews}
                    </span>
                  </motion.div>
                </AnimatePresence>
              </div>
            </div>
          </LocalServicesReveal>
        </div>
      </div>
    </section>
  );
}
