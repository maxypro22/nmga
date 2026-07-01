import "server-only";
import { unstable_cache } from "next/cache";
import { getSupabaseAdmin, hasSupabaseConfig } from "@/lib/supabase";

export const NEWSROOM_TAG = "press-releases";

export type PressReleaseRow = {
  id: string;
  date_label: string;
  category: string;
  headline: string;
  body: string;
  division: string;
  is_published: boolean;
  display_order: number;
  created_at: string;
};

export const STATIC_PRESS_RELEASES: Omit<PressReleaseRow, "id" | "is_published" | "display_order" | "created_at">[] = [
  {
    date_label: "2026",
    category: "Corporate",
    headline: "NMJ Group Celebrates 35 Years of Business Excellence in Qatar",
    body: "NMJ Group marks its 35th anniversary with a reaffirmed commitment to growth, quality, and diversified business leadership across Doha and the wider Gulf region.",
    division: "NMJ Group",
  },
  {
    date_label: "March 2026",
    category: "Technology & AI",
    headline: "Five Nodes AI Releases Advanced Workflow Automation Platform for Qatari Businesses",
    body: "Five Nodes AI, NMJ Group's artificial intelligence division, announces the release of its next-generation business automation platform, offering intelligent workflow management, AI communication systems, and real-time operational analytics.",
    division: "AI Division",
  },
  {
    date_label: "February 2026",
    category: "Hospitality",
    headline: "Sapphire Plaza Hotel Completes Full Facility Upgrade Programme",
    body: "Sapphire Plaza Hotel has successfully completed a comprehensive renovation programme encompassing guest rooms, banquet hall expansion, and new fitness centre facilities, reinforcing its standing as a premier 4-star destination in Doha.",
    division: "Hospitality Division",
  },
  {
    date_label: "April 2026",
    category: "Construction",
    headline: "Al Emara Al Islamiya Awarded Significant Infrastructure Contract in Doha",
    body: "Al Emara Al Islamiya Trading & Contracting has been awarded a major commercial infrastructure contract, furthering its track record in delivering high-quality MEP and contracting services across Qatar.",
    division: "Construction Division",
  },
  {
    date_label: "January 2026",
    category: "Technology",
    headline: "NexIT Global Broadens Enterprise Digital Solutions Suite",
    body: "NexIT Global announces the expansion of its enterprise technology portfolio to include enhanced document management systems and automation solutions tailored for Qatari businesses.",
    division: "Technology Division",
  },
  {
    date_label: "December 2025",
    category: "Events",
    headline: "Al Anaqh Events Records Strongest Wedding Season in Company History",
    body: "Al Anaqh Events & Wedding Planning concludes its most successful season, delivering over 80 events at Doha's leading venues and expanding its corporate event capabilities.",
    division: "Events Division",
  },
];

async function fetchPublishedReleasesFromDB(): Promise<PressReleaseRow[]> {
  try {
    const supabase = getSupabaseAdmin();
    const { data, error } = await supabase
      .from("press_releases")
      .select("id, date_label, category, headline, body, division, is_published, display_order, created_at")
      .eq("is_published", true)
      .order("display_order", { ascending: true })
      .order("created_at", { ascending: false });
    if (error || !data) return [];
    return data as PressReleaseRow[];
  } catch {
    return [];
  }
}

const cachedPublishedReleases = unstable_cache(
  fetchPublishedReleasesFromDB,
  ["press-releases-published-v1"],
  { tags: [NEWSROOM_TAG], revalidate: 60 }
);

export async function getPublishedPressReleases(): Promise<PressReleaseRow[]> {
  if (!hasSupabaseConfig()) {
    const { localGetPublishedReleases } = await import("./local-store");
    return localGetPublishedReleases();
  }
  return cachedPublishedReleases();
}

export async function getAllReleasesForDashboard(): Promise<PressReleaseRow[]> {
  if (!hasSupabaseConfig()) {
    const { localGetAllReleases } = await import("./local-store");
    return localGetAllReleases();
  }
  try {
    const supabase = getSupabaseAdmin();
    const { data, error } = await supabase
      .from("press_releases")
      .select("id, date_label, category, headline, body, division, is_published, display_order, created_at")
      .order("display_order", { ascending: true })
      .order("created_at", { ascending: false });
    if (error || !data) return [];
    return data as PressReleaseRow[];
  } catch {
    return [];
  }
}
