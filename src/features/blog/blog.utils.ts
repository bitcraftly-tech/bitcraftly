import type { BlogBlock, BlogPost } from '@/content/blog';

const WORDS_PER_MINUTE = 220;

export function estimateReadingTimeMinutes(body: readonly BlogBlock[]): number {
  const text = body
    .map((block) => {
      switch (block.type) {
        case 'paragraph':
        case 'callout':
        case 'heading':
          return block.text;
        case 'list':
          return block.items.join(' ');
        default:
          return '';
      }
    })
    .join(' ');

  const words = text.trim().split(/\s+/).filter(Boolean).length;

  return Math.max(1, Math.ceil(words / WORDS_PER_MINUTE));
}

export function formatBlogDate(isoDate: string): string {
  const date = new Date(`${isoDate}T00:00:00.000Z`);
  return new Intl.DateTimeFormat('en-IN', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
    timeZone: 'UTC',
  }).format(date);
}

export function getPostHeadingIds(post: BlogPost): readonly {
  id: string;
  text: string;
  level: 2 | 3;
}[] {
  return post.body
    .filter((block) => block.type === 'heading')
    .map((block) => ({
      id: block.id,
      text: block.text,
      level: block.level,
    }));
}

export function getBlogPostHref(slug: string): string {
  return `/blog/${slug}`;
}
