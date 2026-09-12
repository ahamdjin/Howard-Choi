import { ArrowRight, FileText, MapPin, Phone, Scale, ShieldCheck, Stethoscope, Users } from "lucide-react";
import { useParams } from "@tanstack/react-router";
import Footer from "@/components/Footer";
import KoreanFooter from "@/components/KoreanFooter";
import {
  AboutFirmPage as RefinedAboutFirmPage,
  AttorneyPage as RefinedAttorneyPage,
  PracticeAreaDetailPage as RefinedPracticeAreaDetailPage,
  PracticeAreasPage as RefinedPracticeAreasPage,
  ResultsPage as RefinedResultsPage,
} from "@/pages/RefinedInnerPages";
import { brand, getPracticeArea, practiceAreas, type SiteLocale } from "@/data/injurySite";

const isKo = (locale: SiteLocale) => locale === "ko";
const prefix = (locale: SiteLocale) => (isKo(locale) ? "/ko" : "");
const serif = (locale: SiteLocale) => (isKo(locale) ? { fontFamily: '\"Noto Serif KR\", serif' } : undefined);

const shellStyles = `
.rich-inner-base > div > footer { display: none !important; }
.rich-inner-base > div > main > section:last-child { display: none !important; }
`;

const Label = ({ children }: { children: React.ReactNode }) => (
  <span className="text-[9px] font-semibold uppercase tracking-[0.17em] text-[#1E1C1A]/40">{children}</span>
);

const Card = ({ children, className = "" }: { children: React.ReactNode; className?: string }) => (
  <div className={`rounded-[5px] border border-[#1E1C1A]/10 bg-white/76 ${className}`}>{children}</div>
);

const SectionTitle = ({ locale, label, title, body }: { locale: SiteLocale; label: string; title: string; body?: string }) => (
  <div className="max-w-[920px]">
    <Label>{label}</Label>
    <h2 style={serif(locale)} className={`${isKo(locale) ? "mt-4 text-[clamp(1.9rem,3.4vw,3.6rem)] font-medium leading-[1.26] tracking-[-0.04em]" : "editorial-serif mt-4 text-[clamp(2.35rem,4vw,4.55rem)] leading-[0.98] tracking-[-0.035em]"}`}>{title}</h2>
    {body && <p className="mt-5 max-w-[760px] text-[13px] leading-7 text-[#1E1C1A]/56">{body}</p>}
  </div>
);

const FaqBlock = ({ locale, items }: { locale: SiteLocale; items: { q: string; a: string }[] }) => (
  <div className="mt-10 grid gap-3">
    {items.map((item, index) => (
      <details key={item.q} className="group rounded-[5px] border border-[#1E1C1A]/10 bg-white/76 px-5 py-5 open:bg-white md:px-6">
        <summary className="flex cursor-pointer list-none items-start justify-between gap-6 text-[13px] font-semibold leading-6">
          <span className="flex gap-4"><span className="mt-[2px] text-[9px] font-normal text-[#1E1C1A]/28">0{index + 1}</span><span>{item.q}</span></span>
          <span className="text-[#381907] transition-transform group-open:rotate-45">+</span>
        </summary>
        <p className="ml-8 mt-4 max-w-[820px] text-[12px] leading-7 text-[#1E1C1A]/56">{item.a}</p>
      </details>
    ))}
  </div>
);

const FinalCta = ({ locale }: { locale: SiteLocale }) => (
  <section className="bg-[#211A16] text-[#F3EEE5]">
    <div className="site-shell grid gap-8 py-14 md:py-18 lg:grid-cols-[1.15fr_0.85fr] lg:items-end lg:py-20">
      <div>
        <span className="text-[9px] font-semibold uppercase tracking-[0.17em] text-white/48">{isKo(locale) ? "상담" : "Start here"}</span>
        <h2 style={serif(locale)} className={`${isKo(locale) ? "mt-5 text-[clamp(2.2rem,4.5vw,4.6rem)] font-medium leading-[1.22]" : "editorial-serif mt-5 max-w-[780px] text-[clamp(2.8rem,5.5vw,6rem)] leading-[0.92] tracking-[-0.04em]"}`}>
          {isKo(locale) ? "사실을 정리하는 것부터 시작할 수 있습니다." : "A clearer case starts with a clearer first conversation."}
        </h2>
      </div>
      <div className="rounded-[5px] bg-[#F3EEE5] p-6 text-[#1E1C1A] md:p-7">
        <p className="text-[12px] leading-6 text-[#1E1C1A]/56">{isKo(locale) ? "사고 경위, 치료 현황, 보험 연락과 가장 걱정되는 부분을 알려주세요." : "Share what happened, the treatment so far, any insurance communication, and the part of the situation that feels least clear."}</p>
        <div className="mt-6 flex flex-wrap gap-3">
          <a href={`${prefix(locale)}/contact`} className="inline-flex items-center gap-3 rounded-full bg-[#381907] px-5 py-3 text-[11px] font-semibold text-[#F3EEE5]">{isKo(locale) ? "상담 예약" : "Schedule a consultation"}<ArrowRight className="h-3.5 w-3.5" /></a>
          <a href={brand.phoneHref} className="inline-flex items-center gap-2 rounded-full border border-[#1E1C1A]/14 px-5 py-3 text-[11px] font-medium"><Phone className="h-3.5 w-3.5" />{brand.phoneDisplay}</a>
        </div>
      </div>
    </div>
  </section>
);

const RichPage = ({ locale, base, children }: { locale: SiteLocale; base: React.ReactNode; children: React.ReactNode }) => (
  <div className="min-h-screen bg-[#F9F8F6] text-[#1E1C1A]">
    <style>{shellStyles}</style>
    <div className="rich-inner-base">{base}</div>
    {children}
    <FinalCta locale={locale} />
    {isKo(locale) ? <KoreanFooter /> : <Footer />}
  </div>
);

