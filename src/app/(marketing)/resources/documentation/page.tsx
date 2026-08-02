import type { Metadata } from 'next';
import { getResourceTopicBySlug, ResourcesTopicPage } from '@/features/resources';
import { createPageMetadata } from '@/lib/seo/createPageMetadata';

const PATH = '/resources/documentation';
const content = getResourceTopicBySlug('documentation');

export const metadata: Metadata = createPageMetadata({
  title: content?.seoTitle ?? 'Documentation',
  description:
    content?.seoDescription ?? 'Technical references and implementation notes from Bitcraftly.',
  path: PATH,
});

export default function DocumentationPage() {
  if (!content) {
    return null;
  }

  return <ResourcesTopicPage content={content} />;
}
