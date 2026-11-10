import { createFileRoute } from "@tanstack/react-router";
import { LearningHubPage } from "@/pages/learning/LearningPages";
import { buildSeo } from "@/lib/seo";
import { learningHubs } from "@/data/learningResources";
const hub = learningHubs.faqs;
export const Route = createFileRoute("/faqs/")({ head: () => buildSeo({ title: hub.title + " | Buena Park Injury Lawyer", description: hub.description, path: hub.path }), component: () => <LearningHubPage hub="faqs" /> });
