import Link from 'next/link';
import { bcButtonClassName, ButtonArrow } from '@/components/ui/button';
import { Container } from '@/components/ui/container';
import { Icon } from '@/components/ui/icon';
import { SERVICES_LANDING_HERO } from './services-landing.content';

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

export function ServicesPageHero() {
  return (
    <section className="sl-hero" aria-labelledby="services-landing-hero-heading">
      <Container>
        <div className="sl-hero__inner">
          <p className="sl-hero__eyebrow">{SERVICES_LANDING_HERO.eyebrow}</p>
          <h1 id="services-landing-hero-heading" className="sl-hero__title">
            {SERVICES_LANDING_HERO.title}
          </h1>
          <p className="sl-hero__desc">{SERVICES_LANDING_HERO.description}</p>

          <div className="sl-hero__actions">
            <Link href={SERVICES_LANDING_HERO.primaryCta.href} className={primaryCtaClassName}>
              <span>{SERVICES_LANDING_HERO.primaryCta.label}</span>
              <ButtonArrow className="text-[15px]" />
            </Link>
            <Link href={SERVICES_LANDING_HERO.secondaryCta.href} className={secondaryCtaClassName}>
              {SERVICES_LANDING_HERO.secondaryCta.label}
            </Link>
          </div>

          <ul className="sl-hero__trust">
            {SERVICES_LANDING_HERO.trustItems.map((item) => (
              <li key={item}>
                <span className="sl-hero__trust-icon" aria-hidden>
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
