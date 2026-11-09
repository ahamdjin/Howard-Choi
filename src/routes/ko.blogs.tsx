import { createFileRoute, Outlet } from "@tanstack/react-router";

export const Route = createFileRoute("/ko/blogs")({
  component: Outlet,
});
