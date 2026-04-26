import { Check, X } from "lucide-react";

const comparison = [
  { feature: "Atencion 24/7", manual: false, citendia: true },
  { feature: "Nunca pierde una llamada", manual: false, citendia: true },
  { feature: "Gestion automatica de citas", manual: false, citendia: true },
  { feature: "Seguimiento de clientes", manual: false, citendia: true },
  { feature: "Sin vacaciones ni bajas", manual: false, citendia: true },
  { feature: "Multi-idioma", manual: false, citendia: true },
  { feature: "Coste por uso", manual: true, citendia: true }
];

export function Comparison() {
  return (
    <section className="mt-32 rounded-3xl bg-surfaceSubtle py-16">
      <div className="mx-auto max-w-2xl text-center">
        <p className="text-sm font-semibold uppercase tracking-widest text-accent">Comparativa</p>
        <h2 className="mt-3 text-3xl font-bold tracking-tight text-ink sm:text-4xl">
          Por que elegir un asistente IA?
        </h2>
        <p className="mt-4 text-lg text-secondary">
          Compara Citendia con atender llamadas manualmente
        </p>
      </div>

      <div className="mx-auto mt-12 max-w-4xl overflow-x-auto px-4">
        <table className="w-full min-w-[600px] text-center">
          <thead>
            <tr>
              <th className="p-4 text-left text-lg font-bold text-ink">Caracteristica</th>
              <th className="w-1/3 rounded-2xl bg-white/50 p-4 text-lg font-bold text-secondary">
                Atencion manual
              </th>
              <th className="w-1/3 rounded-2xl bg-accent p-4 text-lg font-bold text-white">
                Citendia IA
              </th>
            </tr>
          </thead>
          <tbody>
            {comparison.map((item) => (
              <tr key={item.feature} className="border-t border-borderBrand">
                <td className="p-4 text-left font-medium text-ink">{item.feature}</td>
                <td className="p-4">
                  <div className="flex justify-center">
                    {item.manual ? (
                      <Check className="h-6 w-6 text-success" />
                    ) : (
                      <X className="h-6 w-6 text-error/50" />
                    )}
                  </div>
                </td>
                <td className="p-4">
                  <div className="flex justify-center">
                    <Check className="h-6 w-6 text-accent" />
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
}
