import { BLOG_POSTS, getBlogAuthorById } from '@/content/blog';
import { ROUTES } from '@/constants/navigation';
import { getBlogPostHref } from '@/features/blog/blog.utils';
import { getAbsoluteUrl } from '@/lib/seo/site';

export const dynamic = 'force-static';

const BLOG_FEED_DESCRIPTION =
  'Engineering and product insights on AI development, Next.js, React, web performance, and SEO from the Bitcraftly team.';

function escapeXml(value: string): string {
  return value
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;')
    .replaceAll("'", '&apos;');
}

function toRfc822(isoDate: string): string {
  return new Date(`${isoDate}T00:00:00.000Z`).toUTCString();
}

function buildRssFeed(): string {
  const blogUrl = getAbsoluteUrl(ROUTES.blog);
  const feedUrl = getAbsoluteUrl('/feed.xml');
  const newest = BLOG_POSTS[0];
  const lastBuildDate = newest
    ? toRfc822(newest.updatedAt ?? newest.publishedAt)
    : new Date().toUTCString();

  const items = BLOG_POSTS.map((post) => {
    const url = getAbsoluteUrl(getBlogPostHref(post.slug));
    const author = getBlogAuthorById(post.authorId);
    const description = post.seoDescription ?? post.excerpt;

    return [
      '    <item>',
      `      <title>${escapeXml(post.title)}</title>`,
      `      <link>${escapeXml(url)}</link>`,
      `      <guid isPermaLink="true">${escapeXml(url)}</guid>`,
      `      <pubDate>${toRfc822(post.publishedAt)}</pubDate>`,
      `      <description>${escapeXml(description)}</description>`,
      author
        ? `      <author>${escapeXml(`hello@bitcraftly.com (${author.name})`)}</author>`
        : null,
      '    </item>',
    ]
      .filter((line): line is string => line !== null)
      .join('\n');
  }).join('\n');

  return `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title>${escapeXml('Bitcraftly Blog')}</title>
    <link>${escapeXml(blogUrl)}</link>
    <description>${escapeXml(BLOG_FEED_DESCRIPTION)}</description>
    <language>en-IN</language>
    <lastBuildDate>${lastBuildDate}</lastBuildDate>
    <atom:link href="${escapeXml(feedUrl)}" rel="self" type="application/rss+xml"/>
${items}
  </channel>
</rss>
`;
}

export function GET(): Response {
  return new Response(buildRssFeed(), {
    status: 200,
    headers: {
      'Content-Type': 'application/rss+xml; charset=utf-8',
      'Cache-Control': 'public, max-age=3600, s-maxage=3600',
    },
  });
}
