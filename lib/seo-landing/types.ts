export type SeoLandingBreadcrumbItem = {
  label: string;
  href?: string;
};

export type SeoLandingFaqItem = {
  q: string;
  a: string;
};

export type SeoLandingLink = {
  href: string;
  label: string;
  description?: string;
};

export type SeoLandingProofItem = {
  title: string;
  description: string;
  href: string;
  badge: string;
};

export type SeoLandingEditorialItem = {
  title: string;
  body: string;
};

export type SeoLandingPricingPackage = {
  name: string;
  price: string;
  note: string;
};

export type SeoLandingConfig = {
  slug: string;
  metadata: {
    title: string;
    description: string;
    keywords: readonly string[];
  };
  breadcrumb: readonly SeoLandingBreadcrumbItem[];
  hero: {
    eyebrow: string;
    title: string;
    description: string;
  };
  trustStrip: readonly string[];
  problems: {
    title: string;
    intro: string;
    items: readonly SeoLandingEditorialItem[];
  };
  solutions: {
    title: string;
    intro: string;
    items: readonly SeoLandingEditorialItem[];
  };
  local: {
    eyebrow: string;
    title: string;
    paragraphs: readonly string[];
    audiences: readonly string[];
  };
  proof: readonly SeoLandingProofItem[];
  process: {
    title: string;
    intro: string;
    steps: readonly { n: string; title: string; desc: string }[];
  };
  why: {
    title: string;
    intro: string;
    points: readonly SeoLandingEditorialItem[];
  };
  pricing: {
    title: string;
    intro: string;
    packages: readonly SeoLandingPricingPackage[];
    footnote: string;
  };
  faqs: readonly SeoLandingFaqItem[];
  faqSectionTitle: string;
  related: readonly SeoLandingLink[];
  finalCta: {
    title: string;
    description: string;
  };
  serviceSchema: {
    name: string;
    description: string;
    serviceType: string;
    areaServed: readonly string[];
  };
  analytics: {
    contactSource: string;
    whatsappSource: string;
    serviceParam: string;
  };
};
