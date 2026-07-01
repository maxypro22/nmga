import { redirect } from "next/navigation";
import type { Metadata } from "next";
import { LoginScreen } from "@/app/login/page";
import { getSession } from "@/lib/auth";

export const metadata: Metadata = {
  title: "تسجيل الدخول",
  robots: { index: false, follow: false },
};

export const dynamic = "force-dynamic";

export default async function ArabicLoginPage() {
  let alreadySignedIn = false;
  try {
    const session = await getSession();
    alreadySignedIn = Boolean(session);
  } catch {
    alreadySignedIn = false;
  }
  if (alreadySignedIn) redirect("/ar/dashboard");

  return <LoginScreen locale="ar" />;
}
