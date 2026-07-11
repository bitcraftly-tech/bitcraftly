import { cn } from "@/lib/cn";
import type { StackAlign, StackElement, StackProps, StackSpacing } from "./stack.types";

const spacingStyles: Record<StackSpacing, string> = {
  "0": "gap-0",
  "1": "gap-1",
  "2": "gap-2",
  "3": "gap-3",
  "4": "gap-4",
  "6": "gap-6",
  "8": "gap-8",
};

const alignStyles: Record<StackAlign, string> = {
  start: "items-start",
  center: "items-center",
  end: "items-end",
  stretch: "items-stretch",
};

export function Stack({
  spacing = "4",
  align = "stretch",
  as: Component = "div",
  className,
  children,
  ...props
}: StackProps) {
  const Element = Component as StackElement;

  return (
    <Element
      className={cn(
        "flex flex-col",
        spacingStyles[spacing],
        alignStyles[align],
        className,
      )}
      {...props}
    >
      {children}
    </Element>
  );
}
