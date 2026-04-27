import { SiteFooter } from "@/components/public/site-footer";
import { SiteHeader } from "@/components/public/site-header";
import { BreadcrumbNav } from "@/components/public/breadcrumb-nav";
import { CookieBanner } from "@/components/public/cookie-banner";

export function PublicPageShell({
  eyebrow,
  title,
  description,
  breadcrumb,
  children
}: {
  eyebrow: string;
  title: string;
  description: string;
  breadcrumb: Array<{ name: string; href?: string }>;
  children: React.ReactNode;
}) {
  return (
    <>
      <SiteHeader />
      <main className="min-h-screen bg-white text-[#091126]">
        <section className="relative overflow-hidden border-b border-slate-200/70 bg-[linear-gradient(180deg,#f8fbff_0%,#ffffff_100%)] px-4 py-16 sm:px-6 lg:px-8">
          <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(148,163,184,0.09)_1px,transparent_1px),linear-gradient(to_bottom,rgba(148,163,184,0.09)_1px,transparent_1px)] bg-[size:56px_56px]" />
          <div className="relative mx-auto max-w-[1140px]">
            <BreadcrumbNav items={breadcrumb} />
            <p className="text-[11px] font-semibold uppercase tracking-[0.28em] text-[#1854ff]">{eyebrow}</p>
            <h1 className="mt-4 max-w-[820px] text-[34px] font-semibold leading-[1.02] tracking-[-0.06em] text-[#071027] sm:text-[44px] lg:text-[54px]">
              {title}
            </h1>
            <p className="mt-6 max-w-[760px] text-[17px] leading-[1.75] text-[#596882]">{description}</p>
          </div>
        </section>
        {children}
      </main>
      <SiteFooter />
      <CookieBanner />
    </>
  );
}
