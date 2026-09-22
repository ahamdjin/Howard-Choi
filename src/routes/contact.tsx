import { createFileRoute } from "@tanstack/react-router";
import Contact from "@/pages/Contact";
import { buildSeo } from "@/lib/seo";

export const Route = createFileRoute("/contact")({
  head: () => buildSeo({
    title: "Contact Buena Park Personal Injury Lawyer | Free Consultation",
    description: "Contact Buena Park personal injury attorney Howard Choi about an accident, current treatment, insurance questions, evidence, and deadlines. Call 714-690-0007 or book an available consultation online.",
    path: "/contact",
    alternatePath: "/ko/contact",
    locale: "en-US",
  }),
  component: Contact,
});