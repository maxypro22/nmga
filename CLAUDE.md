# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

@AGENTS.md

## Commands

```bash
npm run dev      # start dev server (Turbopack)
npm run build    # production build
npm run start    # serve production build
npm run lint     # ESLint
```

No test runner is configured.

## Required environment variables

```
NEXT_PUBLIC_SUPABASE_URL=
NEXT_PUBLIC_SUPABASE_ANON_KEY=
SUPABASE_SERVICE_ROLE_KEY=
AUTH_SECRET=        # random string ≥32 chars — signs JWT sessions
```

The app degrades gracefully without Supabase: content falls back to `CONTENT_DEFAULTS` in `src/lib/content.ts` and dashboard features are unavailable.

## Architecture

### Routing — bilingual dual-tree

English pages live at the root (`/`, `/about`, `/divisions`, `/contact`, `/login`, `/dashboard`). Arabic is a **mirrored subtree** under `/ar`. Arabic pages are thin wrappers that pass `locale="ar"` to shared components; RTL is applied at the `<html>` element per page.

Path utilities in `src/lib/i18n.ts`: `withLocale()`, `stripLocale()`, `localeFromPathname()`, `swapLocalePath()`.

### Authentication

Custom JWT auth — no NextAuth, no Supabase Auth.

1. `POST /api/auth/login` verifies credentials against `public.admins` via a Postgres function (`public.verify_admin_password()`, bcrypt) and issues a JWT signed with `AUTH_SECRET` using **jose**.
2. The JWT is stored as an `httpOnly` secure cookie (`nmj_session`, 8-hour TTL).
3. Dashboard API routes call `getSession()` from `src/lib/auth.ts` to verify the cookie on every request; return 401 if null.

### Content management

Editable copy is defined in `CONTENT_DEFAULTS` in `src/lib/content.ts`. Pages call `await t("home.hero.headline")` to resolve either the Supabase override or the default. Results are cached via `unstable_cache` (60s, tag `"content-overrides"`). `POST /api/dashboard/content` writes overrides and calls `revalidateTag("content-overrides")`.

**Adding a new editable field**: add a key to `CONTENT_DEFAULTS`, then call `t()` in the page — the dashboard editor auto-discovers it.

Theme overrides (gold CSS variables) follow the same pattern via `getThemeOverrides()` / `themeOverridesToCss()`, injected as a `<style>` block in `layout.tsx`.

### CSS design system

Tailwind v4 with CSS custom properties as design tokens (defined in `src/app/globals.css`). Dark mode uses the `html.dark` class — **not** `@media (prefers-color-scheme)`.

Key reusable patterns:
- **`.vmv-card` / `.vmv-grid`** — shared card + 3-column grid. Hover triggers a gold sweep-up fill (`::after`, `scaleY(0→1)`); text flips to obsidian in light mode and white in dark mode. Used on Overview, Strategic Foundation, and About cards.
- **`data-reveal`** — scroll-triggered fade/slide-up. Managed by `RevealObserver` via IntersectionObserver.
- **`data-reveal-stagger="120"`** — add to a container to stagger children 120ms apart.
- **`data-parallax-y`** — CSS parallax managed by `ParallaxObserver`.
- **`data-cursor-light`** — marks dark sections (footer, CTA blocks) so `CursorGlow` renders the cursor white instead of the default gold.

### Layout shell (`src/app/layout.tsx`)

Every page shares these client providers wrapping the body:
`SmoothScrollProvider` (Lenis) → `RevealObserver` → `ParallaxObserver` → `CursorGlow` → `ScrollProgress` → `PageShell` (page transitions).

### Divisions / sectors data

Static business data lives in `src/lib/sectors.ts` (`Division` → `companies[]`). Translation strings for names, descriptions, and intro copy live in the `divisions.items` dictionary in `src/lib/i18n.ts`. The `/divisions` page renders all divisions via `DivisionsTimeline`.

### Database access

Always use `getSupabaseAdmin()` from `src/lib/supabase.ts` (service role). All tables have RLS policies that deny anon access entirely — the anon client has no read/write access to any table.
