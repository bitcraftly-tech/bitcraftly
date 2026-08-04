import Link from 'next/link';
import { bcButtonClassName, ButtonArrow } from '@/components/ui/button';
import { Container } from '@/components/ui/container';
import { Icon } from '@/components/ui/icon';
import { AI_SOLUTIONS_HERO } from './ai-solutions.content';

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

export function AiSolutionsHero() {
  return (
    <section className="as-hero" aria-labelledby="ai-solutions-hero-heading">
      <Container>
        <div className="as-hero__inner">
          <p className="as-hero__eyebrow">{AI_SOLUTIONS_HERO.eyebrow}</p>
          <h1 id="ai-solutions-hero-heading" className="as-hero__title">
            {AI_SOLUTIONS_HERO.title}
          </h1>
          <p className="as-hero__subtitle">{AI_SOLUTIONS_HERO.subtitle}</p>

          <div className="as-hero__actions">
            <Link href={AI_SOLUTIONS_HERO.primaryCta.href} className={primaryCtaClassName}>
              <span>{AI_SOLUTIONS_HERO.primaryCta.label}</span>
              <ButtonArrow className="text-[15px]" />
            </Link>
            <Link href={AI_SOLUTIONS_HERO.secondaryCta.href} className={secondaryCtaClassName}>
              {AI_SOLUTIONS_HERO.secondaryCta.label}
            </Link>
          </div>

          <ul className="as-hero__trust">
            {AI_SOLUTIONS_HERO.trustItems.map((item) => (
              <li key={item}>
                <span className="as-hero__trust-icon" aria-hidden>
                  <Icon name="check" size="sm" className="h-[14px] w-[14px]" />
                </span>
                {item}
              </li>
            ))}
          </ul>
        </div>
      </Container>
    </section>
  );
}
