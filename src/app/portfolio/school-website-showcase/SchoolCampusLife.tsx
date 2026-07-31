'use client';

import { ArrowRight, ChevronLeft, ChevronRight } from 'lucide-react';
import { useCallback, useEffect, useRef, useState } from 'react';

import { CONTAINER } from '@/lib/constants';

import { useSchoolDemo } from './SchoolDemoContext';
import { schoolCardClickProps } from './school-clickable';
import { CAMPUS_LIFE } from './school-demo-data';
import { SchoolLazyImage } from './SchoolLazyImage';

type CampusItem = (typeof CAMPUS_LIFE)[number];

function ReelCard({ item, index }: { item: CampusItem; index: number }) {
  const { setLightbox } = useSchoolDemo();

  return (
    <article
      {...schoolCardClickProps(() =>
        setLightbox({ src: item.image, title: item.title, alt: item.title }),
      )}
      className="school-campus-reel-card group cursor-pointer"
    >
      <div className="overflow-hidden rounded-t-2xl bg-white">
        <SchoolLazyImage
          src={item.image}
          alt={item.title}
          wrapperClassName="aspect-[4/5] w-full"
          className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
          fallbackSeed={item.id}
          eager={index < 2}
        />
      </div>
      <div className="rounded-b-2xl border border-t-0 border-white/20 bg-white px-4 py-3.5 shadow-lg">
        <p className="text-[10px] font-bold uppercase tracking-widest text-[var(--school-orange)]">
          {String(index + 1).padStart(2, '0')}
        </p>
        <p className="mt-1 text-sm font-bold leading-snug text-[var(--school-navy)]">
          {item.title}
        </p>
      </div>
    </article>
  );
}

export default function SchoolCampusLife() {
  const scrollerRef = useRef<HTMLDivElement>(null);
  const { setGalleryIndex, scrollToSection } = useSchoolDemo();
  const [canPrev, setCanPrev] = useState(false);
  const [canNext, setCanNext] = useState(true);

  const syncArrows = useCallback(() => {
    const el = scrollerRef.current;
    if (!el) return;
    setCanPrev(el.scrollLeft > 4);
    setCanNext(el.scrollLeft < el.scrollWidth - el.clientWidth - 4);
  }, []);

  useEffect(() => {
    const el = scrollerRef.current;
    if (!el) return;
    syncArrows();
    el.addEventListener('scroll', syncArrows, { passive: true });
    window.addEventListener('resize', syncArrows);
    return () => {
      el.removeEventListener('scroll', syncArrows);
      window.removeEventListener('resize', syncArrows);
    };
  }, [syncArrows]);

  const scrollReel = (dir: -1 | 1) => {
    const el = scrollerRef.current;
    if (!el) return;
    const card = el.querySelector<HTMLElement>('.school-campus-reel-card');
    const step = (card?.offsetWidth ?? 300) + 16;
    el.scrollBy({ left: dir * step, behavior: 'smooth' });
  };

  return (
    <section id="campus-life" className="school-campus-reel-section scroll-mt-28">
      <div className={`${CONTAINER} py-14 lg:py-16`}>
        <div className="lg:grid lg:grid-cols-[minmax(0,340px)_minmax(0,1fr)] lg:gap-10 xl:grid-cols-[380px_1fr]">
          <div className="text-white lg:py-4">
            <p className="text-[11px] font-bold uppercase tracking-[0.2em] text-[var(--school-orange)]">
              Campus Life
            </p>
            <h2 className="mt-3 font-[var(--font-playfair)] text-3xl font-bold leading-tight sm:text-4xl">
              Where Learning Meets Life
            </h2>
            <p className="mt-4 text-sm leading-relaxed text-white/80">
              Swipe through sports, labs, arts and celebrations — a day at Elevate is never just
              classrooms.
            </p>

            <div className="mt-8 flex items-center gap-3">
              <button
                type="button"
                onClick={() => scrollReel(-1)}
                disabled={!canPrev}
                className="flex h-11 w-11 items-center justify-center rounded-full border border-white/25 bg-white/10 text-white transition hover:bg-[var(--school-orange)] disabled:cursor-not-allowed disabled:opacity-35"
                aria-label="Previous"
              >
                <ChevronLeft className="h-5 w-5" />
              </button>
              <button
                type="button"
                onClick={() => scrollReel(1)}
                disabled={!canNext}
                className="flex h-11 w-11 items-center justify-center rounded-full border border-white/25 bg-white/10 text-white transition hover:bg-[var(--school-orange)] disabled:cursor-not-allowed disabled:opacity-35"
                aria-label="Next"
              >
                <ChevronRight className="h-5 w-5" />
              </button>
              <span className="text-xs text-white/55">Drag or use arrows</span>
            </div>

            <button
              type="button"
              onClick={() => {
                scrollToSection('gallery');
                setGalleryIndex(0);
              }}
              className="school-btn-orange mt-8 inline-flex items-center gap-2 rounded-full px-6 py-3 text-sm font-bold uppercase tracking-wide"
            >
              Full gallery
              <ArrowRight className="h-4 w-4" aria-hidden />
            </button>
          </div>

          <div className="relative mt-10 min-w-0 lg:mt-0">
            <div
              className="pointer-events-none absolute inset-y-0 left-0 z-10 w-8 bg-gradient-to-r from-[var(--school-navy)] to-transparent"
              aria-hidden
            />
            <div
              className="pointer-events-none absolute inset-y-0 right-0 z-10 w-12 bg-gradient-to-l from-[var(--school-navy)] to-transparent"
              aria-hidden
            />

            <div
              ref={scrollerRef}
              className="school-campus-reel flex gap-4 overflow-x-auto pb-2 pt-1"
            >
              {CAMPUS_LIFE.map((item, i) => (
                <ReelCard key={item.id} item={item} index={i} />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