const attorneyFaqs = (locale: SiteLocale) => isKo(locale) ? [
  { q: "Howard Choi 변호사는 어떤 사건을 다루나요?", a: "이 웹사이트는 자동차, 트럭, 오토바이, 보행자, 승차공유 사고, 미끄러짐·넘어짐, 부당 사망 및 중대 상해를 포함한 사고·개인상해 사건에 초점을 두고 있습니다." },
  { q: "상담 전에 무엇을 준비하면 좋나요?", a: "사고 날짜와 장소, 사진이나 영상, 보험 정보, 의료기관과 치료 일정, 경찰 또는 사고 보고서, 상대방과의 연락 기록이 있다면 정리해 두는 것이 도움이 됩니다." },
  { q: "사건 초기에 무엇이 가장 중요하나요?", a: "건강과 치료를 우선하고, 시간이 지나면 사라질 수 있는 증거를 보존하며, 보험사와의 중요한 연락을 기록하는 것이 일반적으로 도움이 됩니다." },
  { q: "사무실은 어디에 있나요?", a: `사무실 주소는 ${brand.address}입니다. 이 사이트는 Buena Park와 인근 지역의 사고·상해 사건을 중심으로 안내합니다.` },
] : [
  { q: "What kinds of matters does Howard Choi handle?", a: "This site is focused on accident and personal-injury matters, including car, truck, motorcycle, pedestrian and rideshare collisions, slip-and-fall claims, wrongful death, and serious injuries." },
  { q: "What should I bring to an initial consultation?", a: "Useful starting materials can include the accident date and location, photographs or video, insurance information, medical-provider and treatment details, reports, and any important communication with insurers or other parties." },
  { q: "What tends to matter most early in an injury claim?", a: "Health and appropriate treatment come first. It can also be important to preserve evidence that may disappear, keep records organized, and avoid losing track of insurance communications or deadlines." },
  { q: "Where is the office located?", a: `The office is at ${brand.address}. The website is centered on Buena Park and nearby communities in Orange and Los Angeles counties.` },
];

const aboutFaqs = (locale: SiteLocale) => isKo(locale) ? [
  { q: "이 로펌은 어떤 분야에 집중하나요?", a: "Buena Park Injury Lawyer는 사고 및 개인상해 사건에 초점을 둡니다. 각 업무 분야 페이지에서 구체적인 사고 유형과 일반적인 증거·보험 이슈를 확인할 수 있습니다." },
  { q: "Buena Park 외 지역도 다루나요?", a: "현재 사이트는 Buena Park, Fullerton, Anaheim, Cerritos, La Mirada와 La Habra를 서비스 지역으로 안내합니다. 실제 사무실 주소는 Buena Park에 있습니다." },
  { q: "웹사이트 정보만으로 사건을 판단할 수 있나요?", a: "아닙니다. 웹사이트는 일반적인 정보만 제공하며 법률 자문이 아닙니다. 실제 사건은 구체적인 사실, 보험, 증거와 적용 법률에 따라 달라질 수 있습니다." },
] : [
  { q: "What does the firm focus on?", a: "Buena Park Injury Lawyer is positioned around accident and personal-injury matters. The practice-area pages explain the different types of claims and the evidence, treatment, insurance, and loss issues that can shape them." },
  { q: "Does the firm only serve Buena Park?", a: "The website currently identifies Buena Park, Fullerton, Anaheim, Cerritos, La Mirada, and La Habra as service areas. The physical office listed on the site is in Buena Park." },
  { q: "Can a website tell me whether I have a case?", a: "No. Website information is general and is not legal advice. A real evaluation depends on the facts, available evidence, insurance, injuries, and applicable law." },
];

const practiceIndexFaqs = (locale: SiteLocale) => isKo(locale) ? [
  { q: "어떤 업무 분야를 선택해야 할지 모르겠어요.", a: "사고가 여러 범주에 걸칠 수 있습니다. 예를 들어 승차공유 사고는 자동차 충돌이면서 동시에 별도의 보험 적용 문제가 있을 수 있습니다. 가장 가까운 페이지에서 시작해도 됩니다." },
  { q: "개인상해 사건에서 공통적으로 보는 요소는 무엇인가요?", a: "사고 경위와 책임, 의료 기록, 증거 보존, 보험 적용 범위, 업무 손실과 일상생활에 미친 영향이 자주 중요한 요소가 됩니다." },
  { q: "사고 직후 변호사에게 연락해야 하나요?", a: "모든 사건이 같은 것은 아니지만, 증거가 사라지거나 보험 문제가 복잡해질 수 있는 사건에서는 조기에 법률 조언을 구하는 것이 도움이 될 수 있습니다." },
] : [
  { q: "What if I am not sure which practice area fits my accident?", a: "Many accidents overlap categories. A rideshare crash, for example, is still a motor-vehicle collision but can involve additional insurance questions. Start with the page that is closest to what happened; the facts matter more than the label." },
  { q: "What issues appear across most personal-injury claims?", a: "Liability, evidence preservation, medical documentation, insurance coverage, lost income, and the effect of the injury on daily life commonly need to be organized and evaluated." },
  { q: "Does every injury claim need a lawyer immediately?", a: "No two matters are identical. Early legal advice can be especially useful when fault is disputed, injuries are significant, several insurers or parties may be involved, or important evidence could disappear." },
];

type Depth = {
  overview: string[];
  topics: { title: string; body: string }[];
  faqs: { q: string; a: string }[];
};

