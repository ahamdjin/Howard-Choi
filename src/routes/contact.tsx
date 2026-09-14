import { createFileRoute } from "@tanstack/react-router";
import Contact from "@/pages/Contact";
import { buildSeo } from "@/lib/seo";

export const Route = createFileRoute("/contact")({
  head: () => buildSeo({
    title: "Contact Buena Park Personal Injury Lawyers | Consultation",
    description: "Contact our Buena Park personal injury legal team to discuss an accident, current treatment, insurance questions, evidence, deadlines, and possible next steps. Call 714-690-0007 or book an available consultation online.",
    path: "/contact",
    alternatePath: "/ko/contact",
    locale: "en-US",
  }),
  component: Contact,
});