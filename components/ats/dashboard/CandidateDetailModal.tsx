"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Calendar,
  Download,
  ExternalLink,
  FileText,
  Star,
  X,
} from "lucide-react";
import { showFeedbackAlert } from "@/lib/sweetAlert";

import AtsBadge from "@/components/ats/AtsBadge";
import {
  downloadJobApplicationResume,
  useUpdateJobApplicationMetaMutation,
  useUpdateJobApplicationNotesMutation,
  type JobApplication,
} from "@/hooks/useDashboardQueries";
import { ATS_PIPELINE_STAGES, computeMatchScore, normalizeStage, parseSkillTags } from "@/lib/ats/stages";

type CandidateDetailModalProps = {
  candidate: JobApplication | null;
  onClose: () => void;
};

export default function CandidateDetailModal({ candidate, onClose }: CandidateDetailModalProps) {
  const [notes, setNotes] = useState("");
  const [rating, setRating] = useState(0);
  const updateMeta = useUpdateJobApplicationMetaMutation();
  const updateNotes = useUpdateJobApplicationNotesMutation();

  useEffect(() => {
    if (candidate) {
      setNotes(candidate.notes ?? "");
      setRating(Math.min(5, Math.max(0, Math.round(computeMatchScore(candidate.skills, candidate.role_applied) / 20))));
    }
  }, [candidate]);

  const match = candidate ? computeMatchScore(candidate.skills, candidate.role_applied) : 0;
  const skills = parseSkillTags(candidate?.skills);
  const stage = candidate ? normalizeStage(candidate.stage) : "applied";

  return (
    <AnimatePresence>
      {candidate ? (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-black/40 backdrop-blur-sm"
            onClick={onClose}
            aria-hidden
          />
          <motion.div
            role="dialog"
            aria-modal
            aria-labelledby="candidate-modal-title"
            initial={{ opacity: 0, x: 24 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 24 }}
            className="fixed inset-y-0 right-0 z-50 flex w-full max-w-lg flex-col border-l border-[#e2e8f0] bg-white shadow-2xl dark:border-dark-border-primary dark:bg-dark-bg-card"
          >
            <div className="flex items-start justify-between border-b border-[#f1f5f9] p-5 dark:border-dark-border-primary">
              <div>
                <p className="text-xs font-semibold uppercase tracking-wide text-indigo-600">Candidate profile</p>
                <h2 id="candidate-modal-title" className="mt-1 text-xl font-bold text-[#0f172a] dark:text-dark-text-primary">
                  {candidate.full_name}
                </h2>
                <p className="text-sm text-[#64748b]">{candidate.role_applied}</p>
              </div>
              <button
                type="button"
                onClick={onClose}
                className="rounded-lg p-2 text-[#64748b] hover:bg-[#f1f5f9] dark:hover:bg-dark-bg-secondary"
                aria-label="Close"
              >
                <X className="size-5" />
              </button>
            </div>

            <div className="flex-1 overflow-y-auto p-5 space-y-6">
              <div className="flex flex-wrap gap-2">
                <AtsBadge variant="purple">AI match {match}%</AtsBadge>
                <AtsBadge variant="muted">#{candidate.id}</AtsBadge>
                <AtsBadge variant="muted">{new Date(candidate.created_at).toLocaleDateString("en-IN")}</AtsBadge>
              </div>

              <div>
                <label className="text-xs font-semibold uppercase text-[#94a3b8]">Pipeline stage</label>
                <select
                  value={stage}
                  onChange={(e) => {
                    updateMeta.mutate(
                      { applicationId: candidate.id, stage: e.target.value },
                      { onSuccess: () => showFeedbackAlert("success", "Stage updated") },
                    );
                  }}
                  className="mt-1 h-10 w-full rounded-xl border border-[#e2e8f0] bg-white px-3 text-sm dark:border-dark-border-primary dark:bg-dark-bg-secondary"
                >
                  {ATS_PIPELINE_STAGES.map((s) => (
                    <option key={s.id} value={s.id}>
                      {s.label}
                    </option>
                  ))}
                </select>
              </div>

              <div className="rounded-2xl border border-[#e2e8f0] bg-[#f8fafc] p-4 dark:border-dark-border-primary dark:bg-dark-bg-secondary">
                <div className="flex items-center gap-2 text-sm font-semibold text-[#0f172a] dark:text-dark-text-primary">
                  <FileText className="size-4 text-indigo-600" aria-hidden />
                  Resume
                </div>
                <p className="mt-1 text-xs text-[#64748b]">{candidate.resume_filename}</p>
                <button
                  type="button"
                  onClick={() =>
                    downloadJobApplicationResume(candidate.id, candidate.resume_filename).catch(() =>
                      showFeedbackAlert("error", "Download failed"),
                    )
                  }
                  className="mt-3 inline-flex items-center gap-2 text-sm font-semibold text-indigo-600"
                >
                  <Download className="size-4" aria-hidden />
                  Download resume
                </button>
                <p className="mt-2 text-[10px] text-[#94a3b8]">Preview opens in browser for PDF resumes after download.</p>
              </div>

              {skills.length > 0 ? (
                <div>
                  <p className="text-xs font-semibold uppercase text-[#94a3b8]">Skills</p>
                  <div className="mt-2 flex flex-wrap gap-1.5">
                    {skills.map((s) => (
                      <span key={s} className="rounded-md bg-indigo-50 px-2 py-0.5 text-xs font-medium text-indigo-700 dark:bg-indigo-500/15 dark:text-indigo-300">
                        {s}
                      </span>
                    ))}
                  </div>
                </div>
              ) : null}

              <dl className="grid grid-cols-2 gap-3 text-sm">
                <div>
                  <dt className="text-xs text-[#94a3b8]">Email</dt>
                  <dd className="font-medium">{candidate.email}</dd>
                </div>
                <div>
                  <dt className="text-xs text-[#94a3b8]">Phone</dt>
                  <dd>{candidate.phone}</dd>
                </div>
                <div>
                  <dt className="text-xs text-[#94a3b8]">Experience</dt>
                  <dd>{candidate.experience_years ?? "—"}</dd>
                </div>
                <div>
                  <dt className="text-xs text-[#94a3b8]">Notice</dt>
                  <dd>{candidate.notice_period ?? "—"}</dd>
                </div>
                <div>
                  <dt className="text-xs text-[#94a3b8]">Expected CTC</dt>
                  <dd>{candidate.expected_ctc ?? "—"}</dd>
                </div>
                <div>
                  <dt className="text-xs text-[#94a3b8]">Current role</dt>
                  <dd>{candidate.current_role ?? "—"}</dd>
                </div>
              </dl>

              <div className="flex flex-wrap gap-3">
                {candidate.portfolio_url ? (
                  <a href={candidate.portfolio_url} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1 text-sm font-semibold text-indigo-600">
                    Portfolio <ExternalLink className="size-3.5" />
                  </a>
                ) : null}
                {candidate.github_url ? (
                  <a href={candidate.github_url} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1 text-sm font-semibold text-indigo-600">
                    GitHub <ExternalLink className="size-3.5" />
                  </a>
                ) : null}
                {candidate.linkedin_url ? (
                  <a href={candidate.linkedin_url} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1 text-sm font-semibold text-indigo-600">
                    LinkedIn <ExternalLink className="size-3.5" />
                  </a>
                ) : null}
              </div>

              {candidate.cover_letter ? (
                <div>
                  <p className="text-xs font-semibold uppercase text-[#94a3b8]">Cover note</p>
                  <p className="mt-2 text-sm leading-relaxed text-[#64748b] whitespace-pre-wrap">{candidate.cover_letter}</p>
                </div>
              ) : null}

              <div>
                <p className="flex items-center gap-2 text-xs font-semibold uppercase text-[#94a3b8]">
                  <Star className="size-3.5" aria-hidden />
                  Rating (internal)
                </p>
                <div className="mt-2 flex gap-1">
                  {[1, 2, 3, 4, 5].map((n) => (
                    <button
                      key={n}
                      type="button"
                      onClick={() => setRating(n)}
                      className={`size-8 rounded-lg text-sm font-bold ${n <= rating ? "bg-amber-100 text-amber-700" : "bg-[#f1f5f9] text-[#94a3b8]"}`}
                    >
                      {n}
                    </button>
                  ))}
                </div>
              </div>

              <div className="rounded-2xl border border-dashed border-[#e2e8f0] p-4 dark:border-dark-border-primary">
                <p className="flex items-center gap-2 text-xs font-semibold uppercase text-[#94a3b8]">
                  <Calendar className="size-3.5" aria-hidden />
                  Interview schedule
                </p>
                <p className="mt-2 text-xs text-[#64748b]">Book intro or technical calls — calendar integration coming soon.</p>
                <button type="button" className="mt-3 rounded-lg border border-[#e2e8f0] px-3 py-1.5 text-xs font-semibold text-[#64748b]">
                  Schedule interview
                </button>
              </div>

              <div>
                <label className="text-xs font-semibold uppercase text-[#94a3b8]">Team notes</label>
                <textarea
                  className="mt-1 min-h-[100px] w-full rounded-xl border border-[#e2e8f0] bg-white p-3 text-sm dark:border-dark-border-primary dark:bg-dark-bg-secondary"
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  placeholder="Screening notes, interview feedback, trial task brief…"
                />
              </div>
            </div>

            <div className="flex gap-2 border-t border-[#f1f5f9] p-5 dark:border-dark-border-primary">
              <button
                type="button"
                onClick={() =>
                  updateNotes.mutate(
                    { applicationId: candidate.id, notes },
                    { onSuccess: () => showFeedbackAlert("success", "Notes saved") },
                  )
                }
                className="flex-1 rounded-xl bg-[#0f172a] py-2.5 text-sm font-semibold text-white dark:bg-white dark:text-black"
              >
                Save notes
              </button>
              <button
                type="button"
                onClick={() =>
                  updateMeta.mutate(
                    { applicationId: candidate.id, stage: "rejected" },
                    { onSuccess: () => showFeedbackAlert("success", "Marked rejected") },
                  )
                }
                className="rounded-xl border border-red-200 px-4 py-2.5 text-sm font-semibold text-red-600"
              >
                Reject
              </button>
            </div>
          </motion.div>
        </>
      ) : null}
    </AnimatePresence>
  );
}
