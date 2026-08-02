import type { OwnerLeadTableRow } from '../owner-crm.types';
import { OwnerLeadNotificationBadge } from './OwnerLeadNotificationBadge';
import { OwnerLeadStatusBadge } from './OwnerLeadStatusBadge';

interface OwnerLeadsTableProps {
  readonly rows: readonly OwnerLeadTableRow[];
  readonly emptyLabel: string;
}

export function OwnerLeadsTable({ rows, emptyLabel }: OwnerLeadsTableProps) {
  if (rows.length === 0) {
    return (
      <div className="admin-empty owner-leads-empty" role="status">
        <p>{emptyLabel}</p>
      </div>
    );
  }

  return (
    <div className="admin-table-wrap">
      <table className="admin-table owner-leads-table">
        <caption className="sr-only">Captured leads</caption>
        <thead>
          <tr>
            <th scope="col">Name</th>
            <th scope="col">Company</th>
            <th scope="col">Email</th>
            <th scope="col">Intent</th>
            <th scope="col">Status</th>
            <th scope="col">Notification Status</th>
            <th scope="col">Submitted At</th>
          </tr>
        </thead>
        <tbody>
          {rows.map((row) => (
            <tr key={row.id}>
              <td>
                <span className="admin-table__title">{row.name}</span>
              </td>
              <td>{row.company}</td>
              <td>
                <a href={`mailto:${row.email}`} className="owner-leads-link">
                  {row.email}
                </a>
              </td>
              <td>{row.intent}</td>
              <td>
                <OwnerLeadStatusBadge status={row.status} />
              </td>
              <td>
                <OwnerLeadNotificationBadge
                  status={row.notificationStatus}
                  label={row.notificationLabel}
                />
              </td>
              <td>
                <time dateTime={row.submittedAt}>{row.submittedAtLabel}</time>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
