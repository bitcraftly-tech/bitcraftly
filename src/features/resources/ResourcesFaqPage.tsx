import Link from 'next/link';
import { FaqAccordion } from '@/components/patterns/faq-accordion';
import { JsonLdScript } from '@/components/patterns/json-ld';
import { PageShell } from '@/components/patterns/marketing-layout';
import { MarketingSectionIntro } from '@/components/patterns/marketing-section-intro';
import { Icon } from '@/components/ui/icon';
import { Section } from '@/components/ui/section';
import { NAV_ACTIONS, ROUTES } from '@/constants/navigation';
import { FAQ_ITEMS } from '@/features/homepage/FAQ/faq.constants';
import { cn } from '@/lib/cn';
import { buildResourcesBreadcrumbs } from '@/lib/seo/breadcrumbs';
import { buildBreadcrumbListJsonLd } from '@/lib/seo/json-ld-breadcrumbs';
import { buildFaqPageJsonLd } from '@/lib/seo/json-ld-faq';
import { getAbsoluteUrl } from '@/lib/seo/site';
import { WEBSITE_ID } from '@/lib/seo/website';
import '@/features/homepage/FAQ/faq.css';
import { ResourcesHero } from './ResourcesHero';
import { ResourcesPageCta } from './ResourcesPageCta';
import { RESOURCES_FAQ_COPY } from './resources.content';
import './resources.css';

const focusRing = cn(
  'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary',
  'focus-visible:ring-offset-2 focus-visible:ring-offset-background',
);

/**
 * Resources FAQ — Resources landing design language (hero + section rhythm + CTA).
 */
export function ResourcesFaqPage() {
  const breadcrumbs = buildResourcesBreadcrumbs([{ label: 'FAQ' }]);
  const pageUrl = getAbsoluteUrl(ROUTES.resourcesFaq);

  return (
    <PageShell className="resources-page resources-detail-page resources-faq-page">
      <JsonLdScript
        data={{
          '@context': 'https://schema.org',
          '@graph': [
            {
              '@type': 'WebPage',
              '@id': `${pageUrl}#webpage`,
              url: pageUrl,
              name: RESOURCES_FAQ_COPY.title,
              description: RESOURCES_FAQ_COPY.description,
              isPartOf: { '@id': WEBSITE_ID },
            },
            buildFaqPageJsonLd(pageUrl, FAQ_ITEMS),
            buildBreadcrumbListJsonLd(breadcrumbs, pageUrl),
          ],
        }}
      />
      <ResourcesHero
        breadcrumbs={breadcrumbs}
        headingId="resources-faq-page-heading"
        eyebrow={RESOURCES_FAQ_COPY.eyebrow}
        eyebrowIcon="message"
        title={RESOURCES_FAQ_COPY.title}
        description={RESOURCES_FAQ_COPY.description}
        primaryCta={{
          label: NAV_ACTIONS.freeConsultation.label,
          href: `${NAV_ACTIONS.freeConsultation.href}?source=resources-faq`,
        }}
        secondaryCta={{
          label: 'All resources',
          href: ROUTES.resources,
        }}
        chips={['Process', 'Timelines', 'Engagement', 'Support']}
      />

      <Section
        spacing="lg"
        aria-labelledby="resources-faq-list-heading"
        className="border-b border-border/40 bg-background"
      >
        <MarketingSectionIntro
          eyebrow="Answers"
          headingId="resources-faq-list-heading"
          title="Common questions"
          description="Straight answers on discovery, delivery, timelines, and how engagements with Bitcraftly typically run."
        />

        <div className="resources-faq__list mt-[24px]">
          <FaqAccordion items={[...FAQ_ITEMS]} />
        </div>

        <p className="m-0 mt-[24px] font-sans text-[14px] leading-[1.6] text-muted-foreground">
          Still have a question?{' '}
          <Link
            href={`${NAV_ACTIONS.freeConsultation.href}?source=resources-faq`}
            className={cn(
              'inline-flex items-center gap-[4px] font-semibold text-primary no-underline',
              'hover:opacity-80',
              focusRing,
            )}
          >
            Book a free consultation
            <Icon name="arrow-right" size="sm" aria-hidden className="h-[13px] w-[13px]" />
          </Link>
        </p>
      </Section>

      <ResourcesPageCta source="faq" />
    </PageShell>
  );
}
