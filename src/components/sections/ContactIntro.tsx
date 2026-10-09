"use client";

import { motion } from "framer-motion";
import { Mail } from "lucide-react";
import { contactCopy, identity } from "@/data/content";
import { sectionEntrance } from "@/lib/motion";
import { CopyEmailButton } from "@/components/ui/CopyEmailButton";
import { GithubIcon, LinkedinIcon } from "@/components/ui/BrandIcons";

/** Animated contact intro (client) — rendered by the server ContactSection. */
export function ContactIntro() {
  return (
    <motion.div
      variants={sectionEntrance}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, margin: "-80px" }}
      className="mx-auto max-w-2xl text-center"
    >
      <div className="flex flex-wrap items-center justify-center gap-3">
        <CopyEmailButton />
        <a
          href={`mailto:${identity.email}`}
          className="inline-flex min-h-[44px] items-center gap-2 rounded-full border border-white/15 bg-white/5 px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-white/10"
        >
          <Mail size={16} aria-hidden="true" />
          {identity.email}
        </a>
      </div>
      <div className="mt-5 flex items-center justify-center gap-3">
        <a
          href={identity.linkedin}
          target="_blank"
          rel="noopener noreferrer"
          aria-label="LinkedIn profile (opens in new tab)"
          className="inline-flex min-h-[44px] min-w-[44px] items-center justify-center rounded-full border border-white/15 text-slate-300 transition-all hover:-translate-y-0.5 hover:border-cyan-glow hover:text-cyan-glow"
        >
          <LinkedinIcon size={20} />
        </a>
        <a
          href={identity.github}
          target="_blank"
          rel="noopener noreferrer"
          aria-label="GitHub profile (opens in new tab)"
          className="inline-flex min-h-[44px] min-w-[44px] items-center justify-center rounded-full border border-white/15 text-slate-300 transition-all hover:-translate-y-0.5 hover:border-cyan-glow hover:text-cyan-glow"
        >
          <GithubIcon size={20} />
        </a>
      </div>
      <p className="mt-6 text-sm leading-relaxed text-slate-300">
        {contactCopy.closing}
      </p>
    </motion.div>
  );
}
