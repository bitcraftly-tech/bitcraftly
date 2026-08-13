'use client';

import Image from 'next/image';
import { ArrowRight, MapPin } from 'lucide-react';
import { useState } from 'react';

import DayalSectionLink from '@/components/dayal/DayalSectionLink';
import DayalReveal from '@/components/dayal/DayalReveal';
import { FUTURE_PROJECTS, ONGOING_PROJECTS, PAST_PROJECTS } from '@/lib/dayal/data';

const STATUS_STYLES: Record<string, string> = {
  Future: 'bg-[#0b1633]/92 text-white',
  Ongoing: 'bg-amber-700/92 text-white',
  Completed: 'bg-emerald-800/92 text-white',
};

type GridProject =
  | (typeof FUTURE_PROJECTS)[number]
  | (typeof ONGOING_PROJECTS)[number]
  | (typeof PAST_PROJECTS)[number];

function ProjectCard({
  project,
  featured = false,
}: {
  project: GridProject;
  featured?: boolean;
}) {
  const [loaded, setLoaded] = useState(false);

  return (
    <article
      className={`dayal-project-card group flex h-full flex-col overflow-hidden rounded-2xl bg-white shadow-[0_16px_40px_-28px_rgba(11,22,51,0.45)] ring-1 ring-[#0b1633]/8 transition duration-300 hover:-translate-y-1 hover:shadow-[0_24px_48px_-28px_rgba(11,22,51,0.5)] hover:ring-[#c8a46b]/45 ${
        featured ? 'dayal-project-card--featured' : ''
      }`}
    >
      <div
        className={`dayal-project-card__media dayal-media-skeleton relative overflow-hidden ${
          loaded ? 'is-loaded' : ''
        }`}
      >
        <div className="dayal-project-card__media-visual absolute inset-0">
          <Image
            src={project.image}
            alt={`${project.name} — ${project.location}`}
            fill
            className="object-cover object-center"
            sizes={
              featured
                ? '(max-width: 768px) 100vw, 50vw'
                : '(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw'
            }
            onLoad={() => setLoaded(true)}
          />
        </div>
        <span
          className={`absolute left-3 top-3 z-10 rounded-md px-2.5 py-1 text-[10px] font-bold uppercase tracking-wide shadow-sm ${
            STATUS_STYLES[project.status] ?? 'bg-[#0b1633] text-white'
          }`}
        >
          {project.status}
        </span>
      </div>

      <div className="flex flex-1 flex-col p-4 sm:p-5">
        <h3 className="dayal-serif text-lg font-semibold tracking-tight text-[#0b1633] sm:text-xl">
          {project.name}
        </h3>
        <p className="mt-1.5 flex items-center gap-1.5 text-xs font-medium text-[#5c6478] sm:text-sm">
          <MapPin className="h-3.5 w-3.5 shrink-0 text-[#c8a46b]" aria-hidden />
          {project.location}
        </p>
        <p className="mt-2 text-xs font-semibold uppercase tracking-[0.08em] text-[#c8a46b]">
          {project.tagline}
        </p>
        <p className="mt-2 flex-1 text-sm leading-relaxed text-[#5c6478]">{project.description}</p>
        <DayalSectionLink
          href="#contact"
          className="mt-4 inline-flex items-center gap-1.5 text-sm font-semibold text-[#0b1633] transition hover:text-[#c0392b]"
        >
          Enquire about {project.name}
          <ArrowRight className="h-3.5 w-3.5" aria-hidden />
        </DayalSectionLink>
      </div>
    </article>
  );
}

function ProjectGrid({
  projects,
  sectionId,
  eyebrow,
  title,
  subtitle,
  featured = false,
}: {
  projects: readonly GridProject[];
  sectionId: string;
  eyebrow: string;
  title: string;
  subtitle: string;
  featured?: boolean;
}) {
  const gridClass = featured
    ? 'mt-10 grid grid-cols-1 gap-5 sm:mt-12 sm:grid-cols-2 lg:gap-6'
    : 'mt-10 grid grid-cols-1 gap-5 sm:mt-12 sm:grid-cols-2 lg:grid-cols-4 lg:gap-5';

  return (
    <div id={sectionId} className="scroll-mt-28">
      <DayalReveal className="dayal-section__header dayal-section__header--center">
        <p className="dayal-eyebrow">{eyebrow}</p>
        <div className="dayal-gold-line mt-3" aria-hidden />
        <h2 className="dayal-section-title mt-4">{title}</h2>
        <p className="dayal-body mx-auto mt-4 max-w-2xl">{subtitle}</p>
      </DayalReveal>

      <div className={gridClass}>
        {projects.map((project, i) => (
          <DayalReveal key={project.id} delay={i * 0.06} className="min-w-0 h-full">
            <ProjectCard project={project} featured={featured} />
          </DayalReveal>
        ))}
      </div>
    </div>
  );
}

/**
 * Dayal project collections — equal media frames, hover zoom, premium cards.
 */
export default function DayalProjects() {
  return (
    <section id="projects" className="dayal-projects-section dayal-section" aria-label="Projects">
      <div className="dayal-container space-y-20 sm:space-y-24">
        <ProjectGrid
          sectionId="future-projects"
          eyebrow="Future Projects"
          title="Crafting tomorrow’s landmarks"
          subtitle="Upcoming developments designed for modern living across Jamshedpur."
          projects={FUTURE_PROJECTS}
          featured
        />
        <ProjectGrid
          sectionId="ongoing-projects"
          eyebrow="Ongoing Projects"
          title="Under construction, built with care"
          subtitle="Active sites where design and construction come together."
          projects={ONGOING_PROJECTS}
        />
        <ProjectGrid
          sectionId="past-projects"
          eyebrow="Past Projects"
          title="A proven track record"
          subtitle="Completed homes that built our reputation for quality and trust."
          projects={PAST_PROJECTS}
          featured
        />
      </div>
    </section>
  );
}
