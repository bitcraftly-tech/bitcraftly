"use client";

import { MountWhenVisible } from "@/components/patterns/mount-when-visible";
import { COST_CALCULATOR_CONTENT } from "./cost-calculator.content";

const loadExperience = () =>
  import("./FounderMessageExperience").then((mod) => {
    const Experience = mod.FounderMessageExperience;
    function BoundFounderMessageExperience() {
      return <Experience content={COST_CALCULATOR_CONTENT.founder} />;
    }
    return BoundFounderMessageExperience;
  });

/** Defers founder audio client bundle until near viewport. */
export function FounderMessageExperienceLazy() {
  return (
    <MountWhenVisible
      load={loadExperience}
      fallback={
        <div
          className="min-h-[18rem] w-full rounded-[var(--token-radius-lg)] bg-surface/50"
          aria-hidden
        />
      }
    />
  );
}
