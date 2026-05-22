import type { Metadata } from "next";

import DayalShowcaseContent from "@/components/dayal/DayalShowcaseContent";
import { DAYAL, HERO_DESCRIPTION } from "@/lib/dayal/data";

export const metadata: Metadata = {
  title: `${DAYAL.brand} | Premium Township in ${DAYAL.location}`,
  description: HERO_DESCRIPTION,
  keywords: [
    "Dayal Builders",
    "Dayal City",
    "real estate Jamshedpur",
    "township Govindpur",
    "premium homes Jamshedpur",
    "RERA approved",
  ],
  openGraph: {
    title: `${DAYAL.brand} — Premium Township`,
    description: HERO_DESCRIPTION,
    type: "website",
  },
};

export default function DayalBuildersPage() {
  return <DayalShowcaseContent />;
}
