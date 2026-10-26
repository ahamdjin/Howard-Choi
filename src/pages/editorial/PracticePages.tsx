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
import { PracticeDetailHighlights } from "@/components/DetailPageHighlights";
import { PracticeHubDirectory } from "@/components/HubDirectories";
import { esPracticeContent } from "@/data/esPracticeContent";
import { esPracticeEnhancements } from "@/data/esPracticeEnhancements";
import { getPracticeArea, practiceAreas, serviceLocations, type SiteLocale } from "@/data/injurySite";
import { englishPracticeGuides } from "@/data/englishPracticeGuides";
import {
  ConsultationCta,
  EditorialFrame,
  EditorialHero,
  isEs,
  isKo,
  localePrefix,
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
      { title: "California personal injury deadlines", koTitle: "캘리포니아 개인상해 청구 기한", slug: "california-personal-injury-deadlines" },
    ],
  },
};


/** Korean questions must be specific to the underlying injury claim, not one
 * generic set repeated across eight services. Attorney translation review is
 * required before these new paragraphs go live. */
const koPracticeFaqs: Record<string, Array<[string, string]>> = {
  "car-accidents": [
    ["상대 운전자가 제 과실도 있다고 주장하면 어떻게 하나요?", "캘리포니아에서는 비교과실이 문제 될 수 있습니다. 일부 과실 주장이 있다는 이유만으로 청구가 자동으로 사라지는 것은 아니며, 신호·차선·영상·목격자 등 실제 증거를 검토해야 합니다."],
    ["상대 운전자가 무보험이거나 도주했다면요?", "경찰 보고서, 차량 식별 단서, 주변 영상과 목격자 정보를 보존하고 본인 보험의 무보험·저보험 운전자 보장 적용 가능성을 확인하는 것이 중요합니다."],
    ["보험사의 녹음 진술 요청에 바로 응해야 하나요?", "먼저 어느 보험사가 무엇을 요구하는지 확인하세요. 본인 보험사와 상대 보험사의 요청은 다를 수 있으므로 광범위한 동의서나 상세 진술을 하기 전에 내용을 이해해야 합니다."],
  ],
  "truck-accidents": [
    ["트럭 운전자만 책임을 질 수 있나요?", "사고 사실에 따라 운송회사, 차량 소유자, 고용주, 정비업체 등 다른 당사자의 역할도 검토할 수 있습니다. 실제 계약 관계와 기록이 중요합니다."],
    ["트럭의 ELD 기록이 왜 중요한가요?", "전자운행기록장치 기록은 적용되는 차량에서 운전 및 근무 시간을 파악하는 자료가 될 수 있습니다. 충돌 시점의 운행 기록과 다른 증거를 함께 봐야 합니다."],
    ["상업용 트럭 사고는 왜 빨리 기록을 확보해야 하나요?", "회사 보관 기록, 차량 전자 데이터, 영상과 점검 자료의 보존 기간이 서로 다를 수 있습니다. 어떤 자료가 존재하는지 조기에 확인하는 것이 좋습니다."],
  ],
  "motorcycle-accidents": [
    ["부상이 심하면 상대방 과실이 자동으로 인정되나요?", "그렇지 않습니다. 부상의 정도와 사고 책임은 다른 문제입니다. 차량 위치, 차선 변경, 회전 동작, 목격자와 영상 등을 통해 경위를 확인해야 합니다."],
    ["상대 운전자가 오토바이를 못 봤다고 주장하면요?", "시야와 조명, 차선 위치, 도로 표시, 차량 손상, 영상과 목격자 진술을 함께 검토할 수 있습니다. 한쪽 진술만으로 책임이 결정되지는 않습니다."],
    ["제 오토바이 보험도 관련될 수 있나요?", "사고 경위와 실제 약관에 따라 본인의 무보험·저보험 운전자 보장 등이 중요해질 수 있습니다. 가입한 보장과 적용 조건을 확인하세요."],
  ],
  "pedestrian-accidents": [
    ["횡단보도 안에서 사고가 나면 과실이 자동으로 결정되나요?", "횡단보도 위치는 중요한 사실이지만 신호, 회전 차량, 시야, 속도와 사고 직전 움직임 등 전체 상황을 확인해야 합니다."],
    ["차량이 도주했다면 무엇을 보존해야 하나요?", "경찰 신고 정보, 주변 CCTV, 목격자, 차량 파편과 운전자 식별 단서를 가능하면 일찍 보존하세요. 이용 가능한 보험도 검토할 필요가 있습니다."],
    ["보행자 사고에서 치료 기록이 왜 중요하나요?", "사고 후 치료와 재활, 이동 제한, 결근, 향후 돌봄 등의 변화는 실제 기록으로 설명하는 것이 중요합니다. 손해는 개인의 부상과 회복 과정에 따라 달라집니다."],
  ],
  "rideshare-accidents": [
    ["우버·리프트 앱 상태가 보험에 왜 영향을 주나요?", "캘리포니아 승차공유 보험 기준은 운전자가 호출을 기다리는지, 수락했는지, 승객을 태우고 있는지에 따라 다를 수 있습니다. 사고 시점의 정확한 상태를 확인해야 합니다."],
    ["승객으로 타고 있던 중 다쳤다면요?", "탑승 영수증, 앱 화면, 운전자·차량 정보, 사고 사진과 의료기록을 보존하세요. 승차 기록이 적용 보험을 확인하는 데 도움이 될 수 있습니다."],
    ["다른 차량 운전자가 사고를 냈다면요?", "제3자의 책임과 별개로 승차공유 관련 보장을 확인해야 할 수 있습니다. 관련 보험은 앱 상태, 실제 약관과 사고 경위에 따라 달라집니다."],
  ],
  "slip-and-fall": [
    ["넘어졌다는 사실만으로 건물주에게 책임이 있나요?", "반드시 그렇지는 않습니다. 위험 상태와 관리 주체, 경고 여부, 점검·유지관리 상황, 사고 경위 등을 함께 검토해야 합니다."],
    ["매장 CCTV는 왜 중요하나요?", "영상에는 바닥 상태, 경고 표시, 청소 시점 또는 사고 순간이 담길 수 있습니다. 영상이 덮어쓰기되기 전에 보존 가능성을 확인하는 것이 좋습니다."],
    ["사고 뒤 위험한 부분이 바로 수리되었다면요?", "사고 당시 사진, 목격자 연락처, 매장 사고 보고서와 영상 자료가 중요할 수 있습니다. 현재 모습이 사고 당시 상태를 그대로 보여주지 않을 수 있습니다."],
  ],
  "wrongful-death": [
    ["캘리포니아에서는 누가 부당 사망 청구를 제기할 수 있나요?", "청구 자격은 관련 법률과 가족관계, 부양관계 등 구체적 사실에 따라 달라집니다. 자동으로 한 사람만 청구할 수 있다고 가정하지 말고 개별적으로 확인해야 합니다."],
    ["부당 사망 청구와 생존자 청구는 같은가요?", "같지 않습니다. 적격 가족이 입은 손실과 고인이 생전에 가졌던 청구권은 서로 다른 법적 문제일 수 있습니다. 상황에 따라 두 절차를 별도로 검토해야 합니다."],
    ["유가족은 어떤 기록을 준비해야 하나요?", "사고와 책임 관련 자료 외에도 가족관계, 재정적 지원, 가사 기여, 보험과 의료 관련 문서가 중요할 수 있습니다. 필요한 범위는 사건에 따라 달라집니다."],
  ],
  "serious-injuries": [
    ["앞으로 받아야 할 치료비도 고려할 수 있나요?", "향후 치료 필요성은 의료기록, 담당 의료진 의견, 재활 계획과 실제 기능 제한 등 근거를 토대로 검토해야 합니다. 막연한 추측만으로 정해지는 것은 아닙니다."],
    ["예전 직업으로 돌아가지 못한다면요?", "업무 제한, 재훈련 필요성, 소득과 향후 근로능력에 미치는 영향을 신뢰할 수 있는 자료로 확인해야 합니다. 이미 잃은 임금 외의 문제도 있을 수 있습니다."],
    ["일상생활의 변화를 기록해야 하나요?", "진단명 외에도 이동, 수면, 독립생활, 가족 역할과 평소 활동의 변화를 구체적으로 기록하면 부상의 실제 영향을 설명하는 데 도움이 될 수 있습니다."],
  ],
};

