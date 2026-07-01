"use client";

import { useEffect, useState } from "react";
import { StatCounter } from "@/components/ui/StatCounter";
import { getDictionary, type Locale } from "@/lib/i18n";

interface DashboardStatsProps {
  admins: number;
  overrides: number;
  /** Total number of editable content fields (CONTENT_DEFAULTS). */
  totalFields: number;
  locale?: Locale;
}

export function DashboardStats({
  admins,
  overrides,
  totalFields,
  locale = "en",
}: DashboardStatsProps) {
  const d = getDictionary(locale).dashboard.overview;
  const pct =
    totalFields > 0
      ? Math.min(100, Math.round((overrides / totalFields) * 100))
      : 0;

  return (
    <div className="mt-10 grid grid-cols-1 gap-4 lg:grid-cols-3 md:gap-6">
      {/* Counter cards */}
      <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:gap-6 lg:col-span-2 lg:grid-cols-2">
        <StatCard
          label={d.admins}
          delay="0ms"
          value={
            <StatCounter
              value={admins}
              className="font-serif text-3xl leading-none text-[var(--color-ink)] md:text-4xl"
            />
          }
        />
        <StatCard
          label={d.overrides}
          delay="80ms"
          value={
            <StatCounter
              value={overrides}
              className="font-serif text-3xl leading-none text-[var(--color-ink)] md:text-4xl"
            />
          }
        />
        <StatCard
          label={d.editableFields}
          delay="160ms"
          value={
            <StatCounter
              value={totalFields}
              className="font-serif text-3xl leading-none text-[var(--color-ink)] md:text-4xl"
            />
          }
        />
        <StatCard
          label={d.status}
          delay="240ms"
          value={
            <span className="inline-flex items-center gap-2.5 font-serif text-2xl leading-none text-[var(--color-ink)] md:text-3xl">
              <span className="relative flex h-2.5 w-2.5">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-70" />
                <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-emerald-500" />
              </span>
              {d.online}
            </span>
          }
        />
      </div>

      {/* Customization donut */}
      <div className="premium-card flex flex-col items-center justify-center gap-4 !p-6 text-center">
        <p className="text-[10px] uppercase tracking-[0.28em] text-[var(--color-text-muted)]">
          {d.customization}
        </p>
        <ProgressRing pct={pct} />
        <p className="text-[12px] leading-[1.5] text-[var(--color-text-muted)]">
          <span className="font-mono text-[var(--color-ink)]">{overrides}</span>{" "}
          {d.customizedOf}{" "}
          <span className="font-mono text-[var(--color-ink)]">
            {totalFields}
          </span>{" "}
          {d.customizedFields}
        </p>
      </div>
    </div>
  );
}

function StatCard({
  label,
  value,
  delay,
}: {
  label: string;
  value: React.ReactNode;
  delay: string;
}) {
  return (
    <div
      data-reveal="scale"
      style={{ ["--reveal-delay" as string]: delay }}
      className="premium-card !p-6"
    >
      <p className="text-[10px] uppercase tracking-[0.28em] text-[var(--color-text-muted)]">
        {label}
      </p>
      <p className="mt-3">{value}</p>
    </div>
  );
}

function ProgressRing({ pct }: { pct: number }) {
  const r = 46;
  const circumference = 2 * Math.PI * r;
  const target = circumference - (pct / 100) * circumference;
  const [offset, setOffset] = useState(circumference);

  useEffect(() => {
    // Defer out of the synchronous effect body; the CSS transition on
    // `.ring-progress` is itself disabled under prefers-reduced-motion.
    const id = requestAnimationFrame(() => setOffset(target));
    return () => cancelAnimationFrame(id);
  }, [target]);

  return (
    <div className="relative h-32 w-32">
      <svg
        viewBox="0 0 110 110"
        className="h-full w-full -rotate-90"
        aria-hidden="true"
      >
        <circle
          cx="55"
          cy="55"
          r={r}
          fill="none"
          stroke="var(--color-border-strong)"
          strokeWidth="6"
        />
        <circle
          cx="55"
          cy="55"
          r={r}
          fill="none"
          stroke="var(--color-gold)"
          strokeWidth="6"
          strokeLinecap="round"
          strokeDasharray={circumference}
          strokeDashoffset={offset}
          className="ring-progress"
          style={{ filter: "drop-shadow(0 0 6px var(--color-accent-glow))" }}
        />
      </svg>
      <div className="absolute inset-0 flex items-center justify-center">
        <StatCounter
          value={pct}
          suffix="%"
          className="font-serif text-2xl text-[var(--color-ink)]"
        />
      </div>
    </div>
  );
}
