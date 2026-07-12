import Link from "next/link";
import { Icon } from "@/components/ui/icon";
import type {
  NavChildLink,
  NavFeaturedCard,
  NavGroup,
  SiteNavLink,
} from "@/constants/navigation";
import { getSiteNavChildren } from "@/constants/navigation";
import { cn } from "@/lib/cn";
import { MegaMenuItem } from "./MegaMenuItem";

interface MegaMenuPanelProps {
  link: SiteNavLink;
  menuId: string;
  onSelect?: () => void;
  className?: string;
}

export function MegaMenuPanel({
  link,
  menuId,
  onSelect,
  className,
}: MegaMenuPanelProps) {
  const groups = link.groups ?? [];
  const flatChildren = getSiteNavChildren(link);
  const featured = link.featured ?? null;
  const useGroupedLayout = groups.length > 0;
  const isCompact = link.menuVariant === "compact";

  return (
    <div
      id={menuId}
      role="region"
      aria-label={`${link.label} menu`}
      className={cn(
        "header-mega-menu w-full min-w-0 overflow-hidden",
        "rounded-[14px] border border-border/70",
        "bg-background backdrop-blur-none",
        "shadow-[0_0_0_1px_rgba(15,23,42,0.04),0_8px_16px_-4px_rgba(15,23,42,0.06),0_24px_48px_-12px_rgba(15,23,42,0.12)]",
        className,
      )}
    >
      <div
        className={cn(
          "grid min-w-0",
          featured ? "lg:grid-cols-[minmax(0,1fr)_280px]" : undefined,
        )}
      >
        <div className="flex min-w-0 flex-col bg-background">
          {useGroupedLayout ? (
            <div className="flex min-w-0 flex-col gap-[10px] px-[12px] pt-[12px] pb-[8px]">
              {groups.map((group) => (
                <MegaMenuGroup
                  key={group.id}
                  group={group}
                  parentHref={link.href}
                  onSelect={onSelect}
                  compact={isCompact}
                />
              ))}
            </div>
          ) : (
            <>
              <div className="px-[16px] pt-[12px] pb-[4px]">
                <p className="font-sans text-[11px] font-semibold uppercase tracking-[0.14em] text-muted-foreground">
                  {link.label}
                </p>
              </div>
              <div
                className={cn(
                  "grid min-w-0 gap-x-[4px] gap-y-[0px] px-[8px] pb-[8px]",
                  flatChildren.length > 4 ? "sm:grid-cols-2" : "grid-cols-1",
                )}
              >
                {flatChildren.map((item) => (
                  <MegaMenuItem
                    key={item.href}
                    item={item}
                    onSelect={onSelect}
                  />
                ))}
              </div>
            </>
          )}

          <div className="mt-auto flex items-center justify-between gap-[12px] border-t border-border/60 bg-surface/50 px-[12px] py-[8px]">
            <Link
              href={link.href}
              onClick={onSelect}
              className={cn(
                "group/footer inline-flex items-center gap-[6px] no-underline",
                "font-sans text-[13px] font-medium text-muted-foreground",
                "transition-colors duration-200 hover:text-primary",
                "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2",
              )}
            >
              {link.exploreAllLabel ?? `Explore all ${link.label.toLowerCase()}`}
              <Icon
                name="arrow-right"
                size="sm"
                aria-hidden
                className="h-[12px] w-[12px] transition-transform duration-200 group-hover/footer:translate-x-[3px]"
              />
            </Link>
          </div>
        </div>

        {featured ? (
          <FeaturedMegaCard
            item={featured}
            onSelect={onSelect}
            compact={isCompact}
          />
        ) : null}
      </div>
    </div>
  );
}

function MegaMenuGroup({
  group,
  parentHref,
  onSelect,
  compact = false,
}: {
  group: NavGroup;
  parentHref: string;
  onSelect?: () => void;
  compact?: boolean;
}) {
  return (
    <div className="min-w-0">
      <p className="mb-[4px] px-[8px] font-sans text-[11px] font-semibold uppercase tracking-[0.14em] text-muted-foreground">
        {group.title}
      </p>
      <div className="grid min-w-0 grid-cols-1 gap-x-[4px] gap-y-[0px] sm:grid-cols-2 lg:grid-cols-3">
        {group.items.map((item) => {
          const child: NavChildLink = {
            slug: item.slug,
            label: item.label,
            description: item.description,
            icon: item.icon,
            href: item.href ?? `${parentHref}/${item.slug}`,
          };

          return (
            <MegaMenuItem
              key={child.href}
              item={child}
              onSelect={onSelect}
              dense
              className={compact ? "px-[6px] py-[4px]" : undefined}
            />
          );
        })}
      </div>
    </div>
  );
}

