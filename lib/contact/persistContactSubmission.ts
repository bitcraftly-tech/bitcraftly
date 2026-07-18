import "server-only";

import { getContactDataSource, type ContactDataSource } from "@/lib/contact/contactDataSource";
import { proxyContactPost } from "@/lib/contact/fastapiContactProxy";
import { persistContactFallback } from "@/lib/contact/notifyContactSubmission";
import type { ContactCreateInput } from "@/lib/contact/contactValidation";
import { createContactSubmission } from "@/lib/supabase/contacts";
import { SupabaseContactQueryError } from "@/lib/supabase/contactQueries";

export type ContactPersistResult = {
  id: string | number;
  message: string;
  success: true;
  via: ContactDataSource | "firestore" | "email";
};

function successPayload(
  id: string | number,
  via: ContactPersistResult["via"],
): ContactPersistResult {
  return {
    success: true,
    message: "Your message has been received. We will contact you shortly.",
    id,
    via,
  };
}

async function persistViaFastApi(
  input: ContactCreateInput,
  authorization?: string | null,
): Promise<ContactPersistResult | null> {
  try {
    const { response, payload } = await proxyContactPost(input, authorization);
    if (!response.ok) {
      const detail =
        (payload as { detail?: string } | null)?.detail ??
        (payload as { message?: string } | null)?.message ??
        `fastapi_${response.status}`;
      console.error("contact_fastapi_persist_failed", detail);
      return null;
    }

    const id =
      (payload as { id?: string | number } | null)?.id ?? `fastapi-${Date.now()}`;
    return successPayload(id, "fastapi");
  } catch (error) {
    console.error(
      "contact_fastapi_proxy_failed",
      error instanceof Error ? error.message : "unknown",
    );
    return null;
  }
}

async function persistViaSupabase(input: ContactCreateInput): Promise<ContactPersistResult | null> {
  try {
    const created = await createContactSubmission(input);
    return successPayload(created.id, "supabase");
  } catch (error) {
    if (error instanceof SupabaseContactQueryError) {
      console.error(
        "contact_supabase_persist_failed",
        error.operation,
        error.sanitized.code,
        error.sanitized.message,
      );
    } else {
      console.error(
        "contact_supabase_persist_failed",
        error instanceof Error ? error.message : "unknown",
      );
    }
    return null;
  }
}

/**
 * Persist a public contact submission with resilient fallbacks:
 * preferred source → alternate DB → Firestore/email.
 */
export async function persistContactSubmission(
  input: ContactCreateInput,
  authorization?: string | null,
): Promise<ContactPersistResult | null> {
  const preferred = getContactDataSource();
  const order: ContactDataSource[] =
    preferred === "supabase" ? ["supabase", "fastapi"] : ["fastapi", "supabase"];

  for (const source of order) {
    const result =
      source === "fastapi"
        ? await persistViaFastApi(input, authorization)
        : await persistViaSupabase(input);
    if (result) return result;
  }

  const fallback = await persistContactFallback(input);
  if (fallback) {
    return successPayload(fallback.id, fallback.channel);
  }

  return null;
}
