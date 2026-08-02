export interface BreadcrumbItem {
  label: string;
  /** Omit href for the current page crumb. */
  href?: string;
}

export function buildBreadcrumbs(items: readonly BreadcrumbItem[]): BreadcrumbItem[] {
  return items.map((item, index) => {
    const isLast = index === items.length - 1;
    if (isLast) {
      return { label: item.label };
    }
    return item;
  });
}

/** Home → Work → … category / project crumbs. */
export function buildWorkBreadcrumbs(crumbs: readonly BreadcrumbItem[] = []): BreadcrumbItem[] {
  return buildBreadcrumbs([
    { label: 'Home', href: '/' },
    { label: 'Work', href: '/work' },
    ...crumbs,
  ]);
}

/** Home → Services → … service crumbs. */
export function buildServicesBreadcrumbs(crumbs: readonly BreadcrumbItem[] = []): BreadcrumbItem[] {
  return buildBreadcrumbs([
    { label: 'Home', href: '/' },
    { label: 'Services', href: '/services' },
    ...crumbs,
  ]);
}

/** Home → Solutions → … solution crumbs. */
export function buildSolutionsBreadcrumbs(
  crumbs: readonly BreadcrumbItem[] = [],
): BreadcrumbItem[] {
  return buildBreadcrumbs([
    { label: 'Home', href: '/' },
    { label: 'Solutions', href: '/solutions' },
    ...crumbs,
  ]);
}

/** Home → Industries → … industry crumbs. */
export function buildIndustriesBreadcrumbs(
  crumbs: readonly BreadcrumbItem[] = [],
): BreadcrumbItem[] {
  return buildBreadcrumbs([
    { label: 'Home', href: '/' },
    { label: 'Industries', href: '/industries' },
    ...crumbs,
  ]);
}

/** Home → Case Studies → … crumbs. */
export function buildCaseStudiesBreadcrumbs(
  crumbs: readonly BreadcrumbItem[] = [],
): BreadcrumbItem[] {
  return buildBreadcrumbs([
    { label: 'Home', href: '/' },
    { label: 'Case Studies', href: '/case-studies' },
    ...crumbs,
  ]);
}

/** Home → Pricing. */
export function buildPricingBreadcrumbs(crumbs: readonly BreadcrumbItem[] = []): BreadcrumbItem[] {
  return buildBreadcrumbs([
    { label: 'Home', href: '/' },
    { label: 'Pricing', href: '/pricing' },
    ...crumbs,
  ]);
}

/** Home → Contact. */
export function buildContactBreadcrumbs(crumbs: readonly BreadcrumbItem[] = []): BreadcrumbItem[] {
  return buildBreadcrumbs([
    { label: 'Home', href: '/' },
    { label: 'Contact', href: '/contact' },
    ...crumbs,
  ]);
}

/** Home → About. */
export function buildAboutBreadcrumbs(crumbs: readonly BreadcrumbItem[] = []): BreadcrumbItem[] {
  return buildBreadcrumbs([
    { label: 'Home', href: '/' },
    { label: 'About', href: '/about' },
    ...crumbs,
  ]);
}

/** Home → Resources → … crumbs. */
export function buildResourcesBreadcrumbs(
  crumbs: readonly BreadcrumbItem[] = [],
): BreadcrumbItem[] {
  return buildBreadcrumbs([
    { label: 'Home', href: '/' },
    { label: 'Resources', href: '/resources' },
    ...crumbs,
  ]);
}

/** Home → Blog → … post crumbs. */
export function buildBlogBreadcrumbs(crumbs: readonly BreadcrumbItem[] = []): BreadcrumbItem[] {
  return buildBreadcrumbs([
    { label: 'Home', href: '/' },
    { label: 'Blog', href: '/blog' },
    ...crumbs,
  ]);
}
