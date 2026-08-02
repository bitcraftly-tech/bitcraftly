import type { Metadata } from 'next';
import { HomepageShell } from '@/features/homepage';
import { createPageMetadata } from '@/lib/seo/createPageMetadata';
import { ROUTES } from '@/constants/navigation';

const HOME_TITLE = 'Bitcraftly | Complete Digital Systems for Your Industry';
const HOME_DESCRIPTION =
  'AI-Powered Digital Engineering Partner. Launch Complete Digital Systems — website, AI, dashboard, analytics, and integrations — engineered as one Industry System.';

export const metadata: Metadata = createPageMetadata({
  title: HOME_TITLE,
  description: HOME_DESCRIPTION,
  path: ROUTES.home,
  keywords: [
    'Bitcraftly',
    'Industry Systems',
    'Complete Digital Systems',
    'AI-Powered Digital Engineering Partner',
    'Healthcare Industry System',
    'Real Estate Industry System',
    'Restaurant Industry System',
    'Corporate Services Industry System',
    'Intelligent Business Automation',
  ],
});

const homepageJsonLd = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'Organization',
      '@id': 'https://bitcraftly.com/#organization',
      name: 'Bitcraftly',
      url: 'https://bitcraftly.com',
      logo: 'https://bitcraftly.com/brand/icon.png',
      description:
        'AI-Powered Digital Engineering Partner delivering Complete Digital Systems — Industry Systems with website, AI, dashboard, analytics, and integrations.',
      email: 'hello@bitcraftly.com',
      telephone: '+91-96677-10954',
      address: {
        '@type': 'PostalAddress',
        addressLocality: 'Noida',
        addressRegion: 'Uttar Pradesh',
        addressCountry: 'IN',
      },
      sameAs: [
        'https://www.linkedin.com/company/bitcraftly',
        'https://x.com/bitcraftly',
        'https://github.com/bitcraftly',
        'https://www.youtube.com/@bitcraftly',
      ],
    },
    {
      '@type': 'WebSite',
      '@id': 'https://bitcraftly.com/#website',
      url: 'https://bitcraftly.com',
      name: 'Bitcraftly',
      description: HOME_DESCRIPTION,
      publisher: { '@id': 'https://bitcraftly.com/#organization' },
      inLanguage: 'en-IN',
    },
    {
      '@type': 'WebPage',
      '@id': 'https://bitcraftly.com/#webpage',
      url: 'https://bitcraftly.com',
      name: HOME_TITLE,
      isPartOf: { '@id': 'https://bitcraftly.com/#website' },
      about: { '@id': 'https://bitcraftly.com/#organization' },
      description: HOME_DESCRIPTION,
      primaryImageOfPage: {
        '@type': 'ImageObject',
        url: 'https://bitcraftly.com/opengraph-image.webp',
      },
    },
  ],
};

export default function HomePage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(homepageJsonLd) }}
      />
      <HomepageShell />
    </>
  );
}
