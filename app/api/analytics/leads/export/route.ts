import { NextResponse } from "next/server";

export const runtime = "nodejs";

import { requireAdminSession } from "@/lib/analytics-dashboard/auth-api";
import { leadsToCsv } from "@/lib/analytics-dashboard/csv";
import { listLeads } from "@/lib/analytics-dashboard/firebase";

export async function GET() {
  const auth = await requireAdminSession();
  if (auth.error) return auth.error;

  const leads = await listLeads(1000);
  const csv = leadsToCsv(leads);

  return new NextResponse(csv, {
    headers: {
      "Content-Type": "text/csv; charset=utf-8",
      "Content-Disposition": `attachment; filename="bitcraftly-leads-${new Date().toISOString().slice(0, 10)}.csv"`,
    },
  });
}
