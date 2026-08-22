import { ALL_SERVICES, getServiceHref } from '@/constants/services';
import { ROUTES } from '@/constants/navigation';
import { ORGANIZATION_ID } from '@/lib/seo/organization';
import { getAbsoluteUrl } from '@/lib/seo/site';
import { WEBSITE_ID } from '@/lib/seo/website';
import { SERVICES_LANDING } from './services.content';
import type { ServicePageContent } from './services.types';

export function buildServicesListingJsonLd() {
  const pageUrl = getAbsoluteUrl(ROUTES.services);

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
        isPartOf: { '@id': WEBSITE_ID },
      },
      {
        '@type': 'ItemList',
        '@id': `${pageUrl}#list`,
        itemListElement: ALL_SERVICES.map((service, index) => ({
          '@type': 'ListItem',
          position: index + 1,
          name: service.label,
          url: getAbsoluteUrl(getServiceHref(service.slug)),
        })),
      },
      {
        '@type': 'FAQPage',
        mainEntity: SERVICES_LANDING.listingFaqs.map((faq) => ({
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

  return {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'Service',
        '@id': `${url}#service`,
        name: content.label,
        description: content.metaDescription,
        url,
        provider: {
          '@id': ORGANIZATION_ID,
        },
        areaServed: {
          '@type': 'Country',
          name: 'India',
        },
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
