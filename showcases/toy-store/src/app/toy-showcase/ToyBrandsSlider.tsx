'use client';

import Image from 'next/image';
import { useEffect, useRef, useState } from 'react';

import { TOY_BRANDS, type ToyBrandLogo } from './toy-data';

export function ToyBrandsSlider() {
  const trackRef = useRef<HTMLDivElement>(null);
  const [paused, setPaused] = useState(false);

  useEffect(() => {
    const track = trackRef.current;
    if (!track) {
      return undefined;
    }

    const reduceMotion =
      typeof window !== 'undefined' &&
      window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (reduceMotion) {
      return undefined;
    }

    let frame = 0;
    let last = performance.now();
    let offset = 0;

    const tick = (now: number) => {
      frame = window.requestAnimationFrame(tick);
      if (paused) {
        last = now;
        return;
      }
      const delta = now - last;
      last = now;
      // ~35px per second
      offset += (delta / 1000) * 35;
      const loopWidth = track.scrollWidth / 2;
      if (loopWidth > 0 && offset >= loopWidth) {
        offset -= loopWidth;
      }
      track.style.transform = `translate3d(${-offset}px, 0, 0)`;
    };

    frame = window.requestAnimationFrame(tick);
    return () => window.cancelAnimationFrame(frame);
  }, [paused]);

  const brands: readonly ToyBrandLogo[] = TOY_BRANDS;
  const loop = [...brands, ...brands];

  return (
    <div
      className="toy-brands-slider"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      onFocusCapture={() => setPaused(true)}
      onBlurCapture={(event) => {
        if (!event.currentTarget.contains(event.relatedTarget as Node | null)) {
          setPaused(false);
        }
      }}
    >
      <div className="toy-brands-slider__viewport">
        <div ref={trackRef} className="toy-brands-slider__track" role="list">
          {loop.map((brand, index) => (
            <div
              key={`${brand.id}-${index}`}
              className={`toy-brand-chip toy-brand-chip--${brand.tone}`}
              role="listitem"
              aria-hidden={index >= brands.length}
            >
              <Image
                src={brand.logo}
                alt={index < brands.length ? `${brand.name} logo` : ''}
                width={220}
                height={100}
                className="toy-brand-chip__logo"
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
