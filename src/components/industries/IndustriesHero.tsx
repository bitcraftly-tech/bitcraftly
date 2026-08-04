import Link from 'next/link';
import { bcButtonClassName, ButtonArrow } from '@/components/ui/button';
import { Container } from '@/components/ui/container';
import { INDUSTRIES_HERO } from './industries.content';
import { IndustrySelector } from './IndustrySelector';
import type { IndustryId } from './types';

const primaryCtaClassName = bcButtonClassName({
  variant: 'primary',
  size: 'lg',
  className: 'group h-[50px] min-w-[160px] px-[22px]',
});

const secondaryCtaClassName = bcButtonClassName({
  variant: 'outline',
  size: 'lg',
  className: 'h-[50px] min-w-[160px] px-[22px]',
});

interface IndustriesHeroProps {
  readonly selectedId: IndustryId;
  readonly onSelect: (id: IndustryId) => void;
}

export function IndustriesHero({ selectedId, onSelect }: IndustriesHeroProps) {
  return (
    <section className="ip-hero" aria-labelledby="industries-hero-heading">
      <Container>
        <div className="ip-hero__inner">
          <p className="ip-hero__eyebrow">{INDUSTRIES_HERO.eyebrow}</p>
          <h1 id="industries-hero-heading" className="ip-hero__title">
            {INDUSTRIES_HERO.title}
          </h1>
          <p className="ip-hero__desc">{INDUSTRIES_HERO.description}</p>

          <IndustrySelector selectedId={selectedId} onSelect={onSelect} />

          <div className="ip-hero__actions">
            <Link href={INDUSTRIES_HERO.primaryCta.href} className={primaryCtaClassName}>
              <span>{INDUSTRIES_HERO.primaryCta.label}</span>
              <ButtonArrow className="text-[15px]" />
            </Link>
            <Link href={INDUSTRIES_HERO.secondaryCta.href} className={secondaryCtaClassName}>
              {INDUSTRIES_HERO.secondaryCta.label}
            </Link>
          </div>
        </div>
      </Container>
    </section>
  );
}
