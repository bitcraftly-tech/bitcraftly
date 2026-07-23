import type { Metadata } from "next";
import { CareersApplyPage } from "@/features/careers/CareersApplyPage";
import { ROUTES } from "@/constants/navigation";
import { createPageMetadata } from "@/lib/seo/createPageMetadata";

export const metadata: Metadata = createPageMetadata({
  title: "Apply | Careers",
  description:
    "Apply to Bitcraftly — multi-step careers form with role fit, portfolio, and resume links. Founder-led review.",
  path: `${ROUTES.careers}/apply`,
});

export default function CareersApplyRoutePage() {
  return <CareersApplyPage />;
}
