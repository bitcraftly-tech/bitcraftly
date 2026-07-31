'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight, Star } from 'lucide-react';
import { useState } from 'react';

import DayalReveal from '@/components/dayal/DayalReveal';
import { TESTIMONIALS } from '@/lib/dayal/data';

export default function DayalTestimonials() {
  const [index, setIndex] = useState(0);
  const t = TESTIMONIALS[index];

  return (
    <section id="testimonials" className="bg-[#0b1633] py-16 text-white lg:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <DayalReveal className="text-center">
          <p className="text-xs font-semibold uppercase tracking-[0.25em] text-[#c8a46b]">
            Testimonials
          </p>
          <h2 className="dayal-serif mt-3 text-3xl font-semibold sm:text-4xl">
            Stories from Dayal Families
          </h2>
        </DayalReveal>

        <DayalReveal className="relative mx-auto mt-12 max-w-3xl">
          <AnimatePresence mode="wait">
            <motion.blockquote
              key={index}
              initial={{ opacity: 0, x: 24 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -24 }}
              transition={{ duration: 0.4 }}
              className="rounded-2xl border border-white/10 bg-white/5 p-8 text-center backdrop-blur sm:p-12"
            >
              <div className="flex justify-center gap-1 text-[#c8a46b]">
                {Array.from({ length: t.rating }).map((_, i) => (
                  <Star key={i} className="h-4 w-4 fill-current" />
                ))}
              </div>
              <p className="dayal-serif mt-6 text-xl leading-relaxed text-white/95 sm:text-2xl">
                &ldquo;{t.quote}&rdquo;
              </p>
              <footer className="mt-8 text-sm font-semibold text-[#c8a46b]">{t.name}</footer>
            </motion.blockquote>
          </AnimatePresence>

          <div className="mt-6 flex justify-center gap-3">
            <button
              type="button"
              className="rounded-full border border-white/20 p-2 transition hover:bg-white/10"
              aria-label="Previous testimonial"
              onClick={() => setIndex((i) => (i === 0 ? TESTIMONIALS.length - 1 : i - 1))}
            >
              <ChevronLeft className="h-5 w-5" />
            </button>
            <button
              type="button"
              className="rounded-full border border-white/20 p-2 transition hover:bg-white/10"
              aria-label="Next testimonial"
              onClick={() => setIndex((i) => (i + 1) % TESTIMONIALS.length)}
            >
              <ChevronRight className="h-5 w-5" />
            </button>
          </div>
        </DayalReveal>
      </div>
    </section>
  );
}
