create table if not exists public.contact_leads (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  company_name text,
  email text not null,
  phone text,
  message text not null,
  source text not null default 'landing',
  status text not null default 'new' check (status in ('new', 'contacted', 'qualified', 'archived')),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create index if not exists contact_leads_status_idx on public.contact_leads(status);
create index if not exists contact_leads_created_at_idx on public.contact_leads(created_at desc);

drop trigger if exists contact_leads_set_updated_at on public.contact_leads;
create trigger contact_leads_set_updated_at
before update on public.contact_leads
for each row
execute function public.set_updated_at();

alter table public.contact_leads enable row level security;

drop policy if exists "contact_leads_select_admin" on public.contact_leads;
create policy "contact_leads_select_admin"
on public.contact_leads
for select
to authenticated
using (public.is_admin());

drop policy if exists "contact_leads_insert_admin" on public.contact_leads;
create policy "contact_leads_insert_admin"
on public.contact_leads
for insert
to authenticated
with check (public.is_admin());

drop policy if exists "contact_leads_update_admin" on public.contact_leads;
create policy "contact_leads_update_admin"
on public.contact_leads
for update
to authenticated
using (public.is_admin())
with check (public.is_admin());

drop policy if exists "contact_leads_delete_admin" on public.contact_leads;
create policy "contact_leads_delete_admin"
on public.contact_leads
for delete
to authenticated
using (public.is_admin());
