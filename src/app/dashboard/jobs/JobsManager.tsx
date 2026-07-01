"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import type { JobRow } from "@/lib/jobs";

const INPUT =
  "w-full rounded-md border border-[var(--color-border-strong)] bg-[var(--color-bg-primary)] px-3 py-2.5 text-[14px] text-[var(--color-ink)] focus:border-[var(--color-gold)] focus:outline-none";
const TEXTAREA =
  "w-full rounded-md border border-[var(--color-border-strong)] bg-[var(--color-bg-primary)] px-3 py-2.5 text-[14px] text-[var(--color-ink)] focus:border-[var(--color-gold)] focus:outline-none resize-y";
const LABEL =
  "block text-[11px] font-mono uppercase tracking-[0.18em] text-[var(--color-text-muted)] mb-1.5";

const DIVISIONS = ["Hospitality", "Real Estate", "Construction", "Events", "Services", "Technology", "AI", "Corporate"];
const TYPES = ["Full-time", "Part-time", "Contract"];

const EMPTY_FORM = { title: "", division: "Hospitality", type: "Full-time", location: "Doha, Qatar", description: "" };

type Props = { initialJobs: JobRow[] };

export function JobsManager({ initialJobs }: Props) {
  const router = useRouter();
  const [jobs, setJobs] = useState<JobRow[]>(initialJobs);
  const [showForm, setShowForm] = useState(false);
  const [form, setForm] = useState(EMPTY_FORM);
  const [busy, setBusy] = useState<string | null>(null);
  const [msg, setMsg] = useState<{ kind: "ok" | "error"; text: string } | null>(null);

  function setField(key: keyof typeof form, val: string) {
    setForm((p) => ({ ...p, [key]: val }));
    setMsg(null);
  }

  async function addJob() {
    if (!form.title.trim()) { setMsg({ kind: "error", text: "Title is required." }); return; }
    setBusy("add");
    setMsg(null);
    try {
      const res = await fetch("/api/dashboard/jobs", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify(form),
      });
      const data = await res.json();
      if (!res.ok) { setMsg({ kind: "error", text: data.error || "Failed to add job." }); return; }
      setJobs((prev) => [data.job, ...prev]);
      setForm(EMPTY_FORM);
      setShowForm(false);
      setMsg({ kind: "ok", text: "Job listing added — visible on the Careers page now." });
      router.refresh();
    } catch {
      setMsg({ kind: "error", text: "Network error." });
    } finally {
      setBusy(null);
    }
  }

  async function toggleActive(job: JobRow) {
    setBusy(job.id);
    try {
      const res = await fetch(`/api/dashboard/jobs/${job.id}`, {
        method: "PATCH",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({ is_active: !job.is_active }),
      });
      const data = await res.json();
      if (!res.ok) { setMsg({ kind: "error", text: data.error || "Failed to update." }); return; }
      setJobs((prev) => prev.map((j) => (j.id === job.id ? data.job : j)));
      router.refresh();
    } catch {
      setMsg({ kind: "error", text: "Network error." });
    } finally {
      setBusy(null);
    }
  }

  async function deleteJob(id: string) {
    if (!confirm("Delete this job listing? This cannot be undone.")) return;
    setBusy(id + "-del");
    try {
      const res = await fetch(`/api/dashboard/jobs/${id}`, { method: "DELETE" });
      if (!res.ok) { const d = await res.json(); setMsg({ kind: "error", text: d.error || "Failed to delete." }); return; }
      setJobs((prev) => prev.filter((j) => j.id !== id));
      setMsg({ kind: "ok", text: "Job listing deleted." });
      router.refresh();
    } catch {
      setMsg({ kind: "error", text: "Network error." });
    } finally {
      setBusy(null);
    }
  }

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex items-center justify-between gap-4">
        <p className="text-[14px] text-[var(--color-text-muted)]">
          {jobs.length} listing{jobs.length !== 1 ? "s" : ""}
          {" · "}
          {jobs.filter((j) => j.is_active).length} active
        </p>
        <button
          type="button"
          onClick={() => { setShowForm((v) => !v); setMsg(null); }}
          className="inline-flex items-center gap-2 rounded-full border border-[var(--color-gold)] bg-[var(--color-gold)] px-5 py-2.5 text-[11px] uppercase tracking-[0.2em] text-white transition-colors hover:bg-transparent hover:text-[var(--color-gold)]"
        >
          {showForm ? "Cancel" : "+ Add Job"}
        </button>
      </div>

      {/* Add form */}
      {showForm && (
        <div className="rounded-2xl border border-[var(--color-border-strong)] bg-[var(--color-bg-secondary)] p-6 md:p-8">
          <h3 className="font-serif text-xl text-[var(--color-ink)]">New Job Listing</h3>
          <div className="mt-6 grid gap-5 sm:grid-cols-2">
            <div className="sm:col-span-2">
              <label className={LABEL}>Job Title *</label>
              <input type="text" value={form.title} onChange={(e) => setField("title", e.target.value)} className={INPUT} placeholder="e.g. Senior Project Manager" />
            </div>
            <div>
              <label className={LABEL}>Division</label>
              <select value={form.division} onChange={(e) => setField("division", e.target.value)} className={INPUT}>
                {DIVISIONS.map((d) => <option key={d}>{d}</option>)}
              </select>
            </div>
            <div>
              <label className={LABEL}>Employment Type</label>
              <select value={form.type} onChange={(e) => setField("type", e.target.value)} className={INPUT}>
                {TYPES.map((t) => <option key={t}>{t}</option>)}
              </select>
            </div>
            <div className="sm:col-span-2">
              <label className={LABEL}>Location</label>
              <input type="text" value={form.location} onChange={(e) => setField("location", e.target.value)} className={INPUT} placeholder="Doha, Qatar" />
            </div>
            <div className="sm:col-span-2">
              <label className={LABEL}>Description <span className="normal-case tracking-normal text-[10px] opacity-60">(optional — shown on the careers page)</span></label>
              <textarea
                value={form.description}
                onChange={(e) => setField("description", e.target.value)}
                rows={4}
                className={TEXTAREA}
                placeholder="Brief description of the role, responsibilities, or requirements…"
              />
            </div>
          </div>
          <div className="mt-6 flex items-center gap-4">
            <button
              type="button"
              onClick={addJob}
              disabled={busy === "add"}
              className="inline-flex items-center rounded-full border border-[var(--color-gold)] bg-[var(--color-gold)] px-6 py-2.5 text-[11px] uppercase tracking-[0.2em] text-white shadow-[0_8px_24px_var(--color-accent-glow)] transition-all hover:shadow-[0_12px_36px_var(--color-accent-glow-strong)] disabled:opacity-50"
            >
              {busy === "add" ? "Adding…" : "Add listing"}
            </button>
          </div>
        </div>
      )}

      {/* Message */}
      {msg && (
        <p className={msg.kind === "ok" ? "text-[13px] text-[var(--color-gold)]" : "text-[13px] text-red-600 dark:text-red-400"}>
          {msg.text}
        </p>
      )}

      {/* Jobs list */}
      {jobs.length === 0 ? (
        <p className="py-12 text-center text-[14px] text-[var(--color-text-muted)]">
          No job listings yet. Click &ldquo;+ Add Job&rdquo; to create the first one.
        </p>
      ) : (
        <div className="divide-y divide-[var(--color-border)] rounded-2xl border border-[var(--color-border-strong)] bg-[var(--color-bg-primary)]">
          {jobs.map((job) => (
            <div key={job.id} className="flex flex-col gap-3 p-5 md:p-6">
              <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
                <div className="min-w-0">
                  <p className={`font-serif text-base leading-snug text-[var(--color-ink)] md:text-lg ${!job.is_active ? "opacity-50 line-through" : ""}`}>
                    {job.title}
                  </p>
                  <p className="mt-1 flex flex-wrap gap-x-3 gap-y-0.5 text-[12px] text-[var(--color-text-muted)]">
                    <span>{job.division}</span>
                    <span>·</span>
                    <span>{job.type}</span>
                    <span>·</span>
                    <span>{job.location}</span>
                  </p>
                  {job.description && (
                    <p className="mt-2 text-[13px] leading-relaxed text-[var(--color-text-muted)] line-clamp-2">
                      {job.description}
                    </p>
                  )}
                </div>
                <div className="flex shrink-0 items-center gap-3">
                  <button
                    type="button"
                    onClick={() => toggleActive(job)}
                    disabled={busy === job.id}
                    className={`rounded-full border px-3.5 py-1.5 text-[10px] uppercase tracking-[0.18em] transition-colors disabled:opacity-50 ${
                      job.is_active
                        ? "border-[var(--color-gold)] text-[var(--color-gold)] hover:bg-[var(--color-gold)] hover:text-white"
                        : "border-[var(--color-border-strong)] text-[var(--color-text-muted)] hover:border-[var(--color-gold)] hover:text-[var(--color-gold)]"
                    }`}
                  >
                    {busy === job.id ? "…" : job.is_active ? "Active" : "Inactive"}
                  </button>
                  <button
                    type="button"
                    onClick={() => deleteJob(job.id)}
                    disabled={busy === job.id + "-del"}
                    className="rounded-full border border-[var(--color-border-strong)] px-3.5 py-1.5 text-[10px] uppercase tracking-[0.18em] text-[var(--color-text-muted)] transition-colors hover:border-red-500 hover:text-red-600 disabled:opacity-50 dark:hover:text-red-400"
                  >
                    {busy === job.id + "-del" ? "…" : "Delete"}
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
