import { ArrowRight, FileText, MapPin, Phone, Scale, ShieldCheck } from "lucide-react";
import { useParams } from "@tanstack/react-router";
import Navigation from "@/components/Navigation";
import KoreanNavigation from "@/components/KoreanNavigation";
import Footer from "@/components/Footer";
import KoreanFooter from "@/components/KoreanFooter";
import heroBoardroom from "@/assets/law-firm/hero-city-boardroom.webp";
import heroCourthouse from "@/assets/law-firm/hero-courthouse.webp";
import heroOffice from "@/assets/law-firm/hero-law-office.webp";
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
const serif = (locale: SiteLocale) =>
  isKo(locale) ? { fontFamily: '"Noto Serif KR", serif' } : undefined;

const locationImages = [heroBoardroom, heroCourthouse, heroOffice, heroJustice];

const Frame = ({ locale, children }: { locale: SiteLocale; children: React.ReactNode }) => (
  <div
    className="min-h-screen overflow-x-clip bg-[#F9F8F6] text-[#1E1C1A]"
    style={isKo(locale) ? { fontFamily: '"Noto Sans KR", sans-serif' } : undefined}
  >
    {isKo(locale) ? <KoreanNavigation /> : <Navigation />}
    {children}
    {isKo(locale) ? <KoreanFooter /> : <Footer />}
  </div>
);

const Eyebrow = ({ children, light = false }: { children: React.ReactNode; light?: boolean }) => (
  <div className={`text-[9px] font-semibold uppercase tracking-[0.18em] ${light ? "text-[#F3EEE5]/52" : "text-[#1E1C1A]/38"}`}>
    {children}
  </div>
);

const Heading = ({ locale, eyebrow, title, body }: { locale: SiteLocale; eyebrow: string; title: string; body?: string }) => (
  <div className="grid gap-7 border-t border-[#1E1C1A]/12 pt-5 lg:grid-cols-[0.31fr_1.69fr] lg:gap-12 xl:gap-16">
    <Eyebrow>{eyebrow}</Eyebrow>
    <div>
      <h2
        style={serif(locale)}
        className={isKo(locale)
          ? "max-w-[930px] text-[clamp(1.7rem,2.8vw,3rem)] font-medium leading-[1.35] tracking-[-0.04em]"
          : "editorial-serif max-w-[930px] text-[clamp(2rem,3.25vw,3.55rem)] leading-[1.01] tracking-[-0.032em]"}
      >
        {title}
      </h2>
      {body && <p className="mt-5 max-w-[720px] text-[13px] leading-7 text-[#1E1C1A]/56">{body}</p>}
    </div>
  </div>
);

const Consultation = ({ locale }: { locale: SiteLocale }) => (
  <section className="bg-[#1E1C1A] text-[#F3EEE5]">
    <div className="site-shell grid min-h-[68svh] items-center gap-12 py-16 lg:grid-cols-[0.95fr_1.05fr] lg:py-20">
      <div>
        <Eyebrow light>{isKo(locale) ? "상담" : "Start the conversation"}</Eyebrow>
        <h2
          style={serif(locale)}
          className={isKo(locale)
            ? "mt-6 max-w-[650px] text-[clamp(2rem,4vw,4rem)] font-medium leading-[1.3] tracking-[-0.04em]"
            : "editorial-serif mt-6 max-w-[650px] text-[clamp(2.5rem,5vw,5.7rem)] leading-[0.92] tracking-[-0.04em]"}
        >
          {isKo(locale) ? "어디에서 사고가 났든, 다음 단계는 명확해야 합니다." : "Where it happened matters. So does what happens next."}
        </h2>
        <p className="mt-7 max-w-[520px] text-[13px] leading-7 text-[#F3EEE5]/56">
          {isKo(locale)
            ? "사고 장소와 현재 상황을 알려주시면 상담 가능 여부와 다음 단계를 확인할 수 있습니다."
            : "Tell the firm where the accident happened, what has happened since, and what you are dealing with now."}
        </p>
      </div>
      <div className="border-t border-white/14 pt-7 lg:border-l lg:border-t-0 lg:pl-12 lg:pt-0">
        <a href={`${prefix(locale)}/contact`} className="group flex items-center justify-between border-b border-white/14 py-6">
          <span className="text-[14px] font-medium">{isKo(locale) ? "상담 예약" : "Schedule a consultation"}</span>
          <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
        </a>
        <a href={brand.phoneHref} className="flex items-center justify-between border-b border-white/14 py-6">
          <span className="text-[14px] font-medium">{brand.phoneDisplay}</span>
          <Phone className="h-4 w-4" />
        </a>
        <div className="pt-7 text-[10px] leading-5 text-white/38">{brand.address}</div>
      </div>
    </div>
  </section>
);

