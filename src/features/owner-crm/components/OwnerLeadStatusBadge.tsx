import { cn } from "@/lib/cn";
import type { PersistedLeadStatus } from "@/features/lead-funnel/services/lead.repository";
import { OWNER_LEAD_STATUS_LABELS } from "../owner-crm.types";

interface OwnerLeadStatusBadgeProps {
  readonly status: PersistedLeadStatus;
}

export function OwnerLeadStatusBadge({ status }: OwnerLeadStatusBadgeProps) {
  return (
    <span className={cn("owner-leads-badge", `owner-leads-badge--${status}`)}>
      {OWNER_LEAD_STATUS_LABELS[status]}
    </span>
  );
}
