/**
 * motion.ts — shared motion system.
 *
 * Rules: animate only transform and opacity. Keep continuous animations few.
 */
import { useReducedMotion } from "framer-motion";
import type { Variants } from "framer-motion";

export const EASE = [0.22, 1, 0.36, 1] as const;

export const DURATIONS = {
  fast: 0.25,
  normal: 0.5,
  slow: 0.8,
} as const;

/** Staggered container for hero / grids. */
export const staggerContainer: Variants = {
  hidden: {},
  show: {
    transition: { staggerChildren: 0.09, delayChildren: 0.1 },
  },
};

/** Fade-up item used inside stagger containers. */
export const fadeUpItem: Variants = {
  hidden: { opacity: 0, y: 24 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: DURATIONS.normal, ease: EASE },
  },
};

/** Section entrance (used with whileInView + once). */
export const sectionEntrance: Variants = {
  hidden: { opacity: 0, y: 32 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: DURATIONS.slow, ease: EASE },
  },
};

/**
 * Reduced-motion-safe helper: returns true when the user prefers reduced
 * motion, so components can skip parallax/particles/chart animation.
 */
export function useReducedMotionSafe(): boolean {
  return useReducedMotion() ?? false;
}
