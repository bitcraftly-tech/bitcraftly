import type { Metadata } from 'next';

import ClayCraftShowcaseContent from './ClayCraftShowcaseContent';
import { CLAYCRAFT_BASE } from './claycraft-paths';

export const metadata: Metadata = {
  title: 'Home',
  description: 'Crockery Wala elegant tableware — premium ceramic ecommerce demo by Bitcraftly.',
  alternates: { canonical: CLAYCRAFT_BASE },
};

export default function ClayCraftHomePage() {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: 'Crockery Wala',
    url: CLAYCRAFT_BASE,
    description: 'Premium tableware and ceramic ecommerce demonstration storefront.',
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <ClayCraftShowcaseContent />
    </>
  );
}
