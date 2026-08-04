import Image from 'next/image';
import Link from 'next/link';
import type { CSSProperties } from 'react';
import { MarketingStagger } from '@/components/patterns/marketing-stagger';
import { Icon } from '@/components/ui/icon';
import { IconBox } from '@/components/ui/icon-box';
import { Section } from '@/components/ui/section';
import { getIndustryHref } from '@/constants/industries';
import { getSolutionHref, NAV_ACTIONS, ROUTES } from '@/constants/navigation';
import { SOLUTION_GROUPS } from '@/constants/solutions';
import { PortfolioCard } from '@/features/homepage/Portfolio/PortfolioCard';
import { PORTFOLIO_PROJECTS } from '@/features/homepage/Portfolio/portfolio.constants';
import '@/features/homepage/Portfolio/portfolio.css';
import { ServiceCard } from '@/features/services/ServiceCard';
import { FaqAccordion } from '@/components/patterns/faq-accordion';
import { PAGE_GRID_CLASS, PAGE_GRID_4_CLASS } from '@/lib/layout/page-shell';
import { cn } from '@/lib/cn';
import { SOLUTIONS_LANDING, getSolutionCardModels } from './solutions.content';
import type { SolutionCardModel } from './solutions.types';
import '@/features/homepage/Hero/hero.css';
import '@/features/services/services.css';
import './solutions.css';

export function SolutionsCategoriesSection() {
  const cardsBySlug = new Map(getSolutionCardModels().map((card) => [card.slug, card]));

  return (
    <Section
      spacing="lg"
      aria-labelledby="solutions-categories-heading"
      className="border-b border-border/40"
    >
      <div className="services-section-intro section-intro-row max-w-2xl">
        <p className="services-page-label services-section-intro__eyebrow font-sans text-[12px] font-semibold uppercase tracking-[0.16em]">
          Solution categories
        </p>
        <h2
          id="solutions-categories-heading"
          className="services-page-section-heading services-section-intro__heading"
        >
          What we build for growing teams
        </h2>
        <p className="services-section-intro__description font-sans text-[14px] leading-[1.65] text-muted-foreground sm:text-[15px]">
          Premium solution lines spanning operations, customer systems, and AI — each delivered as a
          custom build with clear outcomes.
        </p>
      </div>

      <MarketingStagger
        as="ul"
        className={cn('m-0 list-none p-0', PAGE_GRID_CLASS, 'lg:grid-cols-4')}
      >
        {SOLUTIONS_LANDING.categories.map((category, index) => {
          const card = cardsBySlug.get(category.slug);
          return (
            <li
              key={category.slug}
              className="mkt-stagger__item min-w-0 h-full"
              style={{ '--stagger': Math.min(index, 5) } as CSSProperties}
            >
              <ServiceCard
                service={{
                  title: category.title,
                  description: category.description,
                  href: getSolutionHref(category.slug),
                  icon: category.icon,
                  ctaLabel: `Explore ${category.title}`,
                  badge: card?.badge,
                }}
              />
            </li>
          );
        })}
      </MarketingStagger>
    </Section>
  );
}