const practiceDepth: Record<string, Depth> = {
  "car-accidents": {
    overview: [
      "A car-accident claim is more than a repair estimate. The legal picture can include how the collision happened, what each driver could see, statements made at the scene, photographs, vehicle damage, police or incident reports, medical treatment, and the insurance policies that may apply.",
      "The strongest record usually develops over time. Early evidence explains the collision; medical records explain the injury; work and day-to-day documentation help show how the injury changed life after the crash. Keeping those pieces consistent is often more useful than collecting a large amount of disconnected paperwork.",
    ],
    topics: [
      { title: "Collision evidence", body: "Scene photographs, vehicle damage, witness information, reports, available video, and the location of the impact can help reconstruct what happened." },
      { title: "Medical course", body: "Treatment dates, diagnoses, imaging, referrals, restrictions, and the progression of symptoms help show how the injury developed after the crash." },
      { title: "Insurance coverage", body: "The other driver's coverage, your own policy, uninsured or underinsured motorist coverage, and questions about fault can all affect how a claim is handled." },
      { title: "Real-world losses", body: "Medical expenses are only one part of the picture. Missed work, transportation problems, household limitations, and the effect on normal activities may also matter." },
    ],
    faqs: [
      { q: "What should I document after a car accident?", a: "When it is safe to do so, preserve photographs, driver and insurance information, witness details, reports, towing information, medical records, and a simple timeline of important events and communications." },
      { q: "What if the other driver disputes fault?", a: "A fault dispute makes independent evidence more important. Photos, video, witnesses, physical damage, roadway details, and consistent statements can all become part of the evaluation." },
      { q: "What if the other driver has little or no insurance?", a: "Other coverage may sometimes be relevant, including uninsured or underinsured motorist coverage. The policies and facts should be reviewed before assuming there is no available recovery source." },
      { q: "Should I give a recorded statement right away?", a: "Insurance companies may request statements early. Before giving a detailed statement in a disputed or serious claim, it can be useful to understand who is asking, why, and how the information may be used." },
    ],
  },
  "truck-accidents": {
    overview: [
      "Commercial-vehicle collisions can involve more layers than an ordinary two-car crash. The driver, vehicle owner, employer, contractor, maintenance provider, cargo interests, and different insurers may all become relevant depending on the facts.",
      "That makes early preservation especially important. Vehicle information, company records, electronic data, inspection and maintenance material, delivery or route records, photographs, witness accounts, and medical evidence can help clarify both responsibility and the seriousness of the harm.",
    ],
    topics: [
      { title: "Multiple responsible parties", body: "The driver may not be the only person or company whose conduct needs to be evaluated." },
      { title: "Commercial records", body: "Ownership, employment, maintenance, inspection, dispatch, route, or electronic vehicle information may become important evidence." },
      { title: "Serious injuries", body: "The size and force involved in commercial-vehicle crashes can make long-term medical documentation and future needs especially important." },
      { title: "Layered insurance", body: "Commercial policies, employer coverage, excess coverage, and other policies may create a more complicated insurance picture." },
    ],
    faqs: [
      { q: "Why are truck-accident claims often more complex?", a: "They can involve several companies, commercial records, multiple insurance layers, and questions about ownership, employment, maintenance, or vehicle operation that do not arise in every passenger-car case." },
      { q: "What evidence should be preserved?", a: "In addition to ordinary crash evidence, commercial records and vehicle data may matter. The exact material depends on the type of truck, company relationships, and circumstances of the collision." },
      { q: "Can the trucking company be involved even if its driver caused the crash?", a: "Potential responsibility depends on the facts and legal relationships. Employment, ownership, maintenance, company policies, and other conduct may need to be examined." },
      { q: "What if several insurers contact me?", a: "Keep a record of each company, representative, claim number, and request. Multiple contacts can be a sign that several policies or parties are being evaluated." },
    ],
  },
  "motorcycle-accidents": {
    overview: [
      "Motorcycle claims often require a careful explanation of visibility, lane position, turning movements, speed, roadway conditions, and the sequence leading to impact. Because a rider has less physical protection, the injury picture may be serious even when property damage does not tell the full story.",
      "Medical documentation is therefore central. Orthopedic injuries, road rash, head or neck symptoms, fractures, surgery, rehabilitation, work restrictions, and long-term limitations should be recorded accurately rather than reduced to a single bill or diagnosis.",
    ],
    topics: [
      { title: "Visibility and movement", body: "Turning vehicles, lane changes, blind spots, roadway position, and what each person could see often need careful reconstruction." },
      { title: "Protective gear and damage", body: "Helmet condition, motorcycle damage, clothing, photographs, and the scene can help explain the mechanics and force of the collision." },
      { title: "Medical impact", body: "Fractures, orthopedic trauma, head or spinal symptoms, rehabilitation, and functional limitations may require detailed long-term records." },
      { title: "Bias and assumptions", body: "A claim should be built around evidence rather than assumptions about riders, speed, or responsibility." },
    ],
    faqs: [
      { q: "What evidence matters after a motorcycle crash?", a: "Scene photos, the motorcycle and helmet, vehicle damage, witnesses, video, roadway details, reports, medical records, and information about the other driver can all be useful." },
      { q: "What if the driver says they never saw the motorcycle?", a: "Visibility is often an important issue. The roadway, lighting, traffic controls, vehicle positions, video, witnesses, and physical evidence may help evaluate what each person could reasonably see." },
      { q: "Why can motorcycle injury claims take time to understand?", a: "Some injuries require surgery, rehabilitation, or a longer period before doctors and the injured person can understand the likely recovery and remaining limitations." },
      { q: "Does property damage show how serious the injury is?", a: "Not necessarily. The human body and a motorcycle do not respond to impact in the same way. Medical evidence and functional limitations are more useful for understanding the injury itself." },
    ],
  },
  "pedestrian-accidents": {
    overview: [
      "Pedestrian collisions often turn on precise location and timing: where the pedestrian was, where the vehicle was coming from, traffic controls, lighting, visibility, turning movements, and whether cameras or witnesses captured the event.",
      "Because pedestrians have little protection, injuries can be significant. The claim should connect the collision evidence to treatment, mobility restrictions, work loss, assistance needed at home, and the longer-term effect on daily life.",
    ],
    topics: [
      { title: "Crosswalk and intersection evidence", body: "Signals, markings, turning lanes, photographs, witness accounts, and available camera footage can be important." },
      { title: "Driver visibility", body: "Lighting, obstructions, vehicle position, speed, and the driver's movement may help explain what happened." },
      { title: "Serious medical harm", body: "Head, orthopedic, spinal, and multi-system injuries may require extended treatment and careful documentation." },
      { title: "Daily-life impact", body: "Mobility, work, transportation, caregiving, and ordinary routines can be disrupted even after hospital care ends." },
    ],
    faqs: [
      { q: "What should be preserved after a pedestrian collision?", a: "Photographs of the location, traffic controls, clothing and injuries, witness details, video sources, reports, and medical records can all be useful if they can be obtained safely." },
      { q: "What if the collision happened outside a marked crosswalk?", a: "The location is one fact, not the entire analysis. Visibility, driver conduct, roadway conditions, timing, and applicable traffic rules may all need review." },
      { q: "Why is camera footage important?", a: "Video from nearby businesses, homes, vehicles, or public systems can disappear quickly. Identifying possible sources early can therefore be important." },
      { q: "What if the injuries affect walking or independence?", a: "Keep records of treatment, mobility aids, restrictions, assistance needed at home, missed work, and activities that changed during recovery." },
    ],
  },
  "rideshare-accidents": {
    overview: [
      "Rideshare crashes combine ordinary collision questions with an additional issue: what the app-based driver was doing at the time. Whether the driver was offline, available, traveling to pick up a rider, or carrying a passenger can affect which insurance policies may be relevant.",
      "Trip records, app information, driver and vehicle details, the rideshare company's claim information, ordinary crash evidence, and the injured person's medical records can all matter. A passenger, another driver, cyclist, or pedestrian may face a different coverage path even when the collision is the same.",
    ],
    topics: [
      { title: "Driver app status", body: "The driver's status in the app can be an important coverage fact and should be identified accurately." },
      { title: "Multiple policies", body: "Personal auto insurance, rideshare coverage, and other policies may need to be sorted out before the claim path is clear." },
      { title: "Trip evidence", body: "Ride receipts, screenshots, app messages, pickup and drop-off information, and driver details can help preserve the timeline." },
      { title: "Passenger claims", body: "Passengers may have fewer fault questions about their own conduct but can still face complicated insurance and injury issues." },
    ],
    faqs: [
      { q: "Why does the driver's app status matter?", a: "Rideshare insurance can depend on whether the driver was offline, available for requests, traveling to a pickup, or transporting a passenger." },
      { q: "What should a rideshare passenger save?", a: "Keep the trip receipt, screenshots, driver and vehicle information, messages, photographs, reports, and medical records. Do not assume the app will preserve everything indefinitely." },
      { q: "Can more than one insurance policy apply?", a: "Potentially. The answer depends on the driver's status, the vehicles and parties involved, and the terms of the relevant policies." },
      { q: "What if I was in another car hit by a rideshare driver?", a: "The collision is still evaluated like a motor-vehicle claim, but the rideshare driver's app status and available rideshare coverage may become additional issues." },
    ],
  },
  "slip-and-fall": {
    overview: [
      "A premises-liability claim is rarely established by the fall alone. The condition that caused the fall, how long it existed, whether the owner or occupier knew or should have known about it, inspections, warnings, lighting, maintenance, photographs, and video can all matter.",
      "Because the condition may be cleaned, repaired, moved, or changed quickly, early documentation can be especially valuable. Medical records should also explain the injury and recovery without exaggeration, particularly where the fall causes fractures, head injuries, back problems, or reduced mobility.",
    ],
    topics: [
      { title: "The dangerous condition", body: "Photographs, measurements, lighting, weather, spills, debris, flooring, stairs, or other physical conditions may need documentation." },
      { title: "Notice and maintenance", body: "Inspection practices, prior complaints, cleaning schedules, repairs, warnings, and how long a condition existed can become important." },
      { title: "Video and witnesses", body: "Store, building, parking-lot, or nearby camera footage and witness information can disappear if not identified early." },
      { title: "Injury documentation", body: "Falls can cause fractures, soft-tissue injuries, head symptoms, or mobility problems that need consistent medical and functional records." },
    ],
    faqs: [
      { q: "What should I photograph after a fall?", a: "If it can be done safely, photograph the exact condition, the wider area, lighting, warning signs or lack of warnings, footwear, visible injuries, and anything that may later be cleaned or repaired." },
      { q: "Does a fall automatically mean the property owner is responsible?", a: "No. Responsibility depends on the condition, notice, control of the property, reasonableness of maintenance or warnings, and the specific facts." },
      { q: "Should I report the incident to the business or property owner?", a: "An incident report can create a contemporaneous record. Keep a copy or note the name of the person who took the report if possible." },
      { q: "Why does timing matter in a premises case?", a: "Physical conditions, cleaning logs, video, witnesses, and staffing information can change or disappear, so important evidence may be easier to identify soon after the incident." },
    ],
  },
  "wrongful-death": {
    overview: [
      "A fatal accident creates legal questions at the same time a family is dealing with grief. The investigation may involve how the event happened, who may be responsible, available insurance, medical and official records, and the losses experienced by surviving family members.",
      "These matters should be handled with care. The goal is not to turn a person's life into a number; it is to build an accurate record of responsibility and the practical and human consequences of the loss while respecting the family's circumstances.",
    ],
    topics: [
      { title: "Liability investigation", body: "Reports, photographs, witnesses, video, vehicle or property evidence, and other records may be needed to understand how the fatal event occurred." },
      { title: "Family relationship", body: "Who may bring a claim and what losses may be recoverable depend on the legal relationships and facts of the family." },
      { title: "Financial impact", body: "Income, household support, services, funeral-related expenses, and other economic effects may be part of the documentation." },
      { title: "Human loss", body: "The law may also recognize non-economic dimensions of loss, but every case is fact-specific and should be evaluated carefully." },
    ],
    faqs: [
      { q: "Who can bring a wrongful-death claim?", a: "Eligibility is controlled by law and family relationships. Because the answer can be specific, it is important to evaluate the family structure and facts rather than rely on a general website summary." },
      { q: "What evidence is important after a fatal accident?", a: "The underlying liability evidence remains important, along with official records, insurance information, medical material, and documentation showing the relationship and losses experienced by the family." },
      { q: "How is a wrongful-death claim different from an injury claim?", a: "The person who was harmed is no longer able to bring an ordinary personal-injury claim, so different legal claims, parties, and categories of loss may be involved." },
      { q: "Should a family wait before asking legal questions?", a: "There is no need to make every decision immediately, but evidence and legal deadlines can still matter. A consultation can help the family understand what needs attention now and what can wait." },
    ],
  },
  "serious-injuries": {
    overview: [
      "A serious-injury claim needs to look beyond the first emergency-room visit. Brain, spinal, orthopedic, surgical, neurological, or other major injuries can affect work, mobility, independence, family responsibilities, and future medical needs for months or years.",
      "The record should therefore develop with the recovery. Imaging, specialists, surgery, rehabilitation, restrictions, assistive devices, future-care recommendations, employment effects, and changes in normal activities can all help explain the injury more accurately than a single diagnosis or bill.",
    ],
    topics: [
      { title: "Long-term treatment", body: "Specialists, surgery, rehabilitation, therapy, medication, and future-care recommendations may need to be tracked over time." },
      { title: "Functional limitations", body: "Work, mobility, sleep, driving, lifting, exercise, household tasks, and independence can all be affected." },
      { title: "Future needs", body: "Some injuries create ongoing medical, support, equipment, transportation, or vocational needs that are not obvious early in the claim." },
      { title: "Complete documentation", body: "Medical evidence should connect with employment, family, and daily-life evidence so the injury is understood as a whole." },
    ],
    faqs: [
      { q: "What makes an injury claim 'serious'?", a: "There is no single label that controls every case. Injuries requiring surgery, prolonged treatment, significant restrictions, neurological care, permanent impairment, or major life changes generally require deeper documentation." },
      { q: "Why is it risky to value a serious injury too early?", a: "The likely recovery, future treatment, work capacity, and long-term limitations may not be clear in the first weeks or months." },
      { q: "What records matter beyond medical bills?", a: "Treatment records, imaging, restrictions, employment records, calendars, receipts, photographs, assistance needed at home, and specific examples of changed activities can all help explain the real impact." },
      { q: "What if several doctors are involved?", a: "Keep a simple treatment timeline with providers, dates, diagnoses, referrals, procedures, restrictions, and future recommendations. Organization can make a complex medical course much easier to understand." },
    ],
  },
};

