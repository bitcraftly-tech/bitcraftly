import { NextRequest, NextResponse } from "next/server";

export const runtime = "nodejs";

import { requireAdminSession } from "@/lib/analytics-dashboard/auth-api";
import { createLead, listLeads } from "@/lib/analytics-dashboard/firebase";
import { notifyNewLead } from "@/lib/analytics-dashboard/notify";
import type { LeadStatus, LeadType } from "@/lib/analytics-dashboard/types";

export async function GET() {
  const auth = await requireAdminSession();
  if (auth.error) return auth.error;

  const leads = await listLeads(200);
  return NextResponse.json({ leads });
}

export async function POST(req: NextRequest) {
  const auth = await requireAdminSession();
  if (auth.error) return auth.error;

  const body = (await req.json()) as Record<string, unknown>;
  const lead = await createLead({
    type: (body.type as LeadType) ?? "other",
    status: (body.status as LeadStatus) ?? "new",
    name: body.name as string | undefined,
    email: body.email as string | undefined,
    phone: body.phone as string | undefined,
    businessName: body.businessName as string | undefined,
    businessType: body.businessType as string | undefined,
    message: body.message as string | undefined,
    source: body.source as string | undefined,
    pagePath: body.pagePath as string | undefined,
    service: body.service as string | undefined,
    intent: body.intent as string | undefined,
  });

  await notifyNewLead(lead);
  return NextResponse.json({ lead }, { status: 201 });
}
