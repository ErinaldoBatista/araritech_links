import { describe, expect, it, vi } from "vitest";
import { fireEvent, render, screen } from "@testing-library/react";
import App from "./App";
import { EbookCard } from "./components/EbookCard";
import { Footer } from "./components/Footer";
import { siteConfig } from "./config/site";
import * as analytics from "./lib/analytics";

describe("página ARARITECH", () => {
  it("mostra o logotipo, a descrição e os dois caminhos", () => {
    render(<App />);
    expect(screen.getByRole("heading", { level: 1, name: "ARARITECH" })).toBeInTheDocument();
    expect(screen.getByText("Tecnologia, manutenção e soluções para o seu computador.")).toBeInTheDocument();
    expect(screen.getByRole("link", { name: /Preciso de assistência técnica/ })).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "Quero acessar o e-book" })).toBeInTheDocument();
  });

  it("o botão do WhatsApp aponta para o número e abre em nova aba", () => {
    render(<App />);
    const link = screen.getByRole("link", { name: /Preciso de assistência técnica/ });
    expect(link.getAttribute("href")).toMatch(/^https:\/\/wa\.me\/5587991671058\?text=/);
    expect(link).toHaveAttribute("target", "_blank");
    expect(link).toHaveAttribute("rel", expect.stringContaining("noopener"));
  });

  it("rastreia os cliques sem enviar dados pessoais", () => {
    const spy = vi.spyOn(analytics, "trackEvent").mockImplementation(() => {});
    render(<App />);
    const link = screen.getByRole("link", { name: /Preciso de assistência técnica/ });
    link.addEventListener("click", (e) => e.preventDefault());
    fireEvent.click(link);
    expect(spy).toHaveBeenCalledWith("whatsapp_click", { link_location: "principal" });
    spy.mockRestore();
  });
});

describe("botão do e-book sem link da Cakto", () => {
  it("não leva a nenhuma página e mostra o aviso 'em breve'", () => {
    const spy = vi.spyOn(analytics, "trackEvent").mockImplementation(() => {});
    render(<EbookCard ebook={{ ...siteConfig.ebook, checkoutUrl: "" }} />);

    expect(screen.queryByRole("link", { name: "Quero acessar o e-book" })).not.toBeInTheDocument();
    expect(screen.queryByText(siteConfig.ebook.comingSoonMessage)).not.toBeInTheDocument();

    fireEvent.click(screen.getByRole("button", { name: "Quero acessar o e-book" }));
    expect(screen.getByText("O acesso ao e-book estará disponível em breve.")).toBeInTheDocument();
    expect(spy).toHaveBeenCalledWith("ebook_click", { link_location: "card", link_status: "em_breve" });
    spy.mockRestore();
  });
});

describe("botão do e-book com link da Cakto", () => {
  it("vira um link externo seguro", () => {
    render(<EbookCard ebook={{ ...siteConfig.ebook, checkoutUrl: "https://pay.cakto.com.br/teste" }} />);
    const link = screen.getByRole("link", { name: "Quero acessar o e-book" });
    expect(link).toHaveAttribute("href", "https://pay.cakto.com.br/teste");
    expect(link).toHaveAttribute("target", "_blank");
    expect(link).toHaveAttribute("rel", expect.stringContaining("noopener"));
  });

  it("ignora link inválido (continua em 'em breve')", () => {
    render(<EbookCard ebook={{ ...siteConfig.ebook, checkoutUrl: "COLE_AQUI" }} />);
    expect(screen.queryByRole("link", { name: "Quero acessar o e-book" })).not.toBeInTheDocument();
  });
});

describe("rodapé", () => {
  it("mostra o ano atual automaticamente", () => {
    render(<Footer />);
    expect(screen.getByText(new RegExp(`© ${new Date().getFullYear()} ARARITECH`))).toBeInTheDocument();
  });

  it("esconde o Instagram enquanto não houver link configurado", () => {
    render(<Footer config={{ ...siteConfig, instagram: { ...siteConfig.instagram, url: "" } }} />);
    expect(screen.queryByRole("link", { name: "Instagram" })).not.toBeInTheDocument();
    expect(screen.getByRole("link", { name: "WhatsApp" })).toBeInTheDocument();
  });

  it("mostra o Instagram quando o link é informado", () => {
    render(<Footer config={{ ...siteConfig, instagram: { ...siteConfig.instagram, url: "@exemplo" } }} />);
    expect(screen.getByRole("link", { name: "Instagram" })).toHaveAttribute("href", "https://www.instagram.com/exemplo/");
  });
});
