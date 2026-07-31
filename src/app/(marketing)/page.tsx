import type { Metadata } from 'next';
import { HomepageShell } from '@/features/homepage';
import { createPageMetadata } from '@/lib/seo/createPageMetadata';
import { ROUTES } from '@/constants/navigation';

export const metadata: Metadata = createPageMetadata({
  title: 'Bitcraftly | AI & Digital Engineering Partner',
  description:
    'Bitcraftly builds AI-powered websites, SaaS, and automation — founder-led delivery with clear scope and measurable outcomes.',
  path: ROUTES.home,
  keywords: [
    'Bitcraftly',
    'AI website development',
    'Next.js agency India',
    'SaaS product development',
    'founder-led web studio',
    'Delhi NCR web development',
  ],
  image: '/hero.webp',
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
      publisher: { '@id': 'https://bitcraftly.com/#organization' },
      inLanguage: 'en-IN',
    },
    {
      '@type': 'WebPage',
      '@id': 'https://bitcraftly.com/#webpage',
      url: 'https://bitcraftly.com',
      name: 'Bitcraftly | AI & Digital Engineering Partner',
      isPartOf: { '@id': 'https://bitcraftly.com/#website' },
      about: { '@id': 'https://bitcraftly.com/#organization' },
      description:
        'Bitcraftly builds AI-powered websites, SaaS, and automation — founder-led delivery with clear scope and measurable outcomes.',
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
