"use client";

import { useState, type InputHTMLAttributes } from "react";
import { cn } from "@/lib/utils";

type PasswordInputProps = Omit<
  InputHTMLAttributes<HTMLInputElement>,
  "type" | "className"
> & {
  /** Applied to the wrapping &lt;div&gt; (for spacing utilities like mt-2). */
  className?: string;
  /** Applied to the &lt;input&gt; element itself (rare). */
  inputClassName?: string;
};

/**
 * Password input with a show/hide eye toggle.
 * Forwards all other input props (id, name, autoComplete, required, etc.).
 */
export function PasswordInput({
  className,
  inputClassName,
  ...rest
}: PasswordInputProps) {
  const [show, setShow] = useState(false);

  return (
    <div className={cn("relative", className)}>
      <input
        {...rest}
        type={show ? "text" : "password"}
        className={cn(
          "w-full rounded-md border border-[var(--color-border-strong)] bg-[var(--color-bg-primary)] px-4 py-3 pr-12 text-[14px] text-[var(--color-ink)] placeholder:text-[var(--color-text-subtle)] focus:border-[var(--color-gold)] focus:outline-none",
          inputClassName
        )}
      />
      <button
        type="button"
        onClick={() => setShow((v) => !v)}
        aria-label={show ? "Hide password" : "Show password"}
        title={show ? "Hide password" : "Show password"}
        tabIndex={-1}
        className="absolute right-2 top-1/2 inline-flex h-9 w-9 -translate-y-1/2 items-center justify-center rounded-md text-[var(--color-text-muted)] transition-colors hover:text-[var(--color-gold)]"
      >
        {show ? <EyeOffIcon /> : <EyeIcon />}
      </button>
    </div>
  );
}

function EyeIcon() {
  return (
    <svg
      width="18"
      height="18"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.6"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d="M1.5 12s4-7.5 10.5-7.5S22.5 12 22.5 12 18.5 19.5 12 19.5 1.5 12 1.5 12Z" />
      <circle cx="12" cy="12" r="3" />
    </svg>
  );
}

function EyeOffIcon() {
  return (
    <svg
      width="18"
      height="18"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.6"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d="M3 3l18 18" />
      <path d="M10.6 6.2A10.7 10.7 0 0 1 12 6c6.5 0 10.5 6 10.5 6a18.5 18.5 0 0 1-3.4 4.1" />
      <path d="M6.6 6.6A18.7 18.7 0 0 0 1.5 12s4 7.5 10.5 7.5a11 11 0 0 0 4.9-1.1" />
      <path d="M9.9 9.9a3 3 0 0 0 4.2 4.2" />
    </svg>
  );
}
