import { OwnerDashboardShell } from "@/features/owner-auth";
import { requireOwnerSession } from "@/features/owner-auth/require-owner-session";

export default async function OwnerDashboardLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  await requireOwnerSession();

  return <OwnerDashboardShell>{children}</OwnerDashboardShell>;
}
