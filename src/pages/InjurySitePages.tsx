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

const ImageSlot = ({ label, portrait = false }: { label: string; portrait?: boolean }) => (
  <div className={`${portrait ? "h-[36svh] min-h-[260px] max-h-[390px]" : "h-[46svh] min-h-[320px] max-h-[500px]"} relative w-full overflow-hidden border border-foreground/10 bg-[#e8e3da] text-foreground`}>
    <div className="absolute inset-0 opacity-60" style={{ backgroundImage: "linear-gradient(135deg, rgba(31,27,23,.025) 25%, transparent 25%, transparent 50%, rgba(31,27,23,.025) 50%, rgba(31,27,23,.025) 75%, transparent 75%)", backgroundSize: "30px 30px" }} />
    <div className="absolute inset-3 border border-foreground/[0.07]" />
    <div className="absolute bottom-3 top-3 left-1/2 w-px bg-foreground/[0.04]" />
    <div className="absolute left-3 right-3 top-1/2 h-px bg-foreground/[0.04]" />
    <div className="absolute inset-x-5 top-5 flex items-center justify-between text-[8px] font-medium uppercase tracking-[0.16em] text-foreground/34"><span>Image space</span><span>{portrait ? "PORTRAIT" : "EDITORIAL"}</span></div>
    <div className="absolute inset-x-5 bottom-5 grid grid-cols-[1fr_auto] items-end gap-6 border-t border-foreground/[0.08] pt-3 text-[10px] leading-4 text-foreground/48"><span className="max-w-[78%]">{label}</span><span className="text-[8px] uppercase tracking-[0.14em] text-foreground/28">{portrait ? "4 : 5" : "16 : 10"}</span></div>
  </div>
);

const PageHero = ({ locale, eyebrow, title, description, image = heroJustice }: { locale: SiteLocale; eyebrow: string; title: string; description: string; image?: string }) => (
  <section className="relative h-[70svh] min-h-[600px] overflow-hidden bg-[#17130f] text-[#f3eee5]">
    <motion.img initial={{ scale: 1.025, opacity: 0.82 }} animate={{ scale: 1, opacity: 1 }} transition={{ duration: 1.05, ease: [0.22, 1, 0.36, 1] }} src={image} alt="" fetchPriority="high" decoding="async" className="absolute inset-0 h-full w-full object-cover" />
    <div className="absolute inset-0 bg-[#17130f]/60" />
    <div className="absolute inset-0 bg-gradient-to-t from-[#17130f]/92 via-[#17130f]/18 to-[#17130f]/28" />
    <div className="site-shell relative z-10 flex h-full items-end pb-10 pt-[72px] md:pb-12 lg:pb-14">
      <motion.div initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.72 }} className="grid w-full gap-8 border-t border-[#f3eee5]/18 pt-5 lg:grid-cols-[0.34fr_1.66fr] lg:gap-12 xl:gap-16">
        <div><span className="text-[9px] font-medium uppercase tracking-[0.17em] text-[#f3eee5]/48">{eyebrow}</span><div className="mt-4 hidden text-[10px] leading-5 text-[#f3eee5]/34 lg:block">{brand.phoneDisplay}<br />Buena Park, California</div></div>
        <div className="max-w-[980px]"><h1 style={serif(locale)} className={`${isKo(locale) ? "text-[clamp(2rem,2.9vw,3.2rem)] font-medium leading-[1.24] tracking-[-0.045em]" : "editorial-serif text-[clamp(2.2rem,3.05vw,3.45rem)] leading-[1.02] tracking-[-0.026em]"}`}>{title}</h1><p className="mt-5 max-w-[740px] text-[13px] leading-6 text-[#f3eee5]/67 md:text-[14px] md:leading-7">{description}</p></div>
      </motion.div>
    </div>
  </section>
);

const TopicSection = ({ locale, number, eyebrow, title, body, children, warm = false }: { locale: SiteLocale; number: string; eyebrow: string; title: string; body?: string; children?: ReactNode; warm?: boolean }) => (
  <section className={`relative min-h-[100svh] overflow-hidden ${warm ? "bg-[#f3efe8]" : "bg-background"}`}>
    <div className="site-shell grid min-h-[100svh] w-full grid-rows-[auto_1fr_auto] py-10 md:py-12 lg:py-10">
      <div className="grid gap-5 border-t border-foreground/12 pt-5 lg:grid-cols-[0.3fr_1.7fr] lg:gap-12 xl:gap-16">
        <div className="flex items-start gap-3 text-[9px] font-medium uppercase tracking-[0.16em] text-muted-foreground"><span>{number}</span><span>{eyebrow}</span></div>
        <div><h2 style={serif(locale)} className={`${isKo(locale) ? "max-w-[900px] text-[clamp(1.65rem,2.15vw,2.3rem)] font-medium leading-[1.4] tracking-[-0.035em]" : "editorial-serif max-w-[960px] text-[clamp(1.8rem,2.2vw,2.4rem)] leading-[1.12] tracking-[-0.02em]"}`}>{title}</h2>{body && <p className="mt-4 max-w-[760px] text-[12px] leading-6 text-foreground/52 md:text-[13px]">{body}</p>}</div>
      </div>
      <div className="flex min-h-0 items-center py-7 md:py-8 lg:py-6"><div className="w-full">{children}</div></div>
      <div className="grid grid-cols-[1fr_auto] gap-6 border-t border-foreground/10 pt-4 text-[8px] font-medium uppercase tracking-[0.14em] text-foreground/30 sm:grid-cols-3">
        <span>{brand.name}</span><span className="hidden text-center sm:block">{number} · {eyebrow}</span><span className="text-right">{isKo(locale) ? "계속" : "Continue"} ↓</span>
      </div>
    </div>
  </section>
);

