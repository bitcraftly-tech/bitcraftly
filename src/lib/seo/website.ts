import { ORGANIZATION_ID } from './organization';
import { getSiteUrl } from './site';

export const WEBSITE_ID = `${getSiteUrl()}/#website`;

/**
 * WebSite schema — no SearchAction. There is no `/search` route, so a
 * SearchAction target would be invalid structured data.
 */
export function buildWebsiteSchema() {
  const siteUrl = getSiteUrl();

  return {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    '@id': WEBSITE_ID,
    url: siteUrl,
    name: 'Bitcraftly',
    inLanguage: 'en-IN',
    publisher: { '@id': ORGANIZATION_ID },
  };
}
