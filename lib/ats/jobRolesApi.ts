import { API_BASE } from "@/lib/careersApplication";
import type { JobDepartment, JobLevel, JobOpening, JobWorkMode } from "@/lib/ats/jobs";

export type JobRoleApi = {
  id: number;
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
  featured: boolean;
  is_active: boolean;
  sort_order: number;
};

export type JobRolesResponse = {
  total: number;
  roles: JobRoleApi[];
};

export function mapJobRoleToOpening(role: JobRoleApi): JobOpening {
  return {
    id: role.slug,
    title: role.title,
    department: role.department as JobDepartment,
    level: role.level as JobLevel,
    workMode: role.work_mode as JobWorkMode,
    employmentType: role.employment_type,
    experience: role.experience,
    skills: role.skills,
    salaryRange: role.salary_range,
    description: role.description,
    featured: role.featured,
  };
}

export async function fetchActiveJobRoles(): Promise<JobOpening[]> {
  const res = await fetch(`${API_BASE}/api/careers/roles`, { next: { revalidate: 60 } });
  if (!res.ok) throw new Error("Could not load job roles");
  const data = (await res.json()) as JobRolesResponse;
  return data.roles.map(mapJobRoleToOpening);
}

export async function fetchAllJobRoles(): Promise<JobRoleApi[]> {
  const res = await fetch(`${API_BASE}/api/careers/roles/manage?include_inactive=true`);
  if (!res.ok) throw new Error("Could not load roles");
  const data = (await res.json()) as JobRolesResponse;
  return data.roles;
}
