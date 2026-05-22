"use client";

import { motion } from "framer-motion";
import { Briefcase, Clock, Star, Users } from "lucide-react";

import { computeMatchScore } from "@/lib/ats/stages";
import type { JobApplication } from "@/hooks/useDashboardQueries";

type AtsStatsRowProps = {
  applications: JobApplication[];
};

export default function AtsStatsRow({ applications }: AtsStatsRowProps) {
  const total = applications.length;
  const screening = applications.filter((a) => ["screening", "applied", "new"].includes(a.stage)).length;
  const interview = applications.filter((a) => ["interview", "trial_task", "final_round", "offer"].includes(a.stage)).length;
  const avgMatch =
    total > 0
      ? Math.round(
          applications.reduce((s, a) => s + computeMatchScore(a.skills, a.role_applied), 0) / total,
        )
      : 0;

  const stats = [
    { label: "Total candidates", value: total, icon: Users, color: "text-indigo-600" },
    { label: "In screening", value: screening, icon: Briefcase, color: "text-violet-600" },
    { label: "In interviews", value: interview, icon: Clock, color: "text-sky-600" },
    { label: "Avg AI match", value: `${avgMatch}%`, icon: Star, color: "text-amber-600" },
  ];

  return (
    <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
      {stats.map((s, i) => {
        const Icon = s.icon;
        return (
          <motion.div
            key={s.label}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.05 }}
            className="rounded-2xl border border-[#e2e8f0] bg-white p-5 shadow-sm dark:border-dark-border-primary dark:bg-dark-bg-card"
          >
            <div className="flex items-center justify-between">
              <p className="text-xs font-semibold uppercase tracking-wide text-[#94a3b8]">{s.label}</p>
              <Icon className={`size-4 ${s.color}`} aria-hidden />
            </div>
            <p className="mt-2 text-2xl font-bold text-[#0f172a] dark:text-dark-text-primary">{s.value}</p>
          </motion.div>
        );
      })}
    </div>
  );
}
