import { createFileRoute } from "@tanstack/react-router";
import Contact from "@/pages/Contact";
import { buildSeo } from "@/lib/seo";

export const Route = createFileRoute("/contact")({
  head: () => buildSeo({
    title: "Contact Buena Park Personal Injury Lawyer | Free Consultation",
    description: "Contact Howard Choi about a Buena Park personal injury or car accident claim. Call 714-844-8494 or book a free consultation online.",
    path: "/contact",
    alternatePath: "/ko/contact",
    locale: "en-US",
  }),
  component: Contact,
});