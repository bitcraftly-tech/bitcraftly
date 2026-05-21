import type { MetadataRoute } from "next";

const BASE = "https://bitcraftly.com";

export default function sitemap(): MetadataRoute.Sitemap {
  const routes = [
    "",
    "/contact",
    "/team",
    "/portfolio",
    "/demo",
    "/careers",
    "/privacy",
    "/terms",
  ];

  return routes.map((path) => ({
    url: `${BASE}${path}`,
    lastModified: new Date(),
    changeFrequency: path === "" ? "weekly" : "monthly",
    priority: path === "" ? 1 : 0.7,
  }));
}
