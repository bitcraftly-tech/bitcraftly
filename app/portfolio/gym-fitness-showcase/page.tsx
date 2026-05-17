import type { Metadata } from "next";

import GymShowcaseLayout from "./GymShowcaseLayout";
import GymFitnessShowcaseDemo from "./GymFitnessShowcaseDemo";

export const metadata: Metadata = {
  title: "FitRally · Gym & Fitness Showcase | Bitcraftly",
  description:
    "Fitness platform demo — group formats, rallypass memberships, centers, free trials & BMI tool.",
};

export default function GymFitnessShowcasePage() {
  return (
    <GymShowcaseLayout>
      <GymFitnessShowcaseDemo />
    </GymShowcaseLayout>
  );
}
