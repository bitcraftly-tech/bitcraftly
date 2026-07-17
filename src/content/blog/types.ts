/**
 * Blog domain types — content + feature shared contract.
 */

export type BlogCategoryId =
  | "ai-development"
  | "nextjs"
  | "react"
  | "web-performance"
  | "seo";

export type BlogBlock =
  | { readonly type: "paragraph"; readonly text: string }
  | {
      readonly type: "heading";
      readonly level: 2 | 3;
      readonly id: string;
      readonly text: string;
    }
  | { readonly type: "list"; readonly items: readonly string[] }
  | { readonly type: "callout"; readonly text: string };

export interface BlogAuthor {
  readonly id: string;
  readonly name: string;
  readonly role: string;
  readonly avatarSrc: string;
}

export interface BlogCategory {
  readonly id: BlogCategoryId;
  readonly label: string;
  readonly description: string;
}

export interface BlogPost {
  readonly slug: string;
  readonly title: string;
  readonly excerpt: string;
  readonly description: string;
  readonly coverImage: string;
  readonly coverImageAlt: string;
  readonly categoryId: BlogCategoryId;
  readonly tags: readonly string[];
  readonly authorId: string;
  readonly publishedAt: string;
  readonly updatedAt?: string;
  readonly featured?: boolean;
  readonly body: readonly BlogBlock[];
  readonly seoTitle?: string;
  readonly seoDescription?: string;
}

export interface BlogPostSummary {
  readonly slug: string;
  readonly title: string;
  readonly excerpt: string;
  readonly coverImage: string;
  readonly coverImageAlt: string;
  readonly categoryId: BlogCategoryId;
  readonly tags: readonly string[];
  readonly authorId: string;
  readonly publishedAt: string;
  readonly readingTimeMinutes: number;
  readonly featured?: boolean;
}

export interface BlogListQuery {
  readonly page?: number;
  readonly pageSize?: number;
  readonly category?: BlogCategoryId | "all";
  readonly tag?: string;
  readonly q?: string;
}

export interface BlogListResult {
  readonly items: readonly BlogPostSummary[];
  readonly total: number;
  readonly page: number;
  readonly pageSize: number;
  readonly totalPages: number;
}
