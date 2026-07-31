import { NAVIGATION, type SiteNavAction, type SiteNavLink } from '@/constants/navigation';

export const HEADER_ID = 'header';
export const HEADER_NAV_ID = 'header-main-navigation';
export const HEADER_MOBILE_MENU_ID = 'header-mobile-menu';

/** Approved header chrome height (64–72px band). */
export const HEADER_HEIGHT_PX = 72;

/** Data-driven primary nav — sourced from NAVIGATION config. */
export const HEADER_NAV_LINKS: readonly SiteNavLink[] = NAVIGATION.primary;

/** Single header CTA — short label, same destination as free consultation. */
export const HEADER_CTA: SiteNavAction = {
  label: 'Free Consultation',
  href: NAVIGATION.actions.freeConsultation.href,
};
