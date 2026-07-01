"use client";

import { useState, type FormEvent } from "react";
import { getDictionary, type Locale } from "@/lib/i18n";

const INPUT_CLASS =
  "w-full border border-[var(--color-border)] bg-[var(--color-bg-primary)] px-4 py-3 text-[15px] text-[var(--color-ink)] placeholder:text-[var(--color-text-subtle)] focus:border-[var(--color-gold)] focus:outline-none";

const LABEL_CLASS =
  "block text-[11px] font-medium uppercase tracking-[0.22em] text-[var(--color-text-muted)]";

export function ContactForm({ locale = "en" }: { locale?: Locale }) {
  const d = getDictionary(locale).contact.form;
  const [submitted, setSubmitted] = useState(false);
  const [sending, setSending] = useState(false);

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;
    const data = new FormData(form);
    const name = String(data.get("name") ?? "").trim();
    const email = String(data.get("email") ?? "").trim();
    const phone = String(data.get("phone") ?? "").trim();
    const subject = String(data.get("subject") ?? "").trim();
    const message = String(data.get("message") ?? "").trim();

    const mailto = `mailto:info@nmj-group.qa?subject=${encodeURIComponent(
      subject || `Website inquiry from ${name}`
    )}&body=${encodeURIComponent(
      `Name: ${name}\nEmail: ${email}\nPhone: ${phone}\n\n${message}`
    )}`;

    // Brief "opening" micro-interaction before handing off to the mail client.
    setSending(true);
    window.setTimeout(() => {
      window.location.href = mailto;
      setSending(false);
      setSubmitted(true);
    }, 550);
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="grid grid-cols-1 gap-6 md:grid-cols-2"
      noValidate={false}
    >
      <div className="md:col-span-1">
        <label htmlFor="name" className={LABEL_CLASS}>
          {d.name}
        </label>
        <input
          id="name"
          name="name"
          type="text"
          autoComplete="name"
          required
          className={`mt-3 ${INPUT_CLASS}`}
        />
      </div>
      <div className="md:col-span-1">
        <label htmlFor="email" className={LABEL_CLASS}>
          {d.email}
        </label>
        <input
          id="email"
          name="email"
          type="email"
          autoComplete="email"
          required
          className={`mt-3 ${INPUT_CLASS}`}
        />
      </div>
      <div className="md:col-span-1">
        <label htmlFor="phone" className={LABEL_CLASS}>
          {d.phone}
        </label>
        <input
          id="phone"
          name="phone"
          type="tel"
          autoComplete="tel"
          inputMode="tel"
          className={`mt-3 ${INPUT_CLASS}`}
        />
      </div>
      <div className="md:col-span-1">
        <label htmlFor="subject" className={LABEL_CLASS}>
          {d.subject}
        </label>
        <input
          id="subject"
          name="subject"
          type="text"
          className={`mt-3 ${INPUT_CLASS}`}
        />
      </div>
      <div className="md:col-span-2">
        <label htmlFor="message" className={LABEL_CLASS}>
          {d.message}
        </label>
        <textarea
          id="message"
          name="message"
          rows={6}
          required
          className={`mt-3 ${INPUT_CLASS}`}
        />
      </div>
      <div className="md:col-span-2">
        <button
          type="submit"
          disabled={sending}
          className="press inline-flex items-center justify-center gap-3 rounded-full border border-[var(--color-gold)] bg-[var(--color-gold)] px-8 py-3.5 text-xs uppercase tracking-[0.2em] text-white shadow-[0_8px_24px_var(--color-accent-glow)] transition-all hover:shadow-[0_12px_36px_var(--color-accent-glow-strong)] hover:-translate-y-0.5 disabled:cursor-wait disabled:opacity-80 disabled:hover:translate-y-0"
        >
          {sending ? (
            <>
              <span className="spinner" aria-hidden />
              {d.opening}
            </>
          ) : (
            d.send
          )}
        </button>
        {submitted ? (
          <div className="mt-5 flex items-start gap-3 rounded-xl border border-[var(--color-border-strong)] bg-[var(--color-bg-primary)] p-4">
            <span className="mt-0.5 flex h-6 w-6 flex-none items-center justify-center rounded-full bg-[var(--color-gold)]/15 text-[var(--color-gold)]">
              <svg
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.5"
                strokeLinecap="round"
                strokeLinejoin="round"
                aria-hidden="true"
              >
                <path className="check-draw" d="M20 6 9 17l-5-5" />
              </svg>
            </span>
            <p className="text-[13px] leading-[1.6] text-[var(--color-text-muted)]">
              {d.success}
            </p>
          </div>
        ) : null}
      </div>
    </form>
  );
}
