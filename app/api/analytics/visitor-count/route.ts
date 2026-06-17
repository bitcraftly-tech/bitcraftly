import { NextResponse } from "next/server";

import { getSiteVisitorCount } from "@/lib/analytics-dashboard/firebase";

export const runtime = "nodejs";

export async function GET() {
  try {
    const count = await getSiteVisitorCount();
    return NextResponse.json(
      { count },
      {
        headers: {
          "Cache-Control": "public, s-maxage=60, stale-while-revalidate=300",
        },
      },
    );
  } catch {
    return NextResponse.json({ error: "server_error" }, { status: 500 });
  }
}
