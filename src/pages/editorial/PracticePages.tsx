import { ArrowRight, CalendarClock, CheckCircle2, Compass, FileText, HelpCircle, Layers, MapPin, Scale, ShieldCheck, Sparkles, Umbrella } from "lucide-react";
import { useParams } from "@tanstack/react-router";
import heroJustice from "@/assets/law-firm/hero-justice-library.webp";
import heroCourthouse from "@/assets/law-firm/hero-courthouse.webp";
import ClaimJourney from "@/components/ClaimJourney";
import AttorneyNote from "@/components/AttorneyNote";
import ClientProof from "@/components/ClientProof";
import PageReviewed from "@/components/PageReviewed";
import { EvidenceVisuals, ClaimValueVisual, GuideAttorney } from "@/components/ClaimVisuals";
import { practiceMedia } from "@/data/practiceMedia";
import { getPracticeArea, practiceAreas, serviceLocations, type SiteLocale } from "@/data/injurySite";
import {
  ConsultationCta,
  EditorialFrame,
  EditorialHero,
  isKo,
  localePrefix,
  PracticeLinks,
  ReadingLayout,
  ReadingSectionBlock,
  serifStyle,
} from "./shared";

type PracticeEnhancement = {
  // First-person observation published in Howard Choi's name. Must be approved
  // by him before it changes.
  fromAttorney: string;
  // Per-practice section headings. Previously all eight pages shared one set,
  // which is what made them read as a template.
  headings: { understand: string; issues: string; value: string; insurance: string };
  damages: string[];
  deadlineNote: string;
  faqs: Array<[string, string]>;
  sources: Array<{ label: string; href: string }>;
  guides: Array<{ title: string; koTitle: string; slug: string }>;
};

const californiaCourtSources = [
  { label: "California Courts · Personal injury lawsuits", href: "https://selfhelp.courts.ca.gov/civil-lawsuit/personal-injury" },
  { label: "California Courts · Statutes of limitations", href: "https://selfhelp.courts.ca.gov/civil-lawsuit/statute-limitations" },
];

