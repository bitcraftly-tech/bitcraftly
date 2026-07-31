'use client';

import Link from 'next/link';
import { useEffect, useMemo, useState } from 'react';
import { usePathname, useSearchParams } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/typography';
import { Icon, type IconName } from '@/components/ui/icon';
import { SlidingPillIndicator, useSlidingPillIndicator } from '@/components/patterns/sliding-pill';
import { ROUTES } from '@/constants/navigation';
import {
  mapSubmitLeadFailureToUserMessage,
  submitLeadFromClient,
} from '@/features/lead-funnel/submit-lead.client';
import { CAREER_ROLES, getCareerRoleBySlug } from './careers.content';
import { cn } from '@/lib/cn';

const DRAFT_STORAGE_KEY = 'bitcraftly:careers-apply-draft-v2';

const STEPS = [
  {
    id: 1,
    key: 'profile',
    title: 'Your details',
    hint: 'Name, email, phone, and location',
    icon: 'mail' as IconName,
  },
  {
    id: 2,
    key: 'links',
    title: 'Work & resume',
    hint: 'Resume link and profile links',
    icon: 'globe' as IconName,
  },
  {
    id: 3,
    key: 'experience',
    title: 'Experience',
    hint: 'Years, compensation, and notice period',
    icon: 'layout-grid' as IconName,
  },
  {
    id: 4,
    key: 'story',
    title: 'Your story',
    hint: 'Why Bitcraftly and project highlights',
    icon: 'sparkles' as IconName,
  },
  {
    id: 5,
    key: 'review',
    title: 'Review',
    hint: 'Confirm before you submit',
    icon: 'check' as IconName,
  },
] as const;

const EXPERIENCE_OPTIONS = [
  'Fresher',
  '0–1 years',
  '1–2 years',
  '2–4 years',
  '4–6 years',
  '6–8 years',
  '8+ years',
] as const;

const NOTICE_OPTIONS = [
  'Immediate',
  '15 days',
  '30 days',
  '45 days',
  '60 days',
  '90 days',
] as const;

const applySchema = z.object({
  roleSlug: z.string().trim().min(1, 'Select a role.'),
  fullName: z.string().trim().min(2, 'Enter your full name.').max(80),
  email: z.string().trim().email('Enter a valid email.').max(120),
  phone: z
    .string()
    .trim()
    .regex(/^\d{10}$/, 'Enter a 10-digit phone number.'),
  location: z.string().trim().max(120).optional().or(z.literal('')),
  portfolio: z.string().trim().url('Enter a valid URL.').or(z.literal('')),
  github: z.string().trim().url('Enter a valid URL.').or(z.literal('')),
  linkedin: z.string().trim().url('Enter a valid URL.').or(z.literal('')),
  behance: z.string().trim().url('Enter a valid URL.').or(z.literal('')),
  resumeUrl: z.string().trim().url('Enter a valid resume URL.').or(z.literal('')),
  yearsExperience: z.string().trim().min(1, 'Select experience.'),
  noticePeriod: z.string().trim().min(1, 'Select notice period.'),
  currentRole: z.string().trim().min(2, 'Enter your current role.').max(120),
  currentSalary: z.string().trim().max(80).optional().or(z.literal('')),
  expectedCtc: z.string().trim().max(80).optional().or(z.literal('')),
  coreSkills: z.string().trim().min(3, 'List a few core skills.').max(400),
  whyJoin: z.string().trim().min(20, 'Share at least 20 characters.').max(2000),
  projectLinks: z.string().trim().max(1500).optional().or(z.literal('')),
  coverNote: z.string().trim().max(1500).optional().or(z.literal('')),
});

type ApplyValues = z.infer<typeof applySchema>;

interface CareersApplyDraft {
  step: number;
  completedSteps: number[];
  values: ApplyValues;
}

const EMPTY_VALUES: ApplyValues = {
  roleSlug: 'general',
  fullName: '',
  email: '',
  phone: '',
  location: '',
  portfolio: '',
  github: '',
  linkedin: '',
  behance: '',
  resumeUrl: '',
  yearsExperience: '',
  noticePeriod: '',
  currentRole: '',
  currentSalary: '',
  expectedCtc: '',
  coreSkills: '',
  whyJoin: '',
  projectLinks: '',
  coverNote: '',
};

