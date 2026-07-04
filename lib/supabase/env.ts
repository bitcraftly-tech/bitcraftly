export type SupabaseServerEnv = {
  url: string;
  secretKey: string;
  bucket: string;
};

function missing(name: string): never {
  throw new Error(`Missing required environment variable: ${name}`);
}

/** Validates Supabase server env — never includes secret values in errors. */
export function getSupabaseServerEnv(): SupabaseServerEnv {
  const url = `${process.env.NEXT_PUBLIC_SUPABASE_URL ?? ""}`.trim();
  const secretKey = `${process.env.SUPABASE_SECRET_KEY ?? ""}`.trim();
  const bucket = `${process.env.SUPABASE_STORAGE_BUCKET ?? ""}`.trim();

  if (!url) missing("NEXT_PUBLIC_SUPABASE_URL");
  if (!secretKey) missing("SUPABASE_SECRET_KEY");
  if (!bucket) missing("SUPABASE_STORAGE_BUCKET");

  return { url, secretKey, bucket };
}
