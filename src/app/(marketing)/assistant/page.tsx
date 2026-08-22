import type { Metadata } from 'next';
import { AiAssistantPage, AI_ASSISTANT_PAGE_META } from '@/features/ai-assistant';
import { createPageMetadata } from '@/lib/seo/createPageMetadata';
import { createNoIndexMetadata } from '@/lib/seo/noindex-metadata';

export const metadata: Metadata = createNoIndexMetadata(
  createPageMetadata({
    title: AI_ASSISTANT_PAGE_META.title,
    description: AI_ASSISTANT_PAGE_META.description,
    path: AI_ASSISTANT_PAGE_META.path,
    keywords: ['Bitcraftly AI', 'AI assistant', 'chat', 'pricing questions', 'services'],
  }),
);

export default function AssistantRoutePage() {
  return <AiAssistantPage />;
}
