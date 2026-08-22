import { cn } from '@/lib/cn';
import { HERO_HEADING_ID, HERO_ID, HERO_INDUSTRY_PREVIEWS, HERO_SYSTEM } from './hero.constants';
import { heroHandFont } from './hero-fonts';
import { HeroBackground } from './HeroBackground';
import { HeroIntro, HeroMeta } from './HeroContent';
import { SystemComposition } from './SystemComposition';

/**
 * Hero — Complete Digital Systems + connected Industry System composition.
 * Mobile UX order: intro (CTA) → portfolio carousel → modules/trust.
 * Desktop: copy column left, composition right.
 * ATF CSS is consolidated via HomepageShell (`homepage-atf.css`).
 */
export function HeroSection() {
  const flowLabel = HERO_SYSTEM.flow.join(' to ');
  const lcpPreview = HERO_INDUSTRY_PREVIEWS[0];

  return (
    <section
      id={HERO_ID}
      aria-labelledby={HERO_HEADING_ID}
      className={cn('hp-hero', heroHandFont.variable)}
    >
      {lcpPreview?.usesHeroOptimized ? (
        <link
          rel="preload"
          as="image"
          type="image/avif"
          imageSrcSet={lcpPreview.imageAvifSrcSet}
          imageSizes={lcpPreview.imageSizes}
          fetchPriority="high"
        />
      ) : null}
      <HeroBackground />

      <div className="hp-hero__shell">
        <div className="hp-hero__grid">
          <HeroIntro />
          <div className="hp-hero-visual">
            <p className="sr-only">
              Visual composition of the {HERO_SYSTEM.industry}: connected modules flowing from{' '}
              {flowLabel}. The browser window cycles through portfolio project previews.
            </p>
            <SystemComposition />
          </div>
          <HeroMeta />
        </div>
      </div>
    </section>
  );
}
