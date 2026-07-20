import type { Metadata } from "next";

import { getSiteUrl } from "./site";

interface CreatePageMetadataInput {
  title: string;
  description: string;
  path: string;
  keywords?: readonly string[];
  /** Absolute or site-relative path for OG / Twitter images. */
  image?: string;
}

const SITE_NAME = "Bitcraftly";
const DEFAULT_OG_IMAGE_PATH = "/opengraph-image.webp";

export function createPageMetadata({
  title,
  description,
  path,
  keywords,
  image = DEFAULT_OG_IMAGE_PATH,
}: CreatePageMetadataInput): Metadata {
  const siteUrl = getSiteUrl();
  const url = `${siteUrl}${path}`;
  const alreadyBranded = title.includes(SITE_NAME);
  /** Absolute title when input already includes the brand (avoids `| Bitcraftly | Bitcraftly`). */
  const metadataTitle = alreadyBranded
    ? ({ absolute: title } as const)
    : title;
  const socialTitle = alreadyBranded ? title : `${title} | ${SITE_NAME}`;
  const imageUrl = image.startsWith("http") ? image : `${siteUrl}${image}`;

  return {
    title: metadataTitle,
    description,
    keywords: keywords ? [...keywords] : undefined,
    alternates: {
      canonical: path,
    },
    openGraph: {
      title: socialTitle,
      description,
      url,
      siteName: SITE_NAME,
      locale: "en_IN",
      type: "website",
      images: [
        {
          url: imageUrl,
          width: 1200,
          height: 630,
          alt: socialTitle,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: socialTitle,
      description,
      images: [imageUrl],
    },
  };
}
