import type { Metadata } from 'next';
import type { ReactNode } from 'react';

import { createNoIndexMetadata } from '@/lib/seo/noindex-metadata';
import '@/styles/portfolio-showcase-tokens.css';
import '@/styles/portfolio-showcase-demos.css';

export const metadata: Metadata = createNoIndexMetadata({
  title: 'Interactive demos',
  description: 'Bitcraftly interactive portfolio showcases. These demos are not indexed.',
  robots: {
    index: false,
    follow: false,
  },
});

/**
 * Isolates interactive demo CSS (tech-v2 parity) to /portfolio routes.
 * Per-demo sheets (ecommerce/gym/school) are imported by their layouts.
 * `.portfolio-demo-shell` restores default Tailwind spacing for demos.
 * Showcase URLs stay noindex so crawl budget stays on /work.
 */
export default function PortfolioLayout({
  children,
}: Readonly<{
  children: ReactNode;
}>) {
  return <div className="portfolio-demo-shell flex min-h-full flex-1 flex-col">{children}</div>;
}
