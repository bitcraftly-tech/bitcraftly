import { cn } from "@/lib/cn";
import { buildResponsiveClasses } from "../typography/utils";
import type { ContainerElement, ContainerProps, ContainerSize } from "./types";

/**
 * Marketing default (`xl`) uses design tokens that match the Header:
 * --container-xl (1280px) + --container-padding (32px).
 * Do not override with per-page max-width utilities.
 */
const sizeStyles: Record<ContainerSize, string> = {
  sm: "max-w-[var(--container-sm)]",
  md: "max-w-[var(--container-md)]",
  lg: "max-w-[var(--container-lg)]",
  xl: "max-w-[var(--container-xl)]",
  full: "max-w-full",
};

export function Container({
  size = "xl",
  as: Component = "div",
  className,
  children,
  ...props
}: ContainerProps) {
  const Element = Component as ContainerElement;

  return (
    <Element
      className={cn(
        "mx-auto w-full px-[var(--container-padding)]",
        buildResponsiveClasses(size, sizeStyles, "xl"),
        className,
      )}
      {...props}
    >
      {children}
    </Element>
  );
}
