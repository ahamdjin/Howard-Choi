import { createFileRoute } from "@tanstack/react-router";
import { LearningResourcePage } from "@/pages/learning/LearningPages";
import { serviceResource } from "@/data/learningResourceContent";
import { learningResourceSeo } from "@/lib/learning-seo";
const resource = serviceResource("bicycle-accidents")!;
export const Route = createFileRoute("/practice-areas/bicycle-accidents")({ head: () => learningResourceSeo(resource), component: () => <LearningResourcePage resource={resource} /> });
