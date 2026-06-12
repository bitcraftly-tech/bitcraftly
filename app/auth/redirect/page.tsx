import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";

import { createAuthOptions } from "@/auth";

type AuthRedirectPageProps = {
  searchParams: Promise<{ callbackUrl?: string }>;
};

function safeCallbackUrl(value: string | undefined, role: string): string {
  if (value && value.startsWith("/") && !value.startsWith("//")) return value;
  return role === "admin" || role === "staff" || role === "manager" ? "/dashboard" : "/portal";
}

export default async function AuthRedirectPage({ searchParams }: AuthRedirectPageProps) {
  const session = await getServerSession(createAuthOptions());
  const params = await searchParams;

  if (!session) {
    const loginUrl = params.callbackUrl
      ? `/login?callbackUrl=${encodeURIComponent(params.callbackUrl)}`
      : "/login";
    redirect(loginUrl);
  }

  const role = `${session.role ?? ""}`.toLowerCase();
  const nextPath = safeCallbackUrl(params.callbackUrl, role);
  if (role === "admin" || role === "staff" || role === "manager") {
    redirect(nextPath);
  }
  redirect("/portal");
}
