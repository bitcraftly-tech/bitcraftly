import {
  BLOG_POSTS,
  getBlogCategoryById,
  type BlogCategoryId,
  type BlogListQuery,
  type BlogListResult,
  type BlogPost,
  type BlogPostSummary,
} from "@/content/blog";
import { estimateReadingTimeMinutes } from "./blog.utils";

const DEFAULT_PAGE_SIZE = 9;

function toSummary(post: BlogPost): BlogPostSummary {
  return {
    slug: post.slug,
    title: post.title,
    excerpt: post.excerpt,
    coverImage: post.coverImage,
    coverImageAlt: post.coverImageAlt,
    categoryId: post.categoryId,
    tags: post.tags,
    authorId: post.authorId,
    publishedAt: post.publishedAt,
    readingTimeMinutes: estimateReadingTimeMinutes(post.body),
    featured: post.featured,
  };
}

function matchesQuery(post: BlogPost, q: string): boolean {
  const haystack = [
    post.title,
    post.excerpt,
    post.description,
    post.tags.join(" "),
    getBlogCategoryById(post.categoryId)?.label ?? "",
  ]
    .join(" ")
    .toLowerCase();

  return haystack.includes(q.toLowerCase());
}

/**
 * Search / filter / pagination-ready listing query.
 * Safe to call from Server Components with URL searchParams.
 */
export function queryBlogPosts(query: BlogListQuery = {}): BlogListResult {
  const pageSize = Math.max(1, query.pageSize ?? DEFAULT_PAGE_SIZE);
  const page = Math.max(1, query.page ?? 1);
  const category = query.category ?? "all";
  const tag = query.tag?.trim();
  const q = query.q?.trim();

  let filtered: BlogPost[] = [...BLOG_POSTS];

  if (category !== "all") {
    filtered = filtered.filter((post) => post.categoryId === category);
  }

  if (tag) {
    const normalized = tag.toLowerCase();
    filtered = filtered.filter((post) =>
      post.tags.some((item) => item.toLowerCase() === normalized),
    );
  }

  if (q) {
    filtered = filtered.filter((post) => matchesQuery(post, q));
  }

  const total = filtered.length;
  const totalPages = Math.max(1, Math.ceil(total / pageSize));
  const safePage = Math.min(page, totalPages);
  const start = (safePage - 1) * pageSize;
  const items = filtered.slice(start, start + pageSize).map(toSummary);

  return {
    items,
    total,
    page: safePage,
    pageSize,
    totalPages,
  };
}

export function getRelatedPosts(
  post: BlogPost,
  limit = 3,
): readonly BlogPostSummary[] {
  const scored = BLOG_POSTS.filter((candidate) => candidate.slug !== post.slug)
    .map((candidate) => {
      let score = 0;
      if (candidate.categoryId === post.categoryId) score += 3;
      score += candidate.tags.filter((tag) => post.tags.includes(tag)).length;
      return { candidate, score };
    })
    .filter((entry) => entry.score > 0)
    .sort((a, b) => {
      if (b.score !== a.score) return b.score - a.score;
      return b.candidate.publishedAt.localeCompare(a.candidate.publishedAt);
    });

  const related = scored.slice(0, limit).map((entry) => toSummary(entry.candidate));

  if (related.length >= limit) {
    return related;
  }

  const fallback = BLOG_POSTS.filter(
    (candidate) =>
      candidate.slug !== post.slug &&
      !related.some((item) => item.slug === candidate.slug),
  )
    .slice(0, limit - related.length)
    .map(toSummary);

  return [...related, ...fallback];
}

export function getFeaturedPosts(limit = 2): readonly BlogPostSummary[] {
  return BLOG_POSTS.filter((post) => post.featured)
    .slice(0, limit)
    .map(toSummary);
}

export function isBlogCategoryId(value: string): value is BlogCategoryId {
  return (
    value === "ai-development" ||
    value === "nextjs" ||
    value === "react" ||
    value === "web-performance" ||
    value === "seo"
  );
}

export { DEFAULT_PAGE_SIZE };
