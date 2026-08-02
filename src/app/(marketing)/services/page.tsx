import type { Metadata } from 'next';
import { ServicesLandingPage } from '@/features/services';
import { ROUTES } from '@/constants/navigation';
import { createPageMetadata } from '@/lib/seo/createPageMetadata';

export const metadata: Metadata = createPageMetadata({
  title: 'Services',
  description:
    'End-to-end digital engineering services including AI solutions, websites, apps, custom software, and cloud DevOps — founder-led delivery by Bitcraftly.',
  path: ROUTES.services,
  keywords: [
    'Bitcraftly services',
    'AI solutions India',
    'Next.js website development',
    'SaaS development',
    'custom software Delhi NCR',
  ],
});

export default function ServicesPage() {
  return <ServicesLandingPage />;
}
