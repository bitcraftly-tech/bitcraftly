import type { Metadata } from 'next';
import {
  BlogLandingPage,
  BLOG_LANDING_META,
  isBlogCategoryId,
  isBlogListingIndexable,
} from '@/features/blog';
import { createPageMetadata } from '@/lib/seo/createPageMetadata';
import { createNoIndexMetadata } from '@/lib/seo/noindex-metadata';
import { getAbsoluteUrl } from '@/lib/seo/site';

interface BlogPageProps {
  searchParams: Promise<{
    category?: string;
    tag?: string;
    q?: string;
    page?: string;
  }>;
}

function withBlogRssAlternate(metadata: Metadata): Metadata {
  return {
    ...metadata,
    alternates: {
      ...metadata.alternates,
      types: {
        'application/rss+xml': getAbsoluteUrl('/feed.xml'),
      },
    },
  };
}

export async function generateMetadata({ searchParams }: BlogPageProps): Promise<Metadata> {
  const params = await searchParams;
  const listingMetadata = withBlogRssAlternate(createPageMetadata(BLOG_LANDING_META));

  if (!isBlogListingIndexable(params)) {
    return createNoIndexMetadata(listingMetadata);
  }

  return listingMetadata;
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
