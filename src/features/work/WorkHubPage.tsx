import Link from 'next/link';
import { PageShell } from '@/components/patterns/marketing-layout';
import { MarketingSectionIntro } from '@/components/patterns/marketing-section-intro';
import { Icon } from '@/components/ui/icon';
import { Section } from '@/components/ui/section';
import { NAV_ACTIONS, ROUTES } from '@/constants/navigation';
import { buildWorkBreadcrumbs } from '@/lib/seo/breadcrumbs';
import { WorkInternalHero } from './WorkInternalHero';
import { WorkPageCta } from './WorkPageCta';
import { WorkProjectCard } from './WorkProjectCard';
import { WORK_HUBS, WORK_LANDING, WORK_PROJECTS } from './work.content';
import { filterWorkProjects } from './work.filters';
import type { WorkHubContent, WorkProject } from './work.types';
import './work.css';

interface WorkHubPageProps {
  hub: WorkHubContent;
}

function getRelatedHubs(slug: string): readonly WorkHubContent[] {
  return WORK_HUBS.filter((item) => item.slug !== slug).slice(0, 3);
}

/**
 * Work hub — Work landing design language (hero shell + portfolio grid).
 */
export function WorkHubPage({ hub }: WorkHubPageProps) {
  const breadcrumbs = buildWorkBreadcrumbs([{ label: hub.title }]);
  const projects = filterWorkProjects(WORK_PROJECTS, hub.filterPreset);
  const relatedHubs = getRelatedHubs(hub.slug);
  const headingId = `work-hub-${hub.slug}-heading`;

  return (
    <PageShell className="work-page work-detail-page">
      <WorkInternalHero
        breadcrumbs={breadcrumbs}
        headingId={headingId}
        eyebrow="Work hub"
        eyebrowIcon="layout-grid"
        title={hub.title}
        description={hub.description}
        primaryCta={{
          label: WORK_LANDING.primaryCta.label,
          href: WORK_LANDING.primaryCta.href,
        }}
        secondaryCta={{
          label: 'Browse all work',
          href: ROUTES.work,
        }}
        chips={[hub.filterPreset === 'all' ? 'All projects' : hub.title]}
      />

      <Section
        spacing="lg"
        aria-labelledby={`${hub.slug}-projects-heading`}
        className="border-b border-border/40 bg-background"
      >
        <MarketingSectionIntro
          eyebrow="Portfolio"
          headingId={`${hub.slug}-projects-heading`}
          title={projects.length > 0 ? 'Selected work in this collection' : 'Projects coming soon'}
          description={
            projects.length > 0
              ? `Live and showcase projects filtered for ${hub.title.toLowerCase()}.`
              : 'This hub is ready — project cards will appear as we publish matching work.'
          }
        />

        {projects.length > 0 ? (
          <ul className="work-detail-grid">
            {projects.map((project) => (
              <li key={project.slug} className="min-w-0">
                <WorkProjectCard project={project} />
              </li>
            ))}
          </ul>
        ) : (
          <p className="work-detail-empty">
            No projects match this hub yet.{' '}
            <Link href={NAV_ACTIONS.freeConsultation.href}>Book a consultation</Link> to discuss a
            similar build.
          </p>
        )}
      </Section>

      {relatedHubs.length > 0 ? (
        <Section
          spacing="lg"
          background="surface"
          aria-labelledby={`${hub.slug}-related-heading`}
          className="border-b border-border/40"
        >
          <div className="work-detail-related__head">
            <MarketingSectionIntro
              headingId={`${hub.slug}-related-heading`}
              title="Related collections"
              description="Explore adjacent Work hubs with a different lens on delivery."
            />
            <Link href={ROUTES.work} className="work-detail-related__all">
              All work
              <Icon name="arrow-right" size="sm" aria-hidden />
            </Link>
          </div>

          <ul className="work-detail-hubs">
            {relatedHubs.map((item) => (
              <li key={item.slug}>
                <Link href={`${ROUTES.work}/${item.slug}`} className="work-detail-hub-card">
                  <span className="work-detail-hub-card__eyebrow">Hub</span>
                  <span className="work-detail-hub-card__title">{item.title}</span>
                  <span className="work-detail-hub-card__desc">{item.description}</span>
                  <span className="work-detail-hub-card__cta">
                    View collection
                    <Icon name="arrow-right" size="sm" aria-hidden />
                  </span>
                </Link>
              </li>
            ))}
          </ul>
        </Section>
      ) : null}

      <WorkPageCta />
    </PageShell>
  );
}

/** Fallback hub shell when only nav label/description is available. */
export function WorkHubFallbackPage({
  title,
  description,
}: {
  title: string;
  description: string;
}) {
  const syntheticHub: WorkHubContent = {
    slug: 'collection',
    title,
    description,
    filterPreset: 'all',
    seoTitle: `${title} | Work`,
    seoDescription: description,
  };

  return <WorkHubPage hub={syntheticHub} />;
}

export function getHubProjects(hub: WorkHubContent): readonly WorkProject[] {
  return filterWorkProjects(WORK_PROJECTS, hub.filterPreset);
}
