import { getSiteUrl } from './site';

export function buildWebsiteSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: 'Bitcraftly',
    url: getSiteUrl(),
  };
}
