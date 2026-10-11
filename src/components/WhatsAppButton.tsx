import { siteConfig, type SiteConfig } from "../config/site";
import { buildWhatsAppUrl } from "../lib/links";
import { trackEvent } from "../lib/analytics";
import { WhatsAppIcon } from "./Icons";

/** Botão principal da página: abre a conversa no WhatsApp com a mensagem inicial. */
export function WhatsAppButton({ whatsapp = siteConfig.whatsapp }: { whatsapp?: SiteConfig["whatsapp"] }) {
  const href = buildWhatsAppUrl(whatsapp.phone, whatsapp.message);
  if (!href) return null; // número inválido: nunca exibimos um botão quebrado

  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      onClick={() => trackEvent("whatsapp_click", { link_location: "principal" })}
      className="cta-shine group relative flex min-h-[5.25rem] items-center gap-4 overflow-hidden rounded-[1.4rem] bg-accent px-4 py-4 text-background shadow-[0_14px_34px_-14px_color-mix(in_srgb,var(--color-accent)_70%,transparent)] transition-transform duration-150 hover:-translate-y-0.5 active:translate-y-0 active:scale-[0.99]"
    >
      <span className="grid size-12 shrink-0 place-items-center rounded-2xl bg-background text-accent">
        <WhatsAppIcon className="size-7" />
      </span>
      <span className="flex min-w-0 flex-col">
        <span className="font-display text-[1.15rem] leading-tight font-extrabold">{whatsapp.title}</span>
        <span className="mt-1 text-[0.9rem] leading-snug font-medium opacity-85">{whatsapp.subtitle}</span>
      </span>
    </a>
  );
}
