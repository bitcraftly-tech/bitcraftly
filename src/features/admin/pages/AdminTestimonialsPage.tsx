import { ADMIN_TESTIMONIAL_ROWS } from "../admin.mock-data";
import { AdminDataTable } from "../components/AdminDataTable";
import { AdminPageHeader } from "../components/AdminPageHeader";

export function AdminTestimonialsPage() {
  return (
    <div className="admin-page">
      <AdminPageHeader
        title="Testimonials"
        description="Quotes and social proof for work and landing surfaces."
        actionLabel="New testimonial"
      />
      <AdminDataTable caption="Testimonials" rows={ADMIN_TESTIMONIAL_ROWS} />
    </div>
  );
}
