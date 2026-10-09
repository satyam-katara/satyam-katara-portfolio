"use client";

import { useMemo, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { SearchX } from "lucide-react";
import {
  cyberGuardProject,
  projectFilters,
  projects,
  showCyberGuard,
  type ProjectFilter,
} from "@/data/content";
import { cn } from "@/lib/utils";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { ProjectCard } from "@/components/ui/ProjectCard";

export function ProjectsSection() {
  const [filter, setFilter] = useState<ProjectFilter>("All");

  const allProjects = useMemo(
    () => (showCyberGuard ? [...projects, cyberGuardProject] : projects),
    [],
  );

  const visible = useMemo(
    () =>
      filter === "All"
        ? allProjects
        : allProjects.filter((p) => p.tags.includes(filter)),
    [filter, allProjects],
  );

  return (
    <section id="projects" aria-labelledby="projects-heading" className="relative py-24 md:py-32">
      <div className="mx-auto max-w-[1200px] px-5 md:px-8">
        <SectionHeading
          id="projects-heading"
          eyebrow="Projects"
          title="Work that speaks in data"
          description="Real projects with real pipelines — ETL, analysis, and dashboards. Filter by tool to see how each one was built."
        />

        {/* Filter chips */}
        <div
          role="group"
          aria-label="Filter projects by tool"
          className="mb-10 flex gap-2 overflow-x-auto pb-2 [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
          style={{ scrollSnapType: "x proximity" }}
        >
          {projectFilters.map((f) => {
            const isActive = filter === f;
            return (
              <button
                key={f}
                type="button"
                onClick={() => setFilter(f)}
                aria-pressed={isActive}
                className={cn(
                  "min-h-[44px] shrink-0 rounded-full border px-5 text-sm font-medium transition-colors",
                  isActive
                    ? "border-cyan-glow/60 bg-cyan-glow/15 text-cyan-glow"
                    : "border-white/15 bg-white/5 text-slate-300 hover:bg-white/10 hover:text-white",
                )}
              >
                {f}
              </button>
            );
          })}
        </div>

        {/* Cards */}
        {visible.length > 0 ? (
          <motion.div layout className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            <AnimatePresence mode="popLayout">
              {visible.map((project) => (
                <ProjectCard key={project.slug} project={project} />
              ))}
            </AnimatePresence>
          </motion.div>
        ) : (
          <div className="glass flex flex-col items-center gap-3 rounded-2xl px-6 py-16 text-center">
            <SearchX size={32} aria-hidden="true" className="text-slate-400" />
            <p className="text-slate-300">
              No projects match this filter yet — try another tool.
            </p>
          </div>
        )}
      </div>
    </section>
  );
}
