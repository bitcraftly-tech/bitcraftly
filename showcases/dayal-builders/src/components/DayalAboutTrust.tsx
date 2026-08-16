'use client';

import { ArrowUpRight, Building2, DraftingCompass, Gem, MapPinned, Quote } from 'lucide-react';
import type { LucideIcon } from 'lucide-react';
import Image from 'next/image';

import DayalReveal from '@bitcraftly/showcase-dayal-builders/components/DayalReveal';
import {
  ABOUT_EXTENDED,
  ABOUT_INTRO,
  PROPRIETOR,
} from '@bitcraftly/showcase-dayal-builders/lib/data';

const TRUST_PILLARS: readonly {
  readonly icon: LucideIcon;
  readonly label: string;
  readonly detail: string;
}[] = [
  {
    icon: DraftingCompass,
    label: 'Design led',
    detail: 'Architecture partners and considered planning',
  },
  {
    icon: Gem,
    label: 'Quality first',
    detail: 'Proven materials and modern engineering',
  },
  {
    icon: MapPinned,
    label: 'Locally rooted',
    detail: 'Built around how Jamshedpur lives',
  },
];

export default function DayalAboutTrust() {
  return (
    <section
      id="about"
      className="dayal-about dayal-section dayal-section--stone"
      aria-labelledby="dayal-about-heading"
    >
      <div className="dayal-about__blueprint" aria-hidden />
      <div className="dayal-container">
        <div className="dayal-about__layout">
          <DayalReveal className="dayal-about__visual">
            <div className="dayal-about__portrait dayal-media-skeleton">
              <Image
                src={PROPRIETOR.image}
                alt={`${PROPRIETOR.name}, ${PROPRIETOR.role} of ${PROPRIETOR.company}`}
                fill
                className="object-cover object-[center_28%]"
                sizes="(max-width: 1024px) 100vw, 42vw"
              />
              <div className="dayal-about__portrait-shade" aria-hidden />
              <div className="dayal-about__portrait-caption">
                <p>{PROPRIETOR.name}</p>
                <span>
                  {PROPRIETOR.role} · {PROPRIETOR.company}
                </span>
              </div>
            </div>

            <div className="dayal-about__legacy" aria-label="Building in Jamshedpur since 1999">
              <span>Since</span>
              <strong>1999</strong>
              <small>Jamshedpur</small>
            </div>

            <div className="dayal-about__drawing-mark" aria-hidden>
              <Building2 />
              <span>Foundations that last</span>
            </div>
          </DayalReveal>

          <DayalReveal delay={0.08} className="dayal-about__content">
            <p className="dre-eyebrow">Our legacy</p>
            <h2 id="dayal-about-heading" className="dre-title mt-4">
              A trusted name in Jamshedpur real estate
            </h2>

            <div className="dayal-about__quote">
              <Quote aria-hidden />
              <p>
                We do not just construct buildings. We create addresses that become part of a
                family&apos;s story.
              </p>
            </div>

            <p className="dayal-about__body">{ABOUT_INTRO}</p>
            <p className="dayal-about__body dayal-about__body--secondary">{ABOUT_EXTENDED}</p>

            <ul className="dayal-about__pillars">
              {TRUST_PILLARS.map((pillar) => {
                const Icon = pillar.icon;
                return (
                  <li key={pillar.label}>
                    <span aria-hidden>
                      <Icon />
                    </span>
                    <div>
                      <strong>{pillar.label}</strong>
                      <small>{pillar.detail}</small>
                    </div>
                  </li>
                );
              })}
            </ul>

            <a
              href="https://www.dayalbuilder.com/about-us"
              target="_blank"
              rel="noopener noreferrer"
              className="dayal-about__link"
            >
              Discover our story
              <ArrowUpRight className="h-4 w-4" aria-hidden />
            </a>
          </DayalReveal>
        </div>
      </div>
    </section>
  );
}
