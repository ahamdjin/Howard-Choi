import { createFileRoute } from "@tanstack/react-router";
import Locations from "@/pages/Locations";
import { noIndexSeo } from "@/lib/seo";

export const Route = createFileRoute("/locations")({
  head: () => noIndexSeo("Locations | Howard Choi Law"),
  component: Locations,
});
