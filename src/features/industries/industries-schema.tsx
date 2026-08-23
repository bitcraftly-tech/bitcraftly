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
  const breadcrumbId = `${pageUrl}#breadcrumb`;
  const breadcrumbs = buildIndustriesBreadcrumbs();

  return {
    '@context': 'https://schema.org',
    '@graph': [
      buildBreadcrumbListJsonLd(breadcrumbs, pageUrl),
      {
        '@type': 'CollectionPage',
        '@id': `${pageUrl}#page`,
        url: pageUrl,
        name: 'Industry Digital Systems | Bitcraftly',
        description:
          'Industry-focused digital engineering across healthcare, education, retail, finance, logistics, SaaS, and more.',
        inLanguage: 'en-IN',
        isPartOf: { '@id': WEBSITE_ID },
        publisher: { '@id': ORGANIZATION_ID },
        breadcrumb: { '@id': breadcrumbId },
      },
      {
        '@type': 'ItemList',
        '@id': `${pageUrl}#list`,
        itemListElement: INDUSTRIES_CATALOG.map((industry, index) => ({
          '@type': 'ListItem',
          position: index + 1,
          name: industry.label,
          url: getAbsoluteUrl(industryDetailHref(industry.slug)),
        })),
      },
      {
        '@type': 'FAQPage',
        '@id': `${pageUrl}#faq`,
        inLanguage: 'en-IN',
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
  const breadcrumbId = `${pageUrl}#breadcrumb`;
  const webPageId = `${pageUrl}#webpage`;
  const serviceId = `${pageUrl}#service`;
  const breadcrumbs = buildIndustriesBreadcrumbs([{ label: industry.label }]);

  return {
    '@context': 'https://schema.org',
    '@graph': [
      buildBreadcrumbListJsonLd(breadcrumbs, pageUrl),
      {
        '@type': 'WebPage',
        '@id': webPageId,
        url: pageUrl,
        name: `${industry.label} Industry Solutions | Bitcraftly`,
        description: industry.description,
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
        name: `${industry.label} Industry System`,
        description: industry.description,
        url: pageUrl,
        inLanguage: 'en-IN',
        provider: { '@id': ORGANIZATION_ID },
        serviceType: industry.label,
        mainEntityOfPage: { '@id': webPageId },
      },
    ],
  };
}
