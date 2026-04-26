"use client";

import { useRouter, useSearchParams } from "next/navigation";

export function MonthSelector({
  name = "month",
  defaultValue
}: {
  name?: string;
  defaultValue?: string;
}) {
  const router = useRouter();
  const searchParams = useSearchParams();

  return (
    <input
      className="rounded-2xl border border-borderBrand bg-white px-4 py-3 text-sm text-ink outline-none ring-0 transition focus:border-accent"
      type="month"
      defaultValue={defaultValue}
      onChange={(event) => {
        const params = new URLSearchParams(searchParams.toString());
        if (event.target.value) {
          params.set(name, event.target.value);
        } else {
          params.delete(name);
        }
        router.push(`?${params.toString()}`);
      }}
    />
  );
}
