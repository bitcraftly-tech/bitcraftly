import type { Metadata } from 'next';
import { ROUTES } from '@/constants/navigation';
import { ResourcesFaqPage } from '@/features/resources';
import { createPageMetadata } from '@/lib/seo/createPageMetadata';

export const metadata: Metadata = createPageMetadata({
  title: 'FAQ',
  description:
    'Frequently asked questions about Bitcraftly services, process, timelines, and engagement models.',
  path: ROUTES.resourcesFaq,
});

export default function ResourcesFaqRoutePage() {
  return <ResourcesFaqPage />;
}
