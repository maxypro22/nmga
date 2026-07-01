"use client";

import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";

type Theme = "light" | "dark";

const STORAGE_KEY = "nmj-theme";

function getInitialTheme(): Theme {
  if (typeof window === "undefined") return "light";
  return document.documentElement.classList.contains("dark") ? "dark" : "light";
}

function applyTheme(theme: Theme) {
  const root = document.documentElement;
  if (theme === "dark") root.classList.add("dark");
  else root.classList.remove("dark");
  try {
    window.localStorage.setItem(STORAGE_KEY, theme);
  } catch {
    /* localStorage may be blocked — ignore */
  }
}

interface ThemeToggleProps {
  className?: string;
  tone?: "auto" | "dark-surface";
}

export function ThemeToggle({ className, tone = "auto" }: ThemeToggleProps) {
  const [theme, setTheme] = useState<Theme>("light");
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setTheme(getInitialTheme());
    setMounted(true);
  }, []);

  function toggle() {
    const next: Theme = theme === "dark" ? "light" : "dark";
    setTheme(next);
    applyTheme(next);
  }

  const isDark = theme === "dark";

  return (
    <button
      type="button"
      onClick={toggle}
      aria-label={
        mounted
          ? `Switch to ${isDark ? "light" : "dark"} mode`
          : "Toggle color theme"
      }
      title={isDark ? "Switch to light mode" : "Switch to dark mode"}
      className={cn(
        "inline-flex h-10 w-10 items-center justify-center rounded-full border transition-all duration-300 ease-out",
        tone === "dark-surface"
          ? "border-white/15 text-white/85 hover:border-[var(--color-gold-subtle)] hover:text-white"
          : "border-[var(--color-border-strong)] text-[var(--color-ink)] hover:border-[var(--color-gold)] hover:text-[var(--color-gold)]",
        className
      )}
    >
      {/* Render a neutral placeholder until mounted to avoid hydration flicker */}
      <span aria-hidden className="block h-4 w-4">
        {mounted ? (isDark ? <SunIcon /> : <MoonIcon />) : null}
      </span>
    </button>
  );
}

function SunIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
      <circle cx="12" cy="12" r="4" />
      <path
        strokeLinecap="round"
        d="M12 3v2M12 19v2M3 12h2M19 12h2M5.6 5.6l1.4 1.4M17 17l1.4 1.4M5.6 18.4L7 17M17 7l1.4-1.4"
      />
    </svg>
  );
}

function MoonIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M20 14.5A8.5 8.5 0 1 1 9.5 4a7 7 0 0 0 10.5 10.5Z"
      />
    </svg>
  );
}
