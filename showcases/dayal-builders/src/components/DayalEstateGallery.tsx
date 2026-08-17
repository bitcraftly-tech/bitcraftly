'use client';

import { AnimatePresence } from 'framer-motion';
import { Expand } from 'lucide-react';
import Image from 'next/image';
import { useCallback, useId, useRef, useState } from 'react';

import DayalGalleryLightbox from '@bitcraftly/showcase-dayal-builders/components/DayalGalleryLightbox';
import DayalReveal from '@bitcraftly/showcase-dayal-builders/components/DayalReveal';
import { GALLERY_IMAGES } from '@bitcraftly/showcase-dayal-builders/lib/data';

function tileClass(index: number): string {
  if (index === 0) return 'sm:col-span-2 sm:row-span-2';
  if (index === 5) return 'sm:col-span-2';
  return '';
}

export default function DayalEstateGallery() {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);
  const titleId = useId();
  const lastTriggerRef = useRef<HTMLButtonElement | null>(null);
  const total = GALLERY_IMAGES.length;

  const goPrev = useCallback(
    () => setActiveIndex((i) => (i === null ? null : (i - 1 + total) % total)),
    [total],
  );
  const goNext = useCallback(
    () => setActiveIndex((i) => (i === null ? null : (i + 1) % total)),
    [total],
  );
  const close = useCallback(() => {
    setActiveIndex(null);
    lastTriggerRef.current?.focus();
  }, []);

  return (
    <section
      id="gallery"
      className="dre-section dre-section--tint dre-anchor"
      aria-label="Project gallery"
    >
      <div className="dayal-container">
        <DayalReveal className="max-w-2xl">
          <p className="dre-eyebrow">Site gallery</p>
          <h2 className="dre-title mt-3">Walk the projects before you visit</h2>
          <p className="dre-lead mt-3">
            Elevations, interiors and construction progress from completed and ongoing Dayal
            addresses across Jamshedpur.
          </p>
        </DayalReveal>

        <div
          className="mt-7 grid auto-rows-[7rem] grid-cols-2 gap-2.5 sm:auto-rows-[8rem] sm:grid-cols-4 lg:auto-rows-[9rem]"
          role="list"
        >
          {GALLERY_IMAGES.map((item, index) => (
            <button
              key={item.src}
              type="button"
              role="listitem"
              className={`group relative overflow-hidden rounded-xl border border-[#0b1633]/10 bg-[#ebe9e4] transition hover:border-[#c8a46b]/60 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#c8a46b] ${tileClass(index)}`}
              onClick={(event) => {
                lastTriggerRef.current = event.currentTarget;
                setActiveIndex(index);
              }}
              aria-label={`Open gallery image: ${item.alt}`}
            >
              <Image
                src={item.src}
                alt=""
                fill
                className="object-cover transition duration-500 group-hover:scale-105"
                sizes="(max-width: 640px) 50vw, 25vw"
              />
              <span
                className="pointer-events-none absolute inset-0 flex items-center justify-center bg-[#0b1633]/0 text-white opacity-0 transition group-hover:bg-[#0b1633]/35 group-hover:opacity-100 group-focus-visible:bg-[#0b1633]/35 group-focus-visible:opacity-100"
                aria-hidden
              >
                <Expand className="h-5 w-5" />
              </span>
            </button>
          ))}
        </div>
      </div>

      <AnimatePresence>
        {activeIndex !== null ? (
          <DayalGalleryLightbox
            items={GALLERY_IMAGES}
            index={activeIndex}
            titleId={titleId}
            onClose={close}
            onPrev={goPrev}
            onNext={goNext}
          />
        ) : null}
      </AnimatePresence>
    </section>
  );
}
