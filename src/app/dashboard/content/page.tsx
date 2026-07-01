import { CONTENT_DEFAULTS, getContentMap, type ContentKey } from "@/lib/content";
import { ContentEditor } from "./ContentEditor";

export const dynamic = "force-dynamic";

const GROUPS: { title: string; keys: ContentKey[] }[] = [
  {
    title: "Home — Hero",
    keys: [
      "home.hero.tagline",
      "home.hero.headline",
      "home.hero.subhead",
      "home.hero.cta_primary",
      "home.hero.cta_secondary",
    ],
  },
  {
    title: "About — Hero",
    keys: ["about.hero.headline", "about.hero.subhead"],
  },
  {
    title: "Divisions — Hero",
    keys: ["divisions.hero.headline", "divisions.hero.subhead"],
  },
  {
    title: "Contact — Hero & Info",
    keys: [
      "contact.hero.headline",
      "contact.hero.subhead",
      "contact.info.address",
      "contact.info.phone",
      "contact.info.email",
    ],
  },
];

export default async function ContentPage() {
  const overrides = await getContentMap();

  const initial: Record<string, string> = {};
  for (const key of Object.keys(CONTENT_DEFAULTS) as ContentKey[]) {
    initial[key] = overrides[key] ?? CONTENT_DEFAULTS[key];
  }
  const defaults: Record<string, string> = { ...CONTENT_DEFAULTS };

  return (
    <div className="mx-auto max-w-[900px]">
      <p className="text-[10px] uppercase tracking-[0.32em] text-[var(--color-gold)]">
        Content
      </p>
      <h1 className="mt-3 font-serif text-3xl leading-tight text-[var(--color-ink)] md:text-4xl">
        Edit page content
      </h1>
      <p className="mt-3 max-w-[62ch] text-[15px] leading-relaxed text-[var(--color-text-muted)]">
        Update headlines, descriptions, and contact info across all public
        pages. Changes go live immediately after saving.
      </p>

      <div className="mt-10">
        <ContentEditor groups={GROUPS} initial={initial} defaults={defaults} />
      </div>
    </div>
  );
}