const PhoneCta = ({ locale }: { locale: SiteLocale }) => (
  <section className="min-h-[100svh] bg-[#171717] text-[#f3eee5]">
    <div className="site-shell grid min-h-[100svh] grid-rows-[auto_1fr_auto] py-10 md:py-12">
      <div className="grid gap-5 border-t border-white/12 pt-5 lg:grid-cols-[0.3fr_1.7fr] lg:gap-12 xl:gap-16"><div className="text-[9px] font-medium uppercase tracking-[0.16em] text-white/36">{isKo(locale) ? "상담" : "Consultation"}</div><div className="text-[9px] uppercase tracking-[0.14em] text-white/28">{isKo(locale) ? "다음 단계" : "Next step"}</div></div>
      <div className="grid items-center gap-10 py-8 lg:grid-cols-[0.86fr_1.14fr] lg:gap-14 xl:gap-20">
        <div><h2 style={serif(locale)} className={`${isKo(locale) ? "max-w-[620px] text-[clamp(1.8rem,2.45vw,2.65rem)] font-medium leading-[1.36] tracking-[-0.04em]" : "editorial-serif max-w-[680px] text-[clamp(1.95rem,2.5vw,2.8rem)] leading-[1.06] tracking-[-0.024em]"}`}>{isKo(locale) ? "사고 이후 무엇을 해야 하는지 명확하게 정리하세요." : "Get a clear answer on what should happen next."}</h2><p className="mt-5 max-w-[520px] text-[12px] leading-6 text-white/48">{isKo(locale) ? "현재 상황을 간단히 알려주시면 상담 가능 여부와 다음 단계를 확인할 수 있습니다." : "Share the outline of what happened and the firm can determine whether the matter is a fit and what the next step should be."}</p><div className="mt-8 flex flex-wrap items-center gap-3"><a href={brand.phoneHref} className="liquid-cta inline-flex w-fit items-center gap-3 rounded-full px-6 py-3 text-[12px] font-medium"><Phone className="relative z-10 h-4 w-4" /><span className="relative z-10">{brand.phoneDisplay}</span></a><Link to={`${prefixFor(locale)}/contact`} className="inline-flex items-center gap-2 border-b border-white/25 pb-1 text-[11px] text-white/66 hover:text-white">{isKo(locale) ? "온라인 문의" : "Contact online"}<ArrowRight className="h-3 w-3" /></Link></div></div>
        <div className="relative h-[42svh] min-h-[300px] max-h-[500px] overflow-hidden border border-white/10"><img src={heroBoardroom} alt="" loading="lazy" decoding="async" className="absolute inset-0 h-full w-full object-cover opacity-70" /><div className="absolute inset-0 bg-[#171717]/35" /><div className="absolute inset-x-5 top-5 flex items-center justify-between text-[8px] uppercase tracking-[0.16em] text-white/38"><span>{isKo(locale) ? "상담 공간" : "Conversation"}</span><span>Buena Park</span></div><div className="absolute inset-x-5 bottom-5 border-t border-white/12 pt-3 text-[10px] leading-4 text-white/48">{isKo(locale) ? "사건의 사실과 다음 단계를 차분하게 정리하는 자리." : "A focused place to understand the facts, the options, and the next step."}</div></div>
      </div>
      <div className="grid gap-3 border-t border-white/12 pt-4 text-[8px] uppercase tracking-[0.14em] text-white/30 sm:grid-cols-3"><span>{brand.name}</span><span className="sm:text-center">6301 Beach Blvd · Buena Park</span><span className="sm:text-right">{brand.phoneDisplay}</span></div>
    </div>
  </section>
);

const attorneySlots = (locale: SiteLocale) => isKo(locale) ? [
  { name: "Howard Choi", role: "변호사", note: "학력, 변호사 등록, 언어, 주요 업무와 대표 사건을 위한 실제 프로필 공간입니다.", real: true },
  { name: "추가 변호사", role: "프로필 공간", note: "두 번째 변호사의 사진, 소개, 업무 분야와 결과를 위한 공간입니다.", real: false },
  { name: "추가 변호사", role: "프로필 공간", note: "팀이 늘어나도 같은 구조에서 새로운 프로필을 추가할 수 있습니다.", real: false },
] : [
  { name: "Howard Choi", role: "Attorney", note: "Ready for verified education, admissions, languages, focus areas, representative matters, and media.", real: true },
  { name: "Additional attorney", role: "Profile space", note: "Reserved for a second attorney portrait, bio, practice focus, credentials, and linked results.", real: false },
  { name: "Additional attorney", role: "Profile space", note: "The team can expand here without redesigning the page.", real: false },
];

