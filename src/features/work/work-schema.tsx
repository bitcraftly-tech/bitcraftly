/**
 * Work JSON-LD builders — CollectionPage, BreadcrumbList, FAQPage, ItemList.
 */

import { ROUTES } from '@/constants/navigation';
import { buildWorkBreadcrumbs } from '@/lib/seo/breadcrumbs';
import { buildBreadcrumbListJsonLd } from '@/lib/seo/json-ld-breadcrumbs';
import { ORGANIZATION_ID } from '@/lib/seo/organization';
import { getAbsoluteUrl } from '@/lib/seo/site';
import { WEBSITE_ID } from '@/lib/seo/website';
import type { WorkFaqItem, WorkHubContent, WorkProject } from './work.types';
import { getWorkProjectHref, WORK_FAQS } from './work.content';

const WORK_PAGE_SEO = {
  name: 'Work | Bitcraftly Portfolio',
  description:
    'Explore Bitcraftly portfolio work — live client websites, SaaS platforms, healthcare, ecommerce, AI concierge experiences, and engineered outcomes.',
} as const;

export function buildWorkListingJsonLd(
  projects: readonly WorkProject[],
  faqs: readonly WorkFaqItem[] = WORK_FAQS,
) {
  const pageUrl = getAbsoluteUrl(ROUTES.work);

  return {
    '@context': 'https://schema.org',
    '@graph': [
      buildBreadcrumbListJsonLd(buildWorkBreadcrumbs(), pageUrl),
      {
        '@type': 'CollectionPage',
        '@id': `${pageUrl}#webpage`,
        url: pageUrl,
        name: WORK_PAGE_SEO.name,
        description: WORK_PAGE_SEO.description,
        isPartOf: { '@id': WEBSITE_ID },
        about: { '@id': ORGANIZATION_ID },
        mainEntity: {
          '@type': 'ItemList',
          itemListElement: projects.map((project, index) => ({
            '@type': 'ListItem',
            position: index + 1,
            url: getAbsoluteUrl(getWorkProjectHref(project.slug)),
            name: project.title,
          })),
        },
      },
      {
        '@type': 'FAQPage',
        mainEntity: faqs.map((faq) => ({
          '@type': 'Question',
          name: faq.question,
          acceptedAnswer: {
            '@type': 'Answer',
            text: faq.answer,
          },
        })),
      },
    ],
  };
}

export function buildWorkHubJsonLd(hub: WorkHubContent, projects: readonly WorkProject[]) {
  const pageUrl = getAbsoluteUrl(`${ROUTES.work}/${hub.slug}`);
  const breadcrumbs = buildWorkBreadcrumbs([{ label: hub.title }]);

  return {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'CollectionPage',
        '@id': `${pageUrl}#webpage`,
        name: hub.seoTitle,
        description: hub.seoDescription,
        url: pageUrl,
        isPartOf: { '@id': WEBSITE_ID },
        mainEntity: {
          '@type': 'ItemList',
          itemListElement: projects.map((project, index) => ({
            '@type': 'ListItem',
            position: index + 1,
            url: getAbsoluteUrl(getWorkProjectHref(project.slug)),
            name: project.title,
          })),
        },
      },
      buildBreadcrumbListJsonLd(breadcrumbs, pageUrl),
    ],
  };
}

export function buildWorkProjectJsonLd(project: WorkProject) {
  const pageUrl = getAbsoluteUrl(getWorkProjectHref(project.slug));
  const breadcrumbs = buildWorkBreadcrumbs([{ label: project.title }]);

  return {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'CreativeWork',
        '@id': `${pageUrl}#work`,
        name: project.title,
        description: project.seoDescription ?? project.summary,
        url: pageUrl,
        image: getAbsoluteUrl(project.coverImage),
        creator: { '@id': ORGANIZATION_ID },
        isPartOf: { '@id': WEBSITE_ID },
      },
      buildBreadcrumbListJsonLd(breadcrumbs, pageUrl),
    ],
  };
}
