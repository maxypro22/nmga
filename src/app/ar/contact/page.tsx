import type { Metadata } from "next";
import { ContactBody } from "@/app/contact/page";
import { getDictionary } from "@/lib/i18n";
import { t } from "@/lib/content";

export const metadata: Metadata = {
  title: "تواصل مع مجموعة NMJ | الاستفسارات التجارية في الدوحة، قطر",
  description:
    "تواصل مع مجموعة NMJ في الدوحة، قطر للاستفسارات التجارية أو الشراكات أو المعلومات العامة عبر الهاتف أو البريد الإلكتروني أو زيارة المكتب.",
  alternates: { canonical: "https://nmj-group.qa/ar/contact" },
};

export default async function ArabicContact() {
  const hero = getDictionary("ar").contact.hero;
  const [address, phone, email] = await Promise.all([
    t("contact.info.address"),
    t("contact.info.phone"),
    t("contact.info.email"),
  ]);
  return (
    <ContactBody
      locale="ar"
      hero={{ headline: hero.headline, subhead: hero.subhead }}
      info={{ address, phone, email }}
    />
  );
}
