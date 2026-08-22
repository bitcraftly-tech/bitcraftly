import { CASE_STUDIES, getCaseStudyHref, type CaseStudy } from '@/content/case-studies';
import { ROUTES } from '@/constants/navigation';
import { buildCaseStudiesBreadcrumbs, buildWorkBreadcrumbs } from '@/lib/seo/breadcrumbs';
import { buildBreadcrumbListJsonLd } from '@/lib/seo/json-ld-breadcrumbs';
import { ORGANIZATION_ID } from '@/lib/seo/organization';
import { getAbsoluteUrl } from '@/lib/seo/site';
import { WEBSITE_ID } from '@/lib/seo/website';

export function buildCaseStudiesListingJsonLd() {
  const pageUrl = getAbsoluteUrl(ROUTES.caseStudies);
  const breadcrumbs = buildCaseStudiesBreadcrumbs();

  return {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'CollectionPage',
        '@id': `${pageUrl}#webpage`,
        url: pageUrl,
        name: 'Case Studies | Bitcraftly',
        description: 'Outcomes and delivery stories from Bitcraftly projects.',
        isPartOf: { '@id': WEBSITE_ID },
        about: { '@id': ORGANIZATION_ID },
        mainEntity: {
          '@type': 'ItemList',
          itemListElement: CASE_STUDIES.map((study, index) => ({
            '@type': 'ListItem',
            position: index + 1,
            name: study.title,
            url: getAbsoluteUrl(getCaseStudyHref(study.slug)),
          })),
        },
      },
      buildBreadcrumbListJsonLd(breadcrumbs, pageUrl),
    ],
  };
}

export function buildCaseStudyJsonLd(study: CaseStudy) {
  const url = getAbsoluteUrl(getCaseStudyHref(study.slug));
  const breadcrumbs = buildWorkBreadcrumbs([{ label: study.title }]);

  return {
    '@context': 'https://schema.org',
    '@graph': [
      buildBreadcrumbListJsonLd(breadcrumbs, url),
      {
        '@type': 'Article',
        '@id': `${url}#casestudy`,
        headline: study.title,
        description: study.seoDescription ?? study.description,
        image: [getAbsoluteUrl(study.coverImage)],
        url,
        articleSection: 'Case Study',
        about: {
          '@type': 'Organization',
          name: study.client.name,
        },
        author: {
          '@id': ORGANIZATION_ID,
        },
        publisher: {
          '@id': ORGANIZATION_ID,
        },
        keywords: study.tags.join(', '),
        datePublished: `${study.engagement.year}-01-01`,
        isPartOf: { '@id': WEBSITE_ID },
      },
    ],
  };
}