const LocationCard = ({ locale, location, index }: { locale: SiteLocale; location: ServiceLocation; index: number }) => (
  <a
    href={`${prefix(locale)}/locations/${location.slug}`}
    className="group bg-[#F9F8F6]"
  >
    <div className="relative h-[250px] overflow-hidden bg-[#D8D1C8]">
      <img
        src={locationImages[index % locationImages.length]}
        alt=""
        className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 group-hover:scale-[1.025]"
        loading="lazy"
      />
      <div className="absolute inset-0 bg-[#1E1C1A]/22" />
      <span className="absolute left-5 top-5 text-[9px] uppercase tracking-[0.15em] text-white/74">{String(index + 1).padStart(2, "0")}</span>
    </div>
    <div className="min-h-[220px] p-7">
      <div className="flex items-start justify-between gap-5">
        <h3 style={serif(locale)} className="text-[clamp(1.8rem,2.8vw,2.8rem)] leading-none tracking-[-0.03em]">
          {isKo(locale) ? location.koName : location.name}
        </h3>
        <ArrowRight className="mt-1 h-4 w-4 shrink-0 transition-transform group-hover:translate-x-1" />
      </div>
      <p className="mt-6 max-w-[480px] text-[11px] leading-6 text-[#1E1C1A]/50">
        {isKo(locale) ? location.koDescription : location.description}
      </p>
    </div>
  </a>
);

