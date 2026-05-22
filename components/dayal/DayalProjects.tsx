"use client";

import { motion } from "framer-motion";
import { Building2, MapPin } from "lucide-react";
import Image from "next/image";

import DayalReveal from "@/components/dayal/DayalReveal";
import { ONGOING_PROJECTS, PAST_PROJECTS } from "@/lib/dayal/data";

const STATUS_STYLES: Record<string, string> = {
  Ongoing: "bg-amber-500/90 text-white",
  Completed: "bg-emerald-600/90 text-white",
};

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
    <div id={sectionId} className="scroll-mt-24">
      <DayalReveal className="text-center">
        <p className="text-xs font-semibold uppercase tracking-[0.25em] text-[#c8a46b]">{eyebrow}</p>
        <h2 className="dayal-serif mt-3 text-3xl font-semibold text-[#0b1633] sm:text-4xl">{title}</h2>
        <p className="mx-auto mt-4 max-w-2xl text-sm leading-relaxed text-[#5c6478] sm:text-base">
          {subtitle}
        </p>
      </DayalReveal>

      <div className="mt-12 flex gap-5 overflow-x-auto pb-4 snap-x snap-mandatory scrollbar-thin lg:grid lg:grid-cols-4 lg:overflow-visible">
        {projects.map((project, i) => (
          <DayalReveal
            key={project.id}
            delay={i * 0.06}
            className="w-[min(280px,78vw)] shrink-0 snap-start lg:w-auto"
          >
            <motion.article
              className="group overflow-hidden rounded-xl bg-white shadow-lg ring-1 ring-[#0b1633]/5"
              whileHover={{ y: -4 }}
              transition={{ duration: 0.3 }}
            >
              <div className="relative aspect-[3/4] overflow-hidden sm:aspect-[4/5]">
                <Image
                  src={project.image}
                  alt={project.name}
                  fill
                  className="object-cover transition duration-700 group-hover:scale-105"
                  sizes="220px"
                />
                <span
                  className={`absolute left-3 top-3 rounded px-2 py-0.5 text-[10px] font-bold uppercase tracking-wide ${STATUS_STYLES[project.status] ?? ""}`}
                >
                  {project.status}
                </span>
              </div>
              <div className="p-4">
                <h3 className="dayal-serif text-lg font-semibold text-[#0b1633]">{project.name}</h3>
                <p className="mt-1 flex items-center gap-1 text-xs text-[#5c6478]">
                  <MapPin className="h-3 w-3 text-[#c8a46b]" />
                  {project.location}
                </p>
                <p className="mt-2 text-xs font-medium text-[#c8a46b]">{project.tagline}</p>
                <p className="mt-2 text-xs leading-relaxed text-[#5c6478]">{project.description}</p>
                <a
                  href="#contact"
                  className="mt-3 flex items-center gap-1 text-xs font-semibold text-[#0b1633] hover:text-[#c8a46b]"
                >
                  <Building2 className="h-3.5 w-3.5" />
                  View Project
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
    <section id="projects" className="py-16 lg:py-24">
      <div className="mx-auto max-w-7xl space-y-20 px-4 sm:px-6 lg:px-8">
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
