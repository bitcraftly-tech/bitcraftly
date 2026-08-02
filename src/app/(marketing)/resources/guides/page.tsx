import type { Metadata } from 'next';
import { getResourceTopicBySlug, ResourcesTopicPage } from '@/features/resources';
import { createPageMetadata } from '@/lib/seo/createPageMetadata';

const PATH = '/resources/guides';
const content = getResourceTopicBySlug('guides');

export const metadata: Metadata = createPageMetadata({
  title: content?.seoTitle ?? 'Guides',
  description: content?.seoDescription ?? 'Practical playbooks for product and engineering teams.',
  path: PATH,
});

export default function GuidesPage() {
  if (!content) {
    return null;
  }

  return <ResourcesTopicPage content={content} />;
}
