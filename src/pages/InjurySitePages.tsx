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

const ImageSlot = ({ label, portrait = false, dark = false }: { label: string; portrait?: boolean; dark?: boolean }) => (
  <div className={`relative overflow-hidden border ${portrait ? "aspect-[4/5]" : "aspect-[16/10]"} ${dark ? "border-white/12 bg-white/[0.035] text-white" : "border-foreground/10 bg-[#e8e3da] text-foreground"}`}>
    <div className="absolute inset-0 opacity-50" style={{ backgroundImage: dark ? "linear-gradient(135deg, rgba(255,255,255,.03) 25%, transparent 25%, transparent 50%, rgba(255,255,255,.03) 50%, rgba(255,255,255,.03) 75%, transparent 75%)" : "linear-gradient(135deg, rgba(31,27,23,.025) 25%, transparent 25%, transparent 50%, rgba(31,27,23,.025) 50%, rgba(31,27,23,.025) 75%, transparent 75%)", backgroundSize: "28px 28px" }} />
    <div className={`absolute inset-x-4 top-4 flex items-center justify-between text-[8px] font-medium uppercase tracking-[0.16em] ${dark ? "text-white/34" : "text-foreground/32"}`}><span>Image space</span><span>↗</span></div>
    <div className={`absolute inset-x-4 bottom-4 max-w-[75%] text-[10px] leading-4 ${dark ? "text-white/46" : "text-foreground/44"}`}>{label}</div>
  </div>
);

const PageHero = ({ locale, eyebrow, title, description, image = heroJustice }: { locale: SiteLocale; eyebrow: string; title: string; description: string; image?: string }) => (
  <section className="relative h-[70svh] min-h-[610px] overflow-hidden bg-[#17130f] text-[#f3eee5]">
    <motion.img initial={{ scale: 1.025, opacity: 0.82 }} animate={{ scale: 1, opacity: 1 }} transition={{ duration: 1.05, ease: [0.22, 1, 0.36, 1] }} src={image} alt="" fetchPriority="high" decoding="async" className="absolute inset-0 h-full w-full object-cover" />
    <div className="absolute inset-0 bg-[#17130f]/60" />
    <div className="absolute inset-0 bg-gradient-to-t from-[#17130f]/92 via-[#17130f]/18 to-[#17130f]/28" />
    <div className="site-shell relative z-10 flex h-full items-end pb-10 pt-[72px] md:pb-12 lg:pb-14">
      <motion.div initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.72 }} className="grid w-full gap-8 border-t border-[#f3eee5]/18 pt-5 lg:grid-cols-[0.34fr_1.66fr] lg:gap-12 xl:gap-16">
        <div><span className="text-[9px] font-medium uppercase tracking-[0.17em] text-[#f3eee5]/48">{eyebrow}</span><div className="mt-4 hidden text-[10px] leading-5 text-[#f3eee5]/34 lg:block">{brand.phoneDisplay}<br />Buena Park, California</div></div>
        <div className="max-w-[980px]"><h1 style={serif(locale)} className={`${isKo(locale) ? "text-[clamp(2.05rem,3vw,3.35rem)] font-medium leading-[1.24] tracking-[-0.045em]" : "editorial-serif text-[clamp(2.3rem,3.25vw,3.7rem)] leading-[1.01] tracking-[-0.026em]"}`}>{title}</h1><p className="mt-5 max-w-[740px] text-[13px] leading-6 text-[#f3eee5]/67 md:text-[14px] md:leading-7">{description}</p></div>
      </motion.div>
    </div>
  </section>
);

const SectionHeading = ({ locale, number, eyebrow, title, body }: { locale: SiteLocale; number: string; eyebrow: string; title: string; body?: string }) => (
  <div className="grid gap-5 border-t border-foreground/12 pt-5 lg:grid-cols-[0.34fr_1.66fr] lg:gap-12 xl:gap-16">
    <div className="flex items-start gap-3 text-[9px] font-medium uppercase tracking-[0.16em] text-muted-foreground"><span>{number}</span><span>{eyebrow}</span></div>
    <div><h2 style={serif(locale)} className={`${isKo(locale) ? "max-w-[900px] text-[clamp(1.75rem,2.35vw,2.55rem)] font-medium leading-[1.38] tracking-[-0.035em]" : "editorial-serif max-w-[960px] text-[clamp(1.9rem,2.45vw,2.7rem)] leading-[1.1] tracking-[-0.02em]"}`}>{title}</h2>{body && <p className="mt-4 max-w-[760px] text-[13px] leading-6 text-foreground/54">{body}</p>}</div>
  </div>
);

const PhoneCta = ({ locale }: { locale: SiteLocale }) => (
  <section className="flex min-h-[56svh] items-center bg-[#171717] py-16 text-[#f3eee5] md:py-20">
    <div className="site-shell grid w-full gap-8 border-t border-white/12 pt-6 lg:grid-cols-[0.34fr_1.26fr_0.4fr] lg:items-end lg:gap-12 xl:gap-16">
      <div className="text-[9px] font-medium uppercase tracking-[0.16em] text-white/36">{isKo(locale) ? "상담" : "Talk to an attorney"}</div>
      <div className="max-w-[760px]"><h2 style={serif(locale)} className={`${isKo(locale) ? "text-[clamp(1.9rem,2.65vw,2.85rem)] font-medium leading-[1.34] tracking-[-0.04em]" : "editorial-serif text-[clamp(2rem,2.8vw,3.15rem)] leading-[1.04] tracking-[-0.024em]"}`}>{isKo(locale) ? "사고 이후의 다음 단계를 명확하게 확인하세요." : "Get clarity on what comes next after an accident."}</h2><p className="mt-4 max-w-[560px] text-[12px] leading-6 text-white/48">{isKo(locale) ? "현재 상황을 간단히 알려주시면 상담 가능 여부와 필요한 다음 단계를 확인할 수 있습니다." : "Share the outline of what happened and the firm can determine whether the matter is a fit and what should happen next."}</p></div>
      <div className="lg:justify-self-end"><a href={brand.phoneHref} className="liquid-cta inline-flex w-fit items-center gap-3 rounded-full px-6 py-3 text-[12px] font-medium"><Phone className="relative z-10 h-4 w-4" /><span className="relative z-10">{brand.phoneDisplay}</span></a></div>
    </div>
  </section>
);

