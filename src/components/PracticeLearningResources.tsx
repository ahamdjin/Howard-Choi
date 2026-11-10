import { pageVisualAfter } from "@/data/pageVisualPlans";
import { TopicVisual } from "@/components/editorial/TopicVisual";
import { serviceResource } from "@/data/learningResourceContent";
import { ContentPhoto } from "@/components/editorial/ContentPhoto";
import { ReadingSectionBlock } from "@/pages/editorial/shared";
import { ContentBlocks } from "@/components/editorial/ContentBlocks";
import { BookOpen, MessageCircle, HeartPulse, ArrowRight } from "lucide-react";
import { faqTopics, guideTopics, injuryTopics, resourceLabel, relatedPracticePath } from "@/data/learningResources";

const injurySets: Record<string, string[]> = {
  "car-accidents": ["whiplash", "internal-injuries", "fractures"],
  "truck-accidents": ["spinal-injuries", "amputations", "burns"],
  "motorcycle-accidents": ["road-rash", "fractures", "traumatic-brain-injuries"],
  "pedestrian-accidents": ["fractures", "internal-injuries", "traumatic-brain-injuries"],
  "rideshare-accidents": ["whiplash", "rotator-cuff", "ptsd"],
  "slip-and-fall": ["meniscus-injuries", "rotator-cuff", "fractures"],
  "wrongful-death": ["traumatic-brain-injuries", "internal-injuries"],
  "serious-injuries": ["spinal-injuries", "amputations", "traumatic-brain-injuries"],
  "personal-injury": ["whiplash", "fractures", "ptsd"],
};
export function PracticeSourceSections({ slug }: { slug: string }) {
  const sections = serviceResource(slug)?.sections || [];
  return <>{sections.map((section, index) => <div key={section.heading}>
    <ReadingSectionBlock id={`service-depth-${index+1}`} locale="en" kicker="" title={section.heading}>
      <ContentBlocks paragraphs={section.paragraphs} />
    </ReadingSectionBlock>
    {pageVisualAfter(`/practice-areas/${slug}`, index) && <TopicVisual pagePath={`/practice-areas/${slug}`} />}
    {(index === 2 || index === 6) && <ContentPhoto subject={slug} variant={index === 6 ? "recovery" : "scene"} />}
  </div>)}</>;
}

export default function PracticeLearningResources({ slug }: { slug: string }) {
  const path = "/practice-areas/" + slug;
  const faqs = faqTopics.filter(r => relatedPracticePath(r) === path);
  const guides = guideTopics.filter(r => relatedPracticePath(r) === path);
  const injuries = injuryTopics.filter(r => injurySets[slug]?.includes(r.slug));
  const groups = [
    { label: "Questions before you decide", Icon: MessageCircle, items: faqs.length ? faqs : faqTopics.filter(r => r.slug === "case-value-and-settlement-process") },
    { label: "The claim, step by step", Icon: BookOpen, items: guides },
    { label: "Understand the injury", Icon: HeartPulse, items: injuries },
  ];
  return <section id="learning-resources" className="site-shell border-t border-foreground/15 py-12 md:py-16">

    <h2 className="editorial-serif text-balance text-3xl md:text-4xl">The right information for your next decision.</h2>
    <div className="mt-8 grid gap-8 md:grid-cols-3">{groups.map(({ label, Icon, items }) => <div key={label}><Icon aria-hidden="true" size={22} /><h3 className="mt-4 text-lg font-semibold">{label}</h3><ul className="mt-4 space-y-3">{items.map(r => <li key={r.path}><a href={r.path} className="inline-flex min-h-11 items-center gap-2 text-sm underline underline-offset-4">{resourceLabel(r)}<ArrowRight aria-hidden="true" size={14} /></a></li>)}</ul></div>)}</div>
  </section>;
}
