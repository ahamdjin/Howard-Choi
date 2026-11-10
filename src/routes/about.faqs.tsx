import { createFileRoute, redirect } from "@tanstack/react-router";

// Keep old bookmarks working without a second, outdated FAQ library.
export const Route = createFileRoute("/about/faqs")({
  beforeLoad: () => { throw redirect({ to: "/faqs", statusCode: 301 }); },
});
