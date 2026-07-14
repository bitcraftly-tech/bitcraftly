import Link from "next/link";
import { Container } from "@/components/ui/container";
import { Icon } from "@/components/ui/icon";
import { cn } from "@/lib/cn";
import { HomepageReveal } from "../shared/HomepageReveal";
import {
  WEBSITE_AUDIT_ACTIONS,
  WEBSITE_AUDIT_BADGES,
  WEBSITE_AUDIT_CHECKS,
  WEBSITE_AUDIT_DESCRIPTION,
  WEBSITE_AUDIT_HEADING,
  WEBSITE_AUDIT_HEADING_ID,
  WEBSITE_AUDIT_LABEL,
  WEBSITE_AUDIT_SECTION_ID,
} from "./website-audit.constants";
import "./website-audit.css";

export function WebsiteAuditSection() {
  return (
    <section
      id={WEBSITE_AUDIT_SECTION_ID}
      aria-labelledby={WEBSITE_AUDIT_HEADING_ID}
      className="bg-surface text-foreground homepage-section"
    >
      <Container size="xl">
        <HomepageReveal name="website-audit">
          <div
            className={cn(
              "website-audit-card rounded-[16px] p-[24px]",
              "sm:p-[28px] lg:p-[32px]",
            )}
          >
            <div
              className={cn(
                "flex flex-col gap-[28px]",
                "lg:flex-row lg:items-center lg:justify-between lg:gap-[48px]",
              )}
            >
              <div className="min-w-0 max-w-[520px]">
                <p
                  className={cn(
                    "website-audit-label m-0 mb-[var(--space-2)]",
                    "font-sans text-[12px] font-[var(--font-weight-semibold)]",
                    "uppercase tracking-[0.16em]",
                  )}
                >
                  {WEBSITE_AUDIT_LABEL}
                </p>

                <ul
                  className="website-audit-badges m-0 mb-[14px] flex list-none flex-wrap gap-[8px] p-0"
                  aria-label="Audit highlights"
                >
                  {WEBSITE_AUDIT_BADGES.map((badge) => (
                    <li key={badge.id} className="website-audit-badge">
                      {badge.label}
                    </li>
                  ))}
                </ul>

                <h2
                  id={WEBSITE_AUDIT_HEADING_ID}
                  className={cn(
                    "m-0 font-sans font-bold text-foreground",
                    "text-[28px] leading-[1.2] tracking-[-0.02em]",
                    "sm:text-[32px] lg:text-[34px]",
                  )}
                >
                  {WEBSITE_AUDIT_HEADING}
                </h2>

                <p
                  className={cn(
                    "m-0 mt-[var(--space-2)]",
                    "font-sans text-[15px] font-normal leading-[1.65] text-muted-foreground",
                    "sm:text-[16px]",
                  )}
                >
                  {WEBSITE_AUDIT_DESCRIPTION}
                </p>

                <p
                  className={cn(
                    "m-0 mt-[12px] font-sans text-[13px] font-medium",
                    "leading-[1.5] text-foreground",
                  )}
                >
                  Audit is a practical review — not an automated PDF spam funnel.
                  Real feedback from the founder.
                </p>

                <div className="mt-[24px] flex flex-wrap gap-[10px]">
                  {WEBSITE_AUDIT_ACTIONS.map((action) => (
                    <Link
                      key={action.id}
                      href={action.href}
                      target={action.href.startsWith("http") ? "_blank" : undefined}
                      rel={
                        action.href.startsWith("http")
                          ? "noopener noreferrer"
                          : undefined
                      }
                      className={cn(
                        "inline-flex min-h-[48px] items-center justify-center rounded-[12px] px-[20px]",
                        "font-sans text-[14px] font-semibold no-underline",
                        "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2",
                        action.variant === "primary"
                          ? "website-audit-button-primary"
                          : "website-audit-button-outline",
                      )}
                    >
                      {action.label}
                    </Link>
                  ))}
                </div>
              </div>

              <ul
                className={cn(
                  "m-0 grid list-none gap-[12px] p-0",
                  "sm:grid-cols-2 lg:min-w-[320px] lg:grid-cols-1",
                )}
              >
                {WEBSITE_AUDIT_CHECKS.map((check) => (
                  <li key={check.id} className="website-audit-check">
                    <span className="website-audit-check-icon" aria-hidden>
                      <Icon name="check" size="sm" className="h-[14px] w-[14px]" />
                    </span>
                    {check.label}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </HomepageReveal>
      </Container>
    </section>
  );
}
