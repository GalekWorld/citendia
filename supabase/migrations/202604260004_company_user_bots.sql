create table if not exists public.company_user_bots (
  id uuid primary key default gen_random_uuid(),
  app_user_id uuid not null references public.app_users(id) on delete cascade,
  bot_id uuid not null references public.bots(id) on delete cascade,
  created_at timestamptz not null default now(),
  unique (app_user_id, bot_id)
);

create index if not exists company_user_bots_app_user_id_idx on public.company_user_bots(app_user_id);
create index if not exists company_user_bots_bot_id_idx on public.company_user_bots(bot_id);

alter table public.company_user_bots enable row level security;

create policy "company_user_bots_select_self_or_admin"
on public.company_user_bots
for select
to authenticated
using (
  public.is_admin()
  or exists (
    select 1
    from public.app_users
    where public.app_users.id = company_user_bots.app_user_id
      and public.app_users.user_id = auth.uid()
  )
);

create policy "company_user_bots_insert_admin"
on public.company_user_bots
for insert
to authenticated
with check (public.is_admin());

create policy "company_user_bots_update_admin"
on public.company_user_bots
for update
to authenticated
using (public.is_admin())
with check (public.is_admin());

create policy "company_user_bots_delete_admin"
on public.company_user_bots
for delete
to authenticated
using (public.is_admin());
