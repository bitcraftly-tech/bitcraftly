'use client';

import { ArrowUpRight } from 'lucide-react';
import Image from 'next/image';

import DayalReveal from '@bitcraftly/showcase-dayal-builders/components/DayalReveal';
import {
  ABOUT_EXTENDED,
  ABOUT_INTRO,
  PROPRIETOR,
} from '@bitcraftly/showcase-dayal-builders/lib/data';

export default function DayalAboutTrust() {
  return (
    <section id="about" className="dayal-section dayal-section--stone">
      <div className="dayal-container">
        <div className="dayal-about-editorial">
          <DayalReveal className="dayal-about-editorial__media dayal-media-skeleton">
            <Image
              src={PROPRIETOR.image}
              alt={`${PROPRIETOR.name}, ${PROPRIETOR.role} of ${PROPRIETOR.company}`}
              fill
              className="object-cover object-[center_28%]"
              sizes="(max-width: 1024px) 100vw, 44vw"
            />
          </DayalReveal>

          <DayalReveal delay={0.08} className="dayal-about-editorial__copy">
            <p className="dayal-eyebrow">About</p>
            <h2 className="dayal-section-title mt-4 max-w-xl">
              A trusted name in Jamshedpur real estate
            </h2>
            <p className="dayal-about-editorial__role">
              {PROPRIETOR.name}
              <span aria-hidden> · </span>
              {PROPRIETOR.role}
            </p>
            <p className="dayal-body mt-5 max-w-xl">{ABOUT_INTRO}</p>
            <p className="dayal-body mt-4 max-w-xl">{ABOUT_EXTENDED}</p>
            <a
              href="https://www.dayalbuilder.com/about-us"
              target="_blank"
              rel="noopener noreferrer"
              className="dayal-text-link mt-8"
            >
              About Dayal Builders
              <ArrowUpRight className="h-4 w-4" aria-hidden />
            </a>
          </DayalReveal>
        </div>
      </div>
    </section>
  );
}
