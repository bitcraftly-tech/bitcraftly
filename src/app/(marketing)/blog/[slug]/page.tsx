import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { BlogPostDetailPage, getBlogPostHref } from '@/features/blog';
import { createPageMetadata } from '@/lib/seo/createPageMetadata';
import { getAllBlogSlugs, getBlogPostBySlug } from '@/content/blog';

interface BlogPostPageProps {
  params: Promise<{ slug: string }>;
}

export function generateStaticParams() {
  return getAllBlogSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: BlogPostPageProps): Promise<Metadata> {
  const { slug } = await params;
  const post = getBlogPostBySlug(slug);

  if (!post) {
    return createPageMetadata({
      title: 'Article not found',
      description: 'The requested blog article could not be found.',
      path: getBlogPostHref(slug),
    });
  }

  const base = createPageMetadata({
    title: post.seoTitle ?? post.title,
    description: post.seoDescription ?? post.description,
    path: getBlogPostHref(post.slug),
    keywords: [...post.tags],
    image: post.coverImage,
  });

  return {
    ...base,
    openGraph: {
      ...base.openGraph,
      type: 'article',
      publishedTime: post.publishedAt,
      modifiedTime: post.updatedAt ?? post.publishedAt,
      authors: [post.authorId],
      tags: [...post.tags],
    },
  };
}

export default async function BlogPostPage({ params }: BlogPostPageProps) {
  const { slug } = await params;
  const post = getBlogPostBySlug(slug);

  if (!post) {
    notFound();
  }

  return <BlogPostDetailPage post={post} />;
}
