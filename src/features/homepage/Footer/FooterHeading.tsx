import { cn } from "@/lib/cn";
import type { ReactNode } from "react";

interface FooterHeadingProps {
  id: string;
  children: ReactNode;
  className?: string;
}

/**
 * Footer column label — not a page heading / H2.
 * Shared by Services, Solutions, Resources, Company, Contact Us, Newsletter.
 * Typography is owned by `.footer-heading` in footer.css.
 */
export function FooterHeading({ id, children, className }: FooterHeadingProps) {
  return (
    <p id={id} className={cn("footer-heading", className)}>
      {children}
    </p>
  );
}
