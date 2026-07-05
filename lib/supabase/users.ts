import "server-only";

import { getSupabaseServerClient } from "@/lib/supabase/server";
import {
  countUsersWithClient,
  getUserByEmailWithClient,
  getUserByLegacyIdWithClient,
  type SupabaseUserRow,
} from "@/lib/supabase/usersQueries";

export type { SupabaseUserRow };

export async function countUsers(): Promise<number> {
  return countUsersWithClient(getSupabaseServerClient());
}

export async function getUserByEmail(email: string): Promise<SupabaseUserRow | null> {
  return getUserByEmailWithClient(getSupabaseServerClient(), email);
}

export async function getUserByLegacyId(legacyId: number): Promise<SupabaseUserRow | null> {
  return getUserByLegacyIdWithClient(getSupabaseServerClient(), legacyId);
}
