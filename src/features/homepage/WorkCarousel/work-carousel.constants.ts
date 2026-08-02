import { ROUTES } from '@/constants/navigation';
import { getWorkProjectHref, WORK_PROJECTS } from '@/features/work/work.content';

export const WORK_CAROUSEL_ID = 'homepage-work-carousel';
export const WORK_CAROUSEL_HEADING_ID = 'homepage-work-carousel-heading';

export const WORK_CAROUSEL_LABEL = 'Portfolio';
export const WORK_CAROUSEL_HEADING = "Work we've shipped.";
export const WORK_CAROUSEL_DESCRIPTION =
  'Live client sites and industry demos — swipe through every system in the portfolio.';

export const WORK_CAROUSEL_VIEW_ALL = {
  label: 'View all work',
  href: ROUTES.work,
} as const;

export const WORK_CAROUSEL_AUTO_MS = 4500;

export const WORK_CAROUSEL_ITEMS = WORK_PROJECTS.map((project) => ({
  id: project.slug,
  title: project.title,
  summary: project.summary,
  industry: project.industry,
  badge: project.badge ?? (project.status === 'future' ? 'Upcoming' : 'Showcase'),
  host: project.previewHost ?? 'bitcraftly.com',
  imageSrc: project.coverImage,
  imageAlt: project.coverImageAlt ?? `${project.title} preview`,
  href: getWorkProjectHref(project.slug),
  accent: project.accent,
}));

export type WorkCarouselItem = (typeof WORK_CAROUSEL_ITEMS)[number];
