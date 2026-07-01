import { cn } from "@/lib/utils";

/**
 * Shimmering placeholder block for loading states.
 * Styling (`.skeleton` shimmer) lives in globals.css.
 */
export function Skeleton({
  className,
  ...rest
}: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      aria-hidden="true"
      className={cn("skeleton rounded-md", className)}
      {...rest}
    />
  );
}
