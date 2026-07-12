import { Icon } from "@/components/ui/icon";
import type { IconSize } from "@/components/ui/icon";
import { cn } from "@/lib/cn";
import { buildResponsiveClasses } from "../typography/utils";
import type { IconBoxProps, IconBoxSize, IconBoxVariant } from "./types";

const variantStyles: Record<IconBoxVariant, string> = {
  default:
    "border border-border bg-surface text-foreground shadow-sm",
  primary:
    "border border-transparent bg-gradient-to-br from-primary to-accent text-primary-foreground shadow-md",
  secondary:
    "border border-transparent bg-secondary text-secondary-foreground shadow-sm",
  glass:
    "border border-border/80 bg-background/70 text-foreground shadow-sm backdrop-blur-md",
};

const boxSizeStyles: Record<IconBoxSize, string> = {
  sm: "size-[var(--space-4)] rounded-lg",
  md: "size-[var(--space-5)] rounded-xl",
  lg: "size-[var(--space-6)] rounded-xl",
};

const iconSizeMap: Record<IconBoxSize, IconSize> = {
  sm: "sm",
  md: "md",
  lg: "lg",
};

export function IconBox({
  icon,
  variant = "default",
  size = "md",
  className,
  iconTitle,
  children,
}: IconBoxProps) {
  const resolvedSize = typeof size === "string" ? size : (size.base ?? "md");
  const iconSize = iconSizeMap[resolvedSize];
  const isDecorativeIcon = Boolean(children) || !iconTitle;

  const iconContainer = (
    <div
      className={cn(
        "grid shrink-0 place-items-center",
        variantStyles[variant],
        buildResponsiveClasses(size, boxSizeStyles, "md"),
      )}
    >
      <Icon
        name={icon}
        size={iconSize}
        title={isDecorativeIcon ? undefined : iconTitle}
        aria-hidden={isDecorativeIcon ? true : undefined}
      />
    </div>
  );

  if (!children) {
    return (
      <div className={cn("inline-flex", className)}>
        {iconContainer}
      </div>
    );
  }

  return (
    <div
      className={cn(
        "inline-flex items-center gap-[var(--space-2)]",
        className,
      )}
    >
      {iconContainer}
      <div>{children}</div>
    </div>
  );
}
