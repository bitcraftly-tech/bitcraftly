import { ReactNode } from "react";

import DashboardNav from "@/components/dashboard/DashboardNav";
import QueryProvider from "@/components/providers/QueryProvider";

type DashboardLayoutProps = {
  children: ReactNode;
};

export default function DashboardLayout({ children }: DashboardLayoutProps) {
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
