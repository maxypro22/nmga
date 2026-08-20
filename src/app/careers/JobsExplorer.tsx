"use client";

import { useState } from "react";
import { Icon, type IconName } from "@/components/ui/Icon";
import type { JobRow } from "@/lib/jobs";

export type ExplorerJob = Pick<
  JobRow,
  "id" | "title" | "division" | "type" | "location" | "description"
>;

export type ExplorerDivision = {
  slug: string;
  /** Localised division name shown to the user. */
  name: string;
  icon: IconName;
  /** Localised names of the operating companies inside this division. */
  companies: string[];
  jobs: ExplorerJob[];
};

export type ExplorerLabels = {
  selectPrompt: string;
  back: string;
  rolesOne: string;
  rolesMany: string;
  rolesNone: string;
  viewRoles: string;
  companiesLabel: string;
  emptyState: string;
  applyLabel: string;
  divisionLabel: string;
};

function rolesLabel(count: number, labels: ExplorerLabels): string {
  if (count === 0) return labels.rolesNone;
  if (count === 1) return labels.rolesOne;
  return labels.rolesMany.replace("{n}", String(count));
}

export function JobsExplorer({
  divisions,
  labels,
  applyEmail,
}: {
  divisions: ExplorerDivision[];
  labels: ExplorerLabels;
  applyEmail: string;
}) {
  const [selectedSlug, setSelectedSlug] = useState<string | null>(null);
  const selected = divisions.find((d) => d.slug === selectedSlug) ?? null;

  if (!selected) {
    return (
      <div>
        <p className="mb-8 text-[12px] uppercase tracking-[0.22em] text-[var(--color-gold)]">
          {labels.selectPrompt}
        </p>
        <ul
          data-reveal-stagger="70"
          className="grid gap-4 sm:grid-cols-2 md:gap-6 lg:grid-cols-3"
        >
          {divisions.map((division) => {
            const count = division.jobs.length;
            const disabled = count === 0;
            return (
              <li key={division.slug} data-reveal>
                <button
                  type="button"
                  disabled={disabled}
                  onClick={() => setSelectedSlug(division.slug)}
                  aria-label={`${division.name} — ${rolesLabel(count, labels)}`}
                  className={`premium-card group flex h-full w-full flex-col items-start gap-4 text-start ${
                    disabled
                      ? "cursor-not-allowed opacity-55"
                      : "cursor-pointer"
                  }`}
                >
                  <span className="flex w-full items-center justify-between">
                    <span className="icon-tile">
                      <Icon name={division.icon} size={22} />
                    </span>
                    <span
                      className={`rounded-full border px-3 py-1 text-[10px] uppercase tracking-[0.16em] ${
                        disabled
                          ? "border-[var(--color-border-strong)] text-[var(--color-text-muted)]"
                          : "border-[var(--color-gold)]/40 text-[var(--color-gold)]"
                      }`}
                    >
                      {rolesLabel(count, labels)}
                    </span>
                  </span>

                  <span className="font-serif text-xl leading-tight tracking-[-0.005em] text-[var(--color-ink)] md:text-2xl">
                    {division.name}
                  </span>

                  {division.companies.length > 0 && (
                    <span className="text-[13px] leading-[1.7] text-[var(--color-text-muted)]">
                      {division.companies.join(" · ")}
                    </span>
                  )}

                  {!disabled && (
                    <span className="mt-auto inline-flex items-center gap-2 pt-2 text-[11px] uppercase tracking-[0.18em] text-[var(--color-ink)] transition-colors group-hover:text-[var(--color-gold)]">
                      {labels.viewRoles}
                      <span
                        aria-hidden
                        className="transition-transform group-hover:translate-x-1 rtl:rotate-180"
                      >
                        <Icon name="arrow-right" size={12} />
                      </span>
                    </span>
                  )}
                </button>
              </li>
            );
          })}
        </ul>
      </div>
    );
  }

  return (
    <div key={selected.slug} className="jobs-panel">
      {/* Back to division picker */}
      <button
        type="button"
        onClick={() => setSelectedSlug(null)}
        className="inline-flex items-center gap-2 text-[11px] uppercase tracking-[0.22em] text-[var(--color-text-muted)] transition-colors hover:text-[var(--color-gold)]"
      >
        <span aria-hidden className="rotate-180 rtl:rotate-0">
          <Icon name="arrow-right" size={12} />
        </span>
        {labels.back}
      </button>

      {/* Selected division header */}
      <div className="mt-6 flex flex-col gap-5 border-b border-[var(--color-border)] pb-8 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex items-center gap-4">
          <span className="icon-tile shrink-0">
            <Icon name={selected.icon} size={22} />
          </span>
          <div>
            <h3 className="font-serif text-[clamp(1.5rem,3vw,2.25rem)] leading-tight tracking-[-0.01em] text-[var(--color-ink)]">
              {selected.name}
            </h3>
            <p className="mt-1 text-[12px] uppercase tracking-[0.18em] text-[var(--color-gold)]">
              {rolesLabel(selected.jobs.length, labels)}
            </p>
          </div>
        </div>

        {selected.companies.length > 0 && (
          <div className="sm:text-end">
            <p className="text-[10px] uppercase tracking-[0.24em] text-[var(--color-text-muted)]">
              {labels.companiesLabel}
            </p>
            <div className="mt-2 flex flex-wrap gap-2 sm:justify-end">
              {selected.companies.map((company) => (
                <span
                  key={company}
                  className="rounded-full border border-[var(--color-border-strong)] px-3 py-1 text-[11px] text-[var(--color-text-muted)]"
                >
                  {company}
                </span>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Roles inside the selected division */}
      {selected.jobs.length === 0 ? (
        <p className="mt-10 max-w-[52ch] text-[14px] leading-[1.8] text-[var(--color-text-muted)]">
          {labels.emptyState}
        </p>
      ) : (
        <ul className="divide-y divide-[var(--color-border)]">
          {selected.jobs.map((job) => (
            <li key={job.id || job.title}>
              <div className="group flex flex-col gap-4 py-6 sm:flex-row sm:items-center sm:justify-between md:py-7">
                <div>
                  <h4 className="font-serif text-lg leading-tight text-[var(--color-ink)] transition-colors group-hover:text-[var(--color-gold)] md:text-xl">
                    {job.title}
                  </h4>
                  <div className="mt-2 flex flex-wrap items-center gap-x-4 gap-y-1">
                    <span className="flex items-center gap-1.5 text-[12px] text-[var(--color-text-muted)]">
                      <Icon name="location" size={12} />
                      {job.location}
                    </span>
                    <span className="rounded-full border border-[var(--color-border-strong)] px-2.5 py-0.5 text-[10px] uppercase tracking-[0.15em] text-[var(--color-text-muted)]">
                      {job.type}
                    </span>
                  </div>
                  {job.description && (
                    <p className="mt-3 max-w-[62ch] text-[13px] leading-relaxed text-[var(--color-text-muted)]">
                      {job.description}
                    </p>
                  )}
                </div>
                <a
                  href={`mailto:${applyEmail}?subject=Application: ${encodeURIComponent(job.title)}`}
                  className="inline-flex shrink-0 items-center gap-2 rounded-full border border-[var(--color-border-strong)] px-5 py-2.5 text-[11px] uppercase tracking-[0.18em] text-[var(--color-ink)] transition-all hover:border-[var(--color-gold)] hover:text-[var(--color-gold)]"
                >
                  {labels.applyLabel}
                  <span aria-hidden className="rtl:rotate-180">
                    <Icon name="arrow-right" size={12} />
                  </span>
                </a>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
