"use client";

import { AnimatePresence, motion } from "framer-motion";
import { CheckCircle2, ChevronLeft, ChevronRight, Star } from "lucide-react";
import Image from "next/image";
import { useState } from "react";

import DayalReveal from "@/components/dayal/DayalReveal";
import { TESTIMONIALS, WHY_FAMILY_IMAGE, WHY_TRUST } from "@/lib/dayal/data";

export default function DayalWhyTestimonialsRow() {
  const [index, setIndex] = useState(0);
  const t = TESTIMONIALS[index];

  return (
    <section className="dayal-section dayal-section-champagne">
      <div className="dayal-container">
        <div className="grid gap-14 lg:grid-cols-2 lg:gap-16">
          <DayalReveal>
            <p className="dayal-eyebrow">Why Dayal Builders</p>
            <h2 className="dayal-heading dayal-heading-lg mt-5">Building Foundations. Creating Futures.</h2>
            <div className="dayal-gold-line mt-5" />
            <ul className="mt-8 space-y-4">
              {WHY_TRUST.map((point) => (
                <li key={point} className="flex gap-3">
                  <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0" style={{ color: "var(--dayal-gold)" }} />
                  <span className="text-sm font-medium sm:text-base">{point}</span>
                </li>
              ))}
            </ul>
            <div className="dayal-image-frame relative mt-10 aspect-[16/10]">
              <Image
                src={WHY_FAMILY_IMAGE}
                alt="Dayal Builders — quality homes in Jamshedpur"
                fill
                className="object-cover"
                sizes="50vw"
              />
            </div>
          </DayalReveal>

          <DayalReveal delay={0.1} id="testimonials">
            <p className="dayal-eyebrow">Satisfied Customers</p>
            <h2 className="dayal-heading dayal-heading-lg mt-5">What Our Customers Say</h2>
            <div className="relative mt-8">
              <AnimatePresence mode="wait">
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -16 }}
                  className="dayal-quote-card"
                >
                  <div className="relative z-[1] flex gap-1" style={{ color: "var(--dayal-gold)" }}>
                    {Array.from({ length: t.rating }).map((_, i) => (
                      <Star key={i} className="h-4 w-4 fill-current" />
                    ))}
                  </div>
                  <p className="dayal-serif relative z-[1] mt-6 text-lg leading-relaxed">{t.quote}</p>
                  <footer
                    className="relative z-[1] mt-8 border-t pt-5"
                    style={{ borderColor: "var(--dayal-border)" }}
                  >
                    <p className="font-semibold">{t.name}</p>
                    <p className="mt-0.5 text-sm dayal-text-muted">{t.location}</p>
                  </footer>
                </motion.div>
              </AnimatePresence>
              <div className="mt-5 flex items-center justify-between">
                <div className="flex gap-2">
                  {TESTIMONIALS.map((_, i) => (
                    <button
                      key={i}
                      type="button"
                      className="h-2 rounded-full transition-all"
                      style={{
                        width: i === index ? "1.5rem" : "0.5rem",
                        background: i === index ? "var(--dayal-gold)" : "rgba(11, 22, 51, 0.15)",
                      }}
                      aria-label={`Testimonial ${i + 1}`}
                      onClick={() => setIndex(i)}
                    />
                  ))}
                </div>
                <div className="flex gap-2">
                  <button
                    type="button"
                    className="rounded-full border p-2 transition hover:border-[color:var(--dayal-gold)]"
                    style={{ borderColor: "var(--dayal-border)" }}
                    onClick={() => setIndex((i) => (i === 0 ? TESTIMONIALS.length - 1 : i - 1))}
                    aria-label="Previous"
                  >
                    <ChevronLeft className="h-4 w-4" />
                  </button>
                  <button
                    type="button"
                    className="rounded-full border p-2 transition hover:border-[color:var(--dayal-gold)]"
                    style={{ borderColor: "var(--dayal-border)" }}
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
