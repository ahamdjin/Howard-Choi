import { motion } from "framer-motion";
import { ArrowRight, MapPin, Phone, Scale, ShieldCheck } from "lucide-react";
import type { ReactNode } from "react";
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
const prefixFor = (locale: SiteLocale) => isKo(locale) ? "/ko" : "";

const SiteFrame = ({ locale, children }: { locale: SiteLocale; children: ReactNode }) => (
  <div className="min-h-screen overflow-x-clip bg-background" style={isKo(locale) ? { fontFamily: '"Noto Sans KR", sans-serif' } : undefined}>
    {isKo(locale) ? <KoreanNavigation /> : <Navigation />}
    {children}
    {isKo(locale) ? <KoreanFooter /> : <Footer />}
  </div>
);

const PageHero = ({ locale, eyebrow, title, description, image = heroJustice }: { locale: SiteLocale; eyebrow: string; title: string; description: string; image?: string }) => (
  <section className="relative h-[72svh] min-h-[620px] overflow-hidden bg-[#17130f] text-[#f3eee5]">
    <motion.img initial={{ scale: 1.025, opacity: 0.82 }} animate={{ scale: 1, opacity: 1 }} transition={{ duration: 1.05, ease: [0.22, 1, 0.36, 1] }} src={image} alt="" fetchPriority="high" decoding="async" className="absolute inset-0 h-full w-full object-cover" />
    <div className="absolute inset-0 bg-[#17130f]/58" />
    <div className="absolute inset-0 bg-gradient-to-t from-[#17130f]/92 via-[#17130f]/18 to-[#17130f]/26" />
    <div className="site-shell relative z-10 flex h-full items-end pb-10 pt-[72px] md:pb-12 lg:pb-14">
      <motion.div initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.72 }} className="grid w-full gap-8 border-t border-[#f3eee5]/18 pt-5 lg:grid-cols-[0.38fr_1.62fr] lg:gap-12 xl:gap-16">
        <div>
          <span className="text-[9px] font-medium uppercase tracking-[0.17em] text-[#f3eee5]/48">{eyebrow}</span>
          <div className="mt-4 hidden text-[10px] leading-5 text-[#f3eee5]/34 lg:block">{brand.phoneDisplay}<br />Buena Park, California</div>
        </div>
        <div className="max-w-[980px]">
          <h1 style={serif(locale)} className={`${isKo(locale) ? "text-[clamp(2.1rem,3.1vw,3.45rem)] font-medium leading-[1.22] tracking-[-0.045em]" : "editorial-serif text-[clamp(2.35rem,3.45vw,3.9rem)] leading-[1] tracking-[-0.026em]"}`}>{title}</h1>
          <p className="mt-5 max-w-[720px] text-[14px] leading-6 text-[#f3eee5]/67 md:text-[15px] md:leading-7">{description}</p>
        </div>
      </motion.div>
    </div>
  </section>
);

const PhoneCta = ({ locale }: { locale: SiteLocale }) => (
  <section className="flex min-h-[58svh] items-center bg-[#171717] py-16 text-[#f3eee5] md:py-20">
    <div className="site-shell grid w-full gap-8 border-t border-white/12 pt-6 lg:grid-cols-[0.38fr_1.22fr_0.4fr] lg:items-end lg:gap-12 xl:gap-16">
      <div className="text-[9px] font-medium uppercase tracking-[0.16em] text-white/36">{isKo(locale) ? "상담" : "Talk to an attorney"}</div>
      <div className="max-w-[760px]">
        <h2 style={serif(locale)} className={`${isKo(locale) ? "text-[clamp(2rem,2.8vw,3rem)] font-medium leading-[1.3] tracking-[-0.04em]" : "editorial-serif text-[clamp(2.15rem,3vw,3.35rem)] leading-[1.02] tracking-[-0.024em]"}`}>{isKo(locale) ? "사고 이후의 다음 단계를 명확하게 확인하세요." : "Get clarity on what comes next after an accident."}</h2>
        <p className="mt-4 max-w-[560px] text-[13px] leading-6 text-white/50">{isKo(locale) ? "현재 상황을 간단히 알려주시면 상담 가능 여부와 필요한 다음 단계를 확인할 수 있습니다." : "Share the outline of what happened and the firm can determine whether the matter is a fit and what should happen next."}</p>
      </div>
      <div className="lg:justify-self-end"><a href={brand.phoneHref} className="liquid-cta inline-flex w-fit items-center gap-3 rounded-full px-6 py-3 text-[12px] font-medium"><Phone className="relative z-10 h-4 w-4" /><span className="relative z-10">{brand.phoneDisplay}</span></a></div>
    </div>
  </section>
);

