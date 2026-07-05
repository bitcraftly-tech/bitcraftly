import { NextResponse } from "next/server";

import { verifySupabaseDatabaseConnection } from "@/lib/supabase/database";

export const dynamic = "force-dynamic";

/**
 * Read-only Supabase database connectivity probe.
 * Returns generic status only — no secrets, URLs, schema, or raw errors.
 */
export async function GET() {
  const result = await verifySupabaseDatabaseConnection();

  if (result.ok) {
    return NextResponse.json({ status: "ok", database: "supabase" });
  }

  return NextResponse.json({ status: "error", database: "supabase" }, { status: 503 });
}
