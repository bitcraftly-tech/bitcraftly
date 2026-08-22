import Link from 'next/link';
import { JsonLdScript } from '@/components/patterns/json-ld';
import { PageShell } from '@/components/patterns/marketing-layout';
import { MarketingSectionIntro } from '@/components/patterns/marketing-section-intro';
import { Icon } from '@/components/ui/icon';
import { Section } from '@/components/ui/section';
import { NAV_ACTIONS, ROUTES } from '@/constants/navigation';
import { buildWorkBreadcrumbs } from '@/lib/seo/breadcrumbs';
import { WorkInternalHero } from './WorkInternalHero';
import { WorkPageCta } from './WorkPageCta';
import { WorkProjectCard } from './WorkProjectCard';
import { getWorkProjectHref, WORK_LANDING, WORK_PROJECTS } from './work.content';
import type { WorkProject } from './work.types';
import { buildWorkProjectJsonLd } from './work-schema';
import './work.css';

interface WorkProjectDetailPageProps {
  project: WorkProject;
}

function getRelatedProjects(project: WorkProject): readonly WorkProject[] {
  const sameIndustry = WORK_PROJECTS.filter(
    (item) => item.slug !== project.slug && item.industry === project.industry,
  );
  if (sameIndustry.length >= 3) {
    return sameIndustry.slice(0, 3);
  }

  return WORK_PROJECTS.filter((item) => item.slug !== project.slug).slice(0, 3);
}

/**
 * Work project detail — Work landing design language (hero shell + narrative sections).
 */
