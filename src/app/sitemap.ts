import type { MetadataRoute } from 'next';
import { BLOG_POSTS } from '@/content/blog';
import { CASE_STUDIES, getCaseStudyHref } from '@/content/case-studies';
import { getServiceHref, SERVICE_SLUGS } from '@/constants/services';
import { getSolutionHref, SOLUTION_SLUGS } from '@/constants/solutions';
import { WORK_STATIC_SLUGS } from '@/constants/work';
import { getBlogPostHref } from '@/features/blog/blog.utils';
import { INDUSTRIES_CATALOG } from '@/features/industries/industries.content';
import { getWorkProjectHref, WORK_PROJECTS } from '@/features/work/work.content';
import {
  hasApprovedTestimonialQuote,
  WORK_TESTIMONIAL_DETAILS,
} from '@/features/work/work-testimonials.content';
import { getSiteUrl } from '@/lib/seo/site';

const BASE_URL = getSiteUrl();

/**
 * Canonical indexable marketing paths. Add new public routes here so they
 * appear in `/sitemap.xml` without duplicating private/demo URLs.
 */
const STATIC_SITEMAP_PATHS = [
  '/',
  '/about',
  '/services',
  '/solutions',
  '/industries',
  '/work',
  '/blog',
  '/pricing',
  '/careers',
  '/contact',
  '/privacy',
  '/terms',
  '/trust',
  '/case-studies',
  '/resources',
  '/resources/faq',
  '/resources/guides',
  '/resources/documentation',
  '/events',
  '/press',
  '/ai-studio',
] as const;

function mapStaticRoutes(routes: readonly string[]): MetadataRoute.Sitemap {
  return routes.map((route) => ({
    url: `${BASE_URL}${route}`,
    lastModified: new Date(),
    changeFrequency: route === '/' || route === '/blog' ? 'weekly' : 'monthly',
    priority: route === '/' ? 1.0 : route === '/blog' || route === '/work' ? 0.9 : 0.8,
  }));
}

export default function sitemap(): MetadataRoute.Sitemap {
  const staticRoutes = STATIC_SITEMAP_PATHS;

  const industryEntries: MetadataRoute.Sitemap = INDUSTRIES_CATALOG.map((industry) => ({
    url: `${BASE_URL}/industries/${industry.slug}`,
    lastModified: new Date(),
    changeFrequency: 'monthly',
    priority: 0.75,
  }));

  const serviceEntries: MetadataRoute.Sitemap = SERVICE_SLUGS.map((slug) => ({
    url: `${BASE_URL}${getServiceHref(slug)}`,
    lastModified: new Date(),
    changeFrequency: 'monthly',
    priority: 0.8,
  }));

  const solutionEntries: MetadataRoute.Sitemap = SOLUTION_SLUGS.map((slug) => ({
    url: `${BASE_URL}${getSolutionHref(slug)}`,
    lastModified: new Date(),
    changeFrequency: 'monthly',
    priority: 0.8,
  }));

  const workEntries: MetadataRoute.Sitemap = WORK_STATIC_SLUGS.map((slug) => ({
    url: `${BASE_URL}/work/${slug}`,
    lastModified: new Date(),
    changeFrequency: 'monthly',
    priority: 0.75,
  }));

  const workProjectEntries: MetadataRoute.Sitemap = WORK_PROJECTS.map((project) => ({
    url: `${BASE_URL}${getWorkProjectHref(project.slug)}`,
    lastModified: new Date(),
    changeFrequency: 'monthly',
    priority: 0.7,
  }));

  const workTestimonialEntries: MetadataRoute.Sitemap = WORK_TESTIMONIAL_DETAILS.filter(
    hasApprovedTestimonialQuote,
  ).map((item) => ({
    url: `${BASE_URL}/work/testimonials/${item.slug}`,
    lastModified: new Date(),
    changeFrequency: 'monthly',
    priority: 0.5,
  }));

  const blogEntries: MetadataRoute.Sitemap = BLOG_POSTS.map((post) => ({
    url: `${BASE_URL}${getBlogPostHref(post.slug)}`,
    lastModified: new Date(post.updatedAt ?? post.publishedAt),
    changeFrequency: 'monthly',
    priority: 0.7,
  }));

  const caseStudyEntries: MetadataRoute.Sitemap = CASE_STUDIES.map((study) => ({
    url: `${BASE_URL}${getCaseStudyHref(study.slug)}`,
    lastModified: new Date(`${study.engagement.year}-01-01`),
    changeFrequency: 'monthly',
    priority: 0.75,
  }));

  return [
    ...mapStaticRoutes(staticRoutes),
    ...industryEntries,
    ...serviceEntries,
    ...solutionEntries,
    ...workEntries,
    ...workProjectEntries,
    ...workTestimonialEntries,
    ...blogEntries,
    ...caseStudyEntries,
  ];
}
