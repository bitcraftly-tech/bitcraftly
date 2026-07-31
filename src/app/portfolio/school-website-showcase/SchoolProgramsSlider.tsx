'use client';

import { motion, useReducedMotion } from 'framer-motion';
import { ArrowRight, ChevronLeft, ChevronRight } from 'lucide-react';
import { useCallback, useEffect, useRef, useState } from 'react';

import { ACADEMIC_PROGRAMS } from './school-demo-data';
import { useSchoolDemo } from './SchoolDemoContext';
import { SchoolLazyImage } from './SchoolLazyImage';

const CARD_GAP = 16;
const SLIDE_MS = 5000;

export default function SchoolProgramsSlider() {
  const { showToast, scrollToEnquiry } = useSchoolDemo();
  const [index, setIndex] = useState(0);
  const [cardWidth, setCardWidth] = useState(280);
  const [cardsVisible, setCardsVisible] = useState(1);
  const viewportRef = useRef<HTMLDivElement>(null);
  const reduceMotion = useReducedMotion();

  const maxIndex = Math.max(0, ACADEMIC_PROGRAMS.length - cardsVisible);

  const next = useCallback(() => setIndex((i) => (i >= maxIndex ? 0 : i + 1)), [maxIndex]);
  const prev = useCallback(() => setIndex((i) => (i <= 0 ? maxIndex : i - 1)), [maxIndex]);

  useEffect(() => {
    const el = viewportRef.current;
    if (!el) return;
    const measure = () => {
      const w = el.offsetWidth;
      const visible = w >= 1024 ? 3 : w >= 640 ? 2 : 1;
      setCardsVisible(visible);
      setCardWidth(Math.floor((w - CARD_GAP * (visible - 1)) / visible));
    };
    measure();
    const ro = new ResizeObserver(measure);
    ro.observe(el);
    return () => ro.disconnect();
  }, []);

  useEffect(() => {
    setIndex((i) => Math.min(i, maxIndex));
  }, [maxIndex]);

  useEffect(() => {
    if (reduceMotion) return;
    const t = window.setInterval(next, SLIDE_MS);
    return () => window.clearInterval(t);
  }, [next, reduceMotion]);

  const step = cardWidth + CARD_GAP;
  const offset = -index * step;

  const programCards = ACADEMIC_PROGRAMS.map((p) => (
    <article
      key={p.id}
      className="school-card-hover shrink-0 overflow-hidden rounded-xl border school-border bg-white shadow-md"
      style={{ width: cardWidth }}
    >
      <div className="relative">
        <SchoolLazyImage
          src={p.image}
          alt={p.title}
          wrapperClassName="aspect-[16/10] w-full"
          fallbackSeed={p.id}
        />
      </div>
      <div className="relative px-4 pb-4 pt-6">
        <span
          className="absolute -top-5 left-4 flex h-10 w-10 items-center justify-center rounded-full border-2 border-white text-sm font-bold text-white shadow-md"
          style={{ backgroundColor: p.iconColor }}
          aria-hidden
        >
          {p.title[0]}
        </span>
        <p className="text-[11px] font-bold uppercase tracking-wide text-[var(--school-orange)]">
          {p.grades}
        </p>
        <h3 className="mt-1 text-base font-bold text-[var(--school-navy)]">{p.title}</h3>
        <p className="school-text-muted mt-2 line-clamp-2 text-xs leading-relaxed">{p.desc}</p>
        <button
          type="button"
          onClick={() => {
            showToast(`${p.title} · brochure sent on enquiry`);
            scrollToEnquiry();
          }}
          className="mt-3 inline-flex items-center gap-1 text-xs font-semibold text-[var(--school-brand)] hover:underline"
        >
          Discover More <ArrowRight className="h-3.5 w-3.5" />
        </button>
      </div>
    </article>
  ));

  return (
    <div className="relative mt-10">
      <button
        type="button"
        onClick={prev}
        className="absolute -left-1 top-1/2 z-10 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full border school-border bg-white shadow-md transition hover:bg-[var(--school-surface)] sm:left-0 lg:-left-5"
        aria-label="Previous programs"
      >
        <ChevronLeft className="h-5 w-5 text-[var(--school-navy)]" />
      </button>
      <button
        type="button"
        onClick={next}
        className="absolute -right-1 top-1/2 z-10 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full border school-border bg-white shadow-md transition hover:bg-[var(--school-surface)] sm:right-0 lg:-right-5"
        aria-label="Next programs"
      >
        <ChevronRight className="h-5 w-5 text-[var(--school-navy)]" />
      </button>

      <div ref={viewportRef} className="overflow-hidden px-8 sm:px-10">
        <motion.div
          className="flex"
          style={{ gap: CARD_GAP }}
          initial={false}
          animate={{ x: offset }}
          transition={
            reduceMotion
              ? { duration: 0 }
              : { type: 'tween', duration: 0.75, ease: [0.32, 0.72, 0, 1] }
          }
        >
          {programCards}
        </motion.div>
      </div>
    </div>
  );
}
