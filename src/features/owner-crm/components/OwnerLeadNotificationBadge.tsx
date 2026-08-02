import { cn } from '@/lib/cn';
import type { OwnerLeadNotificationStatus } from '../owner-crm.types';

interface OwnerLeadNotificationBadgeProps {
  readonly status: OwnerLeadNotificationStatus;
  readonly label: string;
}

export function OwnerLeadNotificationBadge({ status, label }: OwnerLeadNotificationBadgeProps) {
  return (
    <span className={cn('owner-leads-badge', `owner-leads-notification--${status}`)}>{label}</span>
  );
}
