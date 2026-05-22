"use client";

import { AnimatePresence, motion } from "framer-motion";
import { CheckCircle2, ChevronLeft, ChevronRight, Star } from "lucide-react";
import Image from "next/image";
import { useState } from "react";

import DayalReveal from "@/components/dayal/DayalReveal";
import { TESTIMONIALS, WHY_TRUST } from "@/lib/dayal/data";

export default function DayalWhyTestimonialsRow() {
  const [index, setIndex] = useState(0);
  const t = TESTIMONIALS[index];

  return (
    <section className="py-16 lg:py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid gap-10 lg:grid-cols-2 lg:gap-14">
          <DayalReveal>
            <p className="text-xs font-semibold uppercase tracking-[0.25em] text-[#c8a46b]">
              Why Dayal Builders
            </p>
            <h2 className="dayal-serif mt-2 text-2xl font-semibold text-[#0b1633] sm:text-3xl">
              Built on Trust. Designed for Generations.
            </h2>
            <ul className="mt-6 space-y-3">
              {WHY_TRUST.map((point) => (
                <li key={point} className="flex gap-3 text-[#0b1633]">
                  <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-[#c8a46b]" />
                  <span className="text-sm font-medium sm:text-base">{point}</span>
                </li>
              ))}
            </ul>
            <div className="relative mt-8 aspect-[16/10] overflow-hidden rounded-2xl shadow-lg">
              <Image
                src="https://images.unsplash.com/photo-1605276374101-dee2a0ed3cd6?auto=format&fit=crop&w=800&q=80"
                alt="Happy family at Dayal City"
                fill
                className="object-cover"
                sizes="50vw"
              />
            </div>
          </DayalReveal>

          <DayalReveal delay={0.1} id="testimonials">
            <p className="text-xs font-semibold uppercase tracking-[0.25em] text-[#c8a46b]">
              Testimonials
            </p>
            <h2 className="dayal-serif mt-2 text-2xl font-semibold text-[#0b1633] sm:text-3xl">
              What Our Customers Say
            </h2>
            <div className="relative mt-6">
              <AnimatePresence mode="wait">
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -16 }}
                  className="rounded-2xl bg-white p-8 shadow-xl ring-1 ring-[#0b1633]/8"
                >
                  <div className="flex gap-1 text-[#c8a46b]">
                    {Array.from({ length: t.rating }).map((_, i) => (
                      <Star key={i} className="h-4 w-4 fill-current" />
                    ))}
                  </div>
                  <p className="dayal-serif mt-5 text-lg leading-relaxed text-[#0b1633]">
                    &ldquo;{t.quote}&rdquo;
                  </p>
                  <footer className="mt-6 border-t border-[#0b1633]/8 pt-4">
                    <p className="font-semibold text-[#0b1633]">{t.name}</p>
                    <p className="text-sm text-[#5c6478]">{t.location}</p>
                  </footer>
                </motion.div>
              </AnimatePresence>
              <div className="mt-4 flex items-center justify-between">
                <div className="flex gap-2">
                  {TESTIMONIALS.map((_, i) => (
                    <button
                      key={i}
                      type="button"
                      className={`h-2 rounded-full transition-all ${i === index ? "w-6 bg-[#c8a46b]" : "w-2 bg-[#0b1633]/20"}`}
                      aria-label={`Testimonial ${i + 1}`}
                      onClick={() => setIndex(i)}
                    />
                  ))}
                </div>
                <div className="flex gap-2">
                  <button
                    type="button"
                    className="rounded-full border border-[#0b1633]/15 p-2"
                    onClick={() => setIndex((i) => (i === 0 ? TESTIMONIALS.length - 1 : i - 1))}
                    aria-label="Previous"
                  >
                    <ChevronLeft className="h-4 w-4" />
                  </button>
                  <button
                    type="button"
                    className="rounded-full border border-[#0b1633]/15 p-2"
                    onClick={() => setIndex((i) => (i + 1) % TESTIMONIALS.length)}
                    aria-label="Next"
                  >
                    <ChevronRight className="h-4 w-4" />
                  </button>
                </div>
              </div>
            </div>
          </DayalReveal>
        </div>
      </div>
    </section>
  );
}
