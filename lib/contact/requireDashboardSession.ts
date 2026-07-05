import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";

import { createAuthOptions } from "@/auth";
import { isPrivilegedDashboardRole } from "@/lib/roles";

export async function requirePrivilegedDashboardSession() {
  const session = await getServerSession(createAuthOptions());
  if (!session) {
    return { error: NextResponse.json({ error: "Unauthorized" }, { status: 401 }) };
  }
  if (!isPrivilegedDashboardRole(session.role)) {
    return { error: NextResponse.json({ error: "Forbidden" }, { status: 403 }) };
  }
  return { session };
}
