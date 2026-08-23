import {
  CASE_STUDIES,
  getCaseStudyHref,
  getCaseStudyPublishedAt,
  isCaseStudyIndexable,
  type CaseStudy,
} from '@/content/case-studies';
import { ROUTES } from '@/constants/navigation';
import { buildCaseStudiesBreadcrumbs, buildWorkBreadcrumbs } from '@/lib/seo/breadcrumbs';
import { buildBreadcrumbListJsonLd } from '@/lib/seo/json-ld-breadcrumbs';
import { ORGANIZATION_ID } from '@/lib/seo/organization';
import { getAbsoluteUrl } from '@/lib/seo/site';
import { WEBSITE_ID } from '@/lib/seo/website';

export function buildCaseStudiesListingJsonLd() {
  const pageUrl = getAbsoluteUrl(ROUTES.caseStudies);
  const breadcrumbs = buildCaseStudiesBreadcrumbs();
  const breadcrumbJsonLd = buildBreadcrumbListJsonLd(breadcrumbs, pageUrl);
  const indexableStudies = CASE_STUDIES.filter(isCaseStudyIndexable);

  return {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'CollectionPage',
        '@id': `${pageUrl}#webpage`,
        url: pageUrl,
        name: 'Case Studies | Bitcraftly',
        description:
          'Bitcraftly case studies approved for public publication. Stories are listed here after review.',
        inLanguage: 'en-IN',
        isPartOf: { '@id': WEBSITE_ID },
        about: { '@id': ORGANIZATION_ID },
        publisher: { '@id': ORGANIZATION_ID },
        breadcrumb: { '@id': breadcrumbJsonLd['@id'] },
        ...(indexableStudies.length > 0
          ? {
              mainEntity: {
                '@type': 'ItemList',
                itemListElement: indexableStudies.map((study, index) => ({
                  '@type': 'ListItem',
                  position: index + 1,
                  name: study.title,
                  url: getAbsoluteUrl(getCaseStudyHref(study.slug)),
                })),
              },
            }
          : {}),
      },
      breadcrumbJsonLd,
    ],
  };
}

export function buildCaseStudyJsonLd(study: CaseStudy) {
  const url = getAbsoluteUrl(getCaseStudyHref(study.slug));
  const breadcrumbs = buildWorkBreadcrumbs([{ label: study.title }]);
  const publishedAt = getCaseStudyPublishedAt(study);

  return {
    '@context': 'https://schema.org',
    '@graph': [
      buildBreadcrumbListJsonLd(breadcrumbs, url),
      {
        '@type': 'Article',
        '@id': `${url}#casestudy`,
        headline: study.title,
        description: study.subtitle,
        image: [getAbsoluteUrl(study.coverImage)],
        url,
        articleSection: 'Case Study',
        ...(study.clientAssociationApproved
          ? {
              about: {
                '@type': 'Organization',
                name: study.client.name,
              },
            }
          : {}),
        author: {
          '@id': ORGANIZATION_ID,
        },
        publisher: {
          '@id': ORGANIZATION_ID,
        },
        keywords: study.tags.join(', '),
        ...(publishedAt ? { datePublished: publishedAt } : {}),
        isPartOf: { '@id': WEBSITE_ID },
      },
    ],
  };
}
