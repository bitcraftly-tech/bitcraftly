import { describe, expect, it } from 'vitest';
import { BLOG_POSTS } from '@/content/blog';
import { ORGANIZATION_ID } from '@/lib/seo/organization';
import { getAbsoluteUrl } from '@/lib/seo/site';
import { WEBSITE_ID } from '@/lib/seo/website';
import { buildBlogListingJsonLd, buildBlogPostJsonLd } from './blog-schema';
import { getBlogPostHref } from './blog.utils';

type JsonLdNode = Record<string, unknown> & { '@type'?: string; '@id'?: string };

function graphNodes(data: unknown): JsonLdNode[] {
  const record = data as { '@graph': JsonLdNode[] };
  return record['@graph'];
}

describe('blog JSON-LD', () => {
  it('builds a CollectionPage listing graph without BlogPosting nodes', () => {
    const posts = BLOG_POSTS.slice(0, 2).map((post) => ({
      slug: post.slug,
      title: post.title,
      excerpt: post.excerpt,
      coverImage: post.coverImage,
      coverImageAlt: post.coverImageAlt,
      categoryId: post.categoryId,
      tags: post.tags,
      authorId: post.authorId,
      publishedAt: post.publishedAt,
      readingTimeMinutes: 1,
      featured: post.featured,
    }));
    const nodes = graphNodes(buildBlogListingJsonLd(posts));
    const collection = nodes.find((node) => node['@type'] === 'CollectionPage');
    const breadcrumb = nodes.find((node) => node['@type'] === 'BreadcrumbList');
    const pageUrl = getAbsoluteUrl('/blog');
    const mainEntity = collection?.mainEntity as { itemListElement: unknown[] } | undefined;

    expect(collection).toMatchObject({
      url: pageUrl,
      inLanguage: 'en-IN',
      publisher: { '@id': ORGANIZATION_ID },
      isPartOf: { '@id': WEBSITE_ID },
      breadcrumb: { '@id': `${pageUrl}#breadcrumb` },
    });
    expect(breadcrumb?.['@id']).toBe(`${pageUrl}#breadcrumb`);
    expect(mainEntity?.itemListElement).toHaveLength(2);
    expect(nodes.some((node) => node['@type'] === 'BlogPosting')).toBe(false);
    expect(nodes.some((node) => node['@type'] === 'Organization')).toBe(false);
    expect(nodes.some((node) => node['@type'] === 'WebSite')).toBe(false);
  });

  it('preserves real BlogPosting dates and adds inLanguage', () => {
    const post = BLOG_POSTS[0];
    if (!post) {
      throw new Error('Expected at least one blog post');
    }
    const nodes = graphNodes(buildBlogPostJsonLd(post));
    const article = nodes.find((node) => node['@type'] === 'BlogPosting');
    const webPage = nodes.find((node) => node['@type'] === 'WebPage');
    const url = getAbsoluteUrl(getBlogPostHref(post.slug));

    expect(article).toMatchObject({
      datePublished: post.publishedAt,
      dateModified: post.updatedAt ?? post.publishedAt,
      inLanguage: 'en-IN',
      publisher: { '@id': ORGANIZATION_ID },
      isPartOf: { '@id': WEBSITE_ID },
      mainEntityOfPage: { '@id': `${url}#webpage` },
    });
    expect(webPage).toMatchObject({
      '@id': `${url}#webpage`,
      url,
      inLanguage: 'en-IN',
      publisher: { '@id': ORGANIZATION_ID },
      isPartOf: { '@id': WEBSITE_ID },
    });
    expect(nodes.some((node) => node['@type'] === 'Organization')).toBe(false);
    expect(nodes.some((node) => node['@type'] === 'WebSite')).toBe(false);
  });
});
