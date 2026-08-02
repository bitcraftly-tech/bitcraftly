import { ROUTES } from '@/constants/navigation';
import { INDUSTRIES_CATALOG, INDUSTRY_FAQS } from './industries.content';

export function buildIndustriesListingJsonLd() {
  return {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'CollectionPage',
        '@id': 'https://bitcraftly.com/industries#page',
        url: 'https://bitcraftly.com/industries',
        name: 'Industries | Bitcraftly',
        description:
          'Industry-focused digital engineering across healthcare, education, retail, finance, logistics, SaaS, and more.',
        isPartOf: { '@id': 'https://bitcraftly.com/#website' },
      },
      {
        '@type': 'ItemList',
        '@id': 'https://bitcraftly.com/industries#list',
        itemListElement: INDUSTRIES_CATALOG.map((industry, index) => ({
          '@type': 'ListItem',
          position: index + 1,
          name: industry.label,
          url: `https://bitcraftly.com${ROUTES.industries}/${industry.slug}`,
        })),
      },
      {
        '@type': 'FAQPage',
        '@id': 'https://bitcraftly.com/industries#faq',
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
