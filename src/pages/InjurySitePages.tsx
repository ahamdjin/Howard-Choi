import { motion } from "framer-motion";
import { ArrowRight, MapPin, Phone, Scale, ShieldCheck } from "lucide-react";
import { Link, useParams } from "react-router-dom";
import Navigation from "@/components/Navigation";
import KoreanNavigation from "@/components/KoreanNavigation";
import Footer from "@/components/Footer";
import KoreanFooter from "@/components/KoreanFooter";
import heroJustice from "@/assets/law-firm/hero-justice-library.webp";
import heroOffice from "@/assets/law-firm/hero-law-office.webp";
import heroBoardroom from "@/assets/law-firm/hero-city-boardroom.webp";
import heroCourthouse from "@/assets/law-firm/hero-courthouse.webp";
import { brand, getPracticeArea, getServiceLocation, practiceAreas, serviceLocations, type SiteLocale } from "@/data/injurySite";

const isKo = (locale: SiteLocale) => locale === "ko";
const serif = (locale: SiteLocale) => isKo(locale) ? { fontFamily: '"Noto Serif KR", serif' } : undefined;

const SiteFrame = ({ locale, children }: { locale: SiteLocale; children: React.ReactNode }) => (
  <div className="min-h-screen overflow-x-clip bg-background" style={isKo(locale) ? { fontFamily: '"Noto Sans KR", sans-serif' } : undefined}>
    {isKo(locale) ? <KoreanNavigation /> : <Navigation />}
    {children}
    {isKo(locale) ? <KoreanFooter /> : <Footer />}
  </div>
);

const PageHero = ({
  locale,
  eyebrow,
  title,
  description,
  image = heroJustice,
}: {
  locale: SiteLocale;
  eyebrow: string;
  title: string;
  description: string;
  image?: string;
}) => (
  <section className="relative flex min-h-[580px] h-[62svh] items-end overflow-hidden bg-[#17130f] text-[#f3eee5]">
    <img src={image} alt="" fetchPriority="high" decoding="async" className="absolute inset-0 h-full w-full object-cover" />
    <div className="absolute inset-0 bg-[#17130f]/62" />
    <div className="absolute inset-0 bg-gradient-to-t from-[#17130f]/90 via-[#17130f]/18 to-[#17130f]/24" />
    <div className="site-shell relative z-10 pb-14 md:pb-16">
      <motion.div initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7 }} className="max-w-[820px]">
        <span className="mb-4 block text-[11px] uppercase tracking-[0.16em] text-[#f3eee5]/58">{eyebrow}</span>
        <h1 style={serif(locale)} className={`${isKo(locale) ? "text-[clamp(2.65rem,4vw,4.35rem)] font-medium leading-[1.14] tracking-[-0.045em]" : "editorial-serif text-[clamp(3rem,4.7vw,5rem)] leading-[0.94] tracking-[-0.026em]"}`}>
          {title}
        </h1>
        <p className="mt-5 max-w-[650px] text-[15px] leading-7 text-[#f3eee5]/70 md:text-base">{description}</p>
      </motion.div>
    </div>
  </section>
);

const PhoneCta = ({ locale }: { locale: SiteLocale }) => (
  <section className="bg-[#171717] py-20 text-[#f3eee5] md:py-24">
    <div className="site-shell grid gap-8 lg:grid-cols-[1fr_auto] lg:items-end">
      <div className="max-w-[720px]">
        <span className="text-[11px] uppercase tracking-[0.16em] text-[#f3eee5]/42">{isKo(locale) ? "상담" : "Talk to an attorney"}</span>
        <h2 style={serif(locale)} className={`${isKo(locale) ? "mt-4 text-[clamp(2.25rem,3.4vw,3.5rem)] font-medium leading-[1.2] tracking-[-0.04em]" : "editorial-serif mt-4 text-[clamp(2.7rem,4vw,4.3rem)] leading-[0.96] tracking-[-0.025em]"}`}>
          {isKo(locale) ? "사고 이후의 다음 단계를 명확하게 확인하세요." : "Get clarity on what comes next after an accident."}
        </h2>
      </div>
      <a href={brand.phoneHref} className="liquid-cta inline-flex w-fit items-center gap-3 rounded-full px-6 py-3 text-[12px] font-medium">
        <Phone className="relative z-10 h-4 w-4" />
        <span className="relative z-10">{brand.phoneDisplay}</span>
      </a>
    </div>
  </section>
);