const attorneySlots = (locale: SiteLocale) => isKo(locale) ? [
  { name: "Howard Choi", role: "변호사", note: "확인된 학력, 변호사 등록, 언어, 전문 분야와 주요 사건 정보를 추가할 수 있습니다.", real: true },
  { name: "추가 변호사", role: "프로필 공간", note: "두 번째 변호사의 사진, 소개, 업무 분야와 관련 결과를 위한 공간입니다.", real: false },
  { name: "추가 변호사", role: "프로필 공간", note: "팀이 확장되어도 같은 구조에서 새로운 변호사 프로필을 추가할 수 있습니다.", real: false },
] : [
  { name: "Howard Choi", role: "Attorney", note: "Ready for verified education, admissions, languages, focus areas, representative matters, and media.", real: true },
  { name: "Additional attorney", role: "Profile space", note: "Reserved for a second attorney portrait, bio, practice focus, credentials, and linked results.", real: false },
  { name: "Additional attorney", role: "Profile space", note: "The team structure can expand without redesigning the page as the firm adds verified profiles.", real: false },
];

const AttorneyGrid = ({ locale }: { locale: SiteLocale }) => (
  <div className="grid border-t border-foreground/12 md:grid-cols-3">
    {attorneySlots(locale).map((attorney, index) => {
      const content = <><ImageSlot portrait label={attorney.real ? (isKo(locale) ? "변호사 전문 사진" : "Attorney portrait") : (isKo(locale) ? "추가 변호사 사진" : "Additional attorney portrait")} /><div className="pt-4"><div className="flex items-center justify-between gap-3"><div><div className="text-[13px] font-medium">{attorney.name}</div><div className="mt-1 text-[9px] uppercase tracking-[0.12em] text-muted-foreground">{attorney.role}</div></div>{attorney.real && <ArrowRight className="h-3.5 w-3.5 text-foreground/34" />}</div><p className="mt-3 max-w-[360px] text-[11px] leading-5 text-foreground/48">{attorney.note}</p></div></>;
      return attorney.real ? <Link key={`${attorney.name}-${index}`} to={`${prefixFor(locale)}/attorney`} className="group border-b border-foreground/12 py-6 md:border-l md:px-6 md:first:border-l-0 md:first:pl-0">{content}</Link> : <article key={`${attorney.name}-${index}`} className="border-b border-foreground/12 py-6 md:border-l md:px-6 md:first:border-l-0 md:first:pl-0">{content}</article>;
    })}
  </div>
);

const ConnectionBand = ({ locale }: { locale: SiteLocale }) => {
  const links = isKo(locale) ? [
    ["업무 분야", "사고 유형별 법률 정보", "/practice-areas"], ["지역", "서비스 지역별 정보", "/locations"], ["변호사", "담당 변호사와 팀", "/attorney"], ["법률 블로그", "사고 후 필요한 가이드", "/blogs"],
  ] : [
    ["Practice Areas", "Start with the type of accident", "/practice-areas"], ["Locations", "Find the relevant local hub", "/locations"], ["Attorneys", "See who is responsible for the work", "/attorney"], ["Law Blog", "Read practical injury-law guides", "/blogs"],
  ];
  return <section className="site-shell pb-16 md:pb-20 lg:pb-24"><div className="grid border-t border-foreground/12 sm:grid-cols-2 xl:grid-cols-4">{links.map(([label, body, path], index) => <Link key={path} to={`${prefixFor(locale)}${path}`} className="group min-h-[150px] border-b border-foreground/12 py-5 sm:px-6 sm:first:pl-0 xl:border-l xl:first:border-l-0"><div className="flex items-center justify-between text-[9px] text-foreground/26"><span>0{index + 1}</span><ArrowRight className="h-3 w-3 transition-transform group-hover:translate-x-1" /></div><div className="mt-8 text-[13px] font-medium">{label}</div><div className="mt-2 max-w-[260px] text-[11px] leading-5 text-foreground/46">{body}</div></Link>)}</div></section>;
};

const PracticeLinkGrid = ({ locale, limit = 8 }: { locale: SiteLocale; limit?: number }) => (
  <div className="grid border-t border-foreground/12 sm:grid-cols-2 xl:grid-cols-4">{practiceAreas.slice(0, limit).map((practice, index) => <Link key={practice.slug} to={`${prefixFor(locale)}/practice-areas/${practice.slug}`} className="group min-h-[150px] border-b border-foreground/12 py-5 sm:px-6 sm:first:pl-0 xl:border-l xl:first:border-l-0"><div className="flex items-center justify-between text-[9px] text-foreground/26"><span>{String(index + 1).padStart(2, "0")}</span><ArrowRight className="h-3 w-3 transition-transform group-hover:translate-x-1" /></div><div style={serif(locale)} className={`${isKo(locale) ? "mt-8 text-[1.35rem] font-medium" : "editorial-serif mt-8 text-[1.55rem]"}`}>{isKo(locale) ? practice.koTitle : practice.title}</div><p className="mt-3 max-w-[300px] text-[11px] leading-5 text-foreground/46">{isKo(locale) ? practice.koDescription : practice.description}</p></Link>)}</div>
);