const genericKoDepth = (title: string): Depth => ({
  overview: [
    `${title} 사건은 사고 사실 하나만으로 판단되지 않습니다. 사고 경위와 책임, 치료 과정, 증거, 보험 적용 범위, 업무와 일상생활에 미친 영향을 함께 정리해야 전체 상황이 보입니다.`,
    "초기에는 건강과 증거 보존이 중요하고, 시간이 지나면서 의료 기록과 생활 변화가 사건의 실제 영향을 보여주게 됩니다. 많은 서류를 모으는 것보다 중요한 정보가 서로 일관되게 연결되는 것이 더 중요합니다.",
  ],
  topics: [
    { title: "사고와 책임", body: "사진, 영상, 보고서, 목격자와 물리적 증거를 통해 무슨 일이 있었는지 정리합니다." },
    { title: "치료 기록", body: "진단, 검사, 치료, 제한사항과 회복 과정을 시간 순서대로 이해하는 것이 중요합니다." },
    { title: "보험과 당사자", body: "어떤 보험이 적용될 수 있는지, 책임 당사자가 누구인지 사건별로 확인해야 합니다." },
    { title: "실제 생활의 변화", body: "업무, 이동, 가족 역할, 수면과 일상 활동의 변화도 부상의 영향을 설명하는 데 도움이 될 수 있습니다." },
  ],
  faqs: [
    { q: `${title} 사건에서 먼저 무엇을 보존해야 하나요?`, a: "가능한 경우 사진·영상, 사고 보고서, 목격자 정보, 보험 자료, 치료 기록과 중요한 연락 내역을 정리해 두는 것이 도움이 됩니다." },
    { q: "보험사와 바로 자세히 이야기해야 하나요?", a: "보험사는 사고 직후 정보를 요청할 수 있습니다. 책임이나 부상 정도가 다투어질 수 있다면 중요한 진술이나 결정 전에 요청 목적과 사용 방식을 이해하는 것이 좋습니다." },
    { q: "치료가 끝나기 전에 사건 가치를 알 수 있나요?", a: "일부 사건은 초기부터 비교적 명확하지만, 중대한 부상이나 장기 치료가 필요한 경우 회복 경과와 향후 필요가 보이기 전에는 전체 영향을 판단하기 어려울 수 있습니다." },
    { q: "이 페이지의 정보가 법률 자문인가요?", a: "아닙니다. 일반적인 정보이며 실제 사건은 구체적인 사실, 증거, 보험과 적용 법률에 따라 달라집니다." },
  ],
});

