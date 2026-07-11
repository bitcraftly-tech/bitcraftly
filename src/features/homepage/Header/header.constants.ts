import type { HeaderActionLink, HeaderNavLink } from "./header.types";

export const HEADER_ID = "header";
export const HEADER_NAV_ID = "header-main-navigation";
export const HEADER_MOBILE_MENU_ID = "header-mobile-menu";

export const HEADER_NAV_LINKS: HeaderNavLink[] = [
  { label: "Services", href: "#services" },
  { label: "Solutions", href: "#industries" },
  { label: "Process", href: "#development-process" },
  { label: "Work", href: "#testimonials" },
  { label: "About", href: "#why-bitcraftly" },
];

export const HEADER_BOOK_CALL: HeaderActionLink = {
  label: "Book a Call",
  href: "#final-cta",
};

export const HEADER_CTA: HeaderActionLink = {
  label: "Get Consultation",
  href: "#final-cta",
};