function readDraft(): CareersApplyDraft | null {
  try {
    const raw = window.sessionStorage.getItem(DRAFT_STORAGE_KEY);
    if (!raw) return null;
    const parsed = JSON.parse(raw) as CareersApplyDraft;
    if (
      !parsed ||
      typeof parsed.step !== 'number' ||
      !parsed.values ||
      !Array.isArray(parsed.completedSteps)
    ) {
      return null;
    }
    return parsed;
  } catch {
    return null;
  }
}

function writeDraft(draft: CareersApplyDraft): void {
  try {
    window.sessionStorage.setItem(DRAFT_STORAGE_KEY, JSON.stringify(draft));
  } catch {
    // Private mode / quota — ignore
  }
}

function clearDraft(): void {
  try {
    window.sessionStorage.removeItem(DRAFT_STORAGE_KEY);
  } catch {
    // ignore
  }
}

/**
 * Multi-step careers application — parity with bitcraftly.com/careers/apply
 * (pill tabs, progress bar, slide panel animation).
 */
export function CareersApplyWizard() {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const roleParam = searchParams.get('role');
  const initialRole =
    roleParam && roleParam !== 'general'
      ? (getCareerRoleBySlug(roleParam)?.slug ?? 'general')
      : 'general';

  const [step, setStep] = useState(1);
  const [direction, setDirection] = useState<'forward' | 'back'>('forward');
  const [completedSteps, setCompletedSteps] = useState<ReadonlySet<number>>(() => new Set());
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [submitted, setSubmitted] = useState(false);
  const [draftReady, setDraftReady] = useState(false);
  const stepPill = useSlidingPillIndicator(String(step));

  const {
    register,
    handleSubmit,
    trigger,
    getValues,
    reset,
    watch,
    formState: { errors, isSubmitting },
  } = useForm<ApplyValues>({
    resolver: zodResolver(applySchema),
    defaultValues: {
      ...EMPTY_VALUES,
      roleSlug: initialRole,
    },
    mode: 'onTouched',
  });

  useEffect(() => {
    const draft = readDraft();
    if (draft) {
      const mergedRole =
        roleParam && roleParam !== 'general'
          ? (getCareerRoleBySlug(roleParam)?.slug ?? draft.values.roleSlug)
          : draft.values.roleSlug;
      reset({ ...EMPTY_VALUES, ...draft.values, roleSlug: mergedRole });
      setStep(Math.min(Math.max(draft.step, 1), 5));
      setCompletedSteps(new Set(draft.completedSteps.filter((id) => id >= 1 && id <= 5)));
    }
    setDraftReady(true);
  }, [reset, roleParam]);

  const values = watch();
  const selectedTitle = useMemo(() => {
    if (values.roleSlug === 'general') return 'General application';
    return (
      CAREER_ROLES.find((role) => role.slug === values.roleSlug)?.title ?? 'General application'
    );
  }, [values.roleSlug]);

  const progressPct = (step / STEPS.length) * 100;
  const currentStepMeta = STEPS[step - 1];

  function persistDraft(nextStep: number, nextCompleted: ReadonlySet<number>): void {
    writeDraft({
      step: nextStep,
      completedSteps: [...nextCompleted],
      values: getValues(),
    });
  }

  async function goNext() {
    setSubmitError(null);
    if (step === 1) {
      const ok = await trigger(['roleSlug', 'fullName', 'email', 'phone', 'location']);
      if (!ok) return;
    }
    if (step === 2) {
      const ok = await trigger(['portfolio', 'github', 'linkedin', 'behance', 'resumeUrl']);
      if (!ok) return;
      const current = getValues();
      if (
        !current.portfolio &&
        !current.github &&
        !current.linkedin &&
        !current.behance &&
        !current.resumeUrl
      ) {
        setSubmitError('Add at least one link: resume, portfolio, or profile.');
        return;
      }
    }
    if (step === 3) {
      const ok = await trigger([
        'yearsExperience',
        'noticePeriod',
        'currentRole',
        'currentSalary',
        'expectedCtc',
        'coreSkills',
      ]);
      if (!ok) return;
    }
    if (step === 4) {
      const ok = await trigger(['whyJoin', 'projectLinks', 'coverNote']);
      if (!ok) return;
    }

    const nextCompleted = new Set(completedSteps);
    nextCompleted.add(step);
    const nextStep = Math.min(step + 1, 5);
    setDirection('forward');
    setCompletedSteps(nextCompleted);
    setStep(nextStep);
    persistDraft(nextStep, nextCompleted);
  }

  function goBack() {
    const nextStep = Math.max(step - 1, 1);
    setDirection('back');
    setStep(nextStep);
    persistDraft(nextStep, completedSteps);
  }

  async function onSubmit(formValues: ApplyValues) {
    setSubmitError(null);
    const roleTitle =
      formValues.roleSlug === 'general'
        ? 'General application'
        : (CAREER_ROLES.find((role) => role.slug === formValues.roleSlug)?.title ??
          'General application');

    const result = await submitLeadFromClient({
      leadType: 'contact',
      name: formValues.fullName,
      email: formValues.email,
      phone: formValues.phone,
      company: formValues.currentRole || undefined,
      intent: 'general',
      website: formValues.resumeUrl || formValues.portfolio || undefined,
      message: [
        `Careers application — ${roleTitle}`,
        `Location: ${formValues.location || '—'}`,
        `Experience: ${formValues.yearsExperience} · Notice: ${formValues.noticePeriod}`,
        `Current role: ${formValues.currentRole}`,
        formValues.currentSalary ? `Current salary: ${formValues.currentSalary}` : null,
        formValues.expectedCtc ? `Expected: ${formValues.expectedCtc}` : null,
        `Skills: ${formValues.coreSkills}`,
        formValues.whyJoin,
        formValues.projectLinks ? `Project links:\n${formValues.projectLinks}` : null,
        formValues.coverNote ? `Cover note:\n${formValues.coverNote}` : null,
        formValues.portfolio ? `Portfolio: ${formValues.portfolio}` : null,
        formValues.github ? `GitHub: ${formValues.github}` : null,
        formValues.linkedin ? `LinkedIn: ${formValues.linkedin}` : null,
        formValues.behance ? `Behance: ${formValues.behance}` : null,
        formValues.resumeUrl ? `Resume: ${formValues.resumeUrl}` : null,
      ]
        .filter(Boolean)
        .join('\n\n'),
      _honeypot: '',
      source: `careers-apply:${formValues.roleSlug}`,
      pagePath: pathname || '/careers/apply',
    });

    if (!result.ok) {
      setSubmitError(mapSubmitLeadFailureToUserMessage(result));
      return;
    }

    setCompletedSteps(new Set([1, 2, 3, 4, 5]));
    clearDraft();
    setSubmitted(true);
  }

  if (submitted) {
    return (
      <div className="careers-apply-wizard__success" role="status" aria-live="polite">
        <span className="careers-apply-wizard__success-icon" aria-hidden>
          <Icon name="check" size="sm" className="h-[18px] w-[18px]" />
        </span>
        <h2>Application received</h2>
        <p>
          Thanks — Sanjay reviews every application personally. We’ll reply by email if there’s a
          fit.
        </p>
        <div className="careers-apply-wizard__success-actions">
          <Link
            href={ROUTES.careers}
            className="careers-apply-wizard__nav-btn careers-apply-wizard__nav-btn--primary"
          >
            Back to careers
          </Link>
          <a
            href="mailto:hello@bitcraftly.com"
            className="careers-apply-wizard__nav-btn careers-apply-wizard__nav-btn--secondary"
          >
            hello@bitcraftly.com
          </a>
        </div>
      </div>
    );
  }

  return (
    <form
      className="careers-apply-wizard"
      noValidate
      onSubmit={handleSubmit(onSubmit)}
      aria-busy={!draftReady || undefined}
    >
      <div className="careers-apply-wizard__progress" aria-hidden>
        <div className="careers-apply-wizard__progress-fill" style={{ width: `${progressPct}%` }} />
      </div>

      <div ref={stepPill.containerRef} className="careers-apply-wizard__tabs sliding-pill-track">
        <SlidingPillIndicator style={stepPill.indicatorStyle} variant="accent" />
        <ol className="careers-apply-wizard__tabs-list" aria-label="Application steps">
          {STEPS.map((item) => {
            const isDone = completedSteps.has(item.id) || step > item.id;
            const isCurrent = step === item.id;
            return (
              <li key={item.id}>
                <span
                  ref={stepPill.itemRef(String(item.id))}
                  className={cn(
                    'careers-apply-wizard__tab relative z-[1]',
                    isCurrent && 'careers-apply-wizard__tab--active',
                    isDone && !isCurrent && 'careers-apply-wizard__tab--done',
                  )}
                  aria-current={isCurrent ? 'step' : undefined}
                >
                  {item.title}
                  {isDone && !isCurrent ? <span className="sr-only"> (completed)</span> : null}
                </span>
              </li>
            );
          })}
        </ol>
      </div>

      {submitError ? (
        <p className="careers-apply__error" role="alert">
          {submitError}
        </p>
      ) : null}

      <div
        key={`${step}-${direction}`}
        className={cn(
          'careers-apply-wizard__panel',
          direction === 'forward'
            ? 'careers-apply-wizard__panel--forward'
            : 'careers-apply-wizard__panel--back',
        )}
      >
        {currentStepMeta ? (
          <div className="careers-apply-wizard__panel-head">
            <div className="careers-apply-wizard__panel-title-row">
              <span className="careers-apply-wizard__panel-icon" aria-hidden>
                <Icon name={currentStepMeta.icon} size="sm" className="h-[18px] w-[18px]" />
              </span>
              <h2 className="careers-apply-wizard__panel-title">{currentStepMeta.title}</h2>
            </div>
            <p className="careers-apply-wizard__panel-hint">{currentStepMeta.hint}</p>
          </div>
        ) : null}

        {step === 1 ? (
          <div className="careers-apply__grid">
            <div className="careers-apply__field careers-apply__field--full">
              <Label htmlFor="careers-role" required>
                Role
              </Label>
              <select id="careers-role" {...register('roleSlug')}>
                <option value="general">General application</option>
                {CAREER_ROLES.map((role) => (
                  <option key={role.slug} value={role.slug}>
                    {role.title}
                  </option>
                ))}
              </select>
              {errors.roleSlug ? (
                <p className="careers-apply__error" role="alert">
                  {errors.roleSlug.message}
                </p>
              ) : null}
            </div>
            <div className="careers-apply__field">
              <Label htmlFor="careers-name" required>
                Full name
              </Label>
              <input id="careers-name" autoComplete="name" {...register('fullName')} />
              {errors.fullName ? (
                <p className="careers-apply__error" role="alert">
                  {errors.fullName.message}
                </p>
              ) : null}
            </div>
            <div className="careers-apply__field">
              <Label htmlFor="careers-email" required>
                Email
              </Label>
              <input id="careers-email" type="email" autoComplete="email" {...register('email')} />
              {errors.email ? (
                <p className="careers-apply__error" role="alert">
                  {errors.email.message}
                </p>
              ) : null}
            </div>
            <div className="careers-apply__field">
              <Label htmlFor="careers-phone" required>
                Phone (10 digits)
              </Label>
              <input
                id="careers-phone"
                type="tel"
                inputMode="numeric"
                autoComplete="tel"
                maxLength={10}
                {...register('phone')}
              />
              {errors.phone ? (
                <p className="careers-apply__error" role="alert">
                  {errors.phone.message}
                </p>
              ) : null}
            </div>
            <div className="careers-apply__field">
              <Label htmlFor="careers-location">Location</Label>
              <input
                id="careers-location"
                autoComplete="address-level2"
                placeholder="City / remote"
                {...register('location')}
              />
            </div>
          </div>
        ) : null}

        {step === 2 ? (
          <div className="careers-apply__grid">
            <div className="careers-apply__field careers-apply__field--full">
              <Label htmlFor="careers-resume">Resume URL</Label>
              <input
                id="careers-resume"
                type="url"
                placeholder="https://"
                {...register('resumeUrl')}
              />
              {errors.resumeUrl ? (
                <p className="careers-apply__error" role="alert">
                  {errors.resumeUrl.message}
                </p>
              ) : null}
            </div>
            <div className="careers-apply__field">
              <Label htmlFor="careers-portfolio">Portfolio</Label>
              <input
                id="careers-portfolio"
                type="url"
                placeholder="https://"
                {...register('portfolio')}
              />
              {errors.portfolio ? (
                <p className="careers-apply__error" role="alert">
                  {errors.portfolio.message}
                </p>
              ) : null}
            </div>
            <div className="careers-apply__field">
              <Label htmlFor="careers-github">GitHub</Label>
              <input
                id="careers-github"
                type="url"
                placeholder="https://github.com/…"
                {...register('github')}
              />
              {errors.github ? (
                <p className="careers-apply__error" role="alert">
                  {errors.github.message}
                </p>
              ) : null}
            </div>
            <div className="careers-apply__field">
              <Label htmlFor="careers-linkedin">LinkedIn</Label>
              <input
                id="careers-linkedin"
                type="url"
                placeholder="https://linkedin.com/in/…"
                {...register('linkedin')}
              />
              {errors.linkedin ? (
                <p className="careers-apply__error" role="alert">
                  {errors.linkedin.message}
                </p>
              ) : null}
            </div>
            <div className="careers-apply__field">
              <Label htmlFor="careers-behance">Behance / Dribbble</Label>
              <input
                id="careers-behance"
                type="url"
                placeholder="https://"
                {...register('behance')}
              />
              {errors.behance ? (
                <p className="careers-apply__error" role="alert">
                  {errors.behance.message}
                </p>
              ) : null}
            </div>
          </div>
        ) : null}

        {step === 3 ? (
          <div className="careers-apply__grid">
            <div className="careers-apply__field">
              <Label htmlFor="careers-years" required>
                Years of experience
              </Label>
              <select id="careers-years" {...register('yearsExperience')}>
                <option value="">Select…</option>
                {EXPERIENCE_OPTIONS.map((option) => (
                  <option key={option} value={option}>
                    {option}
                  </option>
                ))}
              </select>
              {errors.yearsExperience ? (
                <p className="careers-apply__error" role="alert">
                  {errors.yearsExperience.message}
                </p>
              ) : null}
            </div>
            <div className="careers-apply__field">
              <Label htmlFor="careers-notice" required>
                Notice period
              </Label>
              <select id="careers-notice" {...register('noticePeriod')}>
                <option value="">Select…</option>
                {NOTICE_OPTIONS.map((option) => (
                  <option key={option} value={option}>
                    {option}
                  </option>
                ))}
              </select>
              {errors.noticePeriod ? (
                <p className="careers-apply__error" role="alert">
                  {errors.noticePeriod.message}
                </p>
              ) : null}
            </div>
            <div className="careers-apply__field careers-apply__field--full">
              <Label htmlFor="careers-current-role" required>
                Current role
              </Label>
              <input
                id="careers-current-role"
                placeholder="e.g. Frontend Engineer at …"
                {...register('currentRole')}
              />
              {errors.currentRole ? (
                <p className="careers-apply__error" role="alert">
                  {errors.currentRole.message}
                </p>
              ) : null}
            </div>
            <div className="careers-apply__field">
              <Label htmlFor="careers-current-salary">Current salary (optional)</Label>
              <input
                id="careers-current-salary"
                placeholder="₹ LPA"
                {...register('currentSalary')}
              />
            </div>
            <div className="careers-apply__field">
              <Label htmlFor="careers-expected">Expected salary (optional)</Label>
              <input id="careers-expected" placeholder="₹ LPA" {...register('expectedCtc')} />
            </div>
            <div className="careers-apply__field careers-apply__field--full">
              <Label htmlFor="careers-skills" required>
                Core skills
              </Label>
              <input
                id="careers-skills"
                placeholder="React, TypeScript, Next.js…"
                {...register('coreSkills')}
              />
              {errors.coreSkills ? (
                <p className="careers-apply__error" role="alert">
                  {errors.coreSkills.message}
                </p>
              ) : null}
            </div>
          </div>
        ) : null}

        {step === 4 ? (
          <div className="careers-apply__grid">
            <div className="careers-apply__field careers-apply__field--full">
              <Label htmlFor="careers-why" required>
                Why do you want to join Bitcraftly?
              </Label>
              <textarea
                id="careers-why"
                rows={5}
                placeholder="Tell us about fit, craft, and how you ship."
                {...register('whyJoin')}
              />
              {errors.whyJoin ? (
                <p className="careers-apply__error" role="alert">
                  {errors.whyJoin.message}
                </p>
              ) : null}
            </div>
            <div className="careers-apply__field careers-apply__field--full">
              <Label htmlFor="careers-projects">Project links (one per line)</Label>
              <textarea
                id="careers-projects"
                rows={4}
                placeholder="https://…"
                {...register('projectLinks')}
              />
            </div>
            <div className="careers-apply__field careers-apply__field--full">
              <Label htmlFor="careers-cover">Additional cover note (optional)</Label>
              <textarea id="careers-cover" rows={3} {...register('coverNote')} />
            </div>
          </div>
        ) : null}

        {step === 5 ? (
          <div className="careers-apply-wizard__review">
            <dl>
              <div>
                <dt>Role</dt>
                <dd>{selectedTitle}</dd>
              </div>
              <div>
                <dt>Name</dt>
                <dd>{values.fullName}</dd>
              </div>
              <div>
                <dt>Email</dt>
                <dd>{values.email}</dd>
              </div>
              <div>
                <dt>Phone</dt>
                <dd>{values.phone}</dd>
              </div>
              {values.location ? (
                <div>
                  <dt>Location</dt>
                  <dd>{values.location}</dd>
                </div>
              ) : null}
              <div>
                <dt>Experience</dt>
                <dd>
                  {values.yearsExperience} · Notice {values.noticePeriod}
                </dd>
              </div>
              <div>
                <dt>Current role</dt>
                <dd>{values.currentRole}</dd>
              </div>
              <div>
                <dt>Skills</dt>
                <dd>{values.coreSkills}</dd>
              </div>
              <div>
                <dt>Why Bitcraftly</dt>
                <dd>{values.whyJoin}</dd>
              </div>
            </dl>
          </div>
        ) : null}
      </div>

      <div className="careers-apply-wizard__nav">
        {step > 1 ? (
          <Button
            type="button"
            variant="outline"
            size="sm"
            className="careers-apply-wizard__nav-btn careers-apply-wizard__nav-btn--secondary"
            onClick={goBack}
            iconLeft={
              <Icon
                name="arrow-right"
                size="sm"
                aria-hidden
                className="h-[14px] w-[14px] rotate-180"
              />
            }
          >
            Back
          </Button>
        ) : (
          <Link
            href={ROUTES.careers}
            className="careers-apply-wizard__nav-btn careers-apply-wizard__nav-btn--secondary"
          >
            Careers
          </Link>
        )}

        {step < 5 ? (
          <Button
            type="button"
            variant="primary"
            size="sm"
            className="careers-apply-wizard__nav-btn careers-apply-wizard__nav-btn--primary"
            onClick={() => void goNext()}
            iconRight={
              <Icon name="arrow-right" size="sm" aria-hidden className="h-[14px] w-[14px]" />
            }
          >
            Continue
          </Button>
        ) : (
          <Button
            type="submit"
            variant="primary"
            size="sm"
            className="careers-apply-wizard__nav-btn careers-apply-wizard__nav-btn--primary"
            loading={isSubmitting}
            disabled={isSubmitting}
          >
            Submit application
          </Button>
        )}
      </div>
    </form>
  );
}
