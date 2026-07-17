"use client";

import { MountWhenVisible } from "@/components/patterns/mount-when-visible";
import { COST_CALCULATOR_CONTENT } from "./cost-calculator.content";

const loadExperience = () =>
  import("./CostCalculatorExperience").then((mod) => {
    const Experience = mod.CostCalculatorExperience;
    function BoundCostCalculatorExperience() {
      return <Experience content={COST_CALCULATOR_CONTENT} />;
    }
    return BoundCostCalculatorExperience;
  });

/** Defers calculator client bundle until near viewport. */
export function CostCalculatorExperienceLazy() {
  return (
    <MountWhenVisible
      load={loadExperience}
      fallback={
        <div
          className="min-h-[32rem] w-full rounded-[var(--token-radius-lg)] bg-surface/50"
          aria-hidden
        />
      }
    />
  );
}
