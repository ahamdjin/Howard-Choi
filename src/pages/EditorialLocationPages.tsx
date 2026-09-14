import { ArrowRight, MapPin, Route, ShieldCheck } from "lucide-react";
import { useParams } from "@tanstack/react-router";
import heroBoardroom from "@/assets/law-firm/hero-city-boardroom.webp";
import heroJustice from "@/assets/law-firm/hero-justice-library.webp";
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

export const LocationsPage = ({ locale }: { locale: SiteLocale }) => (
  <EditorialFrame locale={locale}>
    <main>
      <EditorialHero
        locale={locale}
        eyebrow={isKo(locale) ? "서비스 지역" : "Personal injury service areas"}
        title={isKo(locale) ? "Buena Park를 중심으로 인근 지역까지." : "Personal injury lawyers serving Buena Park and nearby communities."}
        description={isKo(locale)
          ? "Buena Park와 인근 Orange County·Los Angeles County 경계 지역의 사고·개인상해 사건을 지원합니다."
          : "The firm is based in Buena Park and serves injured people across nearby North Orange County and Los Angeles County communities. Each local guide explains the accident context, evidence, and practical information that can matter after an injury."}
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

  return (
    <EditorialFrame locale={locale}>
      <main>
        <EditorialHero
          locale={locale}
          eyebrow={isKo(locale) ? "서비스 지역" : `${location.county} · Service area`}
          title={isKo(locale) ? `${name} 개인상해 변호사` : `${name} Personal Injury Lawyers`}
          description={description}
          image={heroJustice}
        />
        <ReadingLayout
          locale={locale}
          label={`${name} · ${isKo(locale) ? "지역 안내" : "Local injury guide"}`}
          sections={isKo(locale)
            ? [{ id: "overview", label: "지역 안내" }, { id: "data", label: "교통사고 통계" }, { id: "cases", label: "사건 유형" }, { id: "evidence", label: "증거" }, { id: "prepare", label: "상담 준비" }, { id: "nearby", label: "인근 지역" }]
            : [{ id: "overview", label: "Local overview" }, { id: "data", label: "Local collision data" }, { id: "cases", label: "Matters handled" }, { id: "evidence", label: "Evidence to preserve" }, { id: "prepare", label: "Prepare for a consultation" }, { id: "nearby", label: "Nearby communities" }]}
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
            id="cases"
            locale={locale}
            kicker={isKo(locale) ? "03 · 사건" : "03 · Matters"}
            title={isKo(locale) ? "지역보다 사건 유형과 증거가 더 중요합니다." : `Personal injury matters we review for people in ${name}.`}
            intro={isKo(locale) ? "자동차·트럭·오토바이 사고, 보행자 사고, 승차공유 사고, 낙상과 중대 상해 등 다양한 개인상해 문제를 검토할 수 있습니다." : "The firm reviews car, truck, motorcycle, pedestrian, rideshare, premises-liability, wrongful-death, and serious-injury matters. The right approach depends on the actual accident, available evidence, responsible parties, insurance, and medical consequences—not the city name alone."}
          >
            <a href={`${localePrefix(locale)}/practice-areas`} className="editorial-inline-link"><span>{isKo(locale) ? "업무 분야 보기" : "View personal injury practice areas"}</span><ArrowRight className="h-4 w-4" /></a>
          </ReadingSectionBlock>

          <ReadingSectionBlock
            id="evidence"
            locale={locale}
            kicker={isKo(locale) ? "04 · 증거" : "04 · Evidence"}
            title={isKo(locale) ? "지역 기록과 사고 기록을 함께 보관하세요." : `Useful records after an accident in ${name}.`}
            intro={isKo(locale) ? "현장 사진, 영상, 신고 또는 사고 보고서, 목격자, 치료 기록과 보험사 연락 내용을 가능한 한 함께 정리해 두는 것이 좋습니다." : "Preserve scene photos and video, the exact location, responding-agency or incident-report information, witness details, vehicle or property information, medical records, bills, missed-work documentation, and insurance communications. If nearby cameras may have recorded the event, identifying them early can matter."}
          />

          <ReadingSectionBlock
            id="prepare"
            locale={locale}
            kicker={isKo(locale) ? "05 · 준비" : "05 · Prepare"}
            title={isKo(locale) ? "상담 전에 완벽한 파일이 필요하지는 않습니다." : "A useful consultation can start with a simple timeline."}
            intro={isKo(locale) ? "사고 일시와 장소, 치료 상황, 상대방 또는 보험사의 연락 내용, 현재 가지고 있는 사진과 문서부터 준비하면 됩니다." : `Write down when and where the incident happened in ${name}, what treatment you have received, any time missed from work, the insurers or businesses that have contacted you, and the documents already in your possession. That is enough to identify the next records or deadlines that may matter.`}
          />

          <ReadingSectionBlock
            id="nearby"
            locale={locale}
            kicker={isKo(locale) ? "06 · 인근" : "06 · Nearby"}
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
        <ConsultationCta locale={locale} />
      </main>
    </EditorialFrame>
  );
};
