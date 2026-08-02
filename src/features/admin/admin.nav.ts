import type { IconName } from '@/components/ui/icon/types';
import { ADMIN_ROUTES, type AdminRouteId } from './admin.routes';

export interface AdminNavItem {
  readonly id: AdminRouteId;
  readonly label: string;
  readonly href: string;
  readonly description: string;
  readonly icon: IconName;
}

export const ADMIN_NAV: readonly AdminNavItem[] = [
  {
    id: 'overview',
    label: 'Overview',
    href: ADMIN_ROUTES.root,
    description: 'Dashboard summary and publishing health',
    icon: 'layout-grid',
  },
  {
    id: 'blog',
    label: 'Blog',
    href: ADMIN_ROUTES.blog,
    description: 'Posts, drafts, and categories',
    icon: 'message',
  },
  {
    id: 'case-studies',
    label: 'Case Studies',
    href: ADMIN_ROUTES.caseStudies,
    description: 'Client stories and outcomes',
    icon: 'star',
  },
  {
    id: 'services',
    label: 'Services',
    href: ADMIN_ROUTES.services,
    description: 'Service catalog and SEO copy',
    icon: 'workflow',
  },
  {
    id: 'testimonials',
    label: 'Testimonials',
    href: ADMIN_ROUTES.testimonials,
    description: 'Quotes and social proof',
    icon: 'quote',
  },
  {
    id: 'settings',
    label: 'Settings',
    href: ADMIN_ROUTES.settings,
    description: 'Workspace preferences and integrations',
    icon: 'shield',
  },
] as const;

export function getAdminNavItem(id: AdminRouteId): AdminNavItem | undefined {
  return ADMIN_NAV.find((item) => item.id === id);
}
