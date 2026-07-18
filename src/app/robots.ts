import type { MetadataRoute } from "next";
import { getSiteUrl } from "@/lib/seo/site";

/**
 * Production robots.txt — standard directives only.
 * Do not emit `Host:` (non-standard; fails Lighthouse robots validity).
 */
export default function robots(): MetadataRoute.Robots {
  const baseUrl = getSiteUrl();

  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: [
          "/api/",
          "/admin/",
          "/owner/",
          "/assistant/",
          "/dashboard/",
          "/private/",
        ],
      },
    ],
    sitemap: `${baseUrl}/sitemap.xml`,
  };
}