export const PracticeAreasPage = ({ locale }: { locale: SiteLocale }) => (
  <SiteFrame locale={locale}>
    <PageHero
      locale={locale}
      eyebrow={isKo(locale) ? "업무 분야" : "Practice Areas"}
      title={isKo(locale) ? "사고의 유형은 달라도, 목표는 분명합니다." : "Focused injury counsel for the moments that change everything."}
      description={isKo(locale) ? "자동차 사고부터 중대 상해와 부당 사망까지, 각각의 사건이 요구하는 증거와 보험 구조를 차분하게 정리합니다." : "From everyday collisions to catastrophic injuries, each claim deserves a clear understanding of the facts, available coverage, and the full impact of the injury."}
    />
    <main className="site-shell py-20 md:py-24">
      <div className="mb-12 grid gap-6 border-b border-foreground/12 pb-9 lg:grid-cols-[0.85fr_1.15fr] lg:items-end">
        <span className="text-[11px] uppercase tracking-[0.15em] text-muted-foreground">{isKo(locale) ? "개인 상해" : "Personal Injury"}</span>
        <p className="max-w-[650px] text-[17px] leading-7 text-foreground/66">{isKo(locale) ? "필요 이상으로 복잡하게 만들지 않습니다. 먼저 사고 유형을 정확히 파악하고, 중요한 증거와 책임 관계를 정리한 뒤 다음 단계를 결정합니다." : "The structure is simple: identify the type of accident, preserve the evidence that matters, understand who may be responsible, and build the claim around the actual consequences of the injury."}</p>
      </div>
      <div className="grid gap-px bg-foreground/12 md:grid-cols-2">
        {practiceAreas.map((practice, index) => (
          <Link key={practice.slug} to={`${isKo(locale) ? "/ko" : ""}/practice-areas/${practice.slug}`} className="group bg-background p-7 transition-colors hover:bg-[#ece8e2] md:p-9">
            <div className="mb-16 flex items-center justify-between text-[11px] text-muted-foreground"><span>0{index + 1}</span><ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" /></div>
            <h2 style={serif(locale)} className={`${isKo(locale) ? "text-[2rem] font-medium tracking-[-0.035em]" : "editorial-serif text-[2.45rem] leading-none tracking-[-0.02em]"}`}>{isKo(locale) ? practice.koTitle : practice.title}</h2>
            <p className="mt-4 max-w-[500px] text-[14px] leading-6 text-foreground/58">{isKo(locale) ? practice.koDescription : practice.description}</p>
          </Link>
        ))}
      </div>
    </main>
    <PhoneCta locale={locale} />
  </SiteFrame>
);

