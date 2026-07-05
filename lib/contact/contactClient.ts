import { getSession } from "next-auth/react";

import { isContactSupabaseSourceClient } from "@/lib/contact/contactDataSource";

async function contactFetch(path: string, init?: RequestInit) {
  const session = await getSession();
  const headers = new Headers(init?.headers ?? {});
  headers.set("Content-Type", "application/json");
  if (session?.accessToken) {
    headers.set("Authorization", `Bearer ${session.accessToken}`);
  }
  return fetch(path, { ...init, headers, credentials: "same-origin" });
}

export function useContactApiPaths() {
  const supabase = isContactSupabaseSourceClient();
  return {
    supabase,
    submissionsPath: supabase ? "/api/contact/submissions" : null,
  };
}

export async function fetchContactSubmissions(limit = 200) {
  if (isContactSupabaseSourceClient()) {
    const response = await contactFetch(`/api/contact/submissions?limit=${limit}`);
    if (!response.ok) {
      throw new Error("Failed to fetch contact submissions");
    }
    return response.json();
  }

  const { apiClient } = await import("@/lib/api-client");
  return (await apiClient.get(`/api/contact/submissions?limit=${limit}`)).data;
}

export async function patchContactContacted(contactId: number | string) {
  if (isContactSupabaseSourceClient()) {
    const response = await contactFetch(`/api/contact/${contactId}/contacted`, { method: "PATCH" });
    if (!response.ok) throw new Error("Failed to mark contacted");
    return response.json();
  }

  const { apiClient } = await import("@/lib/api-client");
  return (await apiClient.patch(`/api/contact/${contactId}/contacted`)).data;
}

export async function patchContactNotes(contactId: number | string, notes: string) {
  if (isContactSupabaseSourceClient()) {
    const response = await contactFetch(`/api/contact/${contactId}/notes`, {
      method: "PATCH",
      body: JSON.stringify({ notes }),
    });
    if (!response.ok) throw new Error("Failed to update notes");
    return response.json();
  }

  const { apiClient } = await import("@/lib/api-client");
  return (await apiClient.patch(`/api/contact/${contactId}/notes`, { notes })).data;
}

export async function patchContactMeta(
  contactId: number | string,
  stage: "new" | "in_progress" | "closed",
  assignedTo?: string,
) {
  if (isContactSupabaseSourceClient()) {
    const response = await contactFetch(`/api/contact/${contactId}/meta`, {
      method: "PATCH",
      body: JSON.stringify({ stage, assigned_to: assignedTo?.trim() || null }),
    });
    if (!response.ok) throw new Error("Failed to update contact meta");
    return response.json();
  }

  const { apiClient } = await import("@/lib/api-client");
  return (
    await apiClient.patch(`/api/contact/${contactId}/meta`, {
      stage,
      assigned_to: assignedTo?.trim() || null,
    })
  ).data;
}
