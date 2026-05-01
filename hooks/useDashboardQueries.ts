"use client";

import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

import { apiClient } from "@/lib/api-client";

export type Lead = {
  id: number;
  name: string;
  phone: string;
  business_type?: string | null;
  message?: string | null;
  created_at: string;
};

export type ContactSubmission = {
  id: number;
  name: string;
  business_name: string;
  business_type: string;
  phone: string;
  email?: string | null;
  message?: string | null;
  source?: string | null;
  is_contacted: boolean;
  stage: "new" | "in_progress" | "closed";
  assigned_to?: string | null;
  notes?: string | null;
  created_at: string;
  updated_at?: string | null;
};

export type ContactSubmissionsResponse = {
  total: number;
  submissions: ContactSubmission[];
};

export type QRContact = {
  id: number;
  tenant_id: number;
  code: string;
  destination_phone: string;
};

export type Template = {
  id: number;
  tenant_id: number;
  type: "intro" | "demo" | "price";
  content: string;
  created_at: string;
};

type QrCreatePayload = { phone: string };
type QrCreateResponse = { qr_url: string; redirect_url: string };
type TemplatePayload = { type: "intro" | "demo" | "price"; content: string };

export function useLeadsQuery() {
  return useQuery({
    queryKey: ["leads"],
    queryFn: async () => (await apiClient.get<Lead[]>("/api/leads")).data,
  });
}

export function useContactSubmissionsQuery() {
  return useQuery({
    queryKey: ["contact-submissions"],
    queryFn: async () => (await apiClient.get<ContactSubmissionsResponse>("/api/contact/submissions?limit=200")).data,
  });
}

export function useQrContactsQuery() {
  return useQuery({
    queryKey: ["qr-contacts"],
    queryFn: async () => (await apiClient.get<QRContact[]>("/api/qr")).data,
  });
}

export function useTemplatesQuery() {
  return useQuery({
    queryKey: ["templates"],
    queryFn: async () => (await apiClient.get<Template[]>("/api/templates")).data,
  });
}

export function useCreateQrMutation() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (payload: QrCreatePayload) =>
      (await apiClient.post<QrCreateResponse>("/api/qr/create", payload)).data,
    onSuccess: () => {
      void queryClient.invalidateQueries({ queryKey: ["qr-contacts"] });
    },
  });
}

export function useSaveTemplateMutation() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (payload: TemplatePayload) =>
      (await apiClient.post<Template>("/api/templates", payload)).data,
    onSuccess: () => {
      void queryClient.invalidateQueries({ queryKey: ["templates"] });
    },
  });
}

export function useAutoReplyMutation() {
  return useMutation({
    mutationFn: async (payload: { phone: string; type: "intro" | "demo" | "price"; name?: string }) =>
      (await apiClient.post<{ message: string }>("/api/lead/auto-reply", payload)).data,
  });
}

export function useMarkContactedMutation() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (contactId: number) => (await apiClient.patch<{ success: boolean }>(`/api/contact/${contactId}/contacted`)).data,
    onSuccess: () => {
      void queryClient.invalidateQueries({ queryKey: ["contact-submissions"] });
    },
  });
}

export function useUpdateContactNotesMutation() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async ({ contactId, notes }: { contactId: number; notes: string }) =>
      (
        await apiClient.patch<{ success: boolean; message: string }>(`/api/contact/${contactId}/notes`, {
          notes,
        })
      ).data,
    onSuccess: () => {
      void queryClient.invalidateQueries({ queryKey: ["contact-submissions"] });
    },
  });
}

export function useUpdateContactMetaMutation() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async ({
      contactId,
      stage,
      assignedTo,
    }: {
      contactId: number;
      stage: "new" | "in_progress" | "closed";
      assignedTo?: string;
    }) =>
      (
        await apiClient.patch<{ success: boolean; message: string }>(`/api/contact/${contactId}/meta`, {
          stage,
          assigned_to: assignedTo?.trim() || null,
        })
      ).data,
    onSuccess: () => {
      void queryClient.invalidateQueries({ queryKey: ["contact-submissions"] });
    },
  });
}

