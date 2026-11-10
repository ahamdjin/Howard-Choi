import { pageVisualAfter } from "@/data/pageVisualPlans";
import { TopicVisual } from "@/components/editorial/TopicVisual";
import { ContentPhoto } from "@/components/editorial/ContentPhoto";
import heroJustice from "@/assets/law-firm/hero-justice-library.webp";
import consultation from "@/assets/law-firm/attorney-client-talking.jpg";
import documents from "@/assets/law-firm/reviewing-documents.jpg";
import firmContent from "../../../content/learning/firm-pages.json";
import { ContentBlocks } from "@/components/editorial/ContentBlocks";
import { responsiveImageProps } from "@/lib/responsive-images";
import { ConsultationCta, EditorialFrame, EditorialHero, ReadingLayout, ReadingSectionBlock } from "./shared";

export function FirmApproachPage({ page }: { page: keyof typeof firmContent }) {
  const copy = firmContent[page];
  const pagePath = page === "difference" ? "/about/our-difference" : page === "process" ? "/about/what-to-expect" : "/about/zero-fee-guarantee";
  const sections = copy.sections.map((section, i) => ({ id: `firm-section-${i+1}`, label: section.heading }));
  return <EditorialFrame locale="en"><main className="detail-guide firm-reading-page">
    <EditorialHero locale="en" eyebrow="Buena Park Injury Lawyer" title={copy.title} description={copy.description} image={page === "difference" ? consultation : heroJustice} detail />
    <ReadingLayout locale="en" label={copy.title} sections={sections}>
      {copy.sections.map((section, i) => <div key={sections[i].id}>
        <ReadingSectionBlock id={sections[i].id} locale="en" kicker={page === "process" ? `Step ${i+1}` : ""} title={section.heading}>
          <ContentBlocks paragraphs={section.paragraphs} />
        </ReadingSectionBlock>
        {pageVisualAfter(pagePath, i) && <TopicVisual pagePath={pagePath} />}
        {i === 3 && <ContentPhoto subject="court-process" />}
        {(i === 0 || (page === "process" && i === 4)) && <figure className="content-photo"><img {...responsiveImageProps(i === 0 ? consultation : documents, "(max-width: 767px) 100vw, 760px")} src={i === 0 ? consultation : documents} alt={i === 0 ? "Consultation and document review at a desk" : "Documents being reviewed at a desk"} loading="lazy" decoding="async" /></figure>}
      </div>)}
      <nav aria-label="Related firm information" className="flex flex-wrap gap-5 border-t border-foreground/15 py-8">
        <a className="editorial-inline-link" href="/about/our-difference">Our Difference</a>
        <a className="editorial-inline-link" href="/about/what-to-expect">What to Expect</a>
        <a className="editorial-inline-link" href="/about/zero-fee-guarantee">Zero Fee Guarantee</a>
        <a className="editorial-inline-link" href="/faqs">FAQs</a>
      </nav>
    </ReadingLayout>
    <ConsultationCta locale="en" />
  </main></EditorialFrame>;
}
