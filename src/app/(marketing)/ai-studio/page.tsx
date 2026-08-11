import type { Metadata } from 'next';
import { ROUTES } from '@/constants/navigation';
import { AiStudioLandingPage, AI_STUDIO_LANDING_META } from '@/features/ai-studio';
import { createPageMetadata } from '@/lib/seo/createPageMetadata';

export const metadata: Metadata = createPageMetadata({
  title: AI_STUDIO_LANDING_META.title,
  description: AI_STUDIO_LANDING_META.description,
  path: ROUTES.aiStudio,
  keywords: ['Bitcraftly AI Studio', 'AI reels', 'content generation', 'AI workspace'],
});

export default function AiStudioRoutePage() {
  return <AiStudioLandingPage />;
}
