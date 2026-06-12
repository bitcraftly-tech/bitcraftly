import AnalyticsSetupHub from "@/components/dashboard/AnalyticsSetupHub";
import PageHeader from "@/components/dashboard/PageHeader";

export default function DashboardAnalyticsPage() {
  return (
    <div>
      <PageHeader
        title="Analytics & reports"
        breadcrumbs={[{ label: "Dashboard", href: "/dashboard" }, { label: "Analytics" }]}
      />

      <AnalyticsSetupHub />
    </div>
  );
}
