import type { AdminContentStatus } from "../admin.types";
import { cn } from "@/lib/cn";

const STATUS_LABEL: Record<AdminContentStatus, string> = {
  draft: "Draft",
  review: "In review",
  published: "Published",
  archived: "Archived",
};

interface AdminStatusBadgeProps {
  status: AdminContentStatus;
}

export function AdminStatusBadge({ status }: AdminStatusBadgeProps) {
  return (
    <span
      className={cn(
        "admin-badge",
        `admin-badge--${status}`,
      )}
    >
      {STATUS_LABEL[status]}
    </span>
  );
}