function FeaturedMegaCard({
  item,
  onSelect,
  compact = false,
}: {
  item: NavFeaturedCard;
  onSelect?: () => void;
  compact?: boolean;
}) {
  const highlights = item.highlights ?? [];

  return (
    <div
      className={cn(
        "h-full min-w-0 border-t border-border/60 bg-surface p-[8px]",
        "lg:border-t-0 lg:border-l lg:border-border/60",
      )}
    >
      <Link
        href={item.href}
        onClick={onSelect}
        className={cn(
          "header-mega-featured group relative flex h-full flex-col overflow-hidden rounded-[14px] no-underline",
          compact ? "p-[10px]" : "p-[14px]",
          "border border-border/70 bg-background",
          "shadow-[0_1px_2px_rgba(15,23,42,0.04),0_10px_28px_-14px_rgba(15,23,42,0.18)]",
          "transition-all duration-200",
          "hover:border-primary/25 hover:shadow-[0_1px_2px_rgba(15,23,42,0.04),0_16px_36px_-14px_rgba(37,99,235,0.28)]",
          "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2",
        )}
      >
        <span aria-hidden className="header-mega-featured-glow" />

        <div className="relative flex items-center justify-between gap-[8px]">
          <span className="font-sans text-[11px] font-semibold uppercase tracking-[0.14em] text-primary">
            {item.eyebrow}
          </span>
          {item.badge ? (
            <span className="inline-flex items-center gap-[4px] rounded-full border border-primary/15 bg-primary/10 px-[8px] py-[3px] font-sans text-[10px] font-semibold text-primary">
              <Icon
                name="sparkles"
                size="sm"
                aria-hidden
                className="!h-[10px] !w-[10px]"
              />
              {item.badge}
            </span>
          ) : null}
        </div>

        <div className="relative mt-[10px] flex items-center gap-[10px]">
          <span
            className={cn(
              "grid shrink-0 place-items-center rounded-[11px]",
              compact ? "size-[32px]" : "size-[36px]",
              "bg-gradient-to-br from-primary to-accent text-primary-foreground",
              "shadow-[0_10px_24px_-10px_color-mix(in_srgb,var(--primary)_60%,transparent)]",
              "transition-transform duration-200 group-hover:scale-[1.04]",
            )}
          >
            <Icon
              name={item.icon}
              size="md"
              aria-hidden
              className={compact ? "!h-[16px] !w-[16px]" : "!h-[18px] !w-[18px]"}
            />
          </span>

          <span className="min-w-0 flex-1">
            <span className="block font-sans text-[13px] font-semibold leading-[1.25] tracking-[-0.015em] text-foreground transition-colors duration-200 group-hover:text-primary">
              {item.label}
            </span>
            <span className="mt-[4px] block font-sans text-[11px] font-normal leading-[1.4] text-muted-foreground">
              {item.description}
            </span>
          </span>
        </div>

        {highlights.length > 0 ? (
          <ul
            className={cn(
              "relative mt-[10px] flex flex-col gap-[5px]",
              compact && "line-clamp-4",
            )}
          >
            {(compact ? highlights.slice(0, 3) : highlights).map((highlight) => (
              <li
                key={highlight}
                className="flex items-center gap-[8px] font-sans text-[11px] leading-[1.3] text-muted-foreground"
              >
                <span className="grid size-[14px] shrink-0 place-items-center rounded-full bg-primary/10 text-primary">
                  <Icon
                    name="check"
                    size="sm"
                    aria-hidden
                    className="!h-[8px] !w-[8px]"
                  />
                </span>
                <span className="truncate">{highlight}</span>
              </li>
            ))}
          </ul>
        ) : null}

        <span className="relative mt-auto block pt-[10px]">
          <span
            className={cn(
              "inline-flex w-full items-center justify-center gap-[6px]",
              "rounded-[10px] px-[12px] py-[7px]",
              "bg-gradient-to-r from-primary to-accent text-[12px] font-semibold text-primary-foreground",
              "shadow-[0_8px_18px_-10px_color-mix(in_srgb,var(--primary)_70%,transparent)]",
              "transition-opacity duration-200 group-hover:opacity-95",
            )}
          >
            {item.ctaLabel}
            <Icon
              name="arrow-right"
              size="sm"
              aria-hidden
              className="!h-[12px] !w-[12px] transition-transform duration-200 group-hover:translate-x-[3px]"
            />
          </span>
        </span>
      </Link>
    </div>
  );
}