export const AttorneyPage = ({ locale }: { locale: SiteLocale }) => (
  <RichPage locale={locale} base={<RefinedAttorneyPage locale={locale} />}>
    <section className="bg-[#F9F8F6] py-18 md:py-24">
      <div className="site-shell">
        <SectionTitle locale={locale} label={isKo(locale) ? "사건을 다루는 방식" : "How the work is handled"} title={isKo(locale) ? "좋은 프로필은 이름보다 사건을 어떻게 다루는지 보여줍니다." : "A useful attorney profile should explain the work, not just the name."} body={isKo(locale) ? "아직 확인되지 않은 학력이나 수상 내역을 채우는 대신, 현재 확인된 업무 초점과 의뢰인이 사건을 진행할 때 어떤 정보를 정리하게 되는지 명확하게 보여줍니다." : "Until the firm supplies verified education, admissions, awards, memberships, and representative matters, the page can still be genuinely useful by explaining the confirmed practice focus and how an injury matter is organized."} />
        <div className="mt-10 grid gap-4 md:grid-cols-2 xl:grid-cols-4">
          {[
            [Users, isKo(locale) ? "첫 대화" : "First conversation", isKo(locale) ? "사고 경위, 치료 현황, 보험 연락과 가장 걱정되는 부분부터 정리합니다." : "Start with what happened, the treatment so far, insurance communication, and the issue causing the most uncertainty."],
            [FileText, isKo(locale) ? "증거" : "Evidence", isKo(locale) ? "사진, 영상, 보고서, 목격자와 기록을 하나의 시간 흐름으로 봅니다." : "Photographs, video, reports, witnesses, records, and timelines are organized around the facts that actually matter."],
            [Stethoscope, isKo(locale) ? "치료" : "Medical course", isKo(locale) ? "진단만이 아니라 치료 과정, 제한사항과 회복 경과를 함께 봅니다." : "The medical story includes treatment, restrictions, progression, and the way recovery changes over time — not just a diagnosis code."],
            [Scale, isKo(locale) ? "책임과 보험" : "Liability & coverage", isKo(locale) ? "책임 다툼, 보험 범위와 여러 당사자 문제가 있는지 확인합니다." : "Fault, available coverage, policy issues, and the possibility of multiple responsible parties are separated and evaluated clearly."],
          ].map(([Icon, title, body]) => {
            const I = Icon as typeof Users;
            return <Card key={String(title)} className="p-6"><I className="h-4 w-4 stroke-[1.3] text-[#381907]" /><h3 style={serif(locale)} className="mt-8 text-[1.45rem] leading-tight">{String(title)}</h3><p className="mt-3 text-[11px] leading-6 text-[#1E1C1A]/50">{String(body)}</p></Card>;
          })}
        </div>
      </div>
    </section>

    <section className="bg-[#F3EEE5] py-18 md:py-24">
      <div className="site-shell grid gap-8 lg:grid-cols-[0.78fr_1.22fr]">
        <div>
          <SectionTitle locale={locale} label={isKo(locale) ? "의뢰인이 알아야 할 것" : "What clients should understand"} title={isKo(locale) ? "사건은 서류가 아니라 하나의 일관된 이야기로 만들어집니다." : "A claim becomes stronger when the facts tell one consistent story."} />
        </div>
        <div className="grid gap-4 sm:grid-cols-2">
          {[
            isKo(locale) ? "사고 당시의 증거와 나중에 생긴 의료 기록은 서로 다른 시점의 정보를 설명합니다." : "Crash evidence explains the event; medical evidence explains what happened to the person afterward.",
            isKo(locale) ? "보험 연락 기록을 남기면 누가 무엇을 요청했는지 나중에도 확인하기 쉽습니다." : "A simple insurance log helps preserve who contacted you, what they requested, and what was provided.",
            isKo(locale) ? "업무와 일상생활의 변화는 치료비만으로 보이지 않는 부상의 영향을 보여줄 수 있습니다." : "Work and daily-life changes can show consequences that a medical bill alone does not capture.",
            isKo(locale) ? "중요한 결정은 사건의 전체 상황을 이해한 뒤 하는 것이 좋습니다." : "Important decisions make more sense after the evidence, treatment, liability, and coverage picture is understood together.",
          ].map((body, index) => <Card key={body} className="p-6"><div className="text-[9px] text-[#1E1C1A]/28">0{index + 1}</div><p className="mt-5 text-[12px] leading-7 text-[#1E1C1A]/60">{body}</p></Card>)}
        </div>
      </div>
    </section>

    <section className="bg-[#F9F8F6] py-18 md:py-24">
      <div className="site-shell">
        <SectionTitle locale={locale} label={isKo(locale) ? "자주 묻는 질문" : "Attorney profile FAQs"} title={isKo(locale) ? "상담 전에 자주 생기는 기본 질문." : "The practical questions people ask before they ever call."} />
        <FaqBlock locale={locale} items={attorneyFaqs(locale)} />
      </div>
    </section>
  </RichPage>
);

