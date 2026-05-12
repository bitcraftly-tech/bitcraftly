import { ReactNode } from "react";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";

import { createAuthOptions } from "@/auth";
import DashboardNav from "@/components/dashboard/DashboardNav";
import QueryProvider from "@/components/providers/QueryProvider";

type DashboardLayoutProps = {
  children: ReactNode;
};

const ALLOWED_DASHBOARD_ROLES = new Set(["admin", "staff", "manager"]);

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
          <div className="mx-auto w-full max-w-7xl px-6 py-4 lg:px-12">
            {children}
            <div className="mt-16 border-t border-border-primary pt-8 text-center dark:border-dark-border-primary">
              <p className="text-xs leading-relaxed text-text-tertiary dark:text-dark-text-tertiary">
                Built by Bitcraftly — Website &amp; App Development Company in Jamshedpur.
              </p>
              <p className="mt-2 text-xs text-text-tertiary dark:text-dark-text-tertiary">
                Manage websites, apps and digital projects in one client workspace.
              </p>
            </div>
          </div>
        </main>
      </>
    </QueryProvider>
  );
}
