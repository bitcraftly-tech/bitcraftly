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
  const breadcrumbJsonLd = buildBreadcrumbListJsonLd(buildBlogBreadcrumbs(), pageUrl);

  return {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'CollectionPage',
        '@id': `${pageUrl}#webpage`,
        url: pageUrl,
        name: 'Blog | Bitcraftly',
        description:
          'Engineering and product insights on AI development, Next.js, React, web performance, and SEO from the Bitcraftly team.',
        inLanguage: 'en-IN',
        isPartOf: { '@id': WEBSITE_ID },
        publisher: { '@id': ORGANIZATION_ID },
        breadcrumb: { '@id': breadcrumbJsonLd['@id'] },
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
      breadcrumbJsonLd,
    ],
  };
}

export function buildBlogPostJsonLd(post: BlogPost) {
  const author = getBlogAuthorById(post.authorId);
  const category = getBlogCategoryById(post.categoryId);
  const url = getAbsoluteUrl(getBlogPostHref(post.slug));
  const breadcrumbs = buildBlogBreadcrumbs([{ label: post.title }]);
  const breadcrumbJsonLd = buildBreadcrumbListJsonLd(breadcrumbs, url);
  const webPageId = `${url}#webpage`;
  const articleId = `${url}#article`;

  return {
    '@context': 'https://schema.org',
    '@graph': [
      breadcrumbJsonLd,
      {
        '@type': 'WebPage',
        '@id': webPageId,
        url,
        name: post.title,
        description: post.seoDescription ?? post.description,
        inLanguage: 'en-IN',
        isPartOf: { '@id': WEBSITE_ID },
        publisher: { '@id': ORGANIZATION_ID },
        breadcrumb: { '@id': breadcrumbJsonLd['@id'] },
        mainEntity: { '@id': articleId },
      },
      {
        '@type': 'BlogPosting',
        '@id': articleId,
        headline: post.title,
        description: post.seoDescription ?? post.description,
        image: [getAbsoluteUrl(post.coverImage)],
        datePublished: post.publishedAt,
        dateModified: post.updatedAt ?? post.publishedAt,
        inLanguage: 'en-IN',
        author: {
          '@type': 'Person',
          name: author?.name ?? 'Bitcraftly',
          jobTitle: author?.role,
        },
        publisher: {
          '@id': ORGANIZATION_ID,
        },
        mainEntityOfPage: {
          '@id': webPageId,
        },
        articleSection: category?.label,
        keywords: post.tags.join(', '),
        url,
        isPartOf: { '@id': WEBSITE_ID },
      },
    ],
  };
}
