import { ArrowRight, MapPin, Route, ShieldCheck } from "lucide-react";
import { useParams } from "@tanstack/react-router";
import heroBoardroom from "@/assets/law-firm/hero-city-boardroom.webp";
import heroJustice from "@/assets/law-firm/hero-justice-library.webp";
import ClaimJourney from "@/components/ClaimJourney";
import { EvidenceVisuals, GuideAttorney } from "@/components/ClaimVisuals";
import PageByline from "@/components/PageByline";
import ClientProof from "@/components/ClientProof";
import cityCarCollision from "@/assets/law-firm/car-collision.jpg";
import cityCollisionDamage from "@/assets/law-firm/collision-damage.jpg";
import cityTruckHighway from "@/assets/law-firm/truck-highway.jpg";
import cityMotorcycleRoad from "@/assets/law-firm/motorcycle-road.jpg";
import cityPedestrianCrossing from "@/assets/law-firm/pedestrian-crossing.jpg";
import citySuburbanPalms from "@/assets/law-firm/suburban-palms.jpg";

// Each city gets its own image so ten pages do not share one photo. Chosen to
// echo the collision mix described in that city's localIntro.
const cityImages: Record<string, string> = {
  "buena-park": citySuburbanPalms,
  anaheim: cityPedestrianCrossing,
  fullerton: cityCarCollision,
  "garden-grove": cityCollisionDamage,
  cypress: citySuburbanPalms,
  "la-habra": cityMotorcycleRoad,
  "la-mirada": cityCollisionDamage,
  cerritos: cityTruckHighway,
  norwalk: cityTruckHighway,
  whittier: citySuburbanPalms,
};
import { getServiceLocation, serviceLocations, type SiteLocale } from "@/data/injurySite";
import {
  ConsultationCta,
  EditorialFrame,
  EditorialHero,
  isKo,
  localePrefix,
  ReadingLayout,
  ReadingSectionBlock,
  serifStyle,
} from "./editorial/shared";

const locationResources: Record<string, { agency: string; agencyHref: string; court: string; courtHref: string }> = {
  "buena-park": { agency: "Buena Park Police Department", agencyHref: "https://www.bppd.com/", court: "Orange County Superior Court", courtHref: "https://www.occourts.org/" },
  anaheim: { agency: "Anaheim Police · Records Bureau", agencyHref: "https://pd.anaheim.net/173/Records", court: "Orange County Superior Court", courtHref: "https://www.occourts.org/" },
  fullerton: { agency: "Fullerton Police · Traffic Collision Reports", agencyHref: "https://www.cityoffullerton.com/government/departments/police/police-services/traffic-collision-report", court: "Orange County Superior Court", courtHref: "https://www.occourts.org/" },
  "garden-grove": { agency: "Garden Grove Police · Records Bureau", agencyHref: "https://ggcity.org/police/rar", court: "Orange County Superior Court", courtHref: "https://www.occourts.org/" },
  cypress: { agency: "Cypress Police · Forms & Records", agencyHref: "https://www.cypressca.org/departments/police/forms-documents", court: "Orange County Superior Court", courtHref: "https://www.occourts.org/" },
  "la-habra": { agency: "La Habra Police · Operations & Services", agencyHref: "https://www.lahabraca.gov/396/Operations-Services", court: "Orange County Superior Court", courtHref: "https://www.occourts.org/" },
  "la-mirada": { agency: "Los Angeles County Sheriff · Norwalk Station", agencyHref: "https://lasd.org/norwalk/", court: "Los Angeles Superior Court", courtHref: "https://www.lacourt.org/" },
  cerritos: { agency: "Los Angeles County Sheriff · Cerritos Station", agencyHref: "https://lasd.org/cerritos/", court: "Los Angeles Superior Court", courtHref: "https://www.lacourt.org/" },
  norwalk: { agency: "Los Angeles County Sheriff · Norwalk Station", agencyHref: "https://lasd.org/norwalk/", court: "Los Angeles Superior Court", courtHref: "https://www.lacourt.org/" },
  whittier: { agency: "Whittier Police · Police & Collision Reports", agencyHref: "https://www.cityofwhittier.org/how-do-i/request", court: "Los Angeles Superior Court", courtHref: "https://www.lacourt.org/" },
};

