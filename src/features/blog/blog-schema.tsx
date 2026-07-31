import {
  getBlogAuthorById,
  getBlogCategoryById,
  type BlogPost,
  type BlogPostSummary,
} from '@/content/blog';
import { ROUTES } from '@/constants/navigation';
import { getBlogPostHref } from './blog.utils';

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL?.replace(/\/$/, '') ?? 'https://bitcraftly.com';

function absolute(path: string): string {
  if (path.startsWith('http')) return path;
  return `${SITE_URL}${path.startsWith('/') ? path : `/${path}`}`;
}

export function buildBlogListingJsonLd(posts: readonly BlogPostSummary[]) {
  return {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'BreadcrumbList',
        itemListElement: [
          {
            '@type': 'ListItem',
            position: 1,
            name: 'Home',
            item: `${SITE_URL}/`,
          },
          {
            '@type': 'ListItem',
            position: 2,
            name: 'Blog',
            item: absolute(ROUTES.blog),
          },
        ],
      },
      {
        '@type': 'CollectionPage',
        '@id': `${absolute(ROUTES.blog)}#webpage`,
        url: absolute(ROUTES.blog),
        name: 'Bitcraftly Blog',
        description:
          'Engineering and product insights on AI, Next.js, React, performance, and SEO from the Bitcraftly team.',
        isPartOf: { '@id': `${SITE_URL}/#website` },
        mainEntity: {
          '@type': 'ItemList',
          itemListElement: posts.map((post, index) => ({
            '@type': 'ListItem',
            position: index + 1,
            url: absolute(getBlogPostHref(post.slug)),
            name: post.title,
          })),
        },
      },
    ],
  };
}

export function buildBlogPostJsonLd(post: BlogPost) {
  const author = getBlogAuthorById(post.authorId);
  const category = getBlogCategoryById(post.categoryId);
  const url = absolute(getBlogPostHref(post.slug));

  return {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'BreadcrumbList',
        itemListElement: [
          {
            '@type': 'ListItem',
            position: 1,
            name: 'Home',
            item: `${SITE_URL}/`,
          },
          {
            '@type': 'ListItem',
            position: 2,
            name: 'Blog',
            item: absolute(ROUTES.blog),
          },
          {
            '@type': 'ListItem',
            position: 3,
            name: post.title,
            item: url,
          },
        ],
      },
      {
        '@type': 'BlogPosting',
        '@id': `${url}#article`,
        headline: post.title,
        description: post.seoDescription ?? post.description,
        image: [absolute(post.coverImage)],
        datePublished: post.publishedAt,
        dateModified: post.updatedAt ?? post.publishedAt,
        author: {
          '@type': 'Person',
          name: author?.name ?? 'Bitcraftly',
          jobTitle: author?.role,
        },
        publisher: {
          '@type': 'Organization',
          name: 'Bitcraftly',
          logo: {
            '@type': 'ImageObject',
            url: absolute('/brand/icon.png'),
          },
        },
        mainEntityOfPage: {
          '@type': 'WebPage',
          '@id': url,
        },
        articleSection: category?.label,
        keywords: post.tags.join(', '),
        url,
      },
    ],
  };
}