export const PracticeAreaDetailPage = ({ locale }: { locale: SiteLocale }) => {
  const { slug = "" } = useParams();
  const practice = getPracticeArea(slug);
  if (!practice) return null;
  const title = isKo(locale) ? practice.koTitle : practice.title;
  const description = isKo(locale) ? practice.koDescription : practice.description;
  const intro = isKo(locale) ? practice.koIntro : practice.intro;
  const issues = isKo(locale) ? practice.koIssues : practice.issues;

  return (
    <SiteFrame locale={locale}>
      <PageHero locale={locale} eyebrow={isKo(locale) ? "업무 분야" : "Practice Area"} title={`${title}${isKo(locale) ? " 변호사" : " Lawyer"}`} description={description} image={heroCourthouse} />
      <main className="site-shell py-20 md:py-24">
        <div className="grid gap-12 lg:grid-cols-[0.72fr_1.28fr] lg:gap-20">
          <aside>
            <div className="sticky top-28 border-t border-foreground/14 pt-5">
              <div className="text-[10px] uppercase tracking-[0.15em] text-muted-foreground">{isKo(locale) ? "관련 업무" : "Related practices"}</div>
              <div className="mt-5 space-y-3 text-[13px]">
                {practiceAreas.filter((item) => item.slug !== practice.slug).slice(0, 5).map((item) => <Link key={item.slug} to={`${isKo(locale) ? "/ko" : ""}/practice-areas/${item.slug}`} className="block text-foreground/56 hover:text-foreground">{isKo(locale) ? item.koTitle : item.title}</Link>)}
              </div>
            </div>
          </aside>
          <div>
            <p style={serif(locale)} className={`${isKo(locale) ? "text-[clamp(1.65rem,2.3vw,2.2rem)] font-medium leading-[1.55] tracking-[-0.025em]" : "editorial-serif text-[clamp(1.9rem,2.6vw,2.7rem)] leading-[1.15] tracking-[-0.018em]"}`}>{intro}</p>
            <section className="mt-12 border-t border-foreground/12 pt-9">
              <span className="text-[10px] uppercase tracking-[0.15em] text-muted-foreground">{isKo(locale) ? "주요 사건 유형" : "Matters we look at"}</span>
              <div className="mt-6 grid gap-px bg-foreground/10 sm:grid-cols-2">
                {issues.map((issue) => <div key={issue} className="bg-background px-5 py-5 text-[14px] leading-6">{issue}</div>)}
              </div>
            </section>
            <section className="mt-12 border-t border-foreground/12 pt-9">
              <h2 style={serif(locale)} className={`${isKo(locale) ? "text-[2rem] font-medium tracking-[-0.035em]" : "editorial-serif text-[2.7rem] leading-none"}`}>{isKo(locale) ? "사건을 준비하는 방식" : "How the claim is approached"}</h2>
              <div className="mt-6 space-y-5 text-[16px] leading-7 text-foreground/68">
                <p>{isKo(locale) ? "초기 단계에서는 사고 경위, 이용 가능한 기록, 보험 정보, 치료 상황을 한 흐름으로 정리합니다. 서두르기보다 무엇이 확인되었고 무엇이 아직 필요한지 구분하는 것이 중요합니다." : "The early work is about getting the story straight: what happened, what records exist, what insurance may apply, and how the medical picture is developing. Clarity at the beginning helps avoid preventable gaps later."}</p>
                <p>{isKo(locale) ? "그 다음에는 책임과 손해를 각각 살펴봅니다. 사건마다 사실관계가 다르기 때문에 결과를 약속하기보다 실제 증거를 바탕으로 전략을 세웁니다." : "From there, liability and damages are evaluated separately. Every case depends on its own facts, so the strategy should follow the evidence rather than promises about a particular outcome."}</p>
              </div>
            </section>
            <div className="mt-12 flex flex-wrap gap-3 border-t border-foreground/12 pt-7">
              <Link to={`${isKo(locale) ? "/ko" : ""}/locations/buena-park`} className="inline-flex items-center gap-2 text-[12px] text-foreground/60 hover:text-foreground"><MapPin className="h-4 w-4" />{isKo(locale) ? "부에나파크 지역" : "Buena Park"}</Link>
              <Link to={isKo(locale) ? "/ko/contact" : "/contact"} className="ml-auto inline-flex items-center gap-2 text-[12px] font-medium">{isKo(locale) ? "문의하기" : "Contact the firm"}<ArrowRight className="h-4 w-4" /></Link>
            </div>
          </div>
        </div>
      </main>
      <PhoneCta locale={locale} />
    </SiteFrame>
  );
};

