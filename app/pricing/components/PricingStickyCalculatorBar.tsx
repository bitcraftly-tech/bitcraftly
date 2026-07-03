"use client";

import Link from "next/link";
import { Calculator } from "lucide-react";

import { CONTAINER } from "@/lib/constants";

/** Sticky bottom bar — blinking red prompt to open cost calculator */
export default function PricingStickyCalculatorBar() {
  return (
    <div data-skip-scroll-reveal>
      <div
        className="pricing-sticky-calculator fixed inset-x-0 bottom-0 z-[9050] border-t border-red-200/80 bg-white/95 backdrop-blur-md dark:border-red-900/40 dark:bg-dark-bg-card/95"
        role="region"
        aria-label="Cost calculator"
      >
        <div className={`${CONTAINER} py-2 pb-[max(0.5rem,env(safe-area-inset-bottom,0px))]`}>
          <Link
            href="#project-cost-calculator"
            className="flex min-h-[48px] items-center justify-center gap-2.5 rounded-xl px-3 transition active:scale-[0.99] sm:gap-3"
          >
            <span className="pricing-red-blink-dot size-2.5 shrink-0 rounded-full bg-red-600" aria-hidden />
            <Calculator className="size-[18px] shrink-0 text-red-600 dark:text-red-400" aria-hidden />
            <span className="pricing-red-blink text-center text-sm font-bold text-red-600 sm:text-[15px] dark:text-red-400">
              Free cost calculator — get instant estimate
            </span>
            <span className="hidden text-sm font-semibold text-red-600/80 sm:inline dark:text-red-400/80">→</span>
          </Link>
        </div>
      </div>
      <div className="pricing-sticky-spacer" aria-hidden />
    </div>
  );
}
