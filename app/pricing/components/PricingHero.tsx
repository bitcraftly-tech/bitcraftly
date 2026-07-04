import Link from "next/link";
import { ArrowRight, FileText } from "lucide-react";

import MarketingPageHero from "@/components/landing/MarketingPageHero";
import MarketingSectionLink from "@/components/landing/MarketingSectionLink";import { buildQuoteContactUrl } from "@/lib/leadGen";

export default function PricingHero() {
  return (
    <MarketingPageHero
      id="pricing-hero"
      eyebrow="Transparent pricing"
      title="Simple plans. Clear scope. No surprises."
      description="Compare Starter, Professional, and Enterprise in seconds. Starting prices below — final quote confirmed in writing before work starts."
      actions={
        <>
          <MarketingSectionLink path="/pricing" sectionId="pricing-plans" className="marketing-hero-btn marketing-hero-btn--primary">
            View plans
            <ArrowRight className="size-4 shrink-0" aria-hidden />
          </MarketingSectionLink>          <Link
            href={buildQuoteContactUrl("Professional Business Website", "pricing-hero")}
            className="marketing-hero-btn marketing-hero-btn--secondary"
          >
            <FileText className="size-4 shrink-0 opacity-70" aria-hidden />
            Get written quote
          </Link>
        </>
      }
    />
  );
}
