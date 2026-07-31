import type { Metadata } from 'next';
import { CareersLandingPage } from '@/features/careers';
import { ROUTES } from '@/constants/navigation';
import { createPageMetadata } from '@/lib/seo/createPageMetadata';

export const metadata: Metadata = createPageMetadata({
  title: 'Careers at Bitcraftly',
  description:
    'Join Bitcraftly — remote-first roles in React, Next.js, Python, design, and AI. Founder-led hiring.',
  path: ROUTES.careers,
});

export default function CareersPage() {
  return <CareersLandingPage />;
}
