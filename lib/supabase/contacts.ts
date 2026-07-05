import "server-only";

import { getSupabaseServerClient } from "@/lib/supabase/server";
import {
  countContactSubmissionsWithClient,
  createContactSubmissionWithClient,
  deleteContactSubmissionWithClient,
  getContactSubmissionByIdWithClient,
  listContactSubmissionsWithClient,
  markContactSubmissionContactedWithClient,
  toApiContactSubmission,
  updateContactSubmissionMetaWithClient,
  updateContactSubmissionNotesWithClient,
  type SupabaseContactSubmissionRow,
} from "@/lib/supabase/contactQueries";
import type { ContactCreateInput, ContactStage } from "@/lib/contact/contactValidation";

export type { SupabaseContactSubmissionRow };

export async function countContactSubmissions(): Promise<number> {
  return countContactSubmissionsWithClient(getSupabaseServerClient());
}

export async function createContactSubmission(input: ContactCreateInput) {
  const row = await createContactSubmissionWithClient(getSupabaseServerClient(), input);
  return toApiContactSubmission(row);
}

export async function listContactSubmissions(options?: {
  skip?: number;
  limit?: number;
  pendingOnly?: boolean;
}) {
  const result = await listContactSubmissionsWithClient(getSupabaseServerClient(), options);
  return {
    total: result.total,
    submissions: result.submissions.map(toApiContactSubmission),
  };
}

export async function getContactSubmissionById(id: string) {
  const row = await getContactSubmissionByIdWithClient(getSupabaseServerClient(), id);
  return row ? toApiContactSubmission(row) : null;
}

export async function markContactSubmissionContacted(id: string) {
  const row = await markContactSubmissionContactedWithClient(getSupabaseServerClient(), id);
  return row ? toApiContactSubmission(row) : null;
}

export async function updateContactSubmissionNotes(id: string, notes: string) {
  const row = await updateContactSubmissionNotesWithClient(getSupabaseServerClient(), id, notes);
  return row ? toApiContactSubmission(row) : null;
}

export async function updateContactSubmissionMeta(id: string, stage: ContactStage, assignedTo: string | null) {
  const row = await updateContactSubmissionMetaWithClient(
    getSupabaseServerClient(),
    id,
    stage,
    assignedTo,
  );
  return row ? toApiContactSubmission(row) : null;
}

export async function deleteContactSubmission(id: string): Promise<boolean> {
  return deleteContactSubmissionWithClient(getSupabaseServerClient(), id);
}
