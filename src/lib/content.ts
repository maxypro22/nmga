import "server-only";
import { unstable_cache } from "next/cache";
import { getSupabaseAdmin, hasSupabaseConfig } from "@/lib/supabase";

export const CONTENT_TAG = "content-overrides";
export const THEME_TAG = "theme-overrides";

export type ContentMap = Record<string, string>;
export type ThemeOverrides = Partial<{
  gold: string;
  goldSubtle: string;
  goldDark: string;
  goldSubtleDark: string;
}>;

/**
 * Master list of editable content keys with their default values.
 * Anything not listed here is not exposed in the dashboard editor.
 * Adding a new editable field = add a key here + call t() in the page.
 */
export const CONTENT_DEFAULTS = {
  "home.hero.tagline": "A Diversified Qatari Group · Since 1991",
  "home.hero.headline": "Delivering Excellence Across Diversified Industries.",
  "home.hero.subhead":
    "A privately held Qatari business group headquartered in Doha, with a portfolio of divisions spanning hospitality, real estate, construction, events, services, technology, and AI.",
  "home.hero.cta_primary": "Our Divisions",
  "home.hero.cta_secondary": "Partner With Us",

  "about.hero.headline": "About NMJ Group",
  "about.hero.subhead":
    "NMJ Group is a diversified business group based in Doha, Qatar, with operations across hospitality, real estate, construction, events, services, technology, and AI.",

  "divisions.hero.headline": "NMJ Group Divisions",
  "divisions.hero.subhead":
    "Integrated business solutions across hospitality, real estate, construction, events, services, technology, and AI in Doha, Qatar.",

  "contact.hero.headline": "Contact NMJ Group",
  "contact.hero.subhead":
    "For business inquiries, partnerships, or general information, get in touch with NMJ Group in Doha, Qatar.",
  "contact.info.address": "Doha, Qatar",
  "contact.info.phone": "+974 4444 0085",
  "contact.info.email": "info@nmj-group.qa",
} as const;

export type ContentKey = keyof typeof CONTENT_DEFAULTS;

async function fetchContentOverrides(): Promise<ContentMap> {
  if (!hasSupabaseConfig()) return {};
  try {
    const supabase = getSupabaseAdmin();
    const { data, error } = await supabase
      .from("content_overrides")
      .select("key, value");
    if (error || !data) return {};
    const map: ContentMap = {};
    for (const row of data) {
      if (typeof row.key === "string" && typeof row.value === "string") {
        map[row.key] = row.value;
      }
    }
    return map;
  } catch {
    return {};
  }
}

async function fetchThemeOverrides(): Promise<ThemeOverrides> {
  if (!hasSupabaseConfig()) return {};
  try {
    const supabase = getSupabaseAdmin();
    const { data, error } = await supabase
      .from("site_settings")
      .select("value")
      .eq("key", "theme")
      .maybeSingle();
    if (error || !data?.value) return {};
    return (data.value as ThemeOverrides) ?? {};
  } catch {
    return {};
  }
}

const cachedContent = unstable_cache(
  fetchContentOverrides,
  ["content-overrides-v1"],
  { tags: [CONTENT_TAG], revalidate: 60 }
);

const cachedTheme = unstable_cache(
  fetchThemeOverrides,
  ["theme-overrides-v1"],
  { tags: [THEME_TAG], revalidate: 60 }
);

export async function getContentMap(): Promise<ContentMap> {
  return cachedContent();
}

export async function getThemeOverrides(): Promise<ThemeOverrides> {
  return cachedTheme();
}

/**
 * Async server-side helper.
 * Usage in a server component:
 *   const headline = await t("home.hero.headline");
 */
export async function t(key: ContentKey): Promise<string> {
  const overrides = await getContentMap();
  return overrides[key] ?? CONTENT_DEFAULTS[key];
}

// Defense-in-depth: re-validate every hex value at injection time, even though
// the API route already validates on write. This protects against any value
// that might be inserted via direct DB access bypassing the API.
const HEX_RE = /^#([0-9a-fA-F]{3}|[0-9a-fA-F]{6})$/;
function safeHex(value: string | undefined): string | null {
  if (!value || typeof value !== "string") return null;
  return HEX_RE.test(value) ? value : null;
}

/**
 * Returns CSS variable declarations to inject in <head> for theme overrides.
 * Empty string when no overrides exist. All values are validated as hex
 * colors so they can never break out of the <style> tag context.
 */
export function themeOverridesToCss(theme: ThemeOverrides): string {
  const gold = safeHex(theme.gold);
  const goldSubtle = safeHex(theme.goldSubtle);
  const goldDark = safeHex(theme.goldDark);
  const goldSubtleDark = safeHex(theme.goldSubtleDark);

  const light: string[] = [];
  const dark: string[] = [];
  if (gold) light.push(`--color-gold: ${gold};`);
  if (goldSubtle) light.push(`--color-gold-subtle: ${goldSubtle};`);
  if (goldDark) dark.push(`--color-gold: ${goldDark};`);
  if (goldSubtleDark) dark.push(`--color-gold-subtle: ${goldSubtleDark};`);

  const parts: string[] = [];
  if (light.length) parts.push(`:root { ${light.join(" ")} }`);
  if (dark.length) parts.push(`html.dark { ${dark.join(" ")} }`);
  return parts.join("\n");
}
