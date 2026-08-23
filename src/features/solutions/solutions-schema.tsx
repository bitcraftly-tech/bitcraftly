import { ALL_SOLUTIONS, getSolutionHref } from '@/constants/solutions';
import { ROUTES } from '@/constants/navigation';
import { ORGANIZATION_ID } from '@/lib/seo/organization';
import { getAbsoluteUrl } from '@/lib/seo/site';
import { WEBSITE_ID } from '@/lib/seo/website';
import { SOLUTIONS_LANDING } from './solutions.content';
import type { SolutionPageContent } from './solutions.types';

const BREADCRUMB_ID = '#breadcrumb';

export function buildSolutionsListingJsonLd() {
  const pageUrl = getAbsoluteUrl(ROUTES.solutions);
  const breadcrumbId = `${pageUrl}${BREADCRUMB_ID}`;

  return {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'BreadcrumbList',
        '@id': breadcrumbId,
        itemListElement: [
          {
            '@type': 'ListItem',
            position: 1,
            name: 'Home',
            item: getAbsoluteUrl(ROUTES.home),
          },
          {
            '@type': 'ListItem',
            position: 2,
            name: 'Solutions',
            item: pageUrl,
          },
        ],
      },
      {
        '@type': 'CollectionPage',
        '@id': `${pageUrl}#webpage`,
        url: pageUrl,
        name: 'Bitcraftly Solutions',
        description:
          'Business and AI solutions — CRM, ERP, SaaS platforms, automation, and knowledge systems.',
        inLanguage: 'en-IN',
        isPartOf: { '@id': WEBSITE_ID },
        publisher: { '@id': ORGANIZATION_ID },
        breadcrumb: { '@id': breadcrumbId },
      },
      {
        '@type': 'ItemList',
        '@id': `${pageUrl}#list`,
        itemListElement: ALL_SOLUTIONS.map((solution, index) => ({
          '@type': 'ListItem',
          position: index + 1,
          name: solution.label,
          url: getAbsoluteUrl(getSolutionHref(solution.slug)),
        })),
      },
      {
        '@type': 'FAQPage',
        inLanguage: 'en-IN',
        mainEntity: SOLUTIONS_LANDING.faqs.map((faq) => ({
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

export function buildSolutionDetailJsonLd(content: SolutionPageContent) {
  const url = getAbsoluteUrl(getSolutionHref(content.slug));
  const breadcrumbId = `${url}${BREADCRUMB_ID}`;
  const webPageId = `${url}#webpage`;
  const serviceId = `${url}#solution`;

  return {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'BreadcrumbList',
        '@id': breadcrumbId,
        itemListElement: [
          {
            '@type': 'ListItem',
            position: 1,
            name: 'Home',
            item: getAbsoluteUrl(ROUTES.home),
          },
          {
            '@type': 'ListItem',
            position: 2,
            name: 'Solutions',
            item: getAbsoluteUrl(ROUTES.solutions),
          },
          {
            '@type': 'ListItem',
            position: 3,
            name: content.label,
            item: url,
          },
        ],
      },
      {
        '@type': 'WebPage',
        '@id': webPageId,
        url,
        name: content.label,
        description: content.intro,
        inLanguage: 'en-IN',
        isPartOf: { '@id': WEBSITE_ID },
        publisher: { '@id': ORGANIZATION_ID },
        breadcrumb: { '@id': breadcrumbId },
        about: { '@id': serviceId },
        mainEntity: { '@id': serviceId },
      },
      {
        '@type': 'Service',
        '@id': serviceId,
        name: content.label,
        description: content.intro,
        url,
        inLanguage: 'en-IN',
        provider: {
          '@id': ORGANIZATION_ID,
        },
        serviceType: content.groupTitle,
        mainEntityOfPage: { '@id': webPageId },
      },
      ...(content.faqs.length
        ? [
            {
              '@type': 'FAQPage',
              inLanguage: 'en-IN',
              mainEntity: content.faqs.map((faq) => ({
                '@type': 'Question',
                name: faq.question,
                acceptedAnswer: {
                  '@type': 'Answer',
                  text: faq.answer,
                },
              })),
            },
          ]
        : []),
    ],
  };
}
