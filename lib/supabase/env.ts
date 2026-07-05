/** Shared Supabase project credentials (server-only). */
export type SupabaseCoreEnv = {
  url: string;
  secretKey: string;
};

/** Storage-specific env (requires bucket). */
export type SupabaseServerEnv = SupabaseCoreEnv & {
  bucket: string;
};

function missing(name: string): never {
  throw new Error(`Missing required environment variable: ${name}`);
}

/** Validates Supabase URL + secret — used by Storage and Database server clients. */
export function getSupabaseCoreEnv(): SupabaseCoreEnv {
  const url = `${process.env.NEXT_PUBLIC_SUPABASE_URL ?? ""}`.trim();
  const secretKey = `${process.env.SUPABASE_SECRET_KEY ?? ""}`.trim();

  if (!url) missing("NEXT_PUBLIC_SUPABASE_URL");
  if (!secretKey) missing("SUPABASE_SECRET_KEY");

  return { url, secretKey };
}

/** Validates full Supabase server env including Storage bucket — never includes secret values in errors. */
export function getSupabaseServerEnv(): SupabaseServerEnv {
  const core = getSupabaseCoreEnv();
  const bucket = `${process.env.SUPABASE_STORAGE_BUCKET ?? ""}`.trim();

  if (!bucket) missing("SUPABASE_STORAGE_BUCKET");

  return { ...core, bucket };
}
