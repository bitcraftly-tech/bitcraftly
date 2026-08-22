import { ROUTES } from '@/constants/navigation';
import { ORGANIZATION_ID } from '@/lib/seo/organization';
import { getAbsoluteUrl } from '@/lib/seo/site';
import { WEBSITE_ID } from '@/lib/seo/website';
import { buildBreadcrumbListJsonLd } from '@/lib/seo/json-ld-breadcrumbs';
import { buildIndustriesBreadcrumbs } from '@/lib/seo/breadcrumbs';
import type { IndustryModel } from './industries.types';
import { INDUSTRIES_CATALOG, INDUSTRY_FAQS, industryDetailHref } from './industries.content';

export function buildIndustriesListingJsonLd() {
  const pageUrl = getAbsoluteUrl(ROUTES.industries);

  return {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'CollectionPage',
        '@id': `${pageUrl}#page`,
        url: pageUrl,
        name: 'Industries | Bitcraftly',
        description:
          'Industry-focused digital engineering across healthcare, education, retail, finance, logistics, SaaS, and more.',
        isPartOf: { '@id': WEBSITE_ID },
      },
      {
        '@type': 'ItemList',
        '@id': `${pageUrl}#list`,
        itemListElement: INDUSTRIES_CATALOG.map((industry, index) => ({
          '@type': 'ListItem',
          position: index + 1,
          name: industry.label,
          url: getAbsoluteUrl(`${ROUTES.industries}/${industry.slug}`),
        })),
      },
      {
        '@type': 'FAQPage',
        '@id': `${pageUrl}#faq`,
        mainEntity: INDUSTRY_FAQS.map((item) => ({
          '@type': 'Question',
          name: item.question,
          acceptedAnswer: {
            '@type': 'Answer',
            text: item.answer,
          },
        })),
      },
    ],
  };
}

export function buildIndustryDetailJsonLd(industry: IndustryModel) {
  const pageUrl = getAbsoluteUrl(industryDetailHref(industry.slug));
  const breadcrumbs = buildIndustriesBreadcrumbs([{ label: industry.label }]);

  return {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'WebPage',
        '@id': `${pageUrl}#webpage`,
        url: pageUrl,
        name: `${industry.label} Industry Solutions | Bitcraftly`,
        description: industry.description,
        isPartOf: { '@id': WEBSITE_ID },
        about: { '@id': ORGANIZATION_ID },
      },
      {
        '@type': 'Service',
        '@id': `${pageUrl}#service`,
        name: `${industry.label} Industry System`,
        description: industry.description,
        provider: { '@id': ORGANIZATION_ID },
        areaServed: {
          '@type': 'Country',
          name: 'India',
        },
        serviceType: industry.label,
      },
      buildBreadcrumbListJsonLd(breadcrumbs, pageUrl),
    ],
  };
}
