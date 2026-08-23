import type { Metadata } from 'next';
import { IndustriesLandingPage } from '@/features/industries';
import { ROUTES } from '@/constants/navigation';
import { createPageMetadata } from '@/lib/seo/createPageMetadata';

export const metadata: Metadata = createPageMetadata({
  title: 'Industry Digital Systems | Bitcraftly',
  description:
    'Bitcraftly designs and builds digital systems across healthcare, education, retail, finance, logistics, SaaS, and more — solving operational challenges with measurable results.',
  path: ROUTES.industries,
  keywords: [
    'industry software development',
    'healthcare digital platforms',
    'fintech engineering',
    'retail ecommerce development',
    'Bitcraftly industries',
  ],
});

export default function IndustriesPage() {
  return <IndustriesLandingPage />;
}
