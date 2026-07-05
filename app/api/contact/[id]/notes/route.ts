import { NextRequest, NextResponse } from "next/server";

import { getContactDataSource } from "@/lib/contact/contactDataSource";
import { proxyContactPatch } from "@/lib/contact/fastapiContactProxy";
import { requirePrivilegedDashboardSession } from "@/lib/contact/requireDashboardSession";
import { validateNotes } from "@/lib/contact/contactValidation";
import { updateContactSubmissionNotes } from "@/lib/supabase/contacts";
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

  const notes = validateNotes((body as { notes?: unknown } | null)?.notes);
  const source = getContactDataSource();
  const authorization = req.headers.get("authorization");

  if (source === "fastapi") {
    const { response, payload } = await proxyContactPatch(`/${id}/notes`, { notes }, authorization);
    return NextResponse.json(payload ?? { detail: "Failed to update notes" }, { status: response.status });
  }

  try {
    const updated = await updateContactSubmissionNotes(id, notes);
    if (!updated) {
      return NextResponse.json({ detail: "Contact not found" }, { status: 404 });
    }
    return NextResponse.json({ success: true, message: "Notes updated" });
  } catch (error) {
    if (error instanceof SupabaseContactQueryError) {
      console.error("contact_notes_failed", error.operation, error.sanitized.code);
    }
    return NextResponse.json({ detail: "Failed to update notes" }, { status: 500 });
  }
}
