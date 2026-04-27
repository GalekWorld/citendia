"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

const CONSENT_KEY = "citendia_cookie_consent";

function persistConsent(value: "accepted" | "rejected") {
  try {
    window.localStorage.setItem(CONSENT_KEY, value);
  } catch {}

  document.cookie = `citendia_cookie_consent=${value}; path=/; max-age=31536000; SameSite=Lax`;
}

export function CookieBanner() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    try {
      const stored = window.localStorage.getItem(CONSENT_KEY);
      if (!stored) {
        setVisible(true);
      }
    } catch {
      setVisible(true);
    }
  }, []);

  if (!visible) {
    return null;
  }

  return (
    <div className="fixed inset-x-0 bottom-0 z-50 px-4 pb-4 sm:px-6 lg:px-8" role="dialog" aria-label="Aviso de cookies" aria-live="polite">
      <div className="mx-auto flex w-full max-w-[1140px] flex-col gap-4 rounded-[24px] border border-[#dbe3ef] bg-white p-5 shadow-[0_20px_60px_-32px_rgba(15,23,42,0.4)] sm:flex-row sm:items-end sm:justify-between">
        <div className="max-w-[760px] text-left">
          <p className="text-[12px] font-semibold uppercase tracking-[0.22em] text-[#1854ff]">Cookies</p>
          <p className="mt-2 text-[15px] leading-[1.7] text-[#55657f]">
            Citendia utiliza cookies tecnicas necesarias para el funcionamiento del sitio y, en su caso, cookies de analitica o medicion solo con tu consentimiento. Puedes aceptar, rechazar o consultar la <Link className="font-semibold text-[#1854ff] hover:underline" href="/cookies">politica de cookies</Link>.
          </p>
        </div>

        <div className="flex flex-col gap-3 sm:min-w-[260px] sm:flex-row sm:justify-end">
          <button
            className="interactive-lift inline-flex h-[46px] items-center justify-center rounded-full border border-[#dbe3ef] bg-white px-5 text-[14px] font-semibold text-[#091126] hover:border-[#1854ff] hover:text-[#1854ff]"
            onClick={() => {
              persistConsent("rejected");
              setVisible(false);
            }}
            type="button"
          >
            Rechazar
          </button>
          <button
            className="interactive-lift inline-flex h-[46px] items-center justify-center rounded-full bg-[#1854ff] px-5 text-[14px] font-semibold text-white hover:bg-[#0f46ea]"
            onClick={() => {
              persistConsent("accepted");
              setVisible(false);
            }}
            type="button"
          >
            Aceptar
          </button>
        </div>
      </div>
    </div>
  );
}
