import { OwnerDashboardShell } from "@/features/owner-auth";

export default function OwnerDashboardLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <OwnerDashboardShell>{children}</OwnerDashboardShell>;
}
