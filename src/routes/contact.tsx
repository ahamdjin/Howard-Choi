import { createFileRoute } from "@tanstack/react-router";
import Contact from "@/pages/Contact";
import { buildSeo } from "@/lib/seo";

export const Route = createFileRoute("/contact")({
  head: () => buildSeo({
    title: "Contact | Buena Park Injury Lawyer",
    description: "Contact Buena Park Injury Lawyer at 714-690-0007 to discuss an accident or personal injury matter in Buena Park or a nearby community.",
    path: "/contact",
    alternatePath: "/ko/contact",
    locale: "en-US",
  }),
  component: Contact,
});
