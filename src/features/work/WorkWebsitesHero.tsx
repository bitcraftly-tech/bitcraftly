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
import type { WorkProject } from './work.types';
import './work.css';

const WEBSITES_CHIPS = [
  'Conversion UX',
  'SEO-ready',
  'Mobile-first',
  'Next.js',
  'Fast Core Web Vitals',
] as const;

const WEBSITES_STATS = [
  { id: 'sites', value: '80+', label: 'Sites shipped' },
  { id: 'speed', value: '<2s', label: 'Target LCP' },
  { id: 'mobile', value: '70%+', label: 'Traffic on mobile' },
  { id: 'leads', value: '3×', label: 'Enquiry lift focus' },
] as const;

interface WorkWebsitesHeroProps {
  breadcrumbs: readonly BreadcrumbItem[];
  headingId: string;
  description: string;
}

function WebsitePreviewCard({ project, className }: { project: WorkProject; className?: string }) {
  return (
    <article className={cn('work-websites-hero__card', className)}>
      <div className="work-websites-hero__card-bar" aria-hidden>
        <span className="work-websites-hero__card-dots">
          <i />
          <i />
          <i />
        </span>
        <span className="work-websites-hero__card-host">
          {project.previewHost ?? 'bitcraftly.com'}
        </span>
      </div>
      <div className="work-websites-hero__card-frame">
        <Image
          src={project.coverImage}
          alt={project.coverImageAlt ?? `${project.title} website screenshot`}
          fill
          priority
          sizes="(max-width: 1024px) 90vw, 42vw"
          className="object-cover object-top"
        />
      </div>
      <div className="work-websites-hero__card-meta">
        <p className="work-websites-hero__card-title">{project.title}</p>
        {project.badge ? (
          <span className="work-websites-hero__card-badge">{project.badge}</span>
        ) : null}
      </div>
    </article>
  );
}

/**
 * Websites hub hero — conversion-focused redesign with live site previews.
 */
export async function WorkWebsitesHero({
  breadcrumbs,
  headingId,
  description,
}: WorkWebsitesHeroProps) {
  const isMobile = await isMobileUserAgent();
  const websiteProjects = filterWorkProjects(WORK_PROJECTS, 'websites').slice(0, 3);
  const [primary, secondary, tertiary] = websiteProjects;

  return (
    <Section
      spacing="none"
      contained={false}
      aria-labelledby={headingId}
      className={cn(
        'work-hero work-websites-hero relative overflow-hidden hero-surface',
        'border-b border-border/60',
        isMobile && 'marketing-hero--compact',
      )}
    >
      {!isMobile ? (
        <>
          <div
            className="pointer-events-none absolute inset-0 opacity-50 hero-dot-grid"
            aria-hidden
          />
          <div
            className="pointer-events-none absolute inset-0 opacity-20 hero-line-grid"
            aria-hidden
          />
          <div
            className="pointer-events-none absolute -top-[var(--space-16)] -right-[10%] size-[620px] rounded-full blur-3xl hero-aurora-accent"
            aria-hidden
          />
          <div
            className="pointer-events-none absolute -bottom-[var(--space-10)] -left-[12%] size-[520px] rounded-full blur-3xl hero-aurora-primary"
            aria-hidden
          />
        </>
      ) : null}

      <Container size="xl" className="work-hero__container work-websites-hero__container">
        <div className="work-hero__breadcrumb">
          <MarketingBreadcrumbs items={breadcrumbs} className="mb-0" />
        </div>

        <div className="work-websites-hero__grid">
          <div className="work-websites-hero__content">
            <p className="work-hero__eyebrow">
              <Icon name="globe" size="sm" aria-hidden className="work-hero__eyebrow-icon" />
              <span>Work · Websites</span>
            </p>

            <h1 id={headingId} className="work-websites-hero__title">
              Marketing <span className="work-hero__title-mark">websites</span> that turn visits
              into enquiries
            </h1>

            <p className="work-websites-hero__description">{description}</p>

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

            <ul className="work-websites-hero__chips" aria-label="Website delivery strengths">
              {WEBSITES_CHIPS.map((chip) => (
                <li key={chip}>
                  <span className="work-websites-hero__chip">{chip}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="work-websites-hero__visual" aria-label="Website project previews">
            {primary ? (
              <div className="work-websites-hero__stage">
                <WebsitePreviewCard
                  project={primary}
                  className="work-websites-hero__card--primary"
                />
                {!isMobile && secondary ? (
                  <WebsitePreviewCard
                    project={secondary}
                    className="work-websites-hero__card--secondary"
                  />
                ) : null}
                {!isMobile && tertiary ? (
                  <WebsitePreviewCard
                    project={tertiary}
                    className="work-websites-hero__card--tertiary"
                  />
                ) : null}
              </div>
            ) : null}
          </div>
        </div>

        <dl className="work-websites-hero__stats" aria-label="Website delivery highlights">
          {WEBSITES_STATS.map((stat) => (
            <div key={stat.id} className="work-websites-hero__stat">
              <dt className="work-websites-hero__stat-value">{stat.value}</dt>
              <dd className="work-websites-hero__stat-label">{stat.label}</dd>
            </div>
          ))}
        </dl>
      </Container>
    </Section>
  );
}
