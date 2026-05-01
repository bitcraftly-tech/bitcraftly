import { ReactNode } from "react";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";

import { createAuthOptions } from "@/auth";
import DashboardNav from "@/components/dashboard/DashboardNav";
import QueryProvider from "@/components/providers/QueryProvider";

type DashboardLayoutProps = {
  children: ReactNode;
};

const ALLOWED_DASHBOARD_ROLES = new Set(["admin", "staff"]);

export default async function DashboardLayout({ children }: DashboardLayoutProps) {
  const session = await getServerSession(createAuthOptions());
  const role = `${session?.role ?? ""}`.toLowerCase();

  if (!session) {
    redirect("/login");
  }
  if (!ALLOWED_DASHBOARD_ROLES.has(role)) {
    redirect("/portal");
  }

  return (
    <QueryProvider>
      <>
        <DashboardNav />
        <main className="min-h-[calc(100vh-64px)] bg-bg-primary dark:bg-dark-bg-primary">
          <div className="mx-auto w-full max-w-7xl px-6 py-8 lg:px-12">{children}</div>
        </main>
      </>
    </QueryProvider>
  );
}
