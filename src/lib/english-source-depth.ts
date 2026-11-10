import editorialPlans from "../../content/learning/reading-plans.json";
import supplemental from "../../content/learning/source-depth-supplements.json";
import type { BlogPost, BlogSection } from "@/data/blogs";

type SupplementSection = BlogSection & { afterHeading?: string | null; insertBeforeHeading?: string; paragraphAnchors?: (string | null)[] };
type Supplement = { source: string; sections: SupplementSection[] };
const bySlug: Record<string, Supplement> = supplemental;
const plans: Record<string, { order: string[]; merges: { from: string; into: string }[] }> = editorialPlans;
const headingKey = (text: string) => text.replace(/^### /, "").replace(/\*\*/g, "").toLocaleLowerCase().trim();

function mergeParagraphs(section: BlogSection, extra: SupplementSection) {
  let explicitGroup: string | undefined;
  extra.paragraphs.forEach((paragraph, index) => {
    if (paragraph.startsWith("### ")) {
      explicitGroup = paragraph.slice(4);
      if (!section.paragraphs.some(text => text.startsWith("### ") && headingKey(text) === headingKey(paragraph))) section.paragraphs.push(paragraph);
      return;
    }
    const group = extra.paragraphAnchors?.[index] ?? explicitGroup;
    if (group) {
      const heading = section.paragraphs.findIndex(text => text.startsWith("### ") && headingKey(text) === headingKey(group));
      if (heading >= 0) {
        const next = section.paragraphs.findIndex((text, i) => i > heading && text.startsWith("### "));
        section.paragraphs.splice(next < 0 ? section.paragraphs.length : next, 0, paragraph);
        return;
      }
    } else if (group === "") {
      const firstHeading = section.paragraphs.findIndex(text => text.startsWith("### "));
      section.paragraphs.splice(firstHeading < 0 ? section.paragraphs.length : firstHeading, 0, paragraph);
      return;
    }
    section.paragraphs.push(paragraph);
  });
}

/** English-only enrichment; original Markdown, translations and draft gates stay authoritative. */
export function withEnglishSourceDepth(post: BlogPost): BlogPost {
  const supplement = bySlug[post.slug];
  if (!supplement?.sections.length) return post;
  const sections = post.sections.map(section => ({ ...section, paragraphs: [...section.paragraphs] }));
  for (const extra of supplement.sections) {
    const match = extra.afterHeading ? sections.find(section => section.heading === extra.afterHeading) : undefined;
    if (match) mergeParagraphs(match, extra);
    else {
      const section = { heading: extra.heading, paragraphs: extra.paragraphs };
      const before = extra.insertBeforeHeading ? sections.findIndex(item => item.heading === extra.insertBeforeHeading) : -1;
      if (before >= 0) sections.splice(before, 0, section);
      else sections.push(section);
    }
  }
  const plan = plans[post.slug];
  if (plan) {
    for (const merge of plan.merges) {
      const source = sections.find(section => section.heading === merge.from);
      const target = sections.find(section => section.heading === merge.into);
      if (!source || !target) continue;
      target.paragraphs.push(`### ${source.heading}`, ...source.paragraphs);
      sections.splice(sections.indexOf(source), 1);
    }
    const rank = new Map(plan.order.map((heading, i) => [heading, i]));
    sections.sort((a, b) => (rank.get(a.heading) ?? 999) - (rank.get(b.heading) ?? 999));
  }
  const text = [post.intro, ...post.leadParagraphs, ...sections.flatMap(section => section.paragraphs)].join(" ");
  return { ...post, sections, readingTime: `${Math.max(1, Math.ceil(text.split(/\s+/).length / 220))} min read` };
}
