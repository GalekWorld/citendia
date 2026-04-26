"use client";

import { useState } from "react";
import { ChevronDown, Minus, Plus } from "lucide-react";

const faqs = [
  {
    question: "¿Cuánto cuesta un asistente IA?",
    answer:
      "Solo pagas por minuto usado (0,20€/min). No hay costes fijos, ni mensualidad mínima. Comes controlas tu gasto."
  },
  {
    question: "¿Necesito equipamiento especial?",
    answer:
      "No. Solo necesitas tu número de teléfono actual. Nosotros nos ocupamos de todo lo demás."
  },
  {
    question: "¿El bot puede atender varias llamadas a la vez?",
    answer: "Sí, el bot puede atender llamadas ilimitadas simultáneamente, 24 horas al día."
  },
  {
    question: "¿Puedo probar el servicio antes?",
    answer:
      "Claro. Solicita una demo gratuita y pruebalo sin compromiso durante 7 días."
  },
  {
    question: "¿Qué pasa si el bot no puede resolver una llamada?",
    answer:
      "El bot derivará la llamada a tu móvil o te enviará una notificación para que contactes al cliente."
  },
  {
    question: "¿Es compatible con mi software actual?",
    answer:
      "Integramos con los principales calendarios (Google, Outlook) y podemos conectar con tu CRM mediante API."
  }
];

export function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <section id="faq" className="mt-32">
      <div className="mx-auto max-w-2xl text-center">
        <p className="text-sm font-semibold uppercase tracking-widest text-accent">
          Preguntas Frecuentes
        </p>
        <h2 className="mt-3 text-3xl font-bold tracking-tight text-ink sm:text-4xl">
          Resolvemos tus dudas
        </h2>
      </div>

      <div className="mx-auto mt-12 max-w-3xl space-y-3">
        {faqs.map((faq, idx) => (
          <div
            key={idx}
            className="rounded-2xl border border-borderBrand bg-white/80 transition hover:border-accent/30"
          >
            <button
              onClick={() => setOpenIndex(openIndex === idx ? null : idx)}
              className="flex w-full items-center justify-between p-5 text-left"
            >
              <span className="pr-8 font-semibold text-ink">{faq.question}</span>
              {openIndex === idx ? (
                <Minus className="h-5 w-5 shrink-0 text-accent" />
              ) : (
                <Plus className="h-5 w-5 shrink-0 text-secondary" />
              )}
            </button>
            {openIndex === idx && (
              <div className="border-t border-borderBrand px-5 pb-5">
                <p className="pt-4 text-secondary leading-relaxed">{faq.answer}</p>
              </div>
            )}
          </div>
        ))}
      </div>
    </section>
  );
}