const AttorneyGrid = ({ locale }: { locale: SiteLocale }) => (
  <div className="grid border-t border-foreground/12 md:grid-cols-3">
    {attorneySlots(locale).map((attorney, index) => {
      const content = <><ImageSlot portrait label={attorney.real ? (isKo(locale) ? "변호사 전문 사진" : "Attorney portrait") : (isKo(locale) ? "추가 변호사 사진" : "Additional attorney portrait")} /><div className="pt-4"><div className="flex items-center justify-between gap-3"><div><div className="text-[13px] font-medium">{attorney.name}</div><div className="mt-1 text-[9px] uppercase tracking-[0.12em] text-muted-foreground">{attorney.role}</div></div>{attorney.real && <ArrowRight className="h-3.5 w-3.5 text-foreground/34" />}</div><p className="mt-3 max-w-[360px] text-[11px] leading-5 text-foreground/48">{attorney.note}</p></div></>;
      return attorney.real ? <Link key={`${attorney.name}-${index}`} to={`${prefixFor(locale)}/attorney`} className="group border-b border-foreground/12 py-5 md:border-l md:px-6 md:first:border-l-0 md:first:pl-0">{content}</Link> : <article key={`${attorney.name}-${index}`} className="border-b border-foreground/12 py-5 md:border-l md:px-6 md:first:border-l-0 md:first:pl-0">{content}</article>;
    })}
  </div>
);

const PracticeGrid = ({ locale, limit = 8 }: { locale: SiteLocale; limit?: number }) => (
  <div className="grid border-t border-foreground/12 sm:grid-cols-2 xl:grid-cols-4">{practiceAreas.slice(0, limit).map((practice, index) => <Link key={practice.slug} to={`${prefixFor(locale)}/practice-areas/${practice.slug}`} className="group min-h-[158px] border-b border-foreground/12 py-5 sm:px-6 sm:first:pl-0 xl:border-l xl:first:border-l-0"><div className="flex items-center justify-between text-[9px] text-foreground/26"><span>{String(index + 1).padStart(2, "0")}</span><ArrowRight className="h-3 w-3 transition-transform group-hover:translate-x-1" /></div><div style={serif(locale)} className={`${isKo(locale) ? "mt-8 text-[1.22rem] font-medium" : "editorial-serif mt-8 text-[1.42rem]"}`}>{isKo(locale) ? practice.koTitle : practice.title}</div><p className="mt-3 max-w-[300px] text-[10px] leading-4 text-foreground/44">{isKo(locale) ? practice.koDescription : practice.description}</p></Link>)}</div>
);

const LocationGrid = ({ locale }: { locale: SiteLocale }) => (
  <div className="grid border-t border-foreground/12 sm:grid-cols-2 xl:grid-cols-3">{serviceLocations.map((location, index) => <Link key={location.slug} to={`${prefixFor(locale)}/locations/${location.slug}`} className="group min-h-[155px] border-b border-foreground/12 py-5 sm:px-6 sm:first:pl-0 xl:border-l xl:first:border-l-0"><div className="flex items-center justify-between text-[9px] text-foreground/26"><span>{String(index + 1).padStart(2, "0")}</span><MapPin className="h-3 w-3" /></div><div className="mt-9 flex items-center justify-between gap-3"><span className="text-[13px] font-medium">{isKo(locale) ? location.koName : location.name}</span><ArrowRight className="h-3 w-3 transition-transform group-hover:translate-x-1" /></div><p className="mt-3 max-w-[360px] text-[10px] leading-4 text-foreground/40">{isKo(locale) ? location.koDescription : location.description}</p></Link>)}</div>
);

const NextSteps = ({ locale }: { locale: SiteLocale }) => (
  <div className="grid border-t border-foreground/12 md:grid-cols-3">
    {[
      [isKo(locale) ? "사건 결과" : "Results", isKo(locale) ? "확인된 결과와 대표 사건" : "Verified outcomes and representative matters", "/results"],
      [isKo(locale) ? "법률 블로그" : "Law Blog", isKo(locale) ? "사고 후 필요한 실용적인 가이드" : "Practical guidance for what comes next", "/blogs"],
      [isKo(locale) ? "상담 문의" : "Consultation", isKo(locale) ? "현재 상황을 직접 상담하기" : "Talk through your specific situation", "/contact"],
    ].map(([label, body, path], index) => <Link key={path} to={`${prefixFor(locale)}${path}`} className="group min-h-[210px] border-b border-foreground/12 py-5 md:border-l md:px-7 md:first:border-l-0 md:first:pl-0"><div className="text-[9px] text-foreground/25">0{index + 1}</div><div className="mt-12 flex items-center justify-between text-[13px] font-medium"><span>{label}</span><ArrowRight className="h-3 w-3 transition-transform group-hover:translate-x-1" /></div><p className="mt-4 max-w-[300px] text-[11px] leading-5 text-foreground/46">{body}</p></Link>)}
  </div>
);

