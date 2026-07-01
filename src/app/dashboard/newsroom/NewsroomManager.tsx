"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import type { PressReleaseRow } from "@/lib/newsroom";

const INPUT =
  "w-full rounded-md border border-[var(--color-border-strong)] bg-[var(--color-bg-primary)] px-3 py-2.5 text-[14px] text-[var(--color-ink)] focus:border-[var(--color-gold)] focus:outline-none";
const TEXTAREA =
  "w-full rounded-md border border-[var(--color-border-strong)] bg-[var(--color-bg-primary)] px-3 py-2.5 text-[14px] text-[var(--color-ink)] focus:border-[var(--color-gold)] focus:outline-none resize-y";
const LABEL =
  "block text-[11px] font-mono uppercase tracking-[0.18em] text-[var(--color-text-muted)] mb-1.5";

const CATEGORIES = [
  "Corporate", "Hospitality", "Real Estate", "Construction",
  "Events", "Services", "Technology", "Technology & AI", "AI",
];
const DIVISIONS = [
  "NMJ Group", "Hospitality Division", "Real Estate Division", "Construction Division",
  "Events Division", "Services Division", "Technology Division", "AI Division",
];

type Props = { initialReleases: PressReleaseRow[] };

const EMPTY_FORM = {
  date_label: "",
  category: "Corporate",
  headline: "",
  body: "",
  division: "NMJ Group",
};

