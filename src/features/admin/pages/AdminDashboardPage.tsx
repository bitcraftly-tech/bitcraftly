import Link from "next/link";
import { ADMIN_ARCHITECTURE_NOTES, ADMIN_META } from "../admin.config";
import { ADMIN_NAV } from "../admin.nav";
import { ADMIN_OVERVIEW_STATS } from "../admin.mock-data";
import { AdminPageHeader } from "../components/AdminPageHeader";
import { AdminStatCard } from "../components/AdminStatCard";

export function AdminDashboardPage() {
  return (
    <div className="admin-page">
      <AdminPageHeader
        title="Overview"
        description="Publishing health across blog, case studies, services, and testimonials. UI architecture only — no live mutations."
        actionLabel="New content"
      />

      <section aria-labelledby="admin-stats-heading" className="admin-section">
        <h2 id="admin-stats-heading" className="admin-section__title">
          Inventory snapshot
        </h2>
        <div className="admin-stats">
          {ADMIN_OVERVIEW_STATS.map((stat) => (
            <AdminStatCard
              key={stat.id}
              label={stat.label}
              value={stat.value}
              hint={stat.hint}
            />
          ))}
        </div>
      </section>

      <section aria-labelledby="admin-modules-heading" className="admin-section">
        <h2 id="admin-modules-heading" className="admin-section__title">
          Modules
        </h2>
        <ul className="admin-module-grid">
          {ADMIN_NAV.filter((item) => item.id !== "overview").map((item) => (
            <li key={item.id}>
              <Link href={item.href} className="admin-module-card">
                <span className="admin-module-card__label">{item.label}</span>
                <span className="admin-module-card__desc">{item.description}</span>
              </Link>
            </li>
          ))}
        </ul>
      </section>

      <section aria-labelledby="admin-arch-heading" className="admin-section">
        <h2 id="admin-arch-heading" className="admin-section__title">
          Architecture notes
        </h2>
        <p className="admin-arch-meta">
          {ADMIN_META.environmentLabel} · v{ADMIN_META.version}
        </p>
        <ul className="admin-arch-list">
          {ADMIN_ARCHITECTURE_NOTES.map((note) => (
            <li key={note}>{note}</li>
          ))}
        </ul>
      </section>
    </div>
  );
}
