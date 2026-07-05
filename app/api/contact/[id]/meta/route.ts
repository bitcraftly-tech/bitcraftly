import { NextRequest, NextResponse } from "next/server";

import { getContactDataSource } from "@/lib/contact/contactDataSource";
import { proxyContactPatch } from "@/lib/contact/fastapiContactProxy";
import { requirePrivilegedDashboardSession } from "@/lib/contact/requireDashboardSession";
import { validateContactStage } from "@/lib/contact/contactValidation";
import { updateContactSubmissionMeta } from "@/lib/supabase/contacts";
import { SupabaseContactQueryError } from "@/lib/supabase/contactQueries";

type RouteContext = { params: Promise<{ id: string }> };

export async function PATCH(req: NextRequest, context: RouteContext) {
  const auth = await requirePrivilegedDashboardSession();
  if (auth.error) return auth.error;

  const { id } = await context.params;
  let body: unknown;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ detail: "Invalid request body" }, { status: 400 });
  }

  const record = body as { stage?: unknown; assigned_to?: unknown };
  const stage = validateContactStage(record.stage ?? "new");
  if (!stage) {
    return NextResponse.json({ detail: "Invalid stage" }, { status: 422 });
  }

  const assignedRaw = record.assigned_to;
  const assignedTo =
    assignedRaw === null || assignedRaw === undefined
      ? null
      : `${assignedRaw}`.trim() || null;

  const source = getContactDataSource();
  const authorization = req.headers.get("authorization");

  if (source === "fastapi") {
    const { response, payload } = await proxyContactPatch(
      `/${id}/meta`,
      { stage, assigned_to: assignedTo },
      authorization,
    );
    return NextResponse.json(payload ?? { detail: "Failed to update contact" }, { status: response.status });
  }

  try {
    const updated = await updateContactSubmissionMeta(id, stage, assignedTo);
    if (!updated) {
      return NextResponse.json({ detail: "Contact not found" }, { status: 404 });
    }
    return NextResponse.json({ success: true, message: "Contact pipeline updated" });
  } catch (error) {
    if (error instanceof SupabaseContactQueryError) {
      console.error("contact_meta_failed", error.operation, error.sanitized.code);
    }
    return NextResponse.json({ detail: "Failed to update contact" }, { status: 500 });
  }
}
