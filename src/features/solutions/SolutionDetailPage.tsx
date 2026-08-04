import Link from 'next/link';
import { JsonLdScript } from '@/components/patterns/json-ld';
import { PageShell } from '@/components/patterns/marketing-layout';
import { MarketingSectionIntro } from '@/components/patterns/marketing-section-intro';
import { Icon } from '@/components/ui/icon';
import { Section } from '@/components/ui/section';
import { ROUTES } from '@/constants/navigation';
import { ServiceCard } from '@/features/services/ServiceCard';
import { FaqAccordion } from '@/components/patterns/faq-accordion';
import { buildSolutionsBreadcrumbs } from '@/lib/seo/breadcrumbs';
import { cn } from '@/lib/cn';
import '@/features/services/services.css';
import { SolutionDetailHero } from './SolutionDetailHero';
import { SolutionsPageCta } from './SolutionsPageCta';
import { getRelatedServiceLinks, getRelatedSolutions } from './solutions.content';
import { buildSolutionDetailJsonLd } from './solutions-schema';
import type { SolutionPageContent } from './solutions.types';
import './solutions.css';

interface SolutionDetailPageProps {
  content: SolutionPageContent;
}

/**
 * Solution detail — Solutions landing design language (hero shell + section rhythm).
 */
export function SolutionDetailPage({ content }: SolutionDetailPageProps) {
  const breadcrumbs = buildSolutionsBreadcrumbs([{ label: content.label }]);
  const relatedSolutions = getRelatedSolutions(content.slug);
  const relatedServices = getRelatedServiceLinks(content.relatedServiceHrefs);
  const contactHref = `${ROUTES.contact}?intent=${encodeURIComponent(`solution-${content.slug}`)}&source=solution-page`;

  return (
    <PageShell className="solutions-page solution-detail-page">
      <JsonLdScript data={buildSolutionDetailJsonLd(content)} />

      <SolutionDetailHero content={content} breadcrumbs={breadcrumbs} contactHref={contactHref} />

      <Section
        spacing="lg"
        aria-labelledby={`${content.slug}-highlights-heading`}
        className="border-b border-border/40 bg-background"
      >
        <MarketingSectionIntro
          eyebrow="Capabilities"
          headingId={`${content.slug}-highlights-heading`}
          title="What this solution covers"
          description="Concrete capabilities we deliver for this solution line — scoped to your workflows and stack."
        />
        <ul className="solution-detail-capabilities">
          {content.highlights.map((item) => (
            <li key={item} className="solution-detail-capabilities__item">
              <span className="services-page-check" aria-hidden>
                <Icon name="check" size="sm" className="h-[14px] w-[14px]" />
              </span>
              <span>{item}</span>
            </li>
          ))}
        </ul>
      </Section>

      <Section
        spacing="lg"
        background="surface"
        aria-labelledby={`${content.slug}-process-heading`}
        className="border-b border-border/40"
      >
        <MarketingSectionIntro
          eyebrow="Delivery"
          headingId={`${content.slug}-process-heading`}
          title="How we deliver"
          description="A clear path from discovery to launch — with ownership, reviews, and handoff built in."
        />
        <ol className="solution-detail-process solutions-process m-0 list-none p-0">
          {content.process.map((step, index) => (
            <li key={step.title} className="solutions-process__item min-w-0">
              <article className="solutions-process__card">
                <div className="solutions-process__top">
                  <span className="solutions-process__number" aria-hidden>
                    {String(index + 1).padStart(2, '0')}
                  </span>
                  <span className="solutions-process__icon" aria-hidden>
                    <Icon name={step.icon ?? 'workflow'} size="sm" />
                  </span>
                </div>
                <h3 className="solutions-process__title">{step.title}</h3>
                <p className="solutions-process__desc">{step.description}</p>
              </article>
            </li>
          ))}
        </ol>
      </Section>

      {content.faqs.length > 0 ? (
        <Section
          spacing="lg"
          aria-labelledby={`${content.slug}-faq-heading`}
          className="border-b border-border/40 bg-background"
        >
          <MarketingSectionIntro
            eyebrow="FAQ"
            headingId={`${content.slug}-faq-heading`}
            title="Frequently asked questions"
            description={`Common questions about ${content.label} engagements with Bitcraftly.`}
          />
          <div className="solution-detail-faq">
            <FaqAccordion items={[...content.faqs]} />
          </div>
        </Section>
      ) : null}

      <Section
        spacing="lg"
        background="surface"
        aria-labelledby={`${content.slug}-related-heading`}
        className="border-b border-border/40"
      >
        <div className="solution-detail-related__head">
          <MarketingSectionIntro
            headingId={`${content.slug}-related-heading`}
            title="Related solutions"
            description="Explore adjacent solution lines that often pair with this engagement."
          />
          <Link href={ROUTES.solutions} className="solution-detail-related__all">
            View all solutions
            <Icon name="arrow-right" size="sm" aria-hidden />
          </Link>
        </div>

        <ul
          className={cn(
            'm-0 grid list-none gap-[24px] p-0',
            'grid-cols-1 sm:grid-cols-2 lg:grid-cols-4',
          )}
        >
          {relatedSolutions.map((solution) => (
            <li key={solution.slug} className="min-w-0">
              <ServiceCard service={solution} />
            </li>
          ))}
        </ul>

        {relatedServices.length > 0 ? (
          <div className="solution-detail-related-work">
            <h3 className="solution-detail-related-work__title">Related services</h3>
            <ul className="solution-detail-related-work__list">
              {relatedServices.map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className="solution-detail-related-work__chip">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        ) : null}
      </Section>

      <SolutionsPageCta />
    </PageShell>
  );
}
