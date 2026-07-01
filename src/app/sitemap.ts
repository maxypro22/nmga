import type { MetadataRoute } from "next";
import { sectors } from "@/lib/sectors";

export default function sitemap(): MetadataRoute.Sitemap {
  const base = "https://nmj-group.qa";
  const now = new Date();

  const divisionPages = sectors.map((s) => ({
    url: `${base}/divisions/${s.slug}`,
    lastModified: now,
    changeFrequency: "monthly" as const,
    priority: 0.85,
  }));

  return [
    { url: base, lastModified: now, changeFrequency: "monthly", priority: 1.0 },
    { url: `${base}/about`, lastModified: now, changeFrequency: "monthly", priority: 0.9 },
    { url: `${base}/divisions`, lastModified: now, changeFrequency: "monthly", priority: 0.9 },
    ...divisionPages,
    { url: `${base}/careers`, lastModified: now, changeFrequency: "weekly", priority: 0.8 },
    { url: `${base}/news`, lastModified: now, changeFrequency: "weekly", priority: 0.75 },
    { url: `${base}/newsroom`, lastModified: now, changeFrequency: "weekly", priority: 0.8 },
    { url: `${base}/contact`, lastModified: now, changeFrequency: "monthly", priority: 0.6 },
    { url: `${base}/privacy`, lastModified: now, changeFrequency: "yearly", priority: 0.3 },
    // Arabic mirrors
    { url: `${base}/ar`, lastModified: now, changeFrequency: "monthly", priority: 0.95 },
    { url: `${base}/ar/about`, lastModified: now, changeFrequency: "monthly", priority: 0.85 },
    { url: `${base}/ar/divisions`, lastModified: now, changeFrequency: "monthly", priority: 0.85 },
    { url: `${base}/ar/careers`, lastModified: now, changeFrequency: "weekly", priority: 0.75 },
    { url: `${base}/ar/contact`, lastModified: now, changeFrequency: "monthly", priority: 0.55 },
  ];
}
