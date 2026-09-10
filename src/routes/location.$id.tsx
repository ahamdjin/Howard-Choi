import { createFileRoute } from "@tanstack/react-router";
import LocationDetail from "@/pages/LocationDetail";
import { noIndexSeo } from "@/lib/seo";

export const Route = createFileRoute("/location/$id")({
  head: () => noIndexSeo("Location | Howard Choi Law"),
  component: LocationDetail,
});
