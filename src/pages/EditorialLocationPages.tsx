import { ArrowRight, Building2, FileText, MapPin, Phone, Scale, ShieldCheck } from "lucide-react";
import { useParams } from "@tanstack/react-router";
import heroBoardroom from "@/assets/law-firm/hero-city-boardroom.webp";
import heroJustice from "@/assets/law-firm/hero-justice-library.webp";
import { brand, getServiceLocation, practiceAreas, serviceLocations, type SiteLocale } from "@/data/injurySite";
import { EditorialFrame, isKo, localePrefix } from "./editorial/shared";

const locationResources: Record<string, { agency: string; agencyHref: string; court: string; courtHref: string }> = {
  "buena-park": { agency: "Buena Park Police Department", agencyHref: "https://www.bppd.com/", court: "Orange County Superior Court", courtHref: "https://www.occourts.org/" },
  fullerton: { agency: "Fullerton Police · Traffic Collision Reports", agencyHref: "https://www.cityoffullerton.com/government/departments/police/police-services/traffic-collision-report", court: "Orange County Superior Court", courtHref: "https://www.occourts.org/" },
  anaheim: { agency: "Anaheim Police · Records Bureau", agencyHref: "https://pd.anaheim.net/173/Records", court: "Orange County Superior Court", courtHref: "https://www.occourts.org/" },
  cerritos: { agency: "Los Angeles County Sheriff · Cerritos Station", agencyHref: "https://lasd.org/cerritos/", court: "Los Angeles Superior Court", courtHref: "https://www.lacourt.org/" },
  "la-mirada": { agency: "Los Angeles County Sheriff · Norwalk Station", agencyHref: "https://lasd.org/norwalk/", court: "Los Angeles Superior Court", courtHref: "https://www.lacourt.org/" },
  "la-habra": { agency: "La Habra Police · Operations & Services", agencyHref: "https://www.lahabraca.gov/396/Operations-Services", court: "Orange County Superior Court", courtHref: "https://www.occourts.org/" },
};

const SectionLabel = ({ children }: { children: React.ReactNode }) => (
  <div className="text-[10px] font-semibold uppercase tracking-[0.16em] text-black/40">{children}</div>
);

