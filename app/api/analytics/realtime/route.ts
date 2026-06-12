import { NextResponse } from "next/server";

export const runtime = "nodejs";

import { requireAdminSession } from "@/lib/analytics-dashboard/auth-api";
import { fetchGa4Realtime } from "@/lib/analytics-dashboard/ga4";

export async function GET() {
  const auth = await requireAdminSession();
  if (auth.error) return auth.error;

  const realtime = await fetchGa4Realtime();
  return NextResponse.json(realtime);
}
