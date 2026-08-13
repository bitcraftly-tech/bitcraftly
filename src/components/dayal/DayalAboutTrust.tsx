'use client';

import { ArrowUpRight } from 'lucide-react';
import Image from 'next/image';

import DayalReveal from '@/components/dayal/DayalReveal';
import { ABOUT_EXTENDED, ABOUT_INTRO, PROPRIETOR } from '@/lib/dayal/data';

export default function DayalAboutTrust() {
  return (
    <section id="about" className="dayal-section dayal-section--cream">
      <div className="dayal-container">
        <DayalReveal>
          <div className="dayal-about-panel grid lg:grid-cols-12">
            <div className="dayal-media-skeleton relative aspect-[4/5] w-full sm:aspect-[5/4] lg:col-span-5 lg:aspect-auto lg:min-h-[26rem]">
              <Image
                src={PROPRIETOR.image}
                alt={`${PROPRIETOR.name}, ${PROPRIETOR.role} of ${PROPRIETOR.company}`}
                fill
                className="object-cover object-[center_28%]"
                sizes="(max-width: 1024px) 100vw, 42vw"
              />
              <div
                className="absolute inset-0 bg-gradient-to-t from-[#0b1633]/90 via-[#0b1633]/25 to-transparent"
                aria-hidden
              />
              <div className="absolute inset-x-0 bottom-0 p-6 sm:p-8">
                <p className="text-xs font-semibold uppercase tracking-[0.22em] text-[#c8a46b]">
                  {PROPRIETOR.role}
                </p>
                <p className="dayal-serif mt-2 text-2xl font-semibold text-white sm:text-[1.75rem]">
                  {PROPRIETOR.name}
                </p>
                <p className="mt-1 text-sm text-white/75">{PROPRIETOR.company}</p>
              </div>
            </div>

            <div className="dayal-about-panel__copy px-6 py-8 sm:px-8 sm:py-10 lg:col-span-7 lg:px-12 lg:py-14">
              <p className="dayal-eyebrow">About Dayal Builders</p>
              <div className="dayal-gold-line mt-3" aria-hidden />
              <h2 className="dayal-section-title mt-4 max-w-xl leading-snug">
                A trusted name in Jamshedpur real estate
              </h2>
              <p className="dayal-body mt-5 max-w-2xl">{ABOUT_INTRO}</p>
              <p className="dayal-body mt-4 max-w-2xl">{ABOUT_EXTENDED}</p>
              <a
                href="https://www.dayalbuilder.com/about-us"
                target="_blank"
                rel="noopener noreferrer"
                className="dayal-btn-outline mt-8 inline-flex items-center gap-2"
              >
                About Dayal Builders
                <ArrowUpRight className="h-4 w-4" aria-hidden />
              </a>
            </div>
          </div>
        </DayalReveal>
      </div>
    </section>
  );
}
