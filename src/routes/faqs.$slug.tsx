import { createFileRoute, notFound } from "@tanstack/react-router";
import { LearningResourcePage } from "@/pages/learning/LearningPages";
import { resourceByPath } from "@/data/learningResourceContent";
import { learningResourceSeo } from "@/lib/learning-seo";
export const Route = createFileRoute("/faqs/$slug")({
 loader: ({ params }) => { const resource = resourceByPath("/faqs/" + params.slug); if (!resource) throw notFound(); return resource; },
 head: ({ loaderData }) => loaderData ? learningResourceSeo(loaderData) : {},
 component: Page,
});
function Page() { return <LearningResourcePage resource={Route.useLoaderData()} />; }
