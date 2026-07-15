/**
 * Work JSON-LD builders — CollectionPage, BreadcrumbList, FAQPage, ItemList.
 */

import { ROUTES } from "@/constants/navigation";
import type { WorkFaqItem, WorkHubContent, WorkProject } from "./work.types";
import { getWorkProjectHref, WORK_FAQS } from "./work.content";

const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL?.replace(/\/$/, "") ??
  "https://bitcraftly.com";

const WORK_PAGE_SEO = {
  name: "Work | Bitcraftly Portfolio",
  description:
    "Explore Bitcraftly portfolio work — live client websites, SaaS platforms, healthcare, ecommerce, AI concierge experiences, and engineered outcomes.",
} as const;

function absolute(path: string): string {
  if (path.startsWith("http")) return path;
  return `${SITE_URL}${path.startsWith("/") ? path : `/${path}`}`;
}

export function buildWorkListingJsonLd(
  projects: readonly WorkProject[],
  faqs: readonly WorkFaqItem[] = WORK_FAQS,
) {
  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "BreadcrumbList",
        itemListElement: [
          {
            "@type": "ListItem",
            position: 1,
            name: "Home",
            item: `${SITE_URL}/`,
          },
          {
            "@type": "ListItem",
            position: 2,
            name: "Work",
            item: absolute(ROUTES.work),
          },
        ],
      },
      {
        "@type": "CollectionPage",
        "@id": `${absolute(ROUTES.work)}#webpage`,
        url: absolute(ROUTES.work),
        name: WORK_PAGE_SEO.name,
        description: WORK_PAGE_SEO.description,
        isPartOf: { "@id": `${SITE_URL}/#website` },
        mainEntity: {
          "@type": "ItemList",
          itemListElement: projects.map((project, index) => ({
            "@type": "ListItem",
            position: index + 1,
            url: absolute(getWorkProjectHref(project.slug)),
            name: project.title,
          })),
        },
      },
      {
        "@type": "FAQPage",
        mainEntity: faqs.map((faq) => ({
          "@type": "Question",
          name: faq.question,
          acceptedAnswer: {
            "@type": "Answer",
            text: faq.answer,
          },
        })),
      },
    ],
  };
}

export function buildWorkHubJsonLd(
  hub: WorkHubContent,
  projects: readonly WorkProject[],
) {
  return {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    name: hub.seoTitle,
    description: hub.seoDescription,
    url: absolute(`${ROUTES.work}/${hub.slug}`),
    mainEntity: {
      "@type": "ItemList",
      itemListElement: projects.map((project, index) => ({
        "@type": "ListItem",
        position: index + 1,
        url: absolute(getWorkProjectHref(project.slug)),
        name: project.title,
      })),
    },
  };
}

export function buildWorkProjectJsonLd(project: WorkProject) {
  return {
    "@context": "https://schema.org",
    "@type": "CreativeWork",
    name: project.title,
    description: project.seoDescription ?? project.summary,
    url: absolute(getWorkProjectHref(project.slug)),
    ...(project.coverImage.startsWith("http")
      ? { image: project.coverImage }
      : {}),
  };
}
