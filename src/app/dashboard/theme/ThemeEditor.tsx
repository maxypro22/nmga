"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

type ThemeShape = {
  gold: string;
  goldSubtle: string;
  goldDark: string;
  goldSubtleDark: string;
};

const FIELDS: { key: keyof ThemeShape; label: string; mode: "light" | "dark" }[] = [
  { key: "gold", label: "Accent — Light mode", mode: "light" },
  { key: "goldSubtle", label: "Accent subtle — Light mode", mode: "light" },
  { key: "goldDark", label: "Accent — Dark mode", mode: "dark" },
  { key: "goldSubtleDark", label: "Accent subtle — Dark mode", mode: "dark" },
];

export function ThemeEditor({
  initial,
  defaults,
}: {
  initial: ThemeShape;
  defaults: ThemeShape;
}) {
  const router = useRouter();
  const [values, setValues] = useState<ThemeShape>(initial);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState<{
    kind: "ok" | "error";
    text: string;
  } | null>(null);

  const dirty =
    values.gold !== initial.gold ||
    values.goldSubtle !== initial.goldSubtle ||
    values.goldDark !== initial.goldDark ||
    values.goldSubtleDark !== initial.goldSubtleDark;

  function setColor(key: keyof ThemeShape, value: string) {
    setValues((prev) => ({ ...prev, [key]: value }));
    setMessage(null);
  }

  async function save() {
    setSaving(true);
    setMessage(null);
    try {
      const res = await fetch("/api/dashboard/theme", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({ theme: values }),
      });
      if (!res.ok) {
        const body = await res.json().catch(() => null);
        setMessage({ kind: "error", text: body?.error || "Save failed" });
      } else {
        setMessage({ kind: "ok", text: "Theme saved." });
        router.refresh();
      }
    } catch {
      setMessage({ kind: "error", text: "Network error. Try again." });
    } finally {
      setSaving(false);
    }
  }

  function resetAll() {
    setValues(defaults);
    setMessage(null);
  }

  return (
    <div className="space-y-8">
      <div className="grid gap-6 md:grid-cols-2">
        {FIELDS.map((field) => (
          <div key={field.key} className="premium-card !p-6">
            <p className="text-[11px] uppercase tracking-[0.18em] text-[var(--color-text-muted)]">
              {field.label}
            </p>
            <div className="mt-4 flex items-center gap-4">
              <input
                type="color"
                value={values[field.key]}
                onChange={(e) => setColor(field.key, e.target.value)}
                aria-label={field.label}
                className="h-12 w-16 cursor-pointer rounded-md border border-[var(--color-border-strong)] bg-[var(--color-bg-primary)] p-1"
              />
              <input
                type="text"
                value={values[field.key]}
                onChange={(e) => setColor(field.key, e.target.value)}
                className="flex-1 rounded-md border border-[var(--color-border-strong)] bg-[var(--color-bg-primary)] px-3 py-2 font-mono text-[13px] text-[var(--color-ink)] focus:border-[var(--color-gold)] focus:outline-none"
              />
            </div>
            <div className="mt-4 flex items-center gap-3">
              <span
                aria-hidden
                className="inline-block h-8 w-8 rounded-full border border-[var(--color-border-strong)]"
                style={{ backgroundColor: values[field.key] }}
              />
              <span className="text-[11px] text-[var(--color-text-subtle)]">
                Preview swatch
              </span>
            </div>
          </div>
        ))}
      </div>

      <div className="flex items-center justify-between gap-4 border-t border-[var(--color-border)] pt-6">
        <button
          type="button"
          onClick={resetAll}
          className="text-[12px] uppercase tracking-[0.22em] text-[var(--color-text-muted)] transition-colors hover:text-[var(--color-ink)]"
        >
          Reset to defaults
        </button>
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
            disabled={saving || !dirty}
            className="inline-flex items-center justify-center rounded-full border border-[var(--color-gold)] bg-[var(--color-gold)] px-6 py-2.5 text-[11px] uppercase tracking-[0.22em] text-white shadow-[0_8px_24px_var(--color-accent-glow)] transition-all hover:shadow-[0_12px_36px_var(--color-accent-glow-strong)] disabled:opacity-50"
          >
            {saving ? "Saving…" : "Save theme"}
          </button>
        </div>
      </div>
    </div>
  );
}
