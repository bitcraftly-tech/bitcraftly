"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import {
  SlidingPillIndicator,
  useSlidingPillIndicator,
} from "@/components/patterns/sliding-pill";
import { Icon, type IconName } from "@/components/ui/icon";
import { cn } from "@/lib/cn";
import {
  CAREER_ROLES,
  getCareersApplyHref,
  type CareerLevel,
  type CareerTeam,
} from "./careers.content";

const TEAM_FILTERS: readonly {
  id: "all" | CareerTeam;
  label: string;
  short: string;
  icon: IconName;
}[] = [
  { id: "all", label: "All teams", short: "All", icon: "layout-grid" },
  { id: "engineering", label: "Engineering", short: "Eng", icon: "code" },
  { id: "design", label: "Design", short: "Design", icon: "sparkles" },
  { id: "product", label: "Product", short: "Product", icon: "rocket" },
];

const LEVEL_FILTERS: readonly {
  id: "all" | CareerLevel;
  label: string;
  short: string;
}[] = [
  { id: "all", label: "All levels", short: "All" },
  { id: "mid", label: "Mid", short: "Mid" },
  { id: "senior", label: "Senior", short: "Sr" },
  { id: "lead", label: "Lead", short: "Lead" },
];

function countTeam(id: "all" | CareerTeam): number {
  if (id === "all") return CAREER_ROLES.length;
  return CAREER_ROLES.filter((role) => role.team === id).length;
}

function countLevel(id: "all" | CareerLevel): number {
  if (id === "all") return CAREER_ROLES.length;
  return CAREER_ROLES.filter((role) => role.level === id).length;
}

const focusRing = cn(
  "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary",
  "focus-visible:ring-offset-2 focus-visible:ring-offset-background",
);

/**
 * Roles browser — empty-state message when hiring is paused.
 */
