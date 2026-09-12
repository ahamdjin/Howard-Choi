import { ArrowRight, Building2, MapPin, Navigation2, Phone, Route, Scale } from "lucide-react";
import { useParams } from "@tanstack/react-router";
import Navigation from "@/components/Navigation";
import KoreanNavigation from "@/components/KoreanNavigation";
import Footer from "@/components/Footer";
import KoreanFooter from "@/components/KoreanFooter";
import heroOffice from "@/assets/law-firm/hero-law-office.webp";
import heroBoardroom from "@/assets/law-firm/hero-city-boardroom.webp";
import heroCourthouse from "@/assets/law-firm/hero-courthouse.webp";
import heroJustice from "@/assets/law-firm/hero-justice-library.webp";
import leadCounsel from "@/assets/law-firm/lead-counsel.avif";
import {
  brand,
  getServiceLocation,
  practiceAreas,
  serviceLocations,
  type ServiceLocation,
  type SiteLocale,
} from "@/data/injurySite";

const isKo = (locale: SiteLocale) => locale === "ko";
const prefix = (locale: SiteLocale) => (isKo(locale) ? "/ko" : "");
const serif = (locale: SiteLocale) => (isKo(locale) ? { fontFamily: '\"Noto Serif KR\", serif' } : undefined);
const locationImages = [heroOffice, heroCourthouse, heroBoardroom, heroJustice];

const Frame = ({ locale, children }: { locale: SiteLocale; children: React.ReactNode }) => (
  <div className="min-h-screen overflow-x-clip bg-[#F9F8F6] text-[#1E1C1A]" style={isKo(locale) ? { fontFamily: '\"Noto Sans KR\", sans-serif' } : undefined}>
    {isKo(locale) ? <KoreanNavigation /> : <Navigation />}
    {children}
    {isKo(locale) ? <KoreanFooter /> : <Footer />}
  </div>
);

const Label = ({ children, light = false }: { children: React.ReactNode; light?: boolean }) => (
  <span className={`text-[9px] font-semibold uppercase tracking-[0.17em] ${light ? "text-white/48" : "text-[#1E1C1A]/40"}`}>{children}</span>
);

const Card = ({ children, className = "" }: { children: React.ReactNode; className?: string }) => (
  <div className={`rounded-[5px] border border-[#1E1C1A]/10 bg-white/76 ${className}`}>{children}</div>
);

const SectionTitle = ({ locale, label, title, body }: { locale: SiteLocale; label: string; title: string; body?: string }) => (
  <div className="max-w-[860px]">
    <Label>{label}</Label>
    <h2 style={serif(locale)} className={`${isKo(locale) ? "mt-4 text-[clamp(1.9rem,3.4vw,3.5rem)] font-medium leading-[1.28] tracking-[-0.04em]" : "editorial-serif mt-4 text-[clamp(2.25rem,4vw,4.4rem)] leading-[0.98] tracking-[-0.035em]"}`}>{title}</h2>
    {body && <p className="mt-5 max-w-[650px] text-[13px] leading-7 text-[#1E1C1A]/55">{body}</p>}
  </div>
);

const LocationCard = ({ location, index, locale }: { location: ServiceLocation; index: number; locale: SiteLocale }) => (
  <a href={`${prefix(locale)}/locations/${location.slug}`} className="group overflow-hidden rounded-[5px] border border-[#1E1C1A]/10 bg-white/76 transition-transform duration-300 hover:-translate-y-1">
    <div className="relative h-[220px] overflow-hidden bg-[#D7D0C8]">
      <img src={locationImages[index % locationImages.length]} alt="" loading="lazy" decoding="async" className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-[1.025]" />
      <div className="absolute inset-0 bg-[#1E1C1A]/18" />
      <span className="absolute left-4 top-4 rounded-full bg-[#F3EEE5]/94 px-3 py-1 text-[8px] font-semibold tracking-[0.1em] text-[#381907]">0{index + 1}</span>
    </div>
    <div className="p-6">
      <div className="flex items-start justify-between gap-5">
        <h3 style={serif(locale)} className="text-[1.65rem] leading-tight">{isKo(locale) ? location.koName : location.name}</h3>
        <ArrowRight className="mt-1 h-4 w-4 shrink-0 text-[#381907] transition-transform group-hover:translate-x-1" />
      </div>
      <p className="mt-3 line-clamp-2 text-[11px] leading-5 text-[#1E1C1A]/48">{isKo(locale) ? location.koDescription : location.description}</p>
    </div>
  </a>
);

