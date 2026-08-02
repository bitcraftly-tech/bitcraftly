import type { Metadata } from 'next';
import { ROUTES } from '@/constants/navigation';
import { ResourcesFaqPage } from '@/features/resources';
import { createPageMetadata } from '@/lib/seo/createPageMetadata';

export const metadata: Metadata = createPageMetadata({
  title: 'FAQ',
  description:
    'Answers about Bitcraftly Industry Systems, Complete Digital Systems, Wave 1 industries, AI workflows, and how to get started.',
  path: ROUTES.resourcesFaq,
});

export default function ResourcesFaqRoutePage() {
  return <ResourcesFaqPage />;
}