export function CareersRolesBoard() {
  const [team, setTeam] = useState<"all" | CareerTeam>("all");
  const [level, setLevel] = useState<"all" | CareerLevel>("all");
  const [query, setQuery] = useState("");
  const teamPill = useSlidingPillIndicator(team);
  const levelPill = useSlidingPillIndicator(level);
  const hasOpenings = CAREER_ROLES.length > 0;

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return CAREER_ROLES.filter((role) => {
      if (team !== "all" && role.team !== team) return false;
      if (level !== "all" && role.level !== level) return false;
      if (!q) return true;
      const haystack = [
        role.title,
        role.summary,
        role.skills.join(" "),
        role.location,
      ]
        .join(" ")
        .toLowerCase();
      return haystack.includes(q);
    });
  }, [team, level, query]);

  if (!hasOpenings) {
    return (
      <div className="careers-roles-empty" role="status">
        <div className="careers-roles-empty__head">
          <span className="careers-roles-empty__icon" aria-hidden>
            <Icon name="calendar" size="sm" className="h-[18px] w-[18px]" />
          </span>
          <h3 className="careers-roles-empty__title">
            No open positions right now
          </h3>
        </div>
        <p className="careers-roles-empty__body">
          We are not actively hiring at the moment. You can still send a general
          application — we review every profile when roles reopen.
        </p>
        <Link
          href={getCareersApplyHref("general")}
          className={cn("careers-roles-empty__cta", focusRing)}
        >
          Send general application
          <Icon
            name="arrow-right"
            size="sm"
            aria-hidden
            className="h-[13px] w-[13px]"
          />
        </Link>
      </div>
    );
  }

  return (
    <div className="careers-roles">
      <div className="careers-roles__panel">
        <div className="careers-roles__panel-head">
          <div className="careers-roles__general">
            <Link
              href={getCareersApplyHref("general")}
              className={cn("careers-roles__general-btn", focusRing)}
            >
              General application
            </Link>
            <p className="careers-roles__count" aria-live="polite">
              <strong>{filtered.length}</strong> / {CAREER_ROLES.length} roles
            </p>
          </div>

          <label className="careers-roles__search">
            <span className="sr-only">Search roles</span>
            <Icon
              name="search"
              size="sm"
              aria-hidden
              className="h-[16px] w-[16px]"
            />
            <input
              type="search"
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              placeholder="Search skills or role"
            />
          </label>
        </div>

        <div className="careers-roles__filters-block">
          <p className="careers-roles__filters-label" id="careers-team-label">
            Team
          </p>
          <div
            ref={teamPill.containerRef}
            className="careers-roles__filters careers-roles__filters--pills sliding-pill-track"
            role="tablist"
            aria-labelledby="careers-team-label"
          >
            <SlidingPillIndicator
              style={teamPill.indicatorStyle}
              variant="accent"
            />
            {TEAM_FILTERS.map((item) => {
              const active = team === item.id;
              return (
                <button
                  key={item.id}
                  ref={teamPill.itemRef(item.id)}
                  type="button"
                  role="tab"
                  aria-selected={active}
                  className={cn(
                    "careers-roles__chip careers-roles__chip--pill",
                    active && "careers-roles__chip--active",
                    focusRing,
                  )}
                  onClick={() => setTeam(item.id)}
                >
                  <span className="careers-roles__chip-inner">
                    <Icon
                      name={item.icon}
                      size="sm"
                      aria-hidden
                      className="careers-roles__chip-icon h-[14px] w-[14px]"
                    />
                    <span className="careers-roles__chip-label">
                      {item.label}
                    </span>
                    <span className="careers-roles__chip-short">
                      {item.short}
                    </span>
                    <span className="careers-roles__chip-count">
                      {countTeam(item.id)}
                    </span>
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        <div className="careers-roles__filters-block careers-roles__filters-block--segment">
          <p className="careers-roles__filters-label" id="careers-level-label">
            Experience level
          </p>
          <div
            ref={levelPill.containerRef}
            className="careers-roles__filters careers-roles__filters--segment sliding-pill-track"
            role="tablist"
            aria-labelledby="careers-level-label"
          >
            <SlidingPillIndicator
              style={levelPill.indicatorStyle}
              variant="segment"
            />
            {LEVEL_FILTERS.map((item) => {
              const active = level === item.id;
              return (
                <button
                  key={item.id}
                  ref={levelPill.itemRef(item.id)}
                  type="button"
                  role="tab"
                  aria-selected={active}
                  className={cn(
                    "careers-roles__chip careers-roles__chip--segment",
                    active && "careers-roles__chip--segment-active",
                    focusRing,
                  )}
                  onClick={() => setLevel(item.id)}
                >
                  <span className="careers-roles__chip-inner">
                    <span className="careers-roles__chip-label">
                      {item.label}
                    </span>
                    <span className="careers-roles__chip-short">
                      {item.short}
                    </span>
                    <span className="careers-roles__chip-count">
                      {countLevel(item.id)}
                    </span>
                  </span>
                </button>
              );
            })}
          </div>
        </div>
      </div>

      <ul className="careers-roles__list">
        {filtered.map((role) => (
          <li key={role.slug} className="min-w-0">
            <article className="careers-roles__card">
              <div className="careers-roles__card-top">
                {role.featured ? (
                  <span className="careers-roles__tag">Featured role</span>
                ) : null}
                {role.badge ? (
                  <span className="careers-roles__tag careers-roles__tag--muted">
                    {role.badge}
                  </span>
                ) : null}
              </div>
              <h3 className="careers-roles__title">{role.title}</h3>
              <p className="careers-roles__summary">{role.summary}</p>
              <div className="careers-roles__meta-row">
                <span>{role.experience}</span>
                <span>{role.employment}</span>
                <span>{role.compensation}</span>
              </div>
              <ul className="careers-roles__skills">
                {role.skills.map((skill) => (
                  <li key={skill}>{skill}</li>
                ))}
              </ul>
              <div className="careers-roles__card-foot">
                <p className="careers-roles__location">{role.location}</p>
                <Link
                  href={getCareersApplyHref(role.slug)}
                  className={cn("careers-roles__apply", focusRing)}
                >
                  Apply now
                  <Icon
                    name="arrow-right"
                    size="sm"
                    aria-hidden
                    className="h-[13px] w-[13px]"
                  />
                </Link>
              </div>
            </article>
          </li>
        ))}
      </ul>

      {filtered.length === 0 ? (
        <p className="careers-roles__empty">
          No roles match these filters.{" "}
          <Link href={getCareersApplyHref("general")}>
            Send a general application
          </Link>
        </p>
      ) : null}
    </div>
  );
}