export const LocationsPage = ({ locale }: { locale: SiteLocale }) => (
  <Frame locale={locale}>
    <main>
      <section className="relative min-h-[82svh] overflow-hidden bg-[#1E1C1A] pt-[60px] text-[#F3EEE5]">
        <img src={heroBoardroom} alt="" className="absolute inset-0 h-full w-full object-cover opacity-58" fetchPriority="high" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#1E1C1A]/96 via-[#1E1C1A]/48 to-[#1E1C1A]/22" />
        <div className="site-shell relative z-10 flex min-h-[calc(82svh-60px)] items-end py-10 md:py-14">
          <div className="grid w-full gap-8 border-t border-white/16 pt-5 lg:grid-cols-[0.3fr_1.7fr]">
            <div>
              <Eyebrow light>{isKo(locale) ? "서비스 지역" : "Locations"}</Eyebrow>
              <div className="mt-5 text-[9px] leading-5 text-white/34">Buena Park · North Orange County<br />{brand.phoneDisplay}</div>
            </div>
            <div>
              <h1
                style={serif(locale)}
                className={isKo(locale)
                  ? "text-[clamp(2.7rem,5.5vw,5.8rem)] font-medium leading-[1.17] tracking-[-0.05em]"
                  : "editorial-serif text-[clamp(4rem,7vw,8.2rem)] leading-[0.86] tracking-[-0.055em]"}
              >
                {isKo(locale) ? "부에나파크를 중심으로, 가까운 지역까지." : "Rooted in Buena Park. Built for the communities around it."}
              </h1>
              <p className="mt-7 max-w-[760px] text-[13px] leading-7 text-white/58">
                {isKo(locale)
                  ? "도시 이름만 바꾼 페이지가 아니라, 각 지역에서 발생하는 사고와 관련 업무, 담당 변호사, 사무실까지 하나의 흐름으로 연결합니다."
                  : "These are not city-name duplicates. Each local hub connects the community to the relevant injury work, the attorney, and the Buena Park office."}
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-[#F9F8F6]">
        <div className="site-shell py-20 md:py-28">
          <Heading
            locale={locale}
            eyebrow={isKo(locale) ? "서비스 지역" : "Service area"}
            title={isKo(locale) ? "한 사무실. 집중된 지역 범위." : "One office. A deliberately focused service area."}
            body={isKo(locale)
              ? "각 지역 페이지는 해당 도시에서 사고를 당한 사람이 필요한 업무 분야와 다음 행동을 빠르게 찾도록 설계했습니다."
              : "Each city page is designed to help someone connect where the accident happened with the type of claim, the lawyer handling the work, and the next useful step."}
          />
          <div className="mt-14 grid gap-px bg-[#1E1C1A]/12 md:grid-cols-2 xl:grid-cols-3">
            {serviceLocations.map((location, index) => <LocationCard key={location.slug} locale={locale} location={location} index={index} />)}
          </div>
        </div>
      </section>

      <section className="bg-[#F3EEE5]">
        <div className="site-shell py-20 md:py-28">
          <Heading
            locale={locale}
            eyebrow={isKo(locale) ? "부에나파크 사무실" : "The Buena Park office"}
            title={isKo(locale) ? "지역 페이지의 중심은 실제 사무실과 실제 담당자입니다." : "The local story has an anchor: a real office and the attorney behind the work."}
          />
          <div className="mt-14 grid overflow-hidden border border-[#1E1C1A]/12 lg:grid-cols-[1.15fr_0.85fr]">
            <div className="relative min-h-[440px] overflow-hidden bg-[#D8D1C8]">
              <img src={heroOffice} alt="Law office interior" className="absolute inset-0 h-full w-full object-cover" loading="lazy" />
              <div className="absolute inset-0 bg-[#1E1C1A]/15" />
            </div>
            <div className="flex min-h-[440px] flex-col justify-between p-8 md:p-10">
              <div>
                <MapPin className="h-5 w-5 stroke-[1.3] text-[#381907]" />
                <h3 style={serif(locale)} className="mt-8 text-[clamp(2rem,3.4vw,3.8rem)] leading-[1.02] tracking-[-0.03em]">
                  {isKo(locale) ? "Buena Park Injury Lawyer" : "The firm’s home base in Buena Park."}
                </h3>
                <p className="mt-6 max-w-[520px] text-[12px] leading-6 text-[#1E1C1A]/54">{brand.address}</p>
                <p className="mt-3 text-[12px] leading-6 text-[#1E1C1A]/54">{brand.phoneDisplay}</p>
              </div>
              <a href={`${prefix(locale)}/contact`} className="group mt-10 flex items-center justify-between border-t border-[#1E1C1A]/12 pt-5 text-[11px] font-semibold">
                <span>{isKo(locale) ? "사무실 및 상담 정보" : "Office & consultation information"}</span>
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
              </a>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-[#381907] text-[#F3EEE5]">
        <div className="site-shell py-20 md:py-28">
          <div className="grid gap-12 lg:grid-cols-[0.32fr_1.68fr]">
            <Eyebrow light>{isKo(locale) ? "지역 페이지의 역할" : "What local should mean"}</Eyebrow>
            <div>
              <p
                style={serif(locale)}
                className={isKo(locale)
                  ? "max-w-[1050px] text-[clamp(2rem,4vw,4.2rem)] font-medium leading-[1.25] tracking-[-0.04em]"
                  : "editorial-serif max-w-[1050px] text-[clamp(2.8rem,5vw,5.8rem)] leading-[0.96] tracking-[-0.04em]"}
              >
                {isKo(locale)
                  ? "지역 SEO를 위한 도시 이름이 아니라, 실제 의뢰인이 자신과 관련된 정보를 더 빨리 찾는 방법이어야 합니다."
                  : "A location page should not exist for a city name. It should help a real person find the relevant answer faster."}
              </p>
              <div className="mt-14 grid border-t border-white/16 md:grid-cols-3">
                {[
                  [MapPin, isKo(locale) ? "지역 맥락" : "Local context", isKo(locale) ? "사고가 발생한 지역과 실제 서비스 범위를 연결합니다." : "Connect the place of the accident to the firm’s actual service area."],
                  [Scale, isKo(locale) ? "관련 업무" : "Relevant practice", isKo(locale) ? "그 지역에서 필요한 사고·상해 업무로 바로 이동합니다." : "Move directly from the city to the accident and injury work that matters."],
                  [ShieldCheck, isKo(locale) ? "명확한 담당자" : "A clear attorney", isKo(locale) ? "누가 상담과 사건을 담당하는지 분명하게 보여줍니다." : "Make it obvious who the person is behind the legal work."],
                ].map(([Icon, title, body]) => {
                  const I = Icon as typeof MapPin;
                  return (
                    <div key={String(title)} className="border-b border-white/14 py-7 md:border-l md:px-7 md:first:border-l-0 md:first:pl-0">
                      <I className="h-4 w-4 stroke-[1.25] text-[#F3EEE5]/70" />
                      <div className="mt-10 text-[12px] font-semibold">{String(title)}</div>
                      <p className="mt-3 text-[10px] leading-5 text-white/46">{String(body)}</p>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </section>

      <Consultation locale={locale} />
    </main>
  </Frame>
);

const PracticeStrip = ({ locale }: { locale: SiteLocale }) => (
  <div className="grid gap-px bg-[#1E1C1A]/12 md:grid-cols-2 xl:grid-cols-4">
    {practiceAreas.slice(0, 8).map((practice, index) => (
      <a key={practice.slug} href={`${prefix(locale)}/practice-areas/${practice.slug}`} className="group min-h-[210px] bg-[#F3EEE5] p-6">
        <div className="flex items-center justify-between text-[9px] text-[#1E1C1A]/26">
          <span>{String(index + 1).padStart(2, "0")}</span><ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-1" />
        </div>
        <h3 style={serif(locale)} className="mt-12 text-[1.45rem] leading-tight">{isKo(locale) ? practice.koTitle : practice.title}</h3>
        <p className="mt-3 text-[10px] leading-5 text-[#1E1C1A]/46">{isKo(locale) ? practice.koDescription : practice.description}</p>
      </a>
    ))}
  </div>
);

export const LocationDetailPage = ({ locale }: { locale: SiteLocale }) => {
  const params = useParams({ strict: false }) as { slug?: string };
  const location = getServiceLocation(params.slug || "");
  if (!location) return null;

  const index = serviceLocations.findIndex((item) => item.slug === location.slug);
  const name = isKo(locale) ? location.koName : location.name;
  const description = isKo(locale) ? location.koDescription : location.description;
  const otherLocations = serviceLocations.filter((item) => item.slug !== location.slug).slice(0, 3);

  return (
    <Frame locale={locale}>
      <main>
        <section className="relative min-h-[82svh] overflow-hidden bg-[#1E1C1A] pt-[60px] text-[#F3EEE5]">
          <img src={locationImages[index % locationImages.length]} alt="" className="absolute inset-0 h-full w-full object-cover opacity-56" fetchPriority="high" />
          <div className="absolute inset-0 bg-gradient-to-t from-[#1E1C1A]/96 via-[#1E1C1A]/48 to-[#1E1C1A]/24" />
          <div className="site-shell relative z-10 flex min-h-[calc(82svh-60px)] items-end py-10 md:py-14">
            <div className="grid w-full gap-8 border-t border-white/16 pt-5 lg:grid-cols-[0.3fr_1.7fr]">
              <div>
                <Eyebrow light>{isKo(locale) ? "서비스 지역" : "Location"}</Eyebrow>
                <div className="mt-5 text-[9px] leading-5 text-white/34">{brand.address}<br />{brand.phoneDisplay}</div>
              </div>
              <div>
                <h1
                  style={serif(locale)}
                  className={isKo(locale)
                    ? "text-[clamp(3rem,6vw,6.4rem)] font-medium leading-[1.15] tracking-[-0.05em]"
                    : "editorial-serif text-[clamp(4.2rem,8vw,9rem)] leading-[0.84] tracking-[-0.06em]"}
                >
                  {name}
                </h1>
                <p className="mt-7 max-w-[760px] text-[13px] leading-7 text-white/60">{description}</p>
              </div>
            </div>
          </div>
        </section>

        <div className="sticky top-[60px] z-40 border-y border-[#1E1C1A]/10 bg-[#F9F8F6]/95 backdrop-blur-md">
          <div className="site-shell flex gap-6 overflow-x-auto py-4 text-[9px] font-semibold uppercase tracking-[0.13em] text-[#1E1C1A]/44">
            <a href="#local">{isKo(locale) ? "지역" : "Local focus"}</a>
            <a href="#practice">{isKo(locale) ? "업무" : "Practice areas"}</a>
            <a href="#attorney">{isKo(locale) ? "변호사" : "Attorney"}</a>
            <a href="#nearby">{isKo(locale) ? "인근 지역" : "Nearby"}</a>
          </div>
        </div>

        <section id="local" className="scroll-mt-28 bg-[#F9F8F6]">
          <div className="site-shell py-20 md:py-28">
            <Heading
              locale={locale}
              eyebrow="01 · Local focus"
              title={isKo(locale) ? `${name}에서 사고를 당했을 때, 지역과 사건 유형을 함께 봅니다.` : `For an accident in ${name}, start with the place — then the facts.`}
            />
            <div className="mt-14 grid gap-12 lg:grid-cols-[1.12fr_0.88fr] lg:gap-16">
              <div>
                <p style={serif(locale)} className="max-w-[790px] text-[clamp(1.7rem,3vw,3.2rem)] leading-[1.14] tracking-[-0.025em]">
                  {isKo(locale)
                    ? `${name} 페이지는 단순한 지역 키워드가 아니라 사고 유형, 증거, 보험, 치료 그리고 실제로 도움을 줄 변호사를 하나의 흐름으로 연결합니다.`
                    : `This ${name} page is a local starting point, not a duplicate landing page. The useful questions are what happened, what evidence exists, which insurance may apply, and how the injury has changed daily life.`}
                </p>
                <p className="mt-8 max-w-[700px] text-[12px] leading-6 text-[#1E1C1A]/52">
                  {isKo(locale)
                    ? "구체적인 법률 전략은 개별 사실관계와 적용 가능한 보험 및 법률을 검토한 뒤 결정됩니다."
                    : "The actual legal strategy depends on the individual facts, available coverage, and applicable law."}
                </p>
              </div>
              <div className="relative min-h-[400px] overflow-hidden bg-[#D8D1C8]">
                <img src={locationImages[(index + 1) % locationImages.length]} alt="" className="absolute inset-0 h-full w-full object-cover" loading="lazy" />
                <div className="absolute inset-0 bg-[#1E1C1A]/16" />
              </div>
            </div>
          </div>
        </section>

        <section id="practice" className="scroll-mt-28 bg-[#F3EEE5]">
          <div className="site-shell py-20 md:py-28">
            <Heading
              locale={locale}
              eyebrow="02 · Practice areas"
              title={isKo(locale) ? `${name}에서 연결되는 주요 사고·상해 업무.` : `The injury work connected to ${name}.`}
              body={isKo(locale) ? "사고 유형을 선택하면 해당 청구에서 중요한 증거, 보험과 진행 과정을 확인할 수 있습니다." : "Choose the accident type to see the evidence, insurance issues, and claim-development steps that usually matter most."}
            />
            <div className="mt-14"><PracticeStrip locale={locale} /></div>
          </div>
        </section>

        <section id="attorney" className="scroll-mt-28 bg-[#F9F8F6]">
          <div className="site-shell py-20 md:py-28">
            <Heading
              locale={locale}
              eyebrow="03 · Attorney"
              title={isKo(locale) ? "지역 페이지는 결국 사건을 맡는 사람으로 이어져야 합니다." : "A local page should eventually lead to the person handling the work."}
            />
            <div className="mt-14 grid overflow-hidden border border-[#1E1C1A]/12 lg:grid-cols-[0.82fr_1.18fr]">
              <div className="relative min-h-[500px] overflow-hidden bg-[#D8D1C8]">
                <img src={leadCounsel} alt="Howard Choi" className="absolute inset-0 h-full w-full object-cover" loading="lazy" />
                <div className="absolute inset-0 bg-[#1E1C1A]/20" />
              </div>
              <div className="flex min-h-[500px] flex-col justify-between p-8 md:p-11">
                <div>
                  <Eyebrow>Howard Choi · {isKo(locale) ? "변호사" : "Attorney"}</Eyebrow>
                  <h3 style={serif(locale)} className="mt-7 text-[clamp(2.2rem,4vw,4.6rem)] leading-[0.98] tracking-[-0.035em]">
                    {isKo(locale) ? `${name} 사고 상담을 부에나파크 사무실과 연결합니다.` : `Connecting ${name} injury matters to the Buena Park office.`}
                  </h3>
                  <p className="mt-6 max-w-[620px] text-[12px] leading-6 text-[#1E1C1A]/54">{brand.address}</p>
                </div>
                <div className="mt-10 grid gap-3 sm:grid-cols-2">
                  <a href={`${prefix(locale)}/attorney`} className="group flex items-center justify-between border-t border-[#1E1C1A]/12 pt-4 text-[11px] font-semibold">
                    <span>{isKo(locale) ? "Howard Choi 소개" : "Meet Howard Choi"}</span><ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-1" />
                  </a>
                  <a href={`${prefix(locale)}/contact`} className="group flex items-center justify-between border-t border-[#1E1C1A]/12 pt-4 text-[11px] font-semibold">
                    <span>{isKo(locale) ? "상담 예약" : "Schedule a consultation"}</span><ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-1" />
                  </a>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="bg-[#381907] text-[#F3EEE5]">
          <div className="site-shell py-20 md:py-24">
            <div className="grid gap-12 lg:grid-cols-[0.32fr_1.68fr]">
              <Eyebrow light>{isKo(locale) ? "첫 상담 준비" : "For the first conversation"}</Eyebrow>
              <div>
                <p style={serif(locale)} className={isKo(locale) ? "max-w-[980px] text-[clamp(1.9rem,3.8vw,4rem)] font-medium leading-[1.28]" : "editorial-serif max-w-[980px] text-[clamp(2.6rem,4.7vw,5.2rem)] leading-[0.98] tracking-[-0.04em]"}>
                  {isKo(locale) ? "완벽하게 정리된 사건 파일은 필요하지 않습니다. 핵심 사실부터 시작하면 됩니다." : "You do not need a perfect case file before calling. Start with the facts you already have."}
                </p>
                <div className="mt-14 grid border-t border-white/16 md:grid-cols-3">
                  {[
                    [MapPin, isKo(locale) ? "어디서" : "Where", isKo(locale) ? "사고 장소와 대략적인 시간." : "Where the accident happened and roughly when."],
                    [FileText, isKo(locale) ? "무슨 일이" : "What happened", isKo(locale) ? "사고 경위, 사진, 신고서 등 현재 가진 자료." : "The basic sequence, photos, reports, and records you already have."],
                    [ShieldCheck, isKo(locale) ? "현재 상황" : "Where things stand", isKo(locale) ? "치료, 보험 연락, 업무 영향과 가장 큰 걱정." : "Treatment, insurer contact, work impact, and the biggest concern now."],
                  ].map(([Icon, title, body]) => {
                    const I = Icon as typeof MapPin;
                    return <div key={String(title)} className="border-b border-white/14 py-7 md:border-l md:px-7 md:first:border-l-0 md:first:pl-0"><I className="h-4 w-4 stroke-[1.25] text-white/70" /><div className="mt-10 text-[12px] font-semibold">{String(title)}</div><p className="mt-3 text-[10px] leading-5 text-white/46">{String(body)}</p></div>;
                  })}
                </div>
              </div>
            </div>
          </div>
        </section>

        <section id="nearby" className="scroll-mt-28 bg-[#F3EEE5]">
          <div className="site-shell py-20 md:py-24">
            <Heading locale={locale} eyebrow="04 · Nearby" title={isKo(locale) ? "인근 서비스 지역도 확인하세요." : "Continue into nearby communities."} />
            <div className="mt-12 grid gap-px bg-[#1E1C1A]/12 md:grid-cols-3">
              {otherLocations.map((item, otherIndex) => (
                <a key={item.slug} href={`${prefix(locale)}/locations/${item.slug}`} className="group bg-[#F3EEE5] p-7">
                  <div className="flex items-center justify-between text-[9px] text-[#1E1C1A]/26"><span>0{otherIndex + 1}</span><ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-1" /></div>
                  <h3 style={serif(locale)} className="mt-10 text-[1.8rem] leading-tight">{isKo(locale) ? item.koName : item.name}</h3>
                  <p className="mt-4 text-[10px] leading-5 text-[#1E1C1A]/46">{isKo(locale) ? item.koDescription : item.description}</p>
                </a>
              ))}
            </div>
          </div>
        </section>

        <Consultation locale={locale} />
      </main>
    </Frame>
  );
};
