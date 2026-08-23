import type { Metadata } from 'next';
import { ServicesLandingPage } from '@/features/services';
import { ROUTES } from '@/constants/navigation';
import { createPageMetadata } from '@/lib/seo/createPageMetadata';

export const metadata: Metadata = createPageMetadata({
  title: 'AI, Web & Software Development Services | Bitcraftly',
  description:
    'Bitcraftly builds AI systems, websites, web apps, mobile apps, and cloud infrastructure — clear scope, starting prices, and founder-led digital engineering.',
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
