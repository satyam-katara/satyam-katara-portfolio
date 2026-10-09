"use client";

import { useCountUp } from "@/hooks/useCountUp";
import { GlassCard } from "./GlassCard";

interface StatCardProps {
  value: number;
  label: string;
  suffix?: string;
}

/** Count-up stat card; animates once on view, honors reduced motion. */
export function StatCard({ value, label, suffix = "" }: StatCardProps) {
  const { ref, value: current } = useCountUp(value);
  return (
    <GlassCard className="text-center">
      <p className="font-display text-4xl font-bold text-white md:text-5xl">
        <span ref={ref} aria-hidden="true">
          {current}
        </span>
        <span aria-hidden="true" className="text-cyan-glow">
          {suffix}
        </span>
        <span className="sr-only">{`${value}${suffix} ${label}`}</span>
      </p>
      <p className="mt-2 text-sm text-slate-300">{label}</p>
    </GlassCard>
  );
}
