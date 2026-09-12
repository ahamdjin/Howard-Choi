import { ArrowRight, Building2, CarFront, FileText, MapPin, Phone, Route, Scale } from "lucide-react";
import { useParams } from "@tanstack/react-router";
import Footer from "@/components/Footer";
import KoreanFooter from "@/components/KoreanFooter";
import { LocationsPage as RefinedLocationsPage, LocationDetailPage as RefinedLocationDetailPage } from "@/pages/RefinedLocationPages";
import { brand, getServiceLocation, serviceLocations, type SiteLocale } from "@/data/injurySite";

const isKo = (locale: SiteLocale) => locale === "ko";
const prefix = (locale: SiteLocale) => (isKo(locale) ? "/ko" : "");
const serif = (locale: SiteLocale) => (isKo(locale) ? { fontFamily: '\"Noto Serif KR\", serif' } : undefined);

const shellStyles = `
.rich-location-base > div > footer { display: none !important; }
.rich-location-base > div > main > section:last-child { display: none !important; }
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

const FaqBlock = ({ items }: { items: { q: string; a: string }[] }) => (
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
        <span className="text-[9px] font-semibold uppercase tracking-[0.17em] text-white/48">{isKo(locale) ? "지역 상담" : "Local consultation"}</span>
        <h2 style={serif(locale)} className={`${isKo(locale) ? "mt-5 text-[clamp(2.2rem,4.5vw,4.6rem)] font-medium leading-[1.22]" : "editorial-serif mt-5 max-w-[780px] text-[clamp(2.8rem,5.5vw,6rem)] leading-[0.92] tracking-[-0.04em]"}`}>
          {isKo(locale) ? "사고 장소는 시작점이고, 중요한 것은 실제 사실입니다." : "The city gives the claim context. The facts give it meaning."}
        </h2>
      </div>
      <div className="rounded-[5px] bg-[#F3EEE5] p-6 text-[#1E1C1A] md:p-7">
        <p className="text-[12px] leading-6 text-[#1E1C1A]/56">{isKo(locale) ? "사고가 어디에서 어떻게 일어났는지, 치료와 보험 상황이 어디까지 진행됐는지 알려주세요." : "Tell us where and how the accident happened, what treatment has occurred, and what has happened with insurance so far."}</p>
        <div className="mt-6 flex flex-wrap gap-3">
          <a href={`${prefix(locale)}/contact`} className="inline-flex items-center gap-3 rounded-full bg-[#381907] px-5 py-3 text-[11px] font-semibold text-[#F3EEE5]">{isKo(locale) ? "상담 예약" : "Schedule a consultation"}<ArrowRight className="h-3.5 w-3.5" /></a>
          <a href={brand.phoneHref} className="inline-flex items-center gap-2 rounded-full border border-[#1E1C1A]/14 px-5 py-3 text-[11px] font-medium"><Phone className="h-3.5 w-3.5" />{brand.phoneDisplay}</a>
        </div>
      </div>
    </div>
  </section>
);

const RichLocationPage = ({ locale, base, children }: { locale: SiteLocale; base: React.ReactNode; children: React.ReactNode }) => (
  <div className="min-h-screen bg-[#F9F8F6] text-[#1E1C1A]">
    <style>{shellStyles}</style>
    <div className="rich-location-base">{base}</div>
    {children}
    <FinalCta locale={locale} />
    {isKo(locale) ? <KoreanFooter /> : <Footer />}
  </div>
);

type LocationDepth = {
  context: string[];
  corridors: string[];
  situations: { title: string; body: string }[];
};

const locationDepth: Record<string, LocationDepth> = {
  "buena-park": {
    context: [
      "Buena Park sits at a busy connection point between North Orange County and southeast Los Angeles County. Local trips mix with regional traffic moving around Beach Boulevard, the I-5 and SR-91 corridors, shopping areas, restaurants, entertainment destinations, neighborhoods, and parking lots.",
      "For an injury claim, that local context can matter because the useful evidence may come from very different places: a roadway camera, nearby business, rideshare record, property owner, witness, police report, or insurance policy. The location page should help a person understand those possibilities without pretending every accident in the city is the same.",
    ],
    corridors: ["Beach Boulevard", "Orangethorpe Avenue", "Artesia Boulevard", "Interstate 5", "State Route 91"],
    situations: [
      { title: "Regional traffic", body: "Freeway approaches and major arterial streets bring together local drivers, commuters, delivery vehicles, and visitors." },
      { title: "Commercial areas", body: "Parking lots, driveways, shopping centers, restaurants, and other business properties can create both traffic and premises-liability questions." },
      { title: "Pedestrians and rideshare", body: "Busy destinations can increase pedestrian, pickup, drop-off, and rideshare activity where visibility and movement matter." },
    ],
  },
  fullerton: {
    context: [
      "Fullerton combines residential neighborhoods, a busy downtown, schools and colleges, commercial corridors, and regional traffic near SR-91. Accidents can happen on major streets, around parking areas, at intersections, or during ordinary neighborhood travel.",
      "A useful local injury page should therefore connect the city to the evidence that may actually matter: roadway conditions, nearby cameras, witnesses, reports, medical treatment, and the insurance relationships involved in the specific accident.",
    ],
    corridors: ["Harbor Boulevard", "Orangethorpe Avenue", "Commonwealth Avenue", "State College Boulevard", "State Route 91"],
    situations: [
      { title: "Arterial intersections", body: "Major north-south and east-west streets can create turning, lane-change, rear-end, pedestrian, and visibility disputes." },
      { title: "Downtown and campus travel", body: "Walking, cycling, rideshare, parking, and short local trips can create a different evidence picture from a freeway collision." },
      { title: "Regional access", body: "SR-91 and nearby regional routes bring heavier traffic and commercial vehicles into the local roadway network." },
    ],
  },
  anaheim: {
    context: [
      "Anaheim is served by I-5, SR-57, and SR-91, along with major local streets that carry residents, commuters, visitors, rideshare vehicles, buses, and commercial traffic. That mix means a collision may involve local streets one moment and a regional freeway or major destination the next.",
      "The legal work still starts with the same fundamentals: preserve the scene evidence, identify the people and vehicles involved, understand the insurance picture, and document the medical and real-life consequences of the injury over time.",
    ],
    corridors: ["Interstate 5", "State Route 57", "State Route 91", "Harbor Boulevard", "Katella Avenue"],
    situations: [
      { title: "Freeway collisions", body: "Regional traffic can involve higher speeds, multi-vehicle impacts, commercial vehicles, and complicated lane or merge evidence." },
      { title: "Visitor and rideshare traffic", body: "Pickup areas, unfamiliar drivers, pedestrians, and app-based transportation can add extra witnesses, records, or insurance questions." },
      { title: "Busy surface streets", body: "Intersections and major corridors can involve turning movements, rear-end impacts, bicycles, and pedestrians." },
    ],
  },
  cerritos: {
    context: [
      "Cerritos is shaped by the SR-91 and I-605 freeway corridors, major streets such as Artesia Boulevard and South Street, and large commercial areas that draw traffic from across the region. Local crashes may therefore involve commuters, shoppers, commercial vehicles, pedestrians, or drivers moving between freeway and surface-street traffic.",
      "The location itself does not determine responsibility, but it can point toward useful evidence. Nearby businesses, roadway features, freeway ramps, parking areas, witnesses, and camera sources may all become relevant depending on where and how the incident occurred.",
    ],
    corridors: ["State Route 91", "Interstate 605", "Artesia Boulevard", "South Street", "Bloomfield Avenue"],
    situations: [
      { title: "Freeway transitions", body: "Traffic moving between SR-91, I-605, ramps, and local streets can create merge, lane-change, and congestion-related collisions." },
      { title: "Regional shopping traffic", body: "Large commercial destinations bring parking-lot, driveway, pedestrian, and high-turnover traffic issues." },
      { title: "Major intersections", body: "Arterial crossings can make signal timing, visibility, turning movements, witnesses, and video especially useful." },
    ],
  },
  "la-mirada": {
    context: [
      "La Mirada includes residential streets and major corridors such as Imperial Highway, Valley View Avenue, and Rosecrans Avenue, with regional connections nearby. An accident may happen in a neighborhood, at a major intersection, in a parking area, or while traffic is moving toward nearby freeway routes.",
      "A local claim page should help the reader think beyond the city name. What matters is the exact location, the condition of the road or property, the vehicles and people involved, available cameras or witnesses, medical treatment, and the insurance picture.",
    ],
    corridors: ["Imperial Highway", "Valley View Avenue", "Rosecrans Avenue", "La Mirada Boulevard", "Beach Boulevard area"],
    situations: [
      { title: "Major corridors", body: "Wide arterial roads can involve higher traffic volumes, turning conflicts, rear-end impacts, and pedestrian crossings." },
      { title: "Neighborhood travel", body: "Lower-speed streets still create important visibility, right-of-way, driveway, bicycle, and pedestrian questions." },
      { title: "Commercial properties", body: "Parking areas and business premises may raise different evidence and property-control issues from a roadway crash." },
    ],
  },
  "la-habra": {
    context: [
      "La Habra's roadway network includes Beach Boulevard, Imperial Highway, Whittier Boulevard, Harbor Boulevard, and La Habra Boulevard. These corridors connect neighborhoods, businesses, schools, shopping areas, and travel toward surrounding Orange and Los Angeles County communities.",
      "When an accident happens, the most useful local details are concrete: the exact intersection or property, traffic controls, nearby cameras, witnesses, roadway or lighting conditions, vehicle movement, and where the injured person received treatment afterward.",
    ],
    corridors: ["Beach Boulevard", "Imperial Highway", "Whittier Boulevard", "Harbor Boulevard", "La Habra Boulevard"],
    situations: [
      { title: "Cross-city corridors", body: "Long arterial streets can create recurring turning, lane-change, rear-end, bicycle, and pedestrian conflicts." },
      { title: "Shopping and local trips", body: "Parking areas, driveways, short trips, and frequent turns can create evidence that differs from a freeway collision." },
      { title: "County-edge travel", body: "Trips often continue into nearby communities, so drivers and insurers may not be based in the same city as the crash." },
    ],
  },
};

const locationFaqs = (locale: SiteLocale, name: string) => isKo(locale) ? [
  { q: `${name}에서 사고가 났으면 Buena Park 사무실에 연락할 수 있나요?`, a: `네. 이 웹사이트는 ${name}을 서비스 지역으로 안내하고 있으며 실제 사무실 주소는 ${brand.address}입니다.` },
  { q: "지역 페이지가 사건 결과에 영향을 주나요?", a: "도시 이름 자체가 결과를 결정하지는 않습니다. 하지만 정확한 사고 장소는 관할, 보고서, 도로·시설 상태, 영상과 목격자 같은 증거를 찾는 데 중요한 출발점이 될 수 있습니다." },
  { q: "현장 사진이나 영상이 없으면 사건이 불가능한가요?", a: "그렇지는 않습니다. 보고서, 차량 손상, 목격자, 주변 카메라, 의료 기록 등 다른 자료가 있을 수 있습니다. 어떤 증거가 남아 있는지 먼저 확인하는 것이 중요합니다." },
  { q: "사고 후 바로 치료하지 못했다면 어떻게 하나요?", a: "치료 시점과 이유는 사건마다 다릅니다. 현재 증상과 실제 치료 기록을 정확하게 정리하고, 지연이 있었다면 그 이유를 사실대로 설명하는 것이 중요합니다." },
] : [
  { q: `Can I contact the Buena Park office if my accident happened in ${name}?`, a: `Yes. The website identifies ${name} as a service area, while the listed physical office is at ${brand.address}. Whether a particular matter is a fit depends on its facts and applicable law.` },
  { q: `Why does the exact location of a ${name} accident matter?`, a: "The city name alone does not determine the claim, but the exact location can help identify reports, roadway or property conditions, camera sources, witnesses, traffic controls, and the parties responsible for a vehicle or property." },
  { q: "What if I did not get photographs or video at the scene?", a: "A claim is not automatically lost. Other evidence may exist, including reports, vehicle damage, witnesses, nearby cameras, medical records, property records, and insurance documentation. The useful evidence depends on the facts." },
  { q: "What should I keep while the claim is developing?", a: "Keep medical records and appointment information, photographs, receipts, work-loss documentation, insurance letters and emails, claim numbers, reports, and a simple timeline of important events and symptoms." },
];

const indexFaqs = (locale: SiteLocale) => isKo(locale) ? [
  { q: "모든 지역에 사무실이 있나요?", a: `아닙니다. 현재 사이트에 표시된 실제 사무실 주소는 ${brand.address}입니다. 다른 도시는 서비스 지역으로 안내됩니다.` },
  { q: "왜 지역별 페이지가 필요한가요?", a: "같은 사고 유형이라도 위치에 따라 도로, 영상 출처, 보고 기관, 주변 사업체, 목격자와 현장 증거가 달라질 수 있습니다. 좋은 지역 페이지는 같은 문구를 반복하기보다 그 맥락을 설명해야 합니다." },
  { q: "서비스 지역 밖의 사건도 문의할 수 있나요?", a: "문의는 할 수 있지만 실제 상담 가능 여부는 사건의 위치, 사실과 적용 법률에 따라 확인해야 합니다." },
] : [
  { q: "Does the firm have an office in every city listed here?", a: `No. The physical office currently listed on the website is ${brand.address}. The other city pages describe service areas, not separate office locations.` },
  { q: "Why have separate location pages at all?", a: "The useful reason is local context, not keyword repetition. Roadways, camera sources, reporting agencies, nearby businesses, property conditions, witnesses, and travel patterns can differ by city and exact accident location." },
  { q: "Can I ask about an accident outside the listed service areas?", a: "You can contact the firm, but whether a matter can be handled depends on the location, facts, and applicable law. The website should not imply an office or representation in a place that has not been confirmed." },
];

export const LocationsPage = ({ locale }: { locale: SiteLocale }) => (
  <RichLocationPage locale={locale} base={<RefinedLocationsPage locale={locale} />}>
    <section className="bg-[#F9F8F6] py-18 md:py-24">
      <div className="site-shell">
        <SectionTitle locale={locale} label={isKo(locale) ? "지역 콘텐츠의 역할" : "Why local context matters"} title={isKo(locale) ? "지역 페이지는 도시 이름을 반복하는 SEO 페이지가 아니어야 합니다." : "A location page should explain the place, not repeat the city name."} body={isKo(locale) ? "사고 장소는 어떤 도로·시설·영상·목격자·보험 정보를 찾아야 할지 알려주는 출발점입니다." : "The point of a local page is to help a reader understand how the place can shape the evidence: roadways, properties, cameras, witnesses, reports, travel patterns, and the practical route back to the Buena Park office."} />
        <div className="mt-10 grid gap-4 md:grid-cols-2 xl:grid-cols-4">
          {[
            [MapPin, isKo(locale) ? "정확한 장소" : "Exact location", isKo(locale) ? "교차로, 도로, 주차장 또는 시설의 정확한 위치가 증거 찾기의 시작점입니다." : "The exact intersection, roadway, parking area, or property is the starting point for identifying useful evidence."],
            [Route, isKo(locale) ? "교통 맥락" : "Traffic context", isKo(locale) ? "지역 도로와 광역 교통이 만나는 방식은 사고 유형과 증거를 이해하는 데 도움이 됩니다." : "Local streets, freeway connections, commercial corridors, and neighborhood travel create different collision patterns and evidence sources."],
            [FileText, isKo(locale) ? "기록" : "Records", isKo(locale) ? "보고서, 보험 자료, 영상과 의료 기록이 서로 다른 곳에서 생성될 수 있습니다." : "Reports, insurance records, business video, property information, and medical records may come from different sources."],
            [Building2, isKo(locale) ? "실제 사무실" : "Real office anchor", isKo(locale) ? `실제 사무실은 ${brand.address}에 있습니다.` : `The site stays anchored to one verified physical office: ${brand.address}.`],
          ].map(([Icon, title, body]) => { const I = Icon as typeof MapPin; return <Card key={String(title)} className="p-6"><I className="h-4 w-4 stroke-[1.3] text-[#381907]" /><h3 style={serif(locale)} className="mt-8 text-[1.45rem] leading-tight">{String(title)}</h3><p className="mt-3 text-[11px] leading-6 text-[#1E1C1A]/50">{String(body)}</p></Card>; })}
        </div>
      </div>
    </section>

    <section className="bg-[#F3EEE5] py-18 md:py-24"><div className="site-shell"><SectionTitle locale={locale} label={isKo(locale) ? "서비스 지역 FAQ" : "Service-area FAQs"} title={isKo(locale) ? "지역 페이지가 실제로 답해야 하는 질문." : "Make the service-area pages useful before they are optimized."} /><FaqBlock items={indexFaqs(locale)} /></div></section>
  </RichLocationPage>
);

export const LocationDetailPage = ({ locale }: { locale: SiteLocale }) => {
  const params = useParams({ strict: false }) as { slug?: string };
  const location = params.slug ? getServiceLocation(params.slug) : undefined;
  if (!location) return <RefinedLocationDetailPage locale={locale} />;

  const name = isKo(locale) ? location.koName : location.name;
  const depth = locationDepth[location.slug] || locationDepth["buena-park"];
  const englishName = location.name;

  return (
    <RichLocationPage locale={locale} base={<RefinedLocationDetailPage locale={locale} />}>
      <section className="bg-[#F9F8F6] py-18 md:py-24">
        <div className="site-shell grid gap-10 lg:grid-cols-[0.72fr_1.28fr] lg:gap-14">
          <div><SectionTitle locale={locale} label={isKo(locale) ? "지역 맥락" : `${englishName} context`} title={isKo(locale) ? `${name}의 사고를 도시 이름보다 더 구체적으로 봅니다.` : `In ${englishName}, the useful details start with the exact place.`} /></div>
          <div className="space-y-6 text-[14px] leading-8 text-[#1E1C1A]/64">
            {(isKo(locale) ? [
              `${name}에서 사고가 발생했다는 사실만으로 사건이 결정되지는 않습니다. 정확한 도로, 교차로, 주차장 또는 시설과 당시 교통·조명·시야·차량 이동이 더 중요할 수 있습니다.`,
              "지역 맥락은 어떤 증거를 찾아야 할지 알려줍니다. 주변 영상, 목격자, 사고 보고서, 사업체 또는 시설 기록, 차량 정보, 보험 자료와 치료 기록을 하나의 사건 흐름으로 연결하는 것이 핵심입니다.",
            ] : depth.context).map((paragraph) => <p key={paragraph}>{paragraph}</p>)}
          </div>
        </div>
      </section>

      <section className="bg-[#F3EEE5] py-18 md:py-24">
        <div className="site-shell">
          <SectionTitle locale={locale} label={isKo(locale) ? "주요 도로와 이동" : "Roads and travel context"} title={isKo(locale) ? `${name}에서 사고 위치를 설명할 때 자주 보게 되는 주요 도로.` : `Major corridors that help place a ${englishName} accident in context.`} body={isKo(locale) ? "아래 도로가 위험하다는 의미가 아니라, 사고 위치와 이동 경로를 구체적으로 설명하기 위한 지역 기준점입니다." : "This is not a claim that these roads are inherently dangerous. They are local reference points that can help describe where the incident occurred and what type of traffic or evidence may be nearby."} />
          <div className="mt-10 flex flex-wrap gap-3">
            {depth.corridors.map((corridor) => <span key={corridor} className="rounded-full border border-[#1E1C1A]/10 bg-white/76 px-4 py-2.5 text-[11px] text-[#1E1C1A]/68">{corridor}</span>)}
          </div>
        </div>
      </section>

      <section className="bg-[#F9F8F6] py-18 md:py-24">
        <div className="site-shell">
          <SectionTitle locale={locale} label={isKo(locale) ? "사고 맥락" : "Common local settings"} title={isKo(locale) ? "지역마다 사고가 일어나는 환경과 남는 증거가 다를 수 있습니다." : "Different settings leave different kinds of evidence behind."} />
          <div className="mt-10 grid gap-4 md:grid-cols-3">
            {(isKo(locale) ? [
              { title: "주요 도로와 교차로", body: "회전, 차선 변경, 후방 추돌, 보행자와 신호 관련 증거가 중요할 수 있습니다." },
              { title: "상업 시설과 주차장", body: "사업체 영상, 시설 관리, 차량 이동과 보행자 동선이 관련될 수 있습니다." },
              { title: "지역과 광역 이동", body: "인근 도시나 고속도로로 이어지는 이동에서는 여러 운전자, 보험과 기록이 함께 문제될 수 있습니다." },
            ] : depth.situations).map((item, index) => <Card key={item.title} className="p-7"><div className="flex h-10 w-10 items-center justify-center rounded-full bg-[#F3EEE5] text-[#381907]">{index === 0 ? <CarFront className="h-4 w-4 stroke-[1.3]" /> : index === 1 ? <Building2 className="h-4 w-4 stroke-[1.3]" /> : <Route className="h-4 w-4 stroke-[1.3]" />}</div><h3 style={serif(locale)} className="mt-8 text-[1.5rem] leading-tight">{item.title}</h3><p className="mt-3 text-[11px] leading-6 text-[#1E1C1A]/50">{item.body}</p></Card>)}
          </div>
        </div>
      </section>

      <section className="bg-[#F3EEE5] py-18 md:py-24">
        <div className="site-shell">
          <SectionTitle locale={locale} label={isKo(locale) ? "지역 FAQ" : `${englishName} injury FAQs`} title={isKo(locale) ? "지역 검색으로 들어온 사람이 다시 검색하지 않아도 기본 답을 얻을 수 있게." : "Answer the practical local questions before the reader has to search again."} />
          <FaqBlock items={locationFaqs(locale, name)} />
          <p className="mt-8 max-w-[840px] text-[9px] leading-5 text-[#1E1C1A]/36">{isKo(locale) ? "이 페이지는 일반적인 정보이며 법률 자문이 아닙니다. 서비스 지역 안내는 각 도시에 별도 사무실이 있다는 의미가 아닙니다." : `This page provides general information and is not legal advice. ${englishName} is presented as a service area; the verified physical office listed on the site is in Buena Park.`}</p>
        </div>
      </section>
    </RichLocationPage>
  );
};