const LocationLinkGrid = ({ locale }: { locale: SiteLocale }) => (
  <div className="grid border-t border-foreground/12 sm:grid-cols-2 xl:grid-cols-3">{serviceLocations.map((location, index) => <Link key={location.slug} to={`${prefixFor(locale)}/locations/${location.slug}`} className="group min-h-[126px] border-b border-foreground/12 py-5 sm:px-6 sm:first:pl-0 xl:border-l xl:first:border-l-0"><div className="flex items-center justify-between text-[9px] text-foreground/26"><span>{String(index + 1).padStart(2, "0")}</span><MapPin className="h-3 w-3" /></div><div className="mt-7 flex items-center justify-between gap-3"><span className="text-[13px] font-medium">{isKo(locale) ? location.koName : location.name}</span><ArrowRight className="h-3 w-3 transition-transform group-hover:translate-x-1" /></div></Link>)}</div>
);

export const PracticeAreasPage = ({ locale }: { locale: SiteLocale }) => (
  <SiteFrame locale={locale}>
    <PageHero locale={locale} eyebrow={isKo(locale) ? "업무 분야" : "Practice Areas"} title={isKo(locale) ? "사고의 유형에서 필요한 도움으로 바로 연결합니다." : "Start with what happened. Build from there."} description={isKo(locale) ? "각 업무 페이지는 사고 유형만 설명하는 것이 아니라 담당 변호사, 지역, 결과와 법률 자료까지 연결할 수 있도록 구성됩니다." : "Every practice page is designed to connect the accident type with the attorneys, service locations, case results, and useful legal guidance around it."} />
    <main className="site-shell py-16 md:py-20 lg:py-24">
      <SectionHeading locale={locale} number="01" eyebrow={isKo(locale) ? "구조" : "The structure"} title={isKo(locale) ? "좋은 업무 페이지는 단순한 서비스 목록보다 더 많은 것을 보여줍니다." : "A useful practice page should explain the claim and show where everything else connects."} body={isKo(locale) ? "사고 유형, 중요한 증거, 보험 문제, 담당 변호사, 서비스 지역과 관련 자료를 한 흐름으로 연결합니다." : "The page should connect the accident, evidence, insurance issues, responsible attorneys, local coverage, results, and related resources instead of stopping at a short service description."} />
      <div className="mt-10 grid gap-6 lg:grid-cols-[1.08fr_0.92fr] lg:items-stretch"><ImageSlot label={isKo(locale) ? "업무 분야 또는 사고 상황 이미지" : "Practice-area / accident-context photography"} /><div className="flex flex-col justify-between border-t border-foreground/12 py-5"><span className="text-[9px] font-medium uppercase tracking-[0.15em] text-muted-foreground">{isKo(locale) ? "사건 흐름" : "Claim flow"}</span><div className="mt-12 grid gap-5 text-[12px] leading-5 text-foreground/54 sm:grid-cols-3 lg:grid-cols-1 xl:grid-cols-3"><div><span className="text-foreground/28">01</span><p className="mt-2">{isKo(locale) ? "사고 사실과 초기 증거 정리" : "Understand the facts and preserve early evidence."}</p></div><div><span className="text-foreground/28">02</span><p className="mt-2">{isKo(locale) ? "책임, 보험과 치료 상황 확인" : "Evaluate responsibility, coverage, and treatment."}</p></div><div><span className="text-foreground/28">03</span><p className="mt-2">{isKo(locale) ? "실제 손해를 중심으로 사건 구성" : "Build the claim around the real impact of the injury."}</p></div></div></div></div>
      <div className="mt-16"><SectionHeading locale={locale} number="02" eyebrow={isKo(locale) ? "업무 분야" : "Practice Areas"} title={isKo(locale) ? "현재 집중하는 개인 상해 업무." : "The injury matters the site is built around."} /><div className="mt-8"><PracticeLinkGrid locale={locale} /></div></div>
      <div className="mt-16"><SectionHeading locale={locale} number="03" eyebrow={isKo(locale) ? "변호사" : "Attorneys"} title={isKo(locale) ? "각 업무 분야를 실제 담당 변호사와 연결합니다." : "Every practice area should connect to the attorneys actually handling the work."} body={isKo(locale) ? "현재 Howard Choi 프로필을 시작으로 추가 변호사를 바로 확장할 수 있는 공간을 마련했습니다." : "The structure starts with Howard Choi and leaves room to add additional firm attorneys with their own portraits, credentials, focus areas, results, and articles."} /><div className="mt-8"><AttorneyGrid locale={locale} /></div></div>
    </main>
    <ConnectionBand locale={locale} />
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
        <div className="grid gap-12 lg:grid-cols-[0.3fr_1.7fr] lg:gap-12 xl:gap-16">
          <aside><div className="sticky top-24 border-t border-foreground/14 pt-4"><div className="text-[9px] font-medium uppercase tracking-[0.15em] text-muted-foreground">{isKo(locale) ? "관련 업무" : "Related practices"}</div><div className="mt-5 divide-y divide-foreground/10 text-[11px]">{practiceAreas.filter((item) => item.slug !== practice.slug).slice(0, 6).map((item, index) => <Link key={item.slug} to={`${prefixFor(locale)}/practice-areas/${item.slug}`} className="flex items-center justify-between py-3 text-foreground/54 hover:text-foreground"><span>{isKo(locale) ? item.koTitle : item.title}</span><span className="text-[9px] text-foreground/24">0{index + 1}</span></Link>)}</div></div></aside>
          <div className="min-w-0">
            <p style={serif(locale)} className={`${isKo(locale) ? "max-w-[960px] text-[clamp(1.5rem,1.95vw,1.95rem)] font-medium leading-[1.58] tracking-[-0.025em]" : "editorial-serif max-w-[980px] text-[clamp(1.65rem,2.05vw,2.15rem)] leading-[1.24] tracking-[-0.018em]"}`}>{intro}</p>
            <div className="mt-9"><ImageSlot label={`${title}${isKo(locale) ? " 관련 실제 사고·증거·변호사 이미지" : " — case, evidence, or attorney photography"}`} /></div>
            <section className="mt-14"><SectionHeading locale={locale} number="01" eyebrow={isKo(locale) ? "주요 사건" : "Typical matters"} title={isKo(locale) ? "이 업무 분야에서 자주 확인하는 문제." : "The issues that usually need to be identified early."} /><div className="mt-7 grid border-t border-foreground/10 sm:grid-cols-2 xl:grid-cols-4">{issues.map((issue, index) => <div key={issue} className="min-h-[120px] border-b border-foreground/10 py-4 sm:px-5 sm:first:pl-0 xl:border-l xl:first:border-l-0"><div className="text-[9px] text-foreground/24">{String(index + 1).padStart(2, "0")}</div><div className="mt-6 text-[12px] leading-5">{issue}</div></div>)}</div></section>
            <section className="mt-14"><SectionHeading locale={locale} number="02" eyebrow={isKo(locale) ? "접근 방식" : "Approach"} title={isKo(locale) ? "증거, 책임, 보험과 손해를 따로 확인한 뒤 하나의 사건으로 연결합니다." : "Evidence, liability, coverage, and damages should be understood separately before they are built into one claim."} body={isKo(locale) ? "초기 기록을 보존하고 보험 적용 범위를 확인하면서 치료와 장기적인 영향을 함께 정리하는 것이 핵심입니다." : "The early work is about preserving records, understanding available insurance, following the medical picture, and documenting how the injury changes work and daily life."} /><div className="mt-8 grid border-t border-foreground/12 md:grid-cols-3">{(isKo(locale) ? [["증거", "사고 기록, 사진, 영상, 목격자와 관련 문서를 보존합니다."],["보험", "관련 보험과 책임 당사자를 확인하고 연락 흐름을 정리합니다."],["영향", "치료, 소득 손실과 일상생활의 변화를 실제 자료로 정리합니다."]] : [["Evidence", "Preserve scene records, photographs, video, witnesses, and documents before they disappear."],["Coverage", "Identify the policies and parties that may matter before important claim decisions are made."],["Impact", "Document treatment, missed work, future needs, and the practical effect of the injury on daily life."]]).map(([label, body], index) => <div key={label} className="min-h-[185px] border-b border-foreground/12 py-5 md:border-l md:px-7 md:first:border-l-0 md:first:pl-0"><span className="text-[9px] text-foreground/25">0{index + 1}</span><div className="mt-8 text-[13px] font-medium">{label}</div><p className="mt-3 text-[11px] leading-5 text-foreground/48">{body}</p></div>)}</div></section>
            <section className="mt-16"><SectionHeading locale={locale} number="03" eyebrow={isKo(locale) ? "변호사" : "Attorneys"} title={isKo(locale) ? `${title} 사건을 담당할 팀.` : `Attorneys connected to ${title.toLowerCase()} matters.`} body={isKo(locale) ? "실제 담당 변호사 정보가 제공되면 각 프로필, 결과와 글을 이 페이지에 연결할 수 있습니다." : "As the firm provides the real team information, each attorney can connect directly to this practice, their results, publications, and relevant locations."} /><div className="mt-8"><AttorneyGrid locale={locale} /></div></section>
            <section className="mt-16"><SectionHeading locale={locale} number="04" eyebrow={isKo(locale) ? "지역" : "Locations"} title={isKo(locale) ? "같은 업무 분야를 지역 페이지에서도 찾을 수 있습니다." : "The same practice should connect cleanly into every relevant local page."} /><div className="mt-8"><LocationLinkGrid locale={locale} /></div></section>
          </div>
        </div>
      </main>
      <ConnectionBand locale={locale} />
      <PhoneCta locale={locale} />
    </SiteFrame>
  );
};