export const AboutFirmPage = ({ locale }: { locale: SiteLocale }) => (
  <RichPage locale={locale} base={<RefinedAboutFirmPage locale={locale} />}>
    <section className="bg-[#F9F8F6] py-18 md:py-24">
      <div className="site-shell">
        <SectionTitle locale={locale} label={isKo(locale) ? "실제 업무" : "What the firm actually organizes"} title={isKo(locale) ? "상해 사건의 복잡함을 네 가지 흐름으로 나눕니다." : "An injury matter becomes easier to understand when it is separated into four clear tracks."} />
        <div className="mt-10 grid gap-4 md:grid-cols-2 xl:grid-cols-4">
          {[
            [Stethoscope, isKo(locale) ? "치료" : "Treatment", isKo(locale) ? "의료기관, 진단, 검사, 치료와 회복 과정을 시간 순서로 정리합니다." : "Providers, diagnoses, imaging, treatment, restrictions, and recovery are organized into a usable medical timeline."],
            [FileText, isKo(locale) ? "증거" : "Evidence", isKo(locale) ? "사진, 영상, 보고서와 목격자 등 사라질 수 있는 정보를 보존합니다." : "Photos, video, reports, witnesses, records, and other time-sensitive evidence are identified before they disappear."],
            [ShieldCheck, isKo(locale) ? "보험" : "Insurance", isKo(locale) ? "관련 보험, 책임 당사자와 연락 기록을 분리해 이해합니다." : "Potential policies, responsible parties, claim numbers, and communications are separated so the coverage picture is easier to follow."],
            [Users, isKo(locale) ? "생활 영향" : "Human impact", isKo(locale) ? "업무, 이동, 가족 역할과 일상 활동의 변화를 구체적으로 기록합니다." : "Work, mobility, family responsibilities, transportation, and ordinary activities help explain the injury beyond the bills."],
          ].map(([Icon, title, body]) => {
            const I = Icon as typeof Users;
            return <Card key={String(title)} className="p-6"><I className="h-4 w-4 stroke-[1.3] text-[#381907]" /><h3 style={serif(locale)} className="mt-8 text-[1.45rem] leading-tight">{String(title)}</h3><p className="mt-3 text-[11px] leading-6 text-[#1E1C1A]/50">{String(body)}</p></Card>;
          })}
        </div>
      </div>
    </section>

    <section className="bg-[#F3EEE5] py-18 md:py-24">
      <div className="site-shell">
        <SectionTitle locale={locale} label={isKo(locale) ? "과정" : "A clearer process"} title={isKo(locale) ? "무엇이 지금 중요하고, 무엇은 나중에 봐도 되는지 구분합니다." : "Separate what needs attention now from what can wait."} />
        <div className="mt-10 grid gap-4 md:grid-cols-2 xl:grid-cols-4">
          {[
            ["01", isKo(locale) ? "현재 상황 파악" : "Understand the present", isKo(locale) ? "사고, 치료, 보험과 현재 가장 큰 문제를 확인합니다." : "Identify what happened, current treatment, insurance activity, and the most immediate concern."],
            ["02", isKo(locale) ? "빠르게 사라지는 것 보존" : "Preserve what can disappear", isKo(locale) ? "영상, 목격자, 현장 상태와 중요한 기록을 놓치지 않게 합니다." : "Video, witnesses, scene conditions, records, and other time-sensitive information get priority."],
            ["03", isKo(locale) ? "사건의 흐름 만들기" : "Build the timeline", isKo(locale) ? "치료, 업무, 보험과 일상생활의 변화를 시간 순서로 연결합니다." : "Treatment, work, insurance, and day-to-day impact are connected into a coherent timeline."],
            ["04", isKo(locale) ? "다음 결정" : "Make the next decision", isKo(locale) ? "전체 기록을 이해한 뒤 다음 행동을 판단합니다." : "The next step is easier to assess once the evidence and recovery picture are understood together."],
          ].map(([n, title, body]) => <Card key={String(n)} className="p-6"><div className="text-[9px] text-[#1E1C1A]/28">{n}</div><h3 style={serif(locale)} className="mt-7 text-[1.4rem] leading-tight">{title}</h3><p className="mt-3 text-[11px] leading-6 text-[#1E1C1A]/50">{body}</p></Card>)}
        </div>
      </div>
    </section>

    <section className="bg-[#F9F8F6] py-18 md:py-24">
      <div className="site-shell"><SectionTitle locale={locale} label={isKo(locale) ? "로펌 FAQ" : "About the firm FAQs"} title={isKo(locale) ? "웹사이트에서 확인하기 어려운 기본 질문들." : "Basic questions the About page should actually answer."} /><FaqBlock locale={locale} items={aboutFaqs(locale)} /></div>
    </section>
  </RichPage>
);

