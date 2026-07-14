import type { Metadata } from "next";
import { ContactLandingPage } from "@/features/contact";
import { ROUTES } from "@/constants/navigation";
import { createPageMetadata } from "@/lib/seo/createPageMetadata";

export const metadata: Metadata = createPageMetadata({
  title: "Contact",
  description:
    "Book a call or request a free consultation with the Bitcraftly team.",
  path: ROUTES.contact,
});

export default function ContactPage() {
  return <ContactLandingPage />;
}
