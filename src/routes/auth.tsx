import { createFileRoute } from "@tanstack/react-router";
import Auth from "@/pages/Auth";
import { noIndexSeo } from "@/lib/seo";

export const Route = createFileRoute("/auth")({
  head: () => noIndexSeo("Sign in | Howard Choi Law"),
  ssr: false,
  component: Auth,
});
