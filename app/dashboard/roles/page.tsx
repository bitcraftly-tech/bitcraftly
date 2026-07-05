"use client";

import { useState } from "react";
import { showErrorAlert, showFeedbackAlert } from "@/lib/sweetAlert";

import PageHeader from "@/components/dashboard/PageHeader";
import {
  useCreateJobRoleMutation,
  useDeleteJobRoleMutation,
  useJobRolesManageQuery,
  useUpdateJobRoleMutation,
  type JobRolePayload,
} from "@/hooks/useJobRoles";
import type { JobRoleApi } from "@/lib/ats/jobRolesApi";
import { atsInput, atsLabel } from "@/lib/ats/theme";

const EMPTY_FORM: JobRolePayload = {
  slug: "",
  title: "",
  department: "engineering",
  level: "mid",
  work_mode: "remote",
  employment_type: "Full-time",
  experience: "2–4 years",
  skills: ["React"],
  salary_range: "₹8–14 LPA",
  description: "Describe the role and what the candidate will own.",
  featured: false,
  is_active: true,
  sort_order: 100,
};

export default function DashboardJobRolesPage() {
  const query = useJobRolesManageQuery();
  const createMutation = useCreateJobRoleMutation();
  const updateMutation = useUpdateJobRoleMutation();
  const deleteMutation = useDeleteJobRoleMutation();
  const [editing, setEditing] = useState<JobRoleApi | null>(null);
  const [form, setForm] = useState<JobRolePayload>(EMPTY_FORM);
  const [skillsText, setSkillsText] = useState("React, TypeScript");

  const openCreate = () => {
    setEditing(null);
    setForm(EMPTY_FORM);
    setSkillsText("React, TypeScript");
  };

  const openEdit = (role: JobRoleApi) => {
    setEditing(role);
    setForm({
      slug: role.slug,
      title: role.title,
      department: role.department,
      level: role.level,
      work_mode: role.work_mode,
      employment_type: role.employment_type,
      experience: role.experience,
      skills: role.skills,
      salary_range: role.salary_range,
      description: role.description,
      featured: role.featured,
      is_active: role.is_active,
      sort_order: role.sort_order,
    });
    setSkillsText(role.skills.join(", "));
  };

  const save = () => {
    const payload: JobRolePayload = {
      ...form,
      skills: skillsText.split(",").map((s) => s.trim()).filter(Boolean),
    };
    if (!payload.slug || !payload.title) {
      void showErrorAlert("Slug and title are required");
      return;
    }
    if (editing) {
      updateMutation.mutate(
        { id: editing.id, ...payload },
        {
          onSuccess: () => {
            showFeedbackAlert("success", "Role updated");
            openCreate();
          },
          onError: () => showFeedbackAlert("error", "Could not update role"),
        },
      );
    } else {
      createMutation.mutate(payload, {
        onSuccess: () => {
          showFeedbackAlert("success", "Role created");
          openCreate();
        },
        onError: () => showFeedbackAlert("error", "Could not create role — check slug is unique"),
      });
    }
  };

  return (
    <div className="space-y-6">
      <PageHeader
        title="Job roles"
        breadcrumbs={[{ label: "Dashboard", href: "/dashboard" }, { label: "Job roles" }]}
        action={{ label: "Applications", href: "/dashboard/applications" }}
      />

      <div className="grid gap-6 lg:grid-cols-2">
        <div className="rounded-2xl border border-[#e2e8f0] bg-white p-5 dark:border-dark-border-primary dark:bg-dark-bg-card">
          <div className="mb-4 flex items-center justify-between">
            <h2 className="text-lg font-semibold text-[#0f172a] dark:text-dark-text-primary">
              {editing ? "Edit role" : "Add role"}
            </h2>
            {editing ? (
              <button type="button" onClick={openCreate} className="text-xs font-semibold text-indigo-600">
                New role
              </button>
            ) : null}
          </div>
          <div className="grid gap-4 sm:grid-cols-2">
            <div>
              <label className={atsLabel}>Slug (unique)</label>
              <input
                className={atsInput}
                value={form.slug}
                onChange={(e) => setForm((f) => ({ ...f, slug: e.target.value.toLowerCase().replace(/\s+/g, "-") }))}
                placeholder="senior-react"
              />
            </div>
            <div>
              <label className={atsLabel}>Title</label>
              <input className={atsInput} value={form.title} onChange={(e) => setForm((f) => ({ ...f, title: e.target.value }))} />
            </div>
            <div>
              <label className={atsLabel}>Department</label>
              <select className={atsInput} value={form.department} onChange={(e) => setForm((f) => ({ ...f, department: e.target.value }))}>
                <option value="engineering">Engineering</option>
                <option value="design">Design</option>
                <option value="product">Product</option>
              </select>
            </div>
            <div>
              <label className={atsLabel}>Level</label>
              <select className={atsInput} value={form.level} onChange={(e) => setForm((f) => ({ ...f, level: e.target.value }))}>
                <option value="mid">Mid</option>
                <option value="senior">Senior</option>
                <option value="lead">Lead</option>
              </select>
            </div>
            <div>
              <label className={atsLabel}>Work mode</label>
              <select className={atsInput} value={form.work_mode} onChange={(e) => setForm((f) => ({ ...f, work_mode: e.target.value }))}>
                <option value="remote">Remote</option>
                <option value="hybrid">Hybrid</option>
                <option value="onsite">Onsite</option>
              </select>
            </div>
            <div>
              <label className={atsLabel}>Employment</label>
              <input className={atsInput} value={form.employment_type} onChange={(e) => setForm((f) => ({ ...f, employment_type: e.target.value }))} />
            </div>
            <div>
              <label className={atsLabel}>Experience</label>
              <input className={atsInput} value={form.experience} onChange={(e) => setForm((f) => ({ ...f, experience: e.target.value }))} />
            </div>
            <div>
              <label className={atsLabel}>Salary range</label>
              <input className={atsInput} value={form.salary_range} onChange={(e) => setForm((f) => ({ ...f, salary_range: e.target.value }))} />
            </div>
            <div className="sm:col-span-2">
              <label className={atsLabel}>Skills (comma-separated)</label>
              <input className={atsInput} value={skillsText} onChange={(e) => setSkillsText(e.target.value)} />
            </div>
            <div className="sm:col-span-2">
              <label className={atsLabel}>Description</label>
              <textarea
                className="min-h-[80px] w-full rounded-xl border border-[#e2e8f0] px-3 py-2 text-sm dark:border-dark-border-primary"
                value={form.description}
                onChange={(e) => setForm((f) => ({ ...f, description: e.target.value }))}
              />
            </div>
            <div className="flex flex-wrap gap-4 sm:col-span-2">
              <label className="flex items-center gap-2 text-sm">
                <input type="checkbox" checked={form.featured} onChange={(e) => setForm((f) => ({ ...f, featured: e.target.checked }))} />
                Featured
              </label>
              <label className="flex items-center gap-2 text-sm">
                <input type="checkbox" checked={form.is_active} onChange={(e) => setForm((f) => ({ ...f, is_active: e.target.checked }))} />
                Active (visible on careers)
              </label>
            </div>
          </div>
          <button
            type="button"
            onClick={save}
            disabled={createMutation.isPending || updateMutation.isPending}
            className="mt-4 rounded-xl bg-[#0f172a] px-5 py-2.5 text-sm font-semibold text-white dark:bg-white dark:text-black"
          >
            {editing ? "Save changes" : "Create role"}
          </button>
        </div>

        <div className="rounded-2xl border border-[#e2e8f0] bg-white p-5 dark:border-dark-border-primary dark:bg-dark-bg-card">
          <h2 className="text-lg font-semibold text-[#0f172a] dark:text-dark-text-primary">All roles ({query.data?.length ?? 0})</h2>
          {query.isLoading ? (
            <p className="mt-4 text-sm text-[#64748b]">Loading…</p>
          ) : (
            <ul className="mt-4 max-h-[520px] space-y-2 overflow-y-auto">
              {query.data?.map((role) => (
                <li
                  key={role.id}
                  className="flex items-center justify-between gap-2 rounded-xl border border-[#f1f5f9] px-3 py-2 dark:border-dark-border-primary"
                >
                  <div className="min-w-0">
                    <p className="truncate text-sm font-semibold">{role.title}</p>
                    <p className="text-xs text-[#94a3b8]">
                      {role.slug} · {role.is_active ? "Active" : "Hidden"}
                    </p>
                  </div>
                  <div className="flex shrink-0 gap-2">
                    <button type="button" onClick={() => openEdit(role)} className="text-xs font-semibold text-indigo-600">
                      Edit
                    </button>
                    <button
                      type="button"
                      onClick={() =>
                        deleteMutation.mutate(role.id, {
                          onSuccess: () => showFeedbackAlert("success", "Role deactivated"),
                        })
                      }
                      className="text-xs font-semibold text-red-600"
                    >
                      Hide
                    </button>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </div>
  );
}
