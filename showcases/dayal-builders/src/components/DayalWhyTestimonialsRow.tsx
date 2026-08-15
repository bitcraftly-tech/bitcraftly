'use client';

import { AnimatePresence, motion } from 'framer-motion';
import { CheckCircle2, ChevronLeft, ChevronRight, Star } from 'lucide-react';
import Image from 'next/image';
import { useCallback, useEffect, useId, useState } from 'react';

const TESTIMONIAL_AUTO_MS = 5000;

import DayalReveal from '@bitcraftly/showcase-dayal-builders/components/DayalReveal';
import {
  TESTIMONIALS,
  WHY_FAMILY_IMAGE,
  WHY_TRUST,
} from '@bitcraftly/showcase-dayal-builders/lib/data';

function SectionHeader({
  label,
  title,
  description,
}: {
  label: string;
  title: string;
  description?: string;
}) {
  return (
    <header className="shrink-0">
      <p className="dayal-eyebrow">{label}</p>
      <div className="dayal-gold-line mt-3" aria-hidden />
      <h2 className="dayal-section-title mt-4 leading-tight">{title}</h2>
      {description ? <p className="dayal-body mt-3 max-w-md">{description}</p> : null}
    </header>
  );
}

export default function DayalWhyTestimonialsRow() {
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);
  const headingId = useId();
  const t = TESTIMONIALS[index];
  const total = TESTIMONIALS.length;

  const goPrev = useCallback(() => setIndex((i) => (i === 0 ? total - 1 : i - 1)), [total]);
  const goNext = useCallback(() => setIndex((i) => (i + 1) % total), [total]);

  useEffect(() => {
    if (paused || total <= 1) return;
    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReduced) return;

    const id = window.setInterval(goNext, TESTIMONIAL_AUTO_MS);
    return () => window.clearInterval(id);
  }, [paused, total, goNext]);

  return (
    <section className="dayal-section dayal-section--white" aria-label="Why Dayal and testimonials">
      <div className="dayal-container">
        <div className="grid items-stretch gap-12 lg:grid-cols-2 lg:gap-14 xl:gap-16">
          <DayalReveal className="flex min-h-0 flex-col">
            <SectionHeader
              label="Why Dayal Builders"
              title="Building foundations. Creating futures."
              description="Quality construction, prime locations, and a customer-first process — every project."
            />

            <div className="mt-7 flex min-h-0 flex-1 flex-col gap-5">
              <ul className="shrink-0 space-y-3 rounded-2xl border border-[#0b1633]/8 bg-[#f8f6f2] p-5 sm:p-6">
                {WHY_TRUST.map((point, i) => (
                  <DayalReveal
                    as="li"
                    key={point}
                    delay={0.08 + i * 0.05}
                    className="flex items-start gap-3 text-[#0b1633]"
                  >
                    <span className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-[#c8a46b]/15">
                      <CheckCircle2 className="h-3.5 w-3.5 text-[#c8a46b]" aria-hidden />
                    </span>
                    <span className="text-sm font-medium leading-snug sm:text-[0.95rem]">
                      {point}
                    </span>
                  </DayalReveal>
                ))}
              </ul>

              <div className="dayal-media-skeleton dayal-media-zoom group relative aspect-[16/11] overflow-hidden rounded-2xl shadow-[0_12px_40px_rgba(11,22,51,0.12)] ring-1 ring-[#0b1633]/10">
                <Image
                  src={WHY_FAMILY_IMAGE}
                  alt="Dayal Builders — quality homes in Jamshedpur"
                  fill
                  className="object-cover object-center"
                  sizes="(max-width: 1024px) 100vw, 50vw"
                />
              </div>
            </div>
          </DayalReveal>

          <DayalReveal
            delay={0.08}
            id="testimonials"
            className="flex min-h-0 scroll-mt-28 flex-col"
          >
            <SectionHeader
              label="Satisfied Customers"
              title="What our customers say"
              description="Real feedback from families who chose Dayal Builders."
            />

            <div className="mt-7 flex min-h-0 flex-1 flex-col">
              <div
                className="flex min-h-[18rem] flex-1 flex-col overflow-hidden rounded-2xl bg-[#f8f6f2] shadow-[0_12px_40px_rgba(11,22,51,0.08)] ring-1 ring-[#0b1633]/8 sm:min-h-[22rem] lg:min-h-0"
                onMouseEnter={() => setPaused(true)}
                onMouseLeave={() => setPaused(false)}
                onFocusCapture={() => setPaused(true)}
                onBlurCapture={() => setPaused(false)}
                aria-roledescription="carousel"
                aria-labelledby={headingId}
              >
                <p id={headingId} className="sr-only">
                  Customer testimonials
                </p>
                <div aria-live="polite" aria-atomic="true" className="sr-only">
                  {t.name}: {t.quote}
                </div>

                <AnimatePresence mode="wait">
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 12 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -12 }}
                    transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
                    className="flex flex-1 flex-col bg-white p-6 sm:p-8"
                  >
                    <div
                      className="flex gap-0.5 text-[#c8a46b]"
                      aria-label={`${t.rating} out of 5 stars`}
                    >
                      {Array.from({ length: t.rating }).map((_, i) => (
                        <Star key={i} className="h-4 w-4 fill-current" aria-hidden />
                      ))}
                    </div>
                    <p className="dayal-serif mt-5 flex-1 text-lg leading-relaxed text-[#0b1633] sm:text-xl">
                      &ldquo;{t.quote}&rdquo;
                    </p>
                    <footer className="mt-6 shrink-0 border-t border-[#0b1633]/8 pt-4">
                      <p className="font-semibold text-[#0b1633]">{t.name}</p>
                      <p className="mt-0.5 text-sm text-[#5c6478]">{t.location}</p>
                    </footer>
                  </motion.div>
                </AnimatePresence>

                <div className="flex shrink-0 items-center justify-between gap-4 border-t border-[#0b1633]/8 bg-[#f8f6f2] px-4 py-3 sm:px-6">
                  <div className="flex items-center gap-2">
                    {TESTIMONIALS.map((_, i) => (
                      <button
                        key={i}
                        type="button"
                        className={`h-1.5 rounded-full transition-all duration-300 ${
                          i === index
                            ? 'w-6 bg-[#c8a46b]'
                            : 'w-1.5 bg-[#0b1633]/20 hover:bg-[#0b1633]/35'
                        }`}
                        aria-label={`Show testimonial ${i + 1} of ${total}`}
                        aria-current={i === index ? 'true' : undefined}
                        onClick={() => setIndex(i)}
                      />
                    ))}
                    <span className="ml-1 hidden text-xs tabular-nums text-[#5c6478] sm:inline">
                      {index + 1}/{total}
                    </span>
                  </div>
                  <div className="flex gap-2">
                    <button
                      type="button"
                      className="flex h-9 w-9 items-center justify-center rounded-full border border-[#0b1633]/12 bg-white text-[#0b1633] transition hover:border-[#c8a46b] hover:text-[#c8a46b]"
                      onClick={goPrev}
                      aria-label="Previous testimonial"
                    >
                      <ChevronLeft className="h-4 w-4" />
                    </button>
                    <button
                      type="button"
                      className="flex h-9 w-9 items-center justify-center rounded-full border border-[#0b1633]/12 bg-white text-[#0b1633] transition hover:border-[#c8a46b] hover:text-[#c8a46b]"
                      onClick={goNext}
                      aria-label="Next testimonial"
                    >
                      <ChevronRight className="h-4 w-4" />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </DayalReveal>
        </div>
      </div>
    </section>
  );
}
