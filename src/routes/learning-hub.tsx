import { createFileRoute } from "@tanstack/react-router";
import LearningHubOverview from "@/pages/learning/LearningHubOverview";
import { buildSeo, breadcrumbJsonLd } from "@/lib/seo";
export const Route = createFileRoute("/learning-hub")({
  head: () => ({ ...buildSeo({ title: "Learning Hub | Legal Resources from Buena Park Injury Lawyer", description: "Explore guides, FAQs, injury explanations and articles from Buena Park Injury Lawyer. Get answers, know your rights and understand your next step.", path: "/learning-hub" }), scripts: [{ type: "application/ld+json", children: JSON.stringify(breadcrumbJsonLd([{name:"Home",path:"/"},{name:"Learning Hub",path:"/learning-hub"}])) }] }),
  component: LearningHubOverview,
});
