import type { Metadata } from 'next';
import { SolutionsLandingPage } from '@/features/solutions';
import { ROUTES } from '@/constants/navigation';
import { createPageMetadata } from '@/lib/seo/createPageMetadata';

export const metadata: Metadata = createPageMetadata({
  title: 'Business & AI Solutions | Bitcraftly',
  description:
    'Bitcraftly builds CRM, ERP, CMS, SaaS, and AI workflow solutions — founder-led delivery with clear scope, dashboards, and measurable outcomes.',
  path: ROUTES.solutions,
  keywords: [
    'Bitcraftly solutions',
    'CRM ERP CMS SaaS',
    'AI automation solutions',
    'enterprise dashboards India',
    'workflow automation',
  ],
});

export default function SolutionsPage() {
  return <SolutionsLandingPage />;
}
