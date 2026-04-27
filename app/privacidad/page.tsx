import { JsonLd } from "@/components/public/json-ld";
import { PublicPageShell } from "@/components/public/public-page-shell";
import { breadcrumbJsonLd, createPageMetadata } from "@/lib/seo";

export const metadata = createPageMetadata({
  title: "Politica de privacidad",
  description:
    "Politica de privacidad de Citendia sobre el tratamiento de datos personales recibidos a traves de la web y formularios de contacto.",
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
        description="Informacion sobre como Citendia recoge, usa, conserva y protege datos personales de personas que solicitan informacion o una demo comercial."
        eyebrow="Privacidad"
        title="Politica de privacidad de Citendia"
      >
        <section className="bg-white px-4 py-16 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-[920px] space-y-10 text-left">
            <section>
              <h2 className="text-[26px] font-semibold tracking-[-0.04em] text-[#071027]">1. Responsable del tratamiento</h2>
              <p className="mt-4 text-[16px] leading-[1.85] text-[#55657f]">
                Citendia trata los datos personales facilitados a traves de citendia.com con la finalidad de responder solicitudes de informacion, coordinar demostraciones comerciales y gestionar la relacion precontractual o contractual con empresas interesadas en sus servicios.
              </p>
              <p className="mt-4 text-[16px] leading-[1.85] text-[#55657f]">
                Para cualquier cuestion relativa a privacidad o ejercicio de derechos, el canal de contacto habilitado es info@citendia.com.
              </p>
            </section>

            <section>
              <h2 className="text-[26px] font-semibold tracking-[-0.04em] text-[#071027]">2. Datos tratados</h2>
              <p className="mt-4 text-[16px] leading-[1.85] text-[#55657f]">
                Citendia puede tratar datos identificativos y de contacto tales como nombre, empresa, correo electronico, telefono y cualquier informacion adicional incluida por la persona interesada en mensajes o formularios. En el caso de clientes, podran tratarse ademas datos tecnicos u operativos necesarios para la prestacion del servicio contratado.
              </p>
            </section>

            <section>
              <h2 className="text-[26px] font-semibold tracking-[-0.04em] text-[#071027]">3. Finalidades y base juridica</h2>
              <div className="mt-4 space-y-4 text-[16px] leading-[1.85] text-[#55657f]">
                <p>Las principales finalidades del tratamiento son:</p>
                <ul className="list-disc space-y-2 pl-6">
                  <li>Atender solicitudes de informacion, contacto o demo.</li>
                  <li>Gestionar comunicaciones comerciales relacionadas con los servicios solicitados.</li>
                  <li>Formalizar la relacion contractual y prestar el servicio cuando exista contratacion.</li>
                  <li>Dar soporte, seguimiento y mejora del servicio para clientes activos.</li>
                </ul>
                <p>
                  La base juridica del tratamiento sera el consentimiento de la persona interesada, la ejecucion de medidas precontractuales o contractuales y, cuando proceda, el interes legitimo de Citendia para mantener relaciones comerciales razonables con empresas interesadas en sus servicios.
                </p>
              </div>
            </section>

            <section>
              <h2 className="text-[26px] font-semibold tracking-[-0.04em] text-[#071027]">4. Conservacion de los datos</h2>
              <p className="mt-4 text-[16px] leading-[1.85] text-[#55657f]">
                Los datos se conservaran durante el tiempo necesario para cumplir la finalidad para la que fueron recabados y, posteriormente, durante los plazos exigidos por la normativa aplicable o mientras puedan derivarse responsabilidades legales de la relacion mantenida.
              </p>
            </section>

            <section>
              <h2 className="text-[26px] font-semibold tracking-[-0.04em] text-[#071027]">5. Destinatarios y encargados de tratamiento</h2>
              <p className="mt-4 text-[16px] leading-[1.85] text-[#55657f]">
                Con caracter general, Citendia no cede datos a terceros salvo obligacion legal o necesidad tecnica vinculada a la prestacion del servicio. Determinados proveedores tecnologicos podran acceder a la informacion en calidad de encargados de tratamiento, bajo las correspondientes obligaciones de confidencialidad y seguridad.
              </p>
            </section>

            <section>
              <h2 className="text-[26px] font-semibold tracking-[-0.04em] text-[#071027]">6. Derechos de las personas interesadas</h2>
              <p className="mt-4 text-[16px] leading-[1.85] text-[#55657f]">
                Cualquier persona puede ejercer sus derechos de acceso, rectificacion, supresion, oposicion, limitacion del tratamiento y portabilidad, cuando resulten aplicables, enviando una solicitud a info@citendia.com. Asimismo, si considera que el tratamiento no se ajusta a la normativa, podra presentar una reclamacion ante la autoridad de control competente en materia de proteccion de datos.
              </p>
            </section>

            <section>
              <h2 className="text-[26px] font-semibold tracking-[-0.04em] text-[#071027]">7. Seguridad</h2>
              <p className="mt-4 text-[16px] leading-[1.85] text-[#55657f]">
                Citendia adopta medidas tecnicas y organizativas razonables para proteger la informacion personal frente a accesos no autorizados, perdida, alteracion o divulgacion indebida, atendiendo a la naturaleza de los datos y al estado de la tecnologia.
              </p>
            </section>
          </div>
        </section>
      </PublicPageShell>
    </>
  );
}
