"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";

import CareersRolesFilterPanel, {
  DEPARTMENT_TABS,
  LEVEL_TABS,
} from "@/components/ats/CareersRolesFilterPanel";
import JobRoleCard from "@/components/ats/JobRoleCard";
import { useActiveJobRolesQuery } from "@/hooks/useJobRoles";
import {
  CAREERS_SHOWCASE_WRAPPER,
  PS_BTN_PRIMARY,
  PS_EYEBROW,
  PS_HEADING,
  PS_SECTION,
} from "@/lib/ats/careersShowcaseTheme";
import { type JobDepartment, type JobOpening } from "@/lib/ats/jobs";
import { CONTAINER } from "@/lib/constants";

function countByDepartment(openings: JobOpening[], dept: JobDepartment | "all") {
  if (dept === "all") return openings.length;
  return openings.filter((j) => j.department === dept).length;
}

function countByLevel(openings: JobOpening[], level: string) {
  if (level === "all") return openings.length;
  return openings.filter((j) => j.level === level).length;
}

export default function OpenPositions() {
  const rolesQuery = useActiveJobRolesQuery();
  const openings = rolesQuery.data ?? [];
  const [department, setDepartment] = useState<JobDepartment | "all">("all");
  const [search, setSearch] = useState("");
  const [level, setLevel] = useState<string>("all");

  const searchFiltered = useMemo(() => {
    const q = search.trim().toLowerCase();
    if (!q) return openings;
    return openings.filter(
      (j) =>
        j.title.toLowerCase().includes(q) ||
        j.skills.some((s) => s.toLowerCase().includes(q)) ||
        j.description.toLowerCase().includes(q),
    );
  }, [openings, search]);

  const deptCounts = useMemo(
    () =>
      Object.fromEntries(
        DEPARTMENT_TABS.map((t) => [t.id, countByDepartment(searchFiltered, t.id)]),
      ) as Record<(typeof DEPARTMENT_TABS)[number]["id"], number>,
    [searchFiltered],
  );

  const levelCounts = useMemo(() => {
    const base =
      department === "all"
        ? searchFiltered
        : searchFiltered.filter((j) => j.department === department);
    return Object.fromEntries(LEVEL_TABS.map((t) => [t.id, countByLevel(base, t.id)])) as Record<
      (typeof LEVEL_TABS)[number]["id"],
      number
    >;
  }, [searchFiltered, department]);

  const filtered = useMemo(() => {
    return searchFiltered.filter((j) => {
      if (department !== "all" && j.department !== department) return false;
      if (level !== "all" && j.level !== level) return false;
      return true;
    });
  }, [searchFiltered, department, level]);

  return (
    <section id="open-positions" className={`${CAREERS_SHOWCASE_WRAPPER} ${PS_SECTION} py-10 md:py-14`}>
      <div className={`${CONTAINER} relative`}>
        <div className="pointer-events-none absolute inset-0 -z-10 overflow-hidden" aria-hidden>
          <div className="absolute -right-24 -top-24 size-72 rounded-full bg-[#9b59b6]/[0.06] blur-3xl" />
          <div className="absolute -bottom-32 -left-24 size-80 rounded-full bg-[#3498db]/[0.05] blur-3xl" />
        </div>

        <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
          <div>
            <p className={PS_EYEBROW}>Open positions</p>
            <h2 className={`${PS_HEADING} mt-2 text-3xl md:text-4xl`}>Roles we are hiring for</h2>
            <p className="mt-3 max-w-xl text-sm leading-relaxed text-[#7f8c8d]">
              Engineering, design, and product — filter by team, search skills, and apply in minutes.
            </p>
          </div>
          <Link href="/careers/apply" className={PS_BTN_PRIMARY}>
            General application
          </Link>
        </div>

        <div className="relative mt-8 md:mt-10">
          <CareersRolesFilterPanel
            search={search}
            onSearchChange={setSearch}
            department={department}
            onDepartmentChange={setDepartment}
            level={level}
            onLevelChange={setLevel}
            deptCounts={deptCounts}
            levelCounts={levelCounts}
            resultCount={filtered.length}
            totalCount={openings.length}
          />
        </div>

        <div className="relative mt-8">
          {rolesQuery.isLoading && openings.length === 0 ? (
            <div className="grid items-stretch gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {[1, 2, 3].map((i) => (
                <div key={i} className="h-56 animate-pulse rounded-[20px] border border-[#e8ecef] bg-white" />
              ))}
            </div>
          ) : null}

          {!rolesQuery.isLoading && filtered.length === 0 ? (
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="rounded-[20px] border border-dashed border-[#bdc3c7]/60 bg-white px-6 py-10 text-center text-sm text-[#7f8c8d]"
            >
              No roles match your filters. Try a general application — we keep strong profiles on file.
            </motion.p>
          ) : (
            <motion.div layout className="grid items-stretch gap-5 sm:grid-cols-2 lg:grid-cols-3">
              <AnimatePresence mode="popLayout">
                {filtered.map((job, index) => (
                  <JobRoleCard key={job.id} job={job} index={index} />
                ))}
              </AnimatePresence>
            </motion.div>
          )}
        </div>
      </div>
    </section>
  );
}
