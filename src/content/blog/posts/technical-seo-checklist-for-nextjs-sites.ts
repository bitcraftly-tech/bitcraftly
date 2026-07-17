import type { BlogPost } from "../types";

export const POST_TECHNICAL_SEO: BlogPost = {
  slug: "technical-seo-checklist-for-nextjs-sites",
  title: "Technical SEO Checklist for Next.js Sites",
  excerpt:
    "Metadata, canonicals, structured data, and crawlable architecture — the SEO foundation every App Router site needs.",
  description:
    "A technical SEO checklist for Next.js App Router sites covering metadata, Open Graph, JSON-LD, sitemaps, and breadcrumbs.",
  coverImage: "/industries-hero.webp",
  coverImageAlt: "Search visibility and structured content representation",
  categoryId: "seo",
  tags: ["SEO", "Metadata", "JSON-LD", "Next.js"],
  authorId: "sanjay-kr-singh",
  publishedAt: "2026-03-24",
  seoTitle: "Technical SEO Checklist for Next.js Sites | Bitcraftly Blog",
  seoDescription:
    "Ship crawlable Next.js pages with dynamic metadata, Open Graph, Twitter cards, JSON-LD, canonicals, and breadcrumb schema.",
  body: [
    {
      type: "paragraph",
      text: "Content quality still wins, but technical SEO decides whether search engines can understand and trust your pages. On App Router sites, most of that foundation is code: metadata APIs, structured data, and clean URLs.",
    },
    {
      type: "heading",
      level: 2,
      id: "metadata-api",
      text: "Use the Metadata API consistently",
    },
    {
      type: "paragraph",
      text: "Every indexable route should define title, description, canonical, Open Graph, and Twitter fields. Share a helper so pages do not drift. Detail routes should use `generateMetadata` with real content — never placeholder copy that stays indexed.",
    },
    {
      type: "heading",
      level: 2,
      id: "structured-data",
      text: "Ship structured data that matches the page",
    },
    {
      type: "list",
      items: [
        "BreadcrumbList on nested marketing and content pages",
        "Article or BlogPosting on editorial detail pages",
        "CollectionPage or ItemList on listing pages",
        "Keep JSON-LD in sync with visible content",
      ],
    },
    {
      type: "heading",
      level: 2,
      id: "crawl-surface",
      text: "Keep the crawl surface honest",
    },
    {
      type: "paragraph",
      text: "Maintain `sitemap.ts` and `robots.ts`. Do not index thin scaffolds. Prefer one canonical URL per piece of content, and avoid duplicate hubs that rewrite the same story.",
    },
    {
      type: "callout",
      text: "SEO is an engineering quality gate — treat metadata and schema failures like broken builds, not optional polish.",
    },
    {
      type: "heading",
      level: 2,
      id: "checklist",
      text: "Release checklist",
    },
    {
      type: "list",
      items: [
        "Unique title and description per page",
        "Canonical path set",
        "OG/Twitter image with correct dimensions",
        "JSON-LD validated against visible content",
        "Internal links from listing → detail and related posts",
      ],
    },
  ],
};