const practiceEnhancements: Record<string, PracticeEnhancement> = {
  "car-accidents": {
    fromAttorney: "The thing that costs people the most is the first phone call from the other driver's insurer. They are friendly, they ask how you are feeling, and most people say they are fine because that is what you say. That sentence gets read back months later when your neck has not improved. You are allowed to say you are still being evaluated and will follow up in writing.",
    headings: { understand: "What actually decides a car accident claim.", issues: "Where these crashes get argued.", value: "What a crash claim can cover.", insurance: "Which policy pays after a collision?" },
    damages: ["Medical treatment, including care you still need", "Lost pay, and earning capacity if the injury sticks", "Pain and the parts of daily life you lost access to", "The vehicle, when it forms part of the claim"],
    deadlineNote: "For many California personal-injury lawsuits, the general filing deadline is two years from the injury. Claims involving a public entity can require a government claim much earlier, and other exceptions may change the deadline. The safest approach is to identify the applicable deadline from the actual facts rather than waiting for the two-year mark.",
    faqs: [
      ["What if the other driver says I caused part of the crash?", "California follows comparative-fault principles. A disagreement about fault does not automatically end a claim; the evidence can affect how responsibility is allocated and how any recovery is calculated."],
      ["What if the driver who hit me had no insurance or left the scene?", "Hit-and-run and uninsured-driver cases can require a review of your own uninsured or underinsured motorist coverage, police-report information, available video, witnesses, and other ways to identify the vehicle or driver."],
      ["Should I give the insurance company a recorded statement?", "Before giving a detailed recorded statement or signing broad authorizations, understand which insurer is asking, what it wants, and how the request fits the claim. The answer can differ depending on whether it is your insurer or another party's carrier."],
    ],
    sources: californiaCourtSources,
    guides: [
      { title: "What to do after a car accident in California", koTitle: "캘리포니아 자동차 사고 후 해야 할 일", slug: "what-to-do-after-a-car-accident-in-california" },
      { title: "California comparative fault explained", koTitle: "캘리포니아 비교과실 이해하기", slug: "california-comparative-fault-personal-injury" },
      { title: "California personal injury deadlines", koTitle: "캘리포니아 개인상해 청구 기한", slug: "california-personal-injury-deadlines" },
    ],
  },
  "truck-accidents": {
    fromAttorney: "Trucking companies do not wait. They have people looking at the crash the same day, sometimes before the vehicles have been moved. Somebody calls me three weeks later and the logs and camera footage are already past their retention window. Nothing I do at that point brings them back.",
    headings: { understand: "Why a truck case is not a car case.", issues: "Who ends up responsible for a truck crash.", value: "What a commercial claim can cover.", insurance: "Layers of coverage behind a truck." },
    damages: ["Emergency and surgical care, then rehabilitation", "Long-term physical or cognitive limits", "Lost income now and earning capacity later", "Wrongful-death losses where a collision is fatal"],
    deadlineNote: "California filing deadlines still apply in commercial-truck cases, but the practical evidence clock can be much shorter. Electronic logs, onboard video, dispatch information, inspection records, and company materials may be kept on different schedules, so preservation should not wait for the litigation deadline.",
    faqs: [
      ["Is the truck driver the only person who can be responsible?", "Not always. Depending on the facts, the carrier, vehicle owner, employer, contractor, maintenance provider, shipper, or another business may become relevant to responsibility or insurance."],
      ["What is an ELD and why can it matter?", "An electronic logging device can record driving-time and hours-of-service information. In the right case, that data may help establish the driver's work and driving timeline around the collision."],
      ["Why do truck cases need early investigation?", "Commercial records, electronic data, vehicle condition, company relationships, and multiple insurance policies can make the evidence more complex than in an ordinary two-car crash."],
    ],
    sources: [
      ...californiaCourtSources,
      { label: "FMCSA · Electronic logging device fact sheet", href: "https://www.fmcsa.dot.gov/hours-service/elds/eld-fact-sheet-english-version" },
    ],
    guides: [
      { title: "Truck accident evidence: ELDs and company records", koTitle: "트럭 사고 증거: ELD와 회사 기록", slug: "truck-accident-evidence-eld-records-california" },
      { title: "California personal injury deadlines", koTitle: "캘리포니아 개인상해 청구 기한", slug: "california-personal-injury-deadlines" },
      { title: "What an injury claim should document beyond medical bills", koTitle: "치료비 외에 기록해야 할 상해 손실", slug: "what-an-injury-claim-should-document-beyond-medical-bills" },
    ],
  },
  "motorcycle-accidents": {
    fromAttorney: "Adjusters open these files assuming the rider was going too fast. Sometimes they are right. More often it is an assumption nobody has bothered to test, and a rider spends months arguing against it. Lane position, sight lines, where the vehicles came to rest. That is usually the whole fight.",
    headings: { understand: "What a rider is really up against.", issues: "The arguments riders always face.", value: "What a rider's claim can cover.", insurance: "Coverage when a rider is hit." },
    damages: ["Orthopedic and surgical care, then rehab", "Scarring and permanent mobility loss", "Future treatment", "Lost income and reduced ability to ride or work"],
    deadlineNote: "For many California injury lawsuits, the general deadline is two years from the injury, but shorter rules can apply in some matters. Motorcycle cases also benefit from early preservation of intersection video, road conditions, vehicle damage, witness information, and riding gear before those details are lost.",
    faqs: [
      ["Does serious injury prove the other driver was at fault?", "No. Injury severity and liability are separate questions. The collision still needs to be reconstructed through roadway evidence, vehicle positions, turning or lane movements, witnesses, video, and other available facts."],
      ["What if the driver says they never saw the motorcycle?", "Visibility disputes are common, but a driver's statement is only one part of the record. Lane position, sight lines, lighting, traffic controls, damage patterns, witnesses, and video may help explain what should have been visible."],
      ["Can my own motorcycle insurance matter?", "It can. Depending on the policy and facts, uninsured or underinsured motorist coverage may become important when the at-fault driver has insufficient insurance or cannot be identified."],
    ],
    sources: californiaCourtSources,
    guides: [
      { title: "California comparative fault explained", koTitle: "캘리포니아 비교과실 이해하기", slug: "california-comparative-fault-personal-injury" },
      { title: "How much is a California personal injury case worth?", koTitle: "캘리포니아 개인상해 사건 가치는 어떻게 정해지나요?", slug: "how-much-is-my-personal-injury-case-worth-california" },
      { title: "California personal injury deadlines", koTitle: "캘리포니아 개인상해 청구 기한", slug: "california-personal-injury-deadlines" },
    ],
  },
  "pedestrian-accidents": {
    fromAttorney: "These cases are usually won or lost on where exactly the impact happened, and that is the detail nobody writes down properly at the scene. A few feet decides whether you were in the crosswalk. I would rather have one good photograph of the pavement than three witnesses describing it from memory a month later.",
    headings: { understand: "What matters when a car hits a person.", issues: "Where pedestrian claims get disputed.", value: "What a pedestrian claim can cover.", insurance: "Who pays when a driver hits you." },
    damages: ["Emergency and long-term medical treatment", "Rehabilitation, mobility support, and future care", "Lost wages and reduced future earning ability", "Pain, loss of independence, and long-term daily limitations"],
    deadlineNote: "The general California deadline for many personal-injury lawsuits is two years, but some claims have shorter requirements. Pedestrian cases can also depend on evidence that disappears quickly, especially nearby surveillance, signal or intersection information, and witness memories.",
    faqs: [
      ["Does being in a crosswalk automatically decide fault?", "Not by itself. Crosswalk status can be important, but the full analysis can include traffic controls, turning movements, speed, visibility, timing, witness accounts, and what each person was doing immediately before impact."],
      ["What if the driver left the scene?", "A hit-and-run does not eliminate the need to preserve evidence. Police information, nearby cameras, witnesses, vehicle fragments, and uninsured-motorist coverage can all become important."],
      ["Why can pedestrian claims be medically complex?", "Pedestrians have little protection from impact. The claim may need to account for hospitalization, surgery, rehabilitation, future care, mobility limitations, work loss, and long-term changes in independence."],
    ],
    sources: californiaCourtSources,
    guides: [
      { title: "California comparative fault explained", koTitle: "캘리포니아 비교과실 이해하기", slug: "california-comparative-fault-personal-injury" },
      { title: "California personal injury deadlines", koTitle: "캘리포니아 개인상해 청구 기한", slug: "california-personal-injury-deadlines" },
      { title: "What an injury claim should document beyond medical bills", koTitle: "치료비 외에 기록해야 할 상해 손실", slug: "what-an-injury-claim-should-document-beyond-medical-bills" },
    ],
  },
  "rideshare-accidents": {
    fromAttorney: "Screenshot your trip before you do anything else. I know that sounds like a strange first instruction after a crash. But people spend weeks getting bounced between the driver's insurer and the rideshare company's, and it usually comes down to what the app said at the moment of impact, which nobody thought to capture.",
    headings: { understand: "The question only rideshare cases have.", issues: "Where Uber and Lyft claims stall.", value: "What a rideshare claim can cover.", insurance: "App status decides the coverage." },
    damages: ["Medical treatment and future care", "Lost wages and diminished earning capacity", "Pain, limitations, and disruption to everyday life", "Other accident-related economic losses supported by the record"],
    deadlineNote: "California injury deadlines still apply, but a rideshare case has another time-sensitive issue: preserving the trip and app-status record. Screenshots, receipts, driver information, and the status of the ride at the time of impact can help identify which insurance layer needs to be evaluated.",
    faqs: [
      ["Why does the driver's app status matter?", "California's transportation-network-company insurance requirements change depending on whether the driver is waiting for a request, has accepted a trip, or is transporting a passenger. The exact facts determine which coverage should be reviewed."],
      ["What if I was a passenger in the Uber or Lyft?", "Passenger claims still require evidence of the crash and injury, but the rideshare trip record can make the insurance analysis different from an ordinary private-vehicle collision."],
      ["What if another driver caused the rideshare crash?", "A third-party driver may be primarily responsible while rideshare-related coverage may still need to be examined. The correct analysis depends on the driver status, available policies, and the facts of the collision."],
    ],
    sources: [
      ...californiaCourtSources,
      { label: "California Public Utilities Commission · TNC insurance requirements", href: "https://www.cpuc.ca.gov/regulatory-services/licensing/transportation-licensing-and-analysis-branch/transportation-network-companies/tnc-insurance-requirements" },
    ],
    guides: [
      { title: "Uber and Lyft accident insurance in California", koTitle: "캘리포니아 우버·리프트 사고 보험", slug: "uber-lyft-accident-insurance-california" },
      { title: "California comparative fault explained", koTitle: "캘리포니아 비교과실 이해하기", slug: "california-comparative-fault-personal-injury" },
      { title: "How much is a California personal injury case worth?", koTitle: "캘리포니아 개인상해 사건 가치는 어떻게 정해지나요?", slug: "how-much-is-my-personal-injury-case-worth-california" },
    ],
  },
  "slip-and-fall": {
    fromAttorney: "The hazard will be gone within the hour. The incident report will describe it however suits the store, which is not usually malice, it is just how these get written. So the photo you take on your phone before anyone cleans up often ends up carrying the case.",
    headings: { understand: "Why a fall claim is not about falling.", issues: "What property owners dispute.", value: "What a premises claim can cover.", insurance: "Who controlled the place you fell?" },
    damages: ["Medical treatment and rehabilitation", "Lost income and work limitations", "Future care or permanent mobility restrictions", "Pain, activity limitations, and other supported non-economic harm"],
    deadlineNote: "Many California personal-injury lawsuits have a two-year general deadline, but premises claims can involve much faster evidence loss. A spill can be cleaned, a defect repaired, surveillance overwritten, and inspection records changed long before a filing deadline arrives.",
    faqs: [
      ["Is a property owner automatically responsible because I fell?", "No. A premises claim usually requires closer attention to the dangerous condition, who controlled the area, notice of the condition, reasonable inspection or maintenance practices, and the injured person's own conduct."],
      ["Why is surveillance video important?", "Video may show the condition, how long it existed, prior foot traffic, warnings, cleanup activity, or the fall itself. Many systems overwrite footage, which is why identifying potential video early can matter."],
      ["What if the business fixed the condition right after the fall?", "That makes contemporaneous photographs, incident reports, witnesses, video, and preservation requests especially useful because the scene may no longer look the way it did when the incident happened."],
    ],
    sources: californiaCourtSources,
    guides: [
      { title: "California comparative fault explained", koTitle: "캘리포니아 비교과실 이해하기", slug: "california-comparative-fault-personal-injury" },
      { title: "What an injury claim should document beyond medical bills", koTitle: "치료비 외에 기록해야 할 상해 손실", slug: "what-an-injury-claim-should-document-beyond-medical-bills" },
      { title: "California personal injury deadlines", koTitle: "캘리포니아 개인상해 청구 기한", slug: "california-personal-injury-deadlines" },
    ],
  },
  "wrongful-death": {
    fromAttorney: "Families apologize to me for asking about money. Every time. You do not have to. There are deadlines running whether anyone brings it up or not, and there are decisions about who in the family can legally bring the claim at all. Someone has to ask those questions early.",
    headings: { understand: "What a family is facing first.", issues: "What has to be established.", value: "What a wrongful death claim can cover.", insurance: "Finding the coverage behind a death." },
    damages: ["Loss of financial support and household contributions", "Funeral and burial-related losses where recoverable", "Loss of companionship, care, and guidance", "Other losses available under California wrongful-death law based on the relationship and facts"],
    deadlineNote: "Wrongful-death deadlines depend on the underlying facts, defendants, and applicable law. California's civil statutes identify who may bring a wrongful-death action, while separate timing rules can apply to the lawsuit or an earlier government claim. The deadline should be checked from the specific date and parties involved.",
    faqs: [
      ["Who can bring a wrongful-death claim in California?", "California law identifies categories of people who may have standing to bring a wrongful-death action. The analysis depends on the family relationship and circumstances, so eligibility should be checked before assuming who can file."],
      ["Is wrongful death the same as a survival action?", "No. They address different legal losses. A wrongful-death claim generally focuses on losses suffered by eligible family members, while a survival claim can involve claims that belonged to the person who died."],
      ["What evidence matters in a fatal-accident case?", "Responsibility evidence remains central, along with insurance, medical and death records, financial-support information, household contributions, family relationships, and other evidence needed to explain the loss."],
    ],
    sources: [
      ...californiaCourtSources,
      { label: "California Code of Civil Procedure § 377.60", href: "https://leginfo.legislature.ca.gov/faces/codes_displaySection.xhtml?lawCode=CCP&sectionNum=377.60." },
    ],
    guides: [
      { title: "California personal injury deadlines", koTitle: "캘리포니아 개인상해 청구 기한", slug: "california-personal-injury-deadlines" },
      { title: "What an injury claim should document beyond medical bills", koTitle: "치료비 외에 기록해야 할 상해 손실", slug: "what-an-injury-claim-should-document-beyond-medical-bills" },
    ],
  },
  "serious-injuries": {
    fromAttorney: "The mistake is settling while you are still getting better. It feels responsible. It feels like closing something. But the number has to cover the surgery you might need in six years, and nobody can price that while you are still mid-recovery.",
    headings: { understand: "Why these claims need a longer view.", issues: "What a long-term injury raises.", value: "What a serious injury claim can cover.", insurance: "When one policy is not enough." },
    damages: ["Past and future medical treatment", "Rehabilitation, assistive care, and long-term support", "Lost income and reduced future earning capacity", "Permanent impairment, pain, loss of independence, and changes to daily life"],
    deadlineNote: "Serious-injury cases can last longer medically, but the legal and evidence deadlines do not wait for recovery to finish. California limitation periods, public-entity claim rules, insurance notice requirements, and evidence preservation should be evaluated while the long-term medical picture is still developing.",
    faqs: [
      ["How can a claim account for medical care that has not happened yet?", "Future care can be evaluated through the medical record, treating-provider opinions, rehabilitation needs, functional limitations, and other evidence showing what care is reasonably expected after the current treatment phase."],
      ["What if I cannot return to the same work?", "A serious injury can affect more than wages already missed. The record may need to address work restrictions, reduced capacity, retraining, career changes, and future earning loss when those issues are supported by evidence."],
      ["Why does daily-life evidence matter in a catastrophic injury case?", "Medical records describe diagnoses and treatment, but they may not fully show changes in mobility, independence, family responsibilities, sleep, recreation, or ordinary activities. Specific, credible examples help explain the human impact."],
    ],
    sources: [
      ...californiaCourtSources,
      { label: "Judicial Council of California · Civil jury instructions", href: "https://courts.ca.gov/partners/california-jury-instructions/civil-jury-instructions-resource-center/civil-jury-instructions" },
    ],
    guides: [
      { title: "How much is a California personal injury case worth?", koTitle: "캘리포니아 개인상해 사건 가치는 어떻게 정해지나요?", slug: "how-much-is-my-personal-injury-case-worth-california" },
      { title: "What an injury claim should document beyond medical bills", koTitle: "치료비 외에 기록해야 할 상해 손실", slug: "what-an-injury-claim-should-document-beyond-medical-bills" },
      { title: "California personal injury deadlines", koTitle: "캘리포니아 개인상해 청구 기한", slug: "california-personal-injury-deadlines" },
    ],
  },
};