const Consultation = ({ locale }: { locale: SiteLocale }) => (
  <section className="bg-[#211A16] text-[#F3EEE5]">
    <div className="site-shell grid gap-8 py-14 md:py-18 lg:grid-cols-[1.15fr_0.85fr] lg:items-end lg:py-20">
      <div>
        <Label light>{isKo(locale) ? "상담" : "Local consultation"}</Label>
        <h2 style={serif(locale)} className={`${isKo(locale) ? "mt-5 text-[clamp(2.2rem,4.5vw,4.6rem)] font-medium leading-[1.22]" : "editorial-serif mt-5 text-[clamp(2.8rem,5.5vw,6rem)] leading-[0.92] tracking-[-0.04em]"}`}>
          {isKo(locale) ? "지역은 시작점입니다. 중요한 것은 사고와 현재 상황입니다." : "Your city is the starting point. The accident is what matters."}
        </h2>
      </div>
      <Card className="p-6 text-[#1E1C1A] md:p-7">
        <p className="text-[12px] leading-6 text-[#1E1C1A]/56">{isKo(locale) ? "어디에서 무슨 일이 있었는지 알려주시면 다음 단계를 확인할 수 있습니다." : "Tell us where the accident happened, what changed, and where the claim stands now."}</p>
        <div className="mt-6 flex flex-wrap gap-3">
          <a href={`${prefix(locale)}/contact`} className="inline-flex items-center gap-3 rounded-full bg-[#381907] px-5 py-3 text-[11px] font-semibold text-[#F3EEE5]">{isKo(locale) ? "상담 예약" : "Schedule a consultation"}<ArrowRight className="h-3.5 w-3.5" /></a>
          <a href={brand.phoneHref} className="inline-flex items-center gap-2 rounded-full border border-[#1E1C1A]/14 px-5 py-3 text-[11px] font-medium"><Phone className="h-3.5 w-3.5" />{brand.phoneDisplay}</a>
        </div>
      </Card>
    </div>
  </section>
);

