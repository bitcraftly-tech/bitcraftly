'use client';

import { CheckCircle2 } from 'lucide-react';
import Image from 'next/image';

import DayalReveal from '@/components/dayal/DayalReveal';
import { WHY_FAMILY_IMAGE } from '@/lib/dayal/data';

const POINTS = [
  'Founder-led trust with transparent communication',
  'Premium craftsmanship and vetted material partners',
  'Modern construction standards and quality audits',
  'Family-first planning with green open spaces',
  'Clear booking, payment, and possession process',
] as const;

export default function DayalWhy() {
  return (
    <section className="py-16 lg:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid items-center gap-12 lg:grid-cols-2">
          <DayalReveal className="relative aspect-[4/5] overflow-hidden rounded-2xl shadow-2xl lg:aspect-auto lg:min-h-[520px]">
            <Image
              src={WHY_FAMILY_IMAGE}
              alt="Happy family at their new home"
              fill
              className="object-cover"
              sizes="(max-width: 1024px) 100vw, 50vw"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#0b1633]/60 to-transparent" />
          </DayalReveal>

          <DayalReveal delay={0.1}>
            <p className="text-xs font-semibold uppercase tracking-[0.25em] text-[#c8a46b]">
              Why Dayal Builders
            </p>
            <h2 className="dayal-serif mt-3 text-3xl font-semibold text-[#0b1633] sm:text-4xl">
              Built on Trust. Designed for Generations.
            </h2>
            <p className="mt-6 leading-relaxed text-[#5c6478]">
              For over fifteen years, Dayal Builders has delivered homes that balance aspiration
              with accountability — the kind of partner you want when the investment is your
              family&apos;s future.
            </p>
            <ul className="mt-8 space-y-4">
              {POINTS.map((point) => (
                <li key={point} className="flex gap-3 text-[#0b1633]">
                  <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-[#c8a46b]" />
                  <span className="text-sm leading-relaxed sm:text-base">{point}</span>
                </li>
              ))}
            </ul>
          </DayalReveal>
        </div>
      </div>
    </section>
  );
}
