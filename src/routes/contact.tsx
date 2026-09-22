import { createFileRoute } from "@tanstack/react-router";
import Contact from "@/pages/Contact";
import { buildSeo } from "@/lib/seo";

export const Route = createFileRoute("/contact")({
  head: () => buildSeo({
    title: "Contact Buena Park Personal Injury Lawyer | Free Consultation",
    description: "Contact a Buena Park accident and personal injury lawyer about your crash, current treatment, insurance questions, evidence and filing deadlines. Call 714-690-0007 or book a consultation online.",
    path: "/contact",
    alternatePath: "/ko/contact",
    locale: "en-US",
  }),
  component: Contact,
});