import Link from "next/link";
import { JsonLd } from "@/components/public/json-ld";
import { PublicPageShell } from "@/components/public/public-page-shell";
import { breadcrumbJsonLd, createPageMetadata } from "@/lib/seo";

export const metadata = createPageMetadata({
  title: "Contacto y solicitud de demo",
  description:
    "Contacta con Citendia para solicitar una demo de agentes de llamadas y mensajes para negocios en España.",
  path: "/contacto",
  keywords: ["contacto Citendia", "solicitar demo agente de llamadas", "automatizar llamadas de clientes"]
});

export default function ContactoPage() {
  const breadcrumb = [
    { name: "Inicio", path: "/" },
    { name: "Contacto", path: "/contacto" }
  ];

  return (
    <>
      <JsonLd data={breadcrumbJsonLd(breadcrumb)} />
      <PublicPageShell
        breadcrumb={[
          { name: "Inicio", href: "/" },
          { name: "Contacto" }
        ]}
        description="Si quieres ver cómo Citendia puede atender llamadas, mensajes, citas y reservas en tu empresa, aquí tienes la forma más directa de hablar con nosotros."
        eyebrow="Contacto"
        title="Solicita una demo de Citendia para tu negocio"
      >
        <section className="bg-white px-4 py-16 sm:px-6 lg:px-8">
          <div className="mx-auto grid max-w-[1140px] gap-6 lg:grid-cols-[0.9fr_1.1fr]">
            <article className="rounded-[26px] border border-[#dbe3ef] bg-[#050918] p-8 text-white">
              <h2 className="text-[28px] font-semibold tracking-[-0.05em]">Hablemos de tu operación</h2>
              <p className="mt-5 text-[16px] leading-[1.8] text-white/74">
                Trabajamos con negocios españoles que quieren automatizar llamadas, mensajes, reservas y citas sin perder control sobre la experiencia del cliente.
              </p>
              <div className="mt-8 space-y-4 text-[16px]">
                <p>Email: <a className="underline" href="mailto:info@citendia.com">info@citendia.com</a></p>
                <p>Teléfono: <a className="underline" href="tel:+34620670568">620670568</a></p>
                <p>Área de servicio: España</p>
              </div>
            </article>

            <article className="rounded-[26px] border border-[#dbe3ef] bg-[#f8fbff] p-8">
              <h2 className="text-[28px] font-semibold tracking-[-0.05em] text-[#071027]">Qué podemos revisar contigo</h2>
              <ul className="mt-5 space-y-3 text-[16px] leading-[1.75] text-[#55657f]">
                <li>Volumen de llamadas y mensajes que recibe tu negocio.</li>
                <li>Cómo agendas citas, reservas o visitas hoy.</li>
                <li>Qué dudas se repiten más en atención al cliente.</li>
                <li>Qué parte de la operación quieres automatizar primero.</li>
              </ul>
              <div className="mt-8 flex flex-wrap gap-3">
                <a className="interactive-lift inline-flex h-[52px] items-center justify-center rounded-full bg-[#1854ff] px-7 text-[15px] font-semibold text-white hover:bg-[#0f46ea]" href="mailto:info@citendia.com?subject=Solicitar%20demo%20Citendia">
                  Escribir a Citendia
                </a>
                <Link className="interactive-lift inline-flex h-[52px] items-center justify-center rounded-full border border-[#dbe3ef] bg-white px-7 text-[15px] font-semibold text-[#091126] hover:border-[#1854ff] hover:text-[#1854ff]" href="/">
                  Volver a la portada
                </Link>
              </div>
            </article>
          </div>
        </section>
      </PublicPageShell>
    </>
  );
}
