'use client';

import { Building2, MapPin, Palette, Users } from 'lucide-react';
import type { LucideIcon } from 'lucide-react';

import DayalReveal from '@/components/dayal/DayalReveal';
import { ABOUT_PILLARS, DAYAL } from '@/lib/dayal/data';

const PILLAR_ICONS: Record<string, LucideIcon> = {
  design: Palette,
  build: Building2,
  location: MapPin,
  people: Users,
};

export default function DayalTrustBar() {
  return (
    <section
      className="dayal-on-dark dayal-section--tight relative overflow-hidden border-y border-[#c8a46b]/15 bg-[#0b1633]"
      aria-label="Why choose Dayal Builders"
    >
      <div
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_80%_60%_at_50%_0%,rgba(200,164,107,0.1),transparent_55%)]"
        aria-hidden
      />

      <div className="dayal-container relative py-10 sm:py-12 lg:py-14">
        <DayalReveal>
          <div className="flex flex-col gap-10 lg:flex-row lg:items-stretch lg:gap-0">
            <div className="flex-1 lg:pr-10 xl:pr-14">
              <ul className="grid grid-cols-2 gap-x-5 gap-y-8 sm:grid-cols-4 lg:gap-x-0 lg:gap-y-0">
                {ABOUT_PILLARS.map((p, i) => {
                  const Icon = PILLAR_ICONS[p.icon] ?? Building2;
                  const showDivider = i > 0;

                  return (
                    <DayalReveal
                      as="li"
                      key={p.label}
                      delay={0.06 + i * 0.06}
                      className={`relative flex flex-col items-center text-center sm:items-start sm:text-left lg:px-5 xl:px-7 ${
                        showDivider ? 'lg:border-l lg:border-[#c8a46b]/20' : ''
                      } ${i === 0 ? 'lg:pl-0' : ''}`}
                    >
                      <span className="flex h-11 w-11 items-center justify-center rounded-full border border-[#c8a46b]/35 bg-[#c8a46b]/10 text-[#c8a46b]">
                        <Icon className="h-5 w-5" strokeWidth={1.5} aria-hidden />
                      </span>
                      <p className="dayal-serif mt-3.5 text-sm font-semibold leading-snug text-white sm:text-[15px]">
                        {p.label}
                      </p>
                    </DayalReveal>
                  );
                })}
              </ul>
            </div>

            <div className="flex shrink-0 flex-col justify-center border-t border-[#c8a46b]/15 pt-8 lg:w-[min(100%,22rem)] lg:border-l lg:border-t-0 lg:pl-10 lg:pt-0 xl:w-[26rem] xl:pl-14">
              <div className="dayal-gold-line mx-auto lg:mx-0 lg:ml-auto" aria-hidden />
              <p className="dayal-serif mt-4 text-center text-xl leading-[1.35] text-white/95 sm:text-2xl lg:text-right lg:text-[1.65rem] xl:text-[1.8rem]">
                Building <span className="text-[#c8a46b]">more than</span> homes —{' '}
                <span className="text-[#c8a46b]">we build</span> relationships.
              </p>
              <p className="mt-3 text-center text-xs font-medium uppercase tracking-[0.2em] text-white/40 lg:text-right">
                {DAYAL.location}
              </p>
            </div>
          </div>
        </DayalReveal>
      </div>
    </section>
  );
}
