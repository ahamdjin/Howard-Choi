import { createFileRoute } from "@tanstack/react-router";
import Blogs from "@/pages/Blogs";
import { buildSeo } from "@/lib/seo";

export const Route = createFileRoute("/blogs")({
  head: () => buildSeo({
    title: "Personal Injury Law Blog | Buena Park Injury Lawyer",
    description: "Clear, practical guides on car accidents, personal injury claims, insurance, evidence, medical documentation, and recovery after an accident in California.",
    path: "/blogs",
    alternatePath: "/ko/blogs",
    locale: "en-US",
  }),
  component: Blogs,
});
