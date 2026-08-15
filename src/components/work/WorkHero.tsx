import Link from 'next/link';
import { bcButtonClassName, ButtonArrow } from '@/components/ui/button';
import { Container } from '@/components/ui/container';
import { WORK_HERO } from './work.content';
import { WorkSearchFilters } from './WorkSearchFilters';
import type { WorkFilterId } from './types';

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

interface WorkHeroProps {
  readonly query: string;
  readonly activeFilter: WorkFilterId;
  readonly onQueryChange: (value: string) => void;
  readonly onFilterChange: (filter: WorkFilterId) => void;
}

export function WorkHero({ query, activeFilter, onQueryChange, onFilterChange }: WorkHeroProps) {
  return (
    <section className="wp-hero" aria-labelledby="work-hero-heading">
      <Container>
        <div className="wp-hero__inner">
          <p className="wp-hero__eyebrow">{WORK_HERO.eyebrow}</p>
          <h1 id="work-hero-heading" className="wp-hero__title">
            {WORK_HERO.title}
          </h1>
          <p className="wp-hero__desc">{WORK_HERO.description}</p>

          <WorkSearchFilters
            query={query}
            activeFilter={activeFilter}
            onQueryChange={onQueryChange}
            onFilterChange={onFilterChange}
          />

          <div className="wp-hero__actions">
            <Link href={WORK_HERO.primaryCta.href} className={primaryCtaClassName}>
              <span>{WORK_HERO.primaryCta.label}</span>
              <ButtonArrow className="text-[15px]" />
            </Link>
            <Link href={WORK_HERO.secondaryCta.href} className={secondaryCtaClassName}>
              {WORK_HERO.secondaryCta.label}
            </Link>
          </div>
        </div>
      </Container>
    </section>
  );
}
