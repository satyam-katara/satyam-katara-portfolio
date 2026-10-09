"use client";

import { useMemo, useState } from "react";
import {
  Bar,
  BarChart,
  CartesianGrid,
  Cell,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { FlaskConical } from "lucide-react";
import {
  categoryTotals,
  computeKpis,
  dateRangePresets,
  formatKpi,
  monthlyTotals,
  sampleCategories,
  sampleData,
  sampleDataCaption,
} from "@/data/sampleAnalytics";
import { useReducedMotionSafe } from "@/lib/motion";
import { cn } from "@/lib/utils";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { GlassCard } from "@/components/ui/GlassCard";

const BAR_COLORS = ["#3b82f6", "#22d3ee", "#8b5cf6"];

/**
 * Interactive analytics showcase. ALL data is synthetic sample data,
 * prominently labeled as such. Charts honor reduced-motion.
 */
export function AnalyticsShowcase() {
  const [rangeMonths, setRangeMonths] = useState<number>(12);
  const [selected, setSelected] = useState<string[]>([...sampleCategories]);
  const reduceMotion = useReducedMotionSafe();

  const dateFiltered = useMemo(
    () => sampleData.filter((r) => r.monthIndex >= 12 - rangeMonths),
    [rangeMonths],
  );

  const filtered = useMemo(
    () => dateFiltered.filter((r) => selected.includes(r.category)),
    [dateFiltered, selected],
  );

  const kpis = useMemo(() => computeKpis(filtered), [filtered]);
  const lineData = useMemo(() => monthlyTotals(filtered), [filtered]);
  const barData = useMemo(() => categoryTotals(dateFiltered), [dateFiltered]);

  function toggleCategory(category: string) {
    setSelected((prev) =>
      prev.includes(category)
        ? prev.filter((c) => c !== category)
        : [...prev, category],
    );
  }

  return (
    <section
      id="showcase"
      aria-labelledby="showcase-heading"
      className="relative py-24 md:py-32"
    >
      <div className="mx-auto max-w-[1200px] px-5 md:px-8">
        <SectionHeading
          id="showcase-heading"
          eyebrow="Showcase"
          title="Analytics in action"
          description="A miniature dashboard built with the same stack I use on real projects — filter it, click the bars, and watch the KPIs respond."
        />

        <GlassCard>
          {/* Sample-data badge */}
          <div className="mb-6 flex flex-wrap items-center gap-3">
            <span className="inline-flex items-center gap-2 rounded-full border border-amber-400/40 bg-amber-400/10 px-4 py-1.5 text-xs font-semibold text-amber-300">
              <FlaskConical size={14} aria-hidden="true" />
              Sample data, for demonstration only
            </span>
            <p className="text-xs text-slate-400">{sampleDataCaption}</p>
          </div>

          {/* Filters */}
          <div className="mb-8 flex flex-wrap items-center gap-2">
            <span className="mr-1 text-xs font-medium uppercase tracking-wider text-slate-400">
              Range
            </span>
            {dateRangePresets.map((preset) => (
              <button
                key={preset.label}
                type="button"
                onClick={() => setRangeMonths(preset.months)}
                aria-pressed={rangeMonths === preset.months}
                className={cn(
                  "min-h-[44px] rounded-full border px-4 text-xs font-semibold transition-colors",
                  rangeMonths === preset.months
                    ? "border-cyan-glow/60 bg-cyan-glow/15 text-cyan-glow"
                    : "border-white/15 bg-white/5 text-slate-300 hover:bg-white/10",
                )}
              >
                {preset.label}
              </button>
            ))}
            <span className="ml-4 mr-1 text-xs font-medium uppercase tracking-wider text-slate-400">
              Category
            </span>
            {sampleCategories.map((cat) => {
              const on = selected.includes(cat);
              return (
                <button
                  key={cat}
                  type="button"
                  onClick={() => toggleCategory(cat)}
                  aria-pressed={on}
                  className={cn(
                    "min-h-[44px] rounded-full border px-4 text-xs font-semibold transition-colors",
                    on
                      ? "border-electric-500/60 bg-electric-500/15 text-electric-400"
                      : "border-white/15 bg-white/5 text-slate-400 hover:bg-white/10",
                  )}
                >
                  {cat}
                </button>
              );
            })}
          </div>

          {/* KPI cards */}
          <div className="grid grid-cols-2 gap-4 lg:grid-cols-4" role="group" aria-label="Key metrics">
            {kpis.map((kpi) => (
              <div
                key={kpi.label}
                className="rounded-xl border border-white/10 bg-white/[0.03] p-4"
              >
                <p className="text-xs text-slate-400">{kpi.label}</p>
                <p className="mt-1 font-display text-2xl font-bold text-white">
                  {formatKpi(kpi)}
                </p>
              </div>
            ))}
          </div>

          {/* Charts */}
          <div className="mt-8 grid gap-6 lg:grid-cols-2">
            <div>
              <h3 className="mb-3 text-sm font-semibold text-white">
                Monthly revenue trend
              </h3>
              <div className="h-[260px]">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart
                    data={lineData}
                    aria-label="Line chart: monthly sample revenue"
                  >
                    <CartesianGrid stroke="rgba(255,255,255,0.06)" />
                    <XAxis dataKey="month" tick={{ fill: "#94a3b8", fontSize: 12 }} />
                    <YAxis tick={{ fill: "#94a3b8", fontSize: 12 }} width={44} />
                    <Tooltip
                      contentStyle={{
                        background: "#0a0f24",
                        border: "1px solid rgba(255,255,255,0.12)",
                        borderRadius: 12,
                        color: "#fff",
                      }}
                      formatter={(value) => [`₹${value}k`, "Revenue"]}
                    />
                    <Line
                      type="monotone"
                      dataKey="revenue"
                      stroke="#22d3ee"
                      strokeWidth={2.5}
                      dot={false}
                      isAnimationActive={!reduceMotion}
                    />
                  </LineChart>
                </ResponsiveContainer>
              </div>
              {/* Screen-reader data summary */}
              <table className="sr-only">
                <caption>Monthly sample revenue (synthetic data)</caption>
                <tbody>
                  {lineData.map((d) => (
                    <tr key={d.month}>
                      <th scope="row">{d.month}</th>
                      <td>₹{d.revenue}k</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <div>
              <h3 className="mb-3 text-sm font-semibold text-white">
                Revenue by category <span className="font-normal text-slate-400">(click a bar to filter)</span>
              </h3>
              <div className="h-[260px]">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart
                    data={barData}
                    aria-label="Bar chart: sample revenue by category"
                  >
                    <CartesianGrid stroke="rgba(255,255,255,0.06)" />
                    <XAxis dataKey="category" tick={{ fill: "#94a3b8", fontSize: 12 }} />
                    <YAxis tick={{ fill: "#94a3b8", fontSize: 12 }} width={44} />
                    <Tooltip
                      contentStyle={{
                        background: "#0a0f24",
                        border: "1px solid rgba(255,255,255,0.12)",
                        borderRadius: 12,
                        color: "#fff",
                      }}
                      formatter={(value) => [`₹${value}k`, "Revenue"]}
                    />
                    <Bar
                      dataKey="revenue"
                      isAnimationActive={!reduceMotion}
                      onClick={(data) => {
                        const cat = (data as unknown as { category?: string })?.category;
                        if (cat) toggleCategory(cat);
                      }}
                      className="cursor-pointer"
                    >
                      {barData.map((entry, i) => (
                        <Cell
                          key={entry.category}
                          fill={BAR_COLORS[i % BAR_COLORS.length]}
                          fillOpacity={selected.includes(entry.category) ? 1 : 0.25}
                        />
                      ))}
                    </Bar>
                  </BarChart>
                </ResponsiveContainer>
              </div>
              <table className="sr-only">
                <caption>Sample revenue by category (synthetic data)</caption>
                <tbody>
                  {barData.map((d) => (
                    <tr key={d.category}>
                      <th scope="row">{d.category}</th>
                      <td>₹{d.revenue}k</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </GlassCard>
      </div>
    </section>
  );
}
