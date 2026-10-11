import { afterEach, describe, expect, it, vi } from "vitest";
import { initAnalytics, trackEvent } from "./analytics";

afterEach(() => {
  delete window.gtag;
  delete window.dataLayer;
  document.head.querySelectorAll("script").forEach((s) => s.remove());
});

describe("analytics", () => {
  it("funciona normalmente sem nenhuma ferramenta configurada", () => {
    expect(initAnalytics("")).toBe(false);
    expect(() => trackEvent("whatsapp_click", { link_location: "principal" })).not.toThrow();
    expect(document.head.querySelector("script")).toBeNull();
  });

  it("ignora IDs inválidos", () => {
    expect(initAnalytics("qualquer-coisa")).toBe(false);
  });

  it("com um ID válido, carrega o GA4 e envia o evento", () => {
    expect(initAnalytics("G-TESTE12345")).toBe(true);
    const spy = vi.fn();
    window.gtag = spy;
    trackEvent("ebook_click", { link_location: "card" });
    expect(spy).toHaveBeenCalledWith("event", "ebook_click", { transport_type: "beacon", link_location: "card" });
  });
});
