import { createFileRoute } from "@tanstack/react-router";
import ReviewPage from "@/pages/ReviewPage";
import { noIndexSeo } from "@/lib/seo";

export const Route = createFileRoute("/review")({
  head: () => noIndexSeo("Share Your Experience | Buena Park Injury Lawyer"),
  component: ReviewPage,
});
