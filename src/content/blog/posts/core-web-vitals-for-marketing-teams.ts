import type { BlogPost } from "../types";

export const POST_WEB_PERFORMANCE: BlogPost = {
  slug: "core-web-vitals-for-marketing-teams",
  title: "Core Web Vitals for Marketing Teams",
  excerpt:
    "What LCP, INP, and CLS mean for conversion — and the engineering moves that improve them without redesigning the brand.",
  description:
    "A practical Core Web Vitals guide for marketing sites: image strategy, Server Components, and layout stability.",
  coverImage: "/portfolio-hero.webp",
  coverImageAlt: "Performance analytics dashboard representing Core Web Vitals",
  categoryId: "web-performance",
  tags: ["Performance", "LCP", "Core Web Vitals", "Images"],
  authorId: "sanjay-kr-singh",
  publishedAt: "2026-04-16",
  seoTitle: "Core Web Vitals for Marketing Teams | Bitcraftly Blog",
  seoDescription:
    "Improve LCP, INP, and CLS on marketing sites with WebP images, Server Components, and stable layouts — without a redesign.",
  body: [
    {
      type: "paragraph",
      text: "Marketing teams feel performance as bounce rate and conversion. Engineers feel it as LCP, INP, and CLS. The bridge is a short list of high-leverage fixes that protect brand design while making pages feel instant.",
    },
    {
      type: "heading",
      level: 2,
      id: "fix-lcp-first",
      text: "Fix LCP first",
    },
    {
      type: "paragraph",
      text: "Hero images are the usual LCP culprit. Serve modern formats (WebP/AVIF), size correctly, and avoid `unoptimized` unless you have a documented reason. Priority-load only the true LCP candidate.",
    },
    {
      type: "list",
      items: [
        "Compress marketing heroes to roughly 200–400KB where possible",
        "Use next/image with accurate sizes attributes",
        "Keep above-the-fold CSS lean — avoid shipping entire feature CSS kits unused",
      ],
    },
    {
      type: "heading",
      level: 2,
      id: "protect-inp",
      text: "Protect INP with smaller client islands",
    },
    {
      type: "paragraph",
      text: "Heavy client bundles delay interaction. Prefer Server Components for static sections and hydrate only filters, menus, and media players. Measure after shipping — not only in local demos.",
    },
    {
      type: "heading",
      level: 2,
      id: "stabilize-cls",
      text: "Stabilize CLS",
    },
    {
      type: "paragraph",
      text: "Reserve space for images and embeds. Avoid injecting late-loading banners above existing content. Font loading should use a consistent fallback metric strategy so text does not jump.",
    },
    {
      type: "callout",
      text: "Performance work is incomplete until you verify on production-like devices — not only on a plugged-in laptop with cache warm.",
    },
  ],
};
