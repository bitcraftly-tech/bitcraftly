import { cn } from "@/lib/cn";
import type {
  ContainerElement,
  ContainerProps,
  ContainerSize,
} from "./container.types";

const sizeStyles: Record<ContainerSize, string> = {
  sm: "max-w-[var(--container-sm)]",
  md: "max-w-[var(--container-md)]",
  lg: "max-w-[var(--container-lg)]",
  xl: "max-w-[var(--container-xl)]",
  "2xl": "max-w-[var(--container-2xl)]",
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
        sizeStyles[size],
        className,
      )}
      {...props}
    >
      {children}
    </Element>
  );
}