export function WorkProjectDetailPage({ project }: WorkProjectDetailPageProps) {
  const breadcrumbs = buildWorkBreadcrumbs([{ label: project.title }]);
  const related = getRelatedProjects(project);
  const headingId = `work-project-${project.slug}-heading`;
  const contactHref = `${NAV_ACTIONS.freeConsultation.href}?intent=${encodeURIComponent(`project-${project.slug}`)}&source=work-project`;
  const isInteractiveDemo = project.badge === 'Interactive demo';
  const primaryLive =
    project.liveUrl && project.status !== 'future'
      ? {
          label: isInteractiveDemo ? 'Interactive demo' : 'Live Client',
          href: project.liveUrl,
          external: Boolean(project.liveExternal) || isInteractiveDemo,
        }
      : {
          label: WORK_LANDING.primaryCta.label,
          href: contactHref,
        };

  return (
    <PageShell className={`work-page work-detail-page work-detail-page--${project.accent}`}>
      <JsonLdScript data={buildWorkProjectJsonLd(project)} />
      <WorkInternalHero
        breadcrumbs={breadcrumbs}
        headingId={headingId}
        eyebrow={project.badge ?? project.industry}
        eyebrowIcon="layout-grid"
        title={project.title}
        description={project.summary}
        primaryCta={primaryLive}
        secondaryCta={{
          label: 'Discuss a similar build',
          href: contactHref,
        }}
        chips={[...project.services.slice(0, 3), ...project.techStack.slice(0, 3)]}
        metrics={project.metrics.map((metric) => ({
          id: metric.id,
          value: metric.value,
          label: metric.label,
        }))}
        cover={{
          src: project.coverImage,
          alt: project.coverImageAlt ?? `${project.title} product screenshot`,
          hostname: project.previewHost,
          badge: project.badge,
        }}
      />

      <Section
        spacing="lg"
        aria-labelledby={`${project.slug}-overview-heading`}
        className="border-b border-border/40 bg-background"
      >
        <MarketingSectionIntro
          eyebrow="Overview"
          headingId={`${project.slug}-overview-heading`}
          title="Engagement snapshot"
          description={project.businessGoal}
        />
        <dl className="work-detail-meta">
          <div className="work-detail-meta__item">
            <dt>Industry</dt>
            <dd>{project.industry}</dd>
          </div>
          <div className="work-detail-meta__item">
            <dt>Duration</dt>
            <dd>{project.timeline ?? project.duration}</dd>
          </div>
          {project.year ? (
            <div className="work-detail-meta__item">
              <dt>Year</dt>
              <dd>{project.year}</dd>
            </div>
          ) : null}
          <div className="work-detail-meta__item">
            <dt>Outcome</dt>
            <dd>{project.outcome}</dd>
          </div>
        </dl>
      </Section>

      <Section
        spacing="lg"
        background="surface"
        aria-labelledby={`${project.slug}-problem-heading`}
        className="border-b border-border/40"
      >
        <MarketingSectionIntro
          eyebrow="Challenge"
          headingId={`${project.slug}-problem-heading`}
          title="The problem"
          description={project.problem}
        />
      </Section>

      <Section
        spacing="lg"
        aria-labelledby={`${project.slug}-solution-heading`}
        className="border-b border-border/40 bg-background"
      >
        <MarketingSectionIntro
          eyebrow="Approach"
          headingId={`${project.slug}-solution-heading`}
          title="How we solved it"
          description={project.solution}
        />
        <ul className="work-detail-list">
          <li className="work-detail-list__item">
            <span className="work-detail-list__icon" aria-hidden>
              <Icon name="check" size="sm" />
            </span>
            <span>{project.result}</span>
          </li>
          {project.services.map((service) => (
            <li key={service} className="work-detail-list__item">
              <span className="work-detail-list__icon work-detail-list__icon--accent" aria-hidden>
                <Icon name="zap" size="sm" />
              </span>
              <span>{service}</span>
            </li>
          ))}
        </ul>
      </Section>

      <Section
        spacing="lg"
        background="surface"
        aria-labelledby={`${project.slug}-stack-heading`}
        className="border-b border-border/40"
      >
        <MarketingSectionIntro
          eyebrow="Stack"
          headingId={`${project.slug}-stack-heading`}
          title="Technology used"
          description="Practical stack choices matched to delivery speed, maintainability, and scale."
        />
        <ul className="work-detail-chips" aria-label="Technology tags">
          {project.techStack.map((tag) => (
            <li key={tag}>
              <span className="work-detail-chip">{tag}</span>
            </li>
          ))}
        </ul>
      </Section>

      {related.length > 0 ? (
        <Section
          spacing="lg"
          aria-labelledby={`${project.slug}-related-heading`}
          className="border-b border-border/40 bg-background"
        >
          <div className="work-detail-related__head">
            <MarketingSectionIntro
              headingId={`${project.slug}-related-heading`}
              title="Related projects"
              description="More delivery work with a similar industry or product shape."
            />
            <Link href={ROUTES.work} className="work-detail-related__all">
              Browse all work
              <Icon name="arrow-right" size="sm" aria-hidden />
            </Link>
          </div>

          <ul className="work-detail-grid work-detail-grid--related">
            {related.map((item) => (
              <li key={item.slug} className="min-w-0">
                <WorkProjectCard project={item} />
              </li>
            ))}
          </ul>
        </Section>
      ) : null}

      {project.caseStudySlug ? (
        <Section
          spacing="md"
          background="surface"
          aria-labelledby={`${project.slug}-casestudy-heading`}
          className="border-b border-border/40"
        >
          <div className="work-detail-case-link">
            <MarketingSectionIntro
              headingId={`${project.slug}-casestudy-heading`}
              title="Full case study"
              description="Read the deeper narrative — problem, architecture, and measured results."
            />
            <Link
              href={`${ROUTES.work}/${project.caseStudySlug}`}
              className="work-hero__btn work-hero__btn--primary"
            >
              Open case study
              <Icon name="arrow-up-right" size="sm" aria-hidden />
            </Link>
          </div>
        </Section>
      ) : null}

      <WorkPageCta />
    </PageShell>
  );
}

export function resolveWorkProjectDetail(slug: string): WorkProject | undefined {
  return WORK_PROJECTS.find((item) => item.slug === slug);
}

export { getWorkProjectHref };
