import Link from "next/link";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";

import AnalyticsDashboard from "@/components/analytics-dashboard/AnalyticsDashboard";
import AnalyticsSetupHub from "@/components/dashboard/AnalyticsSetupHub";
import { createAuthOptions } from "@/auth";

export default async function DashboardAnalyticsPage() {
  const session = await getServerSession(createAuthOptions());

  if (!session) {
    redirect("/login?callbackUrl=/dashboard/analytics");
  }

  if (session.role !== "admin") {
    return (
      <div className="mx-auto max-w-xl py-8">
        <div className="rounded-2xl border border-amber-500/30 bg-amber-50 px-5 py-4 text-sm text-amber-950 dark:bg-amber-950/20 dark:text-amber-100">
          <p className="font-semibold">Admin access required</p>
          <p className="mt-2 leading-relaxed">
            Website analytics is only available for <strong>admin</strong> accounts. Sign in with your admin email or
            ask Sanjay to grant access.
          </p>
          <Link href="/dashboard" className="mt-4 inline-flex font-semibold text-[#2563EB] hover:underline">
            ← Back to dashboard
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-[1440px] space-y-6 pb-10">
      <AnalyticsDashboard />
      <details className="rounded-2xl border border-border-primary bg-bg-card p-4 dark:border-dark-border-primary dark:bg-dark-bg-card">
        <summary className="cursor-pointer text-sm font-semibold text-text-secondary dark:text-dark-text-secondary">
          Analytics setup &amp; configuration
        </summary>
        <div className="mt-4">
          <AnalyticsSetupHub />
        </div>
      </details>
    </div>
  );
}
