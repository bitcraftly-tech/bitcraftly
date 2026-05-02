import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";

import { createAuthOptions } from "@/auth";

export default async function AuthRedirectPage() {
  const session = await getServerSession(createAuthOptions());

  if (!session) {
    redirect("/login");
  }

  const role = `${session.role ?? ""}`.toLowerCase();
  const nextPath = role === "admin" || role === "staff" || role === "manager" ? "/dashboard" : "/login?error=access_denied";
  redirect(nextPath);
}
