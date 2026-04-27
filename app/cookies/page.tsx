import { JsonLd } from "@/components/public/json-ld";
import { PublicPageShell } from "@/components/public/public-page-shell";
import { breadcrumbJsonLd, createPageMetadata } from "@/lib/seo";

export const metadata = createPageMetadata({
  title: "Política de cookies",
  description: "Información sobre las cookies y tecnologías similares utilizadas por Citendia en su sitio web.",
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
        description="Información clara sobre el uso de cookies técnicas y, en su caso, cookies de análisis o terceros en citendia.com."
        eyebrow="Cookies"
        title="Política de cookies de Citendia"
      >
        <section className="bg-white px-4 py-16 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-[920px] space-y-10 text-left">
            <section>
              <h2 className="text-[26px] font-semibold tracking-[-0.04em] text-[#071027]">1. Qué son las cookies</h2>
              <p className="mt-4 text-[16px] leading-[1.85] text-[#55657f]">
                Las cookies son pequeños archivos que se almacenan en el dispositivo de la persona usuaria al visitar una web. Sirven para permitir funciones técnicas, recordar preferencias y, en algunos casos, medir el uso del sitio.
              </p>
            </section>

            <section>
              <h2 className="text-[26px] font-semibold tracking-[-0.04em] text-[#071027]">2. Qué cookies puede usar Citendia</h2>
              <div className="mt-4 space-y-4 text-[16px] leading-[1.85] text-[#55657f]">
                <ul className="list-disc space-y-2 pl-6">
                  <li>Cookies técnicas necesarias para el funcionamiento del sitio.</li>
                  <li>Cookies de preferencia para recordar determinadas opciones de navegación.</li>
                  <li>Cookies analíticas o de terceros únicamente cuando resulte aplicable y exista una base legal válida.</li>
                </ul>
              </div>
            </section>

            <section>
              <h2 className="text-[26px] font-semibold tracking-[-0.04em] text-[#071027]">3. Gestión del consentimiento</h2>
              <p className="mt-4 text-[16px] leading-[1.85] text-[#55657f]">
                Al acceder a la web se muestra un aviso de cookies. A través de ese aviso, la persona usuaria puede aceptar o rechazar aquellas cookies no necesarias que correspondan.
              </p>
            </section>

            <section>
              <h2 className="text-[26px] font-semibold tracking-[-0.04em] text-[#071027]">4. Configuración del navegador</h2>
              <p className="mt-4 text-[16px] leading-[1.85] text-[#55657f]">
                Además del panel de cookies del sitio, cada navegador permite bloquear o eliminar cookies desde su propia configuración. La desactivación de cookies técnicas puede afectar al funcionamiento correcto de algunas partes de la web.
              </p>
            </section>

            <section>
              <h2 className="text-[26px] font-semibold tracking-[-0.04em] text-[#071027]">5. Actualización de esta política</h2>
              <p className="mt-4 text-[16px] leading-[1.85] text-[#55657f]">
                Esta política puede actualizarse para reflejar cambios normativos, técnicos o funcionales. Se recomienda revisarla periódicamente.
              </p>
            </section>
          </div>
        </section>
      </PublicPageShell>
    </>
  );
}
