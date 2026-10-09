"use client";

import { motion } from "framer-motion";
import { BarChart3, Code2, LineChart, Wrench } from "lucide-react";
import { skillGroups, type SkillGroup } from "@/data/content";
import { fadeUpItem, staggerContainer } from "@/lib/motion";
import { cn } from "@/lib/utils";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { GlassCard } from "@/components/ui/GlassCard";

const ICONS: Record<SkillGroup["icon"], React.ReactNode> = {
  code: <Code2 size={22} aria-hidden="true" />,
  chart: <BarChart3 size={22} aria-hidden="true" />,
  analytics: <LineChart size={22} aria-hidden="true" />,
  wrench: <Wrench size={22} aria-hidden="true" />,
};

const LEVEL_STYLES: Record<string, string> = {
  "Daily use": "border-cyan-glow/40 bg-cyan-glow/10 text-cyan-glow",
  "Project-proven": "border-electric-500/40 bg-electric-500/10 text-electric-400",
  Familiar: "border-white/10 bg-white/5 text-slate-300",
};

export function SkillsSection() {
  return (
    <section id="skills" aria-labelledby="skills-heading" className="relative py-24 md:py-32">
      <div
        aria-hidden="true"
        className="glow-blue absolute left-1/2 top-0 h-[380px] w-[680px] -translate-x-1/2"
      />
      <div className="relative mx-auto max-w-[1200px] px-5 md:px-8">
        <SectionHeading
          id="skills-heading"
          eyebrow="Skills"
          title="Tools I work with"
          description="Grouped by craft. Levels reflect real usage — daily work, project-proven, or familiar — never inflated percentages."
        />
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-80px" }}
          className="grid gap-5 sm:grid-cols-2 xl:grid-cols-4"
        >
          {skillGroups.map((group) => (
            <motion.div key={group.title} variants={fadeUpItem}>
              <GlassCard className="h-full transition-transform duration-300 hover:-translate-y-1.5">
                <div className="flex items-center gap-3">
                  <span className="inline-flex h-11 w-11 items-center justify-center rounded-xl bg-electric-500/15 text-cyan-glow">
                    {ICONS[group.icon]}
                  </span>
                  <h3 className="font-display text-base font-semibold text-white">
                    {group.title}
                  </h3>
                </div>
                <ul className="mt-5 space-y-2.5">
                  {group.skills.map((skill) => (
                    <li
                      key={skill.name}
                      className="flex items-center justify-between gap-2 text-sm"
                    >
                      <span className="text-slate-200">{skill.name}</span>
                      <span
                        className={cn(
                          "shrink-0 rounded-full border px-2.5 py-0.5 text-[11px] font-medium",
                          LEVEL_STYLES[skill.level],
                        )}
                      >
                        {skill.level}
                      </span>
                    </li>
                  ))}
                </ul>
              </GlassCard>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
