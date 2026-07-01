import { cn } from "@/lib/utils";

/**
 * 3D text-flip on hover — the label flips a full turn around the X axis
 * (no duplicated text). Triggered by an ancestor `.group` hover or its own.
 *
 * Presentational only — safe in both server and client components.
 * Styling lives in globals.css (`.flip`).
 */
export function FlipText({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <span className={cn("flip", className)}>
      <span className="flip__inner">{children}</span>
    </span>
  );
}
