import { createFileRoute } from "@tanstack/react-router";
import { LearningHubPage } from "@/pages/learning/LearningPages";
import { buildSeo } from "@/lib/seo";
import { learningHubs } from "@/data/learningResources";
const hub = learningHubs.guides;
export const Route = createFileRoute("/blogs/guides")({ head: () => buildSeo({ title: hub.title + " | Injury Lawyer", description: hub.description, path: hub.path }), component: () => <LearningHubPage hub="guides" /> });
