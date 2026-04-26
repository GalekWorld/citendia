create table if not exists public.app_users (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null unique references auth.users(id) on delete cascade,
  company_id uuid references public.companies(id) on delete cascade,
  email text not null,
  full_name text,
  role text not null check (role in ('admin', 'client')),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  constraint app_users_role_company_check check (
    (role = 'admin' and company_id is null) or
    (role = 'client' and company_id is not null)
  )
);

create index if not exists app_users_user_id_idx on public.app_users(user_id);
create index if not exists app_users_company_id_idx on public.app_users(company_id);
create index if not exists app_users_role_idx on public.app_users(role);

drop trigger if exists app_users_set_updated_at on public.app_users;
create trigger app_users_set_updated_at
before update on public.app_users
for each row
execute function public.set_updated_at();

create or replace function public.is_admin()
returns boolean
language sql
stable
security definer
set search_path = public
as $$
  select exists (
    select 1
    from public.app_users
    where user_id = auth.uid()
      and role = 'admin'
  );
$$;

create or replace function public.can_access_company(target_company_id uuid)
returns boolean
language sql
stable
security definer
set search_path = public
as $$
  select
    public.is_admin()
    or exists (
      select 1
      from public.app_users
      where user_id = auth.uid()
        and role = 'client'
        and company_id = target_company_id
    );
$$;

alter table public.app_users enable row level security;

drop policy if exists "authenticated_companies_select" on public.companies;
drop policy if exists "authenticated_companies_insert" on public.companies;
drop policy if exists "authenticated_companies_update" on public.companies;

create policy "companies_select_by_role"
on public.companies
for select
to authenticated
using (public.can_access_company(id));

create policy "companies_insert_admin"
on public.companies
for insert
to authenticated
with check (public.is_admin());

create policy "companies_update_admin"
on public.companies
for update
to authenticated
using (public.is_admin())
with check (public.is_admin());

drop policy if exists "authenticated_bots_select" on public.bots;
drop policy if exists "authenticated_bots_insert" on public.bots;
drop policy if exists "authenticated_bots_update" on public.bots;

create policy "bots_select_by_role"
on public.bots
for select
to authenticated
using (public.can_access_company(company_id));

create policy "bots_insert_admin"
on public.bots
for insert
to authenticated
with check (public.is_admin());

create policy "bots_update_admin"
on public.bots
for update
to authenticated
using (public.is_admin())
with check (public.is_admin());

drop policy if exists "authenticated_calls_select" on public.calls;
drop policy if exists "authenticated_calls_insert" on public.calls;
drop policy if exists "authenticated_calls_update" on public.calls;

create policy "calls_select_by_role"
on public.calls
for select
to authenticated
using (public.can_access_company(company_id));

create policy "calls_insert_admin"
on public.calls
for insert
to authenticated
with check (public.is_admin());

create policy "calls_update_admin"
on public.calls
for update
to authenticated
using (public.is_admin())
with check (public.is_admin());

drop policy if exists "authenticated_monthly_usage_select" on public.monthly_usage;
drop policy if exists "authenticated_monthly_usage_insert" on public.monthly_usage;
drop policy if exists "authenticated_monthly_usage_update" on public.monthly_usage;

create policy "monthly_usage_select_by_role"
on public.monthly_usage
for select
to authenticated
using (public.can_access_company(company_id));

create policy "monthly_usage_insert_admin"
on public.monthly_usage
for insert
to authenticated
with check (public.is_admin());

create policy "monthly_usage_update_admin"
on public.monthly_usage
for update
to authenticated
using (public.is_admin())
with check (public.is_admin());

drop policy if exists "authenticated_invoices_select" on public.invoices;
drop policy if exists "authenticated_invoices_insert" on public.invoices;
drop policy if exists "authenticated_invoices_update" on public.invoices;

create policy "invoices_select_by_role"
on public.invoices
for select
to authenticated
using (public.can_access_company(company_id));

create policy "invoices_insert_admin"
on public.invoices
for insert
to authenticated
with check (public.is_admin());

create policy "invoices_update_admin"
on public.invoices
for update
to authenticated
using (public.is_admin())
with check (public.is_admin());

drop policy if exists "authenticated_settings_select" on public.settings;
drop policy if exists "authenticated_settings_insert" on public.settings;
drop policy if exists "authenticated_settings_update" on public.settings;

create policy "settings_select_admin"
on public.settings
for select
to authenticated
using (public.is_admin());

create policy "settings_insert_admin"
on public.settings
for insert
to authenticated
with check (public.is_admin());

create policy "settings_update_admin"
on public.settings
for update
to authenticated
using (public.is_admin())
with check (public.is_admin());

create policy "app_users_select_self_or_admin"
on public.app_users
for select
to authenticated
using (public.is_admin() or user_id = auth.uid());

create policy "app_users_insert_admin"
on public.app_users
for insert
to authenticated
with check (public.is_admin());

create policy "app_users_update_admin"
on public.app_users
for update
to authenticated
using (public.is_admin())
with check (public.is_admin());

create policy "app_users_delete_admin"
on public.app_users
for delete
to authenticated
using (public.is_admin());

insert into public.app_users (user_id, email, role)
select id, email, 'admin'
from auth.users
where email = 'admin@atendia.ai'
on conflict (user_id) do update
set email = excluded.email,
    role = excluded.role,
    company_id = null,
    updated_at = now();
