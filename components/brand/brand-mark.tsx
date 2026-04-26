import Image from "next/image";
import { cn } from "@/lib/utils";

export function BrandMark({
  className,
  labelClassName,
  showLabel = true,
  label = "Citendia",
  size = "md"
}: {
  className?: string;
  labelClassName?: string;
  showLabel?: boolean;
  label?: string;
  size?: "sm" | "md" | "lg";
}) {
  const shellBySize = {
    sm: "h-8 w-8 rounded-xl",
    md: "h-10 w-10 rounded-2xl",
    lg: "h-12 w-12 rounded-[1.125rem]"
  };

  const imageBySize = {
    sm: 32,
    md: 40,
    lg: 48
  };

  return (
    <div className={cn("flex items-center gap-3", className)}>
      <div
        className={cn(
          "flex items-center justify-center overflow-hidden shadow-[0_16px_34px_-16px_rgba(24,84,255,0.72)]",
          shellBySize[size]
        )}
      >
        <Image
          alt="Citendia"
          className="h-full w-full object-contain"
          height={imageBySize[size]}
          src="/citendia-logo.png"
          width={imageBySize[size]}
        />
      </div>
      {showLabel ? (
        <span className={cn("text-[18px] font-semibold tracking-tight text-[#0a1128]", labelClassName)}>
          {label}
        </span>
      ) : null}
    </div>
  );
}
