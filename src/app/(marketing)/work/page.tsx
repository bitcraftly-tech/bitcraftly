import type { Metadata } from "next";
import { WorkLandingPage } from "@/features/work";
import { ROUTES } from "@/constants/navigation";
import { createPageMetadata } from "@/lib/seo/createPageMetadata";

export const metadata: Metadata = createPageMetadata({
  title: "Work",
  description:
    "Explore Bitcraftly projects, case studies, portfolio work, testimonials, and business outcomes.",
  path: ROUTES.work,
});

export default function WorkPage() {
  return <WorkLandingPage />;
}
