import type { MetadataRoute } from "next";

import { portfolioPageItems, slugifyPortfolioTitle } from "@/lib/portfolioItems";
import { SITE_URL } from "@/lib/seo";

export default function sitemap(): MetadataRoute.Sitemap {
  const staticRoutes = [
    { path: "", priority: 1, changeFrequency: "weekly" as const },
    { path: "/contact", priority: 0.9, changeFrequency: "monthly" as const },
    { path: "/portfolio", priority: 0.9, changeFrequency: "weekly" as const },
    { path: "/team", priority: 0.8, changeFrequency: "monthly" as const },
    { path: "/demo", priority: 0.7, changeFrequency: "monthly" as const },
    { path: "/careers", priority: 0.5, changeFrequency: "monthly" as const },
    { path: "/dayal-builders", priority: 0.85, changeFrequency: "weekly" as const },
    { path: "/privacy", priority: 0.3, changeFrequency: "yearly" as const },
    { path: "/terms", priority: 0.3, changeFrequency: "yearly" as const },
  ];

  const portfolioSlugs = portfolioPageItems.map((item) => ({
    path: `/${slugifyPortfolioTitle(item.title)}`,
    priority: 0.75,
    changeFrequency: "monthly" as const,
  }));

  const showcaseRoutes = [
    "/portfolio/gym-fitness-showcase",
    "/portfolio/school-website-showcase",
    "/portfolio/ecommerce-store-showcase",
    "/portfolio/clinic-healthcare-showcase",
    "/portfolio/restaurant-ai-chatbot-showcase",
    "/portfolio/builder-real-estate-showcase",
    "/portfolio/dayal-builders-showcase",
    "/portfolio/local-services-leads-showcase",
    "/portfolio/society-management-showcase",
    "/portfolio/react-video-demo",
  ].map((path) => ({ path, priority: 0.6, changeFrequency: "monthly" as const }));

  return [...staticRoutes, ...portfolioSlugs, ...showcaseRoutes].map(({ path, priority, changeFrequency }) => ({
    url: `${SITE_URL}${path}`,
    lastModified: new Date(),
    changeFrequency,
    priority,
  }));
}
