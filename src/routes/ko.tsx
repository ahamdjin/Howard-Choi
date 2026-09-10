import { createFileRoute } from "@tanstack/react-router";
import KoIndex from "@/pages/KoIndex";

export const Route = createFileRoute("/ko")({
  component: KoIndex,
});
