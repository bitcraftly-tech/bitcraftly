import type { Metadata } from 'next';
import { ROUTES } from '@/constants/navigation';
import { PressLandingPage, PRESS_LANDING_META } from '@/features/press';
import { createPageMetadata } from '@/lib/seo/createPageMetadata';

export const metadata: Metadata = createPageMetadata({
  title: PRESS_LANDING_META.title,
  description: PRESS_LANDING_META.description,
  path: ROUTES.press,
});

export default function PressPage() {
  return <PressLandingPage />;
}