export const PracticeAreasPage = ({ locale }: { locale: SiteLocale }) => (
  <RichPage locale={locale} base={<RefinedPracticeAreasPage locale={locale} />}>
    <section className="bg-[#F9F8F6] py-18 md:py-24">
      <div className="site-shell">
        <SectionTitle locale={locale} label={isKo(locale) ? "공통 구조" : "What connects these claims"} title={isKo(locale) ? "사고 유형은 달라도 좋은 사건 정리의 기본은 비슷합니다." : "Different accidents, same need for a clear factual record."} body={isKo(locale) ? "각 업무 분야는 다르지만 책임, 증거, 치료, 보험과 실제 손실을 연결해야 한다는 점은 공통적입니다." : "The legal theory may change from one accident to another, but the practical work often comes back to liability, evidence, medical documentation, coverage, and the real consequences of the injury."} />
        <div className="mt-10 grid gap-4 md:grid-cols-2 xl:grid-cols-4">
          {[
            [Scale, isKo(locale) ? "책임" : "Liability", isKo(locale) ? "누가 무엇을 했고, 어떤 사실이 책임 판단에 영향을 주는지 확인합니다." : "Who did what, what rules or duties may matter, and which facts support or weaken each version of the event."],
            [FileText, isKo(locale) ? "증거" : "Evidence", isKo(locale) ? "현장, 영상, 보고서, 목격자와 물리적 증거를 보존합니다." : "Scene evidence, video, reports, witnesses, physical evidence, and records can change the strength of a claim."],
            [Stethoscope, isKo(locale) ? "부상" : "Injury", isKo(locale) ? "치료 경과와 기능 제한을 정확하게 기록합니다." : "The diagnosis matters, but so do treatment, recovery, restrictions, future needs, and consistency over time."],
            [ShieldCheck, isKo(locale) ? "보험과 손실" : "Coverage & loss", isKo(locale) ? "적용 보험과 의료비 외의 실제 생활 손실을 함께 봅니다." : "Available policies, medical expenses, lost income, and changes in ordinary life need to be understood together."],
          ].map(([Icon, title, body]) => { const I = Icon as typeof Scale; return <Card key={String(title)} className="p-6"><I className="h-4 w-4 stroke-[1.3] text-[#381907]" /><h3 style={serif(locale)} className="mt-8 text-[1.45rem] leading-tight">{String(title)}</h3><p className="mt-3 text-[11px] leading-6 text-[#1E1C1A]/50">{String(body)}</p></Card>; })}
        </div>
      </div>
    </section>

    <section className="bg-[#F3EEE5] py-18 md:py-24"><div className="site-shell"><SectionTitle locale={locale} label={isKo(locale) ? "업무 분야 FAQ" : "Practice-area FAQs"} title={isKo(locale) ? "사고 유형을 고르기 전에 알아둘 기본 사항." : "Start with the facts, even if the category is not obvious yet."} /><FaqBlock locale={locale} items={practiceIndexFaqs(locale)} /></div></section>
  </RichPage>
);

