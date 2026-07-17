import type { Metadata } from "next";
import { AdminShell } from "@/features/admin";
import "@/features/admin/admin.css";

export const metadata: Metadata = {
  title: {
    default: "Admin",
    template: "%s | Bitcraftly Admin",
  },
  description: "Bitcraftly admin panel — UI architecture preview.",
  robots: {
    index: false,
    follow: false,
    googleBot: {
      index: false,
      follow: false,
    },
  },
};

/**
 * Admin route group layout — isolated from marketing chrome.
 * Future: add JWT/session auth gate before rendering children.
 */
export default function AdminLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <AdminShell>{children}</AdminShell>;
}