export const AttorneyPage = ({ locale }: { locale: SiteLocale }) => (
  <SiteFrame locale={locale}>
    <PageHero locale={locale} eyebrow={isKo(locale) ? "변호사" : "Attorneys"} title={isKo(locale) ? "사건을 맡는 사람을 먼저 보여줍니다." : "The people behind the work should be easy to understand."} description={isKo(locale) ? "한 명의 변호사만을 위한 페이지가 아니라 팀 전체를 확장할 수 있도록 사진, 경력, 업무 분야, 결과와 글을 연결하는 구조입니다." : "This is built as a real team page: portraits, verified credentials, practice focus, representative matters, results, publications, and the locations each attorney serves."} image={heroOffice} />
    <main className="site-shell py-16 md:py-20 lg:py-24">
      <SectionHeading locale={locale} number="01" eyebrow={isKo(locale) ? "팀" : "The team"} title={isKo(locale) ? "현재 확인된 변호사부터 시작하고 팀이 늘어나도 그대로 확장할 수 있습니다." : "Start with the verified attorney we have, and leave the system ready for the rest of the firm."} body={isKo(locale) ? "각 변호사 카드에는 전문 사진, 짧은 소개, 학력, 등록 정보, 언어, 주요 업무와 관련 사건 결과를 넣을 수 있습니다." : "Each attorney profile has room for a professional portrait, concise biography, education, admissions, languages, memberships, focus areas, results, media, and articles."} />
      <div className="mt-9"><AttorneyGrid locale={locale} /></div>
      <section className="mt-16 grid gap-8 border-t border-foreground/12 pt-6 lg:grid-cols-[0.82fr_1.18fr] lg:gap-12 xl:gap-16"><ImageSlot portrait label={isKo(locale) ? "Howard Choi 전문 인물 사진" : "Howard Choi professional portrait"} /><div className="flex flex-col justify-between"><div><div className="text-[9px] font-medium uppercase tracking-[0.16em] text-muted-foreground">01 · Howard Choi</div><h2 style={serif(locale)} className={`${isKo(locale) ? "mt-5 text-[clamp(1.9rem,2.5vw,2.65rem)] font-medium leading-[1.38] tracking-[-0.04em]" : "editorial-serif mt-5 text-[clamp(2rem,2.6vw,2.85rem)] leading-[1.08] tracking-[-0.024em]"}`}>{isKo(locale) ? "직접적인 소통과 명확한 사건 흐름." : "Direct communication and a clear line of responsibility."}</h2><div className="mt-7 grid gap-6 text-[13px] leading-6 text-foreground/58 md:grid-cols-2"><p>{isKo(locale) ? "개인 상해 사건에서는 사고 사실, 치료, 보험과 생활의 변화가 동시에 연결됩니다. 담당 변호사와 사건의 책임 구조를 명확하게 보여주는 것이 중요합니다." : "Injury matters connect the facts of the accident, medical care, insurance, and the way a person's life changes afterward. The attorney page should make responsibility and communication clear from the beginning."}</p><p>{isKo(locale) ? "클라이언트가 제공하는 실제 정보로 학력, 변호사 등록, 언어, 협회, 수상, 대표 사건과 미디어 자료를 채우도록 이 영역을 준비했습니다." : "This area is ready for the real profile information the client provides: education, bar admissions, languages, memberships, recognitions, representative matters, and media appearances."}</p></div></div><div className="mt-10 grid border-t border-foreground/12 sm:grid-cols-2"><div className="py-5 sm:pr-6"><Scale className="h-4 w-4 stroke-[1.35]" /><div className="mt-6 text-[12px] font-medium">{isKo(locale) ? "업무 연결" : "Practice connections"}</div><p className="mt-2 text-[11px] leading-5 text-foreground/46">{isKo(locale) ? "실제 담당 업무 분야를 프로필에서 바로 연결합니다." : "Link the attorney directly to the practice areas they actually handle."}</p></div><div className="border-t border-foreground/12 py-5 sm:border-l sm:border-t-0 sm:pl-6"><ShieldCheck className="h-4 w-4 stroke-[1.35]" /><div className="mt-6 text-[12px] font-medium">{isKo(locale) ? "검증된 정보" : "Verified proof"}</div><p className="mt-2 text-[11px] leading-5 text-foreground/46">{isKo(locale) ? "확인된 경력과 사건 결과만 공개합니다." : "Credentials, results, and recognitions should only appear once they are verified."}</p></div></div></div></section>
      <section className="mt-16"><SectionHeading locale={locale} number="02" eyebrow={isKo(locale) ? "업무 분야" : "Practice focus"} title={isKo(locale) ? "각 변호사가 맡는 실제 업무 분야를 연결합니다." : "Every attorney profile should lead into the work they actually handle."} /><div className="mt-8"><PracticeLinkGrid locale={locale} limit={8} /></div></section>
      <section className="mt-16"><SectionHeading locale={locale} number="03" eyebrow={isKo(locale) ? "지역" : "Locations"} title={isKo(locale) ? "변호사 프로필과 서비스 지역도 서로 연결합니다." : "Attorney profiles should also connect to the communities they serve."} /><div className="mt-8"><LocationLinkGrid locale={locale} /></div></section>
    </main>
    <ConnectionBand locale={locale} />
    <PhoneCta locale={locale} />
  </SiteFrame>
);

