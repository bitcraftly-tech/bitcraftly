import { ReactNode } from "react";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";

import { createAuthOptions } from "@/auth";
import DashboardSubNav from "@/components/dashboard/DashboardSubNav";
import Footer from "@/components/landing/Footer";
import Navbar from "@/components/landing/Navbar";
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
      <div className="min-h-screen overflow-x-hidden bg-bg-primary text-text-primary dark:bg-dark-bg-primary dark:text-dark-text-primary">
        <header className="sticky top-0 z-50">
          <Navbar embedded session={session} />
          <DashboardSubNav />
        </header>
        <main className="overflow-x-hidden">
          <div className="mx-auto w-full min-w-0 max-w-7xl px-4 py-4 sm:px-6 lg:px-12">{children}</div>
        </main>
        <Footer />
      </div>
    </QueryProvider>
  );
}
