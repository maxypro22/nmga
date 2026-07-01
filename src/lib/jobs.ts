import "server-only";
import { unstable_cache } from "next/cache";
import { getSupabaseAdmin, hasSupabaseConfig } from "@/lib/supabase";

export const JOBS_TAG = "job-listings";

export type JobRow = {
  id: string;
  title: string;
  division: string;
  type: string;
  location: string;
  description: string;
  is_active: boolean;
  display_order: number;
  created_at: string;
};

export const STATIC_JOBS: Omit<JobRow, "id" | "is_active" | "display_order" | "created_at">[] = [
  { title: "Guest Relations Manager", division: "Hospitality", type: "Full-time", location: "Doha, Qatar", description: "" },
  { title: "Food & Beverage Supervisor", division: "Hospitality", type: "Full-time", location: "Doha, Qatar", description: "" },
  { title: "Property Sales Consultant", division: "Real Estate", type: "Full-time", location: "Doha, Qatar", description: "" },
  { title: "Leasing Coordinator", division: "Real Estate", type: "Full-time", location: "Doha, Qatar", description: "" },
  { title: "Site Engineer", division: "Construction", type: "Full-time", location: "Doha, Qatar", description: "" },
  { title: "MEP Project Coordinator", division: "Construction", type: "Full-time", location: "Doha, Qatar", description: "" },
  { title: "Event Coordinator", division: "Events", type: "Full-time", location: "Doha, Qatar", description: "" },
  { title: "Wedding Planning Specialist", division: "Events", type: "Full-time", location: "Doha, Qatar", description: "" },
  { title: "Operations Team Leader", division: "Services", type: "Full-time", location: "Doha, Qatar", description: "" },
  { title: "Client Relations Supervisor", division: "Services", type: "Full-time", location: "Doha, Qatar", description: "" },
  { title: "Full-Stack Developer", division: "Technology", type: "Full-time", location: "Doha, Qatar", description: "" },
  { title: "IT Systems Administrator", division: "Technology", type: "Full-time", location: "Doha, Qatar", description: "" },
  { title: "AI / ML Engineer", division: "AI", type: "Full-time", location: "Doha, Qatar", description: "" },
  { title: "Data Analyst", division: "AI", type: "Full-time", location: "Doha, Qatar", description: "" },
];

async function fetchActiveJobsFromDB(): Promise<JobRow[]> {
  try {
    const supabase = getSupabaseAdmin();
    const { data, error } = await supabase
      .from("job_listings")
      .select("id, title, division, type, location, description, is_active, display_order, created_at")
      .eq("is_active", true)
      .order("display_order", { ascending: true })
      .order("created_at", { ascending: false });
    if (error || !data) return [];
    return data as JobRow[];
  } catch {
    return [];
  }
}

const cachedActiveJobs = unstable_cache(
  fetchActiveJobsFromDB,
  ["job-listings-active-v1"],
  { tags: [JOBS_TAG], revalidate: 60 }
);

export async function getActiveJobs(): Promise<JobRow[]> {
  if (!hasSupabaseConfig()) {
    const { localGetActiveJobs } = await import("./local-store");
    return localGetActiveJobs();
  }
  return cachedActiveJobs();
}

export async function getAllJobsForDashboard(): Promise<JobRow[]> {
  if (!hasSupabaseConfig()) {
    const { localGetAllJobs } = await import("./local-store");
    return localGetAllJobs();
  }
  try {
    const supabase = getSupabaseAdmin();
    const { data, error } = await supabase
      .from("job_listings")
      .select("id, title, division, type, location, description, is_active, display_order, created_at")
      .order("display_order", { ascending: true })
      .order("created_at", { ascending: false });
    if (error || !data) return [];
    return data as JobRow[];
  } catch {
    return [];
  }
}
