"use client";

import { motion } from "framer-motion";
import {
  aboutCopy,
  aboutToolChips,
  dailyUseToolCount,
  featuredProjectCount,
  statsConfig,
} from "@/data/content";
import { sectionEntrance, staggerContainer, fadeUpItem } from "@/lib/motion";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { StatCard } from "@/components/ui/StatCard";
import { Chip } from "@/components/ui/Chip";

export function AboutSection() {
  const stats = [
    { value: statsConfig.internships, label: "Internships Completed" },
    { value: statsConfig.certifications, label: "Certifications Completed" },
    { value: featuredProjectCount(), label: "Featured Projects" },
    { value: dailyUseToolCount(), label: "Tools in Daily Use" },
  ];

  return (
    <section id="about" aria-labelledby="about-heading" className="relative py-24 md:py-32">
      <div className="mx-auto max-w-[1200px] px-5 md:px-8">
        <SectionHeading
          id="about-heading"
          eyebrow="About"
          title="Data analyst in the making"
        />
        <div className="grid gap-12 lg:grid-cols-2 lg:gap-16">
          <motion.div
            variants={sectionEntrance}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: "-80px" }}
          >
            <p className="text-base leading-relaxed text-slate-300 md:text-lg">
              {aboutCopy}
            </p>
            <div className="mt-8 flex flex-wrap gap-2.5" aria-label="Key tools">
              {aboutToolChips.map((tool) => (
                <Chip key={tool}>{tool}</Chip>
              ))}
            </div>
          </motion.div>

          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: "-80px" }}
            className="grid grid-cols-2 gap-4"
          >
            {stats.map((s) => (
              <motion.div key={s.label} variants={fadeUpItem}>
                <StatCard value={s.value} label={s.label} />
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
