/**
 * Centralized site navigation — SEO-first multi-page architecture.
 * Primary nav uses pathnames, not homepage hash anchors.
 *
 * Domain catalogs live in:
 * - services.ts
 * - solutions.ts
 * - industries.ts
 * - resources.ts
 */

import { INDUSTRIES_FEATURED, INDUSTRY_GROUPS } from './industries';
import {
  createDropdownNav,
  createSimpleNavLink,
  flattenNavGroups,
  hasMegaMenu,
  type NavChildLink,
  type SiteNavAction,
  type SiteNavLink,
} from './nav.types';
import { RESOURCES_FEATURED, RESOURCE_GROUPS } from './resources';
import { ALL_SERVICES, SERVICE_GROUPS, SERVICES_FEATURED } from './services';
import { SOLUTION_GROUPS, SOLUTIONS_FEATURED } from './solutions';
import { WORK_FEATURED, WORK_GROUPS } from './work';

export type {
  NavChildLink,
  NavFeaturedCard,
  NavGroup,
  NavLinkItem,
  SiteNavAction,
  SiteNavLink,
} from './nav.types';

export {
  createDropdownNav,
  createSimpleNavLink,
  flattenNavGroups,
  getSiteNavChildren,
  hasMegaMenu,
  toNavChildLink,
} from './nav.types';

export {
  ALL_SERVICES,
  SERVICE_GROUPS,
  SERVICE_SLUGS,
  SERVICES_FEATURED,
  getServiceBySlug,
  getServiceHref,
} from './services';

export {
  ALL_SOLUTIONS,
  SOLUTION_GROUPS,
  SOLUTION_SLUGS,
  SOLUTIONS_FEATURED,
  getSolutionBySlug,
  getSolutionHref,
} from './solutions';

export {
  ALL_INDUSTRIES,
  INDUSTRIES_FEATURED,
  INDUSTRY_GROUPS,
  INDUSTRY_SLUGS,
  getIndustryBySlug,
  getIndustryHref,
} from './industries';

export { ALL_RESOURCES, RESOURCE_GROUPS, RESOURCES_FEATURED, getResourceBySlug } from './resources';

export {
  ALL_WORK_LINKS,
  SERVICE_RELATED_WORK,
  WORK_CATEGORY_SLUGS,
  WORK_FEATURED,
  WORK_GROUPS,
  WORK_HUB_ROUTES,
  WORK_PAGE_SECTIONS,
  WORK_RELATED_SERVICES,
  WORK_STATIC_SLUGS,
  getRelatedServicesForWork,
  getRelatedWorkForService,
  getWorkHref,
  getWorkLinkBySlug,
  getWorkPageBySlug,
} from './work';

export const ROUTES = {
  home: '/',
  services: '/services',
  solutions: '/solutions',
  industries: '/industries',
  work: '/work',
  workCaseStudies: '/work/case-studies',
  workPortfolio: '/work/portfolio',
  workFeaturedProjects: '/work/featured-projects',
  workTestimonials: '/work/testimonials',
  workProjects: '/work/projects',
  resources: '/resources',
  resourcesFaq: '/resources/faq',
  blog: '/blog',
  caseStudies: '/case-studies',
  careers: '/careers',
  events: '/events',
  press: '/press',
  privacy: '/privacy',
  terms: '/terms',
  trust: '/trust',
  pricing: '/pricing',
  packages: '/packages',
  about: '/about',
  contact: '/contact',
  assistant: '/assistant',
  aiStudio: '/ai-studio',
  login: '/login',
  admin: '/admin',
} as const;

export type AppRoute = (typeof ROUTES)[keyof typeof ROUTES];

/** Homepage in-page section ids (landing page only — not primary nav). */
export const SECTION_IDS = {
  hero: 'hero',
  services: 'services',
  industries: 'industries',
  technologies: 'technologies',
  process: 'development-process',
  about: 'why-bitcraftly',
  work: 'testimonials',
  faq: 'faq',
  cta: 'final-cta',
  founderMessage: 'founder-message',
  costCalculator: 'cost-calculator',
} as const;

export type SectionId = (typeof SECTION_IDS)[keyof typeof SECTION_IDS];

/** @deprecated Prefer ALL_SERVICES / SERVICE_GROUPS — kept for compatibility. */
export const SERVICE_CHILD_ROUTES = ALL_SERVICES.map((service) => ({
  slug: service.slug,
  label: service.label,
  description: service.description,
  icon: service.icon,
}));

/** @deprecated Prefer SOLUTION_GROUPS */
export const SOLUTION_CHILD_ROUTES: readonly NavChildLink[] = flattenNavGroups(
  SOLUTION_GROUPS,
  ROUTES.solutions,
);

/** @deprecated Prefer INDUSTRY_GROUPS */
export const INDUSTRY_CHILD_ROUTES: readonly NavChildLink[] = flattenNavGroups(
  INDUSTRY_GROUPS,
  ROUTES.industries,
);

