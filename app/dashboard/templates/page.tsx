import PageHeader from "@/components/dashboard/PageHeader";
import TemplatesManager from "@/components/dashboard/TemplatesManager";

export default function DashboardTemplatesPage() {
  return (
    <div>
      <PageHeader
        title="WhatsApp Templates"
        breadcrumbs={[{ label: "Dashboard", href: "/dashboard" }, { label: "Templates" }]}
      />

      <div className="mt-8">
        <TemplatesManager />
      </div>
    </div>
  );
}
