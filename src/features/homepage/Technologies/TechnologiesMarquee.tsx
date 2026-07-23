"use client";

import { TechnologyCard } from "./TechnologyCard";
import { HOMEPAGE_TECHNOLOGIES } from "./technologies.constants";

/**
 * Horizontal technology strip — swipe on mobile/tablet, auto-marquee on desktop.
 */
export function TechnologiesMarquee() {
  const loop = [...HOMEPAGE_TECHNOLOGIES, ...HOMEPAGE_TECHNOLOGIES];

  return (
    <div
      className="technologies-marquee w-full"
      aria-label="Technologies we build with"
    >
      <div className="technologies-marquee-track">
        {loop.map((technology, index) => {
          const isDuplicate = index >= HOMEPAGE_TECHNOLOGIES.length;

          return (
            <div
              key={`${technology.id}-${index}`}
              className="technologies-marquee-item"
              // Duplicate set is animation-only: hide from AT and remove from tab order.
              aria-hidden={isDuplicate ? true : undefined}
              {...(isDuplicate ? { inert: true } : {})}
            >
              <TechnologyCard
                technology={technology}
                tabIndex={isDuplicate ? -1 : undefined}
              />
            </div>
          );
        })}
      </div>
    </div>
  );
}
