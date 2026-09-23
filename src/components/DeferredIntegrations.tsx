import { useEffect } from "react";

const appendScript = (src: string, attributes: Record<string, string> = {}) => {
  const existing = document.querySelector<HTMLScriptElement>(`script[src="${src}"]`);
  if (existing) return existing;

  const script = document.createElement("script");
  script.src = src;
  script.async = true;
  Object.entries(attributes).forEach(([key, value]) => script.setAttribute(key, value));
  document.body.appendChild(script);
  return script;
};

const DeferredIntegrations = ({ externalFormPage }: { externalFormPage: boolean }) => {
  useEffect(() => {
    let cancelled = false;
    let timeoutId: number | undefined;

    // HighLevel's External Tracking must be present before a visitor can submit
    // a DOM-based form. Load it immediately on every page that contains one of
    // our website forms; keep the heavier chat widget deferred.
    if (externalFormPage) {
      appendScript("https://link.msgsndr.com/js/external-tracking.js", {
        "data-tracking-id": "tk_9bc9b1c38e8446d69a248bc862fae75a",
      });
      appendScript("https://link.msgsndr.com/js/form_embed.js");
    }

    const loadDeferred = () => {
      if (cancelled) return;

      appendScript("https://widgets.leadconnectorhq.com/loader.js", {
        "data-resources-url": "https://widgets.leadconnectorhq.com/chat-widget/loader.js",
        "data-widget-id": "6a9841dd05dab92683f66d82",
      });
    };

    if ("requestIdleCallback" in window) {
      const idleId = window.requestIdleCallback(loadDeferred, { timeout: 2200 });
      return () => {
        cancelled = true;
        window.cancelIdleCallback(idleId);
      };
    }

    timeoutId = window.setTimeout(loadDeferred, 1200);
    return () => {
      cancelled = true;
      if (timeoutId) window.clearTimeout(timeoutId);
    };
  }, [externalFormPage]);

  return null;
};

export default DeferredIntegrations;
