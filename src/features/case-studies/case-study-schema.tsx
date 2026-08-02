import { getCaseStudyHref, type CaseStudy } from '@/content/case-studies';
import { ROUTES } from '@/constants/navigation';

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL?.replace(/\/$/, '') ?? 'https://bitcraftly.com';

function absolute(path: string): string {
  if (path.startsWith('http')) return path;
  return `${SITE_URL}${path.startsWith('/') ? path : `/${path}`}`;
}

export function buildCaseStudyJsonLd(study: CaseStudy) {
  const url = absolute(getCaseStudyHref(study.slug));

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
            item: `${SITE_URL}/`,
          },
          {
            '@type': 'ListItem',
            position: 2,
            name: 'Work',
            item: absolute(ROUTES.work),
          },
          {
            '@type': 'ListItem',
            position: 3,
            name: study.title,
            item: url,
          },
        ],
      },
      {
        '@type': 'Article',
        '@id': `${url}#casestudy`,
        headline: study.title,
        description: study.seoDescription ?? study.description,
        image: [absolute(study.coverImage)],
        url,
        articleSection: 'Case Study',
        about: {
          '@type': 'Organization',
          name: study.client.name,
        },
        author: {
          '@type': 'Organization',
          name: 'Bitcraftly',
          url: SITE_URL,
        },
        keywords: study.tags.join(', '),
        datePublished: `${study.engagement.year}-01-01`,
      },
    ],
  };
}
