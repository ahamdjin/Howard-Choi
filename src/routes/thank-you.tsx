import { createFileRoute } from "@tanstack/react-router";
import ThankYou from "@/pages/ThankYou";
import { buildSeo } from "@/lib/seo";

export const Route = createFileRoute("/thank-you")({
  head: () => buildSeo({
    title: "Thank You | Buena Park Injury Lawyer",
    description: "Your message has been received by Buena Park Injury Lawyer.",
    path: "/thank-you",
    alternatePath: "/ko/thank-you",
    locale: "en-US",
    noindex: true,
  }),
  component: () => <ThankYou locale="en" />,
});
