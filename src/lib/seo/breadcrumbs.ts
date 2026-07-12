export interface BreadcrumbItem {
  label: string;
  /** Omit href for the current page crumb. */
  href?: string;
}

export function buildBreadcrumbs(
  items: readonly BreadcrumbItem[],
): BreadcrumbItem[] {
  return items.map((item, index) => {
    const isLast = index === items.length - 1;
    if (isLast) {
      return { label: item.label };
    }
    return item;
  });
}

/** Home → Work → … category / project crumbs. */
export function buildWorkBreadcrumbs(
  crumbs: readonly BreadcrumbItem[] = [],
): BreadcrumbItem[] {
  return buildBreadcrumbs([
    { label: "Home", href: "/" },
    { label: "Work", href: "/work" },
    ...crumbs,
  ]);
}
