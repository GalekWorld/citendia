import { HomePageClient } from "@/components/public/home-page-client";
import { JsonLd } from "@/components/public/json-ld";
import { createPageMetadata, localBusinessJsonLd, organizationJsonLd, serviceJsonLd, websiteJsonLd } from "@/lib/seo";

export const metadata = createPageMetadata({
  title: "Citendia | Agentes de llamadas y mensajes para negocios",
  description:
    "Citendia automatiza llamadas, mensajes y reservas con agentes inteligentes para que tu negocio atienda clientes 24/7 y no pierda oportunidades.",
  path: "/",
  keywords: [
    "agentes de llamadas para negocios",
    "agente de IA para llamadas",
    "automatizar llamadas de clientes",
    "automatización de WhatsApp para empresas"
  ]
});

export default function HomePage() {
  return (
    <>
      <JsonLd data={organizationJsonLd()} />
      <JsonLd data={websiteJsonLd()} />
      <JsonLd data={serviceJsonLd()} />
      <JsonLd data={localBusinessJsonLd()} />
      <HomePageClient />
    </>
  );
}
