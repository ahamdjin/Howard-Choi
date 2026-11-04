import { ArrowRight } from "lucide-react";
import { SectionHeading } from "./SectionHeading";

/** A focused client concern, kept distinct from the longer reference guide. */
export function ImageTextFeature({ id, eyebrow, title, paragraphs, image, link }: {
  id: string;
  eyebrow: string;
  title: string;
  paragraphs: string[];
  image: { src: string; alt: string };
  link?: { href: string; label: string };
}) {
  return <section id={id} className="experience-section experience-feature">
    <div className="site-shell experience-feature-grid">
      <img src={image.src} alt={image.alt} width={1000} height={800} loading="lazy" decoding="async" />
      <div>
        <SectionHeading eyebrow={eyebrow}>{title}</SectionHeading>
        {paragraphs.map((paragraph, index) => <p key={index}>{paragraph}</p>)}
        {link && <a className="experience-link" href={link.href}>{link.label}<ArrowRight size={17} aria-hidden="true" /></a>}
      </div>
    </div>
  </section>;
}
