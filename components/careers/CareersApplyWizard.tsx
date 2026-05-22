"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import { useSearchParams } from "next/navigation";
import { AnimatePresence, motion } from "framer-motion";
import {
  ArrowLeft,
  ArrowRight,
  Briefcase,
  CheckCircle2,
  Heart,
  Link2,
  User,
} from "lucide-react";
import { toast } from "sonner";

import AtsPremiumTextarea from "@/components/ats/AtsPremiumTextarea";
import ResumeDropzone from "@/components/ats/ResumeDropzone";
import { useActiveJobRolesQuery } from "@/hooks/useJobRoles";
import {
  API_BASE,
  CAREER_APPLY_STEPS,
  CAREER_ROLES_FALLBACK,
  EXPERIENCE_OPTIONS,
  INITIAL_CAREER_APPLICATION,
  NOTICE_OPTIONS,
  type CareerApplicationForm,
  type CareerApplyStepId,
} from "@/lib/careersApplication";
import { PS_BTN_PRIMARY, PS_EYEBROW, PS_HEADING } from "@/lib/ats/careersShowcaseTheme";
import { atsInput, atsLabel } from "@/lib/ats/theme";
import { showErrorAlert, showSuccessAlert } from "@/lib/sweetAlert";

const TEXTAREA =
  "min-h-[100px] w-full resize-y rounded-xl border border-[#e2e8f0] bg-white px-4 py-3 text-sm text-[#0f172a] outline-none transition placeholder:text-[#94a3b8] focus:border-[#6366f1] focus:ring-2 focus:ring-[#6366f1]/15 dark:border-dark-border-primary dark:bg-dark-bg-card dark:text-dark-text-primary";

function Field({
  label,
  children,
  error,
}: {
  label: string;
  children: React.ReactNode;
  error?: string;
}) {
  return (
    <div className="flex flex-col gap-1.5">
      <label className={atsLabel}>{label}</label>
      {children}
      {error ? <p className="text-xs text-red-600">{error}</p> : null}
    </div>
  );
}

const stepIcons = {
  profile: User,
  links: Link2,
  experience: Briefcase,
  story: Heart,
  review: CheckCircle2,
} as const;

