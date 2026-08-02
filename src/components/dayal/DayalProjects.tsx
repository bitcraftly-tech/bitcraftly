'use client';

import Image from 'next/image';
import { Building2, MapPin } from 'lucide-react';

import DayalSectionLink from '@/components/dayal/DayalSectionLink';

import DayalReveal from '@/components/dayal/DayalReveal';
import { FUTURE_PROJECTS, ONGOING_PROJECTS, PAST_PROJECTS } from '@/lib/dayal/data';

const STATUS_STYLES: Record<string, string> = {
  Future: 'bg-[#0b1633]/90 text-white',
  Ongoing: 'bg-amber-500/90 text-white',
  Completed: 'bg-emerald-600/90 text-white',
};

type RichPart = { readonly text: string; readonly bold?: boolean };

type FeatureProject = {
  readonly id: string;
  readonly name: string;
  readonly image: string;
  readonly description: string;
  readonly tagline?: string;
  readonly headlineSuffix?: string;
  readonly descriptionRich?: readonly RichPart[];
  readonly status?: string;
};

type GridProject =
  | (typeof FUTURE_PROJECTS)[number]
  | (typeof ONGOING_PROJECTS)[number]
  | (typeof PAST_PROJECTS)[number];

function ProjectCard({ project, className = '' }: { project: GridProject; className?: string }) {
  return (
    <article
      className={`group flex h-full flex-col overflow-hidden bg-white transition-shadow duration-300 hover:shadow-lg ${className}`}
    >
      <div className="relative aspect-[16/10] overflow-hidden dayal-media-skeleton sm:aspect-[5/3]">
        <Image
          src={project.image}
          alt={project.name}
          fill
          className="object-cover"
          sizes="(max-width: 768px) 100vw, 400px"
        />
        <span
          className={`absolute left-3 top-3 z-10 rounded px-2 py-0.5 dayal-micro font-bold uppercase tracking-wide ${STATUS_STYLES[project.status] ?? ''}`}
        >
          {project.status}
        </span>
      </div>
      <div className="flex flex-1 flex-col p-4">
        <h3 className="dayal-serif text-base font-semibold text-[#0b1633] sm:text-lg">
          {project.name}
        </h3>
        <p className="dayal-caption mt-1 flex items-center gap-1">
          <MapPin className="h-3 w-3 shrink-0 text-[#c8a46b]" />
          {project.location}
        </p>
        <p className="dayal-caption mt-1.5 font-medium text-[#c8a46b]">{project.tagline}</p>
        <p className="dayal-caption mt-1.5 flex-1">{project.description}</p>
        <DayalSectionLink
          href="#contact"
          className="dayal-caption mt-3 inline-flex items-center gap-1 font-semibold text-[#0b1633] transition hover:text-[#c0392b]"
        >
          <Building2 className="h-3 w-3" />
          View Project
        </DayalSectionLink>
      </div>
    </article>
  );
}

function FeatureProjectIcon() {
  return (
    <span
      className="mb-2 inline-flex h-6 w-6 shrink-0 items-center justify-center text-[#c0392b]"
      aria-hidden
    >
      <svg viewBox="0 0 24 24" className="h-5 w-5" fill="currentColor">
        <path d="M4 4h7v7H4V4zm9 0h7v7h-7V4zM4 13h7v7H4v-7zm13 0h3v3h-3v-3zm-6 3h3v4h-3v-4zm6 4h3v3h-3v-3z" />
      </svg>
    </span>
  );
}

