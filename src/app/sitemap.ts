import type { MetadataRoute } from "next";
import { BLOG_POSTS } from "@/content/blog";
import { CASE_STUDIES, getCaseStudyHref } from "@/content/case-studies";
import { INDUSTRY_SLUGS } from "@/constants/industries";
import { getBlogPostHref } from "@/features/blog/blog.utils";
import { getSiteUrl } from "@/lib/seo/site";

const BASE_URL = getSiteUrl();
const LAST_MODIFIED = new Date("2026-07-16");

export default function sitemap(): MetadataRoute.Sitemap {
  const staticRoutes = [
    "",
    "/about",
    "/services",
    "/solutions",
    "/industries",
    "/work",
    "/blog",
    "/pricing",
    "/careers",
    "/contact",
    "/privacy",
    "/terms",
  ];

  const staticEntries: MetadataRoute.Sitemap = staticRoutes.map((route) => ({
    url: `${BASE_URL}${route}`,
    lastModified: LAST_MODIFIED,
    changeFrequency: route === "" || route === "/blog" ? "daily" : "weekly",
    priority:
      route === "" ? 1.0 : route === "/blog" || route === "/work" ? 0.9 : 0.8,
  }));

  const industryEntries: MetadataRoute.Sitemap = INDUSTRY_SLUGS.map((slug) => ({
    url: `${BASE_URL}/industries/${slug}`,
    lastModified: LAST_MODIFIED,
    changeFrequency: "monthly",
    priority: 0.75,
  }));

  const blogEntries: MetadataRoute.Sitemap = BLOG_POSTS.map((post) => ({
    url: `${BASE_URL}${getBlogPostHref(post.slug)}`,
    lastModified: new Date(post.updatedAt ?? post.publishedAt),
    changeFrequency: "monthly",
    priority: 0.7,
  }));

  const caseStudyEntries: MetadataRoute.Sitemap = CASE_STUDIES.map((study) => ({
    url: `${BASE_URL}${getCaseStudyHref(study.slug)}`,
    lastModified: new Date(`${study.engagement.year}-01-01`),
    changeFrequency: "monthly",
    priority: 0.75,
  }));

  return [
    ...staticEntries,
    ...industryEntries,
    ...blogEntries,
    ...caseStudyEntries,
  ];
}