export const PracticeAreasPage = ({ locale }: { locale: SiteLocale }) => (
  <EditorialFrame locale={locale}>
    <main>
      <EditorialHero
        locale={locale}
        eyebrow={isKo(locale) ? "개인상해 업무 분야" : "Personal injury practice areas"}
        title={isKo(locale) ? "사고 유형보다 중요한 것은 사건이 실제로 어떻게 영향을 미쳤는지입니다." : "Personal injury help for the accident, the evidence, and what comes next."}
        description={isKo(locale)
          ? "자동차 사고부터 중대 상해까지, 각 사건 분야에서 어떤 사실과 증거가 중요한지 명확하게 설명합니다."
          : "Explore the accident and injury matters the firm handles, including the evidence to preserve, insurance questions to ask, losses to document, and practical next steps after an injury."}
        image={heroJustice}
      />
      <ReadingLayout
        locale={locale}
        label={isKo(locale) ? "개인상해 · 업무 분야" : "Personal injury · Practice areas"}
        sections={isKo(locale)
          ? [{ id: "overview", label: "전체 분야" }, { id: "process", label: "사건 진행" }, { id: "evidence", label: "증거와 기록" }]
          : [{ id: "overview", label: "All practice areas" }, { id: "process", label: "How a claim develops" }, { id: "evidence", label: "Evidence & records" }]}
      >
        <ReadingSectionBlock
          id="overview"
          locale={locale}
          kicker={isKo(locale) ? "01 · 분야" : "01 · Areas"}
          title={isKo(locale) ? "필요한 정보를 사건 유형별로 찾으세요." : "Start with the kind of accident or injury you are dealing with."}
          intro={isKo(locale) ? "각 페이지는 일반적인 사건 구조를 설명하기 위한 것이며 실제 사건의 사실관계에 따라 접근은 달라집니다." : "Each guide explains the issues that are specific to that type of claim. The legal theory may be similar, but the evidence, insurance, responsible parties, and medical consequences can be very different."}
        >
          <PracticeLinks locale={locale} />
        </ReadingSectionBlock>

        <ReadingSectionBlock
          id="process"
          locale={locale}
          kicker={isKo(locale) ? "02 · 진행" : "02 · Process"}
          title={isKo(locale) ? "좋은 사건 준비는 순서가 있습니다." : "A strong injury claim is built in the right order."}
          intro={isKo(locale) ? "초기에는 치료와 증거 보존이 중요하고, 이후에는 보험과 손실을 정리하며 책임과 손해를 설명할 수 있는 기록을 만들어갑니다." : "The early priorities are usually medical care and preserving evidence. From there, the work becomes a clearer record of responsibility, insurance coverage, treatment, financial loss, future needs, and the way the injury changed daily life."}
        >
          <div className="grid gap-0 border-y border-[#1E1C1A]/12 md:grid-cols-3">
            {[FileText, ShieldCheck, CheckCircle2].map((Icon, index) => (
              <div key={index} className="border-b border-[#1E1C1A]/12 py-6 md:border-b-0 md:border-l md:px-6 md:first:border-l-0 md:first:pl-0">
                <Icon className="h-4 w-4 stroke-[1.3] text-[#381907]" />
                <h3 style={serifStyle(locale)} className="mt-9 text-[1.35rem]">
                  {isKo(locale) ? ["기록 확보", "보험 확인", "손실 정리"][index] : ["Preserve the record", "Understand coverage", "Document the loss"][index]}
                </h3>
                <p className="mt-3 text-[11px] leading-5 text-[#1E1C1A]/48">
                  {isKo(locale)
                    ? ["사진, 영상, 진료기록과 목격자 등 초기 증거를 확보합니다.", "적용 가능한 보험과 책임 당사자를 확인합니다.", "치료비뿐 아니라 업무와 일상생활에 미친 영향을 정리합니다."][index]
                    : ["Secure scene evidence, reports, records, witnesses, video, and other information before it disappears.", "Identify the people, businesses, vehicles, policies, and coverage questions that may matter.", "Track treatment, medical costs, missed work, future needs, and the practical effect on everyday life."][index]}
                </p>
              </div>
            ))}
          </div>
        </ReadingSectionBlock>

        <ReadingSectionBlock
          id="evidence"
          locale={locale}
          kicker={isKo(locale) ? "03 · 증거" : "03 · Evidence"}
          title={isKo(locale) ? "사건은 기억보다 기록으로 설명하는 것이 좋습니다." : "The best time to preserve evidence is before anyone needs it."}
          intro={isKo(locale) ? "사고 현장 자료, 차량 정보, 진료 기록, 보험 서신과 업무 손실 자료를 일관된 흐름으로 정리하면 사건을 설명하기 쉬워집니다." : "Photos, reports, witnesses, video, medical records, insurance communications, wage information, and a simple timeline are easier to use when they are collected early and kept together."}
        />
      </ReadingLayout>
      <ConsultationCta locale={locale} />
    </main>
  </EditorialFrame>
);

