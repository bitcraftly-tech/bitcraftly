import type { LeadStatusCounts } from "@/features/lead-funnel/services/lead.repository";
import { AdminStatCard } from "@/features/admin/components/AdminStatCard";

interface OwnerLeadsStatCardsProps {
  readonly counts: LeadStatusCounts;
}

const STAT_ITEMS = [
  { key: "total", label: "Total", hint: "All captured leads" },
  { key: "new", label: "New", hint: "Awaiting first contact" },
  { key: "contacted", label: "Contacted", hint: "Initial outreach sent" },
  { key: "qualified", label: "Qualified", hint: "Fit confirmed" },
  { key: "closed", label: "Closed", hint: "Won or closed out" },
  { key: "spam", label: "Spam", hint: "Marked as spam" },
] as const satisfies readonly {
  key: keyof LeadStatusCounts;
  label: string;
  hint: string;
}[];

export function OwnerLeadsStatCards({ counts }: OwnerLeadsStatCardsProps) {
  return (
    <section aria-labelledby="owner-leads-stats-heading" className="admin-section">
      <h2 id="owner-leads-stats-heading" className="admin-section__title">
        Pipeline snapshot
      </h2>
      <div className="admin-stats owner-leads-stats">
        {STAT_ITEMS.map((item) => (
          <AdminStatCard
            key={item.key}
            label={item.label}
            value={String(counts[item.key])}
            hint={item.hint}
          />
        ))}
      </div>
    </section>
  );
}
