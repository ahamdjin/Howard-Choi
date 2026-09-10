import { createFileRoute } from "@tanstack/react-router";
import Locations from "@/pages/Locations";

export const Route = createFileRoute("/locations")({
  component: Locations,
});
