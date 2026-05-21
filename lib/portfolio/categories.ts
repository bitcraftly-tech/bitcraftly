import type { PortfolioItem } from "@/lib/portfolioItems";

/** Showcase filter categories — 8 skill areas + all */
export type PortfolioCategoryId =
  | "all"
  | "react-projects"
  | "nextjs-projects"
  | "ai-powered"
  | "business-websites"
  | "dashboard-admin"
  | "landing-pages"
  | "startup-mvp"
  | "ui-systems";

export const PORTFOLIO_CATEGORIES: { id: PortfolioCategoryId; label: string; shortLabel: string }[] = [
  { id: "all", label: "All work", shortLabel: "All" },
  { id: "react-projects", label: "React.js", shortLabel: "React" },
  { id: "nextjs-projects", label: "Next.js", shortLabel: "Next.js" },
  { id: "ai-powered", label: "AI-powered", shortLabel: "AI" },
  { id: "business-websites", label: "Business websites", shortLabel: "Business" },
  { id: "dashboard-admin", label: "Admin dashboards", shortLabel: "Dashboard" },
  { id: "landing-pages", label: "Landing pages", shortLabel: "Landing" },
  { id: "startup-mvp", label: "Startup MVPs", shortLabel: "MVP" },
  { id: "ui-systems", label: "UI / UX systems", shortLabel: "UI systems" },
];

const hasTech = (item: PortfolioItem, pattern: RegExp) => item.techStack.some((t) => pattern.test(t));

const matchers: Record<Exclude<PortfolioCategoryId, "all">, (item: PortfolioItem) => boolean> = {
  "react-projects": (i) => hasTech(i, /react/i) || i.projectFocus === "React.js",
  "nextjs-projects": (i) => hasTech(i, /next/i) || i.projectFocus === "Next.js",
  "ai-powered": (i) => i.categories.includes("ai-powered") || hasTech(i, /ai|chat/i) || i.projectFocus === "AI-powered",
  "business-websites": (i) =>
    i.categories.includes("business-websites") || i.projectFocus === "Business website" || i.tag === "Website",
  "dashboard-admin": (i) =>
    i.categories.includes("dashboard-admin") || i.projectFocus === "Dashboard / admin" || hasTech(i, /dashboard|admin/i),
  "landing-pages": (i) => hasTech(i, /landing/i) || i.title.toLowerCase().includes("local services"),
  "startup-mvp": (i) =>
    i.categories.includes("startup-saas") || i.projectFocus === "Startup frontend" || i.tag === "Product UI",
  "ui-systems": (i) => i.tag === "Product UI" || hasTech(i, /typescript|component|ui system/i),
};

export function filterPortfolioByCategory(items: PortfolioItem[], category: PortfolioCategoryId): PortfolioItem[] {
  if (category === "all") return items;
  const match = matchers[category];
  return items.filter(match);
}

export function countByCategory(items: PortfolioItem[], category: PortfolioCategoryId): number {
  return filterPortfolioByCategory(items, category).length;
}
