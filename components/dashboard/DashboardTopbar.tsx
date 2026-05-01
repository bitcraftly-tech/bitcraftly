"use client";

import { useTenant } from "@/hooks/useTenant";

export default function DashboardTopbar() {
  const { tenant } = useTenant();

  return (
    <header className="flex items-center justify-between rounded-2xl border border-[#1A1916]/10 bg-white px-4 py-3">
      <div>
        <p className="text-xs uppercase tracking-wide text-[#1A1916]/55">Tenant</p>
        <p className="text-sm font-semibold text-[#1A1916]">{tenant?.name ?? "Main Admin"}</p>
      </div>
      <div className="flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-br from-blue-500 to-violet-600 text-sm font-bold text-white">
        {tenant?.name?.slice(0, 1).toUpperCase() ?? "A"}
      </div>
    </header>
  );
}

