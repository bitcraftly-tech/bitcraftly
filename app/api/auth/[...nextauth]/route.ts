import NextAuth from "next-auth";

import { createAuthOptions } from "@/auth";

function nextAuth(req: Request, context: unknown) {
  return NextAuth(createAuthOptions())(req as never, context as never);
}

export const GET = nextAuth;
export const POST = nextAuth;
