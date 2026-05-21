import type { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
      disallow: ["/dashboard/", "/login", "/api/", "/portal/"],
    },
    sitemap: "https://bitcraftly.com/sitemap.xml",
  };
}
