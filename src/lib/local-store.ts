import "server-only";
import fs from "fs";
import path from "path";
import { randomUUID } from "crypto";
import type { JobRow } from "./jobs";
import type { PressReleaseRow } from "./newsroom";

const DATA_DIR = path.join(process.cwd(), "data");

function ensureDir() {
  if (!fs.existsSync(DATA_DIR)) fs.mkdirSync(DATA_DIR, { recursive: true });
}

function read<T>(file: string): T[] {
  const p = path.join(DATA_DIR, file);
  if (!fs.existsSync(p)) return [];
  try { return JSON.parse(fs.readFileSync(p, "utf-8")) as T[]; } catch { return []; }
}

function write<T>(file: string, data: T[]) {
  ensureDir();
  fs.writeFileSync(path.join(DATA_DIR, file), JSON.stringify(data, null, 2), "utf-8");
}

// ── Jobs ──────────────────────────────────────────────────────────────────

export function localGetAllJobs(): JobRow[] {
  return read<JobRow>("jobs.json");
}

export function localGetActiveJobs(): JobRow[] {
  return localGetAllJobs()
    .filter((j) => j.is_active)
    .sort((a, b) => a.display_order - b.display_order);
}

export function localCreateJob(data: Omit<JobRow, "id" | "created_at">): JobRow {
  const all = localGetAllJobs();
  const job: JobRow = { ...data, id: randomUUID(), created_at: new Date().toISOString() };
  write("jobs.json", [job, ...all]);
  return job;
}

export function localUpdateJob(id: string, updates: Partial<JobRow>): JobRow | null {
  const all = localGetAllJobs();
  const idx = all.findIndex((j) => j.id === id);
  if (idx === -1) return null;
  all[idx] = { ...all[idx], ...updates };
  write("jobs.json", all);
  return all[idx];
}

export function localDeleteJob(id: string): boolean {
  const all = localGetAllJobs();
  const next = all.filter((j) => j.id !== id);
  if (next.length === all.length) return false;
  write("jobs.json", next);
  return true;
}

// ── Press Releases ────────────────────────────────────────────────────────

export function localGetAllReleases(): PressReleaseRow[] {
  return read<PressReleaseRow>("newsroom.json");
}

export function localGetPublishedReleases(): PressReleaseRow[] {
  return localGetAllReleases()
    .filter((r) => r.is_published)
    .sort((a, b) => a.display_order - b.display_order);
}

export function localCreateRelease(data: Omit<PressReleaseRow, "id" | "created_at">): PressReleaseRow {
  const all = localGetAllReleases();
  const release: PressReleaseRow = { ...data, id: randomUUID(), created_at: new Date().toISOString() };
  write("newsroom.json", [release, ...all]);
  return release;
}

export function localUpdateRelease(id: string, updates: Partial<PressReleaseRow>): PressReleaseRow | null {
  const all = localGetAllReleases();
  const idx = all.findIndex((r) => r.id === id);
  if (idx === -1) return null;
  all[idx] = { ...all[idx], ...updates };
  write("newsroom.json", all);
  return all[idx];
}

export function localDeleteRelease(id: string): boolean {
  const all = localGetAllReleases();
  const next = all.filter((r) => r.id !== id);
  if (next.length === all.length) return false;
  write("newsroom.json", next);
  return true;
}