export const LocationsPage = ({ locale }: { locale: SiteLocale }) => (
  <EditorialFrame locale={locale}>
    <main>
      <EditorialHero
        locale={locale}
        eyebrow={isKo(locale) ? "서비스 지역" : "Personal injury service areas"}
        title={isKo(locale) ? "Buena Park를 중심으로 인근 지역까지." : "Personal injury lawyers serving Buena Park and nearby communities."}
        description={isKo(locale)
          ? "Buena Park와 인근 Orange County·Los Angeles County 경계 지역의 사고·개인상해 사건을 지원합니다."
          : "The firm is based in Buena Park and serves injured people across nearby North Orange County and Los Angeles County communities. Each local guide explains the accident context, evidence, official local resources, and practical information that can matter after an injury."}
        image={heroBoardroom}
      />
      <ReadingLayout
        locale={locale}
        label={isKo(locale) ? "지역 · 서비스 범위" : "Locations · Service area"}
        sections={isKo(locale)
          ? [{ id: "areas", label: "서비스 지역" }, { id: "local", label: "지역 중심 접근" }, { id: "visit", label: "상담 시작" }]
          : [{ id: "areas", label: "Communities served" }, { id: "local", label: "Why local context matters" }, { id: "visit", label: "Start a consultation" }]}
      >
        <ReadingSectionBlock
          id="areas"
          locale={locale}
          kicker={isKo(locale) ? "01 · 지역" : "01 · Communities"}
          title={isKo(locale) ? "가까운 지역 페이지에서 시작하세요." : "Choose the community closest to where the accident or recovery is happening."}
          intro={isKo(locale)
            ? "각 지역 페이지는 해당 지역에서 사고 이후 확인해야 할 일반적인 문제와 상담 시작 방법을 정리합니다."
            : "The city does not determine whether a claim is strong, but the exact location can affect the responding agency, available video, witnesses, venue, treatment logistics, and the local records worth preserving."}
        >
          <div className="editorial-link-grid">
            {serviceLocations.map((location, index) => (
              <a key={location.slug} href={`${localePrefix(locale)}/locations/${location.slug}`} className="editorial-link-card">
                <div className="editorial-link-card__top"><span>{String(index + 1).padStart(2, "0")}</span><ArrowRight className="h-3.5 w-3.5" /></div>
                <h3 style={serifStyle(locale)}>{isKo(locale) ? location.koName : location.name}</h3>
                <p>{isKo(locale) ? location.koDescription : location.description}</p>
              </a>
            ))}
          </div>
        </ReadingSectionBlock>

        <ReadingSectionBlock
          id="local"
          locale={locale}
          kicker={isKo(locale) ? "02 · 지역성" : "02 · Local context"}
          title={isKo(locale) ? "사건은 지역 이름보다 사실과 증거로 결정됩니다." : "Local context is useful when it helps preserve the right evidence."}
          intro={isKo(locale)
            ? "사고 장소, 도로, 관할기관, 치료 동선과 보험 문제는 사건 준비에 실제 영향을 줄 수 있습니다."
            : "The scene, roadway or property, responding agency, nearby cameras, treatment path, county, and available insurance can all shape how an injury claim is documented. That is why each local page focuses on practical facts instead of repeating the same city description."}
        >
          <div className="grid border-y border-[#1E1C1A]/12 md:grid-cols-3">
            {[MapPin, Route, ShieldCheck].map((Icon, index) => (
              <div key={index} className="border-b border-[#1E1C1A]/12 py-6 md:border-b-0 md:border-l md:px-6 md:first:border-l-0 md:first:pl-0">
                <Icon className="h-4 w-4 stroke-[1.3] text-[#381907]" />
                <h3 style={serifStyle(locale)} className="mt-9 text-[1.35rem]">
                  {isKo(locale) ? ["사고 장소", "이동·치료", "보험·책임"][index] : ["Exact incident location", "Treatment & records", "Coverage & responsibility"][index]}
                </h3>
                <p className="mt-3 text-[11px] leading-5 text-[#1E1C1A]/48">
                  {isKo(locale) ? ["사고가 발생한 정확한 위치와 관련 기록을 확인합니다.", "치료 과정과 이동, 의료기록을 정리합니다.", "적용 가능한 보험과 책임 관계를 확인합니다."][index] : ["Pin down the roadway, intersection, business, property, or other place where evidence may exist.", "Keep treatment, medical records, expenses, work loss, and recovery information organized.", "Identify the drivers, owners, businesses, employers, policies, and other relationships that may matter."][index]}
                </p>
              </div>
            ))}
          </div>
        </ReadingSectionBlock>

        <ReadingSectionBlock
          id="visit"
          locale={locale}
          kicker={isKo(locale) ? "03 · 상담" : "03 · Consultation"}
          title={isKo(locale) ? "현재 상황부터 설명해 주세요." : "You do not need every record before starting the conversation."}
          intro={isKo(locale) ? "사고 장소, 날짜, 치료 상황과 현재 가지고 있는 보험 또는 사고 관련 문서를 알려주시면 됩니다." : "The accident location and date, current treatment, insurance information, photos, reports, and any communication you already have are enough to begin. The legal team can help identify what else may be worth preserving."}
        />
      </ReadingLayout>
      <ConsultationCta locale={locale} />
    </main>
  </EditorialFrame>
);

