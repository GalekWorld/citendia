import { JsonLd } from "@/components/public/json-ld";
import { PublicPageShell } from "@/components/public/public-page-shell";
import { breadcrumbJsonLd, createPageMetadata } from "@/lib/seo";

export const metadata = createPageMetadata({
  title: "Política de privacidad",
  description: "Política de privacidad de Citendia sobre el tratamiento de datos personales recibidos a través del sitio web.",
  path: "/privacidad"
});

export default function PrivacidadPage() {
  const breadcrumb = [
    { name: "Inicio", path: "/" },
    { name: "Privacidad", path: "/privacidad" }
  ];

  return (
    <>
      <JsonLd data={breadcrumbJsonLd(breadcrumb)} />
      <PublicPageShell
        breadcrumb={[
          { name: "Inicio", href: "/" },
          { name: "Privacidad" }
        ]}
        description="Información sobre cómo Citendia y GalekNetwork tratan datos personales de personas que contactan desde la web."
        eyebrow="Privacidad"
        title="Política de privacidad de Citendia"
      >
        <section className="bg-white px-4 py-16 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-[920px] space-y-10 text-left">
            <section>
              <h2 className="text-[26px] font-semibold tracking-[-0.04em] text-[#071027]">1. Responsable del tratamiento</h2>
              <div className="mt-4 space-y-3 text-[16px] leading-[1.85] text-[#55657f]">
                <p><strong className="text-[#071027]">Responsable:</strong> GalekNetwork</p>
                <p><strong className="text-[#071027]">Email:</strong> info@citendia.com</p>
                <p><strong className="text-[#071027]">Ubicación de referencia:</strong> Madrid, España</p>
              </div>
              <p className="mt-4 text-[16px] leading-[1.85] text-[#55657f]">
                Los datos fiscales y de domicilio definitivo del responsable se incorporarán en una próxima actualización cuando queden formalmente consolidados.
              </p>
            </section>

            <section>
              <h2 className="text-[26px] font-semibold tracking-[-0.04em] text-[#071027]">2. Qué datos tratamos</h2>
              <p className="mt-4 text-[16px] leading-[1.85] text-[#55657f]">
                Podemos tratar datos identificativos y de contacto como nombre, empresa, correo electrónico, teléfono y el contenido de los mensajes enviados a través del formulario de contacto o de los canales habilitados.
              </p>
            </section>

            <section>
              <h2 className="text-[26px] font-semibold tracking-[-0.04em] text-[#071027]">3. Finalidad del tratamiento</h2>
              <div className="mt-4 space-y-4 text-[16px] leading-[1.85] text-[#55657f]">
                <p>Los datos se utilizan principalmente para:</p>
                <ul className="list-disc space-y-2 pl-6">
                  <li>Responder solicitudes de información o de demostración.</li>
                  <li>Gestionar comunicaciones comerciales relacionadas con los servicios de Citendia.</li>
                  <li>Dar seguimiento a relaciones precontractuales o contractuales con clientes.</li>
                </ul>
              </div>
            </section>

            <section>
              <h2 className="text-[26px] font-semibold tracking-[-0.04em] text-[#071027]">4. Base jurídica</h2>
              <p className="mt-4 text-[16px] leading-[1.85] text-[#55657f]">
                La base jurídica del tratamiento es el consentimiento de la persona interesada, la aplicación de medidas precontractuales a petición de esta y, cuando proceda, el interés legítimo para atender solicitudes profesionales relacionadas con los servicios ofrecidos.
              </p>
            </section>

            <section>
              <h2 className="text-[26px] font-semibold tracking-[-0.04em] text-[#071027]">5. Conservación</h2>
              <p className="mt-4 text-[16px] leading-[1.85] text-[#55657f]">
                Los datos se conservarán durante el tiempo necesario para atender la solicitud, mantener la relación comercial y cumplir las obligaciones legales que puedan resultar aplicables.
              </p>
            </section>

            <section>
              <h2 className="text-[26px] font-semibold tracking-[-0.04em] text-[#071027]">6. Derechos</h2>
              <p className="mt-4 text-[16px] leading-[1.85] text-[#55657f]">
                Puedes solicitar el acceso, rectificación, supresión, oposición, limitación o portabilidad de tus datos escribiendo a info@citendia.com. Si consideras que el tratamiento no es correcto, también puedes acudir a la autoridad de control competente.
              </p>
            </section>
          </div>
        </section>
      </PublicPageShell>
    </>
  );
}
