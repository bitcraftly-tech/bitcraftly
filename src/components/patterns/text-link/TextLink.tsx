import Link from "next/link";
import { Icon } from "@/components/ui/icon";
import type { IconName } from "@/components/ui/icon";
import { cn } from "@/lib/cn";
import type { TextLinkIcon, TextLinkProps, TextLinkVariant } from "./types";

const variantStyles: Record<TextLinkVariant, string> = {
  default: "text-foreground hover:text-primary",
  primary: "text-primary hover:text-primary-hover",
  muted: "text-muted-foreground hover:text-foreground",
};

const iconMap: Record<Exclude<TextLinkIcon, "none">, IconName> = {
  "right-arrow": "arrow-right",
  "up-right": "arrow-up-right",
};

export function TextLink({
  href,
  children,
  variant = "primary",
  icon = "none",
  underlineOnHover = true,
  external = false,
  className,
}: TextLinkProps) {
  const iconName = icon === "none" ? undefined : iconMap[icon];

  return (
    <Link
      href={href}
      target={external ? "_blank" : undefined}
      rel={external ? "noopener noreferrer" : undefined}
      className={cn(
        "inline-flex items-center gap-[var(--space-1)] font-semibold no-underline transition-colors",
        "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-background",
        underlineOnHover && "hover:underline hover:underline-offset-[0.15em]",
        variantStyles[variant],
        className,
      )}
    >
      {children}
      {external ? (
        <span className="sr-only"> (opens in new tab)</span>
      ) : null}
      {iconName ? (
        <Icon name={iconName} size="sm" aria-hidden={true} />
      ) : null}
    </Link>
  );
}
