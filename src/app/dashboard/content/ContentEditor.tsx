"use client";

import { useMemo, useState } from "react";
import { useRouter } from "next/navigation";

type Group = { title: string; keys: string[] };

const INPUT_CLASS =
  "w-full rounded-md border border-[var(--color-border-strong)] bg-[var(--color-bg-primary)] px-4 py-3 text-[14px] text-[var(--color-ink)] focus:border-[var(--color-gold)] focus:outline-none";

const LABEL_CLASS =
  "block text-[11px] font-mono uppercase tracking-[0.18em] text-[var(--color-text-muted)]";

export function ContentEditor({
  groups,
  initial,
  defaults,
}: {
  groups: Group[];
  initial: Record<string, string>;
  defaults: Record<string, string>;
}) {
  const router = useRouter();
  const [values, setValues] = useState<Record<string, string>>(initial);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState<{
    kind: "ok" | "error";
    text: string;
  } | null>(null);

  const dirtyKeys = useMemo(
    () =>
      Object.keys(values).filter((k) => values[k] !== initial[k]),
    [values, initial]
  );

  function setValue(key: string, value: string) {
    setValues((prev) => ({ ...prev, [key]: value }));
    setMessage(null);
  }

  function resetKey(key: string) {
    setValue(key, defaults[key] ?? "");
  }

  async function save() {
    if (dirtyKeys.length === 0) return;
    setSaving(true);
    setMessage(null);
    const updates: Record<string, string> = {};
    for (const k of dirtyKeys) updates[k] = values[k];

    try {
      const res = await fetch("/api/dashboard/content", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({ updates }),
      });
      if (!res.ok) {
        const body = await res.json().catch(() => null);
        setMessage({ kind: "error", text: body?.error || "Save failed" });
      } else {
        setMessage({
          kind: "ok",
          text: `Saved ${dirtyKeys.length} change${
            dirtyKeys.length === 1 ? "" : "s"
          }.`,
        });
        router.refresh();
      }
    } catch {
      setMessage({ kind: "error", text: "Network error. Try again." });
    } finally {
      setSaving(false);
    }
  }

  return (
    <div className="space-y-10">
      {groups.map((group) => (
        <section key={group.title}>
          <h2 className="font-serif text-xl leading-tight text-[var(--color-ink)] md:text-2xl">
            {group.title}
          </h2>
          <div className="mt-6 space-y-6">
            {group.keys.map((key) => {
              const isLong = (values[key] || "").length > 80;
              const isDirty = values[key] !== initial[key];
              return (
                <div key={key}>
                  <div className="flex items-baseline justify-between gap-3">
                    <label htmlFor={key} className={LABEL_CLASS}>
                      {key}
                    </label>
                    <button
                      type="button"
                      onClick={() => resetKey(key)}
                      className="text-[10px] uppercase tracking-[0.18em] text-[var(--color-text-subtle)] transition-colors hover:text-[var(--color-gold)]"
                      title="Reset to default"
                    >
                      Reset
                    </button>
                  </div>
                  {isLong ? (
                    <textarea
                      id={key}
                      value={values[key] ?? ""}
                      onChange={(e) => setValue(key, e.target.value)}
                      rows={4}
                      className={`mt-2 ${INPUT_CLASS}`}
                    />
                  ) : (
                    <input
                      id={key}
                      type="text"
                      value={values[key] ?? ""}
                      onChange={(e) => setValue(key, e.target.value)}
                      className={`mt-2 ${INPUT_CLASS}`}
                    />
                  )}
                  {isDirty ? (
                    <p className="mt-1.5 text-[11px] text-[var(--color-gold)]">
                      Unsaved change
                    </p>
                  ) : null}
                </div>
              );
            })}
          </div>
        </section>
      ))}

      <div className="sticky bottom-0 -mx-6 border-t border-[var(--color-border)] bg-[var(--color-bg-primary)]/95 px-6 py-4 backdrop-blur md:-mx-12 md:px-12">
        <div className="flex items-center justify-between gap-4">
          <p className="text-[13px] text-[var(--color-text-muted)]">
            {dirtyKeys.length === 0
              ? "No unsaved changes."
              : `${dirtyKeys.length} unsaved change${
                  dirtyKeys.length === 1 ? "" : "s"
                }.`}
          </p>
          <div className="flex items-center gap-4">
            {message ? (
              <p
                className={
                  message.kind === "ok"
                    ? "text-[13px] text-[var(--color-gold)]"
                    : "text-[13px] text-red-600 dark:text-red-400"
                }
              >
                {message.text}
              </p>
            ) : null}
            <button
              type="button"
              onClick={save}
              disabled={saving || dirtyKeys.length === 0}
              className="inline-flex items-center justify-center rounded-full border border-[var(--color-gold)] bg-[var(--color-gold)] px-6 py-2.5 text-[11px] uppercase tracking-[0.22em] text-white shadow-[0_8px_24px_var(--color-accent-glow)] transition-all hover:shadow-[0_12px_36px_var(--color-accent-glow-strong)] disabled:opacity-50 disabled:hover:shadow-[0_8px_24px_var(--color-accent-glow)]"
            >
              {saving ? "Saving…" : "Save changes"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
