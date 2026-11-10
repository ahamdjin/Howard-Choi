import { pageVisualAfter } from "@/data/pageVisualPlans";
import { TopicVisual } from "@/components/editorial/TopicVisual";
import { ContentBlocks } from "@/components/editorial/ContentBlocks";
import { ContentPhoto } from "@/components/editorial/ContentPhoto";
import { injuryMedicalSources } from "@/data/injuryMedicalSources";
import { ArrowRight, BookOpen, ClipboardList, HeartPulse, MessageCircle, Scale, Bone, Brain, Flame, Activity, Accessibility } from "lucide-react";
import { ArticleAuthorBio } from "@/components/blog/ArticleAuthor";
import { EditorialFrame, EditorialHero, ReadingLayout, ReadingSectionBlock, ConsultationCta } from "@/pages/editorial/shared";
import { learningHubs, resourceImage, resourceLabel, relatedPracticePath, faqTopics, guideTopics, injuryTopics, type LearningResource } from "@/data/learningResources";
import { responsiveImageProps } from "@/lib/responsive-images";

export function LearningLinks() {
  return <nav aria-label="Explore injury resources" className="flex flex-wrap gap-x-6 gap-y-3 text-sm">
    <a href="/faqs" className="inline-flex min-h-11 items-center gap-2 underline underline-offset-4"><MessageCircle size={16} aria-hidden="true" />Questions & answers</a>
    <a href="/blogs/guides" className="inline-flex min-h-11 items-center gap-2 underline underline-offset-4"><BookOpen size={16} aria-hidden="true" />Step-by-step guides</a>
    <a href="/injury-types" className="inline-flex min-h-11 items-center gap-2 underline underline-offset-4"><HeartPulse size={16} aria-hidden="true" />Understand your injury</a>
  </nav>;
}

export function ResourceCards({ topics }: { topics: readonly LearningResource[] }) {
  return <div className="grid gap-x-8 gap-y-12 sm:grid-cols-2 lg:grid-cols-3">{topics.map(r => {
    const image = resourceImage(r);
    const Icon = r.kind === "faq" ? MessageCircle : /burn/.test(r.slug) ? Flame : /ptsd|brain/.test(r.slug) ? Brain : /fracture|spinal|rotator|meniscus/.test(r.slug) ? Bone : /amputation/.test(r.slug) ? Accessibility : Activity;
    return <a href={r.path} key={r.path} className="group border-b border-foreground/15 pb-6">
      {r.kind !== "guide" ? <Icon aria-hidden="true" size={32} className="mb-6 text-[#755D46]" /> : <img {...responsiveImageProps(image.src, "(max-width: 639px) 100vw, 33vw")} src={image.src} alt={image.alt} width={720} height={480} loading="lazy" decoding="async" className="mb-5 aspect-[3/2] w-full object-cover" />}
      <div className="flex items-start justify-between gap-4"><h2 className="editorial-serif text-balance text-2xl group-hover:underline">{resourceLabel(r)}</h2><ArrowRight aria-hidden="true" size={18} className="mt-1 shrink-0" /></div>
      <p className="mt-3 text-pretty text-sm leading-6 text-foreground/70">{r.kind === "faq" ? `${r.sections.length} answers, starting with: ${r.sections[0].heading}` : r.description}</p>
      <span className="mt-5 block text-xs font-semibold">{r.kind === "faq" ? "Read the answers" : r.kind === "injury" ? "Understand this injury" : "Read the guide"} →</span>
    </a>;
  })}</div>;
}

function ResourceIntro({ title, description, back, backLabel }: { title: string; description: string; back?: string; backLabel?: string }) {
  return <header className="resource-intro site-shell">
    <a href={back || "/learning-hub"} className="resource-back">← {backLabel || "Learning Hub"}</a>
    <h1>{title}</h1><p>{description}</p>
    <LearningLinks />
  </header>;
}

export function LearningHubPage({ hub }: { hub: keyof typeof learningHubs }) {
  const item = learningHubs[hub];
  return <EditorialFrame locale="en"><main className="detail-guide learning-hub">
    <ResourceIntro title={item.title} description={item.description} />
    <section className="site-shell py-8 md:py-12"><div><ResourceCards topics={item.topics} /></div></section>
    <ConsultationCta locale="en" />
  </main></EditorialFrame>;
}

const primarySources = [
  { label: "California Courts · Injury claims and filing deadlines", href: "https://selfhelp.courts.ca.gov/civil-lawsuit/personal-injury" },
  { label: "California Courts · Claims against a government agency", href: "https://selfhelp.courts.ca.gov/civil-lawsuit/government-claim" },
];

