import type { Metadata } from 'next';
import { TrustCenterLandingPage, TRUST_META } from '@/features/trust';
import { createPageMetadata } from '@/lib/seo/createPageMetadata';

export const metadata: Metadata = createPageMetadata({
  title: TRUST_META.title,
  description: TRUST_META.description,
  path: TRUST_META.path,
});

export default function TrustCenterPage() {
  return <TrustCenterLandingPage />;
}
