/** ATS pipeline stages — maps legacy backend values for compatibility */

export const ATS_PIPELINE_STAGES = [
  { id: "applied", label: "Applied", color: "#6366f1", legacy: ["new", "applied"] },
  { id: "screening", label: "Screening", color: "#8b5cf6", legacy: ["screening"] },
  { id: "interview", label: "Interview", color: "#0ea5e9", legacy: ["interview"] },
  { id: "trial_task", label: "Trial Task", color: "#f59e0b", legacy: ["trial_task"] },
  { id: "final_round", label: "Final Round", color: "#14b8a6", legacy: ["final_round", "offer"] },
  { id: "hired", label: "Hired", color: "#10b981", legacy: ["hired", "closed"] },
  { id: "rejected", label: "Rejected", color: "#ef4444", legacy: ["rejected"] },
] as const;

export type AtsStageId = (typeof ATS_PIPELINE_STAGES)[number]["id"];

export function normalizeStage(stage: string): AtsStageId {
  const found = ATS_PIPELINE_STAGES.find((s) => s.id === stage || (s.legacy as readonly string[]).includes(stage));
  return found?.id ?? "applied";
}

export function stageLabel(stage: string): string {
  return ATS_PIPELINE_STAGES.find((s) => s.id === normalizeStage(stage))?.label ?? stage;
}

/** Heuristic AI match % from skills text (demo — replace with ML later) */
export function computeMatchScore(skills: string | null | undefined, role: string): number {
  const text = `${skills ?? ""} ${role}`.toLowerCase();
  const keywords = ["react", "next", "typescript", "figma", "tailwind", "python", "ai", "node"];
  const hits = keywords.filter((k) => text.includes(k)).length;
  const base = 52 + hits * 7;
  return Math.min(96, Math.max(48, base + (text.length % 11)));
}

export function parseSkillTags(skills: string | null | undefined): string[] {
  if (!skills?.trim()) return [];
  return skills
    .split(/[,;|/]+/)
    .map((s) => s.trim())
    .filter(Boolean)
    .slice(0, 12);
}
