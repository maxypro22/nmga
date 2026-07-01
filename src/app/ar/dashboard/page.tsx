import { DashboardOverviewBody, getStats } from "@/app/dashboard/page";

export const dynamic = "force-dynamic";

export default async function ArabicDashboardOverview() {
  const stats = await getStats();
  return <DashboardOverviewBody locale="ar" stats={stats} />;
}
