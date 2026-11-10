import { createFileRoute } from "@tanstack/react-router";
import { LearningResourcePage } from "@/pages/learning/LearningPages";
import { serviceResource } from "@/data/learningResourceContent";
import { learningResourceSeo } from "@/lib/learning-seo";
const resource = serviceResource("dog-bites")!;
export const Route = createFileRoute("/practice-areas/dog-bites")({ head: () => learningResourceSeo(resource), component: () => <LearningResourcePage resource={resource} /> });
