"use client";

import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

import { apiClient } from "@/lib/api-client";
import { fetchActiveJobRoles, type JobRoleApi } from "@/lib/ats/jobRolesApi";
import { JOB_OPENINGS } from "@/lib/ats/jobs";

export type JobRolePayload = {
  slug: string;
  title: string;
  department: string;
  level: string;
  work_mode: string;
  employment_type: string;
  experience: string;
  skills: string[];
  salary_range: string;
  description: string;
  featured?: boolean;
  is_active?: boolean;
  sort_order?: number;
};

export function useActiveJobRolesQuery() {
  return useQuery({
    queryKey: ["careers", "roles", "active"],
    queryFn: fetchActiveJobRoles,
    staleTime: 60_000,
    placeholderData: JOB_OPENINGS,
  });
}

export function useJobRolesManageQuery() {
  return useQuery({
    queryKey: ["careers", "roles", "manage"],
    queryFn: async () => {
      const { data } = await apiClient.get<{ total: number; roles: JobRoleApi[] }>(
        "/api/careers/roles/manage?include_inactive=true",
      );
      return data.roles;
    },
  });
}

export function useCreateJobRoleMutation() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async (payload: JobRolePayload) => {
      const { data } = await apiClient.post<JobRoleApi>("/api/careers/roles", payload);
      return data;
    },
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["careers", "roles"] });
    },
  });
}

export function useUpdateJobRoleMutation() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async ({ id, ...payload }: JobRolePayload & { id: number }) => {
      const { data } = await apiClient.patch<JobRoleApi>(`/api/careers/roles/${id}`, payload);
      return data;
    },
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["careers", "roles"] });
    },
  });
}

export function useDeleteJobRoleMutation() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async (id: number) => {
      await apiClient.delete(`/api/careers/roles/${id}`);
    },
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["careers", "roles"] });
    },
  });
}
