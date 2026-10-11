import type { SiteConfig } from "../config/site";
import { buildWhatsAppUrl, normalizeExternalUrl, resolveInstagramUrl } from "./links";

/** Lista o que ainda está pendente ou inválido em site.ts (exibido no console durante o desenvolvimento). */
export function getConfigWarnings(config: SiteConfig): string[] {
  const warnings: string[] = [];
  if (!buildWhatsAppUrl(config.whatsapp.phone)) {
    warnings.push("whatsapp.phone inválido: o botão do WhatsApp não será exibido.");
  }
  if (!normalizeExternalUrl(config.ebook.checkoutUrl)) {
    warnings.push("CAKTO_CHECKOUT_URL vazio ou inválido: o botão do e-book mostrará 'em breve'.");
  }
  if (!resolveInstagramUrl(config.instagram.url)) {
    warnings.push("INSTAGRAM_URL vazio ou inválido: o link do Instagram ficará oculto no rodapé.");
  }
  if (!config.analytics.ga4MeasurementId) {
    warnings.push("analytics.ga4MeasurementId vazio: nenhum rastreamento será enviado.");
  }
  return warnings;
}
