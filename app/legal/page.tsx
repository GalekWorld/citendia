import { JsonLd } from "@/components/public/json-ld";
import { PublicPageShell } from "@/components/public/public-page-shell";
import { breadcrumbJsonLd, createPageMetadata } from "@/lib/seo";

export const metadata = createPageMetadata({
  title: "Aviso legal",
  description:
    "Aviso legal de Citendia, web oficial de agentes de llamadas y mensajes para negocios en Espana.",
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
        description="Informacion legal sobre el uso del sitio web oficial de Citendia, sus contenidos y la relacion con usuarios y potenciales clientes."
        eyebrow="Legal"
        title="Aviso legal de Citendia"
      >
        <section className="bg-white px-4 py-16 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-[920px] space-y-10 text-left">
            <section>
              <h2 className="text-[26px] font-semibold tracking-[-0.04em] text-[#071027]">1. Titularidad del sitio web</h2>
              <p className="mt-4 text-[16px] leading-[1.85] text-[#55657f]">
                El presente sitio web, accesible a traves del dominio citendia.com, es utilizado para la promocion y presentacion comercial de los servicios de Citendia, consistentes en agentes de llamadas y mensajes para negocios, automatizacion de reservas, atencion al cliente y asistencia operativa mediante herramientas de inteligencia artificial.
              </p>
              <p className="mt-4 text-[16px] leading-[1.85] text-[#55657f]">
                Para cualquier comunicacion legal, comercial o relacionada con el uso del sitio, puede contactarse con Citendia a traves del correo electronico info@citendia.com.
              </p>
            </section>

            <section>
              <h2 className="text-[26px] font-semibold tracking-[-0.04em] text-[#071027]">2. Objeto y finalidad</h2>
              <p className="mt-4 text-[16px] leading-[1.85] text-[#55657f]">
                La web tiene por objeto ofrecer informacion sobre los servicios de Citendia, facilitar la solicitud de informacion o de una demo comercial y servir de punto de acceso a determinadas zonas privadas para clientes autorizados. El contenido publicado no constituye por si mismo una oferta contractual cerrada, salvo indicacion expresa en contrario.
              </p>
            </section>

            <section>
              <h2 className="text-[26px] font-semibold tracking-[-0.04em] text-[#071027]">3. Condiciones de uso</h2>
              <p className="mt-4 text-[16px] leading-[1.85] text-[#55657f]">
                La persona usuaria se compromete a utilizar la web de forma diligente, licita y conforme a la buena fe, evitando cualquier actuacion que pueda dañar, inutilizar, sobrecargar o perjudicar el funcionamiento del sitio, de los servicios ofrecidos o de los derechos de terceros.
              </p>
              <p className="mt-4 text-[16px] leading-[1.85] text-[#55657f]">
                Queda expresamente prohibido el uso del sitio con fines fraudulentos, para el acceso no autorizado a zonas privadas, para la extraccion automatizada de contenidos sin consentimiento o para cualquier comportamiento contrario a la normativa aplicable.
              </p>
            </section>

            <section>
              <h2 className="text-[26px] font-semibold tracking-[-0.04em] text-[#071027]">4. Propiedad intelectual e industrial</h2>
              <p className="mt-4 text-[16px] leading-[1.85] text-[#55657f]">
                El nombre Citendia, sus signos distintivos, el diseño del sitio, los textos, elementos graficos, estructura, codigo y demas contenidos del portal se encuentran protegidos por la normativa sobre propiedad intelectual e industrial y pertenecen a Citendia o se utilizan con la correspondiente licencia o autorizacion.
              </p>
              <p className="mt-4 text-[16px] leading-[1.85] text-[#55657f]">
                No se autoriza la reproduccion, transformacion, distribucion, comunicacion publica o explotacion, total o parcial, de los contenidos sin consentimiento previo y por escrito del titular legitimo, salvo en los supuestos legalmente permitidos.
              </p>
            </section>

            <section>
              <h2 className="text-[26px] font-semibold tracking-[-0.04em] text-[#071027]">5. Responsabilidad</h2>
              <p className="mt-4 text-[16px] leading-[1.85] text-[#55657f]">
                Citendia procura que la informacion ofrecida sea exacta, actualizada y util. No obstante, no garantiza la ausencia absoluta de errores tipograficos, omisiones o incidencias tecnicas ajenas a un control razonable. En consecuencia, salvo en los casos legalmente exigibles, no asume responsabilidad por daños derivados del uso de la informacion contenida en la web cuando dicho uso dependa de decisiones adoptadas exclusivamente por la persona usuaria.
              </p>
            </section>

            <section>
              <h2 className="text-[26px] font-semibold tracking-[-0.04em] text-[#071027]">6. Enlaces externos</h2>
              <p className="mt-4 text-[16px] leading-[1.85] text-[#55657f]">
                El sitio puede incluir enlaces a recursos o plataformas de terceros por razones informativas o funcionales. Citendia no controla de forma permanente dichos recursos externos y, por tanto, no responde del contenido, politicas o practicas de los sitios enlazados una vez que la persona usuaria abandona citendia.com.
              </p>
            </section>

            <section>
              <h2 className="text-[26px] font-semibold tracking-[-0.04em] text-[#071027]">7. Legislacion aplicable y jurisdiccion</h2>
              <p className="mt-4 text-[16px] leading-[1.85] text-[#55657f]">
                El presente aviso legal se rige por la legislacion espanola. Para cualquier controversia relacionada con la interpretacion, validez o ejecucion del uso del sitio web, las partes se someteran a los juzgados y tribunales que resulten competentes conforme a la normativa de consumo y jurisdiccion aplicable.
              </p>
            </section>
          </div>
        </section>
      </PublicPageShell>
    </>
  );
}