export const PracticeAreasPage = ({ locale }: { locale: SiteLocale }) => (
  <SiteFrame locale={locale}>
    <PageHero locale={locale} eyebrow={isKo(locale) ? "업무 분야" : "Practice Areas"} title={isKo(locale) ? "사고의 유형에서 필요한 도움으로 바로 연결합니다." : "Start with what happened. Build from there."} description={isKo(locale) ? "각 업무 페이지는 사고 유형, 담당 변호사, 지역, 결과와 법률 자료를 서로 연결합니다." : "Every practice page connects the accident type with the attorneys, service locations, case results, and useful legal guidance around it."} />
    <TopicSection locale={locale} number="01" eyebrow={isKo(locale) ? "개요" : "Overview"} title={isKo(locale) ? "사건을 이해하는 것부터 시작합니다." : "A claim should begin with a clear picture of what happened."} body={isKo(locale) ? "사고 사실, 초기 증거, 책임, 보험과 치료 상황을 한 번에 섞지 않고 순서대로 정리합니다." : "The first step is to separate the facts, early evidence, responsibility, coverage, and medical picture before building the claim."}><div className="grid gap-6 lg:grid-cols-[1.12fr_0.88fr]"><ImageSlot label={isKo(locale) ? "사고 상황 또는 업무 분야 이미지" : "Accident-context / practice-area photography"} /><div className="grid border-t border-foreground/12 sm:grid-cols-3 lg:grid-cols-1 xl:grid-cols-3">{(isKo(locale) ? [["01","사실","무엇이 일어났는지 정리합니다."],["02","책임","누가 책임이 있는지 확인합니다."],["03","영향","부상이 실제 생활에 미친 영향을 기록합니다."]] : [["01","Facts","Understand what happened."],["02","Responsibility","Identify who may be responsible."],["03","Impact","Document how the injury changes daily life."]]).map(([n,t,b]) => <div key={n} className="min-h-[145px] border-b border-foreground/12 py-5 sm:px-5 sm:first:pl-0 lg:px-0 xl:border-l xl:px-5 xl:first:border-l-0 xl:first:pl-0"><div className="text-[9px] text-foreground/25">{n}</div><div className="mt-8 text-[12px] font-medium">{t}</div><p className="mt-2 text-[10px] leading-4 text-foreground/44">{b}</p></div>)}</div></div></TopicSection>
    <TopicSection locale={locale} number="02" eyebrow={isKo(locale) ? "업무 분야" : "Practice Areas"} title={isKo(locale) ? "현재 사이트가 집중하는 개인 상해 업무." : "The injury matters the site is built around."} warm><PracticeGrid locale={locale} /></TopicSection>
    <TopicSection locale={locale} number="03" eyebrow={isKo(locale) ? "변호사" : "Attorneys"} title={isKo(locale) ? "각 업무 분야를 실제 담당 변호사와 연결합니다." : "Every practice area should connect to the attorneys actually handling the work."} body={isKo(locale) ? "현재 Howard Choi부터 시작하고 추가 변호사를 바로 확장할 수 있는 구조입니다." : "The structure starts with Howard Choi and leaves clean space for additional verified attorney profiles."}><AttorneyGrid locale={locale} /></TopicSection>
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
      <TopicSection locale={locale} number="01" eyebrow={isKo(locale) ? "개요" : "Overview"} title={intro}><ImageSlot label={`${title}${isKo(locale) ? " 관련 실제 사고·증거·변호사 이미지" : " — case, evidence, or attorney photography"}`} /></TopicSection>
      <TopicSection locale={locale} number="02" eyebrow={isKo(locale) ? "핵심 문제" : "What matters early"} title={isKo(locale) ? "초기에 놓치지 말아야 할 문제를 먼저 확인합니다." : "Identify the issues that can change the direction of the claim."} warm><div className="grid border-t border-foreground/12 sm:grid-cols-2 xl:grid-cols-4">{issues.map((issue, index) => <div key={issue} className="min-h-[190px] border-b border-foreground/12 py-5 sm:px-6 sm:first:pl-0 xl:border-l xl:first:border-l-0"><div className="text-[9px] text-foreground/25">{String(index + 1).padStart(2, "0")}</div><div className="mt-12 max-w-[260px] text-[13px] leading-5">{issue}</div></div>)}</div></TopicSection>
      <TopicSection locale={locale} number="03" eyebrow={isKo(locale) ? "접근 방식" : "Approach"} title={isKo(locale) ? "증거, 보험과 부상의 영향을 따로 확인한 뒤 하나의 사건으로 연결합니다." : "Evidence, coverage, and the impact of the injury should be understood separately before they are built into one claim."}><div className="grid border-t border-foreground/12 md:grid-cols-3">{(isKo(locale) ? [["증거","사고 기록, 사진, 영상, 목격자와 관련 문서를 보존합니다."],["보험","관련 보험과 책임 당사자를 확인합니다."],["영향","치료, 소득 손실과 일상생활의 변화를 기록합니다."]] : [["Evidence","Preserve scene records, photographs, video, witnesses, and documents before they disappear."],["Coverage","Identify the policies and parties that may matter before important claim decisions are made."],["Impact","Document treatment, missed work, future needs, and the practical effect of the injury."]]).map(([label,body],index) => <div key={label} className="min-h-[215px] border-b border-foreground/12 py-5 md:border-l md:px-7 md:first:border-l-0 md:first:pl-0"><div className="text-[9px] text-foreground/25">0{index+1}</div><div className="mt-12 text-[13px] font-medium">{label}</div><p className="mt-4 max-w-[320px] text-[11px] leading-5 text-foreground/46">{body}</p></div>)}</div></TopicSection>
      <TopicSection locale={locale} number="04" eyebrow={isKo(locale) ? "변호사" : "Attorneys"} title={isKo(locale) ? `${title} 사건을 담당하는 팀.` : `Attorneys connected to ${title.toLowerCase()} matters.`} body={isKo(locale) ? "실제 팀 정보가 제공되면 각 변호사의 업무 경험과 결과를 이 페이지에 직접 연결합니다." : "As verified team information arrives, each attorney can connect directly to this practice, their results, publications, and relevant locations."} warm><AttorneyGrid locale={locale} /></TopicSection>
      <TopicSection locale={locale} number="05" eyebrow={isKo(locale) ? "지역" : "Locations"} title={isKo(locale) ? "같은 업무 분야를 관련 지역 페이지에서도 찾을 수 있습니다." : "The same practice should connect cleanly into every relevant local page."}><LocationGrid locale={locale} /></TopicSection>
      <PhoneCta locale={locale} />
    </SiteFrame>
  );
};

