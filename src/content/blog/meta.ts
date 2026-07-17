import type { BlogAuthor, BlogCategory } from "./types";

export const BLOG_AUTHORS: readonly BlogAuthor[] = [
  {
    id: "sanjay-kr-singh",
    name: "Sanjay Kr. Singh",
    role: "Founder & Lead Engineer, Bitcraftly",
    avatarSrc: "/brand/icon.png",
  },
] as const;

export const BLOG_CATEGORIES: readonly BlogCategory[] = [
  {
    id: "ai-development",
    label: "AI Development",
    description:
      "Practical guidance on shipping AI features, assistants, and automation into real products.",
  },
  {
    id: "nextjs",
    label: "Next.js",
    description:
      "App Router patterns, Server Components, routing, and production Next.js architecture.",
  },
  {
    id: "react",
    label: "React",
    description:
      "Modern React 19 patterns, component design, and maintainable UI architecture.",
  },
  {
    id: "web-performance",
    label: "Web Performance",
    description:
      "Core Web Vitals, image strategy, and rendering decisions that keep sites fast.",
  },
  {
    id: "seo",
    label: "SEO",
    description:
      "Technical SEO for marketing sites — metadata, structured data, and crawlable architecture.",
  },
] as const;
