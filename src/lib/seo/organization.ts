import { getAbsoluteUrl } from './site';

export function buildOrganizationSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: 'Bitcraftly',
    url: getAbsoluteUrl('/'),
    logo: getAbsoluteUrl('/brand/bitcraftly-logo.webp'),
    description:
      'Bitcraftly builds AI-powered websites, SaaS platforms, automation systems, and digital products.',
    foundingDate: '2025',
    email: 'hello@bitcraftly.com',
    sameAs: [
      // Add official profiles when available
      // "https://www.linkedin.com/company/bitcraftly",
      // "https://github.com/bitcraftly",
    ],
  };
}

/** @deprecated Use buildOrganizationSchema() for env-aware URLs. */
export const organizationSchema = buildOrganizationSchema();
