create table if not exists public.landing_packages (
  id uuid primary key default gen_random_uuid(),
  slug text not null unique,
  name text not null,
  price text not null,
  price_suffix text,
  description text not null,
  features jsonb not null default '[]'::jsonb,
  button_label text not null,
  cta_href text not null,
  theme text not null check (theme in ('light', 'dark')) default 'light',
  badge text,
  sort_order integer not null default 0,
  active boolean not null default true,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

drop trigger if exists landing_packages_set_updated_at on public.landing_packages;
create trigger landing_packages_set_updated_at
before update on public.landing_packages
for each row
execute function public.set_updated_at();

alter table public.landing_packages enable row level security;

create policy "landing_packages_select_authenticated"
on public.landing_packages
for select
to authenticated
using (true);

create policy "landing_packages_insert_admin"
on public.landing_packages
for insert
to authenticated
with check (public.is_admin());

create policy "landing_packages_update_admin"
on public.landing_packages
for update
to authenticated
using (public.is_admin())
with check (public.is_admin());

create policy "landing_packages_delete_admin"
on public.landing_packages
for delete
to authenticated
using (public.is_admin());

insert into public.landing_packages (
  slug, name, price, price_suffix, description, features, button_label, cta_href, theme, badge, sort_order, active
)
values
  (
    'starter',
    'Starter',
    '199',
    '/mes',
    'Un agente de voz o chat para validar el caso de uso.',
    '["1 agente IA (voz o chat)","Hasta 500 conversaciones/mes","1 integracion con calendario","Soporte por email","Despliegue en 2 semanas"]'::jsonb,
    'Empezar ahora',
    '#contacto',
    'light',
    null,
    1,
    true
  ),
  (
    'pro',
    'Pro',
    '599',
    '/mes',
    'Para PYMES que quieren cubrir voz, chat y WhatsApp.',
    '["Hasta 3 agentes IA","Hasta 3.000 conversaciones/mes","Integraciones ilimitadas (CRM, calendario, ERP)","WhatsApp Business + Web + Voz","Mejora continua mensual","Soporte prioritario"]'::jsonb,
    'Hablar con ventas',
    'https://api.whatsapp.com/send?text=Hola%2C%20quiero%20informacion%20sobre%20Citendia',
    'dark',
    'Mas popular',
    2,
    true
  ),
  (
    'enterprise',
    'Enterprise',
    'Custom',
    null,
    'Volumen alto, multilingue, on-premise o requisitos especificos.',
    '["Agentes ilimitados","Volumen ilimitado","SLA 99,9 %","Cumplimiento RGPD avanzado","Manager de cuenta dedicado","Onboarding y formacion"]'::jsonb,
    'Solicitar propuesta',
    '#contacto',
    'light',
    null,
    3,
    true
  )
on conflict (slug) do update
set
  name = excluded.name,
  price = excluded.price,
  price_suffix = excluded.price_suffix,
  description = excluded.description,
  features = excluded.features,
  button_label = excluded.button_label,
  cta_href = excluded.cta_href,
  theme = excluded.theme,
  badge = excluded.badge,
  sort_order = excluded.sort_order,
  active = excluded.active,
  updated_at = now();
