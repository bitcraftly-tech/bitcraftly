import type { Metadata } from "next";

interface CreatePageMetadataInput {
  title: string;
  description: string;
  path: string;
  keywords?: readonly string[];
  /** Absolute or site-relative path for OG / Twitter images. */
  image?: string;
}

const SITE_NAME = "Bitcraftly";
const SITE_URL = "https://bitcraftly.com";
const DEFAULT_OG_IMAGE = `${SITE_URL}/brand/icon.png`;

export function createPageMetadata({
  title,
  description,
  path,
  keywords,
  image = DEFAULT_OG_IMAGE,
}: CreatePageMetadataInput): Metadata {
  const url = `${SITE_URL}${path}`;
  const fullTitle = title.includes(SITE_NAME)
    ? title
    : `${title} | ${SITE_NAME}`;
  const imageUrl = image.startsWith("http") ? image : `${SITE_URL}${image}`;

  return {
    title: fullTitle,
    description,
    keywords: keywords ? [...keywords] : undefined,
    alternates: {
      canonical: path,
    },
    openGraph: {
      title: fullTitle,
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
          alt: fullTitle,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: fullTitle,
      description,
      images: [imageUrl],
    },
  };
}
