import { createFileRoute } from "@tanstack/react-router";
import Admin from "@/pages/Admin";
import { noIndexSeo } from "@/lib/seo";

export const Route = createFileRoute("/admin")({
  head: () => noIndexSeo("Admin | Howard Choi Law"),
  ssr: false,
  component: Admin,
});
