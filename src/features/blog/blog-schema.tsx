import {
  getBlogAuthorById,
  getBlogCategoryById,
  type BlogPost,
  type BlogPostSummary,
} from '@/content/blog';
import { ROUTES } from '@/constants/navigation';
import { buildBlogBreadcrumbs } from '@/lib/seo/breadcrumbs';
import { buildBreadcrumbListJsonLd } from '@/lib/seo/json-ld-breadcrumbs';
import { ORGANIZATION_ID } from '@/lib/seo/organization';
import { getAbsoluteUrl } from '@/lib/seo/site';
import { WEBSITE_ID } from '@/lib/seo/website';
import { getBlogPostHref } from './blog.utils';

export function buildBlogListingJsonLd(posts: readonly BlogPostSummary[]) {
  const pageUrl = getAbsoluteUrl(ROUTES.blog);

  return {
    '@context': 'https://schema.org',
    '@graph': [
      buildBreadcrumbListJsonLd(buildBlogBreadcrumbs(), pageUrl),
      {
        '@type': 'CollectionPage',
        '@id': `${pageUrl}#webpage`,
        url: pageUrl,
        name: 'Bitcraftly Blog',
        description:
          'Engineering and product insights on AI, Next.js, React, performance, and SEO from the Bitcraftly team.',
        isPartOf: { '@id': WEBSITE_ID },
        mainEntity: {
          '@type': 'ItemList',
          itemListElement: posts.map((post, index) => ({
            '@type': 'ListItem',
            position: index + 1,
            url: getAbsoluteUrl(getBlogPostHref(post.slug)),
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
  const url = getAbsoluteUrl(getBlogPostHref(post.slug));
  const breadcrumbs = buildBlogBreadcrumbs([{ label: post.title }]);

  return {
    '@context': 'https://schema.org',
    '@graph': [
      buildBreadcrumbListJsonLd(breadcrumbs, url),
      {
        '@type': 'BlogPosting',
        '@id': `${url}#article`,
        headline: post.title,
        description: post.seoDescription ?? post.description,
        image: [getAbsoluteUrl(post.coverImage)],
        datePublished: post.publishedAt,
        dateModified: post.updatedAt ?? post.publishedAt,
        author: {
          '@type': 'Person',
          name: author?.name ?? 'Bitcraftly',
          jobTitle: author?.role,
        },
        publisher: {
          '@id': ORGANIZATION_ID,
        },
        mainEntityOfPage: {
          '@type': 'WebPage',
          '@id': url,
        },
        articleSection: category?.label,
        keywords: post.tags.join(', '),
        url,
        isPartOf: { '@id': WEBSITE_ID },
      },
    ],
  };
}
