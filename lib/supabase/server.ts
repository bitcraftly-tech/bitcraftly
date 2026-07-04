import "server-only";

import { createClient, type SupabaseClient } from "@supabase/supabase-js";

import { getSupabaseServerEnv } from "@/lib/supabase/env";

let cachedClient: SupabaseClient | null = null;

/** Server-only Supabase client using the secret key — never import from client components. */
export function getSupabaseServerClient(): SupabaseClient {
  if (cachedClient) return cachedClient;

  const { url, secretKey } = getSupabaseServerEnv();
  cachedClient = createClient(url, secretKey, {
    auth: {
      persistSession: false,
      autoRefreshToken: false,
    },
  });

  return cachedClient;
}

export function getSupabaseStorageBucketName(): string {
  return getSupabaseServerEnv().bucket;
}
