import type { Metadata } from "next";
import { WorkLandingPage, WORK_LANDING_META } from "@/features/work";
import { createPageMetadata } from "@/lib/seo/createPageMetadata";

export const metadata: Metadata = createPageMetadata({
  title: WORK_LANDING_META.title,
  description: WORK_LANDING_META.description,
  path: WORK_LANDING_META.path,
  keywords: WORK_LANDING_META.keywords,
  image: WORK_LANDING_META.image,
});

export default function WorkPage() {
  return <WorkLandingPage />;
}
