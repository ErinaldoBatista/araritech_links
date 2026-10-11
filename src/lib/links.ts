/** Mantém apenas os dígitos de um texto (remove espaços, +, parênteses e traços). */
export const onlyDigits = (value: string): string => value.replace(/\D/g, "");

/**
 * Monta o link internacional do WhatsApp (wa.me).
 * Retorna null se o número parecer inválido, para que nenhum botão quebrado seja exibido.
 */
export function buildWhatsAppUrl(phone: string, message?: string): string | null {
  const digits = onlyDigits(phone);
  if (digits.length < 10 || digits.length > 15) return null;

  const base = `https://wa.me/${digits}`;
  const text = message?.trim();
  return text ? `${base}?text=${encodeURIComponent(text)}` : base;
}

/**
 * Aceita apenas links https válidos. Retorna null para vazio, texto solto ou placeholder.
 * Assim, nunca enviamos o visitante para uma página inexistente.
 */
export function normalizeExternalUrl(url?: string): string | null {
  const value = (url ?? "").trim();
  if (!value) return null;
  try {
    const parsed = new URL(value);
    return parsed.protocol === "https:" ? parsed.toString() : null;
  } catch {
    return null;
  }
}

/** Instagram: aceita o link completo ou apenas "@usuario". */
export function resolveInstagramUrl(value?: string): string | null {
  const raw = (value ?? "").trim();
  if (!raw) return null;
  if (raw.startsWith("@")) {
    const handle = raw.slice(1);
    return /^[A-Za-z0-9._]{1,30}$/.test(handle) ? `https://www.instagram.com/${handle}/` : null;
  }
  return normalizeExternalUrl(raw);
}
