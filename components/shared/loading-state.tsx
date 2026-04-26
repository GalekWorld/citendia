export function LoadingState({ label = "Cargando datos..." }: { label?: string }) {
  return (
    <div className="rounded-3xl border border-borderBrand bg-white/80 p-8 shadow-panel">
      <div className="flex items-center gap-3 text-sm text-slate-500">
        <span className="h-3 w-3 animate-pulse rounded-full bg-accent" />
        {label}
      </div>
    </div>
  );
}
