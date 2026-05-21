import type { PortfolioItem } from "@/lib/portfolioItems";
import { slugifyPortfolioTitle } from "@/lib/portfolioItems";

export type PortfolioProject = PortfolioItem & {
  slug: string;
  externalUrl?: string;
  caseStudyHref: string;
};

export function enrichProject(item: PortfolioItem): PortfolioProject {
  const slug = slugifyPortfolioTitle(item.title);
  const demo = item.demoHref?.trim();
  const live = item.liveUrl?.trim();
  const externalUrl =
    demo && (demo.startsWith("http") || demo.startsWith("/")) ? demo : live ? live : undefined;

  return {
    ...item,
    slug,
    externalUrl,
    caseStudyHref: `/${slug}`,
  };
}

export function enrichProjects(items: PortfolioItem[]): PortfolioProject[] {
  return items.map(enrichProject);
}
