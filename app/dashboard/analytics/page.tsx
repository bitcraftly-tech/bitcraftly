import AnalyticsDashboard from "@/components/analytics-dashboard/AnalyticsDashboard";
import AnalyticsSetupHub from "@/components/dashboard/AnalyticsSetupHub";
import PageHeader from "@/components/dashboard/PageHeader";

export default function DashboardAnalyticsPage() {
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
