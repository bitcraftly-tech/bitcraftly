import type { BlogPost } from "../types";

export const POST_REACT_COMPOSITION: BlogPost = {
  slug: "react-composition-patterns-that-age-well",
  title: "React Composition Patterns That Age Well",
  excerpt:
    "Prefer composition over prop sprawl — how we keep React 19 UI maintainable across marketing and product surfaces.",
  description:
    "Composition-first React patterns for enterprise frontends: slots, thin wrappers, and boundaries that prevent prop drilling.",
  coverImage: "/services-hero.webp",
  coverImageAlt: "Component composition diagram for modern React applications",
  categoryId: "react",
  tags: ["React", "Components", "Design Systems", "Maintainability"],
  authorId: "sanjay-kr-singh",
  publishedAt: "2026-05-05",
  seoTitle: "React Composition Patterns That Age Well | Bitcraftly Blog",
  seoDescription:
    "Practical React composition patterns for scalable UI — children slots, wrappers, and avoiding unnecessary client boundaries.",
  body: [
    {
      type: "paragraph",
      text: "Large React codebases degrade when every variation becomes another boolean prop. Composition keeps components focused: parents decide structure, children decide content, and shared primitives stay boring on purpose.",
    },
    {
      type: "heading",
      level: 2,
      id: "compose-dont-configure",
      text: "Compose, don’t over-configure",
    },
    {
      type: "paragraph",
      text: "If a component needs more than a handful of behavioral flags, it is usually two components wearing one name. Split by responsibility — hero media, CTA group, trust row — then compose them in a page-level section.",
    },
    {
      type: "list",
      items: [
        "Prefer children and named slots over endless render props",
        "Keep leaf primitives presentational and typed",
        "Lift interaction only as far as the nearest interactive boundary",
      ],
    },
    {
      type: "heading",
      level: 2,
      id: "server-and-client-boundaries",
      text: "Respect Server and Client boundaries",
    },
    {
      type: "paragraph",
      text: "In React 19 with Next.js, composition also means boundary design. Pass serializable props across the server/client edge. Do not drag a whole page into the client bundle for a single accordion.",
    },
    {
      type: "callout",
      text: "A reusable pattern library should make the right default easy: semantic HTML first, ARIA only when required, and styling via tokens — not one-off hex values.",
    },
    {
      type: "heading",
      level: 2,
      id: "api-stability",
      text: "Stabilize APIs before you scale them",
    },
    {
      type: "paragraph",
      text: "Export intentional public surfaces from feature barrels. Internal helpers stay private. When marketing and product share a pattern, promote it to `components/patterns` instead of importing across features.",
    },
  ],
};
