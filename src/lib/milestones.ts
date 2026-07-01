/**
 * NMJ Group milestones — chronological history of the group from 1991 to today.
 *
 * Two categories:
 *   - verified: true   → confirmed via public records or direct family verification
 *   - verified: false  → educated estimate; pending Mashaal's confirmation
 *                        (rendered with a subtle outline marker on the timeline)
 *
 * To update: edit the year / yearSort / verified flag below. The page sorts by
 * yearSort descending. For multiple events in the same year, render order follows
 * the array order.
 */

export type Milestone = {
  /** Display value — may be "2024" or "~2024" if approximate */
  year: string;
  /** Used for sort (newest first) and any computed comparisons */
  yearSort: number;
  title: string;
  description: string;
  /** Gold eyebrow tag — which NMJ company the milestone belongs to */
  company: string;
  /** true = confirmed; false = needs Mashaal's review */
  verified: boolean;
  /** Internal note (not rendered in the UI) — for editors only */
  note?: string;
};

export const milestones: ReadonlyArray<Milestone> = [
  // ===== 2026 =====
  {
    year: "2026",
    yearSort: 2026,
    title: "Dania Maids receives BICSc accreditation",
    description:
      "Becomes the first cleaning company in Qatar to hold corporate membership of the British Institute of Cleaning Science — the UK's leading training and accreditation body for the professional cleaning industry.",
    company: "Dania Maids",
    verified: true,
  },
  {
    year: "2026",
    yearSort: 2026,
    title: "NMJ Group corporate website launches",
    description:
      "Launch of nmj-group.qa — the group-level digital presence presenting all eight operating companies under a single editorial identity.",
    company: "NMJ Group",
    verified: true,
  },

  // ===== ~2024–2025 =====
  {
    year: "~2024",
    yearSort: 2024,
    title: "Five Nodes opens London office",
    description:
      "Five Nodes establishes its UK presence at 167–169 Great Portland Street, expanding the AI engineering company's reach beyond Qatar.",
    company: "Five Nodes",
    verified: false,
    note: "Confirm exact opening year with Mashaal.",
  },
  {
    year: "~2024",
    yearSort: 2024,
    title: "Dania Maids deploys AI-powered booking",
    description:
      "First cleaning company in Qatar to deploy AI-powered booking and customer support — built by NMJ sister company Five Nodes — available 24/7 in Arabic and English.",
    company: "Dania Maids · Five Nodes",
    verified: true,
  },
  {
    year: "~2024",
    yearSort: 2024,
    title: "Five Nodes launches as NMJ Group's AI engineering arm",
    description:
      "NMJ Group establishes Five Nodes to build AI voice agents, omnichannel monitoring, and workflow automation — for both NMJ portfolio companies and external clients.",
    company: "Five Nodes",
    verified: false,
    note: "Confirm exact launch year — placeholder ~2024.",
  },

  // ===== 2022 =====
  {
    year: "2022",
    yearSort: 2022,
    title: "Next IT systems support FIFA World Cup Qatar 2022",
    description:
      "Long-running deployments at the Supreme Committee for Delivery & Legacy continue through Qatar's hosting of the FIFA World Cup — the largest sporting event ever held in the country.",
    company: "Next IT",
    verified: true,
  },

  // ===== ~2022 =====
  {
    year: "~2022",
    yearSort: 2022,
    title: "Al Emara Al Islamiya holds three ISO certifications",
    description:
      "Maintains ISO 9001 (Quality), ISO 14001 (Environmental), and ISO 45001 (Occupational Health & Safety) — independently audited and continuously certified.",
    company: "Al Emara Al Islamiya",
    verified: false,
    note: "Confirm year of first ISO certification with Mashaal — placeholder ~2022.",
  },

  // ===== ~2015 =====
  {
    year: "~2015",
    yearSort: 2015,
    title: "Sapphire Plaza Hotel opens in central Doha",
    description:
      "Four-star deluxe hotel in Fereej Bin Mahmoud opens with 174 rooms and suites, three dining venues, banquet halls, and meeting facilities — anchoring NMJ Group's Hospitality sector.",
    company: "Sapphire Plaza Hotel",
    verified: false,
    note: "Confirm opening year of Sapphire Plaza Hotel — placeholder ~2015.",
  },
  {
    year: "~2015",
    yearSort: 2015,
    title: "Steak Town opens at Sapphire Plaza Hotel",
    description:
      "NMJ Group's premium steakhouse launches inside Sapphire Plaza Hotel, anchored on its signature Hot Stone concept.",
    company: "Steak Town",
    verified: false,
    note: "Confirm opening year of Steak Town — placeholder ~2015.",
  },

  // ===== ~2010 =====
  {
    year: "~2010",
    yearSort: 2010,
    title: "Al Anaqa established as the group's events specialist",
    description:
      "NMJ Group establishes Al Anaqa as a dedicated wedding and events planning company — building partnerships with Qatar's leading hotels and event venues.",
    company: "Al Anaqa",
    verified: false,
    note: "Confirm founding year of Al Anaqa — placeholder ~2010.",
  },
  {
    year: "~2010",
    yearSort: 2010,
    title: "Next IT founded as NMJ Group's enterprise software arm",
    description:
      "NMJ Group establishes Next IT (operating as NIT Software) to deliver enterprise software systems — document management, correspondence, asset tracking, and business process automation — to Qatar's leading institutions.",
    company: "Next IT",
    verified: false,
    note: "Confirm founding year of Next IT — placeholder ~2010.",
  },

  // ===== 1998 =====
  {
    year: "1998",
    yearSort: 1998,
    title: "Dania Maids established",
    description:
      "NMJ Group establishes its facility services company. Dania Maids has since cleaned over 14,750 spaces across Qatar with more than 26,000 satisfied customers.",
    company: "Dania Maids",
    verified: true,
  },

  // ===== 1997 =====
  {
    year: "1997",
    yearSort: 1997,
    title: "Dania Real Estate established",
    description:
      "NMJ Group establishes its real estate brokerage — leasing and sales across Doha, with investment advisory and tenant relations as ongoing services.",
    company: "Dania Real Estate",
    verified: true,
  },

  // ===== 1991 =====
  {
    year: "1991",
    yearSort: 1991,
    title:
      "NMJ Group founded by Sheikh Nasser bin Mohammed bin Jaber Al Thani",
    description:
      "Al Emara Al Islamiya Co. (AIC) is established as a 100 percent Qatari-owned construction and contracting firm — the founding company of what would become NMJ Group. The firm specializes in luxury villa and palace construction across Qatar.",
    company: "Al Emara Al Islamiya · NMJ Group",
    verified: true,
  },
];

/** Sorted newest-first; intra-year order follows array order via stable sort. */
export function getSortedMilestones(): ReadonlyArray<Milestone> {
  return [...milestones].sort((a, b) => b.yearSort - a.yearSort);
}
