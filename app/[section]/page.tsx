import type { Metadata } from "next";
import { notFound } from "next/navigation";

import LandingPage from "@/components/landing/LandingPage";
import PortfolioProjectDetailShell from "@/components/landing/PortfolioProjectDetailShell";
import {
  getPortfolioPageItemBySlug,
  portfolioPageItems,
  slugifyPortfolioTitle,
} from "@/lib/portfolioItems";

const ALLOWED_SECTIONS = [
  "about",
  "services",
  "websites",
  "mobile-apps",
  "why-us",
  "pricing",
  "contact-cta",
  "how-parking-works",
  "process",
] as const;
type AllowedSection = (typeof ALLOWED_SECTIONS)[number];

type SectionPageProps = {
  params: Promise<{
    section: string;
  }>;
};

export function generateStaticParams() {
  const landing = ALLOWED_SECTIONS.map((section) => ({ section }));
  const portfolio = portfolioPageItems.map((item) => ({
    section: slugifyPortfolioTitle(item.title),
  }));
  return [...landing, ...portfolio];
}

export async function generateMetadata({ params }: SectionPageProps): Promise<Metadata> {
  const { section } = await params;
  const item = getPortfolioPageItemBySlug(section);
  if (item) {
    return {
      title: `${item.title} | Portfolio | Bitcraftly`,
      description: `${item.hint} Representative industry mockup — your build is scoped after discovery.`,
    };
  }
  return {};
}

export default async function SectionPage({ params }: SectionPageProps) {
  const { section } = await params;

  const portfolioItem = getPortfolioPageItemBySlug(section);
  if (portfolioItem) {
    return <PortfolioProjectDetailShell item={portfolioItem} />;
  }

  if (!ALLOWED_SECTIONS.includes(section as AllowedSection)) {
    notFound();
  }

  return <LandingPage sectionId={section as AllowedSection} />;
}
