import { NextResponse } from "next/server";

import { getSiteVisitorCountResult } from "@/lib/analytics-dashboard/visitorCount";

export const runtime = "nodejs";

export async function GET() {
  try {
    const { count, source } = await getSiteVisitorCountResult();
    if (count === null) {
      return NextResponse.json(
        { count: null, source, configured: false },
        {
          headers: {
            "Cache-Control": "public, s-maxage=30, stale-while-revalidate=120",
          },
        },
      );
    }
    return NextResponse.json(
      { count, source, configured: true },
      {
        headers: {
          "Cache-Control": "public, s-maxage=30, stale-while-revalidate=120",
        },
      },
    );
  } catch {
    return NextResponse.json({ error: "server_error" }, { status: 500 });
  }
}
