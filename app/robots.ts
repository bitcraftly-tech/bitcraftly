import type { MetadataRoute } from "next";

import { IS_STAGING, PRODUCTION_URL } from "@/lib/appEnv";

export default function robots(): MetadataRoute.Robots {
  if (IS_STAGING) {
    return {
      rules: {
        userAgent: "*",
        disallow: "/",
      },
    };
  }

  return {
    rules: {
      userAgent: "*",
      allow: "/",
      disallow: ["/dashboard/", "/login", "/api/", "/portal/"],
    },
    sitemap: `${PRODUCTION_URL}/sitemap.xml`,
  };
}
