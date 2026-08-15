'use client';

import { ChevronDown } from 'lucide-react';
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

import DayalReveal from '@bitcraftly/showcase-dayal-builders/components/DayalReveal';
import { FAQ } from '@bitcraftly/showcase-dayal-builders/lib/data';

export default function DayalFaq() {
  const [open, setOpen] = useState<number | null>(0);

  return (
    <section className="py-16 lg:py-24">
      <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
        <DayalReveal className="text-center">
          <p className="text-xs font-semibold uppercase tracking-[0.25em] text-[#c8a46b]">FAQ</p>
          <h2 className="dayal-serif mt-3 text-3xl font-semibold text-[#0b1633]">
            Common Questions
          </h2>
        </DayalReveal>

        <ul className="mt-10 space-y-3">
          {FAQ.map((item, i) => {
            const isOpen = open === i;
            return (
              <DayalReveal key={item.q} delay={i * 0.04}>
                <li className="overflow-hidden rounded-xl bg-white shadow-md ring-1 ring-[#0b1633]/5">
                  <button
                    type="button"
                    className="flex w-full items-center justify-between gap-4 px-5 py-4 text-left font-semibold text-[#0b1633]"
                    onClick={() => setOpen(isOpen ? null : i)}
                    aria-expanded={isOpen}
                  >
                    {item.q}
                    <ChevronDown
                      className={`h-5 w-5 shrink-0 text-[#c8a46b] transition ${isOpen ? 'rotate-180' : ''}`}
                    />
                  </button>
                  <AnimatePresence initial={false}>
                    {isOpen && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.3 }}
                      >
                        <p className="border-t border-[#0b1633]/8 px-5 pb-4 pt-2 text-sm leading-relaxed text-[#5c6478]">
                          {item.a}
                        </p>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </li>
              </DayalReveal>
            );
          })}
        </ul>
      </div>
    </section>
  );
}
