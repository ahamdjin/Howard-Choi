import { StartClient } from "@tanstack/react-start/client";
import { hydrateRoot } from "react-dom/client";

// Streaming HTML can still be arriving when an async production JS bundle
// executes. Hydrating <html>/<head>/<body> during parsing can make React
// mistake missing not-yet-parsed nodes for a permanent mismatch, then replace
// the entire document with an error boundary. Defer hydration until parsing
// and TanStack's streamed bootstrap scripts have finished.
let hydrationStarted = false;

function hydrateWhenDocumentIsReady() {
  if (hydrationStarted) return;

  if (document.readyState === "loading" || !document.documentElement || !document.head || !document.body) {
    document.addEventListener("DOMContentLoaded", hydrateWhenDocumentIsReady, { once: true });
    return;
  }

  hydrationStarted = true;
  hydrateRoot(document, <StartClient />);
}

hydrateWhenDocumentIsReady();
