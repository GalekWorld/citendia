import { JsonLd } from "@/components/public/json-ld";
import { PublicPageShell } from "@/components/public/public-page-shell";
import { breadcrumbJsonLd, createPageMetadata } from "@/lib/seo";

export const metadata = createPageMetadata({
  title: "Aviso legal",
  description: "Aviso legal de Citendia y datos identificativos básicos del titular del sitio web.",
  path: "/legal"
});

export default function LegalPage() {
  const breadcrumb = [
    { name: "Inicio", path: "/" },
    { name: "Legal", path: "/legal" }
  ];

  return (
    <>
      <JsonLd data={breadcrumbJsonLd(breadcrumb)} />
      <PublicPageShell
        breadcrumb={[
          { name: "Inicio", href: "/" },
          { name: "Legal" }
        ]}
        description="Información legal básica sobre citendia.com, su titular y las condiciones generales de uso del sitio."
        eyebrow="Legal"
        title="Aviso legal de Citendia"
      >
        <section className="bg-white px-4 py-16 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-[920px] space-y-10 text-left">
            <section>
              <h2 className="text-[26px] font-semibold tracking-[-0.04em] text-[#071027]">1. Titular del sitio web</h2>
              <div className="mt-4 space-y-3 text-[16px] leading-[1.85] text-[#55657f]">
                <p><strong className="text-[#071027]">Titular:</strong> GalekNetwork</p>
                <p><strong className="text-[#071027]">Sitio web:</strong> citendia.com</p>
                <p><strong className="text-[#071027]">Correo de contacto:</strong> info@citendia.com</p>
                <p><strong className="text-[#071027]">Ubicación de referencia:</strong> Madrid, España</p>
              </div>
              <p className="mt-4 text-[16px] leading-[1.85] text-[#55657f]">
                Los datos identificativos completos del titular y, en su caso, los datos fiscales o registrales pendientes de publicación se incorporarán en cuanto queden formalmente cerrados.
              </p>
            </section>

            <section>
              <h2 className="text-[26px] font-semibold tracking-[-0.04em] text-[#071027]">2. Objeto del sitio</h2>
              <p className="mt-4 text-[16px] leading-[1.85] text-[#55657f]">
                Citendia es una web de información y captación comercial sobre servicios de agentes de llamadas y mensajes para negocios, automatización de citas, reservas y atención al cliente.
              </p>
            </section>

            <section>
              <h2 className="text-[26px] font-semibold tracking-[-0.04em] text-[#071027]">3. Condiciones de uso</h2>
              <p className="mt-4 text-[16px] leading-[1.85] text-[#55657f]">
                La persona usuaria se compromete a utilizar el sitio de forma lícita, diligente y conforme a la buena fe, evitando cualquier uso que pueda dañar la web, interferir en su funcionamiento o perjudicar derechos de terceros.
              </p>
            </section>

            <section>
              <h2 className="text-[26px] font-semibold tracking-[-0.04em] text-[#071027]">4. Propiedad intelectual e industrial</h2>
              <p className="mt-4 text-[16px] leading-[1.85] text-[#55657f]">
                Los contenidos, marcas, diseños, textos, estructura y elementos visuales del sitio pertenecen a Citendia, a GalekNetwork o a sus legítimos titulares, y no pueden ser reproducidos o explotados sin autorización previa, salvo en los casos permitidos por la ley.
              </p>
            </section>

            <section>
              <h2 className="text-[26px] font-semibold tracking-[-0.04em] text-[#071027]">5. Responsabilidad</h2>
              <p className="mt-4 text-[16px] leading-[1.85] text-[#55657f]">
                Se procura que la información publicada sea correcta y actualizada, pero no se garantiza la ausencia total de errores, interrupciones o incidencias técnicas ajenas a un control razonable.
              </p>
            </section>

            <section>
              <h2 className="text-[26px] font-semibold tracking-[-0.04em] text-[#071027]">6. Legislación aplicable</h2>
              <p className="mt-4 text-[16px] leading-[1.85] text-[#55657f]">
                Este sitio web se rige por la legislación española. Cualquier controversia se someterá a los juzgados y tribunales competentes conforme a la normativa aplicable.
              </p>
            </section>
          </div>
        </section>
      </PublicPageShell>
    </>
  );
}