export const AttorneyPage = ({ locale }: { locale: SiteLocale }) => (
  <SiteFrame locale={locale}>
    <PageHero locale={locale} eyebrow={isKo(locale) ? "변호사" : "Attorneys"} title={isKo(locale) ? "사건을 맡는 사람을 먼저 보여줍니다." : "The people behind the work should be easy to understand."} description={isKo(locale) ? "팀 전체를 확장할 수 있도록 사진, 경력, 업무 분야, 결과와 글을 연결하는 구조입니다." : "The team page is built for portraits, verified credentials, practice focus, representative matters, results, publications, and the locations each attorney serves."} image={heroOffice} />
    <TopicSection locale={locale} number="01" eyebrow={isKo(locale) ? "팀" : "The team"} title={isKo(locale) ? "현재 확인된 변호사부터 시작하고 팀이 늘어나도 그대로 확장합니다." : "Start with the verified attorney we have, and leave clean space for the rest of the firm."} body={isKo(locale) ? "각 프로필에는 사진, 소개, 학력, 등록 정보, 언어, 주요 업무와 결과를 넣을 수 있습니다." : "Each profile has room for a professional portrait, concise biography, education, admissions, languages, memberships, focus areas, results, media, and articles."}><AttorneyGrid locale={locale} /></TopicSection>
    <TopicSection locale={locale} number="02" eyebrow="Howard Choi" title={isKo(locale) ? "직접적인 소통과 명확한 사건 책임." : "Direct communication and a clear line of responsibility."} warm><div className="grid gap-8 lg:grid-cols-[0.72fr_1.28fr] lg:items-center"><ImageSlot portrait label={isKo(locale) ? "Howard Choi 전문 인물 사진" : "Howard Choi professional portrait"} /><div><div className="grid gap-6 text-[13px] leading-6 text-foreground/56 md:grid-cols-2"><p>{isKo(locale) ? "개인 상해 사건에서는 사고 사실, 치료, 보험과 생활의 변화가 동시에 연결됩니다. 담당 변호사와 사건의 책임 구조를 명확하게 보여주는 것이 중요합니다." : "Injury matters connect the facts of the accident, medical care, insurance, and the way a person's life changes afterward. The attorney page should make responsibility and communication clear from the beginning."}</p><p>{isKo(locale) ? "클라이언트가 제공하는 실제 정보로 학력, 변호사 등록, 언어, 협회, 수상, 대표 사건과 미디어 자료를 채울 수 있습니다." : "This area is ready for the real profile information the client provides: education, bar admissions, languages, memberships, recognitions, representative matters, and media appearances."}</p></div><div className="mt-8 grid border-t border-foreground/12 sm:grid-cols-2"><div className="py-5 sm:pr-6"><Scale className="h-4 w-4 stroke-[1.35]" /><div className="mt-5 text-[12px] font-medium">{isKo(locale) ? "업무 연결" : "Practice connections"}</div><p className="mt-2 text-[11px] leading-5 text-foreground/46">{isKo(locale) ? "실제 담당 업무 분야를 프로필에서 바로 연결합니다." : "Link the attorney directly to the practice areas they actually handle."}</p></div><div className="border-t border-foreground/12 py-5 sm:border-l sm:border-t-0 sm:pl-6"><ShieldCheck className="h-4 w-4 stroke-[1.35]" /><div className="mt-5 text-[12px] font-medium">{isKo(locale) ? "검증된 정보" : "Verified proof"}</div><p className="mt-2 text-[11px] leading-5 text-foreground/46">{isKo(locale) ? "확인된 경력과 사건 결과만 공개합니다." : "Credentials, results, and recognitions appear only once verified."}</p></div></div></div></div></TopicSection>
    <TopicSection locale={locale} number="03" eyebrow={isKo(locale) ? "업무 분야" : "Practice focus"} title={isKo(locale) ? "각 변호사가 실제로 맡는 업무 분야와 연결합니다." : "Every attorney profile should lead into the work they actually handle."}><PracticeGrid locale={locale} /></TopicSection>
    <TopicSection locale={locale} number="04" eyebrow={isKo(locale) ? "지역" : "Locations"} title={isKo(locale) ? "변호사 프로필과 실제 서비스 지역도 연결합니다." : "Attorney profiles should also connect to the communities they serve."} warm><LocationGrid locale={locale} /></TopicSection>
    <PhoneCta locale={locale} />
  </SiteFrame>
);

