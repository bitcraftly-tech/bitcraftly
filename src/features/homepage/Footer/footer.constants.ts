import { ROUTES } from "@/constants/navigation";
import type {
  FooterBrandCopy,
  FooterContactItem,
  FooterNavColumn,
  FooterSocialLink,
} from "./footer.types";

export const FOOTER_ID = "footer";

export const FOOTER_BRAND: FooterBrandCopy = {
  description:
    "AI & Digital Engineering Partner helping businesses build, automate and grow with modern technology.",
};

/** Order matches approved footer design: LinkedIn, X, GitHub, YouTube, Website */
export const FOOTER_SOCIAL_LINKS: readonly FooterSocialLink[] = [
  {
    id: "linkedin",
    label: "Bitcraftly on LinkedIn",
    href: "https://www.linkedin.com/company/bitcraftly",
    icon: "linkedin",
  },
  {
    id: "x",
    label: "Bitcraftly on X",
    href: "https://x.com/bitcraftly",
    icon: "x",
  },
  {
    id: "github",
    label: "Bitcraftly on GitHub",
    href: "https://github.com/bitcraftly",
    icon: "github",
  },
  {
    id: "youtube",
    label: "Bitcraftly on YouTube",
    href: "https://www.youtube.com/@bitcraftly",
    icon: "youtube",
  },
  {
    id: "website",
    label: "Bitcraftly website",
    href: "https://bitcraftly.com",
    icon: "globe",
  },
];

export const FOOTER_NAV_COLUMNS: readonly FooterNavColumn[] = [
  {
    id: "services",
    title: "Services",
    links: [
      { label: "AI Solutions", href: `${ROUTES.services}/ai-solutions` },
      {
        label: "Web Development",
        href: `${ROUTES.services}/website-development`,
      },
      {
        label: "Web Applications",
        href: `${ROUTES.services}/web-application-development`,
      },
      {
        label: "Mobile Apps",
        href: `${ROUTES.services}/mobile-app-development`,
      },
      {
        label: "Custom Software",
        href: `${ROUTES.services}/custom-software-development`,
      },
      { label: "Cloud & DevOps", href: `${ROUTES.services}/cloud-devops` },
    ],
  },
  {
    id: "solutions",
    title: "Solutions",
    links: [
      { label: "ERP Solutions", href: `${ROUTES.solutions}/erp` },
      { label: "CRM Solutions", href: `${ROUTES.solutions}/crm` },
      { label: "CMS Solutions", href: `${ROUTES.solutions}/cms` },
      {
        label: "AI Automation",
        href: `${ROUTES.solutions}/ai-automation`,
      },
      { label: "SaaS Platforms", href: `${ROUTES.solutions}/saas-platforms` },
    ],
  },
  {
    id: "resources",
    title: "Resources",
    links: [
      { label: "Blog", href: ROUTES.blog },
      { label: "Case Studies", href: ROUTES.caseStudies },
      { label: "Documentation", href: `${ROUTES.resources}/documentation` },
      { label: "Guides", href: `${ROUTES.resources}/guides` },
      { label: "FAQ", href: ROUTES.resourcesFaq },
    ],
  },
  {
    id: "company",
    title: "Company",
    links: [
      { label: "About Us", href: ROUTES.about },
      { label: "Our Process", href: "/#development-process" },
      { label: "Careers", href: ROUTES.careers },
    ],
  },
];

/** Services / Solutions / Resources — middle grid columns */
export const FOOTER_LINK_COLUMNS: readonly FooterNavColumn[] = [
  FOOTER_NAV_COLUMNS[0],
  FOOTER_NAV_COLUMNS[1],
  FOOTER_NAV_COLUMNS[2],
];

export const FOOTER_COMPANY_COLUMN: FooterNavColumn = FOOTER_NAV_COLUMNS[3];
export const FOOTER_CONTACT_ITEMS: readonly FooterContactItem[] = [
  {
    id: "phone",
    label: "+91 96677 10954",
    href: "tel:+919667710954",
    icon: "phone",
  },
  {
    id: "email",
    label: "hello@bitcraftly.com",
    href: "mailto:hello@bitcraftly.com",
    icon: "mail",
  },
  {
    id: "location",
    label: "Noida, Uttar Pradesh, India",
    href: "https://maps.google.com/?q=Noida,+Uttar+Pradesh,+India",
    icon: "map-pin",
    external: true,
  },
];

export const FOOTER_COPYRIGHT = `© ${new Date().getFullYear()} Bitcraftly Technologies Pvt. Ltd. All rights reserved.`;

/** Trust Center row — matches https://bitcraftly.com/ footer (Cookies opens prefs). */
export const FOOTER_TRUST_LINKS = [
  { id: "trust", label: "Trust Center", href: ROUTES.trust, kind: "link" as const },
  { id: "privacy", label: "Privacy", href: ROUTES.privacy, kind: "link" as const },
  { id: "terms", label: "Terms", href: ROUTES.terms, kind: "link" as const },
  { id: "cookies", label: "Cookies", href: "#cookies", kind: "cookies" as const },
] as const;
