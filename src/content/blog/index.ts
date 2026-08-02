import { BLOG_AUTHORS, BLOG_CATEGORIES } from './meta';
import { POST_WEB_PERFORMANCE } from './posts/core-web-vitals-for-marketing-teams';
import { POST_NEXTJS_APP_ROUTER } from './posts/nextjs-app-router-architecture-for-marketing-sites';
import { POST_REACT_COMPOSITION } from './posts/react-composition-patterns-that-age-well';
import { POST_AI_PRODUCT_FEATURES } from './posts/shipping-ai-product-features-without-chaos';
import { POST_TECHNICAL_SEO } from './posts/technical-seo-checklist-for-nextjs-sites';
import type { BlogPost } from './types';

export type {
  BlogAuthor,
  BlogBlock,
  BlogCategory,
  BlogCategoryId,
  BlogListQuery,
  BlogListResult,
  BlogPost,
  BlogPostSummary,
} from './types';

export { BLOG_AUTHORS, BLOG_CATEGORIES } from './meta';

/** Canonical ordered catalog — newest first. */
export const BLOG_POSTS: readonly BlogPost[] = [
  POST_AI_PRODUCT_FEATURES,
  POST_NEXTJS_APP_ROUTER,
  POST_REACT_COMPOSITION,
  POST_WEB_PERFORMANCE,
  POST_TECHNICAL_SEO,
] as const;

export function getBlogPostBySlug(slug: string): BlogPost | undefined {
  return BLOG_POSTS.find((post) => post.slug === slug);
}

export function getBlogAuthorById(authorId: string) {
  return BLOG_AUTHORS.find((author) => author.id === authorId);
}

export function getBlogCategoryById(categoryId: string) {
  return BLOG_CATEGORIES.find((category) => category.id === categoryId);
}

export function getAllBlogSlugs(): readonly string[] {
  return BLOG_POSTS.map((post) => post.slug);
}

export function getAllBlogTags(): readonly string[] {
  const tags = new Set<string>();
  for (const post of BLOG_POSTS) {
    for (const tag of post.tags) {
      tags.add(tag);
    }
  }
  return [...tags].sort((a, b) => a.localeCompare(b));
}
