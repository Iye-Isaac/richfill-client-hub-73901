-- Create projects table
create table if not exists public.projects (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  description text,
  status text not null default 'active',
  message text,
  invoice_url text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

-- Enable Row Level Security
alter table public.projects enable row level security;

-- Simple updated_at trigger
create or replace function public.update_updated_at_column()
returns trigger as $$
begin
  new.updated_at = now();
  return new;
end;
$$ language plpgsql security definer set search_path = public;

drop trigger if exists projects_updated_at on public.projects;
create trigger projects_updated_at
before update on public.projects
for each row execute function public.update_updated_at_column();

-- Drop existing policies if they exist
drop policy if exists "Public can read projects" on public.projects;
drop policy if exists "Public can insert projects" on public.projects;
drop policy if exists "Public can update projects" on public.projects;
drop policy if exists "Public can delete projects" on public.projects;

-- TEMPORARY permissive policies for prototyping (public access)
create policy "Public can read projects"
  on public.projects for select
  using (true);

create policy "Public can insert projects"
  on public.projects for insert
  with check (true);

create policy "Public can update projects"
  on public.projects for update
  using (true) with check (true);

create policy "Public can delete projects"
  on public.projects for delete
  using (true);