import type { Metadata } from "next";
import { redirect } from "next/navigation";
import { getSession } from "@/lib/auth";
import { DashboardShell } from "@/app/dashboard/DashboardShell";

export const metadata: Metadata = {
  title: "لوحة التحكم",
  robots: { index: false, follow: false },
};

export default async function ArabicDashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await getSession();
  if (!session) redirect("/ar/login");

  return (
    <DashboardShell username={session.username} locale="ar">
      {children}
    </DashboardShell>
  );
}
