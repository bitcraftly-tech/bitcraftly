import type { Metadata } from "next";

import DayalShowcaseContent from "@/components/dayal/DayalShowcaseContent";
import { DAYAL, HERO_DESCRIPTION } from "@/lib/dayal/data";

import DayalShowcaseLayout from "./DayalShowcaseLayout";

export const metadata: Metadata = {
  title: `${DAYAL.brand} · Luxury Township Showcase | Bitcraftly Portfolio`,
  description:
    "Premium real-estate showcase for Dayal Builders — Govindpur, Jamshedpur. Township living, world-class amenities, and site visit booking.",
  keywords: [
    "Dayal Builders",
    "Dayal City",
    "luxury real estate Jamshedpur",
    "Govindpur township",
    "premium homes Jharkhand",
  ],
  openGraph: {
    title: `${DAYAL.brand} — Premium Township`,
    description: HERO_DESCRIPTION,
    type: "website",
  },
};

export default function DayalBuildersShowcasePage() {
  return (
    <DayalShowcaseLayout>
      <main>
        <DayalShowcaseContent />
      </main>
    </DayalShowcaseLayout>
  );
}