export const ResultsPage = ({ locale }: { locale: SiteLocale }) => (
  <SiteFrame locale={locale}>
    <PageHero locale={locale} eyebrow={isKo(locale) ? "사건 결과" : "Results"} title={isKo(locale) ? "결과는 숫자와 그 뒤의 맥락을 함께 보여줘야 합니다." : "Results should show the number and the story behind it."} description={isKo(locale) ? "실제 총 회수 금액, 주요 합의와 평결이 제공되면 담당 변호사, 업무 분야와 지역에 연결합니다." : "Once verified totals, settlements, and verdicts are supplied, each outcome can connect to the responsible attorney, practice area, location, and related content."} image={heroBoardroom} />
    <TopicSection locale={locale} number="01" eyebrow={isKo(locale) ? "증거" : "Proof"} title={isKo(locale) ? "가장 먼저 필요한 것은 검증 가능한 실제 숫자입니다." : "The strongest proof starts with numbers the firm can actually support."} body={isKo(locale) ? "총 회수 금액과 가장 큰 결과를 검증한 뒤 공개합니다." : "The priority is the verified total recovered and notable individual outcomes, with the proper context and disclaimer."}><div className="grid border-y border-foreground/12 lg:grid-cols-[0.72fr_1.28fr]"><div className="py-7 lg:border-r lg:border-foreground/12 lg:pr-10"><div className="text-[9px] uppercase tracking-[0.16em] text-muted-foreground">{isKo(locale) ? "총 회수 금액" : "Total recovered"}</div><div style={serif(locale)} className="editorial-serif mt-8 text-[clamp(2.6rem,4.4vw,4.8rem)] leading-none text-foreground/24">—</div><p className="mt-5 max-w-[340px] text-[11px] leading-5 text-foreground/44">{isKo(locale) ? "검증된 실제 총액으로 교체합니다." : "Reserved for the verified firm-wide recovery figure."}</p></div><div className="grid sm:grid-cols-2 lg:pl-10"><div className="border-b border-foreground/12 py-7 sm:pr-7"><div className="text-[9px] text-foreground/28">01</div><div className="mt-9 text-[13px] font-medium">{isKo(locale) ? "가장 큰 결과" : "Largest outcome"}</div><p className="mt-3 text-[11px] leading-5 text-foreground/46">{isKo(locale) ? "공개 가능한 가장 큰 합의 또는 평결." : "The largest settlement or verdict the firm is permitted to publish."}</p></div><div className="border-b border-foreground/12 py-7 sm:border-l sm:pl-7"><div className="text-[9px] text-foreground/28">02</div><div className="mt-9 text-[13px] font-medium">{isKo(locale) ? "대표 사건" : "Representative matters"}</div><p className="mt-3 text-[11px] leading-5 text-foreground/46">{isKo(locale) ? "사건 유형, 결과와 담당 변호사를 연결합니다." : "Case type, key facts, outcome, responsible attorney, and related practice."}</p></div></div></div></TopicSection>
    <TopicSection locale={locale} number="02" eyebrow={isKo(locale) ? "사건 결과" : "Case outcomes"} title={isKo(locale) ? "실제 결과가 들어오면 한 사건씩 명확하게 보여줍니다." : "Each verified result gets its own clear story instead of becoming a wall of numbers."} warm><div className="grid border-t border-foreground/12 md:grid-cols-3">{(isKo(locale) ? ["차량 사고","중대 상해","시설 책임"] : ["Motor Vehicle Claims","Serious Injury","Premises Claims"]).map((label,index) => <article key={label} className="border-b border-foreground/12 py-5 md:border-l md:px-6 md:first:border-l-0 md:first:pl-0"><ImageSlot label={isKo(locale) ? "선택적 사건 이미지 또는 증거" : "Optional case / evidence image"} /><div className="mt-4 text-[9px] text-foreground/26">0{index+1}</div><h3 style={serif(locale)} className={`${isKo(locale) ? "mt-4 text-[1.3rem] font-medium" : "editorial-serif mt-4 text-[1.55rem]"}`}>{label}</h3><p className="mt-2 text-[10px] leading-4 text-foreground/44">{isKo(locale) ? "금액, 요약, 담당 변호사와 관련 업무·지역 링크를 위한 공간." : "Space for the amount, concise story, responsible attorney, practice area, location, and disclaimer."}</p></article>)}</div></TopicSection>
    <TopicSection locale={locale} number="03" eyebrow={isKo(locale) ? "변호사" : "Attorneys"} title={isKo(locale) ? "결과는 실제 담당 변호사 프로필로 다시 연결합니다." : "Results should lead back to the attorneys responsible for them."}><AttorneyGrid locale={locale} /></TopicSection>
    <PhoneCta locale={locale} />
  </SiteFrame>
);

