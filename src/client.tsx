import { StartClient } from "@tanstack/react-start/client";
import { hydrateRoot } from "react-dom/client";

// The framework's inline streaming bootstrap and module scripts must finish
// before React traverses <html>, <head> and <body> to hydrate them.
let hydrationStarted = false;

function hydrateAfterFullLoad() {
  if (hydrationStarted) return;
  if (!document.head || !document.body || !document.documentElement) return;
  hydrationStarted = true;
  hydrateRoot(document, <StartClient />);
}

if (document.readyState === "complete") {
  queueMicrotask(hydrateAfterFullLoad);
} else {
  window.addEventListener("load", hydrateAfterFullLoad, { once: true });
}
