import { getSession } from "@/lib/auth";
import { AccountForm } from "./AccountForm";

export const dynamic = "force-dynamic";

export default async function AccountPage() {
  const session = await getSession();
  return (
    <div className="mx-auto max-w-[640px]">
      <p className="text-[10px] uppercase tracking-[0.32em] text-[var(--color-gold)]">
        Account
      </p>
      <h1 className="mt-3 font-serif text-3xl leading-tight text-[var(--color-ink)] md:text-4xl">
        Your account
      </h1>
      <p className="mt-3 text-[15px] leading-relaxed text-[var(--color-text-muted)]">
        Signed in as{" "}
        <span className="font-mono text-[var(--color-ink)]">
          {session?.username ?? "—"}
        </span>
        . Change your password below or sign out from the sidebar.
      </p>

      <div className="mt-10 premium-card !p-6 md:!p-8">
        <h2 className="font-serif text-xl leading-tight text-[var(--color-ink)] md:text-2xl">
          Change password
        </h2>
        <div className="mt-6">
          <AccountForm />
        </div>
      </div>
    </div>
  );
}
