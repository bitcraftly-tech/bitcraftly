import { cn } from "@/lib/cn";
import {
  FOOTER_COMPANY_COLUMN,
  FOOTER_LINK_COLUMNS,
  FOOTER_NAV_COLUMNS,
} from "./footer.constants";
import { FooterHeading } from "./FooterHeading";
import { FooterLink } from "./FooterLink";
import type { FooterNavColumn } from "./footer.types";

interface FooterNavigationProps {
  className?: string;
  /** Mobile stacked multi-column wrap */
  stacked?: boolean;
  /** Desktop: only Services / Solutions / Resources */
  linksOnly?: boolean;
}

export function FooterNavigation({
  className,
  stacked = false,
  linksOnly = false,
}: FooterNavigationProps) {
  const columns = linksOnly ? FOOTER_LINK_COLUMNS : FOOTER_NAV_COLUMNS;

  if (stacked) {
    return (
      <div
        className={cn(
          "grid grid-cols-2 gap-x-[var(--space-2)] gap-y-[var(--space-3)] md:grid-cols-4",
          className,
        )}
      >
        {columns.map((column) => (
          <FooterNavGroup key={column.id} column={column} />
        ))}
      </div>
    );
  }

  return (
    <>
      {columns.map((column) => (
        <FooterNavGroup key={column.id} column={column} className={className} />
      ))}
    </>
  );
}

export function FooterCompanyColumn({ className }: { className?: string }) {
  return (
    <FooterNavGroup column={FOOTER_COMPANY_COLUMN} className={className} />
  );
}

export function FooterNavGroup({
  column,
  className,
}: {
  column: FooterNavColumn;
  className?: string;
}) {
  const headingId = `footer-nav-${column.id}`;

  return (
    <nav aria-labelledby={headingId} className={cn("min-w-0", className)}>
      <FooterHeading id={headingId}>{column.title}</FooterHeading>
      <ul className="flex flex-col gap-[var(--space-0-5)]">
        {column.links.map((link) => (
          <li key={`${column.id}-${link.href}`}>
            <FooterLink href={link.href} external={link.external}>
              {link.label}
            </FooterLink>
          </li>
        ))}
      </ul>
    </nav>
  );
}
