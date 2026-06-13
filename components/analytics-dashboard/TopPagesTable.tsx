import type { TopPageRow } from "@/lib/analytics-dashboard/types";

type TopPagesTableProps = {
  pages: TopPageRow[];
};

export default function TopPagesTable({ pages }: TopPagesTableProps) {
  return (
    <section className="rounded-2xl border border-border-primary bg-bg-card p-5 shadow-sm dark:border-dark-border-primary dark:bg-dark-bg-card">
      <h3 className="text-sm font-semibold text-[#0F172A] dark:text-dark-text-primary">Top Pages</h3>
      <p className="mt-0.5 text-xs text-text-tertiary dark:text-dark-text-tertiary">Highest traffic and lead-generating pages</p>
      <div className="mt-4 overflow-x-auto">
        <table className="min-w-full text-left text-sm">
          <thead>
            <tr className="border-b border-border-primary text-xs uppercase tracking-wide text-text-tertiary dark:border-dark-border-primary dark:text-dark-text-tertiary">
              <th className="py-2.5 pr-4 font-semibold">Page</th>
              <th className="py-2.5 pr-4 font-semibold">Views</th>
              <th className="py-2.5 pr-4 font-semibold">Leads</th>
              <th className="py-2.5 font-semibold">Conversion</th>
            </tr>
          </thead>
          <tbody>
            {pages.map((page) => (
              <tr
                key={page.path}
                className="border-b border-border-primary/60 transition-colors hover:bg-bg-secondary/60 dark:border-dark-border-primary/60 dark:hover:bg-dark-bg-secondary/60"
              >
                <td className="py-3 pr-4">
                  <p className="font-medium text-text-primary dark:text-dark-text-primary">{page.name}</p>
                  <p className="text-xs text-text-tertiary">{page.path}</p>
                </td>
                <td className="py-3 pr-4 font-medium">{page.views.toLocaleString("en-IN")}</td>
                <td className="py-3 pr-4 font-medium text-[#2563EB]">{page.leads}</td>
                <td className="py-3">
                  <span
                    className={`inline-flex rounded-full px-2 py-0.5 text-xs font-semibold ${
                      page.conversionRate >= 2.5
                        ? "bg-[#22C55E]/15 text-[#16A34A]"
                        : "bg-slate-100 text-slate-600 dark:bg-dark-bg-secondary dark:text-dark-text-secondary"
                    }`}
                  >
                    {page.conversionRate}%
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
}