export const PracticeAreasPage = ({ locale }: { locale: SiteLocale }) => (
  <EditorialFrame locale={locale}>
    <main>
      <EditorialHero
        locale={locale}
        eyebrow={isKo(locale) ? "개인상해 업무 분야" : isEs(locale) ? "Áreas de práctica de lesiones personales" : "Personal injury practice areas"}
        title={isKo(locale) ? "부에나파크 개인상해 업무 분야" : isEs(locale) ? "Áreas de práctica de lesiones personales en Buena Park." : "Personal Injury Practice Areas in Buena Park."}
        description={isKo(locale)
          ? "자동차 사고부터 중대 상해까지, 각 사건 분야에서 어떤 사실과 증거가 중요한지 명확하게 설명합니다."
          : isEs(locale)
            ? "Explore los tipos de accidentes y lesiones que maneja la firma, incluida la evidencia que conviene preservar, las preguntas de seguro, las pérdidas que deben documentarse y los próximos pasos prácticos."
            : "Explore eight types of personal injury matters handled from our Buena Park office, from car and truck crashes to serious injuries and wrongful death. Each guide explains evidence, insurance questions and what to do next."}
        image={heroJustice}
      />
      <ReadingLayout
        locale={locale}
        label={isKo(locale) ? "개인상해 · 업무 분야" : isEs(locale) ? "Lesiones personales · Áreas de práctica" : "Personal injury · Practice areas"}
        sections={isKo(locale)
          ? [{ id: "overview", label: "전체 분야" }, { id: "process", label: "사건 진행" }, { id: "evidence", label: "증거와 기록" }]
          : isEs(locale)
            ? [{ id: "overview", label: "Todas las áreas" }, { id: "process", label: "Cómo se desarrolla un reclamo" }, { id: "evidence", label: "Evidencia y registros" }]
            : [{ id: "overview", label: "All practice areas" }, { id: "process", label: "How a claim develops" }, { id: "evidence", label: "Evidence & records" }, { id: "resources", label: "Research guides" }]}
      >
        <ReadingSectionBlock
          id="overview"
          locale={locale}
          kicker={isKo(locale) ? "01 · 분야" : isEs(locale) ? "01 · Áreas" : "01 · Areas"}
          title={isKo(locale) ? "필요한 정보를 사건 유형별로 찾으세요." : isEs(locale) ? "Ocho tipos de reclamo, y no funcionan de la misma manera." : "Find the right guide for your injury or accident."}
          intro={isKo(locale)
            ? "각 페이지는 일반적인 사건 구조를 설명하기 위한 것이며 실제 사건의 사실관계에 따라 접근은 달라집니다."
            : isEs(locale)
              ? "Un reclamo por lesiones no funciona igual en todos los casos. Un choque de camión puede depender de registros empresariales que se eliminan según un calendario. Una caída puede depender de demostrar cuánto tiempo existió un peligro. Un caso de Uber o Lyft puede depender de una sola captura de pantalla. Elija la página que corresponda a lo que ocurrió."
              : "A Buena Park car accident can raise different questions from a truck collision, an unsafe-property fall or a rideshare crash. These eight practice guides explain what evidence is most useful for each type of claim, how coverage may differ, and which steps deserve early attention. Choose the guide that best matches what happened; more than one category may apply."}
        >
          <PracticeHubDirectory locale={locale} />
        </ReadingSectionBlock>

        <ReadingSectionBlock
          id="process"
          locale={locale}
          kicker={isKo(locale) ? "02 · 진행" : isEs(locale) ? "02 · Proceso" : "02 · Process"}
          title={isKo(locale) ? "좋은 사건 준비는 순서가 있습니다." : isEs(locale) ? "El orden importa más que la velocidad." : "Order matters more than speed."}
          intro={isKo(locale)
            ? "초기에는 치료와 증거 보존이 중요하고, 이후에는 보험과 손실을 정리하며 책임과 손해를 설명할 수 있는 기록을 만들어갑니다."
            : isEs(locale)
              ? "Obtenga tratamiento y preserve la evidencia que no sobrevivirá semanas de espera. Esas dos cosas vienen primero. Después sigue el trabajo más lento de determinar quién es responsable, qué pólizas aplican y cuánto ha costado realmente la lesión."
              : "Prioritize appropriate medical care and time-sensitive evidence first. Then organize the collision or incident record, identify potentially responsible parties and insurance coverage, and document how the injury affects work and daily life. Recovery and claim timelines vary; the goal is a reliable record, not a rushed settlement."}
        >
          <div className="grid gap-0 border-y border-[#1E1C1A]/12 md:grid-cols-3">
            {[FileText, ShieldCheck, CheckCircle2].map((Icon, index) => (
              <div key={index} className="border-b border-[#1E1C1A]/12 py-6 md:border-b-0 md:border-l md:px-6 md:first:border-l-0 md:first:pl-0">
                <Icon className="h-4 w-4 stroke-[1.3] text-[#381907]" />
                <h3 style={serifStyle(locale)} className="mt-9 text-[1.35rem]">
                  {isKo(locale) ? ["기록 확보", "보험 확인", "손실 정리"][index] : isEs(locale) ? ["Preservar el expediente", "Entender la cobertura", "Documentar la pérdida"][index] : ["Preserve the record", "Understand coverage", "Document the loss"][index]}
                </h3>
                <p className="mt-3 text-[11px] leading-5 text-[#1E1C1A]/48">
                  {isKo(locale)
                    ? ["사진, 영상, 진료기록과 목격자 등 초기 증거를 확보합니다.", "적용 가능한 보험과 책임 당사자를 확인합니다.", "치료비뿐 아니라 업무와 일상생활에 미친 영향을 정리합니다."][index]
                    : isEs(locale)
                      ? ["Preserve fotos, video, reportes, testigos y otros datos antes de que desaparezcan.", "Identifique personas, empresas, vehículos, pólizas y preguntas de cobertura que pueden importar.", "Registre tratamiento, gastos médicos, trabajo perdido, necesidades futuras y el efecto en la vida diaria."][index]
                      : ["Secure scene evidence, reports, records, witnesses, video, and other information before it disappears.", "Identify the people, businesses, vehicles, policies, and coverage questions that may matter.", "Track treatment, medical costs, missed work, future needs, and the practical effect on everyday life."][index]}
                </p>
              </div>
            ))}
          </div>
        </ReadingSectionBlock>

        <ReadingSectionBlock
          id="evidence"
          locale={locale}
          kicker={isKo(locale) ? "03 · 증거" : isEs(locale) ? "03 · Evidencia" : "03 · Evidence"}
          title={isKo(locale) ? "사건은 기억보다 기록으로 설명하는 것이 좋습니다." : isEs(locale) ? "El mejor momento para preservar evidencia es antes de necesitarla." : "The best time to preserve evidence is before anyone needs it."}
          intro={isKo(locale)
            ? "사고 현장 자료, 차량 정보, 진료 기록, 보험 서신과 업무 손실 자료를 일관된 흐름으로 정리하면 사건을 설명하기 쉬워집니다."
            : isEs(locale)
              ? "Fotos, reportes, testigos, video, expedientes médicos, comunicaciones de seguro, información salarial y una cronología simple son más útiles cuando se reúnen temprano y se mantienen juntos."
              : "Photos, reports, witnesses, video, medical records, insurance communications, wage information, and a simple timeline are easier to use when they are collected early and kept together."}
        />
        {locale === "en" && (
          <ReadingSectionBlock
            id="resources"
            locale={locale}
            kicker="04 · Research"
            title="Explore researched California injury-law guides."
            intro="These practical articles explain common evidence, deadline and insurance questions. The individual practice pages above explain how those issues relate to particular kinds of accidents."
          >
            <div className="grid gap-0 border-y border-[#1E1C1A]/12">
              {[
                { title: "What to do after a car accident in California", href: "/blogs/what-to-do-after-a-car-accident-in-california", focus: "Reports, treatment records and preserving collision evidence" },
                { title: "California comparative fault in injury claims", href: "/blogs/california-comparative-fault-personal-injury", focus: "Fault allocation and what the evidence must establish" },
                { title: "California personal injury filing deadlines", href: "/blogs/california-personal-injury-deadlines", focus: "Filing periods and potentially earlier public-entity deadlines" },
                { title: "Truck accident electronic logs and evidence", href: "/blogs/truck-accident-evidence-eld-records-california", focus: "Motor-carrier records and time-sensitive preservation" },
              ].map((guide) => (
                <a key={guide.href} href={guide.href} className="group flex items-center justify-between gap-5 border-b border-[#1E1C1A]/12 py-5 last:border-b-0 hover:text-[#785039]">
                  <span><strong className="block text-[15px] font-semibold">{guide.title}</strong><small className="mt-1 block text-[12px] leading-5 text-[#686057]">{guide.focus}</small></span>
                  <ArrowRight aria-hidden="true" className="h-4 w-4 shrink-0" />
                </a>
              ))}
            </div>
            <p className="mt-5 text-[12px] leading-6 text-[#5D5349]">Primary sources: <a href="https://selfhelp.courts.ca.gov/civil-lawsuit/personal-injury" target="_blank" rel="noopener noreferrer" className="underline underline-offset-4">California Courts — Personal Injury</a> and <a href="https://selfhelp.courts.ca.gov/civil-lawsuit/statute-limitations" target="_blank" rel="noopener noreferrer" className="underline underline-offset-4">Statutes of Limitations</a>.</p>
          </ReadingSectionBlock>
        )}
      </ReadingLayout>
      <ConsultationCta locale={locale} />
    </main>
  </EditorialFrame>
);

