import Link from "next/link";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";

import AnalyticsDashboard from "@/components/analytics-dashboard/AnalyticsDashboard";
import AnalyticsSetupHub from "@/components/dashboard/AnalyticsSetupHub";
import PageHeader from "@/components/dashboard/PageHeader";
import { createAuthOptions } from "@/auth";

export default async function DashboardAnalyticsPage() {
  const session = await getServerSession(createAuthOptions());

  if (!session) {
    redirect("/login?callbackUrl=/dashboard/analytics");
  }

  if (session.role !== "admin") {
    return (
      <div>
        <PageHeader
          title="Website analytics"
          breadcrumbs={[{ label: "Dashboard", href: "/dashboard" }, { label: "Analytics" }]}
        />
        <div className="mt-6 max-w-xl rounded-xl border border-amber-500/30 bg-amber-50 px-5 py-4 text-sm text-amber-950 dark:bg-amber-950/20 dark:text-amber-100">
          <p className="font-semibold">Admin access required</p>
          <p className="mt-2 leading-relaxed">
            Website analytics is only available for <strong>admin</strong> accounts. Sign in with your admin email or
            ask Sanjay to grant access.
          </p>
          <Link href="/dashboard" className="mt-4 inline-flex font-semibold text-indigo-600 dark:text-indigo-400">
            ← Back to dashboard
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div>
      <PageHeader
        title="Website analytics"
        breadcrumbs={[{ label: "Dashboard", href: "/dashboard" }, { label: "Analytics" }]}
      />
      <AnalyticsSetupHub />
      <AnalyticsDashboard />
    </div>
  );
}
