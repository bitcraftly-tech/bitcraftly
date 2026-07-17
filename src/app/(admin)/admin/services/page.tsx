import type { Metadata } from "next";
import { AdminServicesPage } from "@/features/admin";

export const metadata: Metadata = {
  title: "Services",
};

export default function AdminServicesRoutePage() {
  return <AdminServicesPage />;
}
