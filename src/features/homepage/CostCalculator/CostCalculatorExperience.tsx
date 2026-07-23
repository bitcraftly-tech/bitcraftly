"use client";

import dynamic from "next/dynamic";
import Link from "next/link";
import { useEffect, useId, useRef, useState } from "react";
import { Icon } from "@/components/ui/icon";
import { trackCostCalculatorEvent } from "./analytics";
import type { CostCalculatorCmsContent } from "./cost-calculator.types";

const PricingCalculatorWizard = dynamic(
  () =>
    import("./PricingCalculatorWizard").then(
      (module) => module.PricingCalculatorWizard,
    ),
  {
    ssr: false,
    loading: () => (
      <div className="pricing-wizard-skeleton" aria-busy="true">
        Loading calculator…
      </div>
    ),
  },
);

interface CostCalculatorExperienceProps {
  content: CostCalculatorCmsContent;
}

export function CostCalculatorExperience({
  content,
}: CostCalculatorExperienceProps) {
  const [calculatorOpen, setCalculatorOpen] = useState(false);
  const panelRef = useRef<HTMLDivElement>(null);
  const calculatorId = useId();

  useEffect(() => {
    if (!calculatorOpen) return;
    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;
    panelRef.current?.scrollIntoView({
      behavior: prefersReducedMotion ? "auto" : "smooth",
      block: "start",
    });
  }, [calculatorOpen]);

  function openCalculator() {
    setCalculatorOpen(true);
    trackCostCalculatorEvent("calculator_opened");
  }

  return (
    <div className="cost-calculator-experience">
      <div className="cost-calculator-intro-card cost-calculator-row !p-[16px]">
        <div className="cost-calculator-row-main">
          <div className="cost-calculator-badge-row">
            <span className="cost-calculator-badge">{content.intro.badge}</span>
            <span className="cost-calculator-pricing-badge">
              {content.intro.pricingBadge}
            </span>
          </div>

          <h2 id={content.headingId} className="cost-calculator-intro-heading">
            {content.intro.heading}
          </h2>

          <p className="cost-calculator-intro-copy">
            {content.intro.description}
          </p>

          <ul className="cost-calculator-trust">
            {content.intro.trustBadges.map((badge) => (
              <li key={badge}>{badge}</li>
            ))}
          </ul>
        </div>

        <div className="cost-calculator-row-aside">
          <div className="cost-calculator-intro-actions">
            <button
              type="button"
              className="cost-calculator-primary-cta"
              aria-expanded={calculatorOpen}
              aria-controls={calculatorId}
              onClick={openCalculator}
            >
              <Icon
                name="layout-grid"
                size="sm"
                aria-hidden
                className="h-[16px] w-[16px]"
              />
              {content.intro.calculateCtaLabel}
              <Icon
                name="arrow-up-right"
                size="sm"
                aria-hidden
                className="h-[14px] w-[14px]"
              />
            </button>

            <Link
              href={content.intro.packagesHref}
              target={
                content.intro.packagesHref.startsWith("http")
                  ? "_blank"
                  : undefined
              }
              rel={
                content.intro.packagesHref.startsWith("http")
                  ? "noopener noreferrer"
                  : undefined
              }
              className="cost-calculator-secondary-cta"
              onClick={() => trackCostCalculatorEvent("view_packages_clicked")}
            >
              {content.intro.packagesCtaLabel}
            </Link>
          </div>
        </div>
      </div>

      {calculatorOpen ? (
        <div
          ref={panelRef}
          id={calculatorId}
          className="cost-calculator-panel cost-calculator-panel--wizard"
          role="region"
          aria-label="Bitcraftly pricing calculator"
          tabIndex={-1}
        >
          <div className="cost-calculator-panel-header">
            <p className="cost-calculator-panel-kicker">
              Original Bitcraftly estimator
            </p>
            <button
              type="button"
              className="cost-calculator-close"
              aria-label="Close calculator"
              onClick={() => setCalculatorOpen(false)}
            >
              <Icon
                name="close"
                size="sm"
                aria-hidden
                className="h-[16px] w-[16px]"
              />
            </button>
          </div>
          <PricingCalculatorWizard content={content} />
        </div>
      ) : null}
    </div>
  );
}
