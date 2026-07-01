import { cn } from "@/lib/utils";

interface EyebrowProps extends React.HTMLAttributes<HTMLSpanElement> {
  as?: "span" | "div" | "p";
  tone?: "gold" | "gold-subtle" | "muted";
  /** Show the leading accent line before the label. Defaults to true. */
  line?: boolean;
}

export function Eyebrow({
  as: Tag = "span",
  tone = "gold",
  line = true,
  className,
  children,
  ...rest
}: EyebrowProps) {
  const toneClass =
    tone === "gold"
      ? "text-[var(--color-gold)]"
      : tone === "gold-subtle"
        ? "text-[var(--color-gold-subtle)]"
        : "text-[var(--color-text-muted)]";

  const lineColor =
    tone === "gold"
      ? "bg-[var(--color-gold)]"
      : tone === "gold-subtle"
        ? "bg-[var(--color-gold-subtle)]"
        : "bg-[var(--color-text-muted)]";

  if (line) {
    return (
      <Tag
        className={cn(
          "inline-flex items-center gap-3 text-[11px] font-medium uppercase",
          "[letter-spacing:0.28em]",
          toneClass,
          className
        )}
        {...rest}
      >
        <span aria-hidden className={cn("h-px w-8 flex-none sm:w-10", lineColor)} />
        {children}
      </Tag>
    );
  }

  return (
    <Tag
      className={cn(
        "inline-block text-[11px] font-medium uppercase",
        "[letter-spacing:0.28em]",
        toneClass,
        className
      )}
      {...rest}
    >
      {children}
    </Tag>
  );
}
