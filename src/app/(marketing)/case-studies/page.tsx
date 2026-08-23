import type { Metadata } from 'next';
import { CaseStudiesLandingPage } from '@/features/case-studies';
import { ROUTES } from '@/constants/navigation';
import { createPageMetadata } from '@/lib/seo/createPageMetadata';

export const metadata: Metadata = createPageMetadata({
  title: 'Case Studies | Bitcraftly',
  description:
    'Bitcraftly case studies approved for public publication. Stories are listed here after review.',
  path: ROUTES.caseStudies,
});

export default function CaseStudiesPage() {
  return <CaseStudiesLandingPage />;
}
