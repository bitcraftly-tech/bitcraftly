type LeadRequestRow = {
  rowId: string;
  id: number;
  channel: "contact" | "lead";
  name: string;
  phone: string;
  email?: string | null;
  businessName?: string | null;
  businessType?: string | null;
  message?: string | null;
  source?: string | null;
  notes?: string | null;
  isContacted: boolean;
  stage: "new" | "in_progress" | "closed";
  assignee?: string | null;
  createdAt: string;
  updatedAt?: string | null;
};

type LeadsTableProps = {
  leads: LeadRequestRow[];
  onMarkContacted: (contactId: number) => void;
  onSaveNotes: (contactId: number, notes: string) => void;
  onViewDetails: (lead: LeadRequestRow) => void;
  onStageChange: (rowId: string, stage: "new" | "in_progress" | "closed") => void;
  onAssigneeChange: (rowId: string, assignee: string) => void;
  markingContactId?: number | null;
  savingNotesContactId?: number | null;
};

export default function LeadsTable({
  leads,
  onMarkContacted,
  onSaveNotes,
  onViewDetails,
  onStageChange,
  onAssigneeChange,
  markingContactId,
  savingNotesContactId,
}: LeadsTableProps) {
  if (!leads.length) {
    return <p className="text-sm text-text-secondary dark:text-dark-text-secondary">No customer requests yet.</p>;
  }

  return (
    <div className="overflow-x-auto">
      <table className="w-full min-w-[980px] border-collapse text-left text-sm">
        <thead>
          <tr className="border-b border-border-primary text-text-tertiary dark:border-dark-border-primary dark:text-dark-text-tertiary">
            <th className="py-2 pr-4 font-medium">Type</th>
            <th className="py-2 pr-4 font-medium">Name</th>
            <th className="py-2 pr-4 font-medium">Phone</th>
            <th className="py-2 pr-4 font-medium">Email</th>
            <th className="py-2 pr-4 font-medium">Business</th>
            <th className="py-2 pr-4 font-medium">Business Type</th>
            <th className="py-2 pr-4 font-medium">Message</th>
            <th className="py-2 pr-4 font-medium">Source</th>
            <th className="py-2 pr-4 font-medium">Assigned To</th>
            <th className="py-2 pr-4 font-medium">Stage</th>
            <th className="py-2 pr-4 font-medium">Notes</th>
            <th className="py-2 pr-4 font-medium">Status</th>
            <th className="py-2 pr-4 font-medium">Timeline</th>
            <th className="py-2 font-medium">Actions</th>
          </tr>
        </thead>
        <tbody>
          {leads.map((lead) => (
            <tr
              key={lead.rowId}
              className="border-b border-border-primary text-text-primary transition hover:bg-bg-secondary dark:border-dark-border-primary dark:text-dark-text-primary dark:hover:bg-dark-bg-secondary"
            >
              <td className="py-3 pr-4">
                <span
                  className={`inline-flex rounded-full px-2.5 py-1 text-[11px] font-semibold ${
                    lead.channel === "contact"
                      ? "bg-indigo-500/10 text-indigo-600 dark:text-indigo-400"
                      : "bg-emerald-500/10 text-emerald-700 dark:text-emerald-400"
                  }`}
                >
                  {lead.channel === "contact" ? "Contact Form" : "Lead"}
                </span>
              </td>
              <td className="py-3 pr-4">{lead.name}</td>
              <td className="py-3 pr-4">{lead.phone}</td>
              <td className="py-3 pr-4">{lead.email || "-"}</td>
              <td className="py-3 pr-4">{lead.businessName || "-"}</td>
              <td className="py-3 pr-4">{lead.businessType || "-"}</td>
              <td className="max-w-[260px] py-3 pr-4">
                <p className="truncate" title={lead.message || ""}>
                  {lead.message || "-"}
                </p>
              </td>
              <td className="py-3 pr-4">{lead.source || "-"}</td>
              <td className="min-w-[170px] py-3 pr-4">
                <input
                  defaultValue={lead.assignee || ""}
                  placeholder="Owner name"
                  className="w-full rounded-md border border-border-primary bg-bg-card px-2.5 py-1.5 text-xs text-text-primary outline-none placeholder:text-text-tertiary focus:border-accent-primary dark:border-dark-border-primary dark:bg-dark-bg-secondary dark:text-dark-text-primary dark:placeholder:text-dark-text-tertiary"
                  onBlur={(event) => onAssigneeChange(lead.rowId, event.target.value)}
                />
              </td>
              <td className="py-3 pr-4">
                <select
                  value={lead.stage}
                  onChange={(event) => onStageChange(lead.rowId, event.target.value as "new" | "in_progress" | "closed")}
                  className="rounded-md border border-border-primary bg-bg-card px-2.5 py-1.5 text-xs text-text-primary outline-none focus:border-accent-primary dark:border-dark-border-primary dark:bg-dark-bg-secondary dark:text-dark-text-primary"
                >
                  <option value="new">New</option>
                  <option value="in_progress">In Progress</option>
                  <option value="closed">Closed</option>
                </select>
              </td>
              <td className="min-w-[220px] py-3 pr-4">
                {lead.channel === "contact" ? (
                  <div className="flex items-center gap-2">
                    <input
                      defaultValue={lead.notes || ""}
                      placeholder="Add follow-up note"
                      className="w-full rounded-md border border-border-primary bg-bg-card px-2.5 py-1.5 text-xs text-text-primary outline-none placeholder:text-text-tertiary focus:border-accent-primary dark:border-dark-border-primary dark:bg-dark-bg-secondary dark:text-dark-text-primary dark:placeholder:text-dark-text-tertiary"
                      onBlur={(event) => onSaveNotes(lead.id, event.target.value)}
                    />
                    {savingNotesContactId === lead.id ? (
                      <span className="text-[11px] text-text-tertiary dark:text-dark-text-tertiary">...</span>
                    ) : null}
                  </div>
                ) : (
                  "-"
                )}
              </td>
              <td className="py-3 pr-4">
                <span
                  className={`inline-flex rounded-full px-2.5 py-1 text-[11px] font-semibold ${
                    lead.isContacted
                      ? "bg-emerald-500/10 text-emerald-700 dark:text-emerald-400"
                      : "bg-amber-500/10 text-amber-700 dark:text-amber-400"
                  }`}
                >
                  {lead.isContacted ? "Contacted" : "Pending"}
                </span>
              </td>
              <td className="py-3 pr-4">
                <div className="flex flex-col gap-0.5 text-xs">
                  <span>Created: {new Date(lead.createdAt).toLocaleString()}</span>
                  {lead.updatedAt ? <span>Updated: {new Date(lead.updatedAt).toLocaleString()}</span> : null}
                </div>
              </td>
              <td className="py-3">
                <div className="flex flex-wrap gap-2">
                  <a
                    href={`tel:${lead.phone}`}
                    className="inline-flex rounded-md border border-emerald-500/35 bg-emerald-500/10 px-3 py-1 text-xs font-semibold text-emerald-700 transition hover:bg-emerald-500/15"
                  >
                    Call
                  </a>
                  <button
                    type="button"
                    onClick={() => onViewDetails(lead)}
                    className="inline-flex rounded-md border border-border-primary bg-bg-card px-3 py-1 text-xs font-semibold text-text-primary transition hover:bg-bg-secondary dark:border-dark-border-primary dark:bg-dark-bg-secondary dark:text-dark-text-primary dark:hover:bg-dark-bg-card"
                  >
                    History
                  </button>
                  {lead.channel === "contact" && !lead.isContacted ? (
                    <button
                      type="button"
                      onClick={() => onMarkContacted(lead.id)}
                      disabled={markingContactId === lead.id}
                      className="inline-flex rounded-md border border-accent-primary/35 bg-accent-primary/10 px-3 py-1 text-xs font-semibold text-accent-primary transition hover:bg-accent-primary/15 disabled:cursor-not-allowed disabled:opacity-60"
                    >
                      {markingContactId === lead.id ? "Saving..." : "Mark Contacted"}
                    </button>
                  ) : null}
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
