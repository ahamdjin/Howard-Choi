import { createFileRoute } from "@tanstack/react-router";
import Index from "@/pages/Index";
import { buildSeo } from "@/lib/seo";

export const Route = createFileRoute("/")({
  head: () =>
    buildSeo({
      title: "Accident Attorney in Buena Park | Howard Choi Law",
      description:
        "Howard Choi Law provides clear, responsive legal representation for people injured in accidents in Buena Park and across Orange County.",
      path: "/",
      alternatePath: "/ko",
      locale: "en-US",
    }),
  component: Index,
});
