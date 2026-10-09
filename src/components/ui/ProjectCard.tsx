"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight, ChevronDown, FlaskConical } from "lucide-react";
import type { Project } from "@/data/content";
import { cn } from "@/lib/utils";
import { Chip } from "./Chip";
import { GithubIcon } from "./BrandIcons";
import { ProjectPreviewArt } from "./ProjectPreviewArt";

interface ProjectCardProps {
  project: Project;
}

/**
 * Project card: preview, title, category chip, problem, tool chips.
 * Approach + findings reveal on hover (desktop), keyboard focus, or tap
 * via the Details toggle — never hover-only.
 */
export function ProjectCard({ project }: ProjectCardProps) {
  const [expanded, setExpanded] = useState(false);
  const detailsId = `project-details-${project.slug}`;

  return (
    <motion.article
      layout
      initial={{ opacity: 0, scale: 0.96 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.96 }}
      transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
      className="group glass flex h-full flex-col overflow-hidden rounded-2xl transition-transform duration-300 hover:-translate-y-1.5 focus-within:-translate-y-1.5"
    >
      <Link
        href={`/projects/${project.slug}`}
        className="relative block aspect-[16/9] overflow-hidden"
        aria-label={`View details: ${project.title}`}
      >
        {project.preview.type === "screenshot" && project.preview.src ? (
          <Image
            src={project.preview.src}
            alt={project.preview.alt}
            fill
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
            className="object-cover transition-transform duration-500 group-hover:scale-105"
          />
        ) : (
          <div className="h-full w-full transition-transform duration-500 group-hover:scale-105">
            <ProjectPreviewArt project={project} />
          </div>
        )}
        {project.concept && (
          <span className="absolute left-3 top-3 inline-flex items-center gap-1.5 rounded-full border border-violet-soft/50 bg-ink-950/70 px-3 py-1 text-[11px] font-medium text-violet-soft backdrop-blur-sm">
            <FlaskConical size={12} aria-hidden="true" />
            Concept
          </span>
        )}
      </Link>

      <div className="flex flex-1 flex-col p-5">
        <div className="flex items-start justify-between gap-3">
          <h3 className="font-display text-lg font-semibold leading-snug text-white">
            <Link href={`/projects/${project.slug}`} className="rounded hover:text-cyan-glow">
              {project.title}
            </Link>
          </h3>
        </div>
        <p className="mt-1.5 font-mono text-[11px] uppercase tracking-[0.18em] text-cyan-glow">
          {project.category}
        </p>
        <p className="mt-3 text-sm leading-relaxed text-slate-300">
          {project.problem}
        </p>

        <div className="mt-4 flex flex-wrap gap-1.5" aria-label="Tools used">
          {project.tools.slice(0, 4).map((tool) => (
            <Chip key={tool} className="px-2.5 py-0.5 text-[11px]">
              {tool}
            </Chip>
          ))}
        </div>

        {/* Reveal region: hover on desktop, toggle on touch/keyboard */}
        <div
          id={detailsId}
          className={cn(
            "grid transition-all duration-300",
            expanded
              ? "mt-4 grid-rows-[1fr] opacity-100"
              : "grid-rows-[0fr] opacity-0 group-hover:mt-4 group-hover:grid-rows-[1fr] group-hover:opacity-100 group-focus-within:mt-4 group-focus-within:grid-rows-[1fr] group-focus-within:opacity-100",
          )}
        >
          <div className="overflow-hidden">
            <p className="text-xs font-semibold uppercase tracking-wider text-slate-400">
              Approach
            </p>
            <ul className="mt-2 list-disc space-y-1.5 pl-4 text-sm text-slate-300">
              {project.approach.slice(0, 3).map((step, i) => (
                <li key={i}>{step}</li>
              ))}
            </ul>
            {project.keyFindings && project.keyFindings.length > 0 && (
              <>
                <p className="mt-3 text-xs font-semibold uppercase tracking-wider text-slate-400">
                  Key findings
                </p>
                <ul className="mt-2 list-disc space-y-1.5 pl-4 text-sm text-slate-300">
                  {project.keyFindings.map((f, i) => (
                    <li key={i}>{f}</li>
                  ))}
                </ul>
              </>
            )}
          </div>
        </div>

        <div className="mt-auto flex items-center gap-2 pt-5">
          <button
            type="button"
            onClick={() => setExpanded((v) => !v)}
            aria-expanded={expanded}
            aria-controls={detailsId}
            className="inline-flex min-h-[44px] items-center gap-1.5 rounded-full border border-white/15 px-4 text-xs font-semibold text-slate-200 transition-colors hover:bg-white/10"
          >
            Details
            <ChevronDown
              size={14}
              aria-hidden="true"
              className={cn("transition-transform", expanded && "rotate-180")}
            />
          </button>
          <Link
            href={`/projects/${project.slug}`}
            className="inline-flex min-h-[44px] flex-1 items-center justify-center gap-1.5 rounded-full bg-electric-500/15 px-4 text-xs font-semibold text-electric-400 transition-colors hover:bg-electric-500/25"
          >
            View Project
            <ArrowRight size={14} aria-hidden="true" />
          </Link>
          {project.github && (
            <a
              href={project.github}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`GitHub repository for ${project.title}`}
              className="inline-flex min-h-[44px] min-w-[44px] items-center justify-center rounded-full border border-white/15 text-slate-200 transition-colors hover:bg-white/10"
            >
              <GithubIcon size={16} />
            </a>
          )}
        </div>
      </div>
    </motion.article>
  );
}
