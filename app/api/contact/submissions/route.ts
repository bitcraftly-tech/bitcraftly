import { NextRequest, NextResponse } from "next/server";

import { getContactDataSource } from "@/lib/contact/contactDataSource";
import { proxyContactGet } from "@/lib/contact/fastapiContactProxy";
import { requirePrivilegedDashboardSession } from "@/lib/contact/requireDashboardSession";
import { listContactSubmissions } from "@/lib/supabase/contacts";
import { SupabaseContactQueryError } from "@/lib/supabase/contactQueries";

export async function GET(req: NextRequest) {
  const auth = await requirePrivilegedDashboardSession();
  if (auth.error) return auth.error;

  const { searchParams } = req.nextUrl;
  const skip = Number.parseInt(searchParams.get("skip") ?? "0", 10) || 0;
  const limit = Number.parseInt(searchParams.get("limit") ?? "50", 10) || 50;
  const pendingOnly = searchParams.get("pending_only") === "true";

  const source = getContactDataSource();
  const authorization = req.headers.get("authorization");

  if (source === "fastapi") {
    const params = new URLSearchParams();
    params.set("skip", String(skip));
    params.set("limit", String(limit));
    if (pendingOnly) params.set("pending_only", "true");

    const { response, payload } = await proxyContactGet("/submissions", authorization, params);
    return NextResponse.json(payload ?? { detail: "Failed to fetch submissions" }, {
      status: response.status,
    });
  }

  try {
    const result = await listContactSubmissions({ skip, limit, pendingOnly });
    return NextResponse.json(result);
  } catch (error) {
    if (error instanceof SupabaseContactQueryError) {
      console.error("contact_list_failed", error.operation, error.sanitized.code, error.sanitized.message);
    }
    return NextResponse.json({ detail: "Failed to fetch submissions" }, { status: 500 });
  }
}
