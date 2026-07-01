import type { Metadata } from "next";
import { DivisionsBody } from "@/app/divisions/page";
import { getDictionary } from "@/lib/i18n";

export const metadata: Metadata = {
  title: "أقسام مجموعة NMJ | الضيافة والعقارات والإنشاءات والتقنية والذكاء الاصطناعي",
  description:
    "استكشف أقسام أعمال مجموعة NMJ في الدوحة، قطر، بما فيها الضيافة والعقارات والإنشاءات والفعاليات والخدمات والتقنية وحلول الذكاء الاصطناعي.",
  alternates: { canonical: "https://nmj-group.qa/ar/divisions" },
};

export default function ArabicDivisions() {
  const hero = getDictionary("ar").divisionsPage.hero;
  return (
    <DivisionsBody
      locale="ar"
      hero={{ headline: hero.headline, subhead: hero.subhead }}
    />
  );
}
