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
        eyebrow={isKo(locale) ? "서비스 지역" : "Locations served"}
        title={isKo(locale) ? "Buena Park를 중심으로 인근 지역까지." : "Local injury counsel, centered in Buena Park."}
        description={isKo(locale)
          ? "Buena Park와 인근 Orange County·Los Angeles County 경계 지역의 사고·개인상해 사건을 지원합니다."
          : "Serving Buena Park and nearby communities across North Orange County and the Los Angeles County line for accident and personal-injury matters."}
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
          title={isKo(locale) ? "가까운 지역 페이지에서 시작하세요." : "Start with the community closest to you."}
          intro={isKo(locale)
            ? "각 지역 페이지는 해당 지역에서 사고 이후 확인해야 할 일반적인 문제와 상담 시작 방법을 정리합니다."
            : "Each location page gives a focused overview of how the firm serves that community and what information is useful when starting an injury consultation."}
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
          title={isKo(locale) ? "사건은 지역 이름보다 사실과 증거로 결정됩니다." : "The city matters less than the facts — but local context still helps."}
          intro={isKo(locale)
            ? "사고 장소, 도로, 교차로, 관할기관, 치료 동선과 보험 문제는 사건 준비에 실제 영향을 줄 수 있습니다."
            : "The location of the collision, roadway, responding agency, treatment pattern, and available insurance can all shape how a claim is documented and developed."}
        >
          <div className="grid border-y border-[#1E1C1A]/12 md:grid-cols-3">
            {[MapPin, Route, ShieldCheck].map((Icon, index) => (
              <div key={index} className="border-b border-[#1E1C1A]/12 py-6 md:border-b-0 md:border-l md:px-6 md:first:border-l-0 md:first:pl-0">
                <Icon className="h-4 w-4 stroke-[1.3] text-[#381907]" />
                <h3 style={serifStyle(locale)} className="mt-9 text-[1.35rem]">
                  {isKo(locale) ? ["사고 장소", "이동·치료", "보험·책임"][index] : ["Incident location", "Treatment & travel", "Coverage & responsibility"][index]}
                </h3>
              </div>
            ))}
          </div>
        </ReadingSectionBlock>

        <ReadingSectionBlock
          id="visit"
          locale={locale}
          kicker={isKo(locale) ? "03 · 상담" : "03 · Consultation"}
          title={isKo(locale) ? "현재 상황부터 설명해 주세요." : "Start with what happened and where things stand now."}
          intro={isKo(locale) ? "사고 장소, 날짜, 치료 상황과 현재 가지고 있는 보험 또는 사고 관련 문서를 알려주시면 됩니다." : "The incident location and date, current treatment, insurance information, and any documents or photos you already have are enough to begin the conversation."}
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

  return (
    <EditorialFrame locale={locale}>
      <main>
        <EditorialHero
          locale={locale}
          eyebrow={isKo(locale) ? "서비스 지역" : "Location"}
          title={`${name}${isKo(locale) ? " 개인상해 상담" : " injury counsel"}`}
          description={description}
          image={heroJustice}
        />
        <ReadingLayout
          locale={locale}
          label={`${name} · ${isKo(locale) ? "지역 안내" : "Local guide"}`}
          sections={isKo(locale)
            ? [{ id: "overview", label: "지역 안내" }, { id: "cases", label: "사건 유형" }, { id: "prepare", label: "상담 준비" }, { id: "nearby", label: "인근 지역" }]
            : [{ id: "overview", label: "Local overview" }, { id: "cases", label: "Matters handled" }, { id: "prepare", label: "Prepare for a consultation" }, { id: "nearby", label: "Nearby communities" }]}
        >
          <ReadingSectionBlock
            id="overview"
            locale={locale}
            kicker={isKo(locale) ? "01 · 지역" : "01 · Local overview"}
            title={isKo(locale) ? `${name}에서 사고가 발생했다면` : `If an accident happened in or around ${name}.`}
            intro={description}
          >
            <div className="editorial-callout">
              <span className="editorial-callout__label">{isKo(locale) ? "중요" : "Useful to know"}</span>
              <p>{isKo(locale) ? "사고 장소의 사진, 경찰 또는 사고 보고서 정보, 치료 기록과 보험 관련 연락을 가능한 한 함께 보관하세요." : "Keep scene photos, police or incident-report information, treatment records, and insurance communications together when possible."}</p>
            </div>
          </ReadingSectionBlock>

          <ReadingSectionBlock
            id="cases"
            locale={locale}
            kicker={isKo(locale) ? "02 · 사건" : "02 · Matters"}
            title={isKo(locale) ? "지역보다 사건 유형과 증거가 더 중요합니다." : "The claim is still built around the type of accident and the evidence."}
            intro={isKo(locale) ? "자동차·트럭·오토바이 사고, 보행자 사고, 승차공유 사고, 낙상과 중대 상해 등 다양한 개인상해 문제를 검토할 수 있습니다." : "The firm reviews car, truck, motorcycle, pedestrian, rideshare, premises-liability, wrongful-death, and serious-injury matters depending on the facts."}
          >
            <a href={`${localePrefix(locale)}/practice-areas`} className="editorial-inline-link"><span>{isKo(locale) ? "업무 분야 보기" : "View practice areas"}</span><ArrowRight className="h-4 w-4" /></a>
          </ReadingSectionBlock>

          <ReadingSectionBlock
            id="prepare"
            locale={locale}
            kicker={isKo(locale) ? "03 · 준비" : "03 · Prepare"}
            title={isKo(locale) ? "상담 전에 완벽한 파일이 필요하지는 않습니다." : "You do not need a perfect file before reaching out."}
            intro={isKo(locale) ? "사고 일시와 장소, 치료 상황, 상대방 또는 보험사의 연락 내용, 현재 가지고 있는 사진과 문서부터 준비하면 됩니다." : "Start with the date and place of the incident, current treatment, any communication from the other party or insurer, and the photos or documents already in your possession."}
        />

          <ReadingSectionBlock
            id="nearby"
            locale={locale}
            kicker={isKo(locale) ? "04 · 인근" : "04 · Nearby"}
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
