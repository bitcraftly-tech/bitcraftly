import { NextRequest, NextResponse } from "next/server";

export const runtime = "nodejs";

import { requireAdminSession } from "@/lib/analytics-dashboard/auth-api";
import { getLead, updateLeadStatus } from "@/lib/analytics-dashboard/firebase";
import type { LeadStatus } from "@/lib/analytics-dashboard/types";

type RouteContext = { params: Promise<{ id: string }> };

export async function GET(_req: NextRequest, context: RouteContext) {
  const auth = await requireAdminSession();
  if (auth.error) return auth.error;

  const { id } = await context.params;
  const lead = await getLead(id);
  if (!lead) return NextResponse.json({ error: "Not found" }, { status: 404 });
  return NextResponse.json({ lead });
}

export async function PATCH(req: NextRequest, context: RouteContext) {
  const auth = await requireAdminSession();
  if (auth.error) return auth.error;

  const { id } = await context.params;
  const body = (await req.json()) as { status?: LeadStatus };
  if (!body.status) {
    return NextResponse.json({ error: "status is required" }, { status: 400 });
  }

  const lead = await updateLeadStatus(id, body.status);
  if (!lead) return NextResponse.json({ error: "Not found" }, { status: 404 });
  return NextResponse.json({ lead });
}
