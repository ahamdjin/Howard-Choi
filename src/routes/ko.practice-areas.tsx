import { createFileRoute, Outlet } from "@tanstack/react-router";

export const Route = createFileRoute("/ko/practice-areas")({
  component: Outlet,
});
