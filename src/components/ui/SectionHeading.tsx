"use client";

import { motion } from "framer-motion";
import { sectionEntrance } from "@/lib/motion";
import { cn } from "@/lib/utils";

interface SectionHeadingProps {
  id: string;
  eyebrow: string;
  title: string;
  description?: string;
  align?: "left" | "center";
}

export function SectionHeading({
  id,
  eyebrow,
  title,
  description,
  align = "left",
}: SectionHeadingProps) {
  return (
    <motion.div
      variants={sectionEntrance}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, margin: "-80px" }}
      className={cn("mb-10 md:mb-14", align === "center" && "text-center")}
    >
      <p className="font-mono text-xs uppercase tracking-[0.25em] text-cyan-glow">
        {eyebrow}
      </p>
      <h2
        id={id}
        className="text-section-title mt-3 font-bold text-white"
      >
        {title}
      </h2>
      {description && (
        <p className="mt-4 max-w-2xl text-base leading-relaxed text-slate-300/90">
          {description}
        </p>
      )}
    </motion.div>
  );
}
