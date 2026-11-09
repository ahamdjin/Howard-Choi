import { createFileRoute } from "@tanstack/react-router";
import Blogs from "@/pages/Blogs";
import { buildSeo } from "@/lib/seo";

export const Route = createFileRoute("/blogs/")({
  head: () => buildSeo({
    title: "California Injury Law Guides | Buena Park Injury Lawyer",
    description: "California injury guides on car and truck accidents, comparative fault, rideshare coverage, evidence, filing deadlines and case value.",
    path: "/blogs",
    alternatePath: "/ko/blogs",
    locale: "en-US",
  }),
  component: Blogs,
});
