import { ALL_SOLUTIONS, getSolutionHref } from '@/constants/solutions';
import { ROUTES } from '@/constants/navigation';
import { ORGANIZATION_ID } from '@/lib/seo/organization';
import { getAbsoluteUrl } from '@/lib/seo/site';
import { WEBSITE_ID } from '@/lib/seo/website';
import type { SolutionPageContent } from './solutions.types';

export function buildSolutionsListingJsonLd() {
  const pageUrl = getAbsoluteUrl(ROUTES.solutions);

  return {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'BreadcrumbList',
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
        isPartOf: { '@id': WEBSITE_ID },
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
    ],
  };
}

export function buildSolutionDetailJsonLd(content: SolutionPageContent) {
  const url = getAbsoluteUrl(getSolutionHref(content.slug));

  return {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'Service',
        '@id': `${url}#solution`,
        name: content.label,
        description: content.metaDescription,
        url,
        provider: {
          '@id': ORGANIZATION_ID,
        },
        areaServed: { '@type': 'Country', name: 'India' },
        serviceType: content.groupTitle,
      },
      {
        '@type': 'BreadcrumbList',
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
      ...(content.faqs.length
        ? [
            {
              '@type': 'FAQPage',
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
