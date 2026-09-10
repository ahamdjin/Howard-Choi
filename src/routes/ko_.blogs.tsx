import { createFileRoute } from "@tanstack/react-router";
import KoBlogs from "@/pages/KoBlogs";

export const Route = createFileRoute("/ko/blogs")({
  component: KoBlogs,
});
