import { createFileRoute } from "@tanstack/react-router";
import About from "@/pages/About";
import { noIndexSeo } from "@/lib/seo";

export const Route = createFileRoute("/about")({
  head: () => noIndexSeo("About | Howard Choi Law"),
  component: About,
});
