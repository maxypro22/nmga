import type { Metadata } from "next";
import { AboutBody } from "@/app/about/page";
import { getDictionary } from "@/lib/i18n";

export const metadata: Metadata = {
  title: "عن مجموعة NMJ | مجموعة أعمال متنوّعة في الدوحة، قطر",
  description:
    "تعرّف على مجموعة NMJ، مجموعة أعمال متنوّعة في الدوحة، قطر، تعمل عبر الضيافة والعقارات والإنشاءات والفعاليات والخدمات والتقنية والذكاء الاصطناعي.",
  alternates: { canonical: "https://nmj-group.qa/ar/about" },
};

export default function ArabicAbout() {
  const hero = getDictionary("ar").about.hero;
  return <AboutBody locale="ar" hero={{ headline: hero.headline, subhead: hero.subhead }} />;
}
