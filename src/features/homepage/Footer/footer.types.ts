import type { IconName } from "@/components/ui/icon";

export interface FooterNavLink {
  label: string;
  href: string;
  external?: boolean;
}

export interface FooterNavColumn {
  id: string;
  title: string;
  links: readonly FooterNavLink[];
}

export interface FooterSocialLink {
  id: string;
  label: string;
  href: string;
  icon: IconName;
}

export interface FooterContactItem {
  id: string;
  label: string;
  href: string;
  icon: IconName;
  external?: boolean;
}

export interface FooterBrandCopy {
  description: string;
}