export const AboutFirmPage = ({ locale }: { locale: SiteLocale }) => (
  <SiteFrame locale={locale}>
    <PageHero locale={locale} eyebrow={isKo(locale) ? "로펌 소개" : "About"} title={isKo(locale) ? "로펌의 이야기보다 먼저 구조와 책임을 명확하게." : "A firm should make the work, the people, and the next step clear."} description={isKo(locale) ? "업무 분야, 지역, 변호사, 결과와 법률 자료가 하나의 시스템처럼 연결되도록 구성합니다." : "Practice areas, locations, attorneys, results, and legal resources are built to work as one connected system rather than isolated pages."} image={heroJustice} />
    <TopicSection locale={locale} number="01" eyebrow={isKo(locale) ? "로펌" : "The firm"} title={isKo(locale) ? "지역성, 직접적인 소통, 필요한 정보에 집중합니다." : "Local relevance, direct communication, and fewer unnecessary layers."} body={isKo(locale) ? "Buena Park를 중심으로 인근 지역의 상해 정보를 쉽게 찾고 담당 변호사와 다음 단계를 이해할 수 있도록 구성합니다." : "Buena Park is the center, with nearby communities, injury practices, attorney profiles, proof, and resources organized around that local focus."}><div className="grid gap-8 lg:grid-cols-[1.08fr_0.92fr]"><ImageSlot label={isKo(locale) ? "로펌 팀 또는 사무실 사진" : "Firm team / office photography"} /><div className="grid border-t border-foreground/12 sm:grid-cols-2">{(isKo(locale) ? [["01","명확한 책임","누가 사건을 담당하는지 이해하기 쉽게."],["02","실제 증거","확인된 경력과 결과만 사용."],["03","지역 연결","지역을 업무와 변호사에 연결."],["04","유용한 정보","가이드가 다음 단계로 이어지게."]] : [["01","Clear responsibility","Make it easy to understand who handles the work."],["02","Real proof","Use verified credentials, results, and testimonials."],["03","Local connection","Connect locations to relevant practices and attorneys."],["04","Useful information","Make guides lead naturally to the next step."]]).map(([n,t,b]) => <div key={n} className="min-h-[150px] border-b border-foreground/12 py-5 sm:border-l sm:px-5 sm:first:border-l-0 sm:first:pl-0"><div className="text-[9px] text-foreground/25">{n}</div><div className="mt-8 text-[12px] font-medium">{t}</div><p className="mt-2 text-[10px] leading-4 text-foreground/44">{b}</p></div>)}</div></div></TopicSection>
    <TopicSection locale={locale} number="02" eyebrow={isKo(locale) ? "변호사" : "Attorneys"} title={isKo(locale) ? "로펌의 중심은 실제로 사건을 맡는 사람입니다." : "The firm page should introduce the people who actually carry the work."} warm><AttorneyGrid locale={locale} /></TopicSection>
    <TopicSection locale={locale} number="03" eyebrow={isKo(locale) ? "업무 분야" : "Practice Areas"} title={isKo(locale) ? "로펌 소개에서 실제 업무로 바로 이어집니다." : "From the firm story, visitors should move directly into the work."}><PracticeGrid locale={locale} limit={8} /></TopicSection>
    <TopicSection locale={locale} number="04" eyebrow={isKo(locale) ? "지역" : "Locations"} title={isKo(locale) ? "그리고 실제 서비스 지역으로 연결합니다." : "Then connect the work to the communities the firm serves."} warm><LocationGrid locale={locale} /></TopicSection>
    <PhoneCta locale={locale} />
  </SiteFrame>
);

