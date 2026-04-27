import Link from "next/link";
import { PublicPageShell } from "@/components/public/public-page-shell";
import { JsonLd } from "@/components/public/json-ld";
import { breadcrumbJsonLd, createPageMetadata } from "@/lib/seo";

export const metadata = createPageMetadata({
  title: "Servicios de agentes de llamadas y mensajes",
  description:
    "Servicios de Citendia para automatizar llamadas, mensajes, citas y reservas con agentes inteligentes para negocios en España.",
  path: "/servicios",
  keywords: ["servicios de agentes de llamadas", "bot para reservas", "recepcionista virtual 24/7"]
});

export default function ServiciosPage() {
  const breadcrumb = [
    { name: "Inicio", path: "/" },
    { name: "Servicios", path: "/servicios" }
  ];

  return (
    <>
      <JsonLd data={breadcrumbJsonLd(breadcrumb)} />
      <PublicPageShell
        breadcrumb={[
          { name: "Inicio", href: "/" },
          { name: "Servicios" }
        ]}
        description="Citendia diseña agentes de llamadas y mensajes para negocios que necesitan atender clientes, responder dudas, agendar citas o cerrar reservas con continuidad."
        eyebrow="Servicios"
        title="Servicios de automatización para llamadas, mensajes y reservas"
      >
        <section className="bg-white px-4 py-16 sm:px-6 lg:px-8">
          <div className="mx-auto grid max-w-[1140px] gap-6 lg:grid-cols-2">
            {[
              {
                title: "Agente de IA para llamadas",
                text: "Atiende llamadas entrantes, responde preguntas frecuentes y filtra consultas para que tu negocio no dependa de contestar manualmente cada contacto."
              },
              {
                title: "Asistente virtual para citas",
                text: "Ideal para clínicas, peluquerías, centros de estética o talleres que necesitan agendar, mover o cancelar citas sin fricción."
              },
              {
                title: "Bot para reservas",
                text: "Para restaurantes y negocios con afluencia, Citendia automatiza reservas y cambios con una atención consistente durante todo el día."
              },
              {
                title: "Automatización de WhatsApp para empresas",
                text: "Resuelve dudas rápidas, comparte información clave y acompaña el proceso de atención en paralelo al teléfono."
              }
            ].map((item) => (
              <article className="rounded-[24px] border border-[#dbe3ef] bg-white p-7 shadow-[0_14px_34px_-28px_rgba(15,23,42,0.18)]" key={item.title}>
                <h2 className="text-[24px] font-semibold tracking-[-0.04em] text-[#071027]">{item.title}</h2>
                <p className="mt-4 text-[16px] leading-[1.75] text-[#55657f]">{item.text}</p>
              </article>
            ))}
          </div>

          <div className="mx-auto mt-12 max-w-[1140px] rounded-[28px] border border-[#dbe3ef] bg-[#f8fbff] p-8">
            <h2 className="text-[28px] font-semibold tracking-[-0.05em] text-[#071027]">Qué resuelve Citendia en el día a día</h2>
            <div className="mt-6 grid gap-4 md:grid-cols-2">
              {[
                "Llamadas perdidas fuera de horario o en horas punta",
                "Mensajes sin responder en WhatsApp o chat web",
                "Reservas o citas que dependen demasiado del personal disponible",
                "Pérdida de leads por no contestar a tiempo"
              ].map((item) => (
                <div className="rounded-[18px] bg-white px-5 py-4 text-[15px] text-[#091126]" key={item}>
                  {item}
                </div>
              ))}
            </div>
            <div className="mt-8">
              <Link className="interactive-lift inline-flex h-[52px] items-center justify-center rounded-full bg-[#1854ff] px-7 text-[15px] font-semibold text-white hover:bg-[#0f46ea]" href="/contacto">
                Solicitar una demo
              </Link>
            </div>
          </div>
        </section>
      </PublicPageShell>
    </>
  );
}
