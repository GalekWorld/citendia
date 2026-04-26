import { euros } from "@/lib/utils";

export function CurrencyAmount({
  amount,
  className
}: {
  amount: number | string | null | undefined;
  className?: string;
}) {
  return <span className={className}>{euros(amount)}</span>;
}
