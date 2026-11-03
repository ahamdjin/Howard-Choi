import { ArrowUpRight } from "lucide-react";
import { brand, practiceAreas } from "@/data/injurySite";
import { practiceSearchNames } from "@/data/practiceSeo";
import legalIllustration from "@/assets/law-firm/hero-justice-library.webp";
import PersonalInjuryGuide from "@/components/PersonalInjuryGuide";
import { EditorialFrame, EditorialHero, ConsultationCta } from "./shared";

const topics = [
  {
    id: "representation",
    title: "A claim needs a clear explanation, backed by records.",
    paragraphs: [
      "After an accident, the immediate questions are practical. Who should receive the insurance letter? Which photographs matter? How do you explain time away from work? Personal injury representation brings those separate questions into one case assessment. The starting point is your account of the incident, the available records and what remains uncertain.",
      "Howard Choi is a personal injury lawyer based in Buena Park. A consultation is an opportunity to explain what happened, discuss the documents you have and ask how a proposed representation would work. You can start that conversation before every report, bill or treatment record is available. Bring what you have and identify what is missing.",
      "The work varies with the incident. A commercial collision may raise questions about a driver's work and company records. A fall may require a closer look at a particular property condition. A serious injury may need a longer view of treatment and daily limitations. Those differences are the reason for the focused service guides below.",
    ],
  },
  {
    id: "evidence",
    title: "Turn an accident account into an organized evidence file.",
    paragraphs: [
      "Start with a simple chronology. Record the location, date, people involved and the sequence you remember. Mark which details you personally observed and which came from someone else. Keep original photographs, messages and documents together so the source of each item remains clear.",
      "An incident report and an insurance decision answer different questions. Keep the report number, the investigating agency's name, policy or claim references and any written explanation from an insurer. Your lawyer can review those materials together rather than relying on a single summary or a recollection of a telephone call.",
      "Explain what you do not know. A witness may have left a name without a number. A nearby business may have a camera, but you may not know what it recorded. A vehicle may have been used for work, but the employment relationship may be unclear. Specific gaps are more useful to identify than assumptions presented as established facts.",
    ],
  },
  {
    id: "losses",
    title: "Show the effect of the injury over time.",
    paragraphs: [
      "A diagnosis, a medical bill and a description of daily limitations each tell a different part of the story. Organize treatment dates and expenses, records of missed work and examples of activities the injury has affected. Keep the account factual and specific to your experience.",
      "If recovery is continuing, say so. Separate expenses already incurred from questions about future care or work restrictions that still need supporting information. A case assessment depends on the evidence available, the circumstances of the incident and the coverage and responsibility questions involved.",
      "Our case-value guide explains the categories of information that may affect an evaluation. It is a preparation resource for a discussion with your lawyer. An online estimate cannot account for every disputed fact, insurance term or individual recovery history.",
    ],
  },
  {
    id: "fees",
    title: "Know who will handle the matter and what the agreement covers.",
    paragraphs: [
      "Ask who will be responsible for your claim, who will provide updates and how questions should be raised between scheduled conversations. A practical communication plan helps you understand which documents to send and how new developments will be discussed.",
      "Discuss lawyer fees and case expenses separately. The California State Bar explains that a contingency agreement should address the lawyer's percentage, how costs are treated and the services covered. Ask for an explanation of the written terms, including what happens to expenses if the matter does not produce a recovery.",
      "The office offers a free consultation. Before representation begins, use that conversation to understand the proposed scope, the information needed and the terms of any written agreement. You should be able to explain the arrangement in your own words before deciding how to proceed.",
    ],
  },
];

