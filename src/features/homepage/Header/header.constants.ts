import {
  NAVIGATION,
  type SiteNavAction,
  type SiteNavLink,
} from "@/constants/navigation";

export const HEADER_ID = "header";
export const HEADER_NAV_ID = "header-main-navigation";
export const HEADER_MOBILE_MENU_ID = "header-mobile-menu";

/** Approved header chrome height (72–76px band). */
export const HEADER_HEIGHT_PX = 74;

/** Data-driven primary nav — sourced from NAVIGATION config. */
export const HEADER_NAV_LINKS: readonly SiteNavLink[] = NAVIGATION.primary;

export const HEADER_BOOK_CALL: SiteNavAction = NAVIGATION.actions.bookCall;

export const HEADER_CTA: SiteNavAction = NAVIGATION.actions.freeConsultation;
