import type { Metadata } from "next";

import DayalShowcaseContent from "@/components/dayal/DayalShowcaseContent";
import { DAYAL, HERO_DESCRIPTION } from "@/lib/dayal/data";

export const metadata: Metadata = {
  title: `${DAYAL.brand} | Real Estate in ${DAYAL.location}`,
  description: HERO_DESCRIPTION,
  keywords: [
    "Dayal Builders",
    "Dayal Galaxy",
    "Dayal Vatika",
    "Dayal Enclave",
    "Teg Bahadur Block",
    "real estate Jamshedpur",
    "Dayal Tower Parsudih",
    "Dayal Residency Karandih",
  ],
  openGraph: {
    title: `${DAYAL.brand} — ${DAYAL.tagline}`,
    description: HERO_DESCRIPTION,
    type: "website",
  },
};

export default function DayalBuildersPage() {
  return <DayalShowcaseContent />;
}
