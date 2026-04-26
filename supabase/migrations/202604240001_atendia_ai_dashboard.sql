create extension if not exists pgcrypto;

create or replace function public.set_updated_at()
returns trigger
language plpgsql
as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

create table if not exists public.companies (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  contact_name text,
  email text,
  phone text,
  status text not null default 'active' check (status in ('active', 'paused', 'cancelled')),
  installation_fee numeric not null default 125,
  monthly_fee numeric not null default 50,
  per_minute_fee numeric not null default 0.20,
  installation_charged boolean not null default false,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.bots (
  id uuid primary key default gen_random_uuid(),
  company_id uuid not null references public.companies(id) on delete cascade,
  name text not null,
  phone_number text,
  retell_agent_id text not null unique,
  status text not null default 'active' check (status in ('active', 'inactive')),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.calls (
  id uuid primary key default gen_random_uuid(),
  company_id uuid not null references public.companies(id) on delete cascade,
  bot_id uuid not null references public.bots(id) on delete cascade,
  retell_call_id text not null unique,
  caller_number text,
  started_at timestamptz,
  ended_at timestamptz,
  duration_seconds integer not null default 0,
  billed_minutes numeric not null default 0,
  cost numeric not null default 0,
  status text,
  summary text,
  transcript text,
  raw_payload jsonb,
  created_at timestamptz not null default now()
);

create table if not exists public.monthly_usage (
  id uuid primary key default gen_random_uuid(),
  company_id uuid not null references public.companies(id) on delete cascade,
  month integer not null,
  year integer not null,
  total_calls integer not null default 0,
  total_seconds integer not null default 0,
  total_minutes numeric not null default 0,
  variable_cost numeric not null default 0,
  fixed_cost numeric not null default 50,
  installation_fee numeric not null default 0,
  total_amount numeric not null default 0,
  invoice_status text not null default 'pending' check (invoice_status in ('pending', 'paid', 'overdue', 'cancelled')),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  unique (company_id, month, year)
);

create table if not exists public.invoices (
  id uuid primary key default gen_random_uuid(),
  company_id uuid not null references public.companies(id) on delete cascade,
  month integer not null,
  year integer not null,
  total_calls integer not null default 0,
  total_minutes numeric not null default 0,
  fixed_fee numeric not null default 50,
  variable_fee numeric not null default 0,
  installation_fee numeric not null default 0,
  total numeric not null default 0,
  status text not null default 'pending' check (status in ('pending', 'paid', 'overdue', 'cancelled')),
  issued_at timestamptz not null default now(),
  paid_at timestamptz,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  unique (company_id, month, year)
);

create table if not exists public.settings (
  id uuid primary key default gen_random_uuid(),
  installation_fee numeric not null default 125,
  monthly_fee numeric not null default 50,
  per_minute_fee numeric not null default 0.20,
  billing_rounding text not null default 'exact' check (billing_rounding in ('exact', 'ceil')),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create index if not exists companies_status_idx on public.companies(status);
create index if not exists bots_company_id_idx on public.bots(company_id);
create index if not exists bots_status_idx on public.bots(status);
create index if not exists calls_company_id_created_at_idx on public.calls(company_id, created_at desc);
create index if not exists calls_bot_id_created_at_idx on public.calls(bot_id, created_at desc);
create index if not exists monthly_usage_company_period_idx on public.monthly_usage(company_id, year desc, month desc);
create index if not exists invoices_company_period_idx on public.invoices(company_id, year desc, month desc);

drop trigger if exists companies_set_updated_at on public.companies;
create trigger companies_set_updated_at
before update on public.companies
for each row
execute function public.set_updated_at();

drop trigger if exists bots_set_updated_at on public.bots;
create trigger bots_set_updated_at
before update on public.bots
for each row
execute function public.set_updated_at();

drop trigger if exists monthly_usage_set_updated_at on public.monthly_usage;
create trigger monthly_usage_set_updated_at
before update on public.monthly_usage
for each row
execute function public.set_updated_at();

drop trigger if exists invoices_set_updated_at on public.invoices;
create trigger invoices_set_updated_at
before update on public.invoices
for each row
execute function public.set_updated_at();

drop trigger if exists settings_set_updated_at on public.settings;
create trigger settings_set_updated_at
before update on public.settings
for each row
execute function public.set_updated_at();

alter table public.companies enable row level security;
alter table public.bots enable row level security;
alter table public.calls enable row level security;
alter table public.monthly_usage enable row level security;
alter table public.invoices enable row level security;
alter table public.settings enable row level security;

drop policy if exists "authenticated_companies_select" on public.companies;
create policy "authenticated_companies_select"
on public.companies
for select
to authenticated
using (true);

drop policy if exists "authenticated_companies_insert" on public.companies;
create policy "authenticated_companies_insert"
on public.companies
for insert
to authenticated
with check (true);

drop policy if exists "authenticated_companies_update" on public.companies;
create policy "authenticated_companies_update"
on public.companies
for update
to authenticated
using (true)
with check (true);

drop policy if exists "authenticated_bots_select" on public.bots;
create policy "authenticated_bots_select"
on public.bots
for select
to authenticated
using (true);

drop policy if exists "authenticated_bots_insert" on public.bots;
create policy "authenticated_bots_insert"
on public.bots
for insert
to authenticated
with check (true);

drop policy if exists "authenticated_bots_update" on public.bots;
create policy "authenticated_bots_update"
on public.bots
for update
to authenticated
using (true)
with check (true);

drop policy if exists "authenticated_calls_select" on public.calls;
create policy "authenticated_calls_select"
on public.calls
for select
to authenticated
using (true);

drop policy if exists "authenticated_calls_insert" on public.calls;
create policy "authenticated_calls_insert"
on public.calls
for insert
to authenticated
with check (true);

drop policy if exists "authenticated_calls_update" on public.calls;
create policy "authenticated_calls_update"
on public.calls
for update
to authenticated
using (true)
with check (true);

drop policy if exists "authenticated_monthly_usage_select" on public.monthly_usage;
create policy "authenticated_monthly_usage_select"
on public.monthly_usage
for select
to authenticated
using (true);

drop policy if exists "authenticated_monthly_usage_insert" on public.monthly_usage;
create policy "authenticated_monthly_usage_insert"
on public.monthly_usage
for insert
to authenticated
with check (true);

drop policy if exists "authenticated_monthly_usage_update" on public.monthly_usage;
create policy "authenticated_monthly_usage_update"
on public.monthly_usage
for update
to authenticated
using (true)
with check (true);

drop policy if exists "authenticated_invoices_select" on public.invoices;
create policy "authenticated_invoices_select"
on public.invoices
for select
to authenticated
using (true);

drop policy if exists "authenticated_invoices_insert" on public.invoices;
create policy "authenticated_invoices_insert"
on public.invoices
for insert
to authenticated
with check (true);

drop policy if exists "authenticated_invoices_update" on public.invoices;
create policy "authenticated_invoices_update"
on public.invoices
for update
to authenticated
using (true)
with check (true);

drop policy if exists "authenticated_settings_select" on public.settings;
create policy "authenticated_settings_select"
on public.settings
for select
to authenticated
using (true);

drop policy if exists "authenticated_settings_insert" on public.settings;
create policy "authenticated_settings_insert"
on public.settings
for insert
to authenticated
with check (true);

drop policy if exists "authenticated_settings_update" on public.settings;
create policy "authenticated_settings_update"
on public.settings
for update
to authenticated
using (true)
with check (true);

insert into public.settings (installation_fee, monthly_fee, per_minute_fee, billing_rounding)
select 125, 50, 0.20, 'exact'
where not exists (select 1 from public.settings);
