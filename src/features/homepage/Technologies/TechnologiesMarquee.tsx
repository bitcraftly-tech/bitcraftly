"use client";

import { TechnologyCard } from "./TechnologyCard";
import { HOMEPAGE_TECHNOLOGIES } from "./technologies.constants";

/**
 * Seamless horizontal auto-scroll for technology cards.
 * Pauses on hover / focus for accessibility.
 */
export function TechnologiesMarquee() {
  const loop = [...HOMEPAGE_TECHNOLOGIES, ...HOMEPAGE_TECHNOLOGIES];

  return (
    <div className="technologies-marquee" aria-label="Technologies we build with">
      <div className="technologies-marquee-track">
        {loop.map((technology, index) => (
          <div
            key={`${technology.id}-${index}`}
            className="technologies-marquee-item"
            aria-hidden={index >= HOMEPAGE_TECHNOLOGIES.length}
          >
            <TechnologyCard technology={technology} />
          </div>
        ))}
      </div>
    </div>
  );
}