export const LocationsPage = ({ locale }: { locale: SiteLocale }) => (
  <SiteFrame locale={locale}>
    <PageHero locale={locale} eyebrow={isKo(locale) ? "서비스 지역" : "Locations"} title={isKo(locale) ? "각 지역을 독립적인 로컬 허브로 만듭니다." : "Every location should feel like a real local hub."} description={isKo(locale) ? "도시 이름만 바꾸는 페이지가 아니라 지역 이미지, 관련 업무, 담당 변호사와 자료를 연결합니다." : "Not city-name duplicates: each page has room for local photography, useful context, relevant practice areas, attorneys, results, and legal resources."} image={heroBoardroom} />
    <TopicSection locale={locale} number="01" eyebrow={isKo(locale) ? "지역 전략" : "Local structure"} title={isKo(locale) ? "실제 장소와 사람을 보여주는 지역 페이지." : "Local pages should show real place, people, and context."} body={isKo(locale) ? "각 도시마다 실제 사진, 사무실이 있다면 주소, 관련 업무, 담당 변호사와 결과를 연결할 수 있습니다." : "Each city can support real photography, a physical office address when one exists, relevant accident types, attorneys serving the area, local results, and useful guides."}><ImageSlot label={isKo(locale) ? "대표 지역, 사무실 또는 커뮤니티 이미지" : "Representative local / office / community photography"} /></TopicSection>
    <TopicSection locale={locale} number="02" eyebrow={isKo(locale) ? "서비스 지역" : "Locations"} title={isKo(locale) ? "현재 연결된 주요 지역." : "The communities currently connected to the site."} warm><LocationGrid locale={locale} /></TopicSection>
    <TopicSection locale={locale} number="03" eyebrow={isKo(locale) ? "변호사" : "Attorneys"} title={isKo(locale) ? "각 지역을 실제 담당 변호사와 연결합니다." : "Every location should show the attorneys who actually serve it."}><AttorneyGrid locale={locale} /></TopicSection>
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
      <TopicSection locale={locale} number="01" eyebrow={isKo(locale) ? "지역 개요" : "Local overview"} title={isKo(locale) ? `${name}에서 사고가 발생했다면 무엇부터 정리해야 하는지.` : `If an accident happened in ${name}, start by organizing the facts before the claim becomes noise.`} body={isKo(locale) ? "치료, 보험 연락, 현장 기록과 업무 중단이 동시에 시작될 수 있습니다. 중요한 자료를 먼저 보존하고 책임과 보험 범위를 확인합니다." : "Medical treatment, insurance calls, scene evidence, vehicle records, and missed work can all begin at once. The first job is to preserve what matters and understand responsibility and coverage."}><ImageSlot label={`${name}${isKo(locale) ? " 실제 지역, 교차로, 사무실 또는 커뮤니티 이미지" : " — real neighborhood, roadway, office, or community photography"}`} /></TopicSection>
      <TopicSection locale={locale} number="02" eyebrow={isKo(locale) ? "지역 정보" : "Local context"} title={isKo(locale) ? "이 지역 페이지가 바로 답해야 할 세 가지." : "Three things this local page should answer immediately."} warm><div className="grid border-t border-foreground/12 md:grid-cols-3">{(isKo(locale) ? [["어떤 사건",`${name}에서 관련된 교통사고와 상해 유형.`],["누가 담당","이 지역을 실제 담당하는 변호사와 프로필."],["다음 단계","상담, 법률 가이드, 결과와 인근 지역."]] : [["What we handle",`The accident and injury matters relevant to people in ${location.name}.`],["Who handles it","The attorneys who actually serve this location, linked to their profiles."],["What comes next","A clear route to consultation, related guides, results, and neighboring locations."]]).map(([title,body],index) => <div key={title} className="min-h-[220px] border-b border-foreground/12 py-5 md:border-l md:px-7 md:first:border-l-0 md:first:pl-0"><div className="text-[9px] text-foreground/25">0{index+1}</div><div className="mt-12 text-[13px] font-medium">{title}</div><p className="mt-4 max-w-[320px] text-[11px] leading-5 text-foreground/46">{body}</p></div>)}</div></TopicSection>
      <TopicSection locale={locale} number="03" eyebrow={isKo(locale) ? "업무 분야" : "Practice Areas"} title={isKo(locale) ? `${name} 지역에서 연결할 주요 개인 상해 업무.` : `Practice areas connected to ${name}.`}><PracticeGrid locale={locale} /></TopicSection>
      <TopicSection locale={locale} number="04" eyebrow={isKo(locale) ? "변호사" : "Attorneys"} title={isKo(locale) ? `${name} 지역을 담당할 변호사.` : `Attorneys serving ${name}.`} body={isKo(locale) ? "실제 팀 정보가 제공되면 각 변호사의 지역 경험, 업무와 결과를 연결합니다." : "As verified team information arrives, each attorney can connect to their local experience, practice focus, results, and useful articles for this community."} warm><AttorneyGrid locale={locale} /></TopicSection>
      <TopicSection locale={locale} number="05" eyebrow={isKo(locale) ? "다음 단계" : "Next steps"} title={isKo(locale) ? "지역 페이지에서 필요한 다음 정보로 바로 이동합니다." : "A local page should make the next move obvious."}><NextSteps locale={locale} /></TopicSection>
      <PhoneCta locale={locale} />
    </SiteFrame>
  );
};
