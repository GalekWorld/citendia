import Link from "next/link";
import { processSteps } from "@/components/public/content";
import { JsonLd } from "@/components/public/json-ld";
import { PublicPageShell } from "@/components/public/public-page-shell";
import { breadcrumbJsonLd, createPageMetadata } from "@/lib/seo";

export const metadata = createPageMetadata({
  title: "Cómo funciona Citendia",
  description:
    "Descubre cómo Citendia analiza tu negocio, configura el agente, conecta llamadas y mensajes y optimiza la atención al cliente 24/7.",
  path: "/como-funciona",
  keywords: ["cómo funciona un agente de llamadas", "automatizar llamadas de clientes", "asistente virtual para citas"]
});

export default function ComoFuncionaPage() {
  const breadcrumb = [
    { name: "Inicio", path: "/" },
    { name: "Cómo funciona", path: "/como-funciona" }
  ];

  return (
    <>
      <JsonLd data={breadcrumbJsonLd(breadcrumb)} />
      <PublicPageShell
        breadcrumb={[
          { name: "Inicio", href: "/" },
          { name: "Cómo funciona" }
        ]}
        description="Citendia se implanta sobre procesos reales: analizamos la atención de tu negocio, entrenamos el agente y medimos resultados para que responda como necesitas."
        eyebrow="Cómo funciona"
        title="Cómo implantamos un agente de llamadas y mensajes en tu negocio"
      >
        <section className="bg-white px-4 py-16 sm:px-6 lg:px-8">
          <div className="mx-auto grid max-w-[1140px] gap-4 lg:grid-cols-4">
            {processSteps.map((step, index) => (
              <article className="rounded-[24px] border border-[#dbe3ef] bg-white p-6 shadow-[0_14px_34px_-28px_rgba(15,23,42,0.18)]" key={step.title}>
                <p className="text-[12px] font-semibold uppercase tracking-[0.22em] text-[#1854ff]">Paso {index + 1}</p>
                <h2 className="mt-4 text-[22px] font-semibold tracking-[-0.04em] text-[#071027]">{step.title}</h2>
                <p className="mt-4 text-[15px] leading-[1.75] text-[#55657f]">{step.text}</p>
              </article>
            ))}
          </div>

          <div className="mx-auto mt-12 grid max-w-[1140px] gap-8 lg:grid-cols-[0.95fr_1.05fr]">
            <div>
              <h2 className="text-[28px] font-semibold tracking-[-0.05em] text-[#071027]">Implementación pensada para negocios españoles</h2>
              <p className="mt-5 text-[16px] leading-[1.8] text-[#55657f]">
                Citendia está pensado para empresas en España que necesitan automatizar llamadas y mensajes sin complicar su operación. Ajustamos horarios, lenguaje, objeciones frecuentes, tipos de cita y reservas, y el tono comercial o asistencial según el sector.
              </p>
            </div>
            <div className="rounded-[28px] border border-[#dbe3ef] bg-[#f8fbff] p-8">
              <h2 className="text-[24px] font-semibold tracking-[-0.04em] text-[#071027]">Qué recibe tu negocio</h2>
              <ul className="mt-5 space-y-3 text-[15px] leading-[1.7] text-[#55657f]">
                <li>Configuración inicial del agente para llamadas y mensajes.</li>
                <li>Guión adaptado a tu negocio, horarios y tipo de cliente.</li>
                <li>Conexión con reservas, citas o procesos internos cuando aplique.</li>
                <li>Seguimiento posterior para mejorar respuestas y conversión.</li>
              </ul>
              <div className="mt-8">
                <Link className="interactive-lift inline-flex h-[52px] items-center justify-center rounded-full bg-[#1854ff] px-7 text-[15px] font-semibold text-white hover:bg-[#0f46ea]" href="/contacto">
                  Hablar con Citendia
                </Link>
              </div>
            </div>
          </div>
        </section>
      </PublicPageShell>
    </>
  );
}
