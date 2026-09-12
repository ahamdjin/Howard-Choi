import { useParams } from "@tanstack/react-router";
import { Camera, FileText, MapPin, Scale, ShieldCheck } from "lucide-react";
import {
  LocationDetailPage as RichLocationDetailPage,
  LocationsPage as RichLocationsPage,
} from "@/pages/RichSEOLocationPages";
import {
  CaliforniaBasics,
  DeepCard,
  DeepPageShell,
  DeepSectionTitle,
} from "@/pages/DeepSEOShared";
import { getServiceLocation, type SiteLocale } from "@/data/injurySite";

const isKo = (locale: SiteLocale) => locale === "ko";
const serif = (locale: SiteLocale) => (isKo(locale) ? { fontFamily: '"Noto Serif KR", serif' } : undefined);

const countyFor = (slug?: string) => ["cerritos", "la-mirada"].includes(slug || "") ? "Los Angeles County" : "Orange County";

const LocalDepth = ({ locale, slug, name }: { locale: SiteLocale; slug?: string; name?: string }) => {
  const county = countyFor(slug);
  const items = isKo(locale) ? [
    [MapPin, "장소와 관할", `${name || "이 지역"}의 사고는 장소와 당사자에 따라 관할과 절차가 달라질 수 있습니다. ${county === "Orange County" ? "이 도시는 Orange County에 있습니다." : "이 도시는 Los Angeles County에 있습니다."}`],
    [Camera, "현장 자료", "교차로·도로 상태, 차량 위치, 주차장이나 사업장의 영상, 사진과 목격자 정보가 사고 경위를 설명하는 데 도움이 될 수 있습니다."],
    [ShieldCheck, "공공기관 관련 가능성", "도로, 신호, 공공 차량 또는 정부기관이 책임 문제에 포함될 수 있다면 일반적인 개인상해 사건보다 더 빠른 청구 절차가 적용될 수 있습니다."],
    [FileText, "지역성보다 중요한 기록", "사고가 어느 도시에서 일어났든 의료 기록, 보험 자료, 소득 손실과 일상생활의 변화가 사건의 실제 영향을 설명하는 핵심 자료가 될 수 있습니다."],
  ] : [
    [MapPin, "Place, county, and venue", `An accident in ${name || "the area"} can raise venue and procedure questions that depend on where the injury happened and who the parties are. ${name || "This city"} is in ${county}.`],
    [Camera, "Local scene evidence", "Intersection or roadway conditions, vehicle positions, parking-lot or business surveillance, photographs, and nearby witnesses can sometimes help explain how an accident happened."],
    [ShieldCheck, "When a public entity may be involved", "If a roadway condition, signal, public vehicle, or government agency is part of the liability picture, a much shorter government-claim process may apply before an ordinary lawsuit."],
    [FileText, "The records that travel with the case", "No matter which city the accident happened in, medical records, insurance documents, income loss, and day-to-day limitations can be central to showing the actual impact of an injury."],
  ] as const;

  return (
    <section className="bg-[#F9F8F6] py-18 md:py-24">
      <div className="site-shell">
        <DeepSectionTitle
          locale={locale}
          label={isKo(locale) ? "지역 맥락" : "Local context that actually matters"}
          title={isKo(locale) ? "좋은 지역 페이지는 도시 이름만 반복하지 않고, 사고 장소가 사건에 어떤 의미를 가질 수 있는지 설명합니다." : "A useful location page should explain why place can matter without turning into generic city-name SEO copy."}
          body={isKo(locale) ? "도로 이름이나 지역 통계를 억지로 늘리는 대신, 관할, 증거 위치, 공공기관 가능성과 치료·보험 기록처럼 실제 사건에 연결되는 정보를 중심으로 구성했습니다." : "Instead of padding the page with generic city facts, the content focuses on venue, where evidence may exist, public-entity issues, and the medical and insurance records that follow the claim."}
        />
        <div className="mt-10 grid gap-4 md:grid-cols-2 xl:grid-cols-4">
          {items.map(([Icon, title, body], index) => {
            const IconCmp = Icon as typeof MapPin;
            return (
              <DeepCard key={String(title)} className="p-6">
                <div className="flex items-center justify-between"><IconCmp className="h-4 w-4 stroke-[1.3] text-[#381907]" /><span className="text-[9px] text-[#1E1C1A]/25">0{index + 1}</span></div>
                <h3 style={serif(locale)} className="mt-8 text-[1.35rem] leading-[1.08]">{String(title)}</h3>
                <p className="mt-4 text-[11px] leading-6 text-[#1E1C1A]/52">{String(body)}</p>
              </DeepCard>
            );
          })}
        </div>
      </div>
    </section>
  );
};

