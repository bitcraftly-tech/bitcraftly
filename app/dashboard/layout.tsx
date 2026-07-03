import { ReactNode } from "react";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";

import { createAuthOptions } from "@/auth";
import DashboardSubNav from "@/components/dashboard/DashboardSubNav";
import SiteFooter from "@/components/layout/SiteFooter";
import Navbar from "@/components/landing/Navbar";
import { PAGE_MAIN, PAGE_SHELL } from "@/lib/constants";
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
      <div className={PAGE_SHELL}>
        <header className="sticky top-0 z-50 shrink-0">
          <Navbar embedded session={session} />
          <DashboardSubNav />
        </header>
        <main className={`${PAGE_MAIN} overflow-x-hidden`}>
          <div className="mx-auto w-full min-w-0 max-w-7xl px-4 py-4 sm:px-6 lg:px-12">{children}</div>
        </main>
        <SiteFooter />
      </div>
    </QueryProvider>
  );
}
