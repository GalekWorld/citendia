import Link from "next/link";
import { BrandMark } from "@/components/brand/brand-mark";

const salesMailto = "mailto:info@citendia.com?subject=Solicitar%20demo%20Citendia";

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-40 border-b border-slate-200/80 bg-white/95 backdrop-blur">
      <div className="mx-auto flex h-[68px] w-full max-w-[1140px] items-center justify-between px-4 sm:h-[72px] sm:px-6 lg:px-8">
        <Link className="flex items-center gap-3" href="/">
          <BrandMark label="Citendia" size="sm" />
        </Link>

        <nav aria-label="Principal" className="hidden items-center gap-7 text-[14px] font-medium text-[#43516a] lg:flex">
          <Link className="interactive-lift transition hover:text-[#1854ff]" href="/servicios">
            Servicios
          </Link>
          <Link className="interactive-lift transition hover:text-[#1854ff]" href="/como-funciona">
            Cómo funciona
          </Link>
          <Link className="interactive-lift transition hover:text-[#1854ff]" href="/casos-de-uso">
            Casos de uso
          </Link>
          <Link className="interactive-lift transition hover:text-[#1854ff]" href="/precios">
            Precios
          </Link>
          <Link className="interactive-lift transition hover:text-[#1854ff]" href="/faq">
            FAQ
          </Link>
          <Link className="interactive-lift transition hover:text-[#1854ff]" href="/contacto">
            Contacto
          </Link>
        </nav>

        <div className="flex items-center gap-3">
          <Link
            className="interactive-lift hidden h-[42px] items-center justify-center rounded-full border border-slate-200 bg-white px-5 text-[13px] font-semibold text-[#0a1128] shadow-[0_14px_30px_-24px_rgba(15,23,42,0.28)] hover:border-[#1854ff]/30 hover:text-[#1854ff] sm:inline-flex sm:px-6 sm:text-[14px]"
            href="/login"
          >
            Acceder
          </Link>

          <a
            className="interactive-lift inline-flex h-[42px] items-center justify-center rounded-full bg-[#1854ff] px-5 text-[13px] font-semibold text-white shadow-[0_18px_40px_-16px_rgba(24,84,255,0.9)] hover:bg-[#0f46ea] sm:px-6 sm:text-[14px]"
            href={salesMailto}
          >
            Solicitar demo
          </a>
        </div>
      </div>
    </header>
  );
}
