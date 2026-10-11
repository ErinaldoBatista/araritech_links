import { siteConfig } from "../config/site";
import { buildWhatsAppUrl, resolveInstagramUrl } from "../lib/links";
import { trackEvent } from "../lib/analytics";
import { InstagramIcon, WhatsAppIcon } from "./Icons";

const chipClasses =
  "inline-flex min-h-12 items-center gap-2.5 rounded-2xl border border-line px-5 text-[0.95rem] font-semibold transition-colors duration-150 hover:border-brand hover:bg-surface";

export function Footer({ config = siteConfig }: { config?: typeof siteConfig }) {
  const whatsappUrl = buildWhatsAppUrl(config.whatsapp.phone, config.whatsapp.message);
  const instagramUrl = resolveInstagramUrl(config.instagram.url);
  const year = new Date().getFullYear(); // atualiza sozinho a cada ano

  return (
    <footer className="mt-4 border-t border-line pt-8 text-center">
      <img
        src={config.brand.logo.src}
        alt={config.brand.name}
        width={config.brand.logo.width}
        height={config.brand.logo.height}
        loading="lazy"
        className="mx-auto h-auto w-32"
      />
      <p className="mt-3 text-[0.95rem] text-muted">{config.brand.footerTagline}</p>

      {(whatsappUrl || instagramUrl) && (
        <nav aria-label="Contato" className="mt-5 flex flex-wrap items-center justify-center gap-3">
          {whatsappUrl && (
            <a
              href={whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => trackEvent("whatsapp_click", { link_location: "rodape" })}
              className={chipClasses}
            >
              <WhatsAppIcon className="size-5 text-accent" />
              {config.whatsapp.footerLabel}
            </a>
          )}
          {instagramUrl && (
            <a href={instagramUrl} target="_blank" rel="noopener noreferrer" className={chipClasses}>
              <InstagramIcon className="size-5 text-accent" />
              {config.instagram.footerLabel}
            </a>
          )}
        </nav>
      )}

      <p className="mt-6 text-[0.82rem] text-muted">
        © {year} {config.brand.name}. Todos os direitos reservados.
      </p>
    </footer>
  );
}
