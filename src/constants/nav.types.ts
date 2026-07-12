import type { IconName } from "@/components/ui/icon";

/** Leaf link used across mega menus, mobile nav, footer, and sidebars. */
export interface NavLinkItem {
  slug: string;
  label: string;
  description: string;
  icon: IconName;
  /** Absolute path override when the item is not under its parent segment. */
  href?: string;
}

/** Named column/section inside a mega menu. */
export interface NavGroup {
  id: string;
  title: string;
  items: readonly NavLinkItem[];
}

export interface NavFeaturedCard {
  eyebrow: string;
  label: string;
  description: string;
  href: string;
  icon: IconName;
  ctaLabel: string;
  badge?: string;
  highlights?: readonly string[];
}

/** Flattened child link for components that do not need group metadata. */
export interface NavChildLink {
  label: string;
  href: string;
  description: string;
  icon: IconName;
  slug?: string;
}

export interface SiteNavLink {
  label: string;
  href: string;
  description?: string;
  hasDropdown?: boolean;
  /** Preferred mega-menu structure (grouped columns). */
  groups?: readonly NavGroup[];
  /** Flat children — always derived from groups when groups exist. */
  children?: readonly NavChildLink[];
  featured?: NavFeaturedCard;
  /** Desktop mega-menu footer CTA label. */
  exploreAllLabel?: string;
  /** Mobile accordion footer CTA label. */
  viewAllLabel?: string;
  /**
   * Menu presentation.
   * - default: full-width mega menu
   * - compact: constrained dropdown (e.g. Work)
   */
  menuVariant?: "default" | "compact";
}

export interface SiteNavAction {
  label: string;
  href: string;
}

export interface CreateDropdownNavInput {
  label: string;
  href: string;
  description: string;
  groups: readonly NavGroup[];
  featured?: NavFeaturedCard;
  exploreAllLabel?: string;
  viewAllLabel?: string;
  menuVariant?: "default" | "compact";
}

export function toNavChildLink(
  item: NavLinkItem,
  parentPath: string,
): NavChildLink {
  return {
    slug: item.slug,
    label: item.label,
    description: item.description,
    icon: item.icon,
    href: item.href ?? `${parentPath}/${item.slug}`,
  };
}

export function flattenNavGroups(
  groups: readonly NavGroup[],
  parentPath: string,
): NavChildLink[] {
  return groups.flatMap((group) =>
    group.items.map((item) => toNavChildLink(item, parentPath)),
  );
}

export function getSiteNavChildren(link: SiteNavLink): readonly NavChildLink[] {
  if (link.groups?.length) {
    return flattenNavGroups(link.groups, link.href);
  }

  return link.children ?? [];
}

export function hasMegaMenu(link: SiteNavLink): boolean {
  return Boolean(
    link.hasDropdown &&
      ((link.groups && link.groups.length > 0) ||
        (link.children && link.children.length > 0)),
  );
}

/** Builds a dropdown nav entry — children are derived from groups. */
export function createDropdownNav({
  label,
  href,
  description,
  groups,
  featured,
  exploreAllLabel,
  viewAllLabel,
  menuVariant = "default",
}: CreateDropdownNavInput): SiteNavLink {
  const lower = label.toLowerCase();

  return {
    label,
    href,
    description,
    hasDropdown: true,
    groups,
    children: flattenNavGroups(groups, href),
    featured,
    exploreAllLabel: exploreAllLabel ?? `Explore all ${lower}`,
    viewAllLabel: viewAllLabel ?? `View all ${lower}`,
    menuVariant,
  };
}

export function createSimpleNavLink(input: {
  label: string;
  href: string;
  description?: string;
}): SiteNavLink {
  return {
    label: input.label,
    href: input.href,
    description: input.description,
  };
}
