import { describe, expect, it } from "vitest";
import { buildWhatsAppUrl, normalizeExternalUrl, onlyDigits, resolveInstagramUrl } from "./links";
import { siteConfig } from "../config/site";

describe("link do WhatsApp", () => {
  it("monta o link internacional sem espaços, parênteses ou traços", () => {
    const url = buildWhatsAppUrl("+55 87 99167-1058", "oi")!;
    expect(url.startsWith("https://wa.me/5587991671058?text=")).toBe(true);
    expect(onlyDigits("+55 (87) 99167-1058")).toBe("5587991671058");
  });

  it("usa o número e a mensagem oficiais do site.ts", () => {
    const url = buildWhatsAppUrl(siteConfig.whatsapp.phone, siteConfig.whatsapp.message)!;
    const parsed = new URL(url);
    expect(parsed.pathname).toBe("/5587991671058");
    expect(parsed.searchParams.get("text")).toBe(
      "Olá! Vim pelo Instagram da ARARITECH e gostaria de informações sobre assistência técnica.",
    );
  });

  it("não gera link quando o número é inválido", () => {
    expect(buildWhatsAppUrl("")).toBeNull();
    expect(buildWhatsAppUrl("123")).toBeNull();
  });
});

describe("links externos", () => {
  it("rejeita vazio, texto solto e http", () => {
    expect(normalizeExternalUrl("")).toBeNull();
    expect(normalizeExternalUrl("COLE_AQUI_O_LINK")).toBeNull();
    expect(normalizeExternalUrl("http://exemplo.com")).toBeNull();
  });

  it("aceita https válido", () => {
    expect(normalizeExternalUrl("https://pay.cakto.com.br/abc123")).toBe("https://pay.cakto.com.br/abc123");
  });

  it("Instagram aceita @usuario ou link completo", () => {
    expect(resolveInstagramUrl("")).toBeNull();
    expect(resolveInstagramUrl("@usuario.teste")).toBe("https://www.instagram.com/usuario.teste/");
    expect(resolveInstagramUrl("https://www.instagram.com/usuario/")).toBe("https://www.instagram.com/usuario/");
    expect(resolveInstagramUrl("@@@")).toBeNull();
  });
});
