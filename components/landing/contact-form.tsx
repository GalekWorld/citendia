"use client";

import { useState } from "react";
import { ArrowRight, Loader2, Send } from "lucide-react";

export function ContactForm() {
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    
    await new Promise(r => setTimeout(r, 1500));
    
    setLoading(false);
    setSubmitted(true);
  };

  if (submitted) {
    return (
      <div className="rounded-3xl border border-success/30 bg-success/5 p-8 text-center">
        <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-success/10">
          <Send className="h-8 w-8 text-success" />
        </div>
        <h3 className="text-xl font-bold text-ink">¡Mensaje enviado!</h3>
        <p className="mt-2 text-secondary">
          Te contactaremos en menos de 24 horas.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="rounded-3xl border border-borderBrand bg-white/90 p-8 shadow-lg">
      <h3 className="text-xl font-bold text-ink">¿Hablamos?</h3>
      <p className="mt-2 text-secondary">
        Cuéntanos cómo podemos ayudarte y te contactamos.
      </p>

      <div className="mt-6 space-y-4">
        <div>
          <label className="mb-1 block text-sm font-medium text-ink">Nombre</label>
          <input
            required
            type="text"
            placeholder="Tu nombre"
            className="w-full rounded-xl border border-borderBrand bg-white px-4 py-3 text-ink placeholder:text-tertiary focus:border-accent focus:outline-none focus:ring-2 focus:ring-accent/20"
          />
        </div>

        <div>
          <label className="mb-1 block text-sm font-medium text-ink">Teléfono</label>
          <input
            required
            type="tel"
            placeholder="+34 600 000 000"
            className="w-full rounded-xl border border-borderBrand bg-white px-4 py-3 text-ink placeholder:text-tertiary focus:border-accent focus:outline-none focus:ring-2 focus:ring-accent/20"
          />
        </div>

        <div>
          <label className="mb-1 block text-sm font-medium text-ink">Mensaje (opcional)</label>
          <textarea
            rows={3}
            placeholder="¿En qué podemos ayudarte?"
            className="w-full rounded-xl border border-borderBrand bg-white px-4 py-3 text-ink placeholder:text-tertiary focus:border-accent focus:outline-none focus:ring-2 focus:ring-accent/20"
          />
        </div>

        <button
          type="submit"
          disabled={loading}
          className="inline-flex w-full items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-accent to-accentDark px-6 py-3.5 font-semibold text-white shadow-lg shadow-accent/25 transition hover:shadow-xl hover:shadow-accent/30 disabled:cursor-not-allowed disabled:opacity-50"
        >
          {loading ? (
            <>
              <Loader2 className="h-5 w-5 animate-spin" />
              Enviando...
            </>
          ) : (
            <>
              Contactar
              <ArrowRight className="h-5 w-5" />
            </>
          )}
        </button>
      </div>

      <p className="mt-4 text-center text-xs text-tertiary">
        Respondemos en menos de 24 horas
      </p>
    </form>
  );
}