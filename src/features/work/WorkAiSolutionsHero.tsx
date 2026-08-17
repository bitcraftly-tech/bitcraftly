import Image from 'next/image';
import Link from 'next/link';
import { MarketingBreadcrumbs } from '@/components/patterns/marketing-breadcrumbs';
import { Container } from '@/components/ui/container';
import { Icon } from '@/components/ui/icon';
import { Section } from '@/components/ui/section';
import { NAV_ACTIONS, ROUTES } from '@/constants/navigation';
import { cn } from '@/lib/cn';
import { isMobileUserAgent } from '@/lib/device/is-mobile-user-agent';
import type { BreadcrumbItem } from '@/lib/seo/breadcrumbs';
import '@/features/homepage/Hero/hero.css';
import { filterWorkProjects } from './work.filters';
import { WORK_LANDING, WORK_PROJECTS } from './work.content';
import './work.css';

const AI_CHIPS = ['Assistants', 'Automation', 'Agents', 'RAG / search', 'Human handoff'] as const;

const AI_STATS = [
  { id: 'deflect', value: '65%', label: 'FAQ deflection focus' },
  { id: 'handoff', value: 'Human', label: 'High-intent handoff' },
  { id: 'pilot', value: '4–8 wks', label: 'Typical pilot' },
  { id: 'ops', value: 'Ops-ready', label: 'Guardrails + logs' },
] as const;

const AI_CAPABILITIES = [
  {
    id: 'assist',
    title: 'Customer assistants',
    detail: 'Answer FAQs, qualify intent, escalate cleanly.',
  },
  {
    id: 'automate',
    title: 'Ops automation',
    detail: 'Cut repeat workflows without brittle scripts.',
  },
  {
    id: 'copilot',
    title: 'Product copilots',
    detail: 'Embed AI where teams already work.',
  },
] as const;

interface WorkAiSolutionsHeroProps {
  breadcrumbs: readonly BreadcrumbItem[];
  headingId: string;
  description: string;
}

/**
 * AI Solutions hub hero — capability-led redesign with live AI project preview.
 */
export async function WorkAiSolutionsHero({
  breadcrumbs,
  headingId,
  description,
}: WorkAiSolutionsHeroProps) {
  const isMobile = await isMobileUserAgent();
  const aiProjects = filterWorkProjects(WORK_PROJECTS, 'ai');
  const featured = aiProjects[0];

  return (
    <Section
      spacing="none"
      contained={false}
      aria-labelledby={headingId}
      className={cn(
        'lux-hero work-hero work-ai-hero relative overflow-hidden hero-surface',
        'border-b border-border/60',
        isMobile && 'marketing-hero--compact',
      )}
    >
      {!isMobile ? (
        <>
          <div
            className="pointer-events-none absolute inset-0 opacity-45 hero-dot-grid"
            aria-hidden
          />
          <div
            className="pointer-events-none absolute inset-0 opacity-18 hero-line-grid"
            aria-hidden
          />
          <div
            className="pointer-events-none absolute -top-[var(--space-16)] -right-[8%] size-[560px] rounded-full blur-3xl hero-aurora-primary"
            aria-hidden
          />
          <div
            className="pointer-events-none absolute -bottom-[var(--space-12)] -left-[10%] size-[480px] rounded-full blur-3xl hero-aurora-accent"
            aria-hidden
          />
        </>
      ) : null}

      <Container size="xl" className="work-hero__container work-ai-hero__container">
        <div className="work-hero__breadcrumb">
          <MarketingBreadcrumbs items={breadcrumbs} className="mb-0" />
        </div>

        <div className="work-ai-hero__grid">
          <div className="work-ai-hero__content">
            <p className="work-hero__eyebrow">
              <Icon name="brain" size="sm" aria-hidden className="work-hero__eyebrow-icon" />
              <span>Work · AI Solutions</span>
            </p>

            <h1 id={headingId} className="work-ai-hero__title">
              Ship <span className="work-hero__title-mark">AI</span> that operators trust — not
              demos that stall
            </h1>

            <p className="work-ai-hero__description">{description}</p>

            <div className="work-hero__cta-row">
              <Link
                href={NAV_ACTIONS.freeConsultation.href}
                className="work-hero__btn work-hero__btn--primary"
              >
                {WORK_LANDING.primaryCta.label}
                <Icon name="arrow-up-right" size="sm" aria-hidden />
              </Link>
              <Link href={ROUTES.work} className="work-hero__btn work-hero__btn--outline">
                Browse all work
                <Icon name="arrow-up-right" size="sm" aria-hidden />
              </Link>
            </div>

            <ul className="work-ai-hero__chips" aria-label="AI delivery strengths">
              {AI_CHIPS.map((chip) => (
                <li key={chip}>
                  <span className="work-ai-hero__chip">{chip}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="work-ai-hero__visual" aria-label="AI solution preview">
            <div className="work-ai-hero__stage">
              {featured ? (
                <article className="work-ai-hero__preview">
                  <div className="work-ai-hero__preview-bar" aria-hidden>
                    <span className="work-ai-hero__preview-dots">
                      <i />
                      <i />
                      <i />
                    </span>
                    <span className="work-ai-hero__preview-host">
                      {featured.previewHost ?? 'ai.showcase'}
                    </span>
                    <span className="work-ai-hero__live">Live demo</span>
                  </div>
                  <div className="work-ai-hero__preview-frame">
                    <Image
                      src={featured.coverImage}
                      alt={featured.coverImageAlt ?? `${featured.title} AI showcase`}
                      fill
                      priority
                      sizes="(max-width: 1024px) 100vw, 48vw"
                      className="object-cover object-top"
                    />
                  </div>
                  <div className="work-ai-hero__preview-meta">
                    <div>
                      <p className="work-ai-hero__preview-title">{featured.title}</p>
                      <p className="work-ai-hero__preview-summary">{featured.summary}</p>
                    </div>
                    {featured.badge ? (
                      <span className="work-ai-hero__preview-badge">{featured.badge}</span>
                    ) : null}
                  </div>
                </article>
              ) : null}

              {!isMobile ? (
                <ul className="work-ai-hero__caps" aria-label="AI capability highlights">
                  {AI_CAPABILITIES.map((item) => (
                    <li key={item.id} className="work-ai-hero__cap">
                      <span className="work-ai-hero__cap-icon" aria-hidden>
                        <Icon name="sparkles" size="sm" />
                      </span>
                      <span>
                        <strong>{item.title}</strong>
                        <span className="work-ai-hero__cap-detail">{item.detail}</span>
                      </span>
                    </li>
                  ))}
                </ul>
              ) : null}
            </div>
          </div>
        </div>

        <dl className="work-ai-hero__stats" aria-label="AI delivery highlights">
          {AI_STATS.map((stat) => (
            <div key={stat.id} className="work-ai-hero__stat">
              <dt className="work-ai-hero__stat-value">{stat.value}</dt>
              <dd className="work-ai-hero__stat-label">{stat.label}</dd>
            </div>
          ))}
        </dl>
      </Container>
    </Section>
  );
}