function FeatureProjectRow({
  project,
  reversed = false,
}: {
  project: FeatureProject;
  reversed?: boolean;
}) {
  const rich = project.descriptionRich ?? [{ text: project.description }];
  const headlineSuffix = project.headlineSuffix ?? project.tagline ?? '';

  return (
    <article
      className={`group grid overflow-hidden rounded-xl bg-[#eeedea] shadow-sm ring-1 ring-[#0b1633]/6 ${
        reversed ? 'md:grid-cols-[1fr_minmax(0,32%)]' : 'md:grid-cols-[minmax(0,32%)_1fr]'
      }`}
    >
      <div
        className={`dayal-media-skeleton relative aspect-[16/10] overflow-hidden md:aspect-auto md:min-h-[150px] ${
          reversed ? 'order-1 md:order-2' : 'order-1 md:order-1'
        }`}
      >
        <Image
          src={project.image}
          alt={project.name}
          fill
          className="object-cover"
          sizes="(max-width: 768px) 100vw, 280px"
        />
      </div>

      <div
        className={`flex flex-col justify-center px-4 py-4 sm:px-5 sm:py-5 md:px-6 md:py-6 ${
          reversed ? 'order-2 md:order-1' : 'order-2 md:order-2'
        }`}
      >
        <FeatureProjectIcon />
        <h3 className="text-sm font-normal leading-snug text-[#1a1a1a] sm:text-base">
          <span className="font-bold">{project.name}</span>
          {headlineSuffix ? (
            <>
              {' – '}
              {headlineSuffix}
            </>
          ) : null}
        </h3>
        <p className="dayal-body mt-2 max-w-lg text-[#4a4a4a]">
          {rich.map((part, i) =>
            part.bold ? (
              <strong key={i} className="font-bold text-[#1a1a1a]">
                {part.text}
              </strong>
            ) : (
              <span key={i}>{part.text}</span>
            ),
          )}
        </p>
        <DayalSectionLink
          href="#contact"
          className="dayal-caption mt-3 inline-flex items-center gap-1 font-semibold text-[#0b1633] transition hover:text-[#c0392b]"
        >
          <Building2 className="h-3 w-3" />
          View Project
        </DayalSectionLink>
      </div>
    </article>
  );
}

function FeatureProjectList({ projects }: { projects: readonly FeatureProject[] }) {
  return (
    <div className="mt-10 flex w-full flex-col gap-4">
      {projects.map((project, i) => (
        <DayalReveal key={project.id} delay={i * 0.08}>
          <FeatureProjectRow project={project} reversed={i === 1} />
        </DayalReveal>
      ))}
    </div>
  );
}

function ProjectGrid({
  projects,
  sectionId,
  eyebrow,
  title,
  subtitle,
  featureLayout = false,
}: {
  projects: readonly GridProject[];
  sectionId: string;
  eyebrow: string;
  title: string;
  subtitle: string;
  featureLayout?: boolean;
}) {
  const useFeature = featureLayout && projects.length <= 4;

  const gridClass = 'mt-10 grid grid-cols-1 gap-4 sm:mt-12 sm:grid-cols-2 lg:grid-cols-4 lg:gap-5';

  const cardWrapClass = 'min-w-0 w-full';

  return (
    <div id={sectionId} className="scroll-mt-24">
      <DayalReveal className="text-center">
        <p className="dayal-eyebrow">{eyebrow}</p>
        <h2 className="dayal-section-title">{title}</h2>
        <p className="dayal-body mx-auto mt-4 max-w-2xl">{subtitle}</p>
      </DayalReveal>

      {useFeature ? (
        <FeatureProjectList projects={projects as readonly FeatureProject[]} />
      ) : (
        <div className={gridClass}>
          {projects.map((project, i) => (
            <DayalReveal key={project.id} delay={i * 0.06} className={cardWrapClass}>
              <ProjectCard
                project={project}
                className="h-full overflow-hidden rounded-xl shadow-md ring-1 ring-[#0b1633]/5"
              />
            </DayalReveal>
          ))}
        </div>
      )}
    </div>
  );
}

export default function DayalProjects() {
  return (
    <section id="projects" className="py-12">
      <div className="dayal-container space-y-14 sm:space-y-20">
        <ProjectGrid
          sectionId="future-projects"
          eyebrow="Future Projects"
          title="Crafting Tomorrow's Landmarks"
          subtitle="Discover our upcoming developments designed to elevate modern living and shape the future skyline."
          projects={FUTURE_PROJECTS}
          featureLayout
        />
        <ProjectGrid
          sectionId="ongoing-projects"
          eyebrow="Ongoing Projects"
          title="Current Development Shaping the Future of Urban Living"
          subtitle="Explore our ongoing projects, where modern design meets superior construction to create exceptional living and commercial spaces."
          projects={ONGOING_PROJECTS}
        />
        <ProjectGrid
          sectionId="past-projects"
          eyebrow="Past Projects"
          title="Legacy Projects — Foundations of Our Trusted Reputation"
          subtitle="Our past projects showcase a proven track record of quality, commitment, and architectural excellence."
          projects={PAST_PROJECTS}
          featureLayout
        />
      </div>
    </section>
  );
}
