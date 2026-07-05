import type { SupabaseClient } from "@supabase/supabase-js";

import type { ContactCreateInput, ContactStage } from "@/lib/contact/contactValidation";

export type SanitizedSupabaseError = {
  code?: string;
  message?: string;
  details?: string;
  hint?: string;
};

export class SupabaseContactQueryError extends Error {
  readonly operation: string;
  readonly sanitized: SanitizedSupabaseError;

  constructor(operation: string, sanitized: SanitizedSupabaseError) {
    const code = sanitized.code ?? "unknown";
    const message = sanitized.message ?? "unknown";
    super(`${operation}:${code}:${message}`);
    this.name = "SupabaseContactQueryError";
    this.operation = operation;
    this.sanitized = sanitized;
  }
}

function sanitizeSupabaseError(error: unknown): SanitizedSupabaseError {
  if (!error || typeof error !== "object") {
    return { message: "unknown_error" };
  }
  const record = error as Record<string, unknown>;
  return {
    code: typeof record.code === "string" ? record.code : undefined,
    message: typeof record.message === "string" ? record.message : undefined,
    details: typeof record.details === "string" ? record.details : undefined,
    hint: typeof record.hint === "string" ? record.hint : undefined,
  };
}

function throwContactQueryError(operation: string, error: unknown): never {
  throw new SupabaseContactQueryError(operation, sanitizeSupabaseError(error));
}

export const CONTACT_SUBMISSION_COLUMNS =
  "id, legacy_id, name, business_name, business_type, phone, email, message, source, is_contacted, stage, assigned_to, notes, created_at, updated_at";

export type SupabaseContactSubmissionRow = {
  id: string;
  legacy_id: number | null;
  name: string;
  business_name: string;
  business_type: string;
  phone: string;
  email: string | null;
  message: string | null;
  source: string | null;
  is_contacted: boolean;
  stage: ContactStage;
  assigned_to: string | null;
  notes: string | null;
  created_at: string;
  updated_at: string;
};

export async function countContactSubmissionsWithClient(client: SupabaseClient): Promise<number> {
  const { count, error } = await client
    .from("contact_submissions")
    .select("id", { count: "exact", head: true });
  if (error) throwContactQueryError("count_contact_submissions", error);
  return count ?? 0;
}

export async function createContactSubmissionWithClient(
  client: SupabaseClient,
  input: ContactCreateInput,
): Promise<SupabaseContactSubmissionRow> {
  const { data, error } = await client
    .from("contact_submissions")
    .insert({
      name: input.name,
      business_name: input.business_name,
      business_type: input.business_type,
      phone: input.phone,
      email: input.email,
      message: input.message,
      source: input.source,
    })
    .select(CONTACT_SUBMISSION_COLUMNS)
    .single();
  if (error) throwContactQueryError("create_contact_submission", error);
  return data as SupabaseContactSubmissionRow;
}

export async function listContactSubmissionsWithClient(
  client: SupabaseClient,
  options: { skip?: number; limit?: number; pendingOnly?: boolean } = {},
): Promise<{ total: number; submissions: SupabaseContactSubmissionRow[] }> {
  const skip = options.skip ?? 0;
  const limit = options.limit ?? 50;

  let countQuery = client.from("contact_submissions").select("id", { count: "exact", head: true });
  let listQuery = client
    .from("contact_submissions")
    .select(CONTACT_SUBMISSION_COLUMNS)
    .order("created_at", { ascending: false })
    .range(skip, skip + limit - 1);

  if (options.pendingOnly) {
    countQuery = countQuery.eq("is_contacted", false);
    listQuery = listQuery.eq("is_contacted", false);
  }

  const [{ count, error: countError }, { data, error: listError }] = await Promise.all([
    countQuery,
    listQuery,
  ]);

  if (countError) throwContactQueryError("count_contact_submissions", countError);
  if (listError) throwContactQueryError("list_contact_submissions", listError);

  return {
    total: count ?? 0,
    submissions: (data as SupabaseContactSubmissionRow[] | null) ?? [],
  };
}

export async function getContactSubmissionByIdWithClient(
  client: SupabaseClient,
  id: string,
): Promise<SupabaseContactSubmissionRow | null> {
  const { data, error } = await client
    .from("contact_submissions")
    .select(CONTACT_SUBMISSION_COLUMNS)
    .eq("id", id)
    .maybeSingle();
  if (error) throwContactQueryError("get_contact_submission", error);
  return (data as SupabaseContactSubmissionRow | null) ?? null;
}

export async function markContactSubmissionContactedWithClient(
  client: SupabaseClient,
  id: string,
): Promise<SupabaseContactSubmissionRow | null> {
  const { data, error } = await client
    .from("contact_submissions")
    .update({ is_contacted: true })
    .eq("id", id)
    .select(CONTACT_SUBMISSION_COLUMNS)
    .maybeSingle();
  if (error) throwContactQueryError("mark_contact_submission_contacted", error);
  return (data as SupabaseContactSubmissionRow | null) ?? null;
}

export async function updateContactSubmissionNotesWithClient(
  client: SupabaseClient,
  id: string,
  notes: string,
): Promise<SupabaseContactSubmissionRow | null> {
  const { data, error } = await client
    .from("contact_submissions")
    .update({ notes })
    .eq("id", id)
    .select(CONTACT_SUBMISSION_COLUMNS)
    .maybeSingle();
  if (error) throwContactQueryError("update_contact_submission_notes", error);
  return (data as SupabaseContactSubmissionRow | null) ?? null;
}

export async function updateContactSubmissionMetaWithClient(
  client: SupabaseClient,
  id: string,
  stage: ContactStage,
  assignedTo: string | null,
): Promise<SupabaseContactSubmissionRow | null> {
  const { data, error } = await client
    .from("contact_submissions")
    .update({
      stage,
      assigned_to: assignedTo,
      is_contacted: stage === "closed",
    })
    .eq("id", id)
    .select(CONTACT_SUBMISSION_COLUMNS)
    .maybeSingle();
  if (error) throwContactQueryError("update_contact_submission_meta", error);
  return (data as SupabaseContactSubmissionRow | null) ?? null;
}

export async function deleteContactSubmissionWithClient(
  client: SupabaseClient,
  id: string,
): Promise<boolean> {
  const { error, count } = await client
    .from("contact_submissions")
    .delete({ count: "exact" })
    .eq("id", id);
  if (error) throwContactQueryError("delete_contact_submission", error);
  return (count ?? 0) > 0;
}

export function toApiContactSubmission(row: SupabaseContactSubmissionRow) {
  return {
    id: row.id,
    name: row.name,
    business_name: row.business_name,
    business_type: row.business_type,
    phone: row.phone,
    email: row.email,
    message: row.message,
    source: row.source,
    is_contacted: row.is_contacted,
    stage: row.stage,
    assigned_to: row.assigned_to,
    notes: row.notes,
    created_at: row.created_at,
    updated_at: row.updated_at,
  };
}
