import { ADMIN_CASE_STUDY_ROWS } from '../admin.mock-data';
import { AdminDataTable } from '../components/AdminDataTable';
import { AdminPageHeader } from '../components/AdminPageHeader';

export function AdminCaseStudiesPage() {
  return (
    <div className="admin-page">
      <AdminPageHeader
        title="Case Studies"
        description="Portfolio case studies and outcome narratives. Editor and publish flows deferred."
        actionLabel="New case study"
      />
      <AdminDataTable caption="Case studies" rows={ADMIN_CASE_STUDY_ROWS} />
    </div>
  );
}
