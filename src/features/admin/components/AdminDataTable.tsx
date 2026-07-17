import Link from "next/link";
import type { AdminContentRow } from "../admin.types";
import { AdminStatusBadge } from "./AdminStatusBadge";

interface AdminDataTableProps {
  caption: string;
  rows: readonly AdminContentRow[];
  emptyLabel?: string;
}

export function AdminDataTable({
  caption,
  rows,
  emptyLabel = "No records yet.",
}: AdminDataTableProps) {
  if (rows.length === 0) {
    return (
      <div className="admin-empty" role="status">
        <p>{emptyLabel}</p>
      </div>
    );
  }

  return (
    <div className="admin-table-wrap">
      <table className="admin-table">
        <caption className="sr-only">{caption}</caption>
        <thead>
          <tr>
            <th scope="col">Title</th>
            <th scope="col">Status</th>
            <th scope="col">Updated</th>
            <th scope="col">Owner</th>
            <th scope="col">
              <span className="sr-only">Actions</span>
            </th>
          </tr>
        </thead>
        <tbody>
          {rows.map((row) => (
            <tr key={row.id}>
              <td>
                <span className="admin-table__title">{row.title}</span>
              </td>
              <td>
                <AdminStatusBadge status={row.status} />
              </td>
              <td>
                <time dateTime={row.updatedAt}>{row.updatedAt}</time>
              </td>
              <td>{row.owner}</td>
              <td className="admin-table__actions">
                {row.href ? (
                  <Link
                    href={row.href}
                    className="admin-table__link"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    View live
                  </Link>
                ) : (
                  <button
                    type="button"
                    className="admin-table__link"
                    disabled
                    title="Editor UI deferred"
                  >
                    Edit
                  </button>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
