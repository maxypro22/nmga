export interface OverviewCard {
  label: string;
  value: string;
  support: string;
}

export function OverviewCards({ cards }: { cards: OverviewCard[] }) {
  return (
    <div data-reveal-stagger="120" className="vmv-grid">
      {cards.map((card) => (
        <div
          key={card.label}
          data-reveal
          className="vmv-card min-h-[280px] justify-start"
        >
          <span className="text-[11px] uppercase tracking-[0.28em] text-[var(--color-gold)]">
            {card.label}
          </span>
          <h3 className="mt-5 font-serif text-2xl leading-[1.2] tracking-[-0.005em] text-[var(--color-ink)]">
            {card.value}
          </h3>
          <p className="mt-4 text-[14px] leading-[1.7] text-[var(--color-text-muted)]">
            {card.support}
          </p>
        </div>
      ))}
    </div>
  );
}