export const LocationDetailPage = ({ locale }: { locale: SiteLocale }) => {
  const params = useParams({ strict: false }) as { slug?: string };
  const location = params.slug ? getServiceLocation(params.slug) : undefined;
  if (!location) return null;

  const name = isKo(locale) ? location.koName : location.name;
  const description = isKo(locale) ? location.koDescription : location.description;
  const statLabel = isKo(locale) ? `${location.ots.year} 교통안전 통계` : `${location.ots.year} California OTS collision data`;
  const resource = locationResources[location.slug];
  // Per-city collision profile, derived from that city's own OTS numbers, so
  // the sections below say something only true of this city.
  const vulnerable = [
    { label: isKo(locale) ? "보행자" : "pedestrians", n: location.ots.pedestrians },
    { label: isKo(locale) ? "자전거" : "people on bicycles", n: location.ots.bicyclists },
    { label: isKo(locale) ? "오토바이" : "motorcycle riders", n: location.ots.motorcycles },
  ].sort((a, b) => b.n - a.n);
  const hitRunShare = Math.round((location.ots.hitRun / location.ots.total) * 100);
  const isBuenaPark = location.slug === "buena-park";
  const heroTitle = isKo(locale)
    ? (isBuenaPark ? "부에나파크 사고·상해 가이드" : `${name} 개인상해 변호사`)
    : (isBuenaPark ? "Buena Park Accident & Injury Guide" : `${name} Personal Injury Lawyers`);

  return (
    <EditorialFrame locale={locale}>
      <main className="detail-guide">
        <EditorialHero
          locale={locale}
          eyebrow={isKo(locale) ? "서비스 지역" : `${location.county} · Service area`}
          title={heroTitle}
          description={isBuenaPark && !isKo(locale) ? "A practical local guide to Buena Park collision data, accident records, evidence preservation, California deadlines, and the injury matters handled from the firm's Buena Park office." : description}
          image={heroJustice}
        />
        <div className="site-shell pt-8"><PageByline locale={locale} /></div>
        <ClaimJourney locale={locale} subject={name} guideId="overview" contextImage={cityImages[location.slug]} />
        <GuideAttorney locale={locale} />
        <ReadingLayout
          locale={locale}
          label={`${name} · ${isKo(locale) ? "지역 안내" : "Local injury guide"}`}
          sections={isKo(locale)
            ? [
                { id: "overview", label: "지역 안내" }, { id: "data", label: "교통사고 통계" }, { id: "records", label: "지역 기록" },
                { id: "cases", label: "사건 유형" }, { id: "evidence", label: "증거" }, { id: "deadlines", label: "기한" },
                { id: "faq", label: "자주 묻는 질문" }, { id: "nearby", label: "인근 지역" },
              ]
            : [
                { id: "overview", label: "Local overview" }, { id: "data", label: "Local collision data" }, { id: "records", label: "Local records & agencies" },
                { id: "cases", label: "Matters handled" }, { id: "evidence", label: "Evidence to preserve" }, { id: "deadlines", label: "California deadlines" },
                { id: "faq", label: "Local claim questions" }, { id: "nearby", label: "Nearby communities" },
              ]}
        >
          <ReadingSectionBlock
            id="overview"
            locale={locale}
            kicker={isKo(locale) ? "01 · 지역" : "01 · Local overview"}
            title={isKo(locale) ? `${name}에서 사고가 발생했다면` : `If an accident happened in or around ${name}.`}
            intro={isKo(locale) ? description : location.localIntro}
          >
            <div className="editorial-callout">
              <span className="editorial-callout__label">{isKo(locale) ? "중요" : "Useful to know"}</span>
              <p>{isKo(locale) ? "사고 장소의 사진, 경찰 또는 사고 보고서 정보, 치료 기록과 보험 관련 연락을 가능한 한 함께 보관하세요." : `${name} is in ${location.county}. Keep the exact incident location, scene photos, police or incident-report information, treatment records, and insurance communications together when possible.`}</p>
            </div>
          </ReadingSectionBlock>

          <ReadingSectionBlock
            id="data"
            locale={locale}
            kicker={isKo(locale) ? "02 · 데이터" : "02 · Local data"}
            title={isKo(locale) ? statLabel : `${name} collision injuries in context.`}
            intro={isKo(locale) ? "California Office of Traffic Safety의 도시별 통계는 지역에서 발생한 교통사고의 규모를 이해하는 데 참고가 됩니다." : `California's Office of Traffic Safety reported ${location.ots.total.toLocaleString()} people killed or injured in traffic collisions in ${name} in ${location.ots.year}. The same dataset recorded ${location.ots.motorcycles} motorcycle victims, ${location.ots.pedestrians} pedestrian victims, and ${location.ots.bicyclists} bicyclist victims. These citywide numbers do not predict any individual case; they provide local safety context.`}
          >
            <div className="grid border-y border-[#1E1C1A]/12 sm:grid-cols-3">
              <div className="py-6 sm:pr-6"><div className="editorial-serif text-[2.1rem]">{location.ots.total.toLocaleString()}</div><div className="mt-2 text-[10px] text-[#1E1C1A]/46">{isKo(locale) ? "사망·부상 피해자" : "Killed or injured victims"}</div></div>
              <div className="border-t border-[#1E1C1A]/12 py-6 sm:border-l sm:border-t-0 sm:px-6"><div className="editorial-serif text-[2.1rem]">{location.ots.speed}</div><div className="mt-2 text-[10px] text-[#1E1C1A]/46">{isKo(locale) ? "과속 관련 사고" : "Speed-related fatal/injury collisions"}</div></div>
              <div className="border-t border-[#1E1C1A]/12 py-6 sm:border-l sm:border-t-0 sm:pl-6"><div className="editorial-serif text-[2.1rem]">{location.ots.hitRun}</div><div className="mt-2 text-[10px] text-[#1E1C1A]/46">{isKo(locale) ? "뺑소니 관련 사고" : "Hit-and-run fatal/injury collisions"}</div></div>
            </div>
            <a href={location.ots.source} target="_blank" rel="noreferrer" className="editorial-inline-link mt-5"><span>{isKo(locale) ? "California OTS 데이터 보기" : "View the California OTS city data"}</span><ArrowRight className="h-4 w-4" /></a>
          </ReadingSectionBlock>

          <ReadingSectionBlock
            id="records"
            locale={locale}
            kicker={isKo(locale) ? "03 · 지역 기록" : "03 · Local records"}
            title={isKo(locale) ? "사고 기록은 정확한 관할기관에서 시작됩니다." : `Official local resources for an incident in ${name}.`}
            intro={isKo(locale) ? "사고가 발생한 정확한 위치와 사건 유형에 따라 신고·기록 기관이 달라질 수 있습니다. 아래 링크는 지역 확인을 시작하기 위한 공식 자료입니다." : `The responding agency and the court that may ultimately matter depend on the exact scene, parties, and type of claim. These official resources are a practical starting point for locating reports and understanding the county system; they are not a statement that every ${name} claim is handled by one specific court.`}
          >
            <div className="grid border-y border-[#1E1C1A]/12 md:grid-cols-2">
              <a href={resource.agencyHref} target="_blank" rel="noreferrer" className="group border-b border-[#1E1C1A]/12 py-6 md:border-b-0 md:pr-7">
                <div className="text-[9px] font-semibold uppercase tracking-[0.14em] text-[#1E1C1A]/34">{isKo(locale) ? "경찰·기록" : "Police / records"}</div>
                <div className="mt-5 flex items-center justify-between gap-4 text-[13px]"><span>{resource.agency}</span><ArrowRight className="h-3.5 w-3.5 shrink-0 transition-transform group-hover:translate-x-1" /></div>
              </a>
              <a href={resource.courtHref} target="_blank" rel="noreferrer" className="group py-6 md:border-l md:border-[#1E1C1A]/12 md:pl-7">
                <div className="text-[9px] font-semibold uppercase tracking-[0.14em] text-[#1E1C1A]/34">{isKo(locale) ? "카운티 법원" : "County court resource"}</div>
                <div className="mt-5 flex items-center justify-between gap-4 text-[13px]"><span>{resource.court}</span><ArrowRight className="h-3.5 w-3.5 shrink-0 transition-transform group-hover:translate-x-1" /></div>
              </a>
            </div>
          </ReadingSectionBlock>

          <ReadingSectionBlock
            id="cases"
            locale={locale}
            kicker={isKo(locale) ? "04 · 사건" : "04 · Matters"}
            title={isKo(locale) ? "지역보다 사건 유형과 증거가 더 중요합니다." : `What we see most often in ${name}.`}
            intro={isKo(locale)
              ? "자동차·트럭·오토바이 사고, 보행자 사고, 승차공유 사고, 낙상과 중대 상해 등 다양한 개인상해 문제를 검토할 수 있습니다."
              : `Of the ${location.ots.total.toLocaleString()} collisions reported in ${name} in ${location.ots.year}, ${vulnerable[0].n} involved ${vulnerable[0].label} and ${vulnerable[1].n} involved ${vulnerable[1].label}. Around ${hitRunShare}% were hit-and-run. We handle all of those, plus truck, rideshare, slip and fall, wrongful death and serious injury claims. Which one you have matters far more than which city you live in.`}
          >
            <a href={`${localePrefix(locale)}/practice-areas`} className="editorial-inline-link"><span>{isKo(locale) ? "업무 분야 보기" : "View personal injury practice areas"}</span><ArrowRight className="h-4 w-4" /></a>
          </ReadingSectionBlock>

          <ReadingSectionBlock
            id="evidence"
            locale={locale}
            kicker={isKo(locale) ? "05 · 증거" : "05 · Evidence"}
            title={isKo(locale) ? "지역 기록과 사고 기록을 함께 보관하세요." : `Useful records after an accident in ${name}.`}
            intro={isKo(locale) ? "현장 사진, 영상, 신고 또는 사고 보고서, 목격자, 치료 기록과 보험사 연락 내용을 가능한 한 함께 정리해 두는 것이 좋습니다." : "Preserve scene photos and video, the exact location, responding-agency or incident-report information, witness details, vehicle or property information, medical records, bills, missed-work documentation, and insurance communications. If nearby cameras may have recorded the event, identifying them early can matter."}
          ><EvidenceVisuals locale={locale} /></ReadingSectionBlock>

          <ReadingSectionBlock
            id="deadlines"
            locale={locale}
            kicker={isKo(locale) ? "06 · 기한" : "06 · California deadlines"}
            title={isKo(locale) ? "사고 장소와 상대방에 따라 기한이 달라질 수 있습니다." : `${name} sits in ${location.county}, and that decides more than you would think.`}
            intro={isKo(locale) ? "캘리포니아의 많은 개인상해 소송에는 일반적으로 2년의 제소 기한이 적용되지만 공공기관 관련 청구는 더 짧은 사전 청구 절차가 적용될 수 있습니다. 사건별 기한을 실제 사실관계에서 확인하는 것이 중요합니다." : `California generally gives you two years from the injury to file. Claims against a city or other public agency are the trap. Those can need written notice in a matter of months, not years. And if a lawsuit does get filed for a ${name} accident, it goes to ${resource?.court ?? "the county superior court"}, not wherever you happen to live. Check the real deadline against your own facts rather than assuming the two-year rule covers you.`}
          >
            <a href="https://selfhelp.courts.ca.gov/civil-lawsuit/statute-limitations" target="_blank" rel="noreferrer" className="editorial-inline-link"><span>{isKo(locale) ? "California Courts 기한 안내" : "California Courts · Statutes of limitations"}</span><ArrowRight className="h-4 w-4" /></a>
          </ReadingSectionBlock>

          <ReadingSectionBlock
            id="faq"
            locale={locale}
            kicker={isKo(locale) ? "07 · 질문" : "07 · Local claim questions"}
            title={isKo(locale) ? `${name} 사고 이후 자주 묻는 질문` : `Practical questions after an accident in ${name}.`}
          >
            <div className="border-t border-[#1E1C1A]/12">
              {[
                [isKo(locale) ? "사고가 이 도시에서 났지만 저는 다른 곳에 살아도 괜찮나요?" : `What if the accident happened in ${name}, but I live somewhere else?`, isKo(locale) ? "거주지가 다르다고 해서 사고 기록이나 청구가 사라지는 것은 아닙니다. 사고 장소, 책임 당사자, 보험, 관할과 적용 법률을 함께 확인해야 합니다." : "That is common. The useful questions are where the incident happened, where the defendants live or do business, which agency documented it, what insurance applies, and which court or venue rules may matter."],
                [isKo(locale) ? "어느 경찰서나 기관에서 기록을 받아야 하나요?" : `Who has the report for a ${name} accident?`, isKo(locale) ? "정확한 사고 지점이 중요합니다. 도시 경찰, 보안관, CHP 또는 다른 기관이 관할할 수 있으므로 사고 당시 받은 사건번호나 담당기관 정보를 먼저 확인하세요." : `Usually ${resource?.agency ?? "the local police department"}, if it happened on a city street. On a freeway it is more likely CHP, and on private property there may only be an incident report the business wrote itself. Start with whatever report number you were given at the scene. That number is what everyone else will ask you for.`],
                [isKo(locale) ? "지역 변호사를 꼭 선임해야 하나요?" : `Do I need a lawyer based in ${name}?`, isKo(locale) ? "도시 이름만으로 변호사를 선택할 필요는 없습니다. 캘리포니아 자격, 사건 유형 경험, 지역 절차 이해, 소통 방식과 실제 사건을 처리할 능력을 함께 보는 것이 더 중요합니다." : `No, and a city name is a poor way to choose one. What actually matters is California licensure, real experience with your type of claim, and knowing how ${location.county} handles these. Our office is in Buena Park, so ${name} is a short drive either way.`],
              ].map(([question, answer], index) => (
                <div key={question} className="border-b border-[#1E1C1A]/12 py-6"><div className="flex gap-4"><span className="text-[10px] text-[#1E1C1A]/30">0{index + 1}</span><div><h3 style={serifStyle(locale)} className="text-[1.25rem] leading-tight">{question}</h3><p className="mt-3 max-w-[720px] text-[12px] leading-6 text-[#1E1C1A]/54">{answer}</p></div></div></div>
              ))}
            </div>
          </ReadingSectionBlock>

          <ReadingSectionBlock
            id="nearby"
            locale={locale}
            kicker={isKo(locale) ? "08 · 인근" : "08 · Nearby"}
            title={isKo(locale) ? "인근 서비스 지역" : "Nearby communities served."}
          >
            <div className="editorial-link-grid">
              {serviceLocations.filter((item) => item.slug !== location.slug).slice(0, 4).map((item) => (
                <a key={item.slug} href={`${localePrefix(locale)}/locations/${item.slug}`} className="editorial-link-card">
                  <div className="editorial-link-card__top"><span>→</span><ArrowRight className="h-3.5 w-3.5" /></div>
                  <h3 style={serifStyle(locale)}>{isKo(locale) ? item.koName : item.name}</h3>
                  <p>{isKo(locale) ? item.koDescription : item.description}</p>
                </a>
              ))}
            </div>
          </ReadingSectionBlock>
        </ReadingLayout>
        <ClientProof locale={locale} city={isKo(locale) ? location.koName : location.name} />
        <ConsultationCta locale={locale} />
      </main>
    </EditorialFrame>
  );
};
