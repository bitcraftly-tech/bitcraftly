import { ADMIN_SERVICE_ROWS } from "../admin.mock-data";
import { AdminDataTable } from "../components/AdminDataTable";
import { AdminPageHeader } from "../components/AdminPageHeader";

export function AdminServicesPage() {
  return (
    <div className="admin-page">
      <AdminPageHeader
        title="Services"
        description="Service catalog entries used by marketing routes. SEO fields will attach when API is ready."
        actionLabel="New service"
      />
      <AdminDataTable caption="Services" rows={ADMIN_SERVICE_ROWS} />
    </div>
  );
}
