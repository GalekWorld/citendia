import Link from "next/link";
import { JsonLd } from "@/components/public/json-ld";
import { PublicPageShell } from "@/components/public/public-page-shell";
import { defaultLandingPackages } from "@/lib/landing-packages";
import { breadcrumbJsonLd, createPageMetadata } from "@/lib/seo";
import { createAdminClient } from "@/lib/supabase/admin";

export const metadata = createPageMetadata({
  title: "Precios de Citendia",
  description:
    "Consulta los precios y planes de Citendia para agentes de llamadas, mensajes, citas y reservas para negocios en España.",
  path: "/precios",
  keywords: ["precios agente de IA para llamadas", "precio bot para reservas", "planes centralita inteligente"]
});

export default async function PreciosPage() {
  const breadcrumb = [
    { name: "Inicio", path: "/" },
    { name: "Precios", path: "/precios" }
  ];

  const admin = createAdminClient();
  const { data } = await admin.from("landing_packages").select("*").eq("active", true).order("sort_order", {
    ascending: true
  });
  const packages = data?.length ? data : defaultLandingPackages;

  return (
    <>
      <JsonLd data={breadcrumbJsonLd(breadcrumb)} />
      <PublicPageShell
        breadcrumb={[
          { name: "Inicio", href: "/" },
          { name: "Precios" }
        ]}
        description="Compara los planes de Citendia para automatizar llamadas, WhatsApp, citas y reservas con una estructura clara y orientada a resultados."
        eyebrow="Precios"
        title="Planes de Citendia para automatizar atención y reservas"
      >
        <section className="bg-white px-4 py-16 sm:px-6 lg:px-8">
          <div className="mx-auto grid max-w-[1140px] gap-5 lg:grid-cols-3">
            {packages.map((pkg) => {
              const isDark = pkg.theme === "dark";
              return (
                <article className={`relative rounded-[26px] border px-7 py-7 ${isDark ? "border-[#0a0f24] bg-[#050918] text-white" : "border-[#dbe3ef] bg-white text-[#071027]"}`} key={pkg.slug}>
                  {pkg.badge ? (
                    <div className="absolute left-6 top-0 -translate-y-1/2 rounded-full bg-[#ff5a36] px-4 py-1.5 text-[11px] font-semibold uppercase tracking-[0.18em] text-white">
                      {pkg.badge}
                    </div>
                  ) : null}
                  <p className={`text-[11px] font-semibold uppercase tracking-[0.28em] ${isDark ? "text-white/70" : "text-[#7082a3]"}`}>{pkg.name}</p>
                  <div className="mt-6 flex items-end gap-1">
                    {pkg.price === "Custom" ? (
                      <span className="text-[56px] font-semibold tracking-[-0.06em]">Custom</span>
                    ) : (
                      <>
                        <span className={`text-[22px] ${isDark ? "text-white/80" : "text-[#55657f]"}`}>€</span>
                        <span className="text-[56px] font-semibold leading-none tracking-[-0.06em]">{pkg.price}</span>
                        <span className={`mb-1 text-[18px] ${isDark ? "text-white/70" : "text-[#55657f]"}`}>{pkg.price_suffix ?? ""}</span>
                      </>
                    )}
                  </div>
                  <p className={`mt-4 min-h-[52px] text-[15px] leading-[1.55] ${isDark ? "text-white/74" : "text-[#55657f]"}`}>{pkg.description}</p>
                  <ul className="mt-8 space-y-4">
                    {pkg.features.map((feature: string) => (
                      <li className={`text-[15px] leading-[1.45] ${isDark ? "text-white/88" : "text-[#091126]"}`} key={feature}>
                        {feature}
                      </li>
                    ))}
                  </ul>
                </article>
              );
            })}
          </div>

          <div className="mx-auto mt-10 max-w-[1140px] text-center">
            <p className="text-[15px] leading-[1.7] text-[#55657f]">
              Si tu empresa necesita un despliegue especial para voz, mensajes, reservas o integración con CRM, podemos diseñar una propuesta específica.
            </p>
            <div className="mt-8">
              <Link className="interactive-lift inline-flex h-[52px] items-center justify-center rounded-full bg-[#1854ff] px-7 text-[15px] font-semibold text-white hover:bg-[#0f46ea]" href="/contacto">
                Pedir propuesta
              </Link>
            </div>
          </div>
        </section>
      </PublicPageShell>
    </>
  );
}
