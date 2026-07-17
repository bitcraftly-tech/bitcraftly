import { ADMIN_BLOG_ROWS } from "../admin.mock-data";
import { AdminDataTable } from "../components/AdminDataTable";
import { AdminPageHeader } from "../components/AdminPageHeader";

export function AdminBlogPage() {
  return (
    <div className="admin-page">
      <AdminPageHeader
        title="Blog"
        description="Manage posts, drafts, and review workflow. Mock inventory mirrors future CMS endpoints."
        actionLabel="New post"
      />
      <AdminDataTable caption="Blog posts" rows={ADMIN_BLOG_ROWS} />
    </div>
  );
}