export const AttorneyPage = ({ locale }: { locale: SiteLocale }) => (
  <SiteFrame locale={locale}>
    <PageHero locale={locale} eyebrow={isKo(locale) ? "변호사" : "Attorney"} title="Howard Choi" description={isKo(locale) ? "사고 이후의 중요한 결정을 복잡한 전달 단계 없이 직접적이고 명확하게 다루는 법률 접근 방식." : "A direct, clear approach to the decisions that follow a serious accident — without unnecessary layers between the client and the legal work."} image={heroOffice} />
    <main className="site-shell py-20 md:py-24">
      <div className="grid gap-12 lg:grid-cols-[0.8fr_1.2fr] lg:gap-20">
        <div>
          <span className="text-[10px] uppercase tracking-[0.15em] text-muted-foreground">{isKo(locale) ? "프로필" : "Profile"}</span>
          <div className="mt-5 border-y border-foreground/12 py-5 text-[13px] leading-7 text-foreground/62">
            <div>{isKo(locale) ? "변호사" : "Attorney"}</div>
            <div>{brand.address}</div>
            <a href={brand.phoneHref} className="hover:text-foreground">{brand.phoneDisplay}</a>
          </div>
        </div>
        <div>
          <h2 style={serif(locale)} className={`${isKo(locale) ? "text-[2.35rem] font-medium leading-[1.28] tracking-[-0.04em]" : "editorial-serif text-[clamp(2.8rem,4vw,4.2rem)] leading-[0.98] tracking-[-0.025em]"}`}>{isKo(locale) ? "사건을 맡는 사람과 직접 소통하는 것부터 시작합니다." : "The relationship starts with direct access to the person responsible for the work."}</h2>
          <div className="mt-8 space-y-6 text-[16px] leading-7 text-foreground/66">
            <p>{isKo(locale) ? "개인 상해 사건에서는 사고 사실, 치료, 보험, 생활의 변화가 모두 연결됩니다. 복잡한 절차를 더 복잡하게 설명하기보다 중요한 문제를 순서대로 정리하는 데 초점을 둡니다." : "Injury cases connect facts, medical treatment, insurance, and the way a person's life has changed. The focus is to organize those issues in the right order rather than making an already difficult process feel more complicated."}</p>
            <p>{isKo(locale) ? "이 페이지에는 확인되지 않은 수상 경력, 사건 결과, 학력 또는 경력을 추가하지 않습니다. 공식 프로필 정보가 확인되는 대로 실제 자료만 연결할 수 있도록 구조를 마련했습니다." : "This profile is intentionally limited to information that can be responsibly stated today. Verified admissions, education, professional memberships, representative matters, and publications can be added here as the firm provides them."}</p>
          </div>
          <div className="mt-10 grid gap-px bg-foreground/10 sm:grid-cols-2">
            <div className="bg-background p-6"><Scale className="mb-5 h-5 w-5 stroke-[1.4]" /><div className="text-[13px] font-medium">{isKo(locale) ? "개인 상해 중심" : "Personal injury focus"}</div><p className="mt-2 text-[13px] leading-6 text-foreground/52">{isKo(locale) ? "사고와 중대 상해 청구를 중심으로 구성된 업무 구조." : "A site and intake structure centered on accident and serious-injury matters."}</p></div>
            <div className="bg-background p-6"><ShieldCheck className="mb-5 h-5 w-5 stroke-[1.4]" /><div className="text-[13px] font-medium">{isKo(locale) ? "검증된 정보" : "Verified information only"}</div><p className="mt-2 text-[13px] leading-6 text-foreground/52">{isKo(locale) ? "실제 확인 가능한 경력과 결과만 공개하는 방식." : "Credentials and results are published only when they can be accurately supported."}</p></div>
          </div>
        </div>
      </div>
    </main>
    <PhoneCta locale={locale} />
  </SiteFrame>
);

export const ResultsPage = ({ locale }: { locale: SiteLocale }) => (
  <SiteFrame locale={locale}>
    <PageHero locale={locale} eyebrow={isKo(locale) ? "사건 결과" : "Results"} title={isKo(locale) ? "결과는 숫자보다 맥락이 중요합니다." : "Results should come with context, not just a number."} description={isKo(locale) ? "사건 결과는 사실관계와 법적 쟁점이 모두 다릅니다. 공개가 승인된 실제 결과만 이곳에 정리합니다." : "Every outcome depends on its own facts. This page is structured for real, approved case results — without placeholder settlements or manufactured proof."} image={heroBoardroom} />
    <main className="site-shell py-20 md:py-24">
      <div className="grid gap-8 lg:grid-cols-3">
        {(isKo(locale) ? ["차량 사고", "중대 상해", "시설 책임"] : ["Motor Vehicle Claims", "Serious Injury", "Premises Claims"]).map((label, index) => (
          <div key={label} className="border-t border-foreground/14 pt-6">
            <span className="text-[10px] text-muted-foreground">0{index + 1}</span>
            <h2 style={serif(locale)} className={`${isKo(locale) ? "mt-8 text-[1.8rem] font-medium" : "editorial-serif mt-8 text-[2.25rem] leading-none"}`}>{label}</h2>
            <p className="mt-4 text-[14px] leading-6 text-foreground/56">{isKo(locale) ? "공개 가능한 실제 사건 결과가 확인되면 사건 유형, 핵심 사실, 결과 및 필요한 고지와 함께 추가됩니다." : "Approved matters can be added with the case type, key facts, outcome, responsible attorney, and the appropriate result disclaimer."}</p>
          </div>
        ))}
      </div>
      <div className="mt-16 rounded-[3px] bg-[#e9e6e1] p-7 md:p-9">
        <div className="text-[11px] uppercase tracking-[0.15em] text-foreground/40">{isKo(locale) ? "중요 고지" : "Important"}</div>
        <p className="mt-4 max-w-[760px] text-[15px] leading-7 text-foreground/62">{isKo(locale) ? "과거의 결과는 향후 사건의 결과를 보장하지 않습니다. 각 사건은 고유한 사실과 법률에 따라 달라집니다." : "Past results do not guarantee or predict a similar outcome in a future matter. Every case is different and must be evaluated on its own facts."}</p>
      </div>
    </main>
    <PhoneCta locale={locale} />
  </SiteFrame>
);