const LocationNetworkDepth = ({ locale }: { locale: SiteLocale }) => {
  const items = isKo(locale) ? [
    [MapPin, "사고가 난 장소", "사고 위치는 사진·영상·목격자·보고서가 어디에 있을지, 어떤 관할이 문제될지 파악하는 출발점이 됩니다."],
    [Scale, "사고 유형", "같은 도시에서도 자동차, 보행자, 낙상, 승차공유 또는 중상 사건은 증거와 보험 구조가 완전히 다를 수 있습니다."],
    [ShieldCheck, "보험과 책임 당사자", "운전자, 차량 소유자, 고용주, 사업장 또는 다른 당사자가 관련될 수 있어 도시 이름보다 책임 구조가 더 중요할 수 있습니다."],
    [FileText, "지역 페이지의 역할", "각 지역 페이지는 그 도시의 맥락과 업무 분야를 연결하고, 실제 사무실과 담당 변호사로 다시 이어지도록 설계했습니다."],
  ] : [
    [MapPin, "Where the event happened", "Location is the starting point for identifying possible video, witnesses, reports, and the county or venue questions that may follow."],
    [Scale, "What kind of accident it was", "A car crash, pedestrian collision, premises claim, rideshare case, or serious-injury matter can require a very different evidence and insurance analysis even in the same city."],
    [ShieldCheck, "Who and what coverage may be responsible", "A driver, vehicle owner, employer, property owner, business, or other party may matter. The responsibility structure is usually more important than repeating the city name."],
    [FileText, "What a location page should do", "Each city page should connect local context to the relevant injury work, the real Buena Park office, and the attorney handling the matter rather than acting as a thin SEO doorway."],
  ] as const;

  return (
    <section className="bg-[#F9F8F6] py-18 md:py-24">
      <div className="site-shell">
        <DeepSectionTitle locale={locale} label={isKo(locale) ? "서비스 지역을 이해하는 방법" : "What a service area means"} title={isKo(locale) ? "지역 페이지는 복사본이 아니라, 사고와 실제 법률 업무를 연결하는 진입점이어야 합니다." : "Location pages should be useful entry points, not copies with a different city name."} />
        <div className="mt-10 grid gap-4 md:grid-cols-2 xl:grid-cols-4">
          {items.map(([Icon, title, body], index) => {
            const IconCmp = Icon as typeof MapPin;
            return <DeepCard key={String(title)} className="p-6"><div className="flex items-center justify-between"><IconCmp className="h-4 w-4 stroke-[1.3] text-[#381907]" /><span className="text-[9px] text-[#1E1C1A]/25">0{index + 1}</span></div><h3 style={serif(locale)} className="mt-8 text-[1.35rem] leading-tight">{String(title)}</h3><p className="mt-4 text-[11px] leading-6 text-[#1E1C1A]/52">{String(body)}</p></DeepCard>;
          })}
        </div>
      </div>
    </section>
  );
};

export const LocationsPage = ({ locale }: { locale: SiteLocale }) => (
  <DeepPageShell locale={locale} base={<RichLocationsPage locale={locale} />}>
    <LocationNetworkDepth locale={locale} />
    <CaliforniaBasics locale={locale} />
  </DeepPageShell>
);

export const LocationDetailPage = ({ locale }: { locale: SiteLocale }) => {
  const params = useParams({ strict: false }) as { slug?: string };
  const location = params.slug ? getServiceLocation(params.slug) : undefined;
  const name = location ? (isKo(locale) ? location.koName : location.name) : undefined;

  return (
    <DeepPageShell locale={locale} base={<RichLocationDetailPage locale={locale} />}>
      <LocalDepth locale={locale} slug={params.slug} name={name} />
      <CaliforniaBasics locale={locale} />
    </DeepPageShell>
  );
};