/** @deprecated Prefer RESOURCE_GROUPS */
export const RESOURCE_CHILD_ROUTES: readonly NavChildLink[] = flattenNavGroups(
  RESOURCE_GROUPS,
  ROUTES.resources,
);

export const MAIN_NAV_LINKS: SiteNavLink[] = [
  createDropdownNav({
    label: 'Services',
    href: ROUTES.services,
    description: 'End-to-end digital engineering services',
    groups: SERVICE_GROUPS,
    featured: SERVICES_FEATURED,
    exploreAllLabel: 'Explore all services',
    viewAllLabel: 'View all services',
  }),
  createDropdownNav({
    label: 'Solutions',
    href: ROUTES.solutions,
    description: 'Solutions that deliver measurable results',
    groups: SOLUTION_GROUPS,
    featured: SOLUTIONS_FEATURED,
    exploreAllLabel: 'Explore all solutions',
    viewAllLabel: 'View all solutions',
  }),
  createDropdownNav({
    label: 'Industries',
    href: ROUTES.industries,
    description: 'Industry-focused digital solutions',
    groups: INDUSTRY_GROUPS,
    featured: INDUSTRIES_FEATURED,
    exploreAllLabel: 'Explore all industries',
    viewAllLabel: 'View all industries',
  }),
  createDropdownNav({
    label: 'Work',
    href: ROUTES.work,
    description: 'Projects, case studies, portfolio, and outcomes',
    groups: WORK_GROUPS,
    featured: WORK_FEATURED,
    exploreAllLabel: 'View all work',
    viewAllLabel: 'View all work',
    menuVariant: 'compact',
  }),
  createDropdownNav({
    label: 'Resources',
    href: ROUTES.resources,
    description: 'Guides, FAQ, and insights',
    groups: RESOURCE_GROUPS,
    featured: RESOURCES_FEATURED,
    exploreAllLabel: 'Explore all resources',
    viewAllLabel: 'View all resources',
  }),
  createSimpleNavLink({
    label: 'About',
    href: ROUTES.about,
    description: 'Why teams choose Bitcraftly',
  }),
];

export const NAV_ACTIONS = {
  bookCall: {
    label: 'Book a Call',
    href: ROUTES.contact,
  },
  consultation: {
    label: 'Get Consultation',
    href: ROUTES.contact,
  },
  freeConsultation: {
    label: 'Get Free Consultation',
    href: ROUTES.contact,
  },
  viewWork: {
    label: 'View Our Work',
    href: ROUTES.work,
  },
  exploreServices: {
    label: 'Explore All Services',
    href: ROUTES.services,
  },
  viewAllProjects: {
    label: 'View All Projects',
    href: ROUTES.work,
  },
  viewAllFaq: {
    label: 'View All FAQ',
    href: ROUTES.resourcesFaq,
  },
} as const satisfies Record<string, SiteNavAction>;

/**
 * Single navigation config for header, mobile, footer, and future sidebars.
 * UI components should consume this — do not hardcode menu items.
 */
export const NAVIGATION = {
  routes: ROUTES,
  primary: MAIN_NAV_LINKS,
  actions: NAV_ACTIONS,
  footer: [
    {
      id: 'services',
      title: 'Services',
      href: ROUTES.services,
      items: flattenNavGroups(SERVICE_GROUPS, ROUTES.services),
    },
    {
      id: 'solutions',
      title: 'Solutions',
      href: ROUTES.solutions,
      items: flattenNavGroups(SOLUTION_GROUPS, ROUTES.solutions),
    },
    {
      id: 'industries',
      title: 'Industries',
      href: ROUTES.industries,
      items: flattenNavGroups(INDUSTRY_GROUPS, ROUTES.industries),
    },
    {
      id: 'work',
      title: 'Work',
      href: ROUTES.work,
      items: flattenNavGroups(WORK_GROUPS, ROUTES.work),
    },
    {
      id: 'resources',
      title: 'Resources',
      href: ROUTES.resources,
      items: flattenNavGroups(RESOURCE_GROUPS, ROUTES.resources),
    },
  ],
  catalogs: {
    services: SERVICE_GROUPS,
    solutions: SOLUTION_GROUPS,
    industries: INDUSTRY_GROUPS,
    work: WORK_GROUPS,
    resources: RESOURCE_GROUPS,
  },
} as const;

/** Returns true when the current pathname matches a nav href (including nested routes). */
export function isNavLinkActive(pathname: string, href: string): boolean {
  if (href === ROUTES.home) {
    return pathname === ROUTES.home;
  }

  return pathname === href || pathname.startsWith(`${href}/`);
}

export function getMegaMenuLinks(): SiteNavLink[] {
  return NAVIGATION.primary.filter((link) => hasMegaMenu(link));
}

/** @deprecated Prefer NAVIGATION.footer */
export const FOOTER_LINK_GROUPS = NAVIGATION.footer;
