-- Create invoices table
create table public.invoices (
  id uuid primary key default gen_random_uuid(),
  project_id uuid references public.projects(id) on delete cascade not null,
  invoice_number text,
  amount numeric(10, 2),
  status text not null default 'draft',
  due_date date,
  notes text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

-- Create messages table
create table public.messages (
  id uuid primary key default gen_random_uuid(),
  project_id uuid references public.projects(id) on delete cascade not null,
  sender text not null,
  content text not null,
  created_at timestamptz not null default now()
);

-- Enable RLS
alter table public.invoices enable row level security;
alter table public.messages enable row level security;

-- Add updated_at trigger for invoices
create trigger invoices_updated_at
before update on public.invoices
for each row execute function public.update_updated_at_column();

-- Permissive policies for invoices (tighten when auth is added)
create policy "Public can read invoices"
  on public.invoices for select
  using (true);

create policy "Public can insert invoices"
  on public.invoices for insert
  with check (true);

create policy "Public can update invoices"
  on public.invoices for update
  using (true) with check (true);

create policy "Public can delete invoices"
  on public.invoices for delete
  using (true);

-- Permissive policies for messages (tighten when auth is added)
create policy "Public can read messages"
  on public.messages for select
  using (true);

create policy "Public can insert messages"
  on public.messages for insert
  with check (true);

create policy "Public can delete messages"
  on public.messages for delete
  using (true);