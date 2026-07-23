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

const focusRing = cn(
  "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-foreground",
  "focus-visible:ring-offset-2 focus-visible:ring-offset-[#0e144a]",
);

const buttonBase = cn(
  "inline-flex items-center justify-center gap-[8px]",
  "no-underline font-sans text-[15px] font-semibold",
  focusRing,
);

export function FinalCTASection() {
  return (
    <section
      id={FINAL_CTA_SECTION_ID}
      aria-labelledby={FINAL_CTA_HEADING_ID}
      className="bg-background text-foreground homepage-section"
    >
      <Container size="xl">
        <HomepageReveal name="final-cta" className="w-full">
          <div className="final-cta-card !p-[16px]">
            <h2
              id={FINAL_CTA_HEADING_ID}
              className="final-cta-title relative z-[1]"
            >
              {FINAL_CTA_HEADING}
            </h2>
            <p className="final-cta-description relative z-[1]">
              {FINAL_CTA_DESCRIPTION}
            </p>

            <div className="final-cta-actions">
              <Link
                href={FINAL_CTA_PRIMARY.href}
                className={cn("final-cta-button-primary", buttonBase)}
              >
                {FINAL_CTA_PRIMARY.label}
              </Link>
              <Link
                href={FINAL_CTA_SECONDARY.href}
                target="_blank"
                rel="noopener noreferrer"
                className={cn("final-cta-button-secondary", buttonBase)}
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
