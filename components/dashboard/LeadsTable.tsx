import { type Lead } from "@/hooks/useDashboardQueries";

type LeadsTableProps = {
  leads: Lead[];
};

export default function LeadsTable({ leads }: LeadsTableProps) {
  if (!leads.length) {
    return <p className="text-sm text-text-secondary dark:text-dark-text-secondary">No leads yet for this tenant.</p>;
  }

  return (
    <div className="overflow-x-auto">
      <table className="w-full min-w-[760px] border-collapse text-left text-sm">
        <thead>
          <tr className="border-b border-border-primary text-text-tertiary dark:border-dark-border-primary dark:text-dark-text-tertiary">
            <th className="py-2 pr-4 font-medium">Name</th>
            <th className="py-2 pr-4 font-medium">Phone</th>
            <th className="py-2 pr-4 font-medium">Business Type</th>
            <th className="py-2 font-medium">Created</th>
            <th className="py-2 font-medium">Action</th>
          </tr>
        </thead>
        <tbody>
          {leads.map((lead) => (
            <tr
              key={lead.id}
              className="border-b border-border-primary text-text-primary transition hover:bg-bg-secondary dark:border-dark-border-primary dark:text-dark-text-primary dark:hover:bg-dark-bg-secondary"
            >
              <td className="py-3 pr-4">{lead.name}</td>
              <td className="py-3 pr-4">{lead.phone}</td>
              <td className="py-3 pr-4">{lead.business_type || "-"}</td>
              <td className="py-3">{new Date(lead.created_at).toLocaleDateString()}</td>
              <td className="py-3">
                <a
                  href={`tel:${lead.phone}`}
                  className="inline-flex rounded-md border border-emerald-500/35 bg-emerald-500/10 px-3 py-1 text-xs font-semibold text-emerald-700 transition hover:bg-emerald-500/15"
                >
                  Call
                </a>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
