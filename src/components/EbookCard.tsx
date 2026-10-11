import { useState } from "react";
import { BookOpen, Check, Clock } from "lucide-react";
import { siteConfig, type SiteConfig } from "../config/site";
import { normalizeExternalUrl } from "../lib/links";
import { trackEvent } from "../lib/analytics";
import { BookMockup } from "./BookMockup";

const ctaClasses =
  "flex min-h-14 w-full items-center justify-center rounded-2xl border-2 border-accent px-5 py-3 text-center font-display text-[1.05rem] font-bold text-foreground transition-colors duration-150 hover:bg-accent hover:text-background active:scale-[0.99]";

/** Card de vendas do e-book. O botão só leva à Cakto quando CAKTO_CHECKOUT_URL está configurado. */
export function EbookCard({ ebook = siteConfig.ebook }: { ebook?: SiteConfig["ebook"] }) {
  const checkoutUrl = normalizeExternalUrl(ebook.checkoutUrl);
  const [showComingSoon, setShowComingSoon] = useState(false);

  return (
    <article className="overflow-hidden rounded-[1.6rem] border border-line bg-surface">
      <div className="cover-stage grid place-items-center px-6 pt-8 pb-9">
        <BookMockup src={ebook.coverImage} alt={`Capa do e-book ${ebook.title}`} />
      </div>

      <div className="p-5 pt-6">
        <p className="inline-flex items-center gap-1.5 rounded-full bg-brand/20 px-3 py-1 text-[0.8rem] font-semibold text-accent">
          <BookOpen className="size-3.5" aria-hidden="true" />
          {ebook.badge}
        </p>

        <h2 className="mt-3 font-display text-[1.45rem] leading-[1.15] font-extrabold text-balance">{ebook.title}</h2>
        <p className="mt-3 text-[0.95rem] leading-relaxed text-muted">{ebook.description}</p>

        <ul className="mt-5 flex flex-col gap-3">
          {ebook.benefits.map((benefit) => (
            <li key={benefit} className="flex items-start gap-3 text-[0.95rem] leading-snug">
              <span className="mt-0.5 grid size-5 shrink-0 place-items-center rounded-md bg-brand/25 text-accent">
                <Check className="size-3.5" strokeWidth={3} aria-hidden="true" />
              </span>
              <span>{benefit}</span>
            </li>
          ))}
        </ul>

        <div className="mt-6">
          {checkoutUrl ? (
            <a
              href={checkoutUrl}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => trackEvent("ebook_click", { link_location: "card", link_status: "ativo" })}
              className={ctaClasses}
            >
              {ebook.ctaLabel}
            </a>
          ) : (
            <button
              type="button"
              aria-describedby={showComingSoon ? "ebook-aviso" : undefined}
              onClick={() => {
                setShowComingSoon(true);
                trackEvent("ebook_click", { link_location: "card", link_status: "em_breve" });
              }}
              className={ctaClasses}
            >
              {ebook.ctaLabel}
            </button>
          )}

          {/* Região "viva": leitores de tela anunciam a mensagem quando ela aparece */}
          <div role="status" className="min-h-0">
            {showComingSoon && !checkoutUrl && (
              <p
                id="ebook-aviso"
                className="notice mt-3 flex items-start gap-2.5 rounded-xl border border-line bg-background px-4 py-3 text-[0.92rem] leading-snug"
              >
                <Clock className="mt-0.5 size-4 shrink-0 text-accent" aria-hidden="true" />
                {ebook.comingSoonMessage}
              </p>
            )}
          </div>
        </div>
      </div>
    </article>
  );
}
