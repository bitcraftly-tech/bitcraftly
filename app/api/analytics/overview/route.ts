import { NextRequest, NextResponse } from "next/server";

export const runtime = "nodejs";

import { requireAdminSession } from "@/lib/analytics-dashboard/auth-api";
import { getAnalyticsDashboard } from "@/lib/analytics-dashboard/service";
import type { DateRangeKey } from "@/lib/analytics-dashboard/types";

export async function GET(req: NextRequest) {
  const auth = await requireAdminSession();
  if (auth.error) return auth.error;

  const range = (req.nextUrl.searchParams.get("range") ?? "30d") as DateRangeKey;
  const data = await getAnalyticsDashboard(range);
  return NextResponse.json(data);
}
