import { createFileRoute, Outlet } from "@tanstack/react-router";

export const Route = createFileRoute("/ko/locations")({
  component: Outlet,
});
