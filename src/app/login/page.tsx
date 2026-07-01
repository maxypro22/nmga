import { Suspense } from "react";
import { redirect } from "next/navigation";
import type { Metadata } from "next";
import { LoginForm } from "./LoginForm";
import { getSession } from "@/lib/auth";
import { getDictionary, withLocale, type Locale } from "@/lib/i18n";

export const metadata: Metadata = {
  title: "Sign in",
  robots: { index: false, follow: false },
};

export const dynamic = "force-dynamic";

export default async function LoginPage() {
  let alreadySignedIn = false;
  try {
    const session = await getSession();
    alreadySignedIn = Boolean(session);
  } catch {
    alreadySignedIn = false;
  }
  if (alreadySignedIn) redirect("/dashboard");

  return <LoginScreen locale="en" />;
}

export function LoginScreen({ locale }: { locale: Locale }) {
  const d = getDictionary(locale).login;
  return (
    <section className="cinematic-bg flex min-h-[calc(100vh-85px)] items-center justify-center px-6 py-16 md:px-10 lg:px-14">
      <div className="w-full max-w-md">
        <div className="premium-card">
          <p className="text-[10px] uppercase tracking-[0.32em] text-[var(--color-gold)]">
            {d.badge}
          </p>
          <h1 className="mt-4 font-serif text-3xl leading-tight text-[var(--color-ink)] md:text-4xl">
            {d.title}
          </h1>
          <p className="mt-3 text-[14px] leading-[1.7] text-[var(--color-text-muted)]">
            {d.subtitle}
          </p>

          <div className="mt-8">
            <Suspense fallback={null}>
              <LoginForm
                locale={locale}
                defaultNext={withLocale("/dashboard", locale)}
              />
            </Suspense>
          </div>
        </div>
      </div>
    </section>
  );
}
