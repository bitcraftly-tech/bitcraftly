import Link from 'next/link';
import { AnimatedStat } from '@/components/patterns/animated-stat';
import { MarketingBreadcrumbs } from '@/components/patterns/marketing-breadcrumbs';
import { Container } from '@/components/ui/container';
import { Icon, type IconName } from '@/components/ui/icon';
import { Section } from '@/components/ui/section';
import { ROUTES } from '@/constants/navigation';
import { cn } from '@/lib/cn';
import { isMobileUserAgent } from '@/lib/device/is-mobile-user-agent';
import type { BreadcrumbItem } from '@/lib/seo/breadcrumbs';
import '@/features/homepage/Hero/hero.css';
import '@/features/services/services.css';
import { CAREER_ROLES, getCareersApplyHref } from './careers.content';
import { CareersHeroVisual } from './CareersHeroVisual';
import './careers.css';

interface CareersHeroProps {
  breadcrumbs: readonly BreadcrumbItem[];
}

const HERO_TITLE = 'Build products that SMBs actually use';
const HERO_HIGHLIGHT = 'SMBs actually use';

const HERO_LEAD =
  'Premium studio hiring — remote-first, founder-led reviews, and a modern stack. Join a small team shipping websites, apps, and AI-powered web solutions.';

const HERO_STATS: readonly {
  id: string;
  value: string;
  label: string;
  icon: IconName;
  tone: 'violet' | 'sky' | 'indigo' | 'amber';
}[] = [
  {
    id: 'remote',
    value: '100%',
    label: 'Remote-first roles',
    icon: 'globe',
    tone: 'violet',
  },
  {
    id: 'founder',
    value: '1:1',
    label: 'Founder-led reviews',
    icon: 'shield',
    tone: 'sky',
  },
  {
    id: 'stack',
    value: 'Modern',
    label: 'Next.js · FastAPI',
    icon: 'code',
    tone: 'indigo',
  },
  {
    id: 'team',
    value: 'Small',
    label: 'High-ownership team',
    icon: 'rocket',
    tone: 'amber',
  },
] as const;

const HERO_FEATURES: readonly {
  id: string;
  title: string;
  description: string;
  icon: IconName;
  tone: 'violet' | 'sky' | 'emerald' | 'amber';
}[] = [
  {
    id: 'craft',
    title: 'Craft over chaos',
    description: 'Ship real client products — not slide decks',
    icon: 'sparkles',
    tone: 'violet',
  },
  {
    id: 'async',
    title: 'Async-first rhythm',
    description: 'Flexible hours with clear delivery ownership',
    icon: 'calendar',
    tone: 'sky',
  },
  {
    id: 'growth',
    title: 'Learning budget',
    description: 'Courses, tools, and space to level up',
    icon: 'trending-up',
    tone: 'emerald',
  },
  {
    id: 'comp',
    title: 'Transparent bands',
    description: 'Clear compensation discussed early',
    icon: 'check',
    tone: 'amber',
  },
] as const;

/**
 * Careers hero — same aurora / services-hero shell as Services landing.
 */
