'use client';

import { HardHat, Home, KeyRound, ShieldCheck } from 'lucide-react';
import type { LucideIcon } from 'lucide-react';

import DayalCounter from '@bitcraftly/showcase-dayal-builders/components/DayalCounter';
import DayalReveal from '@bitcraftly/showcase-dayal-builders/components/DayalReveal';
import { ESTATE_LISTINGS } from '@bitcraftly/showcase-dayal-builders/lib/estate';

const DELIVERED = ESTATE_LISTINGS.filter((listing) => listing.status === 'Completed').length;
const OPEN_UNITS = ESTATE_LISTINGS.reduce((total, listing) => total + listing.units.available, 0);

const STATS: readonly {
  readonly icon: LucideIcon;
  readonly value: number;
  readonly suffix: string;
  readonly label: string;
}[] = [
  { icon: ShieldCheck, value: 26, suffix: '+', label: 'Years building in Jamshedpur' },
  { icon: Home, value: ESTATE_LISTINGS.length, suffix: '', label: 'Projects in the portfolio' },
  { icon: KeyRound, value: DELIVERED, suffix: '', label: 'Addresses handed over' },
  { icon: HardHat, value: OPEN_UNITS, suffix: '', label: 'Units open for booking' },
];

export default function DayalEstateStats() {
  return (
    <section
      className="bg-[#0b1633] py-6 text-white sm:py-7"
      aria-label="Dayal Builders at a glance"
    >
      <div className="dayal-container">
        <ul className="grid grid-cols-2 gap-x-4 gap-y-7 lg:grid-cols-4">
          {STATS.map((stat, index) => {
            const Icon = stat.icon;
            return (
              <DayalReveal
                as="li"
                key={stat.label}
                delay={index * 0.06}
                className="flex items-start gap-3 border-l border-white/12 pl-4 first:border-l-0 first:pl-0 lg:border-l lg:pl-5 lg:first:border-l-0 lg:first:pl-0"
              >
                <span
                  className="mt-1 flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-[#c8a46b]/15 text-[#c8a46b]"
                  aria-hidden
                >
                  <Icon className="h-4 w-4" />
                </span>
                <div className="min-w-0">
                  <p className="dayal-serif text-2xl font-semibold leading-none sm:text-3xl">
                    <DayalCounter value={stat.value} suffix={stat.suffix} />
                  </p>
                  <p className="mt-1.5 text-xs leading-snug text-white/65 sm:text-sm">
                    {stat.label}
                  </p>
                </div>
              </DayalReveal>
            );
          })}
        </ul>
      </div>
    </section>
  );
}
