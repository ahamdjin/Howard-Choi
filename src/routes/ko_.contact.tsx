import { createFileRoute } from "@tanstack/react-router";
import KoContact from "@/pages/KoContact";

export const Route = createFileRoute("/ko/contact")({
  component: KoContact,
});