export const ResultsPage = ({ locale }: { locale: SiteLocale }) => (
  <SiteFrame locale={locale}>
    <PageHero locale={locale} eyebrow={isKo(locale) ? "사건 결과" : "Results"} title={isKo(locale) ? "결과는 숫자와 그 뒤의 맥락을 함께 보여줘야 합니다." : "Results should show the number and the story behind it."} description={isKo(locale) ? "실제 총 회수 금액, 주요 합의와 평결이 제공되면 담당 변호사, 업무 분야와 지역에 연결할 수 있는 구조입니다." : "Once the client provides verified totals, settlements, and verdicts, this page can connect every outcome to the responsible attorney, practice area, location, and related content."} image={heroBoardroom} />
    <main className="site-shell py-16 md:py-20 lg:py-24">
      <SectionHeading locale={locale} number="01" eyebrow={isKo(locale) ? "증거" : "Proof"} title={isKo(locale) ? "가장 먼저 필요한 것은 검증 가능한 실제 숫자입니다." : "The strongest proof starts with numbers the firm can actually support."} body={isKo(locale) ? "총 회수 금액, 가장 큰 결과, 대표 사건과 필요한 면책 문구를 확인한 뒤 공개합니다." : "The priority is the verified total recovered, notable individual outcomes, representative matters, and the proper disclaimer for each result."} />
      <div className="mt-9 grid border-y border-foreground/12 lg:grid-cols-[0.7fr_1.3fr]"><div className="py-7 lg:border-r lg:border-foreground/12 lg:pr-10"><div className="text-[9px] uppercase tracking-[0.16em] text-muted-foreground">{isKo(locale) ? "총 회수 금액" : "Total recovered"}</div><div style={serif(locale)} className="editorial-serif mt-8 text-[clamp(3rem,5vw,5.5rem)] leading-none text-foreground/26">—</div><p className="mt-5 max-w-[340px] text-[11px] leading-5 text-foreground/44">{isKo(locale) ? "클라이언트가 검증한 실제 총액으로 교체합니다." : "Reserved for the verified firm-wide recovery figure supplied by the client."}</p></div><div className="grid sm:grid-cols-2 lg:pl-10"><div className="border-b border-foreground/12 py-7 sm:pr-7"><div className="text-[9px] text-foreground/28">01</div><div className="mt-10 text-[13px] font-medium">{isKo(locale) ? "가장 큰 결과" : "Largest outcome"}</div><p className="mt-3 text-[11px] leading-5 text-foreground/46">{isKo(locale) ? "공개 가능한 가장 큰 합의 또는 평결을 위한 공간." : "Space for the largest settlement or verdict the firm is permitted to publish."}</p></div><div className="border-b border-foreground/12 py-7 sm:border-l sm:pl-7"><div className="text-[9px] text-foreground/28">02</div><div className="mt-10 text-[13px] font-medium">{isKo(locale) ? "대표 사건" : "Representative matters"}</div><p className="mt-3 text-[11px] leading-5 text-foreground/46">{isKo(locale) ? "사건 유형, 핵심 사실, 결과와 담당 변호사를 연결합니다." : "Each result can show the case type, key facts, outcome, responsible attorney, and related practice area."}</p></div></div></div>
      <section className="mt-16"><SectionHeading locale={locale} number="02" eyebrow={isKo(locale) ? "사건 결과" : "Case outcomes"} title={isKo(locale) ? "실제 결과가 들어오면 이 구조에 바로 추가할 수 있습니다." : "The layout is ready for real case results as soon as the client approves them."} /><div className="mt-8 grid border-t border-foreground/12 md:grid-cols-3">{(isKo(locale) ? ["차량 사고", "중대 상해", "시설 책임"] : ["Motor Vehicle Claims", "Serious Injury", "Premises Claims"]).map((label, index) => <article key={label} className="border-b border-foreground/12 py-6 md:border-l md:px-7 md:first:border-l-0 md:first:pl-0"><ImageSlot label={isKo(locale) ? "선택적 사건 이미지 또는 증거" : "Optional case / evidence image"} /><div className="mt-5 text-[9px] text-foreground/26">0{index + 1}</div><h3 style={serif(locale)} className={`${isKo(locale) ? "mt-5 text-[1.4rem] font-medium" : "editorial-serif mt-5 text-[1.65rem]"}`}>{label}</h3><p className="mt-3 text-[11px] leading-5 text-foreground/46">{isKo(locale) ? "실제 결과가 제공되면 금액, 요약, 담당 변호사와 관련 업무·지역 링크를 추가합니다." : "When a verified result is supplied, add the amount, concise story, responsible attorney, practice area, location, and disclaimer."}</p></article>)}</div></section>
      <section className="mt-16"><SectionHeading locale={locale} number="03" eyebrow={isKo(locale) ? "변호사" : "Attorneys"} title={isKo(locale) ? "결과는 담당 변호사 프로필로 다시 연결합니다." : "Results should lead back to the attorneys responsible for them."} /><div className="mt-8"><AttorneyGrid locale={locale} /></div></section>
      <div className="mt-12 grid gap-5 border-t border-foreground/12 pt-5 lg:grid-cols-[0.34fr_1.66fr]"><div className="text-[9px] font-medium uppercase tracking-[0.15em] text-foreground/34">{isKo(locale) ? "중요 고지" : "Important"}</div><p className="max-w-[820px] text-[12px] leading-6 text-foreground/52">{isKo(locale) ? "과거의 결과는 향후 사건의 결과를 보장하지 않습니다. 각 사건은 고유한 사실과 법률에 따라 달라집니다." : "Past results do not guarantee or predict a similar outcome in a future matter. Every case is different and must be evaluated on its own facts."}</p></div>
    </main>
    <ConnectionBand locale={locale} />
    <PhoneCta locale={locale} />
  </SiteFrame>
);