export async function CareersHero({ breadcrumbs }: CareersHeroProps) {
  const isMobile = await isMobileUserAgent();
  const hasOpenings = CAREER_ROLES.length > 0;
  const [titleBefore, titleAfter] = HERO_TITLE.includes(HERO_HIGHLIGHT)
    ? HERO_TITLE.split(HERO_HIGHLIGHT)
    : [HERO_TITLE, ''];

  return (
    <Section
      spacing="none"
      contained={false}
      aria-labelledby="careers-page-heading"
      className={cn(
        'lux-hero services-hero careers-hero relative overflow-hidden hero-surface',
        'border-b border-border/60',
        isMobile && 'marketing-hero--compact',
      )}
    >
      {!isMobile ? (
        <>
          <div
            className="pointer-events-none absolute inset-0 opacity-55 hero-dot-grid"
            aria-hidden
          />
          <div
            className="pointer-events-none absolute inset-0 opacity-25 hero-line-grid"
            aria-hidden
          />
          <div
            className="pointer-events-none absolute -top-[var(--space-16)] -right-[12%] size-[680px] rounded-full blur-3xl hero-aurora-accent"
            aria-hidden
          />
          <div
            className="pointer-events-none absolute -bottom-[var(--space-10)] -left-[14%] size-[560px] rounded-full blur-3xl hero-aurora-primary"
            aria-hidden
          />
          <div
            className="pointer-events-none absolute top-1/3 left-1/2 size-[420px] -translate-x-1/2 rounded-full opacity-40 blur-3xl hero-aurora-blend"
            aria-hidden
          />
        </>
      ) : null}

      <Container size="xl" className="services-hero__container">
        <div className="services-hero__breadcrumb">
          <MarketingBreadcrumbs items={breadcrumbs} className="mb-0" />
        </div>

        <div className="services-hero__grid">
          <div className="services-hero__content">
            <p className="services-hero__eyebrow">
              <Icon name="rocket" size="sm" aria-hidden className="services-hero__eyebrow-icon" />
              <span>Careers at Bitcraftly</span>
            </p>

            <h1 id="careers-page-heading" className="services-hero__title">
              {titleBefore}
              {HERO_TITLE.includes(HERO_HIGHLIGHT) ? (
                <span className="services-hero__title-accent">{HERO_HIGHLIGHT}</span>
              ) : null}
              {titleAfter}
            </h1>

            <p className="services-hero__description">{HERO_LEAD}</p>

            <p className="careers-hero__note">
              Every application is read by Sanjay — no keyword bots, no outsourced recruiters.
            </p>

            <div className="services-hero__cta-row">
              <Link
                href={getCareersApplyHref('general')}
                className="services-hero__btn services-hero__btn--primary"
              >
                {hasOpenings ? 'Apply now' : 'Send general application'}
                <Icon name="arrow-up-right" size="sm" aria-hidden />
              </Link>
              <Link
                href={hasOpenings ? '#open-roles' : '#careers-process-heading'}
                className="services-hero__btn services-hero__btn--outline"
              >
                {hasOpenings ? 'View open roles' : 'See hiring process'}
                <Icon name="arrow-up-right" size="sm" aria-hidden />
              </Link>
              <Link href={ROUTES.about} className="services-hero__btn services-hero__btn--outline">
                Meet the team
                <Icon name="arrow-up-right" size="sm" aria-hidden />
              </Link>
            </div>

            {!isMobile ? (
              <div className="services-hero-stats" role="list" aria-label="Careers highlights">
                {HERO_STATS.map((stat) => (
                  <div key={stat.id} role="listitem" className="services-hero-stats__item">
                    <dl className="services-hero-stats__pair m-0">
                      <dt className="services-hero-stats__value">
                        <span className="services-hero-stats__head">
                          <span
                            className={`services-hero-stats__icon services-hero-stats__icon--${stat.tone}`}
                            aria-hidden
                          >
                            <Icon name={stat.icon} size="sm" />
                          </span>
                          <AnimatedStat value={stat.value} />
                        </span>
                      </dt>
                      <dd className="services-hero-stats__label">{stat.label}</dd>
                    </dl>
                  </div>
                ))}
              </div>
            ) : null}
          </div>

          {!isMobile ? (
            <div className="services-hero__visual">
              <CareersHeroVisual />
            </div>
          ) : null}

          {!isMobile ? (
            <ul className="services-hero-features" aria-label="Why join Bitcraftly">
              {HERO_FEATURES.map((item) => (
                <li key={item.id} className="services-hero-features__item">
                  <span className="services-hero-features__head">
                    <span
                      className={`services-hero-features__icon services-hero-features__icon--${item.tone}`}
                      aria-hidden
                    >
                      <Icon name={item.icon} size="sm" />
                    </span>
                    <span className="services-hero-features__title">{item.title}</span>
                  </span>
                  <span className="services-hero-features__desc">{item.description}</span>
                </li>
              ))}
            </ul>
          ) : null}
        </div>
      </Container>
    </Section>
  );
}
