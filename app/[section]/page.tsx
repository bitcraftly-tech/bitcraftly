import { notFound } from "next/navigation";

import LandingPage from "@/components/landing/LandingPage";

const ALLOWED_SECTIONS = ["features", "pricing", "demo", "about"] as const;
type AllowedSection = (typeof ALLOWED_SECTIONS)[number];

type SectionPageProps = {
  params: Promise<{
    section: string;
  }>;
};

export function generateStaticParams() {
  return ALLOWED_SECTIONS.map((section) => ({ section }));
}

export default async function SectionPage({ params }: SectionPageProps) {
  const { section } = await params;

  if (!ALLOWED_SECTIONS.includes(section as AllowedSection)) {
    notFound();
  }

  return <LandingPage sectionId={section as AllowedSection} />;
}
