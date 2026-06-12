import type { Metadata } from "next";
import { notFound, permanentRedirect } from "next/navigation";

import PortfolioProjectDetailShell from "@/components/landing/PortfolioProjectDetailShell";
import { SECTION_REDIRECTS } from "@/lib/marketingRoutes";
import {
  getPortfolioPageItemBySlug,
  portfolioPageItems,
  slugifyPortfolioTitle,
} from "@/lib/portfolioItems";

type SectionPageProps = {
  params: Promise<{
    section: string;
  }>;
};

export function generateStaticParams() {
  return portfolioPageItems.map((item) => ({
    section: slugifyPortfolioTitle(item.title),
  }));
}

export async function generateMetadata({ params }: SectionPageProps): Promise<Metadata> {
  const { section } = await params;
  const item = getPortfolioPageItemBySlug(section);
  if (item) {
    return {
      title: `${item.title} | Portfolio | Bitcraftly`,
      description: `${item.cardLine} Case study: challenge, solution, results, and ${item.projectFocus} stack. ${item.badge === "Live client" ? "Live production site." : "Interactive demo."}`,
    };
  }
  return {};
}

export default async function SectionPage({ params }: SectionPageProps) {
  const { section } = await params;

  const redirectTo = SECTION_REDIRECTS[section];
  if (redirectTo) {
    permanentRedirect(redirectTo);
  }

  const portfolioItem = getPortfolioPageItemBySlug(section);
  if (portfolioItem) {
    return <PortfolioProjectDetailShell item={portfolioItem} />;
  }

  notFound();
}
