import type { Metadata } from 'next';
import { JsonLdScript } from '@/components/patterns/json-ld/JsonLdScript';
import { HomepageShell } from '@/features/homepage';
import { createPageMetadata } from '@/lib/seo/createPageMetadata';
import { ORGANIZATION_ID } from '@/lib/seo/organization';
import { getAbsoluteUrl, getSiteUrl } from '@/lib/seo/site';
import { WEBSITE_ID } from '@/lib/seo/website';
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

const siteUrl = getSiteUrl();

const homepageJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'WebPage',
  '@id': `${siteUrl}/#webpage`,
  url: siteUrl,
  name: HOME_TITLE,
  isPartOf: { '@id': WEBSITE_ID },
  about: { '@id': ORGANIZATION_ID },
  description: HOME_DESCRIPTION,
  primaryImageOfPage: {
    '@type': 'ImageObject',
    url: getAbsoluteUrl('/opengraph-image.webp'),
  },
};

export default function HomePage() {
  return (
    <>
      <JsonLdScript data={homepageJsonLd} />
      <HomepageShell />
    </>
  );
}
