import { createFileRoute } from "@tanstack/react-router";
import Blogs from "@/pages/Blogs";
import { buildSeo } from "@/lib/seo";

export const Route = createFileRoute("/blogs")({
  head: () =>
    buildSeo({
      title: "Legal Insights & Articles | Howard Choi Law",
      description:
        "Practical legal insights from Howard Choi Law on business disputes, contracts, corporate matters, risk, and consequential legal decisions.",
      path: "/blogs",
      alternatePath: "/ko/blogs",
      locale: "en-US",
    }),
  component: Blogs,
});
