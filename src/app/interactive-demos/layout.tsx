import type { Metadata } from 'next';
import type { ReactNode } from 'react';

import { createNoIndexMetadata } from '@/lib/seo/noindex-metadata';

export const metadata: Metadata = createNoIndexMetadata({
  title: 'Interactive demos',
  description: 'Bitcraftly interactive demos. These pages are not indexed.',
});

/**
 * Showcase URLs stay noindex so crawl budget stays on public marketing pages.
 */
export default function InteractiveDemosLayout({
  children,
}: Readonly<{
  children: ReactNode;
}>) {
  return children;
}
