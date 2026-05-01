import Link from "next/link";

const navItems = [
  { href: "/dashboard", label: "Dashboard" },
  { href: "/dashboard/leads", label: "Leads" },
  { href: "/dashboard/qr", label: "QR System" },
  { href: "/dashboard/templates", label: "Templates" },
  { href: "/dashboard/settings", label: "Settings" },
];

export default function DashboardSidebar() {
  return (
    <aside className="w-full rounded-2xl border border-[#1A1916]/10 bg-white p-4 lg:w-64">
      <p className="px-2 text-xs font-semibold uppercase tracking-wider text-[#1A1916]/60">Dashboard</p>
      <nav className="mt-3 flex flex-row gap-2 overflow-x-auto lg:flex-col">
        {navItems.map((item) => (
          <Link
            key={item.href}
            href={item.href}
            className="rounded-lg border border-transparent px-3 py-2 text-sm text-[#1A1916]/85 transition hover:border-[#1A1916]/15 hover:bg-[#F4F3F0]"
          >
            {item.label}
          </Link>
        ))}
      </nav>
    </aside>
  );
}
