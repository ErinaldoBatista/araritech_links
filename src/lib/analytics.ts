/**
 * Rastreamento de cliques — preparado para o Google Analytics 4 (GA4).
 *
 * - Sem ID configurado em src/config/site.ts, nada é carregado nem enviado
 *   e a página funciona normalmente.
 * - Nunca enviamos dados pessoais: apenas o nome do evento e de qual
 *   parte da página veio o clique.
 */

export type TrackedEvent = "whatsapp_click" | "ebook_click";
export type EventParams = Record<string, string | number | boolean>;

declare global {
  interface Window {
    dataLayer?: unknown[];
    gtag?: (...args: unknown[]) => void;
  }
}

const GA4_ID_PATTERN = /^G-[A-Z0-9]{4,}$/i;

/** Carrega o GA4 somente se houver um ID válido. Pode ser chamada com segurança sem ID. */
export function initAnalytics(measurementId?: string): boolean {
  const id = (measurementId ?? "").trim();
  if (!id || !GA4_ID_PATTERN.test(id) || typeof document === "undefined") return false;
  if (typeof window.gtag === "function") return true; // já inicializado

  try {
    window.dataLayer = window.dataLayer || [];
    window.gtag = function gtag() {
      // O GA4 exige o objeto "arguments" (não um array comum).
      window.dataLayer!.push(arguments);
    };

    const script = document.createElement("script");
    script.async = true;
    script.src = `https://www.googletagmanager.com/gtag/js?id=${encodeURIComponent(id)}`;
    document.head.appendChild(script);

    window.gtag("js", new Date());
    window.gtag("config", id, {
      allow_google_signals: false,
      allow_ad_personalization_signals: false,
    });
    return true;
  } catch {
    return false;
  }
}

/** Registra um clique. Nunca lança erro: rastrear não pode atrapalhar o visitante. */
export function trackEvent(name: TrackedEvent, params: EventParams = {}): void {
  try {
    if (typeof window !== "undefined" && typeof window.gtag === "function") {
      window.gtag("event", name, { transport_type: "beacon", ...params });
    }
    if (import.meta.env.DEV) console.debug("[ARARITECH analytics]", name, params);
  } catch {
    /* ignora: o clique deve sempre funcionar */
  }
}
