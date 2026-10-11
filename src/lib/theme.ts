import type { SiteConfig } from "../config/site";

/** Aplica as cores definidas em site.ts como variáveis CSS (usadas por todo o layout). */
export function applyTheme(theme: SiteConfig["theme"]): void {
  const root = document.documentElement;
  (Object.entries(theme) as [string, string][]).forEach(([name, value]) => {
    if (value) root.style.setProperty(`--color-${name}`, value);
  });
  const themeColor = document.querySelector('meta[name="theme-color"]');
  if (themeColor && theme.background) themeColor.setAttribute("content", theme.background);
}
