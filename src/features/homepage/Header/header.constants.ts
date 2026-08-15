import {
  NAVIGATION,
  ROUTES,
  createDropdownNav,
  createSimpleNavLink,
  type SiteNavAction,
  type SiteNavLink,
} from '@/constants/navigation';
import { INDUSTRIES_FEATURED, INDUSTRY_GROUPS } from '@/constants/industries';
import { RESOURCES_FEATURED, RESOURCE_GROUPS } from '@/constants/resources';
import { SOLUTION_GROUPS, SOLUTIONS_FEATURED } from '@/constants/solutions';
import { WORK_FEATURED, WORK_GROUPS } from '@/constants/work';

export const HEADER_ID = 'header';
export const HEADER_NAV_ID = 'header-main-navigation';
export const HEADER_MOBILE_MENU_ID = 'header-mobile-menu';

/** Frozen visual design header height. */
export const HEADER_HEIGHT_PX = 88;

/**
 * Primary nav — Pricing / About / Contact live in the footer.
 * Order: Solutions → Industries → AI → Work → Resources
 */
export const HEADER_NAV_LINKS: readonly SiteNavLink[] = [
  createDropdownNav({
    label: 'Solutions',
    href: ROUTES.solutions,
    description: 'Digital products we engineer',
    groups: SOLUTION_GROUPS,
    featured: SOLUTIONS_FEATURED,
    exploreAllLabel: 'Explore all solutions',
    viewAllLabel: 'View all solutions',
  }),
  createDropdownNav({
    label: 'Industries',
    href: ROUTES.industries,
    description: 'Industry Systems by vertical',
    groups: INDUSTRY_GROUPS,
    featured: INDUSTRIES_FEATURED,
    exploreAllLabel: 'Explore all industries',
    viewAllLabel: 'View all industries',
  }),
  createSimpleNavLink({
    label: 'AI Studio',
    href: ROUTES.aiStudio,
    description: 'AI Studio and intelligent automation',
  }),
  createDropdownNav({
    label: 'Work',
    href: ROUTES.work,
    description: 'Systems shipped and outcomes',
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
];

export const HEADER_LOGIN: SiteNavAction = {
  label: 'Log In',
  href: NAVIGATION.routes.login,
};

export const HEADER_CTA_PRIMARY: SiteNavAction = {
  label: 'Explore Industry Systems',
  href: ROUTES.industries,
};

export const HEADER_CTA_SECONDARY: SiteNavAction = {
  label: 'Book Strategy Call',
  href: `${ROUTES.contact}?intent=strategy`,
};

/** @deprecated Prefer HEADER_CTA_PRIMARY */
export const HEADER_CTA = HEADER_CTA_PRIMARY;