export const LocationsPage = ({ locale }: { locale: SiteLocale }) => (
  <Frame locale={locale}>
    <main>
      <section className="bg-[#F3EEE5] pt-[60px]">
        <div className="site-shell grid gap-5 py-5 lg:grid-cols-[0.88fr_1.12fr] lg:py-7">
          <div className="flex min-h-[520px] flex-col justify-between rounded-[5px] bg-[#381907] p-7 text-[#F3EEE5] md:p-10 lg:p-12">
            <div className="flex items-center justify-between"><Label light>{isKo(locale) ? "서비스 지역" : "Locations"}</Label><MapPin className="h-4 w-4 text-white/45" /></div>
            <div>
              <h1 style={serif(locale)} className={`${isKo(locale) ? "text-[clamp(2.8rem,5vw,5.4rem)] font-medium leading-[1.12]" : "editorial-serif text-[clamp(3.7rem,6.8vw,7.3rem)] leading-[0.88] tracking-[-0.05em]"}`}>
                {isKo(locale) ? "Buena Park에서 시작해 인근 지역까지." : "Local by design. Useful beyond one city."}
              </h1>
              <p className="mt-6 max-w-[520px] text-[13px] leading-7 text-white/60">{isKo(locale) ? "각 지역 페이지는 같은 문구를 반복하기보다 해당 지역에서 어떤 사건을 다루는지 명확하게 연결합니다." : "Each location page should connect the community to the attorney, the relevant injury work, and the Buena Park office — without repeating the same wall of SEO copy."}</p>
            </div>
            <div className="text-[10px] text-white/38">{serviceLocations.length} {isKo(locale) ? "개 지역" : "service areas"}</div>
          </div>
          <div className="relative min-h-[58svh] overflow-hidden rounded-[5px] lg:min-h-[650px]">
            <img src={heroBoardroom} alt="Law firm meeting room" className="absolute inset-0 h-full w-full object-cover" fetchPriority="high" />
            <div className="absolute inset-0 bg-[#1E1C1A]/16" />
          </div>
        </div>
      </section>

      <section className="bg-[#F9F8F6] py-18 md:py-24">
        <div className="site-shell">
          <SectionTitle locale={locale} label={isKo(locale) ? "인근 지역" : "Nearby communities"} title={isKo(locale) ? "찾기 쉽고, 읽기 쉽고, 바로 이동할 수 있게." : "A visual directory instead of six nearly identical essays."} />
          <div className="mt-10 grid gap-4 md:grid-cols-2 xl:grid-cols-3">
            {serviceLocations.map((location, index) => <LocationCard key={location.slug} location={location} index={index} locale={locale} />)}
          </div>
        </div>
      </section>

      <section className="bg-[#F3EEE5] py-18 md:py-24">
        <div className="site-shell grid gap-5 lg:grid-cols-[1.05fr_0.95fr]">
          <div className="relative min-h-[520px] overflow-hidden rounded-[5px]">
            <img src={heroOffice} alt="Buena Park law office" loading="lazy" className="absolute inset-0 h-full w-full object-cover" />
          </div>
          <div className="grid gap-5">
            <Card className="flex flex-col justify-between p-7 md:p-9">
              <div>
                <Label>{isKo(locale) ? "사무실" : "Office anchor"}</Label>
                <h2 style={serif(locale)} className={`${isKo(locale) ? "mt-5 text-[clamp(2rem,3.6vw,3.7rem)] font-medium leading-[1.24]" : "editorial-serif mt-5 text-[clamp(2.5rem,4.6vw,4.8rem)] leading-[0.97] tracking-[-0.035em]"}`}>{isKo(locale) ? "실제 사무실은 Buena Park에 있습니다." : "One real office. A wider local service area."}</h2>
                <div className="mt-6 flex items-start gap-3 text-[12px] leading-6 text-[#1E1C1A]/56"><MapPin className="mt-1 h-4 w-4 shrink-0 text-[#381907]" /><span>{brand.address}</span></div>
              </div>
              <a href={`${prefix(locale)}/contact`} className="mt-8 inline-flex items-center gap-2 text-[11px] font-semibold text-[#381907]">{isKo(locale) ? "연락하기" : "Contact the office"}<ArrowRight className="h-3.5 w-3.5" /></a>
            </Card>
            <div className="grid gap-4 sm:grid-cols-3">
              {[
                [MapPin, isKo(locale) ? "지역 맥락" : "Local context"],
                [Scale, isKo(locale) ? "관련 업무" : "Relevant practice"],
                [Building2, isKo(locale) ? "실제 사무실" : "Real office"],
              ].map(([Icon, title]) => {
                const IconCmp = Icon as typeof MapPin;
                return <Card key={String(title)} className="p-5"><IconCmp className="h-4 w-4 stroke-[1.3] text-[#381907]" /><div className="mt-8 text-[11px] font-semibold">{String(title)}</div></Card>;
              })}
            </div>
          </div>
        </div>
      </section>

      <Consultation locale={locale} />
    </main>
  </Frame>
);

