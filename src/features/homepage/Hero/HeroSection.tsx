import { cn } from '@/lib/cn';
import { HERO_HEADING_ID, HERO_ID, HERO_SYSTEM } from './hero.constants';
import { heroHandFont } from './hero-fonts';
import { HeroBackground } from './HeroBackground';
import { HeroContent } from './HeroContent';
import { SystemComposition } from './SystemComposition';

/**
 * Hero — Complete Digital Systems + connected Industry System composition.
 * ATF CSS is consolidated via HomepageShell (`homepage-atf.css`) so Hero paint
 * is not delayed by duplicate render-blocking stylesheets.
 */
export function HeroSection() {
  const flowLabel = HERO_SYSTEM.flow.join(' to ');

  return (
    <section
      id={HERO_ID}
      aria-labelledby={HERO_HEADING_ID}
      className={cn('hp-hero', heroHandFont.variable)}
    >
      <HeroBackground />

      <div className="hp-hero__shell">
        <div className="hp-hero__grid">
          <HeroContent />
          <div className="hp-hero-visual">
            <p className="sr-only">
              Visual composition of the {HERO_SYSTEM.industry}: connected modules flowing from{' '}
              {flowLabel}. The browser window cycles through portfolio project previews.
            </p>
            <SystemComposition />
          </div>
        </div>
      </div>
    </section>
  );
}
