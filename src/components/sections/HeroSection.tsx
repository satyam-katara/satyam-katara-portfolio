"use client";

import { motion } from "framer-motion";
import { ArrowDown, ArrowRight, Download, MapPin } from "lucide-react";
import { hero, identity } from "@/data/content";
import { EASE, staggerContainer } from "@/lib/motion";
import { HeroVisual } from "@/components/three/HeroVisual";

function HeadlineWords({ text }: { text: string }) {
  const words = text.split(" ");
  return (
    <span className="inline">
      {words.map((word, i) => (
        <span
          key={`${word}-${i}`}
          className="inline-block overflow-hidden pb-1 align-bottom"
        >
          <motion.span
            className="inline-block"
            initial={{ y: "110%" }}
            animate={{ y: "0%" }}
            transition={{ duration: 0.7, ease: EASE, delay: 0.15 + i * 0.06 }}
          >
            {word}
            {i < words.length - 1 ? " " : ""}
          </motion.span>
        </span>
      ))}
    </span>
  );
}

export function HeroSection() {
  return (
    <section
      id="home"
      aria-labelledby="hero-heading"
      className="relative flex min-h-[100svh] items-center overflow-hidden"
    >
      {/* Backdrop: grid + glows (max two hues) */}
      <div aria-hidden="true" className="bg-grid absolute inset-0" />
      <div aria-hidden="true" className="glow-blue absolute -left-40 top-1/4 h-[480px] w-[480px]" />
      <div aria-hidden="true" className="glow-cyan absolute -right-40 bottom-1/4 h-[420px] w-[420px]" />

      <div className="relative z-10 mx-auto grid w-full max-w-[1200px] items-center gap-12 px-5 pb-24 pt-28 md:px-8 lg:grid-cols-[1.05fr_0.95fr] lg:pb-16 lg:pt-24">
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          animate="show"
        >
          {identity.availability.enabled && (
            <motion.div
              variants={{
                hidden: { opacity: 0, y: 16 },
                show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: EASE } },
              }}
            >
              <span className="glass inline-flex items-center gap-2 rounded-full px-4 py-1.5 text-xs font-medium text-cyan-glow">
                <span aria-hidden="true" className="relative flex h-2 w-2">
                  <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-cyan-glow opacity-60" />
                  <span className="relative inline-flex h-2 w-2 rounded-full bg-cyan-glow" />
                </span>
                {identity.availability.label}
              </span>
            </motion.div>
          )}

          <motion.h1
            id="hero-heading"
            variants={{
              hidden: {},
              show: { transition: { staggerChildren: 0.06 } },
            }}
            className="text-display mt-6 font-bold text-white"
          >
            <HeadlineWords text={hero.headline} />
          </motion.h1>

          <motion.p
            variants={{
              hidden: { opacity: 0, y: 20 },
              show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: EASE, delay: 0.55 } },
            }}
            className="mt-6 max-w-xl text-base leading-relaxed text-slate-300 md:text-lg"
          >
            {hero.subheadline}
          </motion.p>

          <motion.p
            variants={{
              hidden: { opacity: 0 },
              show: { opacity: 1, transition: { duration: 0.6, delay: 0.7 } },
            }}
            className="mt-4 flex items-center gap-2 font-mono text-xs uppercase tracking-[0.2em] text-slate-400"
          >
            <MapPin size={13} aria-hidden="true" />
            {identity.location} · B.Tech CSE (Data Science)
          </motion.p>

          <motion.div
            variants={{
              hidden: { opacity: 0, y: 20 },
              show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: EASE, delay: 0.8 } },
            }}
            className="mt-8 flex flex-wrap items-center gap-3"
          >
            <a
              href="#projects"
              className="inline-flex min-h-[44px] items-center gap-2 rounded-full bg-electric-500 px-6 py-3 text-sm font-semibold text-white transition-transform hover:scale-[1.03] hover:bg-electric-600 active:scale-[0.98]"
            >
              Explore My Projects
              <ArrowRight size={16} aria-hidden="true" />
            </a>
            <a
              href={identity.resumePath}
              download
              className="inline-flex min-h-[44px] items-center gap-2 rounded-full border border-white/15 bg-white/5 px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-white/10"
            >
              <Download size={16} aria-hidden="true" />
              Download Resume
            </a>
            <a
              href="#contact"
              className="inline-flex min-h-[44px] items-center rounded-full px-6 py-3 text-sm font-semibold text-cyan-glow transition-colors hover:text-white"
            >
              Let&apos;s Connect
            </a>
          </motion.div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.96 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.9, ease: EASE, delay: 0.4 }}
        >
          <HeroVisual />
        </motion.div>
      </div>

      {/* Animated scroll indicator */}
      <motion.a
        href="#about"
        aria-label="Scroll to about section"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.6, duration: 0.8 }}
        className="absolute bottom-6 left-1/2 z-10 inline-flex -translate-x-1/2 flex-col items-center gap-1 text-slate-400 transition-colors hover:text-white"
      >
        <span className="text-[10px] font-medium uppercase tracking-[0.3em]">Scroll</span>
        <motion.span
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
        >
          <ArrowDown size={18} aria-hidden="true" />
        </motion.span>
      </motion.a>
    </section>
  );
}
