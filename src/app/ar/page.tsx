import type { Metadata } from "next";
import { HomeBody } from "@/app/page";
import { getDictionary } from "@/lib/i18n";

export const metadata: Metadata = {
  title: "مجموعة NMJ | مجموعة أعمال متنوّعة في الدوحة، قطر",
  description:
    "مجموعة NMJ مجموعة أعمال متنوّعة في الدوحة، قطر، تعمل عبر الضيافة والعقارات والإنشاءات والخدمات والتقنية وحلول الذكاء الاصطناعي.",
  alternates: { canonical: "https://nmj-group.qa/ar" },
};

export default function ArabicHome() {
  const hero = getDictionary("ar").home.hero;
  return <HomeBody locale="ar" hero={hero} />;
}