export const AboutFirmPage = ({ locale }: { locale: SiteLocale }) => (
  <SiteFrame locale={locale}>
    <PageHero locale={locale} eyebrow={isKo(locale) ? "로펌 소개" : "About"} title={isKo(locale) ? "부에나파크에서 시작하는 집중된 상해 법률 서비스." : "A focused injury-law practice built around Buena Park."} description={isKo(locale) ? "큰 로펌처럼 보이기 위해 복잡하게 만들기보다, 사고 이후 필요한 법률 정보와 직접적인 도움을 더 쉽게 찾을 수 있도록 구성했습니다." : "Rather than building complexity for its own sake, the practice is organized so injured people can quickly understand the relevant claim, local service area, attorney, and next step."} image={heroJustice} />
    <main className="site-shell py-20 md:py-24">
      <div className="grid gap-12 lg:grid-cols-[0.72fr_1.28fr] lg:gap-20">
        <div className="text-[11px] uppercase tracking-[0.15em] text-muted-foreground">{isKo(locale) ? "Buena Park Injury Lawyer" : brand.name}</div>
        <div>
          <h2 style={serif(locale)} className={`${isKo(locale) ? "text-[2.35rem] font-medium leading-[1.3] tracking-[-0.04em]" : "editorial-serif text-[clamp(2.8rem,4vw,4.2rem)] leading-[0.98] tracking-[-0.025em]"}`}>{isKo(locale) ? "지역성, 명확성, 그리고 실제로 필요한 정보." : "Local relevance, clear information, and fewer unnecessary layers."}</h2>
          <div className="mt-8 space-y-6 text-[16px] leading-7 text-foreground/66">
            <p>{isKo(locale) ? "Buena Park Injury Lawyer는 부에나파크를 중심으로 풀러턴, 애너하임, 세리토스, 라미라다, 라하브라 지역의 사고·상해 사건을 위한 법률 정보를 구조적으로 제공합니다." : "Buena Park Injury Lawyer is centered on Buena Park and the surrounding communities of Fullerton, Anaheim, Cerritos, La Mirada, and La Habra. The site's structure reflects that local focus rather than pretending to serve every market equally."}</p>
            <p>{isKo(locale) ? "업무 분야, 지역, 변호사 프로필, 실제 사건 결과, 법률 블로그가 서로 연결되도록 설계해 방문자가 필요한 답을 찾기 쉽고 검색엔진도 사이트의 전문 주제를 명확하게 이해할 수 있도록 합니다." : "Practice areas, locations, the attorney profile, real case results, and the Law Blog are designed to connect to one another. That makes the site easier for people to navigate and gives search engines a clearer picture of what the practice actually focuses on."}</p>
          </div>
        </div>
      </div>
    </main>
    <PhoneCta locale={locale} />
  </SiteFrame>
);

export const LocationsPage = ({ locale }: { locale: SiteLocale }) => (
  <SiteFrame locale={locale}>
    <PageHero locale={locale} eyebrow={isKo(locale) ? "서비스 지역" : "Locations"} title={isKo(locale) ? "부에나파크와 인근 지역에 집중합니다." : "Local injury counsel across Buena Park and nearby communities."} description={isKo(locale) ? "넓은 지역을 얕게 다루기보다 서로 연결된 여섯 개 지역을 중심으로 사고·상해 정보를 제공합니다." : "A deliberate local footprint: Buena Park, Fullerton, Anaheim, Cerritos, La Mirada, and La Habra — connected to the injury practice areas people actually search for."} image={heroBoardroom} />
    <main className="site-shell py-20 md:py-24">
      <div className="grid gap-px bg-foreground/12 md:grid-cols-2 lg:grid-cols-3">
        {serviceLocations.map((location, index) => (
          <Link key={location.slug} to={`${isKo(locale) ? "/ko" : ""}/locations/${location.slug}`} className="group min-h-[290px] bg-background p-7 transition-colors hover:bg-[#ece8e2] md:p-8">
            <div className="flex items-center justify-between text-[11px] text-muted-foreground"><span>0{index + 1}</span><MapPin className="h-4 w-4" /></div>
            <h2 style={serif(locale)} className={`${isKo(locale) ? "mt-16 text-[2rem] font-medium tracking-[-0.035em]" : "editorial-serif mt-16 text-[2.6rem] leading-none tracking-[-0.02em]"}`}>{isKo(locale) ? location.koName : location.name}</h2>
            <p className="mt-4 text-[13px] leading-6 text-foreground/55">{isKo(locale) ? location.koDescription : location.description}</p>
            <div className="mt-7 inline-flex items-center gap-2 text-[11px] font-medium">{isKo(locale) ? "지역 보기" : "View location"}<ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-1" /></div>
          </Link>
        ))}
      </div>
    </main>
    <PhoneCta locale={locale} />
  </SiteFrame>
);

