import { createFileRoute } from "@tanstack/react-router";
import KoBlogDetail from "@/pages/KoBlogDetail";

export const Route = createFileRoute("/ko/blogs/$slug")({
  component: KoBlogDetail,
});