export function LearningResourcePage({ resource: r }: { resource: LearningResource }) {
  const image = resourceImage(r);
  const medicalSource = r.kind === "injury" ? injuryMedicalSources[r.slug] : undefined;
  const sources = medicalSource ? [medicalSource, ...primarySources] : primarySources;
  const service = r.kind === "service";
  const category = service ? "Practice area" : r.kind === "faq" ? "Questions & answers" : "Injury types";
  const directory = service ? "/practice-areas" : r.kind === "faq" ? "/faqs" : "/injury-types";
  const sections = r.sections.map((s, i) => ({ id: `resource-section-${i+1}`, label: s.heading }));
  return <EditorialFrame locale="en"><main className={`detail-guide learning-detail learning-detail--${r.kind}`}>
    {r.kind === "faq" ? <ResourceIntro title={r.title} description={r.description} back="/faqs" backLabel="All FAQ topics" /> : <EditorialHero locale="en" eyebrow={`Buena Park · ${category}`} title={r.title} description={r.description} image={image.src} imageAlt={image.alt} detail />}
    {r.kind !== "faq" && <div className="site-shell resource-directory-links flex flex-wrap items-center justify-between gap-4 py-6"><a href={directory} className="inline-flex min-h-11 items-center text-sm underline underline-offset-4">← {service ? "All practice areas" : "All injury types"}</a><LearningLinks /></div>}
    {r.kind === "injury" && <aside className="site-shell"><div className="flex gap-4 border-y border-foreground/15 py-6"><HeartPulse aria-hidden="true" className="mt-1 shrink-0" /><p className="max-w-3xl text-sm leading-6">Medical care comes first. This page explains general injury and claim issues; it cannot diagnose an injury. Seek urgent medical help for severe or worsening symptoms. Your clinician determines diagnosis and treatment.</p></div></aside>}
    <ReadingLayout locale="en" label={resourceLabel(r)} sections={[...sections, { id: "resource-next", label: "Your next step" }]}>
      {r.sections.map((s, i) => r.kind === "faq" ? <section id={sections[i].id} key={sections[i].id} className="faq-answer">
        <h2>{s.heading}</h2><ContentBlocks paragraphs={s.paragraphs} />
        {pageVisualAfter(r.path, i) && <TopicVisual pagePath={r.path} />}
      </section> : <div key={sections[i].id}>
        <ReadingSectionBlock id={sections[i].id} locale="en" kicker="" title={s.heading}>
          <ContentBlocks paragraphs={s.paragraphs} />
        </ReadingSectionBlock>
        {pageVisualAfter(r.path, i) && <TopicVisual pagePath={r.path} />}
        {i === 7 && <ContentPhoto subject={r.slug} />}
      </div>)}
      <ReadingSectionBlock id="resource-next" locale="en" kicker="Put the information to work" title="Know what to do next." Icon={ClipboardList}>
        <ol className="list-decimal space-y-4 pl-5 text-base leading-7"><li>Keep the incident details, correspondence, medical records and the questions you want answered.</li><li><a href={service ? "/attorney" : relatedPracticePath(r)} className="underline underline-offset-4">{service ? "Meet Howard Choi" : "Explore the relevant practice area"}</a> {service ? "and review the lawyer’s credentials." : "for the evidence and claim issues."}</li><li><a href="/contact" className="underline underline-offset-4">Request a free consultation</a> to discuss what happened with the office. No attorney fee unless there is a recovery.</li></ol>
        <div className="mt-8 space-y-3 border-t border-foreground/15 pt-6"><h3 className="text-lg font-semibold">Check the underlying rules</h3>{sources.map(s => <a key={s.href} href={s.href} target="_blank" rel="noopener noreferrer" className="block py-2 text-sm underline underline-offset-4">{s.label}</a>)}{r.slug === "dog-bites" && <a href="https://leginfo.legislature.ca.gov/faces/codes_displaySection.xhtml?lawCode=CIV&sectionNum=3342." target="_blank" rel="noopener noreferrer" className="block text-sm underline underline-offset-4">California Civil Code § 3342 · Dog bites</a>}</div>
        <ArticleAuthorBio locale="en" />
      </ReadingSectionBlock>
    </ReadingLayout>
    <RelatedLearning resource={r} />
    <ConsultationCta locale="en" />
  </main></EditorialFrame>;
}

export function RelatedLearning({ resource }: { resource: LearningResource }) {
  const practice = relatedPracticePath(resource);
  const related = [faqTopics, guideTopics, injuryTopics].flatMap(topics => topics.filter(r => r.path !== resource.path && relatedPracticePath(r) === practice).slice(0,2));
  return <section className="site-shell border-t border-foreground/15 py-12 md:py-16"><h2 className="editorial-serif mb-8 text-3xl">Keep reading, with a clear direction.</h2><div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">{related.map(r => <a key={r.path} href={r.path} className="border-b border-foreground/15 py-4"><span className="text-xs text-foreground/60">{r.kind === "faq" ? "Questions & answers" : r.kind === "guide" ? "Step-by-step guide" : "Understand the injury"}</span><h3 className="mt-2 text-lg font-medium underline underline-offset-4">{resourceLabel(r)} →</h3></a>)}</div><div className="mt-8"><LearningLinks /></div></section>;
}
