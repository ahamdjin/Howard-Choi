import content from "../../content/learning/dklaw-authorized.json";
import type { LearningResource } from "@/data/learningResources";
export const resourceByPath = (path: string) => (content as LearningResource[]).find(r => r.path === path);
export const serviceResource = (slug: string) => resourceByPath("/practice-areas/" + slug);

export const practiceSourceContents = (slug: string) =>
  (serviceResource(slug)?.sections || []).map((section, index) => ({ id: `service-depth-${index+1}`, label: section.heading }));
