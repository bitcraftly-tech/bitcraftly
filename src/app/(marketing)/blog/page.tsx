import type { Metadata } from 'next';
import { BlogLandingPage, BLOG_LANDING_META, isBlogCategoryId } from '@/features/blog';
import { createPageMetadata } from '@/lib/seo/createPageMetadata';
import { getAbsoluteUrl } from '@/lib/seo/site';

const blogPageMetadata = createPageMetadata(BLOG_LANDING_META);

export const metadata: Metadata = {
  ...blogPageMetadata,
  alternates: {
    ...blogPageMetadata.alternates,
    types: {
      'application/rss+xml': getAbsoluteUrl('/feed.xml'),
    },
  },
};

interface BlogPageProps {
  searchParams: Promise<{
    category?: string;
    tag?: string;
    q?: string;
    page?: string;
  }>;
}

export default async function BlogPage({ searchParams }: BlogPageProps) {
  const params = await searchParams;
  const categoryParam = params.category;
  const category = categoryParam && isBlogCategoryId(categoryParam) ? categoryParam : 'all';
  const page = Number.parseInt(params.page ?? '1', 10);

  return (
    <BlogLandingPage
      category={category}
      tag={params.tag}
      q={params.q}
      page={Number.isFinite(page) && page > 0 ? page : 1}
    />
  );
}
