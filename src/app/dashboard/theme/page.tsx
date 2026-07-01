import { getThemeOverrides } from "@/lib/content";
import { ThemeEditor } from "./ThemeEditor";

export const dynamic = "force-dynamic";

const DEFAULTS = {
  gold: "#c9a961",
  goldSubtle: "#d4b87a",
  goldDark: "#e6c98a",
  goldSubtleDark: "#d4b87a",
} as const;

export default async function ThemePage() {
  const overrides = await getThemeOverrides();
  const initial = {
    gold: overrides.gold ?? DEFAULTS.gold,
    goldSubtle: overrides.goldSubtle ?? DEFAULTS.goldSubtle,
    goldDark: overrides.goldDark ?? DEFAULTS.goldDark,
    goldSubtleDark: overrides.goldSubtleDark ?? DEFAULTS.goldSubtleDark,
  };

  return (
    <div className="mx-auto max-w-[900px]">
      <p className="text-[10px] uppercase tracking-[0.32em] text-[var(--color-gold)]">
        Theme
      </p>
      <h1 className="mt-3 font-serif text-3xl leading-tight text-[var(--color-ink)] md:text-4xl">
        Accent colors
      </h1>
      <p className="mt-3 max-w-[62ch] text-[15px] leading-relaxed text-[var(--color-text-muted)]">
        Pick the gold accent for light and dark mode. The change applies
        site-wide to eyebrows, lines, buttons, links, and the timeline rail on
        the divisions page.
      </p>

      <div className="mt-10">
        <ThemeEditor initial={initial} defaults={DEFAULTS} />
      </div>
    </div>
  );
}