export const AboutFirmPage = ({ locale }: { locale: SiteLocale }) => (
  <SiteFrame locale={locale}>
    <PageHero locale={locale} eyebrow={isKo(locale) ? "로펌 소개" : "About"} title={isKo(locale) ? "로펌의 이야기보다 먼저 구조와 책임을 명확하게." : "A firm should make the work, the people, and the next step clear."} description={isKo(locale) ? "업무 분야, 지역, 변호사, 결과와 법률 자료가 서로 연결되어 방문자가 필요한 정보를 자연스럽게 찾을 수 있도록 구성합니다." : "The site is being built so practice areas, locations, attorneys, results, and legal resources work as one connected system rather than separate pages."} image={heroJustice} />
    <main className="site-shell py-16 md:py-20 lg:py-24">
      <SectionHeading locale={locale} number="01" eyebrow={isKo(locale) ? "로펌" : "The firm"} title={isKo(locale) ? "지역성, 직접적인 소통, 그리고 필요한 정보에 집중합니다." : "Local relevance, direct communication, and fewer unnecessary layers."} body={isKo(locale) ? "Buena Park를 중심으로 인근 지역에서 개인 상해 관련 정보를 쉽게 찾고 담당 변호사와 다음 단계를 이해할 수 있도록 구성합니다." : "Buena Park is the center of the site, with surrounding communities, injury practices, attorney profiles, proof, and resources connected around that local focus."} />
      <div className="mt-10 grid gap-8 lg:grid-cols-[1.05fr_0.95fr]"><ImageSlot label={isKo(locale) ? "로펌 팀 또는 사무실 사진" : "Firm team / office photography"} /><div className="grid border-t border-foreground/12 sm:grid-cols-2 lg:grid-cols-1 xl:grid-cols-2">{(isKo(locale) ? [["01", "명확한 책임", "누가 사건을 담당하는지 쉽게 이해할 수 있어야 합니다."],["02", "실제 증거", "확인된 경력, 결과와 후기만 사용합니다."],["03", "지역 연결", "지역 페이지를 관련 업무와 변호사에 연결합니다."],["04", "유용한 정보", "블로그와 가이드가 실제 다음 단계로 이어지게 합니다."]] : [["01", "Clear responsibility", "Visitors should understand who handles the work and how to reach them."],["02", "Real proof", "Credentials, results, and testimonials should be published only when verified."],["03", "Local connection", "Every location page should connect to relevant practices and attorneys."],["04", "Useful information", "Articles should answer real questions and lead naturally to the next step."]]).map(([number, title, body]) => <div key={number} className="min-h-[150px] border-b border-foreground/12 py-5 sm:px-5 sm:first:pl-0 lg:px-0 xl:border-l xl:px-6 xl:first:border-l-0 xl:first:pl-0"><div className="text-[9px] text-foreground/25">{number}</div><div className="mt-7 text-[12px] font-medium">{title}</div><p className="mt-2 text-[11px] leading-5 text-foreground/46">{body}</p></div>)}</div></div>
      <section className="mt-16"><SectionHeading locale={locale} number="02" eyebrow={isKo(locale) ? "변호사" : "Attorneys"} title={isKo(locale) ? "로펌의 중심은 실제로 사건을 맡는 사람입니다." : "The firm page should introduce the people who actually carry the work."} /><div className="mt-8"><AttorneyGrid locale={locale} /></div></section>
      <section className="mt-16"><SectionHeading locale={locale} number="03" eyebrow={isKo(locale) ? "연결" : "Interconnection"} title={isKo(locale) ? "로펌 소개에서 업무와 지역으로 바로 이어집니다." : "From the firm story, visitors should be able to move directly into the relevant practice or location."} /><div className="mt-8"><PracticeLinkGrid locale={locale} limit={4} /></div><div className="mt-8"><LocationLinkGrid locale={locale} /></div></section>
    </main>
    <ConnectionBand locale={locale} />
    <PhoneCta locale={locale} />
  </SiteFrame>
);