export function NewsroomManager({ initialReleases }: Props) {
  const router = useRouter();
  const [releases, setReleases] = useState<PressReleaseRow[]>(initialReleases);
  const [showForm, setShowForm] = useState(false);
  const [form, setForm] = useState(EMPTY_FORM);
  const [busy, setBusy] = useState<string | null>(null);
  const [msg, setMsg] = useState<{ kind: "ok" | "error"; text: string } | null>(null);

  function setField(key: keyof typeof form, val: string) {
    setForm((p) => ({ ...p, [key]: val }));
    setMsg(null);
  }

  async function addRelease() {
    if (!form.headline.trim()) { setMsg({ kind: "error", text: "Headline is required." }); return; }
    if (!form.body.trim()) { setMsg({ kind: "error", text: "Body text is required." }); return; }
    if (!form.date_label.trim()) { setMsg({ kind: "error", text: "Date is required." }); return; }
    setBusy("add");
    setMsg(null);
    try {
      const res = await fetch("/api/dashboard/newsroom", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify(form),
      });
      const data = await res.json();
      if (!res.ok) { setMsg({ kind: "error", text: data.error || "Failed to add." }); return; }
      setReleases((prev) => [data.release, ...prev]);
      setForm(EMPTY_FORM);
      setShowForm(false);
      setMsg({ kind: "ok", text: "Press release published." });
      router.refresh();
    } catch {
      setMsg({ kind: "error", text: "Network error." });
    } finally {
      setBusy(null);
    }
  }

  async function togglePublished(item: PressReleaseRow) {
    setBusy(item.id);
    try {
      const res = await fetch(`/api/dashboard/newsroom/${item.id}`, {
        method: "PATCH",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({ is_published: !item.is_published }),
      });
      const data = await res.json();
      if (!res.ok) { setMsg({ kind: "error", text: data.error || "Failed to update." }); return; }
      setReleases((prev) => prev.map((r) => (r.id === item.id ? data.release : r)));
      router.refresh();
    } catch {
      setMsg({ kind: "error", text: "Network error." });
    } finally {
      setBusy(null);
    }
  }

  async function deleteRelease(id: string) {
    if (!confirm("Delete this press release? This cannot be undone.")) return;
    setBusy(id + "-del");
    try {
      const res = await fetch(`/api/dashboard/newsroom/${id}`, { method: "DELETE" });
      if (!res.ok) { const d = await res.json(); setMsg({ kind: "error", text: d.error || "Failed to delete." }); return; }
      setReleases((prev) => prev.filter((r) => r.id !== id));
      setMsg({ kind: "ok", text: "Press release deleted." });
      router.refresh();
    } catch {
      setMsg({ kind: "error", text: "Network error." });
    } finally {
      setBusy(null);
    }
  }

  return (
    <div className="space-y-8">
      {/* Header row */}
      <div className="flex items-center justify-between gap-4">
        <p className="text-[14px] text-[var(--color-text-muted)]">
          {releases.length} release{releases.length !== 1 ? "s" : ""}
          {" · "}
          {releases.filter((r) => r.is_published).length} published
        </p>
        <button
          type="button"
          onClick={() => { setShowForm((v) => !v); setMsg(null); }}
          className="inline-flex items-center gap-2 rounded-full border border-[var(--color-gold)] bg-[var(--color-gold)] px-5 py-2.5 text-[11px] uppercase tracking-[0.2em] text-white transition-colors hover:bg-transparent hover:text-[var(--color-gold)]"
        >
          {showForm ? "Cancel" : "+ Add Release"}
        </button>
      </div>

      {/* Add form */}
      {showForm && (
        <div className="rounded-2xl border border-[var(--color-border-strong)] bg-[var(--color-bg-secondary)] p-6 md:p-8">
          <h3 className="font-serif text-xl text-[var(--color-ink)]">New Press Release</h3>
          <div className="mt-6 grid gap-5 sm:grid-cols-2">
            <div>
              <label className={LABEL}>Date (display)</label>
              <input type="text" value={form.date_label} onChange={(e) => setField("date_label", e.target.value)} className={INPUT} placeholder="e.g. June 2026" />
            </div>
            <div>
              <label className={LABEL}>Category</label>
              <select value={form.category} onChange={(e) => setField("category", e.target.value)} className={INPUT}>
                {CATEGORIES.map((c) => <option key={c}>{c}</option>)}
              </select>
            </div>
            <div>
              <label className={LABEL}>Division</label>
              <select value={form.division} onChange={(e) => setField("division", e.target.value)} className={INPUT}>
                {DIVISIONS.map((d) => <option key={d}>{d}</option>)}
              </select>
            </div>
            <div className="sm:col-span-2">
              <label className={LABEL}>Headline</label>
              <input type="text" value={form.headline} onChange={(e) => setField("headline", e.target.value)} className={INPUT} placeholder="Press release headline…" />
            </div>
            <div className="sm:col-span-2">
              <label className={LABEL}>Body</label>
              <textarea value={form.body} onChange={(e) => setField("body", e.target.value)} rows={5} className={TEXTAREA} placeholder="Full press release content…" />
            </div>
          </div>
          <div className="mt-6 flex items-center gap-4">
            <button
              type="button"
              onClick={addRelease}
              disabled={busy === "add"}
              className="inline-flex items-center rounded-full border border-[var(--color-gold)] bg-[var(--color-gold)] px-6 py-2.5 text-[11px] uppercase tracking-[0.2em] text-white shadow-[0_8px_24px_var(--color-accent-glow)] transition-all hover:shadow-[0_12px_36px_var(--color-accent-glow-strong)] disabled:opacity-50"
            >
              {busy === "add" ? "Publishing…" : "Publish release"}
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

      {/* Releases list */}
      {releases.length === 0 ? (
        <p className="py-12 text-center text-[14px] text-[var(--color-text-muted)]">
          No press releases yet. Click "+ Add Release" to create the first one.
        </p>
      ) : (
        <div className="divide-y divide-[var(--color-border)] rounded-2xl border border-[var(--color-border-strong)] bg-[var(--color-bg-primary)]">
          {releases.map((item) => (
            <div key={item.id} className="flex flex-col gap-3 p-5 md:p-6">
              <div className="flex items-start justify-between gap-4">
                <div className="min-w-0">
                  <div className="flex flex-wrap items-center gap-2">
                    <span className="text-[10px] uppercase tracking-[0.2em] text-[var(--color-gold)]">{item.category}</span>
                    <span className="text-[10px] text-[var(--color-text-muted)]">{item.date_label}</span>
                    <span className="rounded-full border border-[var(--color-border-strong)] px-2 py-0.5 text-[9px] uppercase tracking-[0.15em] text-[var(--color-text-muted)]">{item.division}</span>
                  </div>
                  <h3 className={`mt-2 font-serif text-base leading-snug text-[var(--color-ink)] md:text-lg ${!item.is_published ? "opacity-50" : ""}`}>
                    {item.headline}
                  </h3>
                  <p className="mt-2 line-clamp-2 text-[13px] leading-relaxed text-[var(--color-text-muted)]">
                    {item.body}
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <button
                  type="button"
                  onClick={() => togglePublished(item)}
                  disabled={busy === item.id}
                  className={`rounded-full border px-3.5 py-1.5 text-[10px] uppercase tracking-[0.18em] transition-colors disabled:opacity-50 ${
                    item.is_published
                      ? "border-[var(--color-gold)] text-[var(--color-gold)] hover:bg-[var(--color-gold)] hover:text-white"
                      : "border-[var(--color-border-strong)] text-[var(--color-text-muted)] hover:border-[var(--color-gold)] hover:text-[var(--color-gold)]"
                  }`}
                >
                  {busy === item.id ? "…" : item.is_published ? "Published" : "Draft"}
                </button>
                <button
                  type="button"
                  onClick={() => deleteRelease(item.id)}
                  disabled={busy === item.id + "-del"}
                  className="rounded-full border border-[var(--color-border-strong)] px-3.5 py-1.5 text-[10px] uppercase tracking-[0.18em] text-[var(--color-text-muted)] transition-colors hover:border-red-500 hover:text-red-600 disabled:opacity-50 dark:hover:text-red-400"
                >
                  {busy === item.id + "-del" ? "…" : "Delete"}
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
