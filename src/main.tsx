import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "@fontsource-variable/oxanium/wght.css";
import "@fontsource-variable/figtree/wght.css";
import "./index.css";
import App from "./App";
import { siteConfig } from "./config/site";
import { applyTheme } from "./lib/theme";
import { initAnalytics } from "./lib/analytics";
import { getConfigWarnings } from "./lib/configCheck";

applyTheme(siteConfig.theme);
initAnalytics(siteConfig.analytics.ga4MeasurementId);

if (import.meta.env.DEV) {
  getConfigWarnings(siteConfig).forEach((warning) => console.warn(`[ARARITECH] ${warning}`));
}

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <App />
  </StrictMode>,
);
