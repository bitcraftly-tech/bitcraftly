'use client';

import { MountWhenVisible } from '@/components/patterns/mount-when-visible';

interface PricingCalculatorLazyProps {
  headingId: string;
}

const loadPricingCalculator = (headingId: string) =>
  import('./PricingCalculator').then((mod) => {
    const Calculator = mod.PricingCalculator;
    function BoundPricingCalculator() {
      return <Calculator headingId={headingId} />;
    }
    return BoundPricingCalculator;
  });

/** Defers react-hook-form calculator bundle until near viewport. */
export function PricingCalculatorLazy({ headingId }: PricingCalculatorLazyProps) {
  return (
    <MountWhenVisible
      load={() => loadPricingCalculator(headingId)}
      fallback={
        <div
          className="min-h-[28rem] w-full rounded-[var(--token-radius-lg)] bg-surface/40"
          aria-hidden="true"
        />
      }
    />
  );
}
