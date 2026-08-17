import Link from 'next/link';
import { AnimatedStat } from '@/components/patterns/animated-stat';
import { MarketingBreadcrumbs } from '@/components/patterns/marketing-breadcrumbs';
import { Container } from '@/components/ui/container';
import { Icon, type IconName } from '@/components/ui/icon';
import { Section } from '@/components/ui/section';
import { cn } from '@/lib/cn';
import { isMobileUserAgent } from '@/lib/device/is-mobile-user-agent';
import type { BreadcrumbItem } from '@/lib/seo/breadcrumbs';
import '@/features/homepage/Hero/hero.css';
import { WORK_LANDING } from './work.content';
import { WorkHeroVisual } from './WorkHeroVisual';
import './work.css';

interface WorkHeroProps {
  breadcrumbs: readonly BreadcrumbItem[];
}

const HERO_TECH_STACK: readonly {
  id: string;
  label: string;
  icon: IconName;
}[] = [
  { id: 'next', label: 'Next.js', icon: 'globe' },
  { id: 'react', label: 'React', icon: 'code' },
  { id: 'ts', label: 'TypeScript', icon: 'zap' },
  { id: 'fastapi', label: 'FastAPI', icon: 'database' },
  { id: 'postgres', label: 'PostgreSQL', icon: 'database' },
  { id: 'aws', label: 'AWS', icon: 'cloud' },
  { id: 'openai', label: 'OpenAI', icon: 'brain' },
] as const;

const HERO_STATS: readonly {
  id: string;
  value: string;
  label: string;
  icon: IconName;
  tone: 'violet' | 'sky' | 'indigo' | 'amber';
}[] = [
  {
    id: 'projects',
    value: '200+',
    label: 'Projects Delivered',
    icon: 'layout-grid',
    tone: 'violet',
  },
  {
    id: 'enterprise',
    value: '40+',
    label: 'Enterprise Clients',
    icon: 'shield',
    tone: 'sky',
  },
  {
    id: 'industries',
    value: '12+',
    label: 'Industries Served',
    icon: 'globe',
    tone: 'indigo',
  },
  {
    id: 'years',
    value: '8+',
    label: 'Years Experience',
    icon: 'star',
    tone: 'amber',
  },
] as const;

/**
 * Work hero — same shell language as Services hero, Work content + Care Portal visual.
 */
export async function WorkHero({ breadcrumbs }: WorkHeroProps) {
  const isMobile = await isMobileUserAgent();
  const title = WORK_LANDING.title;
  const highlight = WORK_LANDING.titleHighlight;
  const [titleBefore, titleAfter] = title.includes(highlight)
    ? title.split(highlight)
    : [title, ''];

  return (
    <Section
      spacing="none"
      contained={false}
      aria-labelledby="work-page-heading"
      className={cn(
        'lux-hero work-hero relative overflow-hidden hero-surface',
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

      <Container size="xl" className="work-hero__container">
        <div className="work-hero__breadcrumb">
          <MarketingBreadcrumbs items={breadcrumbs} className="mb-0" />
        </div>

        <div className="work-hero__grid">
          <div className="work-hero__content">
            <p className="work-hero__eyebrow">
              <Icon name="sparkles" size="sm" aria-hidden className="work-hero__eyebrow-icon" />
              <span>{WORK_LANDING.eyebrow}</span>
            </p>

            <h1 id="work-page-heading" className="work-hero__title">
              {titleBefore.trimEnd()}
              {title.includes(highlight) ? (
                <>
                  <br />
                  <span className="work-hero__title-mark">{highlight}</span>
                </>
              ) : null}
              {titleAfter}
            </h1>

            <p className="work-hero__description">{WORK_LANDING.description}</p>

            <div className="work-hero__cta-row">
              <Link
                href={WORK_LANDING.primaryCta.href}
                className="work-hero__btn work-hero__btn--primary"
              >
                {WORK_LANDING.primaryCta.label}
                <Icon name="arrow-up-right" size="sm" aria-hidden />
              </Link>
              <Link
                href={WORK_LANDING.secondaryCta.href}
                className="work-hero__btn work-hero__btn--outline"
              >
                {WORK_LANDING.secondaryCta.label}
                <Icon name="arrow-up-right" size="sm" aria-hidden />
              </Link>
            </div>

            {!isMobile ? (
              <div className="work-hero-stack">
                <ul className="work-hero-stack__list" aria-label="Technology stack">
                  {HERO_TECH_STACK.map((item) => (
                    <li key={item.id}>
                      <span className="work-hero-stack__pill">
                        <Icon
                          name={item.icon}
                          size="sm"
                          aria-hidden
                          className="work-hero-stack__pill-icon"
                        />
                        {item.label}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>
            ) : null}
          </div>

          {!isMobile ? (
            <div className="work-hero__visual">
              <WorkHeroVisual />
            </div>
          ) : null}
        </div>

        {!isMobile ? (
          <dl className="work-hero-stats" aria-label="Company highlights">
            {HERO_STATS.map((stat) => (
              <div key={stat.id} className="work-hero-stats__item">
                <div className="work-hero-stats__head">
                  <span
                    className={`work-hero-stats__icon work-hero-stats__icon--${stat.tone}`}
                    aria-hidden
                  >
                    <Icon name={stat.icon} size="sm" />
                  </span>
                  <dt className="work-hero-stats__value">
                    <AnimatedStat value={stat.value} />
                  </dt>
                </div>
                <dd className="work-hero-stats__label">{stat.label}</dd>
              </div>
            ))}
          </dl>
        ) : null}
      </Container>
    </Section>
  );
}
