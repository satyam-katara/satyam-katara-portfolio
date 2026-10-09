"use client";

import { motion } from "framer-motion";
import { Award, BadgeCheck, ExternalLink } from "lucide-react";
import {
  certifications,
  inProgressCertifications,
  workshops,
} from "@/data/content";
import { fadeUpItem, staggerContainer } from "@/lib/motion";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { GlassCard } from "@/components/ui/GlassCard";

export function CertificationsSection() {
  return (
    <section
      id="certifications"
      aria-labelledby="certifications-heading"
      className="relative py-24 md:py-32"
    >
      <div className="mx-auto max-w-[1200px] px-5 md:px-8">
        <SectionHeading
          id="certifications-heading"
          eyebrow="Credentials"
          title="Certifications"
          description="Completed certifications only — each with its issuer."
        />

        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-80px" }}
          className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3"
        >
          {certifications.map((cert) => (
            <motion.div key={cert.title} variants={fadeUpItem}>
              <GlassCard className="flex h-full flex-col transition-transform duration-300 hover:-translate-y-1.5">
                <span className="inline-flex h-11 w-11 items-center justify-center rounded-xl bg-electric-500/15 text-cyan-glow">
                  <Award size={22} aria-hidden="true" />
                </span>
                <h3 className="mt-4 font-display text-base font-semibold leading-snug text-white">
                  {cert.title}
                </h3>
                <p className="mt-1 text-sm text-slate-400">{cert.issuer}</p>
                <div className="mt-auto flex items-center justify-between pt-5">
                  <span className="inline-flex items-center gap-1.5 text-xs font-medium text-emerald-300">
                    <BadgeCheck size={14} aria-hidden="true" />
                    Completed
                  </span>
                  {cert.credentialUrl ? (
                    <a
                      href={cert.credentialUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex min-h-[44px] items-center gap-1 text-xs font-semibold text-cyan-glow hover:text-white"
                    >
                      Verify
                      <ExternalLink size={12} aria-hidden="true" />
                    </a>
                  ) : null}
                </div>
              </GlassCard>
            </motion.div>
          ))}
        </motion.div>

        {/* Workshops & courses */}
        {workshops.length > 0 && (
          <div className="mt-14">
            <h3 className="font-display text-xl font-semibold text-white">
              Workshops & courses
            </h3>
            <ul className="mt-4 grid gap-4 sm:grid-cols-2">
              {workshops.map((w) => (
                <li key={w.title}>
                  <GlassCard className="flex items-center gap-3 p-4">
                    <BadgeCheck size={18} aria-hidden="true" className="shrink-0 text-cyan-glow" />
                    <div>
                      <p className="text-sm font-medium text-white">{w.title}</p>
                      <p className="text-xs text-slate-400">{w.provider}</p>
                    </div>
                  </GlassCard>
                </li>
              ))}
            </ul>
          </div>
        )}

        {/* In progress — hidden while empty */}
        {inProgressCertifications.length > 0 && (
          <div className="mt-14">
            <h3 className="font-display text-xl font-semibold text-white">
              In progress
            </h3>
            <ul className="mt-4 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {inProgressCertifications.map((cert) => (
                <li key={cert.title}>
                  <GlassCard className="p-4">
                    <p className="text-sm font-medium text-white">{cert.title}</p>
                    <p className="text-xs text-slate-400">{cert.issuer}</p>
                  </GlassCard>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </section>
  );
}
