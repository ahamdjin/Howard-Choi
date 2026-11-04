import { ArrowRight, FileText } from "lucide-react";
import { responsiveImageProps } from "@/lib/responsive-images";
import "./story-sections.css";

export type CaseStory = {
  id: string;
  title: string;
  label: string;
  paragraphs: readonly string[];
  image: { src: string; alt: string; credit?: { label: string; source: string; license: string; licenseUrl: string } };
  evidence?: string;
  link: { href: string; label: string };
};

/** Content stays city-specific; the reading rhythm and mobile behavior are shared. */
export function CaseStories({ stories }: { stories: readonly CaseStory[] }) {
  return <div className="case-stories">
    {stories.map((story, index) => <article key={story.id} id={story.id} className="case-story">
      <figure className="case-story-figure"><a className="case-story-photo" href={story.link.href} aria-label={story.link.label}>
        <img {...responsiveImageProps(story.image.src, "(max-width: 767px) 92vw, 42vw")} src={story.image.src} alt={story.image.alt} width={720} height={480} loading="lazy" decoding="async" />
        <span>{String(index + 1).padStart(2, "0")} / {story.label}</span>
      </a>{story.image.credit && <figcaption><a href={story.image.credit.source} target="_blank" rel="noreferrer">{story.image.credit.label}</a> · <a href={story.image.credit.licenseUrl} target="_blank" rel="noreferrer">{story.image.credit.license}</a></figcaption>}</figure>
      <div className="case-story-copy">
        <h3>{story.title}</h3>
        {story.paragraphs.map((paragraph, i) => <p key={i}>{paragraph}</p>)}
        {story.evidence && <div className="case-story-evidence"><FileText size={16} aria-hidden="true" />{story.evidence}</div>}
        <a className="case-story-link" href={story.link.href}>{story.link.label}<ArrowRight size={17} aria-hidden="true" /></a>
      </div>
    </article>)}
  </div>;
}
