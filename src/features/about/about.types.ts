import type { IconName } from "@/components/ui/icon";

export interface AboutValue {
  readonly id: string;
  readonly title: string;
  readonly description: string;
  readonly icon: IconName;
}

export interface AboutLeader {
  readonly id: string;
  readonly name: string;
  readonly role: string;
  readonly bio: string;
  readonly photoSrc: string;
  readonly photoAlt: string;
  readonly badges: readonly string[];
  readonly focus: readonly string[];
}

export interface AboutCultureItem {
  readonly id: string;
  readonly title: string;
  readonly description: string;
  readonly icon: IconName;
}

export type AboutTechGroupId = "frontend" | "backend" | "ai-delivery";

export interface AboutTechItem {
  readonly id: string;
  readonly label: string;
  readonly detail: string;
  readonly icon: IconName;
  /** Logical grouping for scannable technology lists */
  readonly group: AboutTechGroupId;
  /** Subtle accent for core stack items */
  readonly featured?: boolean;
}

export interface AboutProcessStep {
  readonly id: string;
  readonly step: string;
  readonly title: string;
  readonly description: string;
}

export interface AboutTrustStat {
  readonly id: string;
  readonly value: string;
  readonly label: string;
}

export interface AboutFaqItem {
  readonly id: string;
  readonly question: string;
  readonly answer: string;
}

export interface AboutTrustedLogo {
  readonly id: string;
  readonly label: string;
  /** Short wordmark text for grayscale placeholder SVG */
  readonly mark: string;
}

export interface AboutFeaturedCaseStudy {
  readonly id: string;
  readonly eyebrow: string;
  readonly heading: string;
  readonly project: string;
  readonly challenge: string;
  readonly solution: string;
  readonly results: readonly string[];
  readonly ctaLabel: string;
  readonly ctaHref: string;
}

export interface AboutTestimonialPlaceholder {
  readonly id: string;
  readonly quote: string;
  readonly attribution: string;
  readonly role: string;
}
