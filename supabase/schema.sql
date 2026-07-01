-- ============================================================
-- NMJ Group — Admin dashboard schema
-- Run this once in the Supabase SQL Editor.
--
-- Security model:
--   * All tables have Row Level Security enabled.
--   * NO policies are granted to the `anon` role (the public key).
--   * NO policies are granted to `authenticated` role.
--   * Only the `service_role` (server-side only, never exposed to
--     the browser) can read or write these tables. The Next.js
--     API routes use the service role; the rest of the site
--     never touches these tables at all.
--   * Password hashing uses pgcrypto's bcrypt (`bf` algorithm),
--     so plaintext passwords never leave the database during
--     verification.
-- ============================================================

-- 1. Required extensions
create extension if not exists pgcrypto;

-- 2. Tables
create table if not exists public.admins (
  id            uuid primary key default gen_random_uuid(),
  username      text unique not null check (char_length(username) between 3 and 64),
  password_hash text not null,
  created_at    timestamptz not null default now(),
  created_by    uuid references public.admins(id) on delete set null
);

create table if not exists public.content_overrides (
  key        text primary key check (char_length(key) between 1 and 200),
  value      text not null,
  updated_at timestamptz not null default now(),
  updated_by uuid references public.admins(id) on delete set null
);

create table if not exists public.site_settings (
  key        text primary key check (char_length(key) between 1 and 100),
  value      jsonb not null,
  updated_at timestamptz not null default now(),
  updated_by uuid references public.admins(id) on delete set null
);

-- 3. Lock everything down via RLS
alter table public.admins             enable row level security;
alter table public.content_overrides  enable row level security;
alter table public.site_settings      enable row level security;

-- Revoke any default grants for safety.
revoke all on public.admins             from anon, authenticated;
revoke all on public.content_overrides  from anon, authenticated;
revoke all on public.site_settings      from anon, authenticated;

-- service_role retains full access by default (Supabase grants it),
-- and bypasses RLS automatically. We intentionally write NO policies
-- here so that anon / authenticated have zero access.

-- 4. Helpers
create or replace function public.verify_admin_password(
  p_username text,
  p_password text
)
returns table (id uuid, username text)
language plpgsql
security definer
set search_path = public, extensions
as $$
begin
  return query
    select a.id, a.username
    from public.admins a
    where a.username = p_username
      and a.password_hash = crypt(p_password, a.password_hash);
end;
$$;

-- Only callable by the server-side service role.
revoke all on function public.verify_admin_password(text, text) from public, anon, authenticated;
grant execute on function public.verify_admin_password(text, text) to service_role;

create or replace function public.set_admin_password(
  p_id uuid,
  p_new_password text
)
returns void
language plpgsql
security definer
set search_path = public, extensions
as $$
begin
  update public.admins
     set password_hash = crypt(p_new_password, gen_salt('bf', 11))
   where id = p_id;
end;
$$;

revoke all on function public.set_admin_password(uuid, text) from public, anon, authenticated;
grant execute on function public.set_admin_password(uuid, text) to service_role;

create or replace function public.create_admin(
  p_username text,
  p_password text,
  p_created_by uuid
)
returns uuid
language plpgsql
security definer
set search_path = public, extensions
as $$
declare
  new_id uuid;
begin
  insert into public.admins (username, password_hash, created_by)
  values (
    p_username,
    crypt(p_password, gen_salt('bf', 11)),
    p_created_by
  )
  returning id into new_id;
  return new_id;
end;
$$;

revoke all on function public.create_admin(text, text, uuid) from public, anon, authenticated;
grant execute on function public.create_admin(text, text, uuid) to service_role;

-- 5. Seed the first admin: nmj-group / nmj-group2026
--    Only inserted if no admins exist yet, so re-running the file is safe.
do $$
begin
  if not exists (select 1 from public.admins) then
    perform public.create_admin('nmj-group', 'nmj-group2026', null);
  end if;
end
$$;
