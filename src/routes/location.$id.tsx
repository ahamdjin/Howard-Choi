import { createFileRoute } from "@tanstack/react-router";
import LocationDetail from "@/pages/LocationDetail";

export const Route = createFileRoute("/location/$id")({
  component: LocationDetail,
});