export const LocationsPage = ({ locale }: { locale: SiteLocale }) => {
  const ko = isKo(locale);
  const prefix = localePrefix(locale);
  return (
    <EditorialFrame locale={locale}>
      <main className="bg-[#f7f6f2] pt-24 text-[#171717] md:pt-28">
        <section className="site-shell grid min-h-[520px] overflow-hidden bg-[#171717] text-white lg:grid-cols-[0.88fr_1.12fr]">
          <div className="flex flex-col justify-end p-7 md:p-10 lg:p-12">
            <div className="text-[10px] font-semibold uppercase tracking-[0.16em] text-white/45">{ko ? "서비스 지역" : "Locations"}</div>
            <h1 className="editorial-serif mt-5 text-[clamp(2.8rem,5.5vw,5.6rem)] leading-[0.91] tracking-[-0.045em]">{ko ? "가까운 지역에서 시작하세요." : "Local help starts with where you are."}</h1>
            <p className="mt-6 max-w-[520px] text-[14px] leading-6 text-white/58">{ko ? "부에나파크를 중심으로 인근 오렌지카운티와 로스앤젤레스카운티 지역의 개인상해 사건을 지원합니다." : "Based in Buena Park and serving nearby North Orange County and Los Angeles County communities."}</p>
          </div>
          <div className="relative min-h-[320px]"><img src={heroBoardroom} alt="" className="absolute inset-0 h-full w-full object-cover opacity-72" /><div className="absolute inset-0 bg-black/18" /></div>
        </section>

        <section className="site-shell py-16 md:py-24">
          <div className="flex flex-col gap-5 md:flex-row md:items-end md:justify-between">
            <div><SectionLabel>{ko ? "지역 선택" : "Choose a location"}</SectionLabel><h2 className="editorial-serif mt-4 max-w-[720px] text-[clamp(2.2rem,4.5vw,4.3rem)] leading-[0.98] tracking-[-0.04em]">{ko ? "사고나 회복이 일어나고 있는 지역을 선택하세요." : "Choose the community closest to the accident or your recovery."}</h2></div>
            <a href={prefix + "/contact"} className="inline-flex items-center gap-2 text-[12px] font-semibold">{ko ? "상담 시작" : "Start a consultation"}<ArrowRight className="h-4 w-4" /></a>
          </div>

          <div className="mt-10 grid border-t border-black/12 sm:grid-cols-2 lg:grid-cols-3">
            {serviceLocations.map((location, index) => (
              <a key={location.slug} href={`${prefix}/locations/${location.slug}`} className="group min-h-[240px] border-b border-black/12 p-5 sm:border-r md:p-6">
                <div className="flex items-start justify-between text-[10px] text-black/34"><span>{String(index + 1).padStart(2, "0")}</span><ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" /></div>
                <MapPin className="mt-12 h-5 w-5 stroke-[1.4]" />
                <h3 className="editorial-serif mt-5 text-[2rem] leading-none tracking-[-0.035em]">{ko ? location.koName : location.name}</h3>
                <p className="mt-3 text-[11px] leading-5 text-black/46">{ko ? location.koDescription : location.description}</p>
              </a>
            ))}
          </div>
        </section>

        <section className="border-y border-black/8 bg-white py-16 md:py-20">
          <div className="site-shell grid gap-8 lg:grid-cols-[0.8fr_1.2fr] lg:gap-14">
            <div><SectionLabel>{ko ? "왜 지역 정보가 중요한가" : "Why local context matters"}</SectionLabel><h2 className="editorial-serif mt-4 text-[clamp(2rem,4vw,3.5rem)] leading-[0.98] tracking-[-0.035em]">{ko ? "지역 이름이 사건을 결정하지는 않지만, 증거를 찾는 데 도움이 됩니다." : "The city does not decide the claim. It can help you find the right evidence."}</h2></div>
            <div className="grid sm:grid-cols-3">
              {[
                [MapPin, ko ? "정확한 사고 장소" : "Exact location", ko ? "도로, 교차로, 사업장 또는 사고 장소를 정확히 확인합니다." : "Roadway, intersection, business, property, or other scene where evidence may exist."],
                [FileText, ko ? "기록과 기관" : "Records + agencies", ko ? "관할 경찰, 사고 기록 및 법원 정보를 확인합니다." : "The responding agency, collision records, and county court can depend on the exact scene."],
                [ShieldCheck, ko ? "보험과 책임" : "Coverage + responsibility", ko ? "관련 운전자, 사업체, 소유자 및 보험을 확인합니다." : "Drivers, owners, employers, businesses, and policies can all matter to the claim."],
              ].map(([Icon, title, body], index) => {
                const ItemIcon = Icon as typeof MapPin;
                return <div key={title as string} className={`border-t border-black/10 py-5 sm:border-l sm:border-t-0 sm:px-5 ${index === 0 ? "sm:border-l-0" : ""}`}><ItemIcon className="h-4 w-4 stroke-[1.4]" /><h3 className="mt-8 text-[14px] font-semibold">{title as string}</h3><p className="mt-3 text-[11px] leading-5 text-black/46">{body as string}</p></div>;
              })}
            </div>
          </div>
        </section>
      </main>
    </EditorialFrame>
  );
};

