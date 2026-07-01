"use client";

import { useState, type FormEvent } from "react";
import { useRouter } from "next/navigation";

type Admin = { id: string; username: string; created_at: string };

const INPUT_CLASS =
  "w-full rounded-md border border-[var(--color-border-strong)] bg-[var(--color-bg-primary)] px-4 py-3 text-[14px] text-[var(--color-ink)] focus:border-[var(--color-gold)] focus:outline-none";

const LABEL_CLASS =
  "block text-[11px] uppercase tracking-[0.22em] text-[var(--color-text-muted)]";

export function AdminsManager({
  admins,
  currentId,
}: {
  admins: Admin[];
  currentId: string;
}) {
  const router = useRouter();
  const [creating, setCreating] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  const [busyId, setBusyId] = useState<string | null>(null);

  async function handleCreate(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError(null);
    setSuccess(null);
    setCreating(true);
    const form = event.currentTarget;
    const data = new FormData(form);
    const username = String(data.get("username") ?? "").trim();
    const password = String(data.get("password") ?? "");

    try {
      const res = await fetch("/api/dashboard/admins", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({ username, password }),
      });
      if (!res.ok) {
        const body = await res.json().catch(() => null);
        setError(body?.error || "Create failed");
      } else {
        setSuccess(`Admin "${username}" created.`);
        form.reset();
        router.refresh();
      }
    } catch {
      setError("Network error. Try again.");
    } finally {
      setCreating(false);
    }
  }

  async function handleDelete(id: string, username: string) {
    if (!confirm(`Delete admin "${username}"? This cannot be undone.`)) return;
    setBusyId(id);
    setError(null);
    setSuccess(null);
    try {
      const res = await fetch(`/api/dashboard/admins/${id}`, {
        method: "DELETE",
      });
      if (!res.ok) {
        const body = await res.json().catch(() => null);
        setError(body?.error || "Delete failed");
      } else {
        setSuccess(`Admin "${username}" deleted.`);
        router.refresh();
      }
    } catch {
      setError("Network error. Try again.");
    } finally {
      setBusyId(null);
    }
  }

  return (
    <div className="space-y-10">
      <section className="premium-card !p-6 md:!p-8">
        <h2 className="font-serif text-xl leading-tight text-[var(--color-ink)] md:text-2xl">
          Add an admin
        </h2>
        <form onSubmit={handleCreate} className="mt-6 grid grid-cols-1 gap-4 md:grid-cols-2">
          <div>
            <label htmlFor="new-username" className={LABEL_CLASS}>
              Username
            </label>
            <input
              id="new-username"
              name="username"
              type="text"
              required
              minLength={3}
              maxLength={64}
              autoComplete="off"
              className={`mt-2 ${INPUT_CLASS}`}
            />
          </div>
          <div>
            <label htmlFor="new-password" className={LABEL_CLASS}>
              Password (min 10 chars)
            </label>
            <input
              id="new-password"
              name="password"
              type="text"
              required
              minLength={10}
              autoComplete="off"
              className={`mt-2 ${INPUT_CLASS}`}
            />
          </div>
          <div className="md:col-span-2 flex items-center justify-between gap-4">
            <p className="text-[12px] text-[var(--color-text-muted)]">
              Share the username and password with the new admin securely.
            </p>
            <button
              type="submit"
              disabled={creating}
              className="inline-flex items-center justify-center rounded-full border border-[var(--color-gold)] bg-[var(--color-gold)] px-6 py-2.5 text-[11px] uppercase tracking-[0.22em] text-white shadow-[0_8px_24px_var(--color-accent-glow)] transition-all hover:shadow-[0_12px_36px_var(--color-accent-glow-strong)] disabled:opacity-50"
            >
              {creating ? "Creating…" : "Create admin"}
            </button>
          </div>
        </form>
      </section>

      {error ? (
        <p className="rounded-md border border-red-500/40 bg-red-500/10 px-4 py-3 text-[13px] text-red-700 dark:text-red-300">
          {error}
        </p>
      ) : null}
      {success ? (
        <p className="rounded-md border border-[var(--color-gold)]/40 bg-[var(--color-gold)]/10 px-4 py-3 text-[13px] text-[var(--color-gold)]">
          {success}
        </p>
      ) : null}

      <section>
        <h2 className="font-serif text-xl leading-tight text-[var(--color-ink)] md:text-2xl">
          Current admins
        </h2>
        <ul className="mt-6 divide-y divide-[var(--color-border)] rounded-lg border border-[var(--color-border)] bg-[var(--color-bg-primary)]">
          {admins.length === 0 ? (
            <li className="px-5 py-4 text-[14px] text-[var(--color-text-muted)]">
              No admins yet.
            </li>
          ) : (
            admins.map((a) => {
              const self = a.id === currentId;
              return (
                <li
                  key={a.id}
                  className="flex items-center justify-between gap-4 px-5 py-4"
                >
                  <div>
                    <p className="font-mono text-[14px] text-[var(--color-ink)]">
                      {a.username}
                      {self ? (
                        <span className="ml-2 text-[10px] uppercase tracking-[0.2em] text-[var(--color-gold)]">
                          you
                        </span>
                      ) : null}
                    </p>
                    <p className="mt-1 text-[11px] text-[var(--color-text-subtle)]">
                      Added {new Date(a.created_at).toLocaleString()}
                    </p>
                  </div>
                  <button
                    type="button"
                    disabled={self || busyId === a.id}
                    onClick={() => handleDelete(a.id, a.username)}
                    className="rounded-md border border-[var(--color-border-strong)] px-3 py-1.5 text-[11px] uppercase tracking-[0.18em] text-[var(--color-text-muted)] transition-colors hover:border-red-500/50 hover:text-red-600 disabled:cursor-not-allowed disabled:opacity-40 disabled:hover:border-[var(--color-border-strong)] disabled:hover:text-[var(--color-text-muted)] dark:hover:text-red-400"
                  >
                    {busyId === a.id ? "Deleting…" : "Delete"}
                  </button>
                </li>
              );
            })
          )}
        </ul>
      </section>
    </div>
  );
}
