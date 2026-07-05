import { NextRequest, NextResponse } from "next/server";

import { getContactDataSource } from "@/lib/contact/contactDataSource";
import { proxyContactPatch } from "@/lib/contact/fastapiContactProxy";
import { requirePrivilegedDashboardSession } from "@/lib/contact/requireDashboardSession";
import { markContactSubmissionContacted } from "@/lib/supabase/contacts";
import { SupabaseContactQueryError } from "@/lib/supabase/contactQueries";

type RouteContext = { params: Promise<{ id: string }> };

export async function PATCH(req: NextRequest, context: RouteContext) {
  const auth = await requirePrivilegedDashboardSession();
  if (auth.error) return auth.error;

  const { id } = await context.params;
  const source = getContactDataSource();
  const authorization = req.headers.get("authorization");

  if (source === "fastapi") {
    const { response, payload } = await proxyContactPatch(`/${id}/contacted`, {}, authorization);
    return NextResponse.json(payload ?? { detail: "Failed to update contact" }, { status: response.status });
  }

  try {
    const updated = await markContactSubmissionContacted(id);
    if (!updated) {
      return NextResponse.json({ detail: "Contact not found" }, { status: 404 });
    }
    return NextResponse.json({ success: true, message: "Marked as contacted" });
  } catch (error) {
    if (error instanceof SupabaseContactQueryError) {
      console.error("contact_mark_contacted_failed", error.operation, error.sanitized.code);
    }
    return NextResponse.json({ detail: "Failed to update contact" }, { status: 500 });
  }
}
