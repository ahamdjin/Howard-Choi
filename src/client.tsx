import { StartClient } from "@tanstack/react-start/client";
import { createRoot } from "react-dom/client";

// Production document-level hydration fails with a false host-tree mismatch
// and React replaces <html> with an error boundary. Keep server-rendered HTML
// for crawlers and first paint, then initialize a clean interactive client
// tree after the parser has finished. See browser smoke test in CI.
let started = false;

function mountWhenDocumentIsReady() {
  if (started) return;
  if (document.readyState === "loading" || !document.documentElement || !document.body) {
    document.addEventListener("DOMContentLoaded", mountWhenDocumentIsReady, { once: true });
    return;
  }
  started = true;
  createRoot(document).render(<StartClient />);
}

mountWhenDocumentIsReady();
