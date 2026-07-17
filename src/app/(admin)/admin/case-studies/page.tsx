import type { Metadata } from "next";
import { AdminCaseStudiesPage } from "@/features/admin";

export const metadata: Metadata = {
  title: "Case Studies",
};

export default function AdminCaseStudiesRoutePage() {
  return <AdminCaseStudiesPage />;
}
