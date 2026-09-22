import { createFileRoute } from "@tanstack/react-router";
import Blogs from "@/pages/Blogs";
import { buildSeo } from "@/lib/seo";

export const Route = createFileRoute("/blogs")({
  head: () => buildSeo({
    title: "California Injury Guides | Accidents, Insurance & Claims",
    description: "Practical California personal injury guides covering car and truck accidents, comparative fault, Uber and Lyft insurance, evidence, filing deadlines, medical documentation, and what affects case value.",
    path: "/blogs",
    alternatePath: "/ko/blogs",
    locale: "en-US",
  }),
  component: Blogs,
});