export default function CareersApplyWizard() {
  const searchParams = useSearchParams();
  const roleFromUrl = searchParams.get("role");
  const rolesQuery = useActiveJobRolesQuery();
  const roleOptions = useMemo(() => {
    const titles = rolesQuery.data?.map((j) => j.title) ?? [...CAREER_ROLES_FALLBACK];
    const general = "General application — open role";
    if (!titles.includes(general)) titles.push(general);
    return titles;
  }, [rolesQuery.data]);
  const [stepIndex, setStepIndex] = useState(0);
  const [values, setValues] = useState<CareerApplicationForm>(() => ({
    ...INITIAL_CAREER_APPLICATION,
    roleApplied: roleFromUrl ? decodeURIComponent(roleFromUrl) : INITIAL_CAREER_APPLICATION.roleApplied,
  }));
  const [errors, setErrors] = useState<Partial<Record<keyof CareerApplicationForm, string>>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submittedId, setSubmittedId] = useState<number | null>(null);
  const [touched, setTouched] = useState<Partial<Record<keyof CareerApplicationForm, boolean>>>({});
  const [storyAttempted, setStoryAttempted] = useState(false);

  const step = CAREER_APPLY_STEPS[stepIndex];
  const progress = ((stepIndex + 1) / CAREER_APPLY_STEPS.length) * 100;
  const StepIcon = stepIcons[step.id as keyof typeof stepIcons] ?? User;

  const set = (field: keyof CareerApplicationForm, value: string | File | null) => {
    setValues((prev) => ({ ...prev, [field]: value }));
    setErrors((prev) => ({ ...prev, [field]: undefined }));
  };

  const validateStep = (id: CareerApplyStepId): boolean => {
    const next: Partial<Record<keyof CareerApplicationForm, string>> = {};
    if (id === "profile") {
      if (!values.fullName.trim()) next.fullName = "Full name is required";
      if (!values.email.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(values.email)) next.email = "Valid email required";
      const phone = values.phone.replace(/\D/g, "");
      if (phone.length !== 10) next.phone = "Enter 10-digit mobile number";
    }
    if (id === "links") {
      if (!values.resumeFile) next.resumeFile = "Resume is required (PDF, DOC, or DOCX)";
      const hasLink =
        values.portfolioUrl.trim() ||
        values.githubUrl.trim() ||
        values.linkedinUrl.trim() ||
        values.behanceUrl.trim();
      if (!hasLink) next.portfolioUrl = "Add at least one portfolio or profile link";
    }
    if (id === "experience") {
      if (!values.currentRole.trim()) next.currentRole = "Current role / title is required";
      if (!values.skills.trim()) next.skills = "List core skills (React, Next.js, Figma, etc.)";
    }
    if (id === "story") {
      if (!values.whyJoin.trim() || values.whyJoin.trim().length < 40) {
        next.whyJoin = "Please add a few more sentences so we can review your fit.";
      }
    }
    setErrors(next);
    return Object.keys(next).length === 0;
  };

  const goNext = () => {
    if (step.id === "story") setStoryAttempted(true);
    if (!validateStep(step.id)) return;
    setStepIndex((i) => Math.min(i + 1, CAREER_APPLY_STEPS.length - 1));
  };

  const goBack = () => setStepIndex((i) => Math.max(i - 1, 0));

  const buildFormData = () => {
    const fd = new FormData();
    fd.append("full_name", values.fullName.trim());
    fd.append("email", values.email.trim());
    fd.append("phone", values.phone.replace(/\D/g, ""));
    if (values.city.trim()) fd.append("city", values.city.trim());
    fd.append("role_applied", values.roleApplied);
    fd.append("experience_years", values.experienceYears);
    fd.append("current_role", values.currentRole.trim());
    fd.append("notice_period", values.noticePeriod);
    const expected = [values.currentCtc.trim() && `Current: ${values.currentCtc.trim()}`, values.expectedCtc.trim() && `Expected: ${values.expectedCtc.trim()}`]
      .filter(Boolean)
      .join(" · ");
    if (expected) fd.append("expected_ctc", expected);
    let skills = values.skills.trim();
    if (values.currentCtc.trim()) skills = `Current CTC: ${values.currentCtc.trim()}\n${skills}`;
    fd.append("skills", skills);
    if (values.portfolioUrl.trim()) fd.append("portfolio_url", values.portfolioUrl.trim());
    if (values.githubUrl.trim()) fd.append("github_url", values.githubUrl.trim());
    if (values.linkedinUrl.trim()) fd.append("linkedin_url", values.linkedinUrl.trim());
    if (values.behanceUrl.trim()) fd.append("behance_url", values.behanceUrl.trim());
    const cover = [
      values.whyJoin.trim(),
      values.projectLinks.trim() ? `Project links:\n${values.projectLinks.trim()}` : "",
      values.coverLetter.trim(),
    ]
      .filter(Boolean)
      .join("\n\n");
    if (cover) fd.append("cover_letter", cover);
    fd.append("source", roleFromUrl ? `careers-role-${encodeURIComponent(values.roleApplied)}` : "careers-apply");
    if (values.resumeFile) fd.append("resume", values.resumeFile, values.resumeFile.name);
    return fd;
  };

  const submit = async () => {
    if (!validateStep("links")) {
      setStepIndex(1);
      return;
    }
    setStoryAttempted(true);
    if (!validateStep("story")) {
      setStepIndex(3);
      return;
    }
    setIsSubmitting(true);
    try {
      const response = await fetch(`${API_BASE}/api/careers/apply`, {
        method: "POST",
        body: buildFormData(),
      });
      const data = (await response.json().catch(() => ({}))) as {
        detail?: string | { msg?: string }[];
        message?: string;
        id?: number;
      };
      if (!response.ok) {
        let errMsg = "Submission failed. Please try again.";
        if (typeof data.detail === "string") errMsg = data.detail;
        else if (Array.isArray(data.detail) && data.detail[0]?.msg) errMsg = data.detail[0].msg;
        throw new Error(errMsg);
      }
      setSubmittedId(data.id ?? null);
      await showSuccessAlert("Application submitted", data.message ?? "We received your profile.");
    } catch (err) {
      const message = err instanceof Error ? err.message : "Something went wrong.";
      toast.error(message);
      await showErrorAlert("Could not submit", message);
    } finally {
      setIsSubmitting(false);
    }
  };

  const reviewRows = useMemo(
    () => [
      ["Name", values.fullName],
      ["Email", values.email],
      ["Location", values.city || "—"],
      ["Role", values.roleApplied],
      ["Resume", values.resumeFile?.name ?? "—"],
      ["Experience", values.experienceYears],
      ["Compensation", [values.currentCtc, values.expectedCtc].filter(Boolean).join(" → ") || "—"],
      ["Notice", values.noticePeriod],
    ],
    [values],
  );

  if (submittedId !== null) {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.98 }}
        animate={{ opacity: 1, scale: 1 }}
        className="w-full rounded-[20px] border border-[#e8ecef] bg-white p-8 text-center shadow-[0_4px_24px_rgba(44,62,80,0.06)] md:p-12"
      >
        <CheckCircle2 className="mx-auto size-12 text-emerald-600" aria-hidden />
        <h2 className="mt-4 font-[var(--font-playfair)] text-2xl font-semibold text-[#0f172a] dark:text-dark-text-primary">
          Application received
        </h2>
        <p className="mt-2 text-sm text-[#64748b] dark:text-dark-text-secondary">
          Reference #{submittedId}. Our team reviews every profile personally — watch your inbox for next steps.
        </p>
        <div className="mt-8 flex flex-wrap justify-center gap-3">
          <Link href="/careers" className="inline-flex rounded-full border border-[#e2e8f0] px-5 py-2.5 text-sm font-semibold">
            Back to careers
          </Link>
          <Link href="/" className={PS_BTN_PRIMARY}>
            Home
          </Link>
        </div>
      </motion.div>
    );
  }

  return (
    <div className="w-full overflow-hidden rounded-[20px] border border-[#e8ecef] bg-white shadow-[0_4px_24px_rgba(44,62,80,0.06)]">
      <div className="border-b border-[#ecf0f1] px-5 py-6 sm:px-8 sm:py-8 lg:px-10">
        <p className={PS_EYEBROW}>Apply · Bitcraftly ATS</p>
        <h1 className={`${PS_HEADING} mt-2 text-3xl md:text-4xl`}>Send your profile</h1>
        <p className="mt-2 max-w-2xl text-sm text-[#7f8c8d]">
          Premium multi-step application — resume, links, and your story. About 4–5 minutes.
        </p>
        <div className="mt-6 h-2 w-full overflow-hidden rounded-full bg-[#ecf0f1]">
          <motion.div
            className="h-full rounded-full bg-[#8e44ad]"
            animate={{ width: `${progress}%` }}
            transition={{ duration: 0.35 }}
          />
        </div>
        <div className="mt-4 -mx-1 flex gap-2 overflow-x-auto pb-1 scrollbar-thin sm:flex-wrap">
          {CAREER_APPLY_STEPS.map((s, i) => {
            const isActive = i === stepIndex;
            const isDone = i < stepIndex;
            return (
              <span
                key={s.id}
                className={`shrink-0 rounded-full border px-3.5 py-2 text-xs font-semibold transition sm:px-4 ${
                  isActive
                    ? "border-transparent bg-[#8e44ad] text-white shadow-[0_4px_14px_rgba(142,68,173,0.35)]"
                    : isDone
                      ? "border-[#abebc6] bg-[#eafaf1] text-[#27ae60]"
                      : "border-[#e8ecef] bg-white text-[#7f8c8d] shadow-sm"
                }`}
              >
                {s.title}
              </span>
            );
          })}
        </div>
      </div>

      <div className="px-5 py-6 sm:px-8 sm:py-8 lg:px-10">
        <div className="mb-6 flex items-start gap-3">
          <span className="flex size-10 shrink-0 items-center justify-center rounded-xl bg-[#9b59b6]/10 text-[#8e44ad]">
            <StepIcon className="size-5" aria-hidden />
          </span>
          <div>
            <h2 className="text-lg font-semibold text-[#2c3e50]">{step.title}</h2>
            <p className="text-sm text-[#7f8c8d]">{step.hint}</p>
          </div>
        </div>

        <AnimatePresence mode="wait">
          <motion.div
            key={step.id}
            initial={{ opacity: 0, x: 12 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -12 }}
            transition={{ duration: 0.25 }}
          >
            {step.id === "profile" ? (
              <div className="grid gap-5 sm:grid-cols-2">
                <Field label="Full name *" error={errors.fullName}>
                  <input className={atsInput} value={values.fullName} onChange={(e) => set("fullName", e.target.value)} />
                </Field>
                <Field label="Email *" error={errors.email}>
                  <input type="email" className={atsInput} value={values.email} onChange={(e) => set("email", e.target.value)} />
                </Field>
                <Field label="Phone (10 digits) *" error={errors.phone}>
                  <input
                    className={atsInput}
                    inputMode="numeric"
                    maxLength={10}
                    value={values.phone}
                    onChange={(e) => set("phone", e.target.value.replace(/\D/g, "").slice(0, 10))}
                  />
                </Field>
                <Field label="Location">
                  <input className={atsInput} value={values.city} onChange={(e) => set("city", e.target.value)} placeholder="City, remote, etc." />
                </Field>
                <div className="sm:col-span-2">
                  <Field label="Role *">
                    <select className={atsInput} value={values.roleApplied} onChange={(e) => set("roleApplied", e.target.value)}>
                      {roleOptions.map((r) => (
                        <option key={r} value={r}>
                          {r}
                        </option>
                      ))}
                    </select>
                  </Field>
                </div>
              </div>
            ) : null}

            {step.id === "links" ? (
              <div className="space-y-5">
                <ResumeDropzone file={values.resumeFile} onFile={(f) => set("resumeFile", f)} error={errors.resumeFile} />
                <div className="grid gap-5 sm:grid-cols-2">
                  <Field label="Portfolio" error={errors.portfolioUrl}>
                    <input className={atsInput} value={values.portfolioUrl} onChange={(e) => set("portfolioUrl", e.target.value)} placeholder="https://" />
                  </Field>
                  <Field label="GitHub">
                    <input className={atsInput} value={values.githubUrl} onChange={(e) => set("githubUrl", e.target.value)} />
                  </Field>
                  <Field label="LinkedIn">
                    <input className={atsInput} value={values.linkedinUrl} onChange={(e) => set("linkedinUrl", e.target.value)} />
                  </Field>
                  <Field label="Behance / Dribbble">
                    <input className={atsInput} value={values.behanceUrl} onChange={(e) => set("behanceUrl", e.target.value)} />
                  </Field>
                </div>
              </div>
            ) : null}

            {step.id === "experience" ? (
              <div className="grid gap-5 sm:grid-cols-2">
                <Field label="Years of experience">
                  <select className={atsInput} value={values.experienceYears} onChange={(e) => set("experienceYears", e.target.value)}>
                    {EXPERIENCE_OPTIONS.map((o) => (
                      <option key={o} value={o}>
                        {o}
                      </option>
                    ))}
                  </select>
                </Field>
                <Field label="Notice period">
                  <select className={atsInput} value={values.noticePeriod} onChange={(e) => set("noticePeriod", e.target.value)}>
                    {NOTICE_OPTIONS.map((o) => (
                      <option key={o} value={o}>
                        {o}
                      </option>
                    ))}
                  </select>
                </Field>
                <Field label="Current role *" error={errors.currentRole}>
                  <input className={atsInput} value={values.currentRole} onChange={(e) => set("currentRole", e.target.value)} />
                </Field>
                <Field label="Current salary (optional)">
                  <input className={atsInput} value={values.currentCtc} onChange={(e) => set("currentCtc", e.target.value)} placeholder="e.g. 8 LPA" />
                </Field>
                <Field label="Expected salary (optional)">
                  <input className={atsInput} value={values.expectedCtc} onChange={(e) => set("expectedCtc", e.target.value)} placeholder="e.g. 12 LPA" />
                </Field>
                <div className="sm:col-span-2">
                  <Field label="Core skills *" error={errors.skills}>
                    <textarea className={TEXTAREA} value={values.skills} onChange={(e) => set("skills", e.target.value)} placeholder="React, Next.js, TypeScript…" />
                  </Field>
                </div>
              </div>
            ) : null}

            {step.id === "story" ? (
              <div className="space-y-8">
                <AtsPremiumTextarea
                  id="why-join-bitcraftly"
                  label="Why do you want to join Bitcraftly?"
                  helperText="Share your motivation, technical interests, and the kind of work you enjoy."
                  placeholder="Tell us about your frontend experience, projects, problem-solving approach, and why you'd like to work with Bitcraftly."
                  value={values.whyJoin}
                  onChange={(v) => set("whyJoin", v)}
                  onBlur={() => setTouched((t) => ({ ...t, whyJoin: true }))}
                  error={errors.whyJoin}
                  showError={Boolean(errors.whyJoin && (touched.whyJoin || storyAttempted))}
                  aiAssist
                />
                <Field label="Project links (one per line)">
                  <textarea
                    className={TEXTAREA}
                    value={values.projectLinks}
                    onChange={(e) => set("projectLinks", e.target.value)}
                    placeholder="https://github.com/…/project&#10;https://…"
                  />
                </Field>
                <Field label="Additional cover note (optional)">
                  <textarea className={TEXTAREA} value={values.coverLetter} onChange={(e) => set("coverLetter", e.target.value)} />
                </Field>
              </div>
            ) : null}

            {step.id === "review" ? (
              <dl className="divide-y divide-[#f1f5f9] rounded-xl border border-[#e2e8f0] dark:divide-dark-border-primary dark:border-dark-border-primary">
                {reviewRows.map(([k, v]) => (
                  <div key={k} className="flex flex-col gap-0.5 px-4 py-3 sm:flex-row sm:justify-between">
                    <dt className="text-xs font-semibold uppercase tracking-wide text-[#94a3b8]">{k}</dt>
                    <dd className="text-sm text-[#0f172a] dark:text-dark-text-primary sm:max-w-[60%] sm:text-right">{v}</dd>
                  </div>
                ))}
              </dl>
            ) : null}
          </motion.div>
        </AnimatePresence>

        <div className="mt-8 flex w-full flex-wrap items-center justify-between gap-3 border-t border-[#ecf0f1] pt-6">
          {stepIndex > 0 ? (
            <button
              type="button"
              onClick={goBack}
              className="inline-flex items-center gap-2 rounded-full border border-[#e8ecef] bg-white px-5 py-2.5 text-sm font-semibold text-[#2c3e50] shadow-sm transition hover:border-[rgba(142,68,173,0.3)]"
            >
              <ArrowLeft className="size-4" aria-hidden />
              Back
            </button>
          ) : (
            <Link
              href="/careers"
              className="inline-flex items-center gap-2 text-sm font-semibold text-[#7f8c8d] transition hover:text-[#8e44ad]"
            >
              <ArrowLeft className="size-4" aria-hidden />
              Careers
            </Link>
          )}
          {step.id !== "review" ? (
            <button type="button" onClick={goNext} className={PS_BTN_PRIMARY}>
              Continue
              <ArrowRight className="size-4" aria-hidden />
            </button>
          ) : (
            <button type="button" disabled={isSubmitting} onClick={submit} className={PS_BTN_PRIMARY}>
              {isSubmitting ? "Submitting…" : "Submit application"}
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
