"use client";

import { Children, isValidElement, type ReactElement, type ReactNode } from "react";

import FadeInOnView, { type RevealDirection } from "@/components/ui/FadeInOnView";
import SeoLandingJsonLd from "@/components/seo-landing/SeoLandingJsonLd";
import SeoLandingPage from "@/components/seo-landing/SeoLandingPage";

type MarketingScrollMainProps = {
  children: ReactNode;
};

const REVEAL_DIRECTIONS: RevealDirection[] = ["up", "left", "right", "down"];

const SKIP_SCROLL_REVEAL_NAMES = new Set([
  "SectionPageNav",
  "MarketingPageNav",
  "PricingPageNav",
  "SeoLandingJsonLd",
  "SeoLandingPage",
  "JsonLdScript",
]);

function getComponentName(type: unknown): string | null {
  if (typeof type !== "function") return null;
  const fn = type as { displayName?: string; name?: string };
  return fn.displayName ?? fn.name ?? null;
}

function shouldSkipScrollReveal(child: ReactElement): boolean {
  if (child.props?.["data-skip-scroll-reveal"]) return true;
  if (child.type === FadeInOnView) return true;
  if (child.type === SeoLandingJsonLd || child.type === SeoLandingPage) return true;
  const name = getComponentName(child.type);
  if (name && SKIP_SCROLL_REVEAL_NAMES.has(name)) return true;
  return false;
}
export default function MarketingScrollMain({ children }: MarketingScrollMainProps) {
  const items = Children.toArray(children);
  let revealIndex = 0;

  return (
    <>
      {items.map((child, index) => {
        if (!isValidElement(child)) return child;

        if (shouldSkipScrollReveal(child)) {
          return child;
        }

        const eager = revealIndex === 0;
        const direction = REVEAL_DIRECTIONS[revealIndex % REVEAL_DIRECTIONS.length] ?? "up";
        revealIndex += 1;

        return (
          <FadeInOnView
            key={child.key ?? `scroll-section-${index}`}
            eager={eager}
            direction={direction}
            delayMs={eager ? 0 : Math.min(revealIndex * 45, 180)}
          >
            {child}
          </FadeInOnView>
        );
      })}
    </>
  );
}
