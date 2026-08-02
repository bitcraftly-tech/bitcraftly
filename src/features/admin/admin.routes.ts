/**
 * Admin panel route map.
 * Keep admin paths feature-owned — do not add to marketing primary nav.
 */
export const ADMIN_ROUTES = {
  root: '/admin',
  blog: '/admin/blog',
  caseStudies: '/admin/case-studies',
  services: '/admin/services',
  testimonials: '/admin/testimonials',
  settings: '/admin/settings',
} as const;

export type AdminRoute = (typeof ADMIN_ROUTES)[keyof typeof ADMIN_ROUTES];

export const ADMIN_ROUTE_IDS = [
  'overview',
  'blog',
  'case-studies',
  'services',
  'testimonials',
  'settings',
] as const;

export type AdminRouteId = (typeof ADMIN_ROUTE_IDS)[number];
