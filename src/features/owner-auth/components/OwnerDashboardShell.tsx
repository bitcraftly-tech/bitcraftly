import Link from "next/link";
import { logoutOwnerAction } from "../actions/owner-auth.actions";
import { OWNER_AUTH_ROUTES } from "../owner-auth.constants";

interface OwnerDashboardShellProps {
  readonly children: React.ReactNode;
}

export function OwnerDashboardShell({ children }: OwnerDashboardShellProps) {
  return (
    <div className="owner-shell">
      <header className="owner-shell__header">
        <div className="owner-shell__header-inner">
          <div>
            <p className="owner-shell__brand">Bitcraftly Owner CRM</p>
            <p className="owner-shell__meta">Authenticated owner workspace</p>
          </div>
          <nav aria-label="Owner" className="owner-shell__nav">
            <Link href={OWNER_AUTH_ROUTES.leads} className="owner-shell__nav-link">
              Leads
            </Link>
            <form action={logoutOwnerAction}>
              <button type="submit" className="owner-shell__logout">
                Sign out
              </button>
            </form>
          </nav>
        </div>
      </header>
      <main className="owner-shell__content">{children}</main>
    </div>
  );
}
