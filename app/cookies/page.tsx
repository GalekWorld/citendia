import { JsonLd } from "@/components/public/json-ld";
import { PublicPageShell } from "@/components/public/public-page-shell";
import { breadcrumbJsonLd, createPageMetadata } from "@/lib/seo";

export const metadata = createPageMetadata({
  title: "Politica de cookies",
  description:
    "Informacion sobre cookies y tecnologias similares utilizadas por Citendia en su web oficial.",
  path: "/cookies"
});

export default function CookiesPage() {
  const breadcrumb = [
    { name: "Inicio", path: "/" },
    { name: "Cookies", path: "/cookies" }
  ];

  return (
    <>
      <JsonLd data={breadcrumbJsonLd(breadcrumb)} />
      <PublicPageShell
        breadcrumb={[
          { name: "Inicio", href: "/" },
          { name: "Cookies" }
        ]}
        description="Informacion clara sobre el uso de cookies tecnicas, de preferencia y, en su caso, analiticas en el sitio web de Citendia."
        eyebrow="Cookies"
        title="Politica de cookies de Citendia"
      >
        <section className="bg-white px-4 py-16 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-[920px] space-y-10 text-left">
            <section>
              <h2 className="text-[26px] font-semibold tracking-[-0.04em] text-[#071027]">1. Que son las cookies</h2>
              <p className="mt-4 text-[16px] leading-[1.85] text-[#55657f]">
                Las cookies son pequenos archivos que se almacenan en el dispositivo de la persona usuaria cuando visita un sitio web. Permiten recordar cierta informacion tecnica, preferencias de navegacion o datos estadisticos para mejorar la experiencia y el funcionamiento del portal.
              </p>
            </section>

            <section>
              <h2 className="text-[26px] font-semibold tracking-[-0.04em] text-[#071027]">2. Tipos de cookies que puede utilizar Citendia</h2>
              <div className="mt-4 space-y-4 text-[16px] leading-[1.85] text-[#55657f]">
                <p>En citendia.com pueden utilizarse las siguientes categorias de cookies:</p>
                <ul className="list-disc space-y-2 pl-6">
                  <li>Cookies tecnicas o estrictamente necesarias para el funcionamiento del sitio.</li>
                  <li>Cookies de preferencia para recordar determinadas opciones de navegacion.</li>
                  <li>Cookies analiticas o de medicion, exclusivamente si la persona usuaria presta su consentimiento cuando sean necesarias.</li>
                </ul>
              </div>
            </section>

            <section>
              <h2 className="text-[26px] font-semibold tracking-[-0.04em] text-[#071027]">3. Base juridica</h2>
              <p className="mt-4 text-[16px] leading-[1.85] text-[#55657f]">
                El uso de cookies tecnicas se fundamenta en la necesidad de permitir la navegacion y el funcionamiento del sitio. Las cookies no necesarias solo se utilizaran cuando exista una base juridica valida, normalmente el consentimiento informado de la persona usuaria.
              </p>
            </section>

            <section>
              <h2 className="text-[26px] font-semibold tracking-[-0.04em] text-[#071027]">4. Como gestionar las cookies</h2>
              <p className="mt-4 text-[16px] leading-[1.85] text-[#55657f]">
                Al acceder a la web, Citendia muestra un aviso para que la persona usuaria pueda aceptar o rechazar cookies no necesarias. Adicionalmente, cada navegador permite bloquear, restringir o eliminar cookies desde su configuracion. La desactivacion de algunas cookies tecnicas puede afectar al correcto funcionamiento del sitio.
              </p>
            </section>

            <section>
              <h2 className="text-[26px] font-semibold tracking-[-0.04em] text-[#071027]">5. Actualizaciones de esta politica</h2>
              <p className="mt-4 text-[16px] leading-[1.85] text-[#55657f]">
                Citendia podra actualizar la presente politica de cookies para adaptarla a cambios normativos, tecnicos o funcionales del sitio web. Se recomienda revisarla periodicamente para conocer la version vigente.
              </p>
            </section>
          </div>
        </section>
      </PublicPageShell>
    </>
  );
}
