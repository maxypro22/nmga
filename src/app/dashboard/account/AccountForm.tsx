"use client";

import { useState, type FormEvent } from "react";
import { PasswordInput } from "@/components/ui/PasswordInput";

const LABEL_CLASS =
  "block text-[11px] uppercase tracking-[0.22em] text-[var(--color-text-muted)]";

export function AccountForm() {
  const [busy, setBusy] = useState(false);
  const [message, setMessage] = useState<{
    kind: "ok" | "error";
    text: string;
  } | null>(null);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setMessage(null);
    const form = event.currentTarget;
    const data = new FormData(form);
    const currentPassword = String(data.get("current") ?? "");
    const newPassword = String(data.get("next") ?? "");
    const confirmPassword = String(data.get("confirm") ?? "");

    if (newPassword !== confirmPassword) {
      setMessage({ kind: "error", text: "New passwords don't match." });
      return;
    }
    if (newPassword.length < 10) {
      setMessage({
        kind: "error",
        text: "New password must be at least 10 characters.",
      });
      return;
    }

    setBusy(true);
    try {
      const res = await fetch("/api/auth/change-password", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({ currentPassword, newPassword }),
      });
      if (!res.ok) {
        const body = await res.json().catch(() => null);
        setMessage({ kind: "error", text: body?.error || "Update failed" });
      } else {
        setMessage({ kind: "ok", text: "Password updated." });
        form.reset();
      }
    } catch {
      setMessage({ kind: "error", text: "Network error. Try again." });
    } finally {
      setBusy(false);
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      <div>
        <label htmlFor="current" className={LABEL_CLASS}>
          Current password
        </label>
        <PasswordInput
          id="current"
          name="current"
          autoComplete="current-password"
          required
          className="mt-2"
        />
      </div>
      <div>
        <label htmlFor="next" className={LABEL_CLASS}>
          New password (min 10 chars)
        </label>
        <PasswordInput
          id="next"
          name="next"
          autoComplete="new-password"
          required
          minLength={10}
          className="mt-2"
        />
      </div>
      <div>
        <label htmlFor="confirm" className={LABEL_CLASS}>
          Confirm new password
        </label>
        <PasswordInput
          id="confirm"
          name="confirm"
          autoComplete="new-password"
          required
          minLength={10}
          className="mt-2"
        />
      </div>

      {message ? (
        <p
          role="alert"
          className={
            message.kind === "ok"
              ? "rounded-md border border-[var(--color-gold)]/40 bg-[var(--color-gold)]/10 px-3 py-2 text-[13px] text-[var(--color-gold)]"
              : "rounded-md border border-red-500/40 bg-red-500/10 px-3 py-2 text-[13px] text-red-700 dark:text-red-300"
          }
        >
          {message.text}
        </p>
      ) : null}

      <button
        type="submit"
        disabled={busy}
        className="inline-flex items-center justify-center rounded-full border border-[var(--color-gold)] bg-[var(--color-gold)] px-6 py-2.5 text-[11px] uppercase tracking-[0.22em] text-white shadow-[0_8px_24px_var(--color-accent-glow)] transition-all hover:shadow-[0_12px_36px_var(--color-accent-glow-strong)] disabled:opacity-50"
      >
        {busy ? "Updating…" : "Update password"}
      </button>
    </form>
  );
}
