import Link from "next/link";
import { faqItems } from "@/components/public/content";
import { JsonLd } from "@/components/public/json-ld";
import { PublicPageShell } from "@/components/public/public-page-shell";
import { breadcrumbJsonLd, createPageMetadata, faqJsonLd } from "@/lib/seo";

export const metadata = createPageMetadata({
  title: "Preguntas frecuentes sobre Citendia",
  description:
    "Resuelve dudas sobre agentes de llamadas, automatización de mensajes, reservas, citas y funcionamiento de Citendia para negocios en España.",
  path: "/faq",
  keywords: ["preguntas frecuentes agente de IA", "recepcionista virtual 24/7", "automatización de WhatsApp para empresas"]
});

export default function FaqPage() {
  const breadcrumb = [
    { name: "Inicio", path: "/" },
    { name: "FAQ", path: "/faq" }
  ];

  return (
    <>
      <JsonLd data={breadcrumbJsonLd(breadcrumb)} />
      <JsonLd data={faqJsonLd(faqItems.map((item) => ({ question: item.question, answer: item.answer })))} />
      <PublicPageShell
        breadcrumb={[
          { name: "Inicio", href: "/" },
          { name: "FAQ" }
        ]}
        description="Aquí respondemos las preguntas más habituales sobre Citendia, agentes telefónicos, mensajes automatizados, reservas, citas y portal de cliente."
        eyebrow="FAQ"
        title="Preguntas frecuentes sobre Citendia y sus agentes para negocios"
      >
        <section className="bg-white px-4 py-16 sm:px-6 lg:px-8">
          <div className="mx-auto grid max-w-[1140px] gap-4 lg:grid-cols-2">
            {faqItems.map((item) => (
              <article className="rounded-[24px] border border-[#dbe3ef] bg-white p-7 shadow-[0_14px_34px_-28px_rgba(15,23,42,0.18)]" key={item.question}>
                <h2 className="text-[23px] font-semibold tracking-[-0.04em] text-[#071027]">{item.question}</h2>
                <p className="mt-4 text-[16px] leading-[1.8] text-[#55657f]">{item.answer}</p>
              </article>
            ))}
          </div>

          <div className="mx-auto mt-12 max-w-[1140px] text-center">
            <p className="text-[16px] leading-[1.8] text-[#55657f]">Si tu duda es más concreta, escríbenos y te orientamos según tu tipo de negocio.</p>
            <div className="mt-8">
              <Link className="interactive-lift inline-flex h-[52px] items-center justify-center rounded-full bg-[#1854ff] px-7 text-[15px] font-semibold text-white hover:bg-[#0f46ea]" href="/contacto">
                Contactar con Citendia
              </Link>
            </div>
          </div>
        </section>
      </PublicPageShell>
    </>
  );
}