export const LocationDetailPage = ({ locale }: { locale: SiteLocale }) => {
  const params = useParams({ strict: false }) as { slug?: string };
  const location = params.slug ? getServiceLocation(params.slug) : undefined;
  if (!location) return null;

  const index = serviceLocations.findIndex((item) => item.slug === location.slug);
  const name = isKo(locale) ? location.koName : location.name;
  const description = isKo(locale) ? location.koDescription : location.description;
  const nearby = serviceLocations.filter((item) => item.slug !== location.slug).slice(0, 3);

  return (
    <Frame locale={locale}>
      <main>
        <section className="bg-[#211A16] pt-[60px] text-[#F3EEE5]">
          <div className="site-shell py-5 md:py-7">
            <div className="relative min-h-[68svh] overflow-hidden rounded-[5px]">
              <img src={locationImages[index % locationImages.length]} alt="" className="absolute inset-0 h-full w-full object-cover" fetchPriority="high" />
              <div className="absolute inset-0 bg-gradient-to-r from-[#1E1C1A]/88 via-[#1E1C1A]/50 to-[#1E1C1A]/16" />
              <div className="relative z-10 flex min-h-[68svh] items-end p-7 md:p-10 lg:p-12">
                <div className="max-w-[800px]">
                  <Label light>{isKo(locale) ? "서비스 지역" : "Local injury counsel"}</Label>
                  <h1 style={serif(locale)} className={`${isKo(locale) ? "mt-5 text-[clamp(3rem,5.5vw,5.8rem)] font-medium leading-[1.12]" : "editorial-serif mt-5 text-[clamp(4.2rem,7.4vw,8rem)] leading-[0.86] tracking-[-0.055em]"}`}>{name}</h1>
                  <p className="mt-6 max-w-[620px] text-[13px] leading-7 text-white/62">{description}</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="bg-[#F9F8F6] py-18 md:py-24">
          <div className="site-shell">
            <SectionTitle locale={locale} label={isKo(locale) ? "지역에서 시작" : "Start local"} title={isKo(locale) ? `${name}에서 사고가 났다면 먼저 세 가지를 정리합니다.` : `If the accident happened around ${name}, start with three simple things.`} />
            <div className="mt-10 grid gap-4 md:grid-cols-3">
              {[
                [MapPin, isKo(locale) ? "어디에서" : "Where", isKo(locale) ? "사고 장소와 주변 상황." : "Where it happened and what the surroundings looked like."],
                [Route, isKo(locale) ? "무슨 일이" : "What happened", isKo(locale) ? "충돌 또는 위험 상황의 흐름." : "The sequence of the collision or unsafe condition."],
                [Navigation2, isKo(locale) ? "현재 상황" : "Where things stand", isKo(locale) ? "치료, 보험과 연락 현황." : "Treatment, insurance, and any communication so far."],
              ].map(([Icon, title, body]) => {
                const IconCmp = Icon as typeof MapPin;
                return <Card key={String(title)} className="p-7"><div className="flex h-10 w-10 items-center justify-center rounded-full bg-[#F3EEE5] text-[#381907]"><IconCmp className="h-4 w-4 stroke-[1.3]" /></div><h3 style={serif(locale)} className="mt-8 text-[1.55rem] leading-tight">{String(title)}</h3><p className="mt-3 text-[11px] leading-6 text-[#1E1C1A]/48">{String(body)}</p></Card>;
              })}
            </div>
          </div>
        </section>

        <section className="bg-[#F3EEE5] py-18 md:py-24">
          <div className="site-shell grid gap-5 lg:grid-cols-[0.86fr_1.14fr]">
            <Card className="flex flex-col justify-between p-7 md:p-9 lg:p-10">
              <div>
                <Label>{isKo(locale) ? "업무 분야" : "Practice focus"}</Label>
                <h2 style={serif(locale)} className={`${isKo(locale) ? "mt-5 text-[clamp(2rem,3.7vw,3.8rem)] font-medium leading-[1.24]" : "editorial-serif mt-5 text-[clamp(2.5rem,4.6vw,4.8rem)] leading-[0.97] tracking-[-0.035em]"}`}>{isKo(locale) ? "지역 페이지에서 바로 사건 유형으로 이동합니다." : "From the city page, move straight to the kind of accident."}</h2>
              </div>
              <a href={`${prefix(locale)}/practice-areas`} className="mt-8 inline-flex items-center gap-2 text-[11px] font-semibold text-[#381907]">{isKo(locale) ? "전체 업무 보기" : "View all practice areas"}<ArrowRight className="h-3.5 w-3.5" /></a>
            </Card>
            <div className="grid gap-4 sm:grid-cols-2">
              {practiceAreas.slice(0, 4).map((practice, practiceIndex) => (
                <a key={practice.slug} href={`${prefix(locale)}/practice-areas/${practice.slug}`} className="group overflow-hidden rounded-[5px] border border-[#1E1C1A]/10 bg-white/76">
                  <div className="relative h-[150px] overflow-hidden"><img src={locationImages[(practiceIndex + 1) % locationImages.length]} alt="" loading="lazy" className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-[1.025]" /><div className="absolute inset-0 bg-[#1E1C1A]/16" /></div>
                  <div className="flex items-center justify-between gap-4 p-5"><h3 style={serif(locale)} className="text-[1.25rem] leading-tight">{isKo(locale) ? practice.koTitle : practice.title}</h3><ArrowRight className="h-3.5 w-3.5 shrink-0 text-[#381907]" /></div>
                </a>
              ))}
            </div>
          </div>
        </section>

        <section className="bg-[#F9F8F6] py-18 md:py-24">
          <div className="site-shell grid gap-5 lg:grid-cols-[0.72fr_1.28fr]">
            <div className="relative min-h-[460px] overflow-hidden rounded-[5px]"><img src={leadCounsel} alt="Howard Choi" loading="lazy" className="absolute inset-0 h-full w-full object-cover" /></div>
            <Card className="flex flex-col justify-between p-8 md:p-10 lg:p-12">
              <div>
                <Label>Howard Choi · {isKo(locale) ? "변호사" : "Attorney"}</Label>
                <h2 style={serif(locale)} className={`${isKo(locale) ? "mt-5 text-[clamp(2rem,3.7vw,3.8rem)] font-medium leading-[1.24]" : "editorial-serif mt-5 text-[clamp(2.5rem,4.6vw,4.8rem)] leading-[0.97] tracking-[-0.035em]"}`}>{isKo(locale) ? "지역 페이지가 끝나는 곳에서 담당 변호사가 보입니다." : "The local page should always connect back to the person handling the work."}</h2>
                <div className="mt-6 flex items-start gap-3 text-[12px] leading-6 text-[#1E1C1A]/54"><Building2 className="mt-1 h-4 w-4 shrink-0 text-[#381907]" /><span>{brand.address}</span></div>
              </div>
              <a href={`${prefix(locale)}/attorney`} className="mt-8 inline-flex items-center gap-2 text-[11px] font-semibold text-[#381907]">{isKo(locale) ? "변호사 프로필" : "Meet Howard Choi"}<ArrowRight className="h-3.5 w-3.5" /></a>
            </Card>
          </div>
        </section>

        <section className="bg-[#F3EEE5] py-18 md:py-24">
          <div className="site-shell">
            <SectionTitle locale={locale} label={isKo(locale) ? "인근 지역" : "Nearby"} title={isKo(locale) ? "가까운 다른 지역도 한 번에 볼 수 있습니다." : "Nearby communities, without another wall of text."} />
            <div className="mt-10 grid gap-4 md:grid-cols-3">{nearby.map((item, nearbyIndex) => <LocationCard key={item.slug} location={item} index={nearbyIndex + index + 1} locale={locale} />)}</div>
          </div>
        </section>

        <Consultation locale={locale} />
      </main>
    </Frame>
  );
};