// Provide a distinct explanation for every English practice area while avoiding
// duplicated keyword paragraphs and keeping translations unaffected.
const englishPracticeFocus: Record<string, string> = {
  "car-accidents": "A car-accident claim may involve another driver's liability insurance, an owner or employer, and your own uninsured or underinsured motorist coverage. The collision sequence, early medical records, scene evidence and the timing of treatment all need to be evaluated together. A police report alone does not establish every legal issue.",
  "truck-accidents": "Commercial crash investigations often turn on who employed or controlled the driver, whether the vehicle was inspected and maintained, and which carrier, dispatch, electronic log and onboard-video records still exist. Identifying every responsible party and preserving company records can matter as much as the initial crash report.",
  "motorcycle-accidents": "The claim must separate the cause of the crash from assumptions about the rider. Turning movements, traffic signals, road geometry, lane position, lighting and sightlines help test each account. The medical record should address not only immediate treatment, but rehabilitation, scarring and lasting mobility limitations when supported.",
  "pedestrian-accidents": "Crosswalk markings, walk signals, turning traffic, a driver's line of sight and the precise point of impact can change the liability analysis. If the driver left the scene, witnesses, footage and available insurance need prompt review. Injury documentation should address mobility, work and daily-life changes over time.",
  "rideshare-accidents": "A rideshare claim cannot be evaluated accurately without the driver's app status at the time of collision. Whether a ride had been accepted or a passenger was on board may affect available coverage. Trip receipts, messages, screenshots and insurer communications should be preserved alongside ordinary crash evidence.",
  "slip-and-fall": "Premises liability depends on more than proving that a fall happened. Identify the exact hazard, who possessed or controlled that area, whether the condition was reasonably discoverable, and what inspections, warnings or repairs occurred. Photos, shoes, incident reports and surveillance can establish details that disappear quickly.",
  "wrongful-death": "A wrongful-death claim asks both how the fatal injury occurred and which family members may assert legally recoverable losses. Financial support, household services and relationship losses require different evidence. California's wrongful-death and survival-action rules should not be treated as interchangeable.",
  "serious-injuries": "Traumatic brain injuries may cause memory, concentration, sleep, mood or balance problems even when early imaging is inconclusive. Severe brain, spinal and orthopedic injuries can also require rehabilitation, adaptive equipment or future care. A supported long-term prognosis, functional assessment and earnings history can be as important as the first hospital bill.",
};

