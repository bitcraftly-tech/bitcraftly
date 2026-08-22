import { ROUTES } from '@/constants/navigation';
import { ORGANIZATION_ID } from '@/lib/seo/organization';
import { getAbsoluteUrl, getSiteUrl } from '@/lib/seo/site';
import { WEBSITE_ID } from '@/lib/seo/website';
import { ABOUT_FAQS, ABOUT_LANDING_META, ABOUT_LEADERSHIP } from './about.content';

export function buildAboutJsonLd() {
  const siteUrl = getSiteUrl();
  const pageUrl = getAbsoluteUrl(ROUTES.about);
  const founder = ABOUT_LEADERSHIP[0];

  return {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'AboutPage',
        '@id': `${pageUrl}#webpage`,
        url: pageUrl,
        name: ABOUT_LANDING_META.title,
        description: ABOUT_LANDING_META.description,
        isPartOf: { '@id': WEBSITE_ID },
        about: { '@id': ORGANIZATION_ID },
        primaryImageOfPage: {
          '@type': 'ImageObject',
          url: getAbsoluteUrl('/brand/icon.png'),
        },
      },
      ...(founder
        ? [
            {
              '@type': 'Person',
              '@id': `${pageUrl}#founder`,
              name: founder.name,
              jobTitle: founder.role,
              description: founder.bio,
              worksFor: { '@id': ORGANIZATION_ID },
            },
          ]
        : []),
      {
        '@type': 'FAQPage',
        '@id': `${pageUrl}#about-faq`,
        mainEntity: ABOUT_FAQS.map((item) => ({
          '@type': 'Question',
          name: item.question,
          acceptedAnswer: {
            '@type': 'Answer',
            text: item.answer,
          },
        })),
      },
      {
        '@type': 'BreadcrumbList',
        '@id': `${pageUrl}#breadcrumb`,
        itemListElement: [
          {
            '@type': 'ListItem',
            position: 1,
            name: 'Home',
            item: siteUrl,
          },
          {
            '@type': 'ListItem',
            position: 2,
            name: 'About',
            item: pageUrl,
          },
        ],
      },
    ],
  };
}