export default function PersonalInjuryPage() {
  return (
    <EditorialFrame locale="en">
      <main className="detail-guide">
        <EditorialHero
          locale="en"
          eyebrow="Practice area · Howard Choi"
          title="Buena Park Personal Injury Lawyer"
          description="Discuss your accident, insurance questions and injury losses with Howard Choi. Personal injury representation from our Buena Park office, with a free consultation to understand your next steps."
          image={legalIllustration}
          imageAlt="Illustrative Lady Justice statue in a law library"
          detail
        />
        <nav aria-label="Personal injury page sections" className="site-shell flex flex-wrap gap-x-6 gap-y-3 py-7 text-sm">
          {topics.map((topic) => <a key={topic.id} href={`#${topic.id}`} className="underline underline-offset-4">{{ representation: "Your lawyer", evidence: "Evidence", losses: "Injury losses", fees: "Fees and communication" }[topic.id]}</a>)}
          <a href="#injury-services" className="underline underline-offset-4">Injury services</a>
          <a href="/contact" className="underline underline-offset-4">Free consultation</a>
        </nav>
        <div className="site-shell grid gap-12 py-12 lg:grid-cols-[minmax(0,1fr)_280px] lg:gap-20">
          <div>
            {topics.map((topic, index) => (
              <section key={topic.id} id={topic.id} className="mb-14 scroll-mt-28 border-t border-foreground/15 pt-7">
                <p className="text-xs tracking-widest text-[#755D46]">0{index + 1}</p>
                <h2 className="editorial-serif mt-4 max-w-3xl text-3xl leading-tight md:text-4xl">{topic.title}</h2>
                {topic.paragraphs.map((paragraph) => <p key={paragraph} className="mt-5 max-w-3xl text-base leading-8 text-foreground/75">{paragraph}</p>)}
              </section>
            ))}
          </div>
          <aside className="self-start rounded-sm border border-foreground/15 bg-white/60 p-7 lg:sticky lg:top-28">
            <h2 className="editorial-serif text-2xl">Speak with Howard Choi</h2>
            <p className="mt-4 text-sm leading-7">{brand.address}</p>
            <a href={brand.phoneHref} className="mt-5 block py-2 text-lg underline underline-offset-4">{brand.phoneDisplay}</a>
            <a href="/contact" className="mt-4 inline-block rounded-full bg-[#211c17] px-5 py-3 text-sm text-white">Request a free consultation</a>
            <a href="/attorney" className="mt-6 block py-2 text-sm underline underline-offset-4">Howard Choi’s background and credentials</a>
            <a href="/locations/buena-park" className="mt-3 block py-2 text-sm underline underline-offset-4">Buena Park office and local resources</a>
          </aside>
        </div>
        <PersonalInjuryGuide locale="en" />
        <section id="injury-services" className="site-shell scroll-mt-28 py-16 md:py-24">
          <h2 className="editorial-serif text-4xl">Find the service that matches what happened.</h2>
          <p className="mt-5 max-w-3xl text-base leading-8 text-foreground/70">Each guide goes deeper into the records, insurance questions and practical issues associated with that type of claim. More than one guide may be relevant to your situation.</p>
          <div className="mt-9 grid gap-4 sm:grid-cols-2">
            {practiceAreas.map((practice) => (
              <a key={practice.slug} href={`/practice-areas/${practice.slug}`} className="flex items-center justify-between gap-4 border border-foreground/15 p-6 text-lg hover:bg-white">
                {practiceSearchNames[practice.slug]} Lawyer<ArrowUpRight aria-hidden="true" className="h-5 w-5 shrink-0" />
              </a>
            ))}
          </div>
          <h3 className="mt-10 text-xl font-medium">Go deeper into your questions</h3>
          <ul className="mt-5 space-y-4 text-base underline underline-offset-4">
            <li><a href="/blogs/what-to-do-after-a-car-accident-in-california">Organizing records after a California car accident</a></li>
            <li><a href="/blogs/how-much-is-my-personal-injury-case-worth-california">What information affects a personal injury case evaluation?</a></li>
            <li><a href="/blogs/california-personal-injury-deadlines">Questions about California injury-claim deadlines</a></li>
          </ul>
          <h3 className="mt-10 text-xl font-medium">Check the original sources</h3>
          <ul className="mt-5 space-y-4 text-sm underline underline-offset-4">
            <li><a href="https://apps.calbar.ca.gov/attorney/Licensee/Detail/284364" target="_blank" rel="noreferrer">California State Bar · Howard Jong-yol Choi, No. 284364</a></li>
            <li><a href="https://www.calbar.ca.gov/public/legal-resources/working-attorney/what-expect-regarding-fees-and-billing" target="_blank" rel="noreferrer">California State Bar · lawyer fees and case expenses</a></li>
          </ul>
        </section>
        <ConsultationCta locale="en" />
      </main>
    </EditorialFrame>
  );
}
