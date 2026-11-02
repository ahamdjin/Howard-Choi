import { useEffect } from "react";

// These scripts are not React components. Loading them before the initial
// document and React hydration have settled can let a vendor widget mutate
// elements while React is claiming server-rendered DOM nodes.
const appendScript = (src: string, attributes: Record<string, string> = {}) => {
  const body = document.body;
  if (!body || !document.documentElement?.contains(body)) return false;

  const existing = Array.from(document.scripts).find((script) => script.src === src);
  if (existing) return true;

  const script = document.createElement("script");
  script.src = src;
  script.async = true;
  Object.entries(attributes).forEach(([key, value]) => script.setAttribute(key, value));
  body.appendChild(script);
  return true;
};

const DeferredIntegrations = ({ externalFormPage, disableChat = false }: { externalFormPage: boolean; disableChat?: boolean }) => {
  useEffect(() => {
    let cancelled = false;
    let idleId: number | undefined;
    let timeoutId: ReturnType<typeof setTimeout> | undefined;

    const loadIntegrations = () => {
      if (cancelled || !document.body) return;

      if (externalFormPage) {
        appendScript("https://link.msgsndr.com/js/external-tracking.js", {
          "data-tracking-id": "tk_9bc9b1c38e8446d69a248bc862fae75a",
        });
        appendScript("https://link.msgsndr.com/js/form_embed.js");
      }

      if (!disableChat) {
        appendScript("https://widgets.leadconnectorhq.com/loader.js", {
          "data-resources-url": "https://widgets.leadconnectorhq.com/chat-widget/loader.js",
          "data-widget-id": "6a9841dd05dab92683f66d82",
        });
      }
    };

    const scheduleIntegrations = () => {
      if (cancelled) return;
      // Let load/hydration and the first browser paint finish before any
      // external code is allowed to inject iframes, widgets or scripts.
      if ("requestIdleCallback" in window) {
        idleId = window.requestIdleCallback(loadIntegrations, { timeout: 3000 });
      } else {
        timeoutId = setTimeout(loadIntegrations, 1600);
      }
    };

    if (document.readyState === "complete") scheduleIntegrations();
    else window.addEventListener("load", scheduleIntegrations, { once: true });

    return () => {
      cancelled = true;
      window.removeEventListener("load", scheduleIntegrations);
      if (idleId !== undefined) window.cancelIdleCallback?.(idleId);
      if (timeoutId !== undefined) clearTimeout(timeoutId);
    };
  }, [externalFormPage, disableChat]);

  return null;
};

export default DeferredIntegrations;
