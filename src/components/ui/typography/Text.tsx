import { cn } from "@/lib/cn";
import type { TextElement, TextProps, TextSize } from "./types";
import { buildResponsiveClasses } from "./utils";

const sizeStyles: Record<TextSize, string> = {
  sm: "text-sm leading-normal",
  base: "text-base leading-normal",
  lg: "text-lg leading-relaxed",
};

export function Text({
  as: Component = "p",
  size = "base",
  muted = false,
  className,
  children,
  ...props
}: TextProps) {
  const Element = Component as TextElement;

  return (
    <Element
      className={cn(
        "font-sans",
        buildResponsiveClasses(size, sizeStyles, "base"),
        muted ? "text-muted-foreground" : "text-foreground",
        className,
      )}
      {...props}
    >
      {children}
    </Element>
  );
}
