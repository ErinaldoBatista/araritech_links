import { defineConfig } from "vitest/config";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";

/**
 * Endereço público do site (usado só nas metatags de compartilhamento).
 * - Defina VITE_SITE_URL (ex.: https://links.seudominio.com.br) para um domínio próprio.
 * - Na Vercel, se não definir nada, usamos o domínio de produção do projeto automaticamente.
 */
const siteUrl = (
  process.env.VITE_SITE_URL ||
  (process.env.VERCEL_PROJECT_PRODUCTION_URL ? `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}` : "")
).replace(/\/+$/, "");

export default defineConfig({
  plugins: [
    react(),
    tailwindcss(),
    {
      name: "araritech-site-url",
      transformIndexHtml: (html) => html.replaceAll("__SITE_URL__", siteUrl),
    },
  ],
  test: {
    environment: "jsdom",
    setupFiles: ["./src/test/setup.ts"],
    css: false,
  },
});
