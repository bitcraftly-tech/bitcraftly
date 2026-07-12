import Link from "next/link";
import { Icon } from "@/components/ui/icon";
import type { NavChildLink } from "@/constants/navigation";
import { cn } from "@/lib/cn";

interface MegaMenuItemProps {
  item: NavChildLink;
  onSelect?: () => void;
  className?: string;
  /** Compact row for dense grouped mega menus. */
  dense?: boolean;
}

export function MegaMenuItem({
  item,
  onSelect,
  className,
  dense = false,
}: MegaMenuItemProps) {
  return (
    <Link
      href={item.href}
      onClick={onSelect}
      className={cn(
        "group flex items-center gap-[10px] rounded-[10px] no-underline",
        dense ? "gap-[8px] px-[8px] py-[5px]" : "gap-[12px] px-[10px] py-[10px]",
        "transition-colors duration-200 ease-out",
        "hover:bg-surface focus-visible:bg-surface",
        "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-background",
        className,
      )}
    >
      <span
        className={cn(
          "grid shrink-0 place-items-center rounded-[9px]",
          dense ? "size-[26px]" : "size-[36px] rounded-[10px]",
          "border border-border/70 bg-background text-muted-foreground",
          "transition-all duration-200",
          "group-hover:border-primary/20 group-hover:bg-primary/5 group-hover:text-primary",
        )}
      >
        <Icon
          name={item.icon}
          size="sm"
          aria-hidden
          className={dense ? "!h-[13px] !w-[13px]" : "!h-[16px] !w-[16px]"}
        />
      </span>

      <span className="min-w-0 flex-1">
        <span className="flex items-center gap-[6px]">
          <span
            className={cn(
              "truncate font-sans font-semibold leading-[1.25] tracking-[-0.01em] text-foreground transition-colors duration-200 group-hover:text-primary",
              dense ? "text-[12px]" : "text-[13px]",
            )}
          >
            {item.label}
          </span>
          <Icon
            name="arrow-right"
            size="sm"
            aria-hidden
            className="!h-[11px] !w-[11px] shrink-0 -translate-x-1 text-primary opacity-0 transition-all duration-200 group-hover:translate-x-0 group-hover:opacity-100"
          />
        </span>
        {!dense ? (
          <span
            className="mt-[3px] block truncate font-sans text-[12px] font-normal leading-[1.35] text-muted-foreground"
            title={item.description}
          >
            {item.description}
          </span>
        ) : null}
      </span>
    </Link>
  );
}
