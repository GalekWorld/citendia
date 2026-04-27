import Link from "next/link";
import { BrandMark } from "@/components/brand/brand-mark";

export function SiteFooter() {
  return (
    <footer className="border-t border-white/8 bg-[#050918] px-4 py-10 text-white sm:px-6 lg:px-8">
      <div className="mx-auto grid w-full max-w-[1140px] gap-10 lg:grid-cols-[1.15fr_0.85fr_0.85fr_0.85fr]">
        <div className="max-w-[340px]">
          <BrandMark label="Citendia" labelClassName="text-white" size="sm" />
          <p className="mt-5 text-[15px] leading-[1.7] text-white/70">
            Citendia ofrece agentes de llamadas y mensajes para negocios en España. Automatiza atención al cliente, citas, reservas y seguimiento comercial sin perder llamadas fuera de horario.
          </p>
        </div>

        <FooterColumn
          items={[
            { label: "Servicios", href: "/servicios" },
            { label: "Cómo funciona", href: "/como-funciona" },
            { label: "Casos de uso", href: "/casos-de-uso" },
            { label: "Precios", href: "/precios" }
          ]}
          title="Producto"
        />
        <FooterColumn
          items={[
            { label: "FAQ", href: "/faq" },
            { label: "Contacto", href: "/contacto" },
            { label: "Portal clientes", href: "/login" },
            { label: "info@citendia.com", href: "mailto:info@citendia.com" }
          ]}
          title="Empresa"
        />
        <FooterColumn
          items={[
            { label: "Legal", href: "/legal" },
            { label: "Privacidad", href: "/privacidad" },
            { label: "Cookies", href: "/cookies" }
          ]}
          title="Legal"
        />
      </div>
    </footer>
  );
}

function FooterColumn({
  title,
  items
}: {
  title: string;
  items: Array<{ label: string; href: string }>;
}) {
  return (
    <div className="text-left">
      <p className="text-[11px] font-semibold uppercase tracking-[0.28em] text-white/48">{title}</p>
      <div className="mt-5 space-y-4">
        {items.map((item) =>
          item.href.startsWith("/") ? (
            <Link className="interactive-lift block text-[15px] text-white/84 hover:text-white" href={item.href} key={item.label}>
              {item.label}
            </Link>
          ) : (
            <a className="interactive-lift block text-[15px] text-white/84 hover:text-white" href={item.href} key={item.label}>
              {item.label}
            </a>
          )
        )}
      </div>
    </div>
  );
}
