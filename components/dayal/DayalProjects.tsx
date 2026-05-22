"use client";

import { motion } from "framer-motion";
import { ArrowRight, MapPin } from "lucide-react";
import Image from "next/image";

import DayalReveal from "@/components/dayal/DayalReveal";
import { ONGOING_PROJECTS, PAST_PROJECTS } from "@/lib/dayal/data";

type Project = (typeof ONGOING_PROJECTS)[number] | (typeof PAST_PROJECTS)[number];

function ProjectGrid({
  projects,
  sectionId,
  eyebrow,
  title,
  subtitle,
}: {
  projects: readonly Project[];
  sectionId: string;
  eyebrow: string;
  title: string;
  subtitle: string;
}) {
  return (
    <div id={sectionId} className="scroll-mt-28">
      <DayalReveal className="text-center">
        <p className="dayal-eyebrow justify-center">{eyebrow}</p>
        <h2 className="dayal-heading dayal-heading-lg mx-auto mt-5 max-w-3xl">{title}</h2>
        <p className="mx-auto mt-5 max-w-2xl text-sm leading-relaxed dayal-text-muted sm:text-base">
          {subtitle}
        </p>
      </DayalReveal>

      <div className="dayal-project-grid mt-14 flex items-stretch gap-6 overflow-x-auto pb-4 snap-x snap-mandatory scrollbar-thin lg:grid lg:grid-cols-4 lg:overflow-visible">
        {projects.map((project, i) => (
          <DayalReveal
            key={project.id}
            delay={i * 0.06}
            className="flex h-full w-[min(300px,82vw)] shrink-0 snap-start lg:w-auto"
          >
            <motion.article
              className="dayal-card dayal-project-card group w-full"
              whileHover={{ y: -6 }}
              transition={{ duration: 0.35 }}
            >
              <div className="relative aspect-[4/5] shrink-0 overflow-hidden">
                <Image
                  src={project.image}
                  alt={project.name}
                  fill
                  className="object-cover transition duration-700 group-hover:scale-110"
                  sizes="280px"
                />
                <div
                  className="absolute inset-0 z-[1]"
                  style={{
                    background:
                      "linear-gradient(to top, rgba(6,13,28,0.75) 0%, transparent 50%)",
                  }}
                />
                <span
                  className={`dayal-badge ${project.status === "Ongoing" ? "dayal-badge-ongoing" : "dayal-badge-completed"}`}
                >
                  {project.status}
                </span>
              </div>
              <div className="dayal-card-body">
                <h3 className="dayal-serif text-lg font-semibold">{project.name}</h3>
                <p className="mt-1.5 flex items-center gap-1.5 text-xs dayal-text-muted">
                  <MapPin className="h-3.5 w-3.5 shrink-0" style={{ color: "var(--dayal-gold)" }} />
                  {project.location}
                </p>
                <p
                  className="mt-2 min-h-[2.5rem] text-xs font-semibold uppercase tracking-wide"
                  style={{ color: "var(--dayal-gold-dark)" }}
                >
                  {project.tagline}
                </p>
                <p className="dayal-card-body-desc mt-2 text-xs leading-relaxed dayal-text-muted">
                  {project.description}
                </p>
                <a
                  href="#contact"
                  className="mt-auto inline-flex items-center gap-1.5 pt-4 text-xs font-semibold transition hover:gap-2.5"
                  style={{ color: "var(--dayal-navy-mid)" }}
                >
                  View Project
                  <ArrowRight className="h-3.5 w-3.5" style={{ color: "var(--dayal-gold)" }} />
                </a>
              </div>
            </motion.article>
          </DayalReveal>
        ))}
      </div>
    </div>
  );
}

export default function DayalProjects() {
  return (
    <section id="projects" className="dayal-section dayal-section-champagne">
      <div className="dayal-container space-y-24">
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
        />
      </div>
    </section>
  );
}
