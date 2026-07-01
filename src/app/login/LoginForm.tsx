"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { useState, type FormEvent } from "react";
import { PasswordInput } from "@/components/ui/PasswordInput";
import { getDictionary, type Locale } from "@/lib/i18n";

const INPUT_CLASS =
  "w-full rounded-md border border-[var(--color-border-strong)] bg-[var(--color-bg-primary)] px-4 py-3 text-[15px] text-[var(--color-ink)] placeholder:text-[var(--color-text-subtle)] focus:border-[var(--color-gold)] focus:outline-none";

const LABEL_CLASS =
  "block text-[11px] font-medium uppercase tracking-[0.22em] text-[var(--color-text-muted)]";

/** Only allow same-origin relative paths — prevents open redirect. */
function safeRedirect(raw: string | null, fallback: string): string {
  if (typeof raw === "string" && raw.startsWith("/") && !raw.startsWith("//")) {
    return raw;
  }
  return fallback;
}

export function LoginForm({
  locale = "en",
  defaultNext = "/dashboard",
}: {
  locale?: Locale;
  defaultNext?: string;
}) {
  const d = getDictionary(locale).login;
  const router = useRouter();
  const searchParams = useSearchParams();
  const next = safeRedirect(searchParams.get("next"), defaultNext);

  const [error, setError] = useState<string | null>(null);
  const [busy, setBusy] = useState(false);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError(null);
    setBusy(true);
    const data = new FormData(event.currentTarget);
    const username = String(data.get("username") ?? "").trim();
    const password = String(data.get("password") ?? "");

    try {
      const res = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({ username, password }),
      });
      if (!res.ok) {
        const body = await res.json().catch(() => null);
        setError(body?.error || d.invalid);
        setBusy(false);
        return;
      }
      router.replace(next);
      router.refresh();
    } catch {
      setError(d.networkError);
      setBusy(false);
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      <div>
        <label htmlFor="username" className={LABEL_CLASS}>
          {d.username}
        </label>
        <input
          id="username"
          name="username"
          type="text"
          autoComplete="username"
          required
          className={`mt-2 ${INPUT_CLASS}`}
        />
      </div>
      <div>
        <label htmlFor="password" className={LABEL_CLASS}>
          {d.password}
        </label>
        <PasswordInput
          id="password"
          name="password"
          autoComplete="current-password"
          required
          className="mt-2"
        />
      </div>

      {error ? (
        <p
          role="alert"
          className="rounded-md border border-red-500/40 bg-red-500/10 px-3 py-2 text-[13px] text-red-700 dark:text-red-300"
        >
          {error}
        </p>
      ) : null}

      <button
        type="submit"
        disabled={busy}
        className="press inline-flex w-full items-center justify-center gap-3 rounded-full border border-[var(--color-gold)] bg-[var(--color-gold)] px-7 py-3 text-xs uppercase tracking-[0.2em] text-white shadow-[0_8px_24px_var(--color-accent-glow)] transition-all hover:shadow-[0_12px_36px_var(--color-accent-glow-strong)] hover:-translate-y-0.5 disabled:opacity-60 disabled:hover:translate-y-0"
      >
        {busy ? (
          <>
            <span className="spinner" aria-hidden />
            {d.signingIn}
          </>
        ) : (
          d.signIn
        )}
      </button>
    </form>
  );
}
