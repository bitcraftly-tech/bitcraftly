import { notFound } from "next/navigation";

import LandingPage from "@/components/landing/LandingPage";

const ALLOWED_SECTIONS = ["features", "pricing", "demo", "about"] as const;
type AllowedSection = (typeof ALLOWED_SECTIONS)[number];

type SectionPageProps = {
  params: {
    section: string;
  };
};

export function generateStaticParams() {
  return ALLOWED_SECTIONS.map((section) => ({ section }));
}

export default function SectionPage({ params }: SectionPageProps) {
  if (!ALLOWED_SECTIONS.includes(params.section as AllowedSection)) {
    notFound();
  }

  return <LandingPage sectionId={params.section as AllowedSection} />;
}
