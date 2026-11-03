import heroJustice from "@/assets/law-firm/hero-justice-library.webp";
import { ConsultationCta, EditorialFrame, EditorialHero, ReadingSectionBlock } from "./shared";

const content = {
  difference: {
    title: "Our Difference",
    description: "Meet Howard Choi, a Buena Park personal injury lawyer whose accounting background informs how he reviews the financial impact of an injury.",
    sections: [
      ["Know who you’re talking to", "Howard Choi is the California lawyer behind Buena Park Injury Lawyer. The first useful conversation is about what actually happened, what you’re dealing with now, and what you need to decide next."],
      ["Make the financial impact visible", "Howard’s CPA background informs the questions he asks about an injury’s financial impact. A hospital bill is one piece of the picture. Work restrictions, missed shifts and changes in the help you need at home can tell a different part of the story."],
      ["Build from what the records show", "A report may identify the people involved without explaining what a camera captured or which policy applies. A careful review separates the facts already documented from the questions that still need an answer."],
    ],
    links: [["Meet Howard Choi", "/attorney"], ["See what to expect", "/about/what-to-expect"], ["Explore personal injury representation", "/practice-areas/personal-injury"]],
  },
  process: {
    title: "What to Expect From Your Injury Claim",
    description: "See what to bring to a first conversation with Howard Choi, what happens during an injury investigation, and how settlement decisions are made.",
    sections: [
      ["Start with what you know", "Tell us when and where it happened, how you were hurt, and who has contacted you since. Bring any report number, photos or insurer letters you already have. You can start the conversation while you’re still gathering records."],
      ["Understand the evidence and coverage", "If the firm takes your case, the next steps depend on the facts. A rideshare claim may call for trip records. A fall may turn on who maintained the property. Medical and work records help explain how the injury has affected you."],
      ["Review the options before deciding", "An offer should be considered alongside the evidence, the documented losses and any unresolved questions. Depending on the case, the next step could be more investigation, negotiation or a discussion about filing suit. You decide whether to accept a settlement."],
    ],
    links: [["Read about Howard’s approach", "/about/our-difference"], ["Find local report and evidence resources", "/locations"], ["Request a free consultation", "/contact"]],
  },
};

export function FirmApproachPage({ page }: { page: keyof typeof content }) {
  const copy = content[page];
  return (
    <EditorialFrame locale="en">
      <main>
        <EditorialHero locale="en" eyebrow="Buena Park Injury Lawyer" title={copy.title} description={copy.description} image={heroJustice} detail />
        <div className="site-shell mx-auto max-w-4xl py-12 md:py-20">
          {copy.sections.map(([title, intro], index) => (
            <ReadingSectionBlock key={title} id={`step-${index + 1}`} locale="en" kicker={`0${index + 1}`} title={title} intro={intro} />
          ))}
          <ul className="flex flex-wrap gap-5 border-t border-foreground/15 pt-6">
            {copy.links.map(([label, href]) => <li key={href}><a className="editorial-inline-link" href={href}>{label}</a></li>)}
          </ul>
        </div>
        <ConsultationCta locale="en" />
      </main>
    </EditorialFrame>
  );
}
