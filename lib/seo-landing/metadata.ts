import type { Metadata } from "next";

import { DEFAULT_OG_IMAGE, SITE_NAME, SITE_URL } from "@/lib/seo";

import type { SeoLandingConfig } from "./types";

export function seoLandingCanonical(slug: string): string {
  const path = slug.startsWith("/") ? slug : `/${slug}`;
  return `${SITE_URL}${path}`;
}

/** Next.js Metadata for SEO landing pages — canonical, OG, Twitter */
export function buildSeoLandingMetadata(config: SeoLandingConfig): Metadata {
  const canonical = seoLandingCanonical(config.slug);
  const ogTitle = `${config.metadata.title} | ${SITE_NAME}`;

  return {
    title: config.metadata.title,
    description: config.metadata.description,
    keywords: [...config.metadata.keywords],
    alternates: { canonical },
    openGraph: {
      type: "website",
      locale: "en_IN",
      url: canonical,
      siteName: SITE_NAME,
      title: ogTitle,
      description: config.metadata.description,
      images: [{ url: DEFAULT_OG_IMAGE, alt: `${SITE_NAME} — React.js & Next.js web development` }],
    },
    twitter: {
      card: "summary_large_image",
      title: ogTitle,
      description: config.metadata.description,
      images: [DEFAULT_OG_IMAGE],
    },
  };
}