const PageIntro = ({ locale, eyebrow, children }: { locale: SiteLocale; eyebrow: string; children: ReactNode }) => (
  <div className="grid gap-6 border-b border-foreground/12 pb-8 lg:grid-cols-[0.38fr_1.62fr] lg:gap-12 xl:gap-16">
    <span className="text-[9px] font-medium uppercase tracking-[0.16em] text-muted-foreground">{eyebrow}</span>
    <div className="max-w-[820px] text-[15px] leading-7 text-foreground/62">{children}</div>
  </div>
);

export const PracticeAreasPage = ({ locale }: { locale: SiteLocale }) => (
  <SiteFrame locale={locale}>
    <PageHero locale={locale} eyebrow={isKo(locale) ? "업무 분야" : "Practice Areas"} title={isKo(locale) ? "사고의 유형은 달라도, 다음 단계는 명확해야 합니다." : "Injury counsel organized around what happened."} description={isKo(locale) ? "자동차 사고부터 중대 상해와 부당 사망까지, 각각의 사건이 요구하는 증거와 보험 구조를 차분하게 정리합니다." : "From collisions to serious injuries and wrongful death, each matter starts with the facts, available coverage, and the real impact of the injury."} />
    <main className="site-shell py-16 md:py-20 lg:py-24">
      <PageIntro locale={locale} eyebrow={isKo(locale) ? "개인 상해" : "Personal Injury"}>{isKo(locale) ? "사고 유형을 먼저 정확히 파악하고, 중요한 증거와 책임 관계를 정리한 뒤 다음 단계를 결정합니다." : "Identify the type of accident, preserve what matters, understand responsibility, and build the claim around the actual consequences of the injury."}</PageIntro>
      <div className="mt-10 grid border-t border-foreground/12 sm:grid-cols-2 xl:grid-cols-4">
        {practiceAreas.map((practice, index) => (
          <Link key={practice.slug} to={`${prefixFor(locale)}/practice-areas/${practice.slug}`} className="group min-h-[250px] border-b border-foreground/12 p-0 py-6 sm:px-6 sm:first:pl-0 xl:border-l xl:first:border-l-0">
            <div className="flex items-center justify-between text-[9px] tabular-nums text-foreground/28"><span>{String(index + 1).padStart(2, "0")}</span><ArrowRight className="h-3.5 w-3.5 stroke-[1.35] transition-transform duration-300 group-hover:translate-x-1" /></div>
            <h2 style={serif(locale)} className={`${isKo(locale) ? "mt-14 text-[1.65rem] font-medium leading-[1.25] tracking-[-0.035em]" : "editorial-serif mt-14 text-[1.9rem] leading-[1.02] tracking-[-0.02em]"}`}>{isKo(locale) ? practice.koTitle : practice.title}</h2>
            <p className="mt-4 max-w-[340px] text-[12px] leading-5 text-foreground/52">{isKo(locale) ? practice.koDescription : practice.description}</p>
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
      <main className="site-shell py-16 md:py-20 lg:py-24">
        <div className="grid gap-12 lg:grid-cols-[0.36fr_1.64fr] lg:gap-12 xl:gap-16">
          <aside>
            <div className="sticky top-24 border-t border-foreground/14 pt-4">
              <div className="text-[9px] font-medium uppercase tracking-[0.15em] text-muted-foreground">{isKo(locale) ? "관련 업무" : "Related practices"}</div>
              <div className="mt-5 divide-y divide-foreground/10 text-[12px]">{practiceAreas.filter((item) => item.slug !== practice.slug).slice(0, 5).map((item, index) => <Link key={item.slug} to={`${prefixFor(locale)}/practice-areas/${item.slug}`} className="flex items-center justify-between py-3 text-foreground/54 transition-colors hover:text-foreground"><span>{isKo(locale) ? item.koTitle : item.title}</span><span className="text-[9px] text-foreground/24">0{index + 1}</span></Link>)}</div>
            </div>
          </aside>
          <div className="min-w-0">
            <p style={serif(locale)} className={`${isKo(locale) ? "max-w-[920px] text-[clamp(1.55rem,2vw,2rem)] font-medium leading-[1.55] tracking-[-0.025em]" : "editorial-serif max-w-[940px] text-[clamp(1.7rem,2.15vw,2.25rem)] leading-[1.22] tracking-[-0.018em]"}`}>{intro}</p>

            <section className="mt-12 border-t border-foreground/12 pt-5">
              <div className="grid gap-5 lg:grid-cols-[0.38fr_1.62fr] lg:gap-10">
                <span className="text-[9px] font-medium uppercase tracking-[0.15em] text-muted-foreground">{isKo(locale) ? "주요 사건 유형" : "Matters we look at"}</span>
                <div className="grid border-t border-foreground/10 sm:grid-cols-2 xl:grid-cols-3">{issues.map((issue, index) => <div key={issue} className="min-h-[110px] border-b border-foreground/10 py-4 sm:px-5 sm:first:pl-0 xl:border-l xl:first:border-l-0"><div className="text-[9px] text-foreground/24">{String(index + 1).padStart(2, "0")}</div><div className="mt-5 text-[13px] leading-5">{issue}</div></div>)}</div>
              </div>
            </section>

            <section className="mt-14 border-t border-foreground/12 pt-5">
              <div className="grid gap-6 lg:grid-cols-[0.38fr_1.62fr] lg:gap-10">
                <span className="text-[9px] font-medium uppercase tracking-[0.15em] text-muted-foreground">{isKo(locale) ? "접근 방식" : "Approach"}</span>
                <div>
                  <h2 style={serif(locale)} className={`${isKo(locale) ? "text-[1.8rem] font-medium leading-[1.35] tracking-[-0.035em]" : "editorial-serif text-[clamp(1.9rem,2.4vw,2.45rem)] leading-[1.08] tracking-[-0.02em]"}`}>{isKo(locale) ? "사건을 준비하는 방식" : "How the claim is approached"}</h2>
                  <div className="mt-7 grid gap-6 text-[14px] leading-7 text-foreground/62 md:grid-cols-2">
                    <p>{isKo(locale) ? "초기 단계에서는 사고 경위, 이용 가능한 기록, 보험 정보, 치료 상황을 한 흐름으로 정리합니다. 무엇이 확인되었고 무엇이 아직 필요한지 구분하는 것이 중요합니다." : "The early work is about getting the story straight: what happened, what records exist, what insurance may apply, and how the medical picture is developing."}</p>
                    <p>{isKo(locale) ? "그 다음에는 책임과 손해를 각각 살펴봅니다. 사건마다 사실관계가 다르기 때문에 결과를 약속하기보다 실제 증거를 바탕으로 전략을 세웁니다." : "From there, liability and damages are evaluated separately. Every case depends on its own facts, so the strategy follows the evidence rather than promises about a particular outcome."}</p>
                  </div>
                </div>
              </div>
            </section>

            <div className="mt-14 flex flex-wrap items-center gap-4 border-t border-foreground/12 pt-5">
              <Link to={`${prefixFor(locale)}/locations/buena-park`} className="inline-flex items-center gap-2 text-[11px] text-foreground/52 hover:text-foreground"><MapPin className="h-3.5 w-3.5" />{isKo(locale) ? "부에나파크 지역" : "Buena Park"}</Link>
              <Link to={`${prefixFor(locale)}/contact`} className="ml-auto inline-flex items-center gap-2 text-[11px] font-medium">{isKo(locale) ? "문의하기" : "Contact the firm"}<ArrowRight className="h-3.5 w-3.5" /></Link>
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
    <main className="site-shell py-16 md:py-20 lg:py-24">
      <div className="grid gap-12 lg:grid-cols-[0.36fr_1.64fr] lg:gap-12 xl:gap-16">
        <aside>
          <div className="sticky top-24 border-t border-foreground/14 pt-4">
            <span className="text-[9px] font-medium uppercase tracking-[0.15em] text-muted-foreground">{isKo(locale) ? "프로필" : "Profile"}</span>
            <div className="mt-5 border-b border-foreground/12 pb-5 text-[12px] leading-6 text-foreground/58"><div>{isKo(locale) ? "변호사" : "Attorney"}</div><div>{brand.address}</div><a href={brand.phoneHref} className="transition-colors hover:text-foreground">{brand.phoneDisplay}</a></div>
          </div>
        </aside>
        <div>
          <h2 style={serif(locale)} className={`${isKo(locale) ? "max-w-[920px] text-[clamp(2rem,2.65vw,2.8rem)] font-medium leading-[1.32] tracking-[-0.04em]" : "editorial-serif max-w-[980px] text-[clamp(2.15rem,2.8vw,3.05rem)] leading-[1.05] tracking-[-0.024em]"}`}>{isKo(locale) ? "사건을 맡는 사람과 직접 소통하는 것부터 시작합니다." : "Direct access to the person responsible for the work."}</h2>
          <div className="mt-8 grid gap-6 text-[14px] leading-7 text-foreground/62 md:grid-cols-2">
            <p>{isKo(locale) ? "개인 상해 사건에서는 사고 사실, 치료, 보험, 생활의 변화가 모두 연결됩니다. 중요한 문제를 순서대로 정리하는 데 초점을 둡니다." : "Injury cases connect facts, medical treatment, insurance, and the way a person's life has changed. The focus is to organize those issues in the right order rather than add another layer of complexity."}</p>
            <p>{isKo(locale) ? "확인되지 않은 수상 경력, 사건 결과, 학력 또는 경력을 추가하지 않습니다. 공식 프로필 정보가 제공되는 대로 실제 자료만 연결합니다." : "The profile intentionally avoids unsupported credentials. Verified admissions, education, memberships, representative matters, and publications can be added as the firm provides them."}</p>
          </div>
          <div className="mt-12 grid border-t border-foreground/12 sm:grid-cols-2">
            <div className="min-h-[190px] border-b border-foreground/12 py-6 sm:pr-8"><Scale className="h-4 w-4 stroke-[1.35]" /><div className="mt-10 text-[13px] font-medium">{isKo(locale) ? "개인 상해 중심" : "Personal injury focus"}</div><p className="mt-2 max-w-[400px] text-[12px] leading-5 text-foreground/50">{isKo(locale) ? "사고와 중대 상해 청구를 중심으로 구성된 업무 구조." : "A practice and intake structure centered on accident and serious-injury matters."}</p></div>
            <div className="min-h-[190px] border-b border-foreground/12 py-6 sm:border-l sm:pl-8"><ShieldCheck className="h-4 w-4 stroke-[1.35]" /><div className="mt-10 text-[13px] font-medium">{isKo(locale) ? "검증된 정보" : "Verified information only"}</div><p className="mt-2 max-w-[400px] text-[12px] leading-5 text-foreground/50">{isKo(locale) ? "실제 확인 가능한 경력과 결과만 공개하는 방식." : "Credentials and results are published only when they can be accurately supported."}</p></div>
          </div>
        </div>
      </div>
    </main>
    <PhoneCta locale={locale} />
  </SiteFrame>
);

export const ResultsPage = ({ locale }: { locale: SiteLocale }) => (
  <SiteFrame locale={locale}>
    <PageHero locale={locale} eyebrow={isKo(locale) ? "사건 결과" : "Results"} title={isKo(locale) ? "결과는 숫자보다 맥락이 중요합니다." : "Results, with the context that matters."} description={isKo(locale) ? "사건 결과는 사실관계와 법적 쟁점이 모두 다릅니다. 공개가 승인된 실제 결과만 이곳에 정리합니다." : "Every outcome depends on its own facts. This page is reserved for real, approved case results — without placeholder settlements or manufactured proof."} image={heroBoardroom} />
    <main className="site-shell py-16 md:py-20 lg:py-24">
      <PageIntro locale={locale} eyebrow={isKo(locale) ? "검증된 결과" : "Verified outcomes"}>{isKo(locale) ? "공개 가능한 실제 사건 결과가 제공되면 사건 유형, 핵심 사실, 결과와 필요한 고지를 함께 정리합니다." : "When approved matters are provided, each result can show the case type, key facts, outcome, responsible attorney, and the appropriate disclaimer."}</PageIntro>
      <div className="mt-10 grid border-t border-foreground/12 lg:grid-cols-3">
        {(isKo(locale) ? ["차량 사고", "중대 상해", "시설 책임"] : ["Motor Vehicle Claims", "Serious Injury", "Premises Claims"]).map((label, index) => (
          <div key={label} className="min-h-[260px] border-b border-foreground/12 py-6 lg:border-l lg:px-8 lg:first:border-l-0 lg:first:pl-0">
            <span className="text-[9px] tabular-nums text-foreground/26">0{index + 1}</span>
            <h2 style={serif(locale)} className={`${isKo(locale) ? "mt-14 text-[1.6rem] font-medium" : "editorial-serif mt-14 text-[1.9rem] leading-[1.05]"}`}>{label}</h2>
            <p className="mt-4 max-w-[400px] text-[12px] leading-5 text-foreground/50">{isKo(locale) ? "실제 결과가 확인되는 대로 이 영역에 추가됩니다." : "Verified matters can be added here as soon as they are approved for publication."}</p>
          </div>
        ))}
      </div>
      <div className="mt-10 grid gap-5 border-t border-foreground/12 pt-5 lg:grid-cols-[0.38fr_1.62fr]"><div className="text-[9px] font-medium uppercase tracking-[0.15em] text-foreground/34">{isKo(locale) ? "중요 고지" : "Important"}</div><p className="max-w-[820px] text-[13px] leading-6 text-foreground/54">{isKo(locale) ? "과거의 결과는 향후 사건의 결과를 보장하지 않습니다. 각 사건은 고유한 사실과 법률에 따라 달라집니다." : "Past results do not guarantee or predict a similar outcome in a future matter. Every case is different and must be evaluated on its own facts."}</p></div>
    </main>
    <PhoneCta locale={locale} />
  </SiteFrame>
);

export const AboutFirmPage = ({ locale }: { locale: SiteLocale }) => (
  <SiteFrame locale={locale}>
    <PageHero locale={locale} eyebrow={isKo(locale) ? "로펌 소개" : "About"} title={isKo(locale) ? "부에나파크를 중심으로 한 집중된 상해 법률 서비스." : "A focused injury-law practice centered on Buena Park."} description={isKo(locale) ? "사고 이후 필요한 정보, 담당 변호사, 지역과 다음 단계를 더 쉽게 이해할 수 있도록 구성했습니다." : "The practice is organized so injured people can quickly understand the relevant claim, local service area, attorney, and next step."} image={heroJustice} />
    <main className="site-shell py-16 md:py-20 lg:py-24">
      <div className="grid gap-10 lg:grid-cols-[0.36fr_1.64fr] lg:gap-12 xl:gap-16">
        <div className="border-t border-foreground/14 pt-4 text-[9px] font-medium uppercase tracking-[0.15em] text-muted-foreground">{brand.name}</div>
        <div>
          <h2 style={serif(locale)} className={`${isKo(locale) ? "max-w-[920px] text-[clamp(2rem,2.6vw,2.8rem)] font-medium leading-[1.35] tracking-[-0.04em]" : "editorial-serif max-w-[980px] text-[clamp(2.15rem,2.8vw,3.05rem)] leading-[1.05] tracking-[-0.024em]"}`}>{isKo(locale) ? "지역성, 명확성, 그리고 필요한 정보에 집중합니다." : "Local relevance, clear information, fewer unnecessary layers."}</h2>
          <div className="mt-8 grid gap-6 text-[14px] leading-7 text-foreground/62 md:grid-cols-2">
            <p>{isKo(locale) ? "Buena Park Injury Lawyer는 부에나파크를 중심으로 풀러턴, 애너하임, 세리토스, 라미라다, 라하브라 지역의 사고·상해 정보를 구조적으로 제공합니다." : "Buena Park Injury Lawyer is centered on Buena Park and the surrounding communities of Fullerton, Anaheim, Cerritos, La Mirada, and La Habra."}</p>
            <p>{isKo(locale) ? "업무 분야, 지역, 변호사 프로필, 실제 사건 결과와 법률 블로그가 서로 연결되도록 구성해 필요한 답을 찾기 쉽게 합니다." : "Practice areas, locations, the attorney profile, real case results, and the Law Blog are designed to connect so people can move naturally from a question to the right next step."}</p>
          </div>
        </div>
      </div>
    </main>
    <PhoneCta locale={locale} />
  </SiteFrame>
);

export const LocationsPage = ({ locale }: { locale: SiteLocale }) => (
  <SiteFrame locale={locale}>
    <PageHero locale={locale} eyebrow={isKo(locale) ? "서비스 지역" : "Locations"} title={isKo(locale) ? "부에나파크와 인근 지역에 집중합니다." : "Local injury counsel across Buena Park and nearby communities."} description={isKo(locale) ? "넓은 지역을 얕게 다루기보다 서로 연결된 여섯 개 지역을 중심으로 사고·상해 정보를 제공합니다." : "A deliberate local footprint: Buena Park, Fullerton, Anaheim, Cerritos, La Mirada, and La Habra."} image={heroBoardroom} />
    <main className="site-shell py-16 md:py-20 lg:py-24">
      <PageIntro locale={locale} eyebrow={isKo(locale) ? "서비스 지역" : "Service area"}>{isKo(locale) ? "각 지역 페이지는 단순한 도시명 복제가 아니라 관련 사고 유형과 지역 정보를 연결하는 로컬 허브로 확장할 수 있도록 구성했습니다." : "Each location is structured as a local hub that can connect relevant accident types, verified local information, and useful resources rather than simply swapping city names."}</PageIntro>
      <div className="mt-10 grid border-t border-foreground/12 md:grid-cols-2 xl:grid-cols-3">
        {serviceLocations.map((location, index) => (
          <Link key={location.slug} to={`${prefixFor(locale)}/locations/${location.slug}`} className="group min-h-[270px] border-b border-foreground/12 py-6 md:px-7 md:first:pl-0 xl:border-l xl:first:border-l-0">
            <div className="flex items-center justify-between text-[9px] text-foreground/28"><span>{String(index + 1).padStart(2, "0")}</span><MapPin className="h-3.5 w-3.5 stroke-[1.35]" /></div>
            <h2 style={serif(locale)} className={`${isKo(locale) ? "mt-16 text-[1.7rem] font-medium tracking-[-0.035em]" : "editorial-serif mt-16 text-[2rem] leading-none tracking-[-0.02em]"}`}>{isKo(locale) ? location.koName : location.name}</h2>
            <p className="mt-4 max-w-[420px] text-[12px] leading-5 text-foreground/50">{isKo(locale) ? location.koDescription : location.description}</p>
            <div className="mt-6 inline-flex items-center gap-2 text-[10px] font-medium uppercase tracking-[0.08em] text-foreground/42 group-hover:text-foreground">{isKo(locale) ? "지역 보기" : "View location"}<ArrowRight className="h-3 w-3 transition-transform group-hover:translate-x-1" /></div>
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
      <main className="site-shell py-16 md:py-20 lg:py-24">
        <div className="grid gap-12 lg:grid-cols-[0.36fr_1.64fr] lg:gap-12 xl:gap-16">
          <aside>
            <div className="sticky top-24 border-t border-foreground/14 pt-4"><div className="text-[9px] font-medium uppercase tracking-[0.15em] text-muted-foreground">{isKo(locale) ? "인근 지역" : "Nearby locations"}</div><div className="mt-5 divide-y divide-foreground/10 text-[12px]">{serviceLocations.filter((item) => item.slug !== location.slug).map((item) => <Link key={item.slug} to={`${prefixFor(locale)}/locations/${item.slug}`} className="flex items-center justify-between py-3 text-foreground/54 hover:text-foreground"><span>{isKo(locale) ? item.koName : item.name}</span><ArrowRight className="h-3 w-3 stroke-[1.25] text-foreground/24" /></Link>)}</div></div>
          </aside>
          <div>
            <h2 style={serif(locale)} className={`${isKo(locale) ? "max-w-[900px] text-[clamp(2rem,2.6vw,2.8rem)] font-medium leading-[1.35] tracking-[-0.04em]" : "editorial-serif max-w-[940px] text-[clamp(2.1rem,2.75vw,3rem)] leading-[1.06] tracking-[-0.024em]"}`}>{isKo(locale) ? `${name}에서 사고를 당했다면.` : `If an accident happened in ${name}.`}</h2>
            <div className="mt-8 grid gap-6 text-[14px] leading-7 text-foreground/62 md:grid-cols-2">
              <p>{isKo(locale) ? "사고 직후에는 치료, 보험 연락, 차량이나 현장 기록, 업무 중단 등 여러 문제가 동시에 생길 수 있습니다. 먼저 사실과 자료를 정리해 무엇이 중요한지 파악하는 것이 출발점입니다." : "After an accident, medical treatment, insurance calls, scene or vehicle evidence, and missed work can all begin at once. The first objective is to organize the facts and records so important issues do not get lost."}</p>
              <p>{isKo(locale) ? `${name} 지역 페이지는 관련 사고 유형과 지역별 법률 자료를 연결하는 로컬 허브로 확장하도록 설계되었습니다.` : `This ${location.name} page is designed as a local hub. Verified local resources, case experience, and useful community-specific information can be added here as they become available.`}</p>
            </div>
            <section className="mt-14 border-t border-foreground/12 pt-5">
              <div className="grid gap-5 lg:grid-cols-[0.38fr_1.62fr] lg:gap-10"><span className="text-[9px] font-medium uppercase tracking-[0.15em] text-muted-foreground">{isKo(locale) ? "관련 업무 분야" : "Relevant practice areas"}</span><div className="grid border-t border-foreground/10 sm:grid-cols-2 xl:grid-cols-3">{practiceAreas.slice(0, 6).map((practice, index) => <Link key={practice.slug} to={`${prefixFor(locale)}/practice-areas/${practice.slug}`} className="group min-h-[100px] border-b border-foreground/10 py-4 sm:px-5 sm:first:pl-0 xl:border-l xl:first:border-l-0"><div className="text-[9px] text-foreground/24">0{index + 1}</div><div className="mt-5 flex items-center justify-between gap-2 text-[12px]"><span>{isKo(locale) ? practice.koTitle : practice.title}</span><ArrowRight className="h-3 w-3 transition-transform group-hover:translate-x-1" /></div></Link>)}</div></div>
            </section>
          </div>
        </div>
      </main>
      <PhoneCta locale={locale} />
    </SiteFrame>
  );
};
