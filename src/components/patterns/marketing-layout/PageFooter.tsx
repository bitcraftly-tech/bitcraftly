import type { ReactNode } from "react";
import { Section } from "@/components/ui/section";
import { cn } from "@/lib/cn";

export interface PageFooterProps {
  children: ReactNode;
  className?: string;
  "aria-labelledby"?: string;
}

/**
 * Page-level footer band (CTA / closing block) before site Newsletter/Footer.
 * Uses the shared Section shell so width + rhythm match Homepage Final CTA.
 */
export function PageFooter({
  children,
  className,
  "aria-labelledby": ariaLabelledBy,
}: PageFooterProps) {
  return (
    <Section
      spacing="lg"
      background="default"
      aria-labelledby={ariaLabelledBy}
      className={cn("border-t border-border/40", className)}
    >
      {children}
    </Section>
  );
}
