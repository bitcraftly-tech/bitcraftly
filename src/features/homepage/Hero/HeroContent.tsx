import Link from 'next/link';
import { ButtonArrow } from '@/components/ui/button';
import { cn } from '@/lib/cn';
import {
  HERO_BADGE,
  HERO_CTAS,
  HERO_DESCRIPTION,
  HERO_HEADING,
  HERO_HEADING_ID,
  HERO_MODULE_CHIPS,
  HERO_TRUST,
} from './hero.constants';
import { HeroTypedFocus } from './HeroTypedFocus';

/**
 * Hero copy — premium ATF editorial column.
 */
export function HeroContent() {
  return (
    <div className="hp-hero-content">
      <p className="hp-hero-brand">
        <span className="hp-hero-brand__tag">
          <span className="hp-hero-brand__dot" aria-hidden="true" />
          <span className="hp-hero-brand__text">{HERO_BADGE}</span>
        </span>
      </p>

      <h1
        id={HERO_HEADING_ID}
        className="hp-hero-heading"
        style={{ ['--type-len' as string]: HERO_HEADING.focus.length }}
      >
        <span className="hp-hero-heading__lead">
          <span className="hp-hero-heading__lead-text">{HERO_HEADING.lead}</span>
        </span>
        <HeroTypedFocus />
        <span className="hp-hero-heading__sub" aria-label={HERO_HEADING.sub}>
          <span className="hp-hero-heading__sub-lead">{HERO_HEADING.subLead}</span>
          <span className="hp-hero-heading__sub-accent" aria-hidden="true">
            {Array.from(HERO_HEADING.subAccent).map((char, index) => (
              <span
                key={`${char}-${index}`}
                className="hp-hero-heading__char hp-hero-heading__char--sub"
                style={{ ['--i' as string]: index }}
              >
                {char}
              </span>
            ))}
          </span>
        </span>
      </h1>

      <p className="hp-hero-description">{HERO_DESCRIPTION}</p>

      <ul className="hp-hero-modules" aria-label="Industry System modules">
        {HERO_MODULE_CHIPS.map((chip, index) => (
          <li
            key={chip}
            className="hp-hero-modules__item"
            style={{ ['--chip-i' as string]: index }}
          >
            <span className="hp-hero-modules__dot" aria-hidden="true" />
            <span className="hp-hero-modules__label">{chip}</span>
          </li>
        ))}
      </ul>

      <div className="hp-hero-actions">
        {HERO_CTAS.map((cta) => {
          const isPrimary = cta.variant === 'primary';
          return (
            <Link
              key={cta.label}
              href={cta.href}
              className={cn(
                'hp-hero-cta',
                isPrimary ? 'hp-hero-cta--primary' : 'hp-hero-cta--secondary',
              )}
            >
              <span>{cta.label}</span>
              {isPrimary ? <ButtonArrow className="hp-hero-cta__arrow text-[14px]" /> : null}
            </Link>
          );
        })}
      </div>

      <div className="hp-hero-trust">
        <div className="hp-hero-trust__avatars" aria-hidden="true">
          {HERO_TRUST.avatars.map((avatar) => (
            <span
              key={avatar.initials}
              className={cn('hp-hero-trust__avatar', `hp-hero-trust__avatar--${avatar.tone}`)}
            >
              {avatar.initials}
            </span>
          ))}
        </div>
        <p className="hp-hero-trust__label">{HERO_TRUST.label}</p>
      </div>
    </div>
  );
}