export const PracticeAreaDetailPage = ({ locale }: { locale: SiteLocale }) => {
  const params = useParams({ strict: false }) as { slug?: string };
  const practice = params.slug ? getPracticeArea(params.slug) : undefined;
  if (!practice) return <RefinedPracticeAreaDetailPage locale={locale} />;

  const title = isKo(locale) ? practice.koTitle : practice.title;
  const depth = isKo(locale) ? genericKoDepth(title) : (practiceDepth[practice.slug] || practiceDepth["car-accidents"]);

  return (
    <RichPage locale={locale} base={<RefinedPracticeAreaDetailPage locale={locale} />}>
      <section className="bg-[#F9F8F6] py-18 md:py-24">
        <div className="site-shell grid gap-10 lg:grid-cols-[0.72fr_1.28fr] lg:gap-14">
          <div><SectionTitle locale={locale} label={isKo(locale) ? "깊이 보기" : "Understanding the claim"} title={isKo(locale) ? `${title} 사건을 더 깊이 이해하기.` : `${title}: what the page should help you understand.`} /></div>
          <div className="space-y-6 text-[14px] leading-8 text-[#1E1C1A]/64">
            {depth.overview.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}
          </div>
        </div>
      </section>

      <section className="bg-[#F3EEE5] py-18 md:py-24">
        <div className="site-shell">
          <SectionTitle locale={locale} label={isKo(locale) ? "핵심 요소" : "The deeper issues"} title={isKo(locale) ? "사건을 풍부하게 만드는 것은 긴 문장이 아니라 구체적인 정보입니다." : "Depth comes from specific, useful information — not filler."} />
          <div className="mt-10 grid gap-4 md:grid-cols-2 xl:grid-cols-4">
            {depth.topics.map((topic, index) => <Card key={topic.title} className="p-6"><div className="text-[9px] text-[#1E1C1A]/28">0{index + 1}</div><h3 style={serif(locale)} className="mt-7 text-[1.4rem] leading-tight">{topic.title}</h3><p className="mt-3 text-[11px] leading-6 text-[#1E1C1A]/50">{topic.body}</p></Card>)}
          </div>
        </div>
      </section>

      <section className="bg-[#F9F8F6] py-18 md:py-24">
        <div className="site-shell"><SectionTitle locale={locale} label={isKo(locale) ? "자주 묻는 질문" : `${title} FAQs`} title={isKo(locale) ? "검색에서 들어온 사람도 이 페이지 하나에서 기본 답을 얻을 수 있게." : "Answer the next questions before the reader has to search again."} /><FaqBlock locale={locale} items={depth.faqs} /><p className="mt-8 max-w-[840px] text-[9px] leading-5 text-[#1E1C1A]/36">{isKo(locale) ? "이 정보는 일반적인 내용이며 법률 자문이 아닙니다. 사건별 사실과 적용 법률이 다를 수 있습니다." : "This information is general and is not legal advice. The facts, available insurance, evidence, deadlines, and applicable law can differ from one matter to another."}</p></div>
      </section>
    </RichPage>
  );
};

export const ResultsPage = ({ locale }: { locale: SiteLocale }) => (
  <RichPage locale={locale} base={<RefinedResultsPage locale={locale} />}>
    <section className="bg-[#F9F8F6] py-18 md:py-24">
      <div className="site-shell">
        <SectionTitle locale={locale} label={isKo(locale) ? "결과를 보여주는 방식" : "How case results should be presented"} title={isKo(locale) ? "숫자만 나열하지 않고 사건의 맥락을 함께 보여줍니다." : "A result is more useful when the reader can understand the matter behind it."} body={isKo(locale) ? "실제 승인된 결과가 제공되기 전까지 이 페이지는 검색 노출되지 않도록 유지합니다." : "Until real, approved matters are supplied, this page should remain noindex. Once populated, each result should explain enough context to be informative without implying that past outcomes predict future ones."} />
        <div className="mt-10 grid gap-4 md:grid-cols-2 xl:grid-cols-4">
          {[
            ["01", isKo(locale) ? "사건 유형" : "Matter type", isKo(locale) ? "어떤 종류의 사고 또는 상해 사건인지." : "What kind of accident, injury, or liability issue the matter involved."],
            ["02", isKo(locale) ? "핵심 쟁점" : "Core issue", isKo(locale) ? "책임, 증거, 보험 또는 손해 중 무엇이 중요했는지." : "The liability, evidence, coverage, or damages issue that made the matter meaningful."],
            ["03", isKo(locale) ? "결과" : "Outcome", isKo(locale) ? "검증되고 공개가 승인된 결과만 정확하게 표시." : "Only verified outcomes that the firm has approved for publication, stated accurately and with context."],
            ["04", isKo(locale) ? "고지" : "Context & disclaimer", isKo(locale) ? "과거 결과가 미래 사건을 보장하지 않는다는 점을 명확히." : "Enough factual context to avoid a misleading impression and a clear reminder that every matter is different."],
          ].map(([n, title, body]) => <Card key={String(n)} className="p-6"><div className="text-[9px] text-[#1E1C1A]/28">{n}</div><h3 style={serif(locale)} className="mt-7 text-[1.4rem] leading-tight">{title}</h3><p className="mt-3 text-[11px] leading-6 text-[#1E1C1A]/50">{body}</p></Card>)}
        </div>
      </div>
    </section>
  </RichPage>
);
