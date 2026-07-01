-- ============================================================
-- NMJ Group — Jobs & Newsroom tables
-- Run this once in the Supabase SQL Editor (after schema.sql).
-- ============================================================

-- 1. Job listings (shown on /careers)
create table if not exists public.job_listings (
  id             uuid primary key default gen_random_uuid(),
  title          text not null check (char_length(title) between 1 and 200),
  division       text not null check (char_length(division) between 1 and 100),
  type           text not null default 'Full-time' check (type in ('Full-time', 'Part-time', 'Contract')),
  location       text not null default 'Doha, Qatar' check (char_length(location) between 1 and 200),
  description    text not null default '' check (char_length(description) <= 2000),
  is_active      boolean not null default true,
  display_order  integer not null default 0,
  created_at     timestamptz not null default now()
);

alter table public.job_listings enable row level security;

revoke all on public.job_listings from anon, authenticated;
-- service_role retains full access and bypasses RLS automatically.

-- 2. Press releases (shown on /newsroom)
create table if not exists public.press_releases (
  id             uuid primary key default gen_random_uuid(),
  date_label     text not null check (char_length(date_label) between 1 and 100),
  category       text not null check (char_length(category) between 1 and 100),
  headline       text not null check (char_length(headline) between 1 and 500),
  body           text not null check (char_length(body) between 1 and 5000),
  division       text not null check (char_length(division) between 1 and 100),
  is_published   boolean not null default true,
  display_order  integer not null default 0,
  created_at     timestamptz not null default now()
);

alter table public.press_releases enable row level security;

revoke all on public.press_releases from anon, authenticated;
