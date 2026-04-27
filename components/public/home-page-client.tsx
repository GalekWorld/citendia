"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { ArrowRight, CalendarDays, Check, Mail, MessageCircleMore, Phone, PlayCircle, Send, ShieldCheck } from "lucide-react";
import { toast } from "sonner";
import type { LandingPackage } from "@/lib/landing-packages";
import { defaultLandingPackages } from "@/lib/landing-packages";
import { useCases } from "@/components/public/content";
import { CookieBanner } from "@/components/public/cookie-banner";
import { SiteFooter } from "@/components/public/site-footer";
import { SiteHeader } from "@/components/public/site-header";

export function HomePageClient() {
  return (
    <>
      <SiteHeader />
      <main className="min-h-screen bg-white text-[#091126]">
        <Hero />
        <TrustMarquee />
        <ServicesSection />
        <UseCasesSection />
        <PricingSection />
        <ContactSection />
      </main>
      <SiteFooter />
      <CookieBanner />
    </>
  );
}

function Hero() {
  return (
    <section className="relative overflow-hidden">
      <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(148,163,184,0.11)_1px,transparent_1px),linear-gradient(to_bottom,rgba(148,163,184,0.11)_1px,transparent_1px)] bg-[size:56px_56px]" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_18%_24%,rgba(24,84,255,0.04),transparent_28%),radial-gradient(circle_at_82%_38%,rgba(24,84,255,0.04),transparent_24%)]" />

      <section className="relative mx-auto grid min-h-[calc(70vh-68px)] w-full max-w-[1140px] items-center gap-10 px-4 py-10 sm:min-h-[calc(72vh-72px)] sm:px-6 sm:py-14 lg:grid-cols-[0.9fr_1.02fr] lg:gap-12 lg:px-8 lg:py-16">
        <div className="mx-auto w-full max-w-[560px] text-left lg:mx-0">
          <div className="flex items-center gap-3 text-[10px] font-medium uppercase tracking-[0.3em] text-[#7082a3] sm:text-[11px]">
            <span className="h-2 w-2 rounded-full bg-[#ff3b30]" />
            Agentes de llamadas y mensajes para negocios
          </div>

          <h1 className="mt-5 text-[34px] font-semibold leading-[0.96] tracking-[-0.07em] text-[#060d23] sm:text-[44px] lg:text-[58px] xl:text-[64px]">
            Tu recepcionista
            <br />
            <span className="text-[#1854ff]">de IA</span> que nunca
            <br />
            duerme.
          </h1>

          <p className="mt-6 max-w-[540px] text-[16px] leading-[1.7] text-[#5f6f8d] sm:text-[18px]">
            Citendia automatiza llamadas, mensajes, citas y reservas para negocios españoles que necesitan atender mejor, vender más y dejar de perder oportunidades.
          </p>

          <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:items-center">
            <Link
              className="interactive-lift inline-flex h-[52px] items-center justify-center gap-3 rounded-full bg-[#1854ff] px-7 text-[15px] font-semibold text-white shadow-[0_24px_50px_-30px_rgba(24,84,255,0.95)] hover:bg-[#0f46ea]"
              href="/contacto"
            >
              Solicitar demo
              <ArrowRight className="h-4.5 w-4.5" />
            </Link>

            <Link
              className="interactive-lift inline-flex h-[52px] items-center justify-center gap-3 rounded-full border border-slate-200 bg-white px-7 text-[15px] font-medium text-[#111a2f] shadow-[0_16px_32px_-26px_rgba(15,23,42,0.4)] hover:border-[#1854ff]/30 hover:text-[#1854ff]"
              href="/como-funciona"
            >
              <PlayCircle className="h-4.5 w-4.5" />
              Ver cómo funciona
            </Link>
          </div>

          <div className="mt-8 flex flex-col gap-3 text-[13px] text-[#7a879f] sm:flex-row sm:items-center sm:gap-6">
            <div className="flex items-center gap-3">
              <span className="h-2.5 w-2.5 rounded-full bg-[#42d392]" />
              Atención 24/7 para negocios en España
            </div>
            <div className="flex items-center gap-3">
              <span className="h-2.5 w-2.5 rounded-full bg-[#1854ff]" />
              Llamadas, mensajes y reservas en un solo sistema
            </div>
          </div>
        </div>

        <HeroVisual />
      </section>
    </section>
  );
}