export const LocationsPage = ({ locale }: { locale: SiteLocale }) => (
  <SiteFrame locale={locale}>
    <PageHero locale={locale} eyebrow={isKo(locale) ? "서비스 지역" : "Locations"} title={isKo(locale) ? "각 지역을 독립적인 로컬 허브로 만듭니다." : "Every location should feel like a real local hub."} description={isKo(locale) ? "도시 이름만 바꾸는 페이지가 아니라 지역 이미지, 관련 업무, 담당 변호사, 결과와 법률 자료를 함께 연결하는 구조입니다." : "Not city-name duplicates: each page has room for local photography, useful context, relevant practice areas, attorneys, results, and legal resources."} image={heroBoardroom} />
    <main className="site-shell py-16 md:py-20 lg:py-24">
      <SectionHeading locale={locale} number="01" eyebrow={isKo(locale) ? "서비스 지역" : "Service area"} title={isKo(locale) ? "지역 페이지에 실제 지역성과 사람을 넣을 공간을 만듭니다." : "The local pages now have room for real place, people, and proof."} body={isKo(locale) ? "각 도시마다 실제 사진, 사무실 정보가 있다면 주소, 관련 사고 유형, 담당 변호사, 사례와 유용한 가이드를 연결할 수 있습니다." : "Each city can support real photography, a physical office address when one exists, relevant accident types, attorneys serving the area, local results, and useful guides."} />
      <div className="mt-10 grid border-t border-foreground/12 md:grid-cols-2 xl:grid-cols-3">{serviceLocations.map((location, index) => <Link key={location.slug} to={`${prefixFor(locale)}/locations/${location.slug}`} className="group border-b border-foreground/12 py-6 md:px-6 md:first:pl-0 xl:border-l xl:first:border-l-0"><ImageSlot label={`${isKo(locale) ? location.koName : location.name}${isKo(locale) ? " 지역 또는 사무실 사진" : " local / office photography"}`} /><div className="mt-5 flex items-center justify-between text-[9px] text-foreground/26"><span>{String(index + 1).padStart(2, "0")}</span><MapPin className="h-3 w-3" /></div><h2 style={serif(locale)} className={`${isKo(locale) ? "mt-6 text-[1.55rem] font-medium tracking-[-0.035em]" : "editorial-serif mt-6 text-[1.8rem] tracking-[-0.02em]"}`}>{isKo(locale) ? location.koName : location.name}</h2><p className="mt-3 max-w-[420px] text-[11px] leading-5 text-foreground/46">{isKo(locale) ? location.koDescription : location.description}</p><div className="mt-5 inline-flex items-center gap-2 text-[9px] font-medium uppercase tracking-[0.1em] text-foreground/38 group-hover:text-foreground">{isKo(locale) ? "지역 보기" : "View location"}<ArrowRight className="h-3 w-3 transition-transform group-hover:translate-x-1" /></div></Link>)}</div>
      <section className="mt-16"><SectionHeading locale={locale} number="02" eyebrow={isKo(locale) ? "변호사" : "Attorneys"} title={isKo(locale) ? "각 지역은 실제 담당 변호사와 연결되어야 합니다." : "Every location page should show the attorneys who actually serve it."} /><div className="mt-8"><AttorneyGrid locale={locale} /></div></section>
    </main>
    <ConnectionBand locale={locale} />
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
        <div className="grid gap-12 lg:grid-cols-[0.3fr_1.7fr] lg:gap-12 xl:gap-16"><aside><div className="sticky top-24 border-t border-foreground/14 pt-4"><div className="text-[9px] font-medium uppercase tracking-[0.15em] text-muted-foreground">{isKo(locale) ? "인근 지역" : "Nearby locations"}</div><div className="mt-5 divide-y divide-foreground/10 text-[11px]">{serviceLocations.filter((item) => item.slug !== location.slug).map((item) => <Link key={item.slug} to={`${prefixFor(locale)}/locations/${item.slug}`} className="flex items-center justify-between py-3 text-foreground/54 hover:text-foreground"><span>{isKo(locale) ? item.koName : item.name}</span><ArrowRight className="h-3 w-3 stroke-[1.25] text-foreground/24" /></Link>)}</div></div></aside><div><SectionHeading locale={locale} number="01" eyebrow={isKo(locale) ? "지역 개요" : "Local overview"} title={isKo(locale) ? `${name}에서 사고가 발생했다면 무엇부터 정리해야 하는지.` : `If an accident happened in ${name}, start by organizing the facts before the claim becomes noise.`} body={isKo(locale) ? "치료, 보험 연락, 현장 기록과 업무 중단이 동시에 시작될 수 있습니다. 중요한 자료를 먼저 보존하고 책임과 보험 범위를 차분하게 확인하는 것이 출발점입니다." : "Medical treatment, insurance calls, scene evidence, vehicle records, and missed work can all begin at the same time. The first job is to preserve what matters and understand responsibility and coverage before important details disappear."} /><div className="mt-9"><ImageSlot label={`${name}${isKo(locale) ? " 실제 지역, 교차로, 사무실 또는 커뮤니티 이미지" : " — real neighborhood, roadway, office, or community photography"}`} /></div><section className="mt-14"><SectionHeading locale={locale} number="02" eyebrow={isKo(locale) ? "지역 정보" : "Local context"} title={isKo(locale) ? "지역 페이지에 넣을 핵심 정보." : "What this local page should help a visitor understand."} /><div className="mt-8 grid border-t border-foreground/12 md:grid-cols-3">{(isKo(locale) ? [["어떤 사건", `${name}에서 주로 문의하는 교통사고와 상해 유형.`],["누가 담당", "이 지역을 실제 담당하는 변호사와 직접 프로필 연결."],["다음 단계", "상담, 관련 법률 가이드, 사건 결과와 인근 지역으로 연결."]] : [["What we handle", `The accident and injury matters relevant to people in ${location.name}.`],["Who handles it", "The attorneys who actually serve this location, linked to their full profiles."],["What comes next", "A clear route to consultation, related guides, results, and neighboring locations."]]).map(([title, body], index) => <div key={title} className="min-h-[165px] border-b border-foreground/12 py-5 md:border-l md:px-7 md:first:border-l-0 md:first:pl-0"><div className="text-[9px] text-foreground/25">0{index + 1}</div><div className="mt-8 text-[12px] font-medium">{title}</div><p className="mt-3 text-[11px] leading-5 text-foreground/46">{body}</p></div>)}</div></section><section className="mt-16"><SectionHeading locale={locale} number="03" eyebrow={isKo(locale) ? "업무 분야" : "Practice Areas"} title={isKo(locale) ? `${name} 지역에서 연결할 주요 개인 상해 업무.` : `Practice areas connected to ${name}.`} /><div className="mt-8"><PracticeLinkGrid locale={locale} limit={8} /></div></section><section className="mt-16"><SectionHeading locale={locale} number="04" eyebrow={isKo(locale) ? "변호사" : "Attorneys"} title={isKo(locale) ? `${name} 지역을 담당할 변호사.` : `Attorneys serving ${name}.`} body={isKo(locale) ? "실제 팀 정보가 제공되는 대로 각 변호사의 지역 경험, 업무 분야와 결과를 이곳에 연결합니다." : "As the client supplies the real team details, each attorney can connect to their local experience, practice focus, results, and useful articles for this community."} /><div className="mt-8"><AttorneyGrid locale={locale} /></div></section><section className="mt-16"><SectionHeading locale={locale} number="05" eyebrow={isKo(locale) ? "다음 단계" : "Useful next steps"} title={isKo(locale) ? "지역 페이지에서 필요한 다음 정보로 바로 이동합니다." : "The local page should never be a dead end."} /><div className="mt-8 grid border-t border-foreground/12 md:grid-cols-3"><Link to={`${prefixFor(locale)}/results`} className="group min-h-[140px] border-b border-foreground/12 py-5 md:pr-7"><div className="text-[9px] text-foreground/25">01</div><div className="mt-8 flex items-center justify-between text-[12px] font-medium"><span>{isKo(locale) ? "사건 결과" : "Results"}</span><ArrowRight className="h-3 w-3 group-hover:translate-x-1" /></div></Link><Link to={`${prefixFor(locale)}/blogs`} className="group min-h-[140px] border-b border-foreground/12 py-5 md:border-l md:px-7"><div className="text-[9px] text-foreground/25">02</div><div className="mt-8 flex items-center justify-between text-[12px] font-medium"><span>{isKo(locale) ? "법률 블로그" : "Law Blog"}</span><ArrowRight className="h-3 w-3 group-hover:translate-x-1" /></div></Link><Link to={`${prefixFor(locale)}/contact`} className="group min-h-[140px] border-b border-foreground/12 py-5 md:border-l md:pl-7"><div className="text-[9px] text-foreground/25">03</div><div className="mt-8 flex items-center justify-between text-[12px] font-medium"><span>{isKo(locale) ? "상담 문의" : "Start a consultation"}</span><ArrowRight className="h-3 w-3 group-hover:translate-x-1" /></div></Link></div></section></div></div>
      </main>
      <ConnectionBand locale={locale} />
      <PhoneCta locale={locale} />
    </SiteFrame>
  );
};