export const LocationDetailPage = ({ locale }: { locale: SiteLocale }) => {
  const params = useParams({ strict: false }) as { slug?: string };
  const location = params.slug ? getServiceLocation(params.slug) : undefined;
  if (!location) return null;

  const ko = isKo(locale);
  const prefix = localePrefix(locale);
  const name = ko ? location.koName : location.name;
  const resource = locationResources[location.slug];
  const isBuenaPark = location.slug === "buena-park";
  const title = ko ? `${name} 개인상해 변호사` : `${name} Personal Injury Lawyer`;

  return (
    <EditorialFrame locale={locale}>
      <main className="bg-[#f7f6f2] pt-24 text-[#171717] md:pt-28">
        <section className="site-shell grid min-h-[600px] overflow-hidden bg-[#171717] text-white lg:grid-cols-[0.9fr_1.1fr]">
          <div className="flex flex-col justify-end p-7 md:p-10 lg:p-12">
            <div className="text-[10px] font-semibold uppercase tracking-[0.16em] text-white/45">{location.county} · {ko ? "서비스 지역" : "Service area"}</div>
            <h1 className="editorial-serif mt-5 text-[clamp(2.8rem,5.5vw,5.8rem)] leading-[0.9] tracking-[-0.048em]">{title}</h1>
            <p className="mt-6 max-w-[540px] text-[14px] leading-6 text-white/58">{ko ? location.koDescription : location.localIntro}</p>
            <div className="mt-8 flex flex-wrap gap-3">
              <a href={prefix + "/contact"} className="inline-flex min-h-12 items-center gap-2 bg-white px-5 text-[11px] font-semibold text-black">{ko ? "무료 상담" : "Free Consultation"}<ArrowRight className="h-4 w-4" /></a>
              <a href={brand.phoneHref} className="inline-flex min-h-12 items-center gap-2 border border-white/20 px-5 text-[11px] font-semibold"><Phone className="h-4 w-4" />{brand.phoneDisplay}</a>
            </div>
          </div>
          <div className="relative min-h-[340px]"><img src={heroJustice} alt="" className="absolute inset-0 h-full w-full object-cover opacity-72" /><div className="absolute inset-0 bg-black/18" /></div>
        </section>

        <section className="site-shell py-12 md:py-16">
          <div className="grid gap-4 lg:grid-cols-[0.72fr_1.28fr]">
            <div className="flex min-h-[300px] flex-col justify-between bg-[#e9e5dd] p-6 md:p-8">
              <div><SectionLabel>{isBuenaPark ? (ko ? "지역 사무실" : "Local office") : (ko ? "지역 안내" : "Local context")}</SectionLabel><MapPin className="mt-10 h-9 w-9 stroke-[1.1] text-black/45" /></div>
              <div>
                <h2 className="editorial-serif text-[2.3rem] leading-none tracking-[-0.04em]">{name}</h2>
                <p className="mt-4 text-[12px] leading-5 text-black/48">{isBuenaPark ? brand.address : `${name}, ${location.county}`}</p>
                {isBuenaPark ? <a href={brand.phoneHref} className="mt-5 inline-flex items-center gap-2 text-[11px] font-semibold">{brand.phoneDisplay}<ArrowRight className="h-4 w-4" /></a> : null}
              </div>
            </div>

            <div className="bg-white p-6 md:p-8 lg:p-10">
              <SectionLabel>{ko ? "사고 후" : "After an accident"}</SectionLabel>
              <h2 className="editorial-serif mt-4 max-w-[700px] text-[clamp(2rem,4vw,3.8rem)] leading-[0.98] tracking-[-0.04em]">{ko ? "지금 필요한 정보부터 정리하세요." : "Start with the facts that can disappear first."}</h2>
              <div className="mt-9 grid border-t border-black/10 sm:grid-cols-3">
                {[
                  ["01", ko ? "현장" : "Scene", ko ? "사진, 영상, 위치 및 목격자." : "Photos, video, exact location, and witness details."],
                  ["02", ko ? "치료" : "Treatment", ko ? "치료 기록, 증상, 비용 및 업무 손실." : "Medical records, symptoms, bills, and work loss."],
                  ["03", ko ? "보험" : "Insurance", ko ? "보험 카드, 연락 및 청구 정보." : "Policies, claim numbers, adjuster communications, and coverage information."],
                ].map(([number, itemTitle, body]) => <div key={number} className="border-b border-black/10 py-5 sm:border-l sm:px-5 sm:first:border-l-0"><div className="text-[9px] text-black/34">{number}</div><h3 className="mt-5 text-[14px] font-semibold">{itemTitle}</h3><p className="mt-3 text-[11px] leading-5 text-black/46">{body}</p></div>)}
              </div>
            </div>
          </div>
        </section>

        <section className="bg-white py-16 md:py-24">
          <div className="site-shell">
            <div className="flex flex-col gap-5 md:flex-row md:items-end md:justify-between"><div><SectionLabel>{ko ? "업무 분야" : "Cases we handle"}</SectionLabel><h2 className="editorial-serif mt-4 text-[clamp(2.2rem,4.5vw,4.2rem)] leading-[0.98] tracking-[-0.04em]">{ko ? `${name}에서 다루는 주요 사고 유형.` : `Personal injury help in ${name}.`}</h2></div><a href={prefix + "/practice-areas"} className="inline-flex items-center gap-2 text-[12px] font-semibold">{ko ? "전체 업무 분야" : "All practice areas"}<ArrowRight className="h-4 w-4" /></a></div>
            <div className="mt-10 grid border-t border-black/12 sm:grid-cols-2 lg:grid-cols-4">
              {practiceAreas.slice(0, 8).map((practice, index) => <a key={practice.slug} href={`${prefix}/practice-areas/${practice.slug}`} className="group min-h-[180px] border-b border-black/12 p-5 sm:border-r"><div className="flex justify-between text-[9px] text-black/34"><span>{String(index + 1).padStart(2, "0")}</span><ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" /></div><h3 className="editorial-serif mt-12 text-[1.45rem] leading-none tracking-[-0.03em]">{ko ? practice.koTitle : practice.title}</h3></a>)}
            </div>
          </div>
        </section>

        <section className="bg-[#171717] py-16 text-white md:py-20">
          <div className="site-shell grid gap-10 lg:grid-cols-[0.72fr_1.28fr] lg:gap-16">
            <div><div className="text-[10px] font-semibold uppercase tracking-[0.16em] text-white/40">{location.ots.year} · California OTS</div><h2 className="editorial-serif mt-4 text-[clamp(2.1rem,4vw,3.7rem)] leading-[0.98] tracking-[-0.04em]">{ko ? `${name} 교통사고 통계.` : `${name} collision data, in context.`}</h2><p className="mt-5 max-w-[450px] text-[12px] leading-6 text-white/46">{ko ? "도시 전체 통계는 개별 사건의 결과를 예측하지 않습니다. 지역 교통안전 상황을 이해하기 위한 참고 자료입니다." : "Citywide numbers do not predict an individual claim. They are useful only as local traffic-safety context."}</p></div>
            <div className="grid border-y border-white/14 sm:grid-cols-3">
              <div className="py-7 sm:pr-6"><div className="editorial-serif text-[3rem] leading-none">{location.ots.total.toLocaleString()}</div><div className="mt-3 text-[9px] uppercase tracking-[0.12em] text-white/38">{ko ? "사망·부상 피해자" : "Killed or injured"}</div></div>
              <div className="border-t border-white/14 py-7 sm:border-l sm:border-t-0 sm:px-6"><div className="editorial-serif text-[3rem] leading-none">{location.ots.speed}</div><div className="mt-3 text-[9px] uppercase tracking-[0.12em] text-white/38">{ko ? "과속 관련" : "Speed-related"}</div></div>
              <div className="border-t border-white/14 py-7 sm:border-l sm:border-t-0 sm:pl-6"><div className="editorial-serif text-[3rem] leading-none">{location.ots.hitRun}</div><div className="mt-3 text-[9px] uppercase tracking-[0.12em] text-white/38">{ko ? "뺑소니 관련" : "Hit-and-run"}</div></div>
            </div>
          </div>
        </section>

        <section className="site-shell py-16 md:py-24">
          <div className="grid gap-12 lg:grid-cols-[0.8fr_1.2fr] lg:gap-16">
            <div><SectionLabel>{ko ? "지역 자료" : "Local resources"}</SectionLabel><h2 className="editorial-serif mt-4 text-[clamp(2rem,4vw,3.6rem)] leading-[0.98] tracking-[-0.04em]">{ko ? "공식 기록은 정확한 기관에서 시작됩니다." : "Official records start with the right local agency."}</h2></div>
            <div className="grid gap-3 sm:grid-cols-2">
              <a href={resource?.agencyHref} target="_blank" rel="noreferrer" className="group min-h-[190px] border border-black/10 bg-white p-5"><Building2 className="h-5 w-5 stroke-[1.4]" /><div className="mt-10 text-[10px] uppercase tracking-[0.12em] text-black/35">{ko ? "사고 기록" : "Police / records"}</div><h3 className="mt-3 text-[14px] font-semibold">{resource?.agency}</h3><ArrowRight className="mt-5 h-4 w-4 transition-transform group-hover:translate-x-1" /></a>
              <a href={resource?.courtHref} target="_blank" rel="noreferrer" className="group min-h-[190px] border border-black/10 bg-white p-5"><Scale className="h-5 w-5 stroke-[1.4]" /><div className="mt-10 text-[10px] uppercase tracking-[0.12em] text-black/35">{ko ? "법원" : "Court"}</div><h3 className="mt-3 text-[14px] font-semibold">{resource?.court}</h3><ArrowRight className="mt-5 h-4 w-4 transition-transform group-hover:translate-x-1" /></a>
            </div>
          </div>
        </section>

        <section className="border-t border-black/8 bg-white py-14 md:py-18">
          <div className="site-shell">
            <SectionLabel>{ko ? "인근 지역" : "Nearby communities"}</SectionLabel>
            <div className="mt-6 flex flex-wrap gap-2">{serviceLocations.filter((item) => item.slug !== location.slug).map((item) => <a key={item.slug} href={`${prefix}/locations/${item.slug}`} className="inline-flex min-h-10 items-center border border-black/12 px-4 text-[11px] font-semibold transition-colors hover:bg-black hover:text-white">{ko ? item.koName : item.name}</a>)}</div>
          </div>
        </section>

        <section className="bg-[#171717] py-16 text-white md:py-20">
          <div className="site-shell flex flex-col gap-8 md:flex-row md:items-end md:justify-between"><div><div className="text-[10px] font-semibold uppercase tracking-[0.16em] text-white/40">{ko ? "무료 상담" : "Free consultation"}</div><h2 className="editorial-serif mt-4 max-w-[760px] text-[clamp(2.5rem,5vw,5rem)] leading-[0.94] tracking-[-0.04em]">{ko ? `${name}에서 발생한 사고에 대해 이야기해 보세요.` : `Tell us what happened in ${name}.`}</h2></div><a href={prefix + "/contact"} className="inline-flex min-h-12 shrink-0 items-center gap-3 bg-white px-6 text-[12px] font-semibold text-black">{ko ? "상담 시작" : "Start a conversation"}<ArrowRight className="h-4 w-4" /></a></div>
        </section>
      </main>
    </EditorialFrame>
  );
};
