"use client";

import { useEffect, useRef, useState } from "react";
import dynamic from "next/dynamic";
import { useReducedMotionSafe } from "@/lib/motion";
import { useIsLowPower } from "@/hooks/useIsLowPower";
import { Fallback3D } from "./Fallback3D";
import { ThreeErrorBoundary } from "./ThreeErrorBoundary";

const LazyScene = dynamic(
  () => import("./DataVisualization3D").then((m) => m.DataVisualization3D),
  {
    ssr: false,
    loading: () => (
      <div
        aria-hidden="true"
        className="glass flex h-full w-full items-center justify-center rounded-3xl"
      >
        <div className="h-40 w-40 animate-pulse rounded-full bg-electric-500/10" />
      </div>
    ),
  },
);

function webglSupported(): boolean {
  try {
    const canvas = document.createElement("canvas");
    return !!(
      canvas.getContext("webgl2") ||
      canvas.getContext("webgl") ||
      canvas.getContext("experimental-webgl")
    );
  } catch {
    return false;
  }
}

/**
 * Hero visual: mounts the lazy 3D scene only after the hero is visible and
 * the browser is idle. Falls back to a static SVG visual when WebGL is
 * unavailable, the user prefers reduced motion, the device is low-power,
 * or the scene errors at runtime.
 */
export function HeroVisual() {
  const wrapRef = useRef<HTMLDivElement>(null);
  const [heroVisible, setHeroVisible] = useState(false);
  const [idle, setIdle] = useState(false);
  const [canUseWebGL, setCanUseWebGL] = useState<boolean | null>(null);
  const reduceMotion = useReducedMotionSafe();
  const lowPower = useIsLowPower();

  useEffect(() => {
    setCanUseWebGL(webglSupported());
    const el = wrapRef.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0]?.isIntersecting) {
          setHeroVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.1 },
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!heroVisible) return;
    const win = window as Window & {
      requestIdleCallback?: (cb: () => void, opts?: { timeout: number }) => number;
    };
    if (typeof win.requestIdleCallback === "function") {
      const id = win.requestIdleCallback(() => setIdle(true), { timeout: 2500 });
      return () => window.cancelIdleCallback?.(id);
    }
    const t = window.setTimeout(() => setIdle(true), 1200);
    return () => window.clearTimeout(t);
  }, [heroVisible]);

  const coarsePointer =
    typeof window !== "undefined" &&
    window.matchMedia("(pointer: coarse)").matches;

  const useFallback =
    canUseWebGL === false ||
    reduceMotion ||
    (lowPower && coarsePointer);

  return (
    <div ref={wrapRef} className="relative h-[320px] w-full sm:h-[420px] lg:h-[520px]">
      {useFallback || canUseWebGL === null ? (
        <Fallback3D />
      ) : idle ? (
        <ThreeErrorBoundary fallback={<Fallback3D />}>
          <LazyScene />
        </ThreeErrorBoundary>
      ) : (
        <Fallback3D />
      )}
    </div>
  );
}
