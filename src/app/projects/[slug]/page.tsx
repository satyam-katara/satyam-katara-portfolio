import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, ArrowUpRight, FlaskConical } from "lucide-react";
import {
  cyberGuardProject,
  identity,
  projects,
  showCyberGuard,
  type Project,
} from "@/data/content";
import { Chip } from "@/components/ui/Chip";
import { GithubIcon } from "@/components/ui/BrandIcons";
import { ProjectPreviewArt } from "@/components/ui/ProjectPreviewArt";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { SkipLink } from "@/components/layout/SkipLink";

const allProjects: Project[] = showCyberGuard
  ? [...projects, cyberGuardProject]
  : projects;

export function generateStaticParams(): { slug: string }[] {
  return allProjects.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const project = allProjects.find((p) => p.slug === slug);
  if (!project) return { title: "Project not found" };
  return {
    title: `${project.title} — ${identity.name}`,
    description: project.problem,
  };
}

export default async function ProjectPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const project = allProjects.find((p) => p.slug === slug);
  if (!project) notFound();

  return (
    <>
      <SkipLink />
      <Navbar />
      <main id="main" className="relative overflow-hidden pt-28">
        <div aria-hidden="true" className="bg-grid absolute inset-0" />
        <div aria-hidden="true" className="glow-blue absolute -left-40 top-20 h-[420px] w-[420px]" />
        <article className="relative z-10 mx-auto max-w-[900px] px-5 pb-24 md:px-8">
          <Link
            href="/#projects"
            className="inline-flex min-h-[44px] items-center gap-2 rounded-full border border-white/15 px-4 text-sm font-medium text-slate-300 transition-colors hover:bg-white/10 hover:text-white"
          >
            <ArrowLeft size={15} aria-hidden="true" />
            All projects
          </Link>

          <div className="glass mt-8 overflow-hidden rounded-3xl">
            <div className="aspect-[21/9] w-full">
              <ProjectPreviewArt project={project} />
            </div>
            <div className="p-6 md:p-10">
              <div className="flex flex-wrap items-center gap-3">
                <p className="font-mono text-xs uppercase tracking-[0.2em] text-cyan-glow">
                  {project.category}
                </p>
                {project.concept && (
                  <span className="inline-flex items-center gap-1.5 rounded-full border border-violet-soft/50 px-3 py-1 text-[11px] font-medium text-violet-soft">
                    <FlaskConical size={12} aria-hidden="true" />
                    Concept / exploratory
                  </span>
                )}
              </div>
              <h1 className="text-section-title mt-3 font-bold text-white">
                {project.title}
              </h1>

              <h2 className="mt-8 font-display text-lg font-semibold text-white">
                The problem
              </h2>
              <p className="mt-2 leading-relaxed text-slate-300">{project.problem}</p>

              <h2 className="mt-8 font-display text-lg font-semibold text-white">
                Approach
              </h2>
              <ul className="mt-3 list-disc space-y-2.5 pl-5 leading-relaxed text-slate-300">
                {project.approach.map((step, i) => (
                  <li key={i}>{step}</li>
                ))}
              </ul>

              {project.keyFindings && project.keyFindings.length > 0 && (
                <>
                  <h2 className="mt-8 font-display text-lg font-semibold text-white">
                    Key findings
                  </h2>
                  <ul className="mt-3 list-disc space-y-2.5 pl-5 leading-relaxed text-slate-300">
                    {project.keyFindings.map((f, i) => (
                      <li key={i}>{f}</li>
                    ))}
                  </ul>
                </>
              )}

              <h2 className="mt-8 font-display text-lg font-semibold text-white">
                Tools
              </h2>
              <div className="mt-3 flex flex-wrap gap-2">
                {project.tools.map((tool) => (
                  <Chip key={tool}>{tool}</Chip>
                ))}
              </div>

              <div className="mt-10 flex flex-wrap gap-3">
                {project.github && (
                  <a
                    href={project.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex min-h-[44px] items-center gap-2 rounded-full bg-electric-500 px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-electric-600"
                  >
                    <GithubIcon size={16} />
                    View on GitHub
                    <ArrowUpRight size={14} aria-hidden="true" />
                  </a>
                )}
                {project.liveUrl && (
                  <a
                    href={project.liveUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex min-h-[44px] items-center gap-2 rounded-full border border-white/15 bg-white/5 px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-white/10"
                  >
                    Live demo
                    <ArrowUpRight size={14} aria-hidden="true" />
                  </a>
                )}
              </div>
            </div>
          </div>
        </article>
      </main>
      <Footer />
    </>
  );
}
