import dogScene from "@/assets/law-firm/dog-walking-context.jpg";
import cyclingScene from "@/assets/law-firm/cycling-street-context.jpg";
import authorizedContent from "../../content/learning/catalog.json";
import care from "@/assets/law-firm/medical-care.jpg";
import family from "@/assets/law-firm/family-support.jpg";
import crossing from "@/assets/law-firm/pedestrian-crossing.jpg";
import consultation from "@/assets/law-firm/attorney-client-talking.jpg";
import collision from "@/assets/law-firm/collision-damage.jpg";
import truck from "@/assets/law-firm/truck-highway.jpg";
import motorcycle from "@/assets/law-firm/motorcycle-road.jpg";
import premises from "@/assets/law-firm/wet-floor.jpg";

export type LearningKind = "faq" | "injury" | "guide" | "service";
export type LearningResource = {
  kind: LearningKind; slug: string; path: string; title: string;
  metaTitle: string; description: string; source: string;
  sections: { heading: string; paragraphs: string[] }[];
};
export const learningResources = authorizedContent as LearningResource[];
export const faqTopics = learningResources.filter(r => r.kind === "faq");
export const injuryTopics = learningResources.filter(r => r.kind === "injury");
export const guideTopics = learningResources.filter(r => r.kind === "guide");
export const newServices = learningResources.filter(r => r.kind === "service" && ["bicycle-accidents", "dog-bites"].includes(r.slug));
export const resourceByPath = (path: string) => learningResources.find(r => r.path === path);
export const serviceResource = (slug: string) => resourceByPath("/practice-areas/" + slug);
export const resourceImage = (r: Pick<LearningResource, "kind" | "slug">) => {
  if (r.slug === "dog-bites") return { src: dogScene, alt: "Dog on a leash being walked along a paved path" };
  if (r.slug === "bicycle-accidents") return { src: cyclingScene, alt: "Helmeted cyclist travelling through an urban street" };
  if (r.kind === "injury" || /medical|catastrophic/.test(r.slug)) return { src: care, alt: "Medical professional helping a patient during an examination" };
  if (/dog|wrongful/.test(r.slug)) return { src: family, alt: "Hands held together in support after an injury" };
  if (/truck/.test(r.slug)) return { src: truck, alt: "Commercial truck on a highway" };
  if (/motorcycle/.test(r.slug)) return { src: motorcycle, alt: "Motorcyclist travelling along a road" };
  if (/bicycle|pedestrian/.test(r.slug)) return { src: crossing, alt: "Marked crossing at a city street intersection" };
  if (/slip/.test(r.slug)) return { src: premises, alt: "Wet-floor warning sign on an indoor walkway" };
  if (/car|rideshare/.test(r.slug)) return { src: collision, alt: "Damaged windshield after a vehicle collision" };
  return { src: consultation, alt: "Lawyer and client reviewing documents together" };
};
export const resourceLabel = (r: LearningResource) => r.kind === "service"
  ? r.slug === "dog-bites" ? "Dog Bites" : "Bicycle Accidents"
  : r.title.replace(/\s+FAQs$/, "").replace(/\s+101$/, "");
// Match an injury's common claim context instead of sending every injury to catastrophic claims.
const injuryPrimaryPractice: Record<string, string> = {
  "amputations": "serious-injuries", "burns": "serious-injuries",
  "fractures": "personal-injury", "internal-injuries": "car-accidents",
  "meniscus-injuries": "slip-and-fall", "ptsd": "personal-injury",
  "road-rash": "motorcycle-accidents", "rotator-cuff": "slip-and-fall",
  "spinal-injuries": "serious-injuries", "whiplash": "car-accidents",
  "traumatic-brain-injuries": "serious-injuries",
};
export const relatedPracticePath = (r: LearningResource) => {
  const s = r.slug;
  if (r.kind === "injury" && injuryPrimaryPractice[s]) return "/practice-areas/" + injuryPrimaryPractice[s];
  const key = /bicycle/.test(s) ? "bicycle-accidents" : /dog/.test(s) ? "dog-bites"
    : /truck/.test(s) ? "truck-accidents" : /motorcycle|road-rash/.test(s) ? "motorcycle-accidents"
    : /pedestrian/.test(s) ? "pedestrian-accidents" : /rideshare/.test(s) ? "rideshare-accidents"
    : /slip/.test(s) ? "slip-and-fall" : /wrongful/.test(s) ? "wrongful-death"
    : r.kind === "injury" || /catastrophic/.test(s) ? "serious-injuries"
    : /car/.test(s) ? "car-accidents" : "personal-injury";
  return "/practice-areas/" + key;
};
export const learningHubs = {
  faqs: { path: "/faqs", title: "Personal Injury FAQs", description: "Choose the question on your mind: treatment, insurance, case value, hiring a lawyer or the accident itself.", topics: faqTopics },
  injuries: { path: "/injury-types", title: "Understand Your Injury", description: "Learn how an injury can affect treatment, daily life and a claim. Start with the injury, then explore the evidence and legal options.", topics: injuryTopics },
  guides: { path: "/blogs/guides", title: "California Accident & Injury Guides", description: "Step-by-step guides to the accident, the evidence and the claim process. Choose what happened and read at your own pace.", topics: guideTopics },
} as const;
