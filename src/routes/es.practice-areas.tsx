import { createFileRoute, Outlet } from "@tanstack/react-router";

export const Route = createFileRoute("/es/practice-areas")({
  component: Outlet,
});
