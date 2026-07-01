import { Skeleton } from "@/components/ui/Skeleton";

export default function DashboardLoading() {
  return (
    <div className="mx-auto max-w-[1100px]">
      <Skeleton className="h-3 w-24" />
      <Skeleton className="mt-4 h-10 w-64" />
      <Skeleton className="mt-4 h-4 w-full max-w-[62ch]" />

      <div className="mt-10 grid grid-cols-1 gap-4 lg:grid-cols-3 md:gap-6">
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:gap-6 lg:col-span-2 lg:grid-cols-2">
          {Array.from({ length: 4 }).map((_, i) => (
            <Skeleton key={i} className="h-[104px] rounded-[20px]" />
          ))}
        </div>
        <Skeleton className="h-[220px] rounded-[20px] lg:h-auto" />
      </div>

      <div className="mt-12 grid grid-cols-1 gap-4 md:grid-cols-2 md:gap-6">
        {Array.from({ length: 4 }).map((_, i) => (
          <Skeleton key={i} className="h-24 rounded-[20px]" />
        ))}
      </div>
    </div>
  );
}
