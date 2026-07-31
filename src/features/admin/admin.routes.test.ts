import { describe, expect, it } from 'vitest';
import { ADMIN_NAV, getAdminNavItem } from '@/features/admin/admin.nav';
import { ADMIN_ROUTES } from '@/features/admin/admin.routes';

describe('admin routes', () => {
  it('exposes the required admin paths', () => {
    expect(ADMIN_ROUTES.root).toBe('/admin');
    expect(ADMIN_ROUTES.blog).toBe('/admin/blog');
    expect(ADMIN_ROUTES.caseStudies).toBe('/admin/case-studies');
    expect(ADMIN_ROUTES.services).toBe('/admin/services');
    expect(ADMIN_ROUTES.testimonials).toBe('/admin/testimonials');
    expect(ADMIN_ROUTES.settings).toBe('/admin/settings');
  });
});

describe('admin nav', () => {
  it('includes every primary module', () => {
    const ids = ADMIN_NAV.map((item) => item.id);
    expect(ids).toEqual([
      'overview',
      'blog',
      'case-studies',
      'services',
      'testimonials',
      'settings',
    ]);
  });

  it('resolves nav items by id', () => {
    expect(getAdminNavItem('blog')?.href).toBe('/admin/blog');
    expect(getAdminNavItem('settings')?.label).toBe('Settings');
  });
});
