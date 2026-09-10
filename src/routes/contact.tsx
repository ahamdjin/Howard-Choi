import { createFileRoute } from "@tanstack/react-router";
import Contact from "@/pages/Contact";
import { buildSeo } from "@/lib/seo";

export const Route = createFileRoute("/contact")({
  head: () =>
    buildSeo({
      title: "Contact Howard Choi Law | Buena Park, CA",
      description:
        "Contact Howard Choi Law in Buena Park, California to request a consultation. Call +1 714-690-0007 or choose a preferred consultation time.",
      path: "/contact",
      alternatePath: "/ko/contact",
      locale: "en-US",
    }),
  component: Contact,
});