export const PracticeAreaDetailPage = ({ locale }: { locale: SiteLocale }) => {
  const params = useParams({ strict: false }) as { slug?: string };
  const practice = params.slug ? getPracticeArea(params.slug) : undefined;
  if (!practice) return null;

  const title = isKo(locale) ? practice.koTitle : practice.title;
  const heroTitle = isKo(locale) ? `${practice.koTitle} · Buena Park` : `Buena Park ${practice.title} Lawyers`;
  const description = isKo(locale) ? practice.koDescription : practice.description;
  const intro = isKo(locale) ? practice.koIntro : practice.intro;
  const issues = isKo(locale) ? practice.koIssues : practice.issues;
  const enhancement = practiceEnhancements[practice.slug];

  return (
    <EditorialFrame locale={locale}>
      <main className="detail-guide">
        <EditorialHero
          locale={locale}
          eyebrow={isKo(locale) ? "개인상해 · 업무 분야" : "Personal injury · Practice area"}
          title={heroTitle}
          description={description}
          image={practiceMedia[practice.slug]?.src ?? heroCourthouse}
        />
        <ClaimJourney locale={locale} subject={title} guideId="understand" contextImage={practiceMedia[practice.slug]?.src} />
        <GuideAttorney locale={locale} />
        <ReadingLayout
          locale={locale}
          label={`${title} · ${isKo(locale) ? "안내" : "Guide"}`}
          sections={isKo(locale)
            ? [
                { id: "understand", label: "사건 이해" }, { id: "issues", label: "주요 쟁점" }, { id: "evidence", label: "증거" },
                { id: "value", label: "손해와 가치" }, { id: "insurance", label: "보험" }, { id: "deadlines", label: "기한" },
                { id: "faq", label: "자주 묻는 질문" }, { id: "resources", label: "자료" }, { id: "related", label: "다른 업무 분야" }, { id: "areas", label: "지역" },
              ]
            : [
                { id: "understand", label: "Understanding the claim" }, { id: "issues", label: "Key issues" }, { id: "evidence", label: "Evidence to preserve" },
                { id: "value", label: "Damages & case value" }, { id: "insurance", label: "Insurance & responsibility" }, { id: "deadlines", label: "California deadlines" },
                { id: "faq", label: "Common questions" }, { id: "resources", label: "Guides & sources" }, { id: "related", label: "Related practice areas" }, { id: "areas", label: "Where we handle these" },
              ]}
        >
          <ReadingSectionBlock id="understand" locale={locale} Icon={Compass} kicker={isKo(locale) ? "01 · 이해" : "01 · Understand"} title={isKo(locale) ? `${title} 사건에서 먼저 확인할 것` : enhancement.headings.understand} intro={intro}>
            <div className="editorial-callout">
              <span className="editorial-callout__label">{isKo(locale) ? "핵심" : "Key point"}</span>
              <p>{isKo(locale) ? "책임, 보험, 치료와 일상생활의 영향을 함께 살펴보세요." : "Look beyond the accident: responsibility, insurance, treatment, and the impact on your everyday life all matter."}</p>
            </div>
            <AttorneyNote note={enhancement.fromAttorney} locale={locale} />
          </ReadingSectionBlock>

          <ReadingSectionBlock id="issues" locale={locale} Icon={Layers} kicker={isKo(locale) ? "02 · 주요 쟁점" : "02 · Key issues"} title={isKo(locale) ? "이 유형의 사건에서 자주 확인하는 항목" : enhancement.headings.issues}>
            <div className="editorial-issue-list">
              {issues.map((issue, index) => <div key={issue} className="editorial-issue-row"><span>{String(index + 1).padStart(2, "0")}</span><strong>{issue}</strong></div>)}
            </div>
          </ReadingSectionBlock>

          <ReadingSectionBlock id="evidence" locale={locale} Icon={FileText} kicker={isKo(locale) ? "03 · 증거" : "03 · Evidence"} title={isKo(locale) ? "초기 기록이 사건을 설명하는 데 도움이 됩니다." : practice.evidenceTitle} intro={isKo(locale) ? "사진, 영상, 목격자, 보고서, 진료기록과 보험 관련 자료를 가능한 한 일찍 보관해 두는 것이 좋습니다." : practice.evidenceIntro}>
            <EvidenceVisuals locale={locale} />
            <div className="editorial-issue-list">
              {practice.evidenceItems.map((item, index) => <div key={item} className="editorial-issue-row"><span>{String(index + 1).padStart(2, "0")}</span><strong>{item}</strong></div>)}
            </div>
          </ReadingSectionBlock>

          <ReadingSectionBlock id="value" locale={locale} Icon={Scale} kicker={isKo(locale) ? "04 · 손해" : "04 · Damages & value"} title={isKo(locale) ? "사건 가치는 하나의 공식으로 계산되지 않습니다." : enhancement.headings.value} intro={isKo(locale) ? "치료, 향후 치료 필요, 임금 손실, 장기적인 기능 제한, 과실, 보험과 증거의 질이 함께 영향을 줄 수 있습니다." : practice.valueIntro}>
            <ClaimValueVisual locale={locale} />
            <div className="editorial-issue-list">
              {(isKo(locale)
                ? ["현재와 향후 치료비", "임금 손실과 향후 소득 영향", "통증·기능 제한·일상생활 변화", "사건 유형에 따라 적용되는 기타 경제적 손실"]
                : enhancement.damages
              ).map((item, index) => <div key={item} className="editorial-issue-row"><span>{String(index + 1).padStart(2, "0")}</span><strong>{item}</strong></div>)}
            </div>
            <a href={`${localePrefix(locale)}/case-value-calculator`} className="editorial-inline-link mt-6"><span>{isKo(locale) ? "캘리포니아 사건 가치 계산기 보기" : "Use the California case-value calculator"}</span><ArrowRight className="h-4 w-4" /></a>
          </ReadingSectionBlock>

          <ReadingSectionBlock id="insurance" locale={locale} Icon={Umbrella} kicker={isKo(locale) ? "05 · 보험" : "05 · Insurance"} title={isKo(locale) ? "누가 책임이 있고 어떤 보험이 적용되는지 확인합니다." : enhancement.headings.insurance} intro={isKo(locale) ? "사고 유형에 따라 운전자, 차량 소유자, 사업체, 고용주 또는 여러 보험이 함께 관련될 수 있습니다." : practice.insuranceIntro} />

          <ReadingSectionBlock id="deadlines" locale={locale} Icon={CalendarClock} kicker={isKo(locale) ? "06 · 기한" : "06 · California deadlines"} title={isKo(locale) ? "법적 기한과 증거 보존 기한은 같은 것이 아닙니다." : "How long do you have?"} intro={isKo(locale) ? "캘리포니아의 많은 개인상해 소송에는 일반적인 제소 기한이 있지만 공공기관 관련 청구 등은 더 짧은 절차가 적용될 수 있습니다. 또한 영상, 전자기록, 목격자 기억은 훨씬 빨리 사라질 수 있습니다." : enhancement.deadlineNote}>
            <a href={`${localePrefix(locale)}/blogs/california-personal-injury-deadlines`} className="editorial-inline-link"><span>{isKo(locale) ? "캘리포니아 개인상해 기한 가이드" : "Read the California injury-deadlines guide"}</span><ArrowRight className="h-4 w-4" /></a>
          </ReadingSectionBlock>

          <ReadingSectionBlock id="faq" locale={locale} Icon={HelpCircle} kicker={isKo(locale) ? "07 · 질문" : "07 · Common questions"} title={isKo(locale) ? "사고 직후 자주 생기는 질문" : "Your questions, answered."}>
            <div className="border-t border-[#1E1C1A]/12">
              {(isKo(locale)
                ? [
                    ["변호사와 언제 상담하는 것이 좋나요?", "중요한 영상, 기록, 보험 정보가 사라지기 전에 사건을 정리하면 도움이 될 수 있습니다. 모든 서류를 갖춘 뒤까지 기다릴 필요는 없습니다."],
                    ["보험사가 먼저 연락하면 어떻게 해야 하나요?", "누가 어떤 목적으로 연락했는지 확인하고, 상세한 진술이나 광범위한 서류에 서명하기 전에 요청 내용을 이해하는 것이 중요합니다."],
                    ["제가 일부 잘못한 경우에도 청구할 수 있나요?", "캘리포니아에서는 비교과실 문제가 적용될 수 있습니다. 일부 과실 주장이 있다는 이유만으로 사건이 자동으로 끝나는 것은 아닙니다."],
                  ]
                : enhancement.faqs
              ).map(([question, answer]) => (
                <details key={question} className="border-b border-[#1E1C1A]/12">
                  <summary>{question}</summary><p className="max-w-[720px] pb-6 text-base leading-7 text-[#57514b]">{answer}</p>
                </details>
              ))}
            </div>
          </ReadingSectionBlock>

          <ReadingSectionBlock id="resources" locale={locale} Icon={ShieldCheck} kicker={isKo(locale) ? "08 · 자료" : "08 · Guides & sources"} title={isKo(locale) ? "관련 가이드와 공식 자료" : "Helpful guides and official resources."} intro={isKo(locale) ? "사건 유형과 관련된 내부 가이드와 캘리포니아·연방 공식 자료를 함께 확인할 수 있습니다." : "Explore a topic in more detail. These guides provide general information, not advice about your specific case."}>
            <div className="grid gap-8 md:grid-cols-2">
              <div>
                <div className="mb-3 text-[9px] font-semibold uppercase tracking-[0.16em] text-[#1E1C1A]/35">{isKo(locale) ? "관련 가이드" : "Related guides"}</div>
                <div className="border-t border-[#1E1C1A]/12">
                  {enhancement.guides.map((guide) => <a key={guide.slug} href={`${localePrefix(locale)}/blogs/${guide.slug}`} className="group flex items-center justify-between gap-4 border-b border-[#1E1C1A]/12 py-4 text-[12px]"><span>{isKo(locale) ? guide.koTitle : guide.title}</span><ArrowRight className="h-3.5 w-3.5 shrink-0 transition-transform group-hover:translate-x-1" /></a>)}
                </div>
              </div>
              <div>
                <div className="mb-3 text-[9px] font-semibold uppercase tracking-[0.16em] text-[#1E1C1A]/35">{isKo(locale) ? "공식 자료" : "Primary sources"}</div>
                <div className="border-t border-[#1E1C1A]/12">
                  {enhancement.sources.map((source) => <a key={source.href} href={source.href} target="_blank" rel="noreferrer" className="group flex items-center justify-between gap-4 border-b border-[#1E1C1A]/12 py-4 text-[12px]"><span>{source.label}</span><ArrowRight className="h-3.5 w-3.5 shrink-0 transition-transform group-hover:translate-x-1" /></a>)}
                </div>
              </div>
            </div>
          </ReadingSectionBlock>

          <ReadingSectionBlock id="related" locale={locale} Icon={Sparkles} kicker={isKo(locale) ? "09 · 더 보기" : "09 · Explore"} title={isKo(locale) ? "다른 개인상해 업무 분야" : "Related personal injury practice areas."}>
            <div className="editorial-link-grid">
              {practiceAreas.filter((item) => item.slug !== practice.slug).slice(0, 4).map((item) => (
                <a key={item.slug} href={`${localePrefix(locale)}/practice-areas/${item.slug}`} className="editorial-link-card">
                  <div className="editorial-link-card__top"><span>→</span><ArrowRight className="h-3.5 w-3.5" /></div>
                  <h3 style={serifStyle(locale)}>{isKo(locale) ? item.koTitle : item.title}</h3>
                  <p>{isKo(locale) ? item.koDescription : item.description}</p>
                </a>
              ))}
            </div>
          </ReadingSectionBlock>
          <ReadingSectionBlock
            id="areas"
            locale={locale}
            Icon={MapPin}
            kicker={isKo(locale) ? "10 · 지역" : "10 · Where we handle these"}
            title={isKo(locale) ? `${title} 사건 지원 지역` : `${title} claims across North Orange County.`}
            intro={isKo(locale)
              ? "부에나파크 사무실을 중심으로 인근 오렌지카운티와 로스앤젤레스카운티 지역의 사건을 지원합니다."
              : `The office is in Buena Park, and ${title.toLowerCase()} claims come in from the cities around it. Each page below has that city's own collision data, its police department, and the courthouse a filed case would go to.`}
          >
            <div className="grid border-t border-[#1E1C1A]/12 sm:grid-cols-2">
              {serviceLocations.map((location) => (
                <a
                  key={location.slug}
                  href={`${localePrefix(locale)}/locations/${location.slug}`}
                  className="group flex items-center justify-between gap-4 border-b border-[#1E1C1A]/12 py-4 sm:even:border-l sm:even:pl-6"
                >
                  <span className="text-[13px]">{isKo(locale) ? location.koName : location.name}</span>
                  <span className="shrink-0 text-[11px] text-[#1E1C1A]/38">{location.county}</span>
                </a>
              ))}
            </div>
            <a href={`${localePrefix(locale)}/locations`} className="editorial-inline-link mt-7"><span>{isKo(locale) ? "전체 지역 보기" : "See all service areas"}</span><ArrowRight className="h-4 w-4" /></a>
          </ReadingSectionBlock>
        </ReadingLayout>
        <div className="site-shell pb-12"><PageReviewed locale={locale} /></div>
        <ClientProof locale={locale} />
        <ConsultationCta locale={locale} />
      </main>
    </EditorialFrame>
  );
};
