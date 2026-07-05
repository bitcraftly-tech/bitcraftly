"use client";

import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

import { apiClient } from "@/lib/api-client";
import {
  fetchContactSubmissions,
  patchContactContacted,
  patchContactMeta,
  patchContactNotes,
} from "@/lib/contact/contactClient";

export type Lead = {
  id: number;
  name: string;
  phone: string;
  business_type?: string | null;
  message?: string | null;
  created_at: string;
};

export type ContactSubmission = {
  id: number | string;
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

export type ParkingReport = {
  id: number;
  tenant_id: number;
  qr_contact_id: number;
  issue_type: string;
  status: "open" | "resolved";
  notes?: string | null;
  reporter_phone?: string | null;
  resolved_by_user_id?: number | null;
  resolved_at?: string | null;
  created_at: string;
  vehicle_number?: string | null;
  owner_name?: string | null;
  destination_phone?: string | null;
};

export type ParkingReportListResponse = {
  total: number;
  items: ParkingReport[];
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
    queryFn: async () =>
      (await fetchContactSubmissions(200)) as ContactSubmissionsResponse,
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

export function useParkingReportsQuery(status: "all" | "open" | "resolved" = "all") {
  return useQuery({
    queryKey: ["parking-reports", status],
    queryFn: async () =>
      (await apiClient.get<ParkingReportListResponse>(`/api/parking-reports?status_filter=${status}`)).data,
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
    mutationFn: async (contactId: number | string) => patchContactContacted(contactId),
    onSuccess: () => {
      void queryClient.invalidateQueries({ queryKey: ["contact-submissions"] });
    },
  });
}

export function useUpdateContactNotesMutation() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async ({ contactId, notes }: { contactId: number | string; notes: string }) =>
      patchContactNotes(contactId, notes),
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
      contactId: number | string;
      stage: "new" | "in_progress" | "closed";
      assignedTo?: string;
    }) => patchContactMeta(contactId, stage, assignedTo),
    onSuccess: () => {
      void queryClient.invalidateQueries({ queryKey: ["contact-submissions"] });
    },
  });
}

export type JobApplication = {
  id: number;
  full_name: string;
  email: string;
  phone: string;
  city?: string | null;
  role_applied: string;
  experience_years?: string | null;
  current_role?: string | null;
  notice_period?: string | null;
  expected_ctc?: string | null;
  skills?: string | null;
  portfolio_url?: string | null;
  github_url?: string | null;
  linkedin_url?: string | null;
  behance_url?: string | null;
  cover_letter?: string | null;
  resume_filename: string;
  resume_mime?: string | null;
  resume_size_bytes?: number | null;
  source?: string | null;
  stage: string;
  assigned_to?: string | null;
  notes?: string | null;
  is_contacted: boolean;
  created_at: string;
  updated_at?: string | null;
};

export type JobApplicationsResponse = {
  total: number;
  applications: JobApplication[];
};

export function useJobApplicationsQuery(stage?: string) {
  const query = stage && stage !== "all" ? `?limit=200&stage=${stage}` : "?limit=200";
  return useQuery({
    queryKey: ["job-applications", stage ?? "all"],
    queryFn: async () => (await apiClient.get<JobApplicationsResponse>(`/api/careers/applications${query}`)).data,
  });
}

export function useUpdateJobApplicationMetaMutation() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async ({
      applicationId,
      stage,
      assignedTo,
      isContacted,
    }: {
      applicationId: number;
      stage?: string;
      assignedTo?: string;
      isContacted?: boolean;
    }) =>
      (
        await apiClient.patch<{ success: boolean }>(`/api/careers/applications/${applicationId}/meta`, {
          stage,
          assigned_to: assignedTo?.trim() || null,
          is_contacted: isContacted,
        })
      ).data,
    onSuccess: () => {
      void queryClient.invalidateQueries({ queryKey: ["job-applications"] });
    },
  });
}

export function useUpdateJobApplicationNotesMutation() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async ({ applicationId, notes }: { applicationId: number; notes: string }) =>
      (await apiClient.patch<{ success: boolean }>(`/api/careers/applications/${applicationId}/notes`, { notes })).data,
    onSuccess: () => {
      void queryClient.invalidateQueries({ queryKey: ["job-applications"] });
    },
  });
}

export async function downloadJobApplicationResume(applicationId: number, filename: string) {
  const response = await apiClient.get(`/api/careers/applications/${applicationId}/resume`, {
    responseType: "blob",
  });
  const url = window.URL.createObjectURL(response.data);
  const anchor = document.createElement("a");
  anchor.href = url;
  anchor.download = filename;
  anchor.click();
  window.URL.revokeObjectURL(url);
}

export function useResolveParkingReportMutation() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (reportId: number) =>
      (await apiClient.patch<{ success: boolean; message: string }>(`/api/parking-reports/${reportId}/resolve`)).data,
    onSuccess: () => {
      void queryClient.invalidateQueries({ queryKey: ["parking-reports"] });
    },
  });
}

