"use client";

import { useRef } from "react";
import { motion, useScroll, useSpring } from "framer-motion";
import { Briefcase, GraduationCap } from "lucide-react";
import { education, experience, experienceFallbackLine } from "@/data/content";
import { sectionEntrance } from "@/lib/motion";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { GlassCard } from "@/components/ui/GlassCard";

/**
 * Vertical timeline with a scroll-linked progress line.
 * Experience entries first (reverse chronological), then education.
 */
export function ExperienceTimeline() {
  const listRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: listRef,
    offset: ["start 0.75", "end 0.55"],
  });
  const progress = useSpring(scrollYProgress, { stiffness: 90, damping: 24 });

  return (
    <section
      id="experience"
      aria-labelledby="experience-heading"
      className="relative py-24 md:py-32"
    >
      <div className="mx-auto max-w-[1200px] px-5 md:px-8">
        <SectionHeading
          id="experience-heading"
          eyebrow="Journey"
          title="Experience & education"
        />

        <div ref={listRef} className="relative mx-auto max-w-3xl">
          {/* Track + progress line */}
          <div
            aria-hidden="true"
            className="absolute bottom-0 left-[19px] top-0 w-[2px] bg-white/10 md:left-[23px]"
          />
          <motion.div
            aria-hidden="true"
            style={{ scaleY: progress }}
            className="absolute bottom-0 left-[19px] top-0 w-[2px] origin-top bg-gradient-to-b from-electric-500 to-cyan-glow md:left-[23px]"
          />

          <div className="space-y-8">
            {experience.map((job, i) => (
              <motion.div
                key={`${job.company}-${job.role}`}
                variants={sectionEntrance}
                initial="hidden"
                whileInView="show"
                viewport={{ once: true, margin: "-60px" }}
                className="relative pl-14 md:pl-16"
              >
                <span
                  aria-hidden="true"
                  className="absolute left-0 top-1 flex h-10 w-10 items-center justify-center rounded-full border border-electric-500/40 bg-ink-900 text-cyan-glow md:h-12 md:w-12"
                >
                  <Briefcase size={18} />
                </span>
                <GlassCard>
                  <p className="font-mono text-xs uppercase tracking-[0.18em] text-cyan-glow">
                    {job.startDate} — {job.endDate}
                  </p>
                  <h3 className="mt-2 font-display text-lg font-semibold text-white">
                    {job.role}
                  </h3>
                  <p className="text-sm text-slate-300">
                    {job.company}
                    {job.location ? ` · ${job.location}` : ""}
                  </p>
                  {job.bullets.length > 0 ? (
                    <ul className="mt-3 list-disc space-y-1.5 pl-5 text-sm leading-relaxed text-slate-300">
                      {job.bullets.map((b, j) => (
                        <li key={j}>{b}</li>
                      ))}
                    </ul>
                  ) : (
                    <p className="mt-3 text-sm italic leading-relaxed text-slate-400">
                      {experienceFallbackLine}
                      {job.detailsTodo && (
                        <span className="sr-only"> (Details coming soon.)</span>
                      )}
                    </p>
                  )}
                  {i === 0 && (
                    <span className="sr-only">Most recent position.</span>
                  )}
                </GlassCard>
              </motion.div>
            ))}

            {/* Education */}
            <motion.div
              variants={sectionEntrance}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, margin: "-60px" }}
              className="relative pl-14 md:pl-16"
            >
              <span
                aria-hidden="true"
                className="absolute left-0 top-1 flex h-10 w-10 items-center justify-center rounded-full border border-violet-soft/40 bg-ink-900 text-violet-soft md:h-12 md:w-12"
              >
                <GraduationCap size={18} />
              </span>
              <GlassCard>
                <p className="font-mono text-xs uppercase tracking-[0.18em] text-violet-soft">
                  Expected {education.graduating}
                </p>
                <h3 className="mt-2 font-display text-lg font-semibold text-white">
                  {education.degree} — {education.field}
                </h3>
                <p className="text-sm text-slate-300">
                  {education.school} ({education.schoolShort}), {education.location}
                </p>
                {education.showCgpa && (
                  <p className="mt-2 text-sm text-slate-300">
                    CGPA:{" "}
                    <span className="font-semibold text-white">{education.cgpa}</span>
                    <span className="text-slate-400"> / 10</span>
                  </p>
                )}
              </GlassCard>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
