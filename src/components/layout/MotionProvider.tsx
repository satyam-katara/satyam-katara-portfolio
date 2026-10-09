"use client";

import { MotionConfig } from "framer-motion";

/**
 * Wraps the app so every motion component honors the user's
 * OS-level reduced-motion preference automatically.
 */
export function MotionProvider({ children }: { children: React.ReactNode }) {
  return <MotionConfig reducedMotion="user">{children}</MotionConfig>;
}