function HeroVisual() {
  return (
    <div className="relative mx-auto hidden w-full max-w-[560px] lg:block">
      <div className="relative mx-auto aspect-[1.04/1] w-full max-w-[560px]">
        <div className="absolute inset-x-[28px] top-[18px] bottom-[10px] rounded-[34px] border border-[#dbe4f1] bg-white shadow-[0_38px_80px_-52px_rgba(15,23,42,0.2)]" />

        <div className="absolute inset-x-[56px] top-[44px] bottom-[34px] rounded-[28px] border border-[#dfe8f4] bg-[#fcfdff] p-5 shadow-[inset_0_1px_0_rgba(255,255,255,0.9)]">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-[11px] uppercase tracking-[0.24em] text-slate-400">Panel Citendia</p>
              <h2 className="mt-1 text-[18px] font-semibold tracking-[-0.04em] text-[#091126]">
                Operación del cliente
              </h2>
            </div>
            <div className="rounded-full border border-emerald-200 bg-emerald-50 px-3 py-1 text-[11px] font-semibold text-emerald-700">
              En directo
            </div>
          </div>

          <div className="mt-4 rounded-[18px] border border-[#e4ebf6] bg-white px-4 py-3">
            <div className="flex items-center justify-between gap-4">
              <div>
                <p className="text-[12px] font-medium text-[#091126]">Centro de estética · Madrid</p>
                <p className="mt-1 text-[12px] text-slate-500">
                  Llamadas, WhatsApp y agenda conectados
                </p>
              </div>
              <div className="rounded-full bg-[#eef3ff] px-3 py-1 text-[11px] font-semibold text-[#1f51fb]">
                Activo
              </div>
            </div>
          </div>

          <div className="mt-4 grid grid-cols-2 gap-3">
            <MetricCard label="Llamadas" value="247" caption="Este mes" />
            <MetricCard label="Minutos" value="812" caption="Acumulados" />
            <MetricCard label="Reservas" value="59" caption="Confirmadas" />
            <MetricCard accent label="Oportunidades" value="3" caption="Por revisar" />
          </div>

          <div className="mt-4 rounded-[18px] border border-[#e4ebf6] bg-white p-4">
            <p className="text-[11px] uppercase tracking-[0.18em] text-slate-400">Canales conectados</p>
            <div className="mt-3 flex flex-wrap gap-2">
              {["Teléfono", "WhatsApp", "Chat web", "Reservas"].map((item) => (
                <span className="rounded-full bg-[#f2f6fb] px-3 py-1.5 text-[12px] font-medium text-[#56657e]" key={item}>
                  {item}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function MetricCard({
  label,
  value,
  caption,
  accent = false
}: {
  label: string;
  value: string;
  caption: string;
  accent?: boolean;
}) {
  return (
    <div className={`rounded-[18px] border p-4 ${accent ? "border-[#2551f5] bg-[#2551f5] text-white" : "border-[#e4ebf6] bg-white"}`}>
      <p className={`text-[11px] uppercase tracking-[0.18em] ${accent ? "text-white/72" : "text-slate-400"}`}>{label}</p>
      <p className={`mt-2 text-[24px] font-semibold tracking-[-0.05em] ${accent ? "text-white" : "text-[#091126]"}`}>{value}</p>
      <p className={`mt-1 text-[12px] ${accent ? "text-white/82" : "text-slate-500"}`}>{caption}</p>
    </div>
  );
}

function TrustMarquee() {
  const clients = [
    "Ashford House",
    "Lexinton Abogados",
    "FollowRadar",
    "Eventro",
    "Clínica Veralia",
    "Grupo Almanzor",
    "Nexa Dental Studio",
    "Atelier Brisa",
    "Taller Montecar",
    "Hotel Costa Elma"
  ];

  const items = [...clients, ...clients];

  return (
    <section className="section-divider bg-white pt-8">
      <div className="mx-auto w-full max-w-[1140px] px-4 py-5 sm:px-6 lg:px-8">
        <p className="text-center text-[10px] font-medium uppercase tracking-[0.34em] text-[#8b97ad]">
          Empresas que ya usan agentes de atención y reservas con Citendia
        </p>
      </div>

      <div className="overflow-hidden border-y border-slate-200/70">
        <div className="marquee-track flex min-w-max items-center gap-10 py-5">
          {items.map((client, index) => (
            <span className="whitespace-nowrap text-[16px] font-semibold tracking-[-0.04em] text-[#9aa7bd]" key={`${client}-${index}`}>
              {client}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}

function ServicesSection() {
  const cards = [
    {
      title: "Llamadas IA",
      description: "Agente de IA para llamadas entrantes, dudas frecuentes y seguimiento comercial.",
      pills: ["Latencia baja", "Voz natural", "Derivación si hace falta"],
      icon: "phone"
    },
    {
      title: "Citas y reservas",
      description: "Reserva, mueve y cancela citas para negocios con agenda, reservas o turnos.",
      pills: ["Google / Outlook", "Recordatorios", "Disponibilidad en tiempo real"],
      icon: "calendar"
    },
    {
      title: "Mensajes y WhatsApp",
      description: "Automatización de WhatsApp para empresas y respuesta unificada en canales digitales.",
      pills: ["WhatsApp Business", "Chat web", "Contexto compartido"],
      icon: "chat"
    },
    {
      title: "Integraciones",
      description: "Conexiones con CRM, formularios, automatizaciones y herramientas que ya usa tu negocio.",
      pills: ["Webhooks", "API", "Zapier / Make"],
      icon: "shield"
    }
  ] as const;

  return (
    <section className="section-divider bg-white px-4 py-24 sm:px-6 sm:py-28 lg:px-8" id="servicios">
      <div className="mx-auto w-full max-w-[1140px]">
        <div className="max-w-[660px] text-left">
          <p className="text-[11px] font-semibold uppercase tracking-[0.28em] text-[#1854ff]">Servicios</p>
          <h2 className="mt-4 text-[30px] font-semibold leading-[1.06] tracking-[-0.06em] text-[#071027] sm:text-[36px] lg:text-[40px]">
            Todo lo que un negocio necesita para automatizar atención al cliente.
          </h2>
        </div>

        <div className="mt-9 grid gap-4 lg:grid-cols-2">
          {cards.map((card) => (
            <article className="interactive-lift rounded-[20px] border border-[#dbe3ef] bg-white px-5 py-5 shadow-[0_12px_36px_-30px_rgba(15,23,42,0.22)] hover:border-[#c9d7ec] hover:shadow-[0_22px_46px_-32px_rgba(15,23,42,0.28)] sm:px-6 sm:py-6" key={card.title}>
              <div className="flex h-10 w-10 items-center justify-center rounded-[12px] bg-[#edf3ff] text-[#1854ff]">
                {card.icon === "phone" ? <Phone className="h-5 w-5" /> : null}
                {card.icon === "calendar" ? <CalendarDays className="h-5 w-5" /> : null}
                {card.icon === "chat" ? <MessageCircleMore className="h-5 w-5" /> : null}
                {card.icon === "shield" ? <ShieldCheck className="h-5 w-5" /> : null}
              </div>

              <h3 className="mt-5 text-[20px] font-semibold tracking-[-0.04em] text-[#091126]">{card.title}</h3>
              <p className="mt-3 max-w-[500px] text-[14px] leading-[1.65] text-[#56657e] sm:text-[15px]">{card.description}</p>

              <div className="mt-5 flex flex-wrap gap-2">
                {card.pills.map((pill) => (
                  <span className="rounded-full bg-[#f2f5fa] px-3 py-1.5 text-[12px] font-medium text-[#5c6a83]" key={pill}>
                    {pill}
                  </span>
                ))}
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

function UseCasesSection() {
  const [activeTab, setActiveTab] = useState<(typeof useCases)[number]["key"]>("clinicas");
  const activeCase = useCases.find((item) => item.key === activeTab) ?? useCases[0];

  return (
    <section className="section-divider bg-white px-4 py-24 sm:px-6 sm:py-28 lg:px-8" id="casos-de-uso">
      <div className="mx-auto w-full max-w-[1140px]">
        <div className="max-w-[700px] text-left">
          <p className="text-[11px] font-semibold uppercase tracking-[0.28em] text-[#1854ff]">Casos de uso</p>
          <h2 className="mt-4 text-[30px] font-semibold leading-[1.06] tracking-[-0.06em] text-[#071027] sm:text-[36px] lg:text-[40px]">
            Diseñado para sectores donde cada llamada importa.
          </h2>
        </div>

        <div className="-mx-1 mt-9 overflow-x-auto pb-2 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
          <div className="inline-flex min-w-full gap-2 rounded-[24px] border border-[#dbe3ef] bg-white p-2 shadow-[0_10px_26px_-24px_rgba(15,23,42,0.2)] sm:min-w-0 sm:flex-wrap sm:gap-3 sm:rounded-full sm:p-3">
            {useCases.map((item) => {
              const isActive = item.key === activeTab;

              return (
                <button
                  className={`interactive-lift shrink-0 whitespace-nowrap rounded-full px-4 py-2.5 text-[14px] font-medium sm:px-5 sm:py-3 sm:text-[15px] ${isActive ? "bg-[#1854ff] text-white shadow-[0_18px_30px_-18px_rgba(24,84,255,0.9)]" : "text-[#60708c] hover:text-[#1854ff]"}`}
                  key={item.key}
                  onClick={() => setActiveTab(item.key)}
                  type="button"
                >
                  {item.label}
                </button>
              );
            })}
          </div>
        </div>

        <div className="mt-8 rounded-[24px] border border-[#dbe3ef] bg-[linear-gradient(90deg,rgba(15,23,42,0.05)_0%,rgba(255,255,255,0.82)_100%)] px-5 py-6 shadow-[0_18px_40px_-34px_rgba(15,23,42,0.22)] sm:mt-10 sm:rounded-[28px] sm:px-8 sm:py-10 lg:grid lg:grid-cols-[1.02fr_0.98fr] lg:gap-10 lg:px-12">
          <div className="max-w-[480px] text-left">
            <h3 className="text-[24px] font-semibold leading-[1.08] tracking-[-0.05em] text-[#061024] sm:text-[32px]">
              {activeCase.title}
            </h3>
            <p className="mt-4 text-[14px] leading-[1.7] text-[#55657f] sm:mt-6 sm:text-[16px]">{activeCase.description}</p>
          </div>

          <div className="mt-7 space-y-4 lg:mt-0 lg:pt-2">
            {activeCase.bullets.map((bullet) => (
              <div className="flex items-start gap-4 text-left" key={bullet}>
                <div className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-[#1854ff] text-white sm:h-7 sm:w-7">
                  <Check className="h-3.5 w-3.5 sm:h-4 sm:w-4" />
                </div>
                <p className="text-[14px] leading-[1.55] text-[#091126] sm:text-[16px]">{bullet}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function PricingSection() {
  const [packages, setPackages] = useState<LandingPackage[]>(defaultLandingPackages);

  useEffect(() => {
    let active = true;

    fetch("/api/public/landing-packages")
      .then((response) => response.json())
      .then((result) => {
        if (active && Array.isArray(result.data) && result.data.length) {
          setPackages(result.data);
        }
      })
      .catch(() => undefined);

    return () => {
      active = false;
    };
  }, []);

  return (
    <section className="section-divider bg-white px-4 py-24 sm:px-6 sm:py-28 lg:px-8" id="precios">
      <div className="mx-auto w-full max-w-[1140px]">
        <div className="max-w-[640px] text-left">
          <p className="text-[11px] font-semibold uppercase tracking-[0.28em] text-[#1854ff]">Precios</p>
          <h2 className="mt-4 text-[30px] font-semibold leading-[1.06] tracking-[-0.06em] text-[#071027] sm:text-[36px] lg:text-[40px]">
            Planes claros para negocios que quieren atender mejor.
          </h2>
          <p className="mt-5 text-[15px] leading-[1.7] text-[#55657f] sm:text-[16px]">
            Estructura simple, sin artificios. Puedes comparar opciones y pedir una propuesta adaptada a tu operación.
          </p>
        </div>

        <div className="mt-10 grid gap-5 lg:grid-cols-3">
          {packages
            .filter((item) => item.active)
            .sort((a, b) => a.sort_order - b.sort_order)
            .map((pkg) => (
              <PricingCard
                badge={pkg.badge ?? undefined}
                buttonLabel={pkg.button_label}
                ctaHref={pkg.cta_href}
                description={pkg.description}
                features={pkg.features}
                key={pkg.slug}
                name={pkg.name}
                price={pkg.price}
                priceSuffix={pkg.price_suffix ?? undefined}
                theme={pkg.theme}
              />
            ))}
        </div>

        <p className="mt-8 text-center text-[14px] text-[#7082a3]">
          Si tu negocio necesita una configuración específica, te preparamos una propuesta a medida.
        </p>
      </div>
    </section>
  );
}

function PricingCard({
  name,
  price,
  priceSuffix,
  description,
  features,
  buttonLabel,
  ctaHref,
  theme,
  badge
}: {
  name: string;
  price: string;
  priceSuffix?: string;
  description: string;
  features: string[];
  buttonLabel: string;
  ctaHref: string;
  theme: "light" | "dark";
  badge?: string;
}) {
  const isDark = theme === "dark";

  return (
    <article className={`interactive-lift relative rounded-[26px] border px-7 py-7 ${isDark ? "border-[#0a0f24] bg-[#050918] text-white shadow-[0_30px_60px_-40px_rgba(5,9,24,0.8)] hover:shadow-[0_40px_80px_-42px_rgba(5,9,24,0.9)]" : "border-[#dbe3ef] bg-white text-[#071027] hover:border-[#c9d7ec] hover:shadow-[0_24px_48px_-34px_rgba(15,23,42,0.2)]"}`}>
      {badge ? (
        <div className="absolute left-6 top-0 -translate-y-1/2 rounded-full bg-[#ff5a36] px-4 py-1.5 text-[11px] font-semibold uppercase tracking-[0.18em] text-white">
          {badge}
        </div>
      ) : null}

      <p className={`text-[11px] font-semibold uppercase tracking-[0.28em] ${isDark ? "text-white/70" : "text-[#7082a3]"}`}>{name}</p>

      <div className="mt-6 flex items-end gap-1">
        {price === "Custom" ? (
          <span className="text-[56px] font-semibold tracking-[-0.06em]">Custom</span>
        ) : (
          <>
            <span className={`text-[22px] ${isDark ? "text-white/80" : "text-[#55657f]"}`}>€</span>
            <span className="text-[56px] font-semibold leading-none tracking-[-0.06em]">{price}</span>
            <span className={`mb-1 text-[18px] ${isDark ? "text-white/70" : "text-[#55657f]"}`}>{priceSuffix}</span>
          </>
        )}
      </div>

      <p className={`mt-4 min-h-[52px] text-[15px] leading-[1.55] ${isDark ? "text-white/74" : "text-[#55657f]"}`}>{description}</p>

      <div className="mt-8 space-y-4">
        {features.map((feature) => (
          <div className="flex items-start gap-3" key={feature}>
            <Check className={`mt-0.5 h-4.5 w-4.5 ${isDark ? "text-[#ff5a36]" : "text-[#1854ff]"}`} />
            <span className={`text-[15px] leading-[1.45] ${isDark ? "text-white/88" : "text-[#091126]"}`}>{feature}</span>
          </div>
        ))}
      </div>

      <a
        className={`interactive-lift mt-10 inline-flex h-[54px] w-full items-center justify-center rounded-full px-6 text-[15px] font-semibold ${isDark ? "bg-white text-[#050918] hover:bg-slate-100" : "bg-[#050918] text-white hover:bg-[#111827]"}`}
        href={ctaHref}
        rel={ctaHref.startsWith("http") ? "noreferrer" : undefined}
        target={ctaHref.startsWith("http") ? "_blank" : undefined}
      >
        {buttonLabel}
      </a>
    </article>
  );
}

function ContactSection() {
  const [form, setForm] = useState({
    name: "",
    company_name: "",
    email: "",
    phone: "",
    message: ""
  });
  const [submitting, setSubmitting] = useState(false);

  return (
    <section className="section-divider bg-[#050918] px-4 py-24 text-white sm:px-6 sm:py-28 lg:px-8" id="contacto">
      <div className="mx-auto grid w-full max-w-[1140px] gap-10 lg:grid-cols-[0.82fr_1.18fr] lg:items-start">
        <div className="max-w-[420px] text-left">
          <p className="text-[11px] font-semibold uppercase tracking-[0.28em] text-[#ff4b3a]">Solicitar demo</p>
          <h2 className="mt-4 text-[30px] font-semibold leading-[1.02] tracking-[-0.06em] text-white sm:text-[36px] lg:text-[40px]">
            Hablemos de tu agente.
          </h2>
          <p className="mt-6 text-[16px] leading-[1.7] text-white/74">
            Cuéntanos cómo atiendes llamadas o mensajes hoy y te diremos cómo automatizar reservas, citas o soporte con un agente de Citendia.
          </p>

          <div className="mt-10 space-y-5 text-[16px] text-white/88">
            <div className="flex items-center gap-3">
              <Mail className="h-4.5 w-4.5 text-white/76" />
              <span>info@citendia.com</span>
            </div>
            <div className="flex items-center gap-3">
              <Phone className="h-4.5 w-4.5 text-white/76" />
              <span>620670568</span>
            </div>
          </div>
        </div>

        <form
          className="rounded-[26px] bg-white p-6 text-[#091126] shadow-[0_40px_90px_-60px_rgba(0,0,0,0.7)] sm:p-8"
          onSubmit={async (event) => {
            event.preventDefault();
            setSubmitting(true);

            const response = await fetch("/api/contact-leads", {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify({
                ...form,
                source: "landing"
              })
            });

            const result = await response.json();
            setSubmitting(false);

            if (!response.ok) {
              toast.error(result.error ?? "No se pudo enviar la solicitud");
              return;
            }

            toast.success("Solicitud enviada");
            setForm({
              name: "",
              company_name: "",
              email: "",
              phone: "",
              message: ""
            });
          }}
        >
          <div className="grid gap-5 sm:grid-cols-2">
            <Field label="Nombre *" name="name" placeholder="Tu nombre" value={form.name} onChange={(value) => setForm((current) => ({ ...current, name: value }))} />
            <Field label="Empresa" name="company_name" placeholder="Nombre de tu empresa" value={form.company_name} onChange={(value) => setForm((current) => ({ ...current, company_name: value }))} />
            <Field label="Email *" name="email" placeholder="tu@empresa.com" type="email" value={form.email} onChange={(value) => setForm((current) => ({ ...current, email: value }))} />
            <Field label="Teléfono" name="phone" placeholder="+34 ..." type="tel" value={form.phone} onChange={(value) => setForm((current) => ({ ...current, phone: value }))} />
          </div>

          <label className="mt-5 block text-left">
            <span className="mb-2 block text-[14px] font-medium text-[#091126]">Cuéntanos tu caso *</span>
            <textarea
              className="min-h-[140px] w-full rounded-[14px] border border-[#dbe3ef] px-4 py-3 text-[15px] text-[#091126] outline-none transition focus:border-[#1854ff]"
              name="message"
              onChange={(event) => setForm((current) => ({ ...current, message: event.target.value }))}
              placeholder="Qué te gustaría automatizar: llamadas, WhatsApp, citas, reservas o atención al cliente."
              value={form.message}
            />
          </label>

          <button className="interactive-lift mt-7 inline-flex h-[56px] w-full items-center justify-center gap-3 rounded-full bg-[#1854ff] px-6 text-[16px] font-semibold text-white hover:bg-[#0f46ea]" disabled={submitting} type="submit">
            {submitting ? "Enviando..." : "Solicitar demo"}
            <Send className="h-4.5 w-4.5" />
          </button>

          <p className="mt-4 text-center text-[13px] text-[#8b97ad]">
            Al enviar aceptas nuestra política de privacidad. No compartimos tus datos con terceros.
          </p>
        </form>
      </div>
    </section>
  );
}

function Field({
  label,
  name,
  placeholder,
  type = "text",
  value,
  onChange
}: {
  label: string;
  name: string;
  placeholder: string;
  type?: string;
  value: string;
  onChange: (value: string) => void;
}) {
  return (
    <label className="text-left">
      <span className="mb-2 block text-[14px] font-medium text-[#091126]">{label}</span>
      <input
        className="h-[48px] w-full rounded-[14px] border border-[#dbe3ef] px-4 text-[15px] text-[#091126] outline-none transition focus:border-[#1854ff]"
        name={name}
        onChange={(event) => onChange(event.target.value)}
        placeholder={placeholder}
        type={type}
        value={value}
      />
    </label>
  );
}
