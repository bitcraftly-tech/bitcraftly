import type { Metadata } from "next";
import { AdminSettingsPage } from "@/features/admin";

export const metadata: Metadata = {
  title: "Settings",
};

export default function AdminSettingsRoutePage() {
  return <AdminSettingsPage />;
}
