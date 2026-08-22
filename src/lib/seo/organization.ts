import { getAbsoluteUrl, getSiteUrl } from './site';

export const ORGANIZATION_ID = `${getSiteUrl()}/#organization`;

const ORGANIZATION_SAME_AS = [
  'https://www.linkedin.com/company/bitcraftly',
  'https://www.instagram.com/bitcraftly',
  'https://www.youtube.com/@bitcraftly',
  'https://x.com/bitcraftly',
  'https://www.facebook.com/bitcraftly',
  'https://github.com/bitcraftly-tech',
] as const;

export function buildOrganizationSchema() {
  const siteUrl = getSiteUrl();

  return {
    '@context': 'https://schema.org',
    '@type': ['Organization', 'ProfessionalService'],
    '@id': ORGANIZATION_ID,
    name: 'Bitcraftly',
    legalName: 'Bitcraftly Technologies Pvt. Ltd.',
    url: siteUrl,
    logo: getAbsoluteUrl('/brand/icon.png'),
    image: getAbsoluteUrl('/opengraph-image.webp'),
    description:
      'AI-Powered Digital Engineering Partner delivering Complete Digital Systems — Industry Systems with website, AI, dashboard, analytics, and integrations.',
    foundingDate: '2025',
    email: 'hello@bitcraftly.com',
    telephone: '+91-96677-10954',
    address: {
      '@type': 'PostalAddress',
      addressLocality: 'Noida',
      addressRegion: 'Uttar Pradesh',
      addressCountry: 'IN',
    },
    areaServed: {
      '@type': 'Country',
      name: 'India',
    },
    contactPoint: {
      '@type': 'ContactPoint',
      telephone: '+91-96677-10954',
      email: 'hello@bitcraftly.com',
      contactType: 'sales',
      areaServed: 'IN',
      availableLanguage: ['en', 'hi'],
    },
    sameAs: [...ORGANIZATION_SAME_AS],
  };
}

/** @deprecated Use buildOrganizationSchema() for env-aware URLs. */
export const organizationSchema = buildOrganizationSchema();
