import type { CSSProperties } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { cn } from '@/lib/cn';
import {
  BoltIcon,
  CalendarIcon,
  LayersIcon,
  ShieldIcon,
  SparkIcon,
  type StudioIconProps,
} from './ai-studio-icons';
import { AI_STUDIO_HERO } from './ai-studio.content';
import { AiStudioDashboardMock } from './AiStudioDashboardMock';
import { AiStudioHeroBackground } from './AiStudioHeroBackground';
import { AiStudioHeroCircuitStrip } from './AiStudioHeroCircuitStrip';
import { AiStudioHeroRobotElectric } from './AiStudioHeroRobotElectric';
import './ai-studio.css';

/**
 * AI Studio hero — same composition as studio.bitcraftly.com / bitcraftly-ai-studio landing.
 */
export function AiStudioHero() {
  const hero = AI_STUDIO_HERO;

  return (
    <section aria-labelledby={hero.headingId} className="studio-hero">
      <AiStudioHeroBackground />
      <div className="studio-hero__robot-bg" aria-hidden />
      <AiStudioHeroCircuitStrip position="top" />
      <AiStudioHeroCircuitStrip position="bottom" />

      <div className="studio-hero__rail">
        <div className="studio-hero__layout">
          <div className="studio-hero__copy motion-stagger-in motion-delay-1">
            <p className="studio-hero__badge">
              <span className="studio-hero__badge-new">
                <span className="studio-hero__badge-new-shine" aria-hidden />
                <span className="studio-hero__badge-new-text">{hero.badge.tag}</span>
              </span>
              <span className="studio-hero__badge-label">{hero.badge.label}</span>
            </p>

            <h1 id={hero.headingId} className="studio-hero__title">
              {hero.titleLines.map((line, index) => (
                <span
                  key={line}
                  className="studio-hero__title-line"
                  style={{ animationDelay: `${120 + index * 110}ms` } satisfies CSSProperties}
                >
                  {line}
                </span>
              ))}
              <span
                className="studio-hero__title-accent"
                style={{ animationDelay: '340ms, 1.1s' } satisfies CSSProperties}
              >
                {hero.titleAccent}
              </span>
              <span
                className="studio-hero__title-tail"
                style={{ animationDelay: '450ms' } satisfies CSSProperties}
              >
                {hero.titleTail}
              </span>
            </h1>

            <p className="studio-hero__description">{hero.description}</p>

            <div className="studio-hero__actions" aria-label="Hero actions">
              <Link
                href={hero.primaryCta.href}
                className="studio-hero__cta studio-hero__cta--primary"
              >
                <BoltIcon className="size-3.5 shrink-0 text-white" />
                {hero.primaryCta.label}
              </Link>
              <Link
                href={hero.secondaryCta.href}
                className="studio-hero__cta studio-hero__cta--ghost"
              >
                <CalendarIcon className="size-3.5 shrink-0 text-[#2563eb]" />
                {hero.secondaryCta.label}
              </Link>
            </div>
          </div>

          <div className="studio-hero__visual motion-stagger-in motion-delay-3">
            <div className="studio-hero__visual-inner">
              <div className="studio-hero__visual-stage">
                <div className="motion-float-dashboard">
                  <AiStudioDashboardMock />
                </div>

                <div className="studio-hero__robot" aria-hidden>
                  <div className="motion-float-robot">
                    <Image
                      src={hero.assets.robot}
                      alt=""
                      width={514}
                      height={1024}
                      className="studio-hero__robot-img"
                      priority
                    />
                    <AiStudioHeroRobotElectric />
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="studio-hero__features-desktop motion-stagger-in motion-delay-5">
            <FeatureList />
          </div>
        </div>

        <div className="studio-hero__features-mobile motion-stagger-in motion-delay-5">
          <FeatureList />
        </div>
      </div>
    </section>
  );
}

const featureIcons: Record<string, (props: StudioIconProps) => React.ReactElement> = {
  'ai-powered': SparkIcon,
  'multi-format': LayersIcon,
  'scale-securely': ShieldIcon,
};

function FeatureList() {
  return (
    <ul className="studio-hero__features" aria-label="Hero features">
      {AI_STUDIO_HERO.features.map((feature) => {
        const FeatureIcon = featureIcons[feature.id] ?? SparkIcon;

        return (
          <li key={feature.id} className="min-w-0">
            <div className="studio-hero__feature">
              <span
                className={cn(
                  'studio-hero__feature-icon',
                  `studio-hero__feature-icon--${feature.tone}`,
                )}
                aria-hidden
              >
                <FeatureIcon className="size-3.5" strokeWidth={1.5} />
              </span>
              <span className="min-w-0">
                <span className="studio-hero__feature-title">{feature.title}</span>
                <span className="studio-hero__feature-desc">{feature.description}</span>
              </span>
            </div>
          </li>
        );
      })}
    </ul>
  );
}
