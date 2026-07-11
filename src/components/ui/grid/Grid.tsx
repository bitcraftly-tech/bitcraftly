import { cn } from "@/lib/cn";
import type { GridColumns, GridElement, GridGap, GridProps } from "./grid.types";

const columnStyles: Record<GridColumns, string> = {
  1: "grid-cols-1",
  2: "grid-cols-2",
  3: "grid-cols-3",
  4: "grid-cols-4",
  6: "grid-cols-6",
  12: "grid-cols-12",
};

const smColumnStyles: Record<GridColumns, string> = {
  1: "sm:grid-cols-1",
  2: "sm:grid-cols-2",
  3: "sm:grid-cols-3",
  4: "sm:grid-cols-4",
  6: "sm:grid-cols-6",
  12: "sm:grid-cols-12",
};

const mdColumnStyles: Record<GridColumns, string> = {
  1: "md:grid-cols-1",
  2: "md:grid-cols-2",
  3: "md:grid-cols-3",
  4: "md:grid-cols-4",
  6: "md:grid-cols-6",
  12: "md:grid-cols-12",
};

const lgColumnStyles: Record<GridColumns, string> = {
  1: "lg:grid-cols-1",
  2: "lg:grid-cols-2",
  3: "lg:grid-cols-3",
  4: "lg:grid-cols-4",
  6: "lg:grid-cols-6",
  12: "lg:grid-cols-12",
};

const xlColumnStyles: Record<GridColumns, string> = {
  1: "xl:grid-cols-1",
  2: "xl:grid-cols-2",
  3: "xl:grid-cols-3",
  4: "xl:grid-cols-4",
  6: "xl:grid-cols-6",
  12: "xl:grid-cols-12",
};

const gapStyles: Record<GridGap, string> = {
  "0": "gap-0",
  "1": "gap-1",
  "2": "gap-2",
  "3": "gap-3",
  "4": "gap-4",
  "6": "gap-6",
  "8": "gap-8",
};

export function Grid({
  cols = 1,
  sm,
  md,
  lg,
  xl,
  gap = "4",
  as: Component = "div",
  className,
  children,
  ...props
}: GridProps) {
  const Element = Component as GridElement;

  return (
    <Element
      className={cn(
        "grid",
        columnStyles[cols],
        sm !== undefined ? smColumnStyles[sm] : undefined,
        md !== undefined ? mdColumnStyles[md] : undefined,
        lg !== undefined ? lgColumnStyles[lg] : undefined,
        xl !== undefined ? xlColumnStyles[xl] : undefined,
        gapStyles[gap],
        className,
      )}
      {...props}
    >
      {children}
    </Element>
  );
}