const relatedServiceSlugs: Record<string, string[]> = {
  "car-accidents": ["rideshare-accidents", "truck-accidents", "motorcycle-accidents", "serious-injuries"],
  "truck-accidents": ["serious-injuries", "wrongful-death", "car-accidents", "pedestrian-accidents"],
  "motorcycle-accidents": ["serious-injuries", "car-accidents", "wrongful-death", "pedestrian-accidents"],
  "pedestrian-accidents": ["car-accidents", "serious-injuries", "wrongful-death", "rideshare-accidents"],
  "rideshare-accidents": ["car-accidents", "serious-injuries", "truck-accidents", "pedestrian-accidents"],
  "slip-and-fall": ["serious-injuries", "wrongful-death", "pedestrian-accidents", "car-accidents"],
  "wrongful-death": ["truck-accidents", "pedestrian-accidents", "serious-injuries", "car-accidents"],
  "serious-injuries": ["car-accidents", "truck-accidents", "motorcycle-accidents", "pedestrian-accidents"],
};

export const PracticeAreaDetailPage = ({ locale }: { locale: SiteLocale }) => {
  const params = useParams({ strict: false }) as { slug?: string };
  const practice = params.slug ? getPracticeArea(params.slug) : undefined;
  if (!practice) return null;

  const esCopy = esPracticeContent[practice.slug];
  const esEnhancement = esPracticeEnhancements[practice.slug];
  const enhancement = practiceEnhancements[practice.slug];

  const title = isKo(locale) ? practice.koTitle : isEs(locale) ? (esCopy?.shortTitle || practice.title) : practice.title;
  const heroTitle = isKo(locale) ? `${practice.koTitle} · Buena Park` : isEs(locale) ? (esCopy?.title || `Abogado de ${practice.title} en Buena Park`) : practice.slug === "serious-injuries" ? "Buena Park Brain & Catastrophic Injury Lawyer" : `Buena Park ${practice.title} Lawyer`;
  const description = isKo(locale) ? practice.koDescription : isEs(locale) ? (esCopy?.description || practice.description) : practice.description;
  const intro = isKo(locale) ? practice.koIntro : isEs(locale) ? (esCopy?.intro || practice.intro) : practice.intro;
  const issues = isKo(locale) ? practice.koIssues : isEs(locale) ? (esCopy?.issues || practice.issues) : practice.issues;
  const evidenceTitle = isKo(locale) ? practice.koEvidenceTitle : isEs(locale) ? (esCopy?.evidenceTitle || practice.evidenceTitle) : practice.evidenceTitle;
  const evidenceIntro = isKo(locale) ? practice.koEvidenceIntro : isEs(locale) ? (esCopy?.evidenceIntro || practice.evidenceIntro) : practice.evidenceIntro;
  const evidenceItems = isEs(locale) ? (esEnhancement?.evidenceItems || practice.evidenceItems) : practice.evidenceItems;
  const valueIntro = isKo(locale) ? practice.koValueIntro : isEs(locale) ? (esCopy?.valueIntro || practice.valueIntro) : practice.valueIntro;
  const insuranceIntro = isKo(locale) ? practice.koInsuranceIntro : isEs(locale) ? (esCopy?.insuranceIntro || practice.insuranceIntro) : practice.insuranceIntro;
  const headings = isEs(locale) ? (esEnhancement?.headings || enhancement.headings) : enhancement.headings;
  const attorneyNote = isEs(locale) ? (esEnhancement?.fromAttorney || enhancement.fromAttorney) : enhancement.fromAttorney;
  const damages = isKo(locale)
    ? ["현재와 향후 치료비", "임금 손실과 향후 소득 영향", "통증·기능 제한·일상생활 변화", "사건 유형에 따라 적용되는 기타 경제적 손실"]
    : isEs(locale)
      ? (esEnhancement?.damages || enhancement.damages)
      : enhancement.damages;
  const deadlineNote = isKo(locale)
    ? "캘리포니아의 많은 개인상해 소송에는 일반적인 제소 기한이 있지만 공공기관 관련 청구 등은 더 짧은 절차가 적용될 수 있습니다. 또한 영상, 전자기록, 목격자 기억은 훨씬 빨리 사라질 수 있습니다."
    : isEs(locale)
      ? (esEnhancement?.deadlineNote || enhancement.deadlineNote)
      : enhancement.deadlineNote;
  const faqs = isKo(locale)
    ? koPracticeFaqs[practice.slug]
    : isEs(locale)
      ? (esCopy?.faqs || enhancement.faqs)
      : enhancement.faqs;

  return (
    <EditorialFrame locale={locale}>
      <main className="detail-guide">
        <EditorialHero
          locale={locale}
          eyebrow={isKo(locale) ? "개인상해 · 업무 분야" : isEs(locale) ? "Lesiones personales · Área de práctica" : "Personal injury · Practice area"}
          title={heroTitle}
          description={description}
          image={practiceMedia[practice.slug]?.src ?? heroCourthouse}
          imageAlt={practiceMedia[practice.slug]?.alt || ""}
          detail
        />
        <PracticeDetailHighlights locale={locale} subject={title} issues={issues} />
        <ClaimJourney locale={locale} subject={title} guideId="understand" contextImage={practiceMedia[practice.slug]?.src} />
        <GuideAttorney locale={locale} />
        <ReadingLayout
          locale={locale}
          label={`${title} · ${isKo(locale) ? "안내" : isEs(locale) ? "Guía" : "Guide"}`}
          sections={isKo(locale)
            ? [
                { id: "understand", label: "사건 이해" }, { id: "issues", label: "주요 쟁점" }, { id: "evidence", label: "증거" },
                { id: "value", label: "손해와 가치" }, { id: "insurance", label: "보험" }, { id: "deadlines", label: "기한" },
                { id: "faq", label: "자주 묻는 질문" }, { id: "resources", label: "자료" }, { id: "related", label: "다른 업무 분야" }, { id: "areas", label: "지역" },
              ]
            : isEs(locale)
              ? [
                  { id: "understand", label: "Entender el reclamo" }, { id: "issues", label: "Puntos clave" }, { id: "evidence", label: "Evidencia a preservar" },
                  { id: "value", label: "Daños y valor del caso" }, { id: "insurance", label: "Seguro y responsabilidad" }, { id: "deadlines", label: "Plazos de California" },
                  { id: "faq", label: "Preguntas frecuentes" }, { id: "resources", label: "Guías y fuentes" }, { id: "related", label: "Áreas relacionadas" }, { id: "areas", label: "Dónde atendemos" },
                ]
              : [
                  { id: "understand", label: "Understanding the claim" }, { id: "issues", label: "Key issues" }, { id: "evidence", label: "Evidence to preserve" }, { id: "case-guide", label: "Case-specific guidance" },
                  { id: "value", label: "Damages & case value" }, { id: "insurance", label: "Insurance & responsibility" }, { id: "deadlines", label: "California deadlines" },
                  { id: "faq", label: "Common questions" }, { id: "resources", label: "Guides & sources" }, { id: "related", label: "Related practice areas" }, { id: "areas", label: "Where we handle these" },
                ]}
        >
          <ReadingSectionBlock
            id="understand"
            locale={locale}
            Icon={Compass}
            kicker={isKo(locale) ? "01 · 이해" : isEs(locale) ? "01 · Entender" : "01 · Understand"}
            title={isKo(locale) ? `${title} 사건에서 먼저 확인할 것` : headings.understand}
            intro={intro}
          >
            <div className="editorial-callout">
              <span className="editorial-callout__label">{isKo(locale) ? "핵심" : isEs(locale) ? "Punto clave" : "Key point"}</span>
              <p>{isKo(locale) ? "책임, 보험, 치료와 일상생활의 영향을 함께 살펴보세요." : isEs(locale) ? "Mire más allá del accidente: responsabilidad, seguro, tratamiento y el impacto en la vida diaria también importan." : "Look beyond the accident: responsibility, insurance, treatment, and the impact on your everyday life all matter."}</p>
            </div>
            <AttorneyNote note={attorneyNote} locale={locale} />
          </ReadingSectionBlock>

          <ReadingSectionBlock id="issues" locale={locale} Icon={Layers} kicker={isKo(locale) ? "02 · 주요 쟁점" : isEs(locale) ? "02 · Puntos clave" : "02 · Key issues"} title={isKo(locale) ? "이 유형의 사건에서 자주 확인하는 항목" : headings.issues}>
            <div className="editorial-issue-list">
              {issues.map((issue, index) => <div key={issue} className="editorial-issue-row"><span>{String(index + 1).padStart(2, "0")}</span><strong>{issue}</strong></div>)}
            </div>
            {locale === "en" && <p className="mt-7 max-w-[760px] text-[15px] leading-8 text-[#57514b]">{englishPracticeFocus[practice.slug]}</p>}
          </ReadingSectionBlock>

          <ReadingSectionBlock id="evidence" locale={locale} Icon={FileText} kicker={isKo(locale) ? "03 · 증거" : isEs(locale) ? "03 · Evidencia" : "03 · Evidence"} title={evidenceTitle} intro={evidenceIntro}>
            <EvidenceVisuals locale={locale} />
            <div className="editorial-issue-list">
              {evidenceItems.map((item, index) => <div key={item} className="editorial-issue-row"><span>{String(index + 1).padStart(2, "0")}</span><strong>{item}</strong></div>)}
            </div>
          </ReadingSectionBlock>

          {locale === "en" && englishPracticeGuides[practice.slug] && (
            <ReadingSectionBlock
              id="case-guide"
              locale={locale}
              Icon={FileText}
              kicker="Case-specific guidance"
              title={englishPracticeGuides[practice.slug].title}
              intro={englishPracticeGuides[practice.slug].summary}
            >
              <div className="article-reading-width grid gap-8 border-t border-[#1E1C1A]/15 pt-8 md:gap-10">
                {englishPracticeGuides[practice.slug].topics.map(([heading, explanation], index) => (
                  <section key={heading} className="border-b border-[#1E1C1A]/12 pb-8 last:border-0">
                    <div className="flex items-start gap-4">
                      <span className="pt-1 text-[12px] tabular-nums text-[#1E1C1A]/45">{String(index + 1).padStart(2, "0")}</span>
                      <div>
                        <h3 className="editorial-serif text-[clamp(1.5rem,2.2vw,2rem)] leading-[1.16] text-[#1E1C1A]">{heading}</h3>
                        <p className="mt-4 max-w-[710px] text-[16px] leading-[1.8] text-[#57514b]">{explanation}</p>
                      </div>
                    </div>
                  </section>
                ))}
                <div className="rounded-[3px] border border-[#1E1C1A]/15 bg-[#efeae2] px-6 py-6 text-[15px] leading-7">
                  <strong className="block font-semibold">Discuss your specific evidence and coverage.</strong>
                  <p className="mt-2">An initial consultation can help identify the applicable deadlines, documents worth preserving and unanswered questions. No outcome or recovery is guaranteed.</p>
                  <a href="/contact" className="mt-4 inline-flex min-h-11 items-center gap-2 font-semibold underline underline-offset-4">Request a free consultation <ArrowRight className="h-4 w-4" /></a>
                </div>
              </div>
            </ReadingSectionBlock>
          )}

          <ReadingSectionBlock id="value" locale={locale} Icon={Scale} kicker={isKo(locale) ? "04 · 손해" : isEs(locale) ? "04 · Daños y valor" : "04 · Damages & value"} title={isKo(locale) ? "사건 가치는 하나의 공식으로 계산되지 않습니다." : headings.value} intro={valueIntro}>
            <ClaimValueVisual locale={locale} />
            <div className="editorial-issue-list">
              {damages.map((item, index) => <div key={item} className="editorial-issue-row"><span>{String(index + 1).padStart(2, "0")}</span><strong>{item}</strong></div>)}
            </div>
            <a href={`${localePrefix(locale)}/case-value-calculator`} className="editorial-inline-link mt-6"><span>{isKo(locale) ? "캘리포니아 사건 가치 계산기 보기" : isEs(locale) ? "Usar la calculadora de valor del caso de California" : "Use the California case-value calculator"}</span><ArrowRight className="h-4 w-4" /></a>
          </ReadingSectionBlock>

          <ReadingSectionBlock id="insurance" locale={locale} Icon={Umbrella} kicker={isKo(locale) ? "05 · 보험" : isEs(locale) ? "05 · Seguro" : "05 · Insurance"} title={isKo(locale) ? "누가 책임이 있고 어떤 보험이 적용되는지 확인합니다." : headings.insurance} intro={insuranceIntro} />

          <ReadingSectionBlock id="deadlines" locale={locale} Icon={CalendarClock} kicker={isKo(locale) ? "06 · 기한" : isEs(locale) ? "06 · Plazos de California" : "06 · California deadlines"} title={isKo(locale) ? "법적 기한과 증거 보존 기한은 같은 것이 아닙니다." : isEs(locale) ? "¿Cuánto tiempo tiene?" : "How long do you have?"} intro={deadlineNote}>
            <a href={`${localePrefix(locale)}/blogs/california-personal-injury-deadlines`} className="editorial-inline-link"><span>{isKo(locale) ? "캘리포니아 개인상해 기한 가이드" : isEs(locale) ? "Leer la guía de plazos de lesiones en California" : "Read the California injury-deadlines guide"}</span><ArrowRight className="h-4 w-4" /></a>
          </ReadingSectionBlock>

          <ReadingSectionBlock id="faq" locale={locale} Icon={HelpCircle} kicker={isKo(locale) ? "07 · 질문" : isEs(locale) ? "07 · Preguntas frecuentes" : "07 · Common questions"} title={isKo(locale) ? "사고 직후 자주 생기는 질문" : isEs(locale) ? "Sus preguntas, respondidas." : "Your questions, answered."}>
            <div className="border-t border-[#1E1C1A]/12">
              {faqs.map(([question, answer]) => (
                <details key={question} className="border-b border-[#1E1C1A]/12">
                  <summary>{question}</summary><p className="max-w-[720px] pb-6 text-base leading-7 text-[#57514b]">{answer}</p>
                </details>
              ))}
            </div>
          </ReadingSectionBlock>

          <ReadingSectionBlock id="resources" locale={locale} Icon={ShieldCheck} kicker={isKo(locale) ? "08 · 자료" : isEs(locale) ? "08 · Guías y fuentes" : "08 · Guides & sources"} title={isKo(locale) ? "관련 가이드와 공식 자료" : isEs(locale) ? "Guías útiles y fuentes oficiales." : "Helpful guides and official resources."} intro={isKo(locale) ? "사건 유형과 관련된 내부 가이드와 캘리포니아·연방 공식 자료를 함께 확인할 수 있습니다." : isEs(locale) ? "Explore un tema con más detalle. Estas guías ofrecen información general, no asesoría sobre su caso específico." : "Explore a topic in more detail. These guides provide general information, not advice about your specific case."}>
            <div className="grid gap-8 md:grid-cols-2">
              <div>
                <div className="mb-3 text-[9px] font-semibold uppercase tracking-[0.16em] text-[#1E1C1A]/35">{isKo(locale) ? "관련 가이드" : isEs(locale) ? "Guías relacionadas" : "Related guides"}</div>
                <div className="border-t border-[#1E1C1A]/12">
                  {enhancement.guides.map((guide) => (
                    <a key={guide.slug} href={`${localePrefix(locale)}/blogs/${guide.slug}`} className="group flex items-center justify-between gap-4 border-b border-[#1E1C1A]/12 py-4 text-[12px]">
                      <span>{isKo(locale) ? guide.koTitle : isEs(locale) ? (esEnhancement?.guideTitles[guide.slug] || guide.title) : guide.title}</span><ArrowRight className="h-3.5 w-3.5 shrink-0 transition-transform group-hover:translate-x-1" />
                    </a>
                  ))}
                </div>
              </div>
              <div>
                <div className="mb-3 text-[9px] font-semibold uppercase tracking-[0.16em] text-[#1E1C1A]/35">{isKo(locale) ? "공식 자료" : isEs(locale) ? "Fuentes primarias" : "Primary sources"}</div>
                <div className="border-t border-[#1E1C1A]/12">
                  {enhancement.sources.map((source) => <a key={source.href} href={source.href} target="_blank" rel="noreferrer" className="group flex items-center justify-between gap-4 border-b border-[#1E1C1A]/12 py-4 text-[12px]"><span>{source.label}</span><ArrowRight className="h-3.5 w-3.5 shrink-0 transition-transform group-hover:translate-x-1" /></a>)}
                </div>
              </div>
            </div>
          </ReadingSectionBlock>

          <ReadingSectionBlock id="related" locale={locale} Icon={Sparkles} kicker={isKo(locale) ? "09 · 더 보기" : isEs(locale) ? "09 · Explorar" : "09 · Explore"} title={isKo(locale) ? "다른 개인상해 업무 분야" : isEs(locale) ? "Áreas de práctica relacionadas." : "Related personal injury practice areas."}>
            <div className="editorial-link-grid">
              {(relatedServiceSlugs[practice.slug] || []).map((slug) => practiceAreas.find((item) => item.slug === slug)).filter((item): item is (typeof practiceAreas)[number] => Boolean(item)).map((item) => {
                const relatedEs = esPracticeContent[item.slug];
                return (
                  <a key={item.slug} href={`${localePrefix(locale)}/practice-areas/${item.slug}`} className="editorial-link-card">
                    <div className="editorial-link-card__top"><span>→</span><ArrowRight className="h-3.5 w-3.5" /></div>
                    <h3 style={serifStyle(locale)}>{isKo(locale) ? item.koTitle : isEs(locale) ? (relatedEs?.shortTitle || item.title) : item.title}</h3>
                    <p>{isKo(locale) ? item.koDescription : isEs(locale) ? (relatedEs?.description || item.description) : item.description}</p>
                  </a>
                );
              })}
            </div>
          </ReadingSectionBlock>

          <ReadingSectionBlock
            id="areas"
            locale={locale}
            Icon={MapPin}
            kicker={isKo(locale) ? "10 · 지역" : isEs(locale) ? "10 · Dónde atendemos" : "10 · Where we handle these"}
            title={isKo(locale) ? `${title} 사건 지원 지역` : isEs(locale) ? `Reclamos de ${title.toLowerCase()} en el norte del Condado de Orange.` : `${title} claims across North Orange County.`}
            intro={isKo(locale)
              ? "부에나파크 사무실을 중심으로 인근 오렌지카운티와 로스앤젤레스카운티 지역의 사건을 지원합니다."
              : isEs(locale)
                ? `La oficina está en Buena Park y recibimos reclamos de ${title.toLowerCase()} de las ciudades cercanas. Cada página local incluye datos de colisiones, la agencia correspondiente y el tribunal que podría intervenir si se presenta un caso.`
                : `The office is in Buena Park, and ${title.toLowerCase()} claims come in from the cities around it. Each page below has that city's own collision data, its police department, and the courthouse a filed case would go to.`}
          >
            <div className="grid border-t border-[#1E1C1A]/12 sm:grid-cols-2">
              {serviceLocations.map((location) => (
                <a key={location.slug} href={`${localePrefix(locale)}/locations/${location.slug}`} className="group flex items-center justify-between gap-4 border-b border-[#1E1C1A]/12 py-4 sm:even:border-l sm:even:pl-6">
                  <span className="text-[13px]">{isKo(locale) ? location.koName : location.name}</span>
                  <span className="shrink-0 text-[11px] text-[#1E1C1A]/38">{location.county}</span>
                </a>
              ))}
            </div>
            <a href={`${localePrefix(locale)}/locations`} className="editorial-inline-link mt-7"><span>{isKo(locale) ? "전체 지역 보기" : isEs(locale) ? "Ver todas las zonas de servicio" : "See all service areas"}</span><ArrowRight className="h-4 w-4" /></a>
          </ReadingSectionBlock>
        </ReadingLayout>
        <div className="site-shell pb-12"><PageReviewed locale={locale} /></div>
        <ClientProof locale={locale} />
        <ConsultationCta locale={locale} />
      </main>
    </EditorialFrame>
  );
};
