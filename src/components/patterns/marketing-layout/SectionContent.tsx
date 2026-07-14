import type { HTMLAttributes, ReactNode } from "react";
import { cn } from "@/lib/cn";

export interface SectionContentProps extends HTMLAttributes<HTMLDivElement> {
  children: ReactNode;
}

/**
 * Full-width body slot inside a marketing Section / Container.
 * Keeps grids and stacks on the shared content edge.
 */
export function SectionContent({
  children,
  className,
  ...props
}: SectionContentProps) {
  return (
    <div className={cn("w-full min-w-0", className)} {...props}>
      {children}
    </div>
  );
}
