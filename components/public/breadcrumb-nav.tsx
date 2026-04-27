import Link from "next/link";

export function BreadcrumbNav({
  items
}: {
  items: Array<{ name: string; href?: string }>;
}) {
  return (
    <nav aria-label="Breadcrumb" className="mb-6">
      <ol className="flex flex-wrap items-center gap-2 text-sm text-slate-500">
        {items.map((item, index) => (
          <li className="flex items-center gap-2" key={`${item.name}-${index}`}>
            {item.href ? (
              <Link className="hover:text-[#1854ff]" href={item.href}>
                {item.name}
              </Link>
            ) : (
              <span aria-current="page" className="text-slate-700">
                {item.name}
              </span>
            )}
            {index < items.length - 1 ? <span aria-hidden="true">/</span> : null}
          </li>
        ))}
      </ol>
    </nav>
  );
}
