import Link from "next/link";
import { useCases } from "@/components/public/content";
import { JsonLd } from "@/components/public/json-ld";
import { PublicPageShell } from "@/components/public/public-page-shell";
import { breadcrumbJsonLd, createPageMetadata } from "@/lib/seo";

export const metadata = createPageMetadata({
  title: "Casos de uso por sector",
  description:
    "Casos de uso de Citendia para clínicas, peluquerías, restaurantes, inmobiliarias y negocios que necesitan automatizar llamadas y reservas.",
  path: "/casos-de-uso",
  keywords: ["agente telefónico para clínicas", "agente telefónico para restaurantes", "recepcionista virtual 24/7"]
});

export default function CasosDeUsoPage() {
  const breadcrumb = [
    { name: "Inicio", path: "/" },
    { name: "Casos de uso", path: "/casos-de-uso" }
  ];

  return (
    <>
      <JsonLd data={breadcrumbJsonLd(breadcrumb)} />
      <PublicPageShell
        breadcrumb={[
          { name: "Inicio", href: "/" },
          { name: "Casos de uso" }
        ]}
        description="No todos los negocios necesitan lo mismo. Citendia adapta sus agentes a sectores donde una llamada perdida o una reserva mal gestionada tiene impacto directo."
        eyebrow="Casos de uso"
        title="Sectores donde Citendia aporta más valor desde el primer día"
      >
        <section className="bg-white px-4 py-16 sm:px-6 lg:px-8">
          <div className="mx-auto grid max-w-[1140px] gap-5 lg:grid-cols-2">
            {useCases.map((item) => (
              <article className="rounded-[24px] border border-[#dbe3ef] bg-white p-7 shadow-[0_14px_34px_-28px_rgba(15,23,42,0.18)]" key={item.key}>
                <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-[#1854ff]">{item.label}</p>
                <h2 className="mt-4 text-[28px] font-semibold leading-[1.12] tracking-[-0.05em] text-[#071027]">{item.title}</h2>
                <p className="mt-5 text-[16px] leading-[1.8] text-[#55657f]">{item.description}</p>
                <ul className="mt-6 space-y-3 text-[15px] leading-[1.7] text-[#091126]">
                  {item.bullets.map((bullet) => (
                    <li key={bullet}>{bullet}</li>
                  ))}
                </ul>
              </article>
            ))}
          </div>

          <div className="mx-auto mt-12 max-w-[1140px] rounded-[28px] border border-[#dbe3ef] bg-[#f8fbff] p-8 text-left">
            <h2 className="text-[28px] font-semibold tracking-[-0.05em] text-[#071027]">¿Tu negocio recibe muchas llamadas o mensajes?</h2>
            <p className="mt-4 max-w-[760px] text-[16px] leading-[1.8] text-[#55657f]">
              Si tu equipo tiene atención al público, agenda, reservas o consultas frecuentes, Citendia puede ayudarte a automatizar la primera respuesta y a reducir llamadas perdidas. Es especialmente útil para negocios con atención constante en España.
            </p>
            <div className="mt-8">
              <Link className="interactive-lift inline-flex h-[52px] items-center justify-center rounded-full bg-[#1854ff] px-7 text-[15px] font-semibold text-white hover:bg-[#0f46ea]" href="/contacto">
                Solicitar demo sectorial
              </Link>
            </div>
          </div>
        </section>
      </PublicPageShell>
    </>
  );
}
