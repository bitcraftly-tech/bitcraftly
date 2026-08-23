import { ALL_SERVICES, getServiceHref } from '@/constants/services';
import { ROUTES } from '@/constants/navigation';
import { ORGANIZATION_ID } from '@/lib/seo/organization';
import { getAbsoluteUrl } from '@/lib/seo/site';
import { WEBSITE_ID } from '@/lib/seo/website';
import { SERVICE_CATEGORIES, SERVICES_FAQ } from './landing/services-landing.content';
import type { ServicePageContent } from './services.types';

const BREADCRUMB_ID = '#breadcrumb';

export function buildServicesListingJsonLd() {
  const pageUrl = getAbsoluteUrl(ROUTES.services);
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
            name: 'Services',
            item: pageUrl,
          },
        ],
      },
      {
        '@type': 'CollectionPage',
        '@id': `${pageUrl}#webpage`,
        url: pageUrl,
        name: 'Bitcraftly Services',
        description:
          'End-to-end digital engineering services including AI, websites, apps, custom software, and cloud DevOps.',
        inLanguage: 'en-IN',
        isPartOf: { '@id': WEBSITE_ID },
        publisher: { '@id': ORGANIZATION_ID },
        breadcrumb: { '@id': breadcrumbId },
      },
      {
        '@type': 'ItemList',
        '@id': `${pageUrl}#list`,
        itemListElement: SERVICE_CATEGORIES.map((category, index) => {
          const matchingService = ALL_SERVICES.find((service) => service.slug === category.id);

          return {
            '@type': 'ListItem',
            position: index + 1,
            name: category.title,
            url: matchingService
              ? getAbsoluteUrl(getServiceHref(matchingService.slug))
              : `${pageUrl}#service-category-${category.id}`,
          };
        }),
      },
      {
        '@type': 'FAQPage',
        mainEntity: SERVICES_FAQ.map((faq) => ({
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

export function buildServiceDetailJsonLd(content: ServicePageContent) {
  const url = getAbsoluteUrl(getServiceHref(content.slug));
  const breadcrumbId = `${url}${BREADCRUMB_ID}`;
  const webPageId = `${url}#webpage`;
  const serviceId = `${url}#service`;

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
            name: 'Services',
            item: getAbsoluteUrl(ROUTES.services),
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