export const LocationDetailPage = ({ locale }: { locale: SiteLocale }) => {
  const { slug = "" } = useParams();
  const location = getServiceLocation(slug);
  if (!location) return null;
  const name = isKo(locale) ? location.koName : location.name;
  const description = isKo(locale) ? location.koDescription : location.description;

  return (
    <SiteFrame locale={locale}>
      <PageHero locale={locale} eyebrow={isKo(locale) ? "서비스 지역" : "Location"} title={`${name}${isKo(locale) ? " 사고·상해 변호사" : " Injury Lawyer"}`} description={description} image={heroJustice} />
      <main className="site-shell py-20 md:py-24">
        <div className="grid gap-12 lg:grid-cols-[0.75fr_1.25fr] lg:gap-20">
          <aside className="border-t border-foreground/14 pt-5">
            <div className="text-[10px] uppercase tracking-[0.15em] text-muted-foreground">{isKo(locale) ? "인근 지역" : "Nearby locations"}</div>
            <div className="mt-5 space-y-3 text-[13px]">{serviceLocations.filter((item) => item.slug !== location.slug).map((item) => <Link key={item.slug} to={`${isKo(locale) ? "/ko" : ""}/locations/${item.slug}`} className="block text-foreground/54 hover:text-foreground">{isKo(locale) ? item.koName : item.name}</Link>)}</div>
          </aside>
          <div>
            <h2 style={serif(locale)} className={`${isKo(locale) ? "text-[2.25rem] font-medium leading-[1.3] tracking-[-0.04em]" : "editorial-serif text-[clamp(2.75rem,4vw,4.1rem)] leading-[0.98] tracking-[-0.025em]"}`}>{isKo(locale) ? `${name}에서 사고를 당했다면.` : `If an accident happened in ${name}.`}</h2>
            <div className="mt-7 space-y-6 text-[16px] leading-7 text-foreground/66">
              <p>{isKo(locale) ? "사고 직후에는 치료, 보험 연락, 차량이나 현장 기록, 업무 중단 등 여러 문제가 동시에 생길 수 있습니다. 먼저 사실과 자료를 정리해 무엇이 중요한지 파악하는 것이 출발점입니다." : "After an accident, medical treatment, insurance calls, scene or vehicle evidence, and missed work can all begin at once. The first objective is to organize the facts and records so the important issues do not get lost in the noise."}</p>
              <p>{isKo(locale) ? `${name} 지역 페이지는 단순히 도시 이름을 바꾼 복제 페이지가 아니라, 해당 지역에서 필요한 사고 유형과 관련 법률 자료를 연결하는 로컬 허브로 확장하도록 설계되었습니다.` : `This ${location.name} page is designed as a local hub rather than a city-name duplicate. As verified local resources, case experience, and useful community-specific information become available, they can be added here without changing the site's structure.`}</p>
            </div>
            <section className="mt-12 border-t border-foreground/12 pt-9">
              <span className="text-[10px] uppercase tracking-[0.15em] text-muted-foreground">{isKo(locale) ? "관련 업무 분야" : "Relevant practice areas"}</span>
              <div className="mt-6 grid gap-px bg-foreground/10 sm:grid-cols-2">{practiceAreas.slice(0, 6).map((practice) => <Link key={practice.slug} to={`${isKo(locale) ? "/ko" : ""}/practice-areas/${practice.slug}`} className="group flex items-center justify-between bg-background px-5 py-5 text-[13px]"><span>{isKo(locale) ? practice.koTitle : practice.title}</span><ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-1" /></Link>)}</div>
            </section>
          </div>
        </div>
      </main>
      <PhoneCta locale={locale} />
    </SiteFrame>
  );
};
