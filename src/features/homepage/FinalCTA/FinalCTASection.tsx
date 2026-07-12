import Link from "next/link";
import { Container } from "@/components/ui/container";
import { cn } from "@/lib/cn";
import { HomepageReveal } from "../shared/HomepageReveal";
import {
  FINAL_CTA_DESCRIPTION,
  FINAL_CTA_HEADING,
  FINAL_CTA_HEADING_ID,
  FINAL_CTA_PRIMARY,
  FINAL_CTA_SECONDARY,
  FINAL_CTA_SECTION_ID,
} from "./final-cta.constants";
import "./final-cta.css";

export function FinalCTASection() {
  return (
    <section
      id={FINAL_CTA_SECTION_ID}
      aria-labelledby={FINAL_CTA_HEADING_ID}
      className="bg-background text-foreground homepage-section"
    >
      <Container size="xl" className="max-w-[1280px] px-[var(--space-4)]">
        <HomepageReveal name="final-cta">
          <div className="final-cta-card">
            <h2 id={FINAL_CTA_HEADING_ID} className="final-cta-title relative z-[1]">
              {FINAL_CTA_HEADING}
            </h2>
            <p className="final-cta-description relative z-[1]">
              {FINAL_CTA_DESCRIPTION}
            </p>

            <div className="relative z-[1] mt-[28px] flex flex-wrap gap-[12px]">
              <Link
                href={FINAL_CTA_PRIMARY.href}
                className={cn(
                  "final-cta-button-primary inline-flex min-h-[48px] items-center justify-center",
                  "rounded-[12px] px-[24px] no-underline",
                  "font-sans text-[15px] font-semibold",
                  "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-foreground focus-visible:ring-offset-2 focus-visible:ring-offset-[#0e144a]",
                )}
              >
                {FINAL_CTA_PRIMARY.label}
              </Link>
              <Link
                href={FINAL_CTA_SECONDARY.href}
                target="_blank"
                rel="noopener noreferrer"
                className={cn(
                  "final-cta-button-secondary inline-flex min-h-[48px] items-center justify-center",
                  "rounded-[12px] px-[24px] no-underline",
                  "font-sans text-[15px] font-semibold",
                  "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-foreground focus-visible:ring-offset-2 focus-visible:ring-offset-[#0e144a]",
                )}
              >
                {FINAL_CTA_SECONDARY.label}
              </Link>
            </div>
          </div>
        </HomepageReveal>
      </Container>
    </section>
  );
}
