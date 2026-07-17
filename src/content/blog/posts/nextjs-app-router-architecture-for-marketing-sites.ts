import type { BlogPost } from "../types";

export const POST_NEXTJS_APP_ROUTER: BlogPost = {
  slug: "nextjs-app-router-architecture-for-marketing-sites",
  title: "Next.js App Router Architecture for Marketing Sites",
  excerpt:
    "How we structure App Router marketing platforms for thin routes, Server Components, and feature modules that scale.",
  description:
    "A practical Next.js 16 App Router architecture for enterprise marketing sites — feature folders, thin page files, and RSC-first rendering.",
  coverImage: "/solutions-hero.webp",
  coverImageAlt: "Modern web application architecture illustration",
  categoryId: "nextjs",
  tags: ["Next.js", "App Router", "Architecture", "RSC"],
  authorId: "sanjay-kr-singh",
  publishedAt: "2026-05-28",
  featured: true,
  seoTitle: "Next.js App Router Architecture for Marketing Sites | Bitcraftly",
  seoDescription:
    "Learn Bitcraftly’s App Router patterns: thin routes, feature modules, Server Components, and SEO-friendly marketing pages.",
  body: [
    {
      type: "paragraph",
      text: "Marketing sites grow messy when every page becomes a one-off layout. With Next.js App Router, the opportunity is clearer: keep route files thin, push business UI into feature modules, and default to Server Components so JavaScript only ships where interaction requires it.",
    },
    {
      type: "heading",
      level: 2,
      id: "thin-routes",
      text: "Thin routes, thick features",
    },
    {
      type: "paragraph",
      text: "A `page.tsx` should mostly compose metadata and a feature landing component. Content catalogs, filtering logic, and section composition live under `src/features/*`. That boundary keeps routing stable while product pages evolve.",
    },
    {
      type: "list",
      items: [
        "Route files: metadata, params, compose feature pages",
        "Feature modules: UI, content, schemas, domain helpers",
        "Shared UI: primitives and patterns reused across pages",
      ],
    },
    {
      type: "heading",
      level: 2,
      id: "server-first",
      text: "Server Components by default",
    },
    {
      type: "paragraph",
      text: "Landing heroes, article bodies, and SEO schemas rarely need client state. Reserve Client Components for menus, filters, carousels, and forms. The result is faster first paint and simpler accessibility for static content.",
    },
    {
      type: "heading",
      level: 2,
      id: "seo-colocated",
      text: "Colocate SEO with the feature",
    },
    {
      type: "paragraph",
      text: "JSON-LD builders and breadcrumb helpers belong next to the feature they describe. Shared utilities like `createPageMetadata` stay in `src/lib/seo`, while page-specific graphs live with the module.",
    },
    {
      type: "callout",
      text: "If a page needs interactivity, extract the smallest client island — do not convert the entire landing shell to a Client Component.",
    },
    {
      type: "heading",
      level: 2,
      id: "scaling-checklist",
      text: "Scaling checklist",
    },
    {
      type: "list",
      items: [
        "One feature folder per product surface",
        "Shared chrome extracted from protected homepage modules",
        "Static params for known slugs",
        "Sitemap entries generated from the same content source",
      ],
    },
  ],
};
