import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";

import { createAuthOptions } from "@/auth";

export async function requireAdminSession() {
  const session = await getServerSession(createAuthOptions());
  if (!session?.accessToken) {
    return { error: NextResponse.json({ error: "Unauthorized" }, { status: 401 }) };
  }
  if (session.role !== "admin") {
    return { error: NextResponse.json({ error: "Forbidden" }, { status: 403 }) };
  }
  return { session };
}
