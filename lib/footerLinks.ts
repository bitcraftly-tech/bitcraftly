/** Footer navigation — customer journey order */

export type FooterLink = { href: string; label: string };

export type FooterSectionLink = {
  label: string;
  path: string;
  sectionId: string;
};

export const FOOTER_EXPLORE_LINKS: FooterLink[] = [
  { href: "/pricing", label: "Pricing & packages" },
  { href: "/services", label: "Services" },
  { href: "/portfolio", label: "Portfolio" },
  { href: "/about", label: "About & process" },
  { href: "/faq", label: "FAQ" },
  { href: "/contact", label: "Contact / quote" },
];

export const FOOTER_SERVICE_LINKS: FooterSectionLink[] = [
  { path: "/services", sectionId: "websites", label: "Business websites" },
  { path: "/services", sectionId: "mobile-apps", label: "Mobile apps" },
  { path: "/pricing", sectionId: "fast-packages", label: "Fast-launch packages" },
  { path: "/pricing", sectionId: "project-cost-calculator", label: "Cost calculator" },
  { path: "/pricing", sectionId: "pricing-standard", label: "Standard pricing" },
];

export const FOOTER_MORE_LINKS: FooterLink[] = [
  { href: "/team", label: "Team" },
  { href: "/careers", label: "Careers" },
  { href: "/privacy", label: "Privacy" },
  { href: "/terms", label: "Terms" },
];