export function SolutionsFeaturedSection() {
  const badgeBySlug = new Map(getSolutionCardModels().map((card) => [card.slug, card.badge]));

  return (
    <Section
      spacing="lg"
      background="surface"
      aria-labelledby="solutions-featured-heading"
      className="border-b border-border/40"
    >
      <div className="services-section-intro section-intro-row max-w-2xl">
        <p className="services-page-label services-section-intro__eyebrow font-sans text-[12px] font-semibold uppercase tracking-[0.16em]">
          Featured solutions
        </p>
        <h2
          id="solutions-featured-heading"
          className="services-page-section-heading services-section-intro__heading"
        >
          Showcase builds teams ask for most
        </h2>
        <p className="services-section-intro__description font-sans text-[14px] leading-[1.65] text-muted-foreground sm:text-[15px]">
          High-demand CRM, SaaS, and AI automation patterns — features, benefits, and a clear next
          step on each card.
        </p>
      </div>

      <MarketingStagger
        as="ul"
        className="m-0 grid list-none gap-[24px] p-0 grid-cols-1 lg:grid-cols-3"
      >
        {SOLUTIONS_LANDING.featured.map((item, index) => {
          const badge = badgeBySlug.get(item.slug);
          return (
            <li
              key={item.slug}
              className="mkt-stagger__item min-w-0 h-full"
              style={{ '--stagger': Math.min(index, 5) } as CSSProperties}
            >
              <article
                className={cn(
                  'services-page-card services-featured-block group flex h-full flex-col rounded-[16px]',
                  'border border-[color:var(--hp-card-border)] bg-background',
                  item.imageSrc ? 'overflow-hidden p-0' : 'card-padding',
                )}
              >
                <div
                  className={cn(
                    'solutions-featured-media relative flex items-center justify-center overflow-hidden',
                    item.imageSrc
                      ? 'solutions-featured-media--bleed w-full shrink-0 rounded-none'
                      : 'mb-[18px] min-h-[140px] rounded-[12px]',
                  )}
                  aria-hidden
                >
                  {'imageSrc' in item && item.imageSrc ? (
                    <Image
                      src={item.imageSrc}
                      alt=""
                      width={1536}
                      height={1024}
                      sizes="(max-width: 1024px) 100vw, 33vw"
                      className="h-auto w-full object-contain object-top"
                    />
                  ) : (
                    <span className="font-sans text-[28px] font-extrabold tracking-[-0.04em] text-primary/80">
                      {item.imageLabel}
                    </span>
                  )}
                </div>

                <div
                  className={cn('flex min-h-0 flex-1 flex-col', item.imageSrc && 'card-padding')}
                >
                  <div className="flex flex-wrap items-center gap-[8px]">
                    <h3 className="services-page-card-title">{item.title}</h3>
                    {badge ? (
                      <span
                        className={cn(
                          'services-page-badge',
                          `services-page-badge--${badge.toLowerCase()}`,
                        )}
                      >
                        {badge}
                      </span>
                    ) : null}
                  </div>
                  <p className="mt-[10px] mb-0 flex-1 font-sans text-[14px] leading-[1.55] text-muted-foreground">
                    {item.description}
                  </p>

                  <div className="mt-[16px] grid gap-[14px] sm:grid-cols-2">
                    <div>
                      <p className="m-0 font-sans text-[11px] font-semibold uppercase tracking-[0.12em] text-muted-foreground">
                        Features
                      </p>
                      <ul className="m-0 mt-[8px] flex list-none flex-col gap-[6px] p-0">
                        {item.features.map((feature) => (
                          <li
                            key={feature}
                            className="flex items-start gap-[8px] font-sans text-[13px] text-foreground"
                          >
                            <span className="services-page-check !h-[20px] !w-[20px] !rounded-[6px]">
                              <Icon
                                name="check"
                                size="sm"
                                aria-hidden
                                className="h-[11px] w-[11px]"
                              />
                            </span>
                            {feature}
                          </li>
                        ))}
                      </ul>
                    </div>
                    <div>
                      <p className="m-0 font-sans text-[11px] font-semibold uppercase tracking-[0.12em] text-muted-foreground">
                        Benefits
                      </p>
                      <ul className="m-0 mt-[8px] flex list-none flex-col gap-[6px] p-0">
                        {item.benefits.map((benefit) => (
                          <li
                            key={benefit}
                            className="flex items-start gap-[8px] font-sans text-[13px] text-foreground"
                          >
                            <span className="services-page-check !h-[20px] !w-[20px] !rounded-[6px]">
                              <Icon
                                name="check"
                                size="sm"
                                aria-hidden
                                className="h-[11px] w-[11px]"
                              />
                            </span>
                            {benefit}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>

                  <Link
                    href={getSolutionHref(item.slug)}
                    className={cn(
                      'services-featured-cta mt-[20px]',
                      'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-background',
                    )}
                  >
                    {item.ctaLabel}
                    <Icon
                      name="arrow-right"
                      size="sm"
                      aria-hidden
                      className="services-page-card-cta-icon h-[14px] w-[14px]"
                    />
                  </Link>
                </div>
              </article>
            </li>
          );
        })}
      </MarketingStagger>
    </Section>
  );
}

export function SolutionsGroupsSection({ cards }: { cards: readonly SolutionCardModel[] }) {
  const cardBySlug = new Map(cards.map((card) => [card.slug, card]));
  const introById = new Map(SOLUTIONS_LANDING.groupIntros.map((intro) => [intro.id, intro]));

  return (
    <>
      {SOLUTION_GROUPS.map((group, groupIndex) => {
        const intro = introById.get(group.id);

        return (
          <Section
            key={group.id}
            id={group.id}
            spacing="lg"
            aria-labelledby={`${group.id}-heading`}
            className={cn(
              'scroll-mt-[130px] border-b border-border/40',
              groupIndex % 2 === 1 ? 'bg-surface' : 'bg-background',
            )}
          >
            <div className="section-intro-row flex w-full flex-wrap items-end justify-between gap-[16px]">
              <div className="services-section-intro min-w-0 max-w-2xl">
                <p className="services-page-label services-section-intro__eyebrow font-sans text-[12px] font-semibold uppercase tracking-[0.16em]">
                  {intro?.label ?? 'Solution group'}
                </p>
                <h2
                  id={`${group.id}-heading`}
                  className="services-page-section-heading services-section-intro__heading"
                >
                  {intro?.title ?? group.title}
                </h2>
                {intro?.description ? (
                  <p className="services-section-intro__description font-sans text-[14px] leading-[1.65] text-muted-foreground sm:text-[15px]">
                    {intro.description}
                  </p>
                ) : null}
              </div>
              <Link
                href={NAV_ACTIONS.bookCall.href}
                className="inline-flex items-center gap-[4px] font-sans text-[13px] font-semibold text-primary no-underline transition-opacity duration-200 hover:opacity-80 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-background focus-visible:ring-offset-background"
              >
                Book a call
                <Icon name="arrow-right" size="sm" aria-hidden className="h-[13px] w-[13px]" />
              </Link>
            </div>

            <MarketingStagger as="ul" className={cn('m-0 list-none p-0', PAGE_GRID_CLASS)}>
              {group.items.map((item, index) => {
                const card = cardBySlug.get(item.slug) ?? {
                  slug: item.slug,
                  title: item.label,
                  description: item.description,
                  href: getSolutionHref(item.slug),
                  icon: item.icon,
                  ctaLabel: `Explore ${item.label}`,
                };

                return (
                  <li
                    key={item.slug}
                    className="mkt-stagger__item min-w-0 h-full"
                    style={{ '--stagger': Math.min(index, 5) } as CSSProperties}
                  >
                    <ServiceCard service={card} />
                  </li>
                );
              })}
            </MarketingStagger>
          </Section>
        );
      })}
    </>
  );
}

export function SolutionsIndustriesSection() {
  return (
    <Section
      spacing="lg"
      aria-labelledby="solutions-industries-heading"
      className="border-b border-border/40 bg-background"
    >
      <div className="section-intro-row flex flex-wrap items-end justify-between gap-[16px]">
        <div className="services-section-intro max-w-2xl">
          <p className="services-page-label services-section-intro__eyebrow font-sans text-[12px] font-semibold uppercase tracking-[0.16em]">
            Industries served
          </p>
          <h2
            id="solutions-industries-heading"
            className="services-page-section-heading services-section-intro__heading"
          >
            Built for real operating contexts
          </h2>
          <p className="services-section-intro__description font-sans text-[14px] leading-[1.65] text-muted-foreground sm:text-[15px]">
            Healthcare, retail, finance, and more — solutions shaped around how each industry
            actually runs.
          </p>
        </div>
        <Link
          href={ROUTES.industries}
          className="inline-flex items-center gap-[4px] font-sans text-[13px] font-semibold text-primary no-underline transition-opacity duration-200 hover:opacity-80 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-background"
        >
          View all industries
          <Icon name="arrow-right" size="sm" aria-hidden className="h-[13px] w-[13px]" />
        </Link>
      </div>

      <ul className={cn('m-0 list-none p-0', PAGE_GRID_4_CLASS)}>
        {SOLUTIONS_LANDING.industries.map((industry) => (
          <li key={industry.slug} className="min-w-0 h-full">
            <Link
              href={getIndustryHref(industry.slug)}
              className={cn(
                'services-page-card group flex h-full items-center gap-[12px]',
                'rounded-[16px] card-padding no-underline',
                'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-background focus-visible:ring-offset-background',
              )}
            >
              <span className="services-page-icon-box inline-flex shrink-0">
                <IconBox icon={industry.icon} variant="default" size="sm" />
              </span>
              <h3 className="services-page-card-title min-w-0 flex-1">{industry.label}</h3>
              <Icon
                name="arrow-right"
                size="sm"
                aria-hidden
                className="services-page-card-cta-icon h-[13px] w-[13px] text-primary"
              />
            </Link>
          </li>
        ))}
      </ul>
    </Section>
  );
}

export function SolutionsTechSection() {
  return (
    <Section
      spacing="lg"
      background="surface"
      aria-labelledby="solutions-tech-heading"
      className="border-b border-border/40"
    >
      <div className="services-section-intro section-intro-row max-w-2xl">
        <p className="services-page-label services-section-intro__eyebrow font-sans text-[12px] font-semibold uppercase tracking-[0.16em]">
          Technology stack
        </p>
        <h2
          id="solutions-tech-heading"
          className="services-page-section-heading services-section-intro__heading"
        >
          Modern stack for durable systems
        </h2>
        <p className="services-section-intro__description font-sans text-[14px] leading-[1.65] text-muted-foreground sm:text-[15px]">
          Proven frameworks and cloud tooling chosen for maintainability, performance, and long-term
          ownership.
        </p>
      </div>

      <ul className="m-0 flex list-none flex-wrap gap-[10px] p-0">
        {SOLUTIONS_LANDING.technologies.map((tech) => (
          <li key={tech}>
            <span className="services-page-chip motion-safe:transition-[border-color,box-shadow,transform] motion-safe:duration-200 motion-safe:hover:-translate-y-px hover:border-primary/35">
              {tech}
            </span>
          </li>
        ))}
      </ul>
    </Section>
  );
}

export function SolutionsCaseStudiesSection() {
  const projects = PORTFOLIO_PROJECTS.slice(0, 3);

  return (
    <Section
      spacing="lg"
      aria-labelledby="solutions-cases-heading"
      className="border-b border-border/40 bg-background"
    >
      <div className="section-intro-row flex flex-wrap items-end justify-between gap-[16px]">
        <div className="services-section-intro max-w-2xl">
          <p className="services-page-label services-section-intro__eyebrow font-sans text-[12px] font-semibold uppercase tracking-[0.16em]">
            Case studies preview
          </p>
          <h2
            id="solutions-cases-heading"
            className="services-page-section-heading services-section-intro__heading"
          >
            Featured work that shows the craft
          </h2>
          <p className="services-section-intro__description font-sans text-[14px] leading-[1.65] text-muted-foreground sm:text-[15px]">
            Selected builds that demonstrate how we ship CRM, SaaS, and AI systems with measurable
            outcomes.
          </p>
        </div>
        <Link
          href={ROUTES.workPortfolio}
          className="inline-flex items-center gap-[4px] font-sans text-[13px] font-semibold text-primary no-underline transition-opacity duration-200 hover:opacity-80 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-background"
        >
          View portfolio
          <Icon name="arrow-right" size="sm" aria-hidden className="h-[13px] w-[13px]" />
        </Link>
      </div>

      <MarketingStagger as="ul" className={cn('m-0 list-none p-0', PAGE_GRID_CLASS)}>
        {projects.map((project, index) => (
          <li
            key={project.id}
            className="mkt-stagger__item min-w-0"
            style={{ '--stagger': Math.min(index, 5) } as CSSProperties}
          >
            <PortfolioCard project={project} />
          </li>
        ))}
      </MarketingStagger>
    </Section>
  );
}

export function SolutionsWhySection() {
  return (
    <Section
      spacing="lg"
      background="surface"
      aria-labelledby="solutions-why-heading"
      className="border-b border-border/40"
    >
      <div className="services-section-intro section-intro-row max-w-2xl">
        <p className="services-page-label services-section-intro__eyebrow font-sans text-[12px] font-semibold uppercase tracking-[0.16em]">
          Why choose Bitcraftly
        </p>
        <h2
          id="solutions-why-heading"
          className="services-page-section-heading services-section-intro__heading"
        >
          Built for outcomes, not jargon
        </h2>
        <p className="services-section-intro__description font-sans text-[14px] leading-[1.65] text-muted-foreground sm:text-[15px]">
          Performance, security, and maintainability are baked into delivery — so your team can run
          and extend what we ship.
        </p>
      </div>

      <ul className={cn('m-0 list-none p-0', PAGE_GRID_CLASS)}>
        {SOLUTIONS_LANDING.why.map((item) => (
          <li key={item.title} className="min-w-0 h-full">
            <div className="services-page-card group flex h-full flex-col gap-[12px] rounded-[16px] card-padding">
              <div className="services-page-card-header flex items-center gap-[12px]">
                <span className="services-page-icon-box inline-flex shrink-0">
                  <IconBox icon={item.icon} variant="default" size="sm" />
                </span>
                <h3 className="services-page-card-title">{item.title}</h3>
              </div>
              <p className="mb-0 font-sans text-[14px] leading-[1.55] text-muted-foreground">
                {item.description}
              </p>
            </div>
          </li>
        ))}
      </ul>
    </Section>
  );
}

export function SolutionsProcessSection() {
  return (
    <Section
      spacing="lg"
      aria-labelledby="solutions-process-heading"
      className="border-b border-border/40 bg-background"
    >
      <div className="services-section-intro section-intro-row max-w-2xl">
        <p className="services-page-label services-section-intro__eyebrow font-sans text-[12px] font-semibold uppercase tracking-[0.16em]">
          Development process
        </p>
        <h2
          id="solutions-process-heading"
          className="services-page-section-heading services-section-intro__heading"
        >
          A clear path from idea to support
        </h2>
        <p className="services-section-intro__description font-sans text-[14px] leading-[1.65] text-muted-foreground sm:text-[15px]">
          Discovery through launch and ongoing support — visible progress, written scope, and no
          black-box sprints.
        </p>
      </div>

      <MarketingStagger as="ol" className="solutions-process m-0 grid list-none p-0">
        {SOLUTIONS_LANDING.process.map((step, index) => {
          const number = String(index + 1).padStart(2, '0');
          return (
            <li
              key={step.title}
              className="mkt-stagger__item solutions-process__item"
              style={{ '--stagger': Math.min(index, 5) } as CSSProperties}
            >
              <article className="solutions-process__card">
                <div className="solutions-process__top">
                  <span className="solutions-process__number" aria-hidden>
                    {number}
                  </span>
                  <span className="solutions-process__icon" aria-hidden>
                    {step.icon ? (
                      <Icon name={step.icon} size="sm" className="h-[18px] w-[18px]" />
                    ) : null}
                  </span>
                </div>
                <h3 className="solutions-process__title">{step.title}</h3>
                <p className="solutions-process__desc">{step.description}</p>
              </article>
            </li>
          );
        })}
      </MarketingStagger>
    </Section>
  );
}

export function SolutionsFaqSection() {
  return (
    <Section
      spacing="lg"
      background="surface"
      aria-labelledby="solutions-faq-heading"
      className="services-faq-section border-b border-border/40"
    >
      <div className="services-section-intro section-intro-row max-w-2xl">
        <p className="services-page-label services-section-intro__eyebrow font-sans text-[12px] font-semibold uppercase tracking-[0.16em]">
          FAQ
        </p>
        <h2
          id="solutions-faq-heading"
          className="services-page-section-heading services-section-intro__heading"
        >
          Frequently asked questions
        </h2>
        <p className="services-section-intro__description font-sans text-[14px] leading-[1.65] text-muted-foreground sm:text-[15px]">
          Timelines, ownership, engagement model, and what to expect when we scope a solution
          together.
        </p>
      </div>
      <FaqAccordion items={[...SOLUTIONS_LANDING.faqs]} />
    </Section>
  );
}

export function SolutionsHubsSection() {
  return (
    <Section
      spacing="lg"
      aria-labelledby="solutions-hubs-heading"
      className="border-b border-border/40 bg-background"
    >
      <div className="services-section-intro section-intro-row max-w-2xl">
        <p className="services-page-label services-section-intro__eyebrow font-sans text-[12px] font-semibold uppercase tracking-[0.16em]">
          Explore more
        </p>
        <h2
          id="solutions-hubs-heading"
          className="services-page-section-heading services-section-intro__heading"
        >
          Related hubs
        </h2>
        <p className="services-section-intro__description font-sans text-[14px] leading-[1.65] text-muted-foreground sm:text-[15px]">
          Jump into services, industries, case studies, and resources that connect to these
          solutions.
        </p>
      </div>

      <MarketingStagger
        as="ul"
        className={cn(
          'm-0 grid w-full list-none gap-[24px] p-0',
          'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3',
        )}
      >
        {SOLUTIONS_LANDING.hubs.map((hub, index) => (
          <li
            key={hub.href}
            className="mkt-stagger__item min-w-0 h-full"
            style={{ '--stagger': Math.min(index, 5) } as CSSProperties}
          >
            <Link
              href={hub.href}
              className={cn(
                'services-hub-card group flex h-full flex-col gap-[12px]',
                'rounded-[16px] card-padding no-underline',
                'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-background focus-visible:ring-offset-background',
              )}
            >
              <div className="services-page-card-header flex items-center gap-[12px]">
                <span className="services-page-icon-box inline-flex shrink-0">
                  <IconBox icon={hub.icon} variant="default" size="sm" />
                </span>
                <h3 className="services-page-card-title">{hub.title}</h3>
              </div>
              <p className="mb-0 flex-1 font-sans text-[13px] leading-[1.55] text-muted-foreground sm:text-[14px]">
                {hub.description}
              </p>
              <span className="inline-flex items-center gap-[5px] font-sans text-[13px] font-semibold text-primary sm:text-[14px]">
                Explore
                <Icon
                  name="arrow-right"
                  size="sm"
                  aria-hidden
                  className="services-page-card-cta-icon h-[13px] w-[13px]"
                />
              </span>
            </Link>
          </li>
        ))}
      </MarketingStagger>
    </Section>
  );
}
