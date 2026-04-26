import { formatMinutes } from "@/lib/utils";

export function MinutesDisplay({
  value,
  className
}: {
  value: number | string | null | undefined;
  className?: string;
}) {
  return <span className={className}>{formatMinutes(value)} min</span>;
}
