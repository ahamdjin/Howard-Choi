import { motion } from "framer-motion";
import {
  ArrowRight,
  Award,
  BadgeCheck,
  Camera,
  FileText,
  MapPin,
  Phone,
  Quote,
  Scale,
  ShieldCheck,
  Sparkles,
} from "lucide-react";
import { useParams } from "@tanstack/react-router";
import Navigation from "@/components/Navigation";
import KoreanNavigation from "@/components/KoreanNavigation";
import Footer from "@/components/Footer";
import KoreanFooter from "@/components/KoreanFooter";
import heroJustice from "@/assets/law-firm/hero-justice-library.webp";
import heroOffice from "@/assets/law-firm/hero-law-office.webp";
import heroBoardroom from "@/assets/law-firm/hero-city-boardroom.webp";
import heroCourthouse from "@/assets/law-firm/hero-courthouse.webp";
import leadCounsel from "@/assets/law-firm/lead-counsel.avif";
import {
  brand,
  getPracticeArea,
  practiceAreas,
  type PracticeArea,
  type SiteLocale,
} from "@/data/injurySite";

const isKo = (locale: SiteLocale) => locale === "ko";
const pathPrefix = (locale: SiteLocale) => (isKo(locale) ? "/ko" : "");
const serifStyle = (locale: SiteLocale) =>
  isKo(locale) ? { fontFamily: '\"Noto Serif KR\", serif' } : undefined;

const practiceImages = [heroCourthouse, heroBoardroom, heroJustice, heroOffice];

const Frame = ({ locale, children }: { locale: SiteLocale; children: React.ReactNode }) => (
  <div
    className="min-h-screen overflow-x-clip bg-[#F9F8F6] text-[#1E1C1A]"
    style={isKo(locale) ? { fontFamily: '\"Noto Sans KR\", sans-serif' } : undefined}
  >
    {isKo(locale) ? <KoreanNavigation /> : <Navigation />}
    {children}
    {isKo(locale) ? <KoreanFooter /> : <Footer />}
  </div>
);

const Label = ({ children, light = false }: { children: React.ReactNode; light?: boolean }) => (
  <span className={`text-[9px] font-semibold uppercase tracking-[0.17em] ${light ? "text-white/48" : "text-[#1E1C1A]/40"}`}>
    {children}
  </span>
);

const PrimaryButton = ({ locale, label }: { locale: SiteLocale; label?: string }) => (
  <a
    href={`${pathPrefix(locale)}/contact`}
    className="inline-flex items-center gap-3 rounded-full bg-[#381907] px-5 py-3 text-[11px] font-semibold text-[#F3EEE5] transition-transform hover:-translate-y-0.5"
  >
    {label || (isKo(locale) ? "상담 예약" : "Schedule a consultation")}
    <ArrowRight className="h-3.5 w-3.5" />
  </a>
);

const SectionTitle = ({
  locale,
  label,
  title,
  body,
  center = false,
}: {
  locale: SiteLocale;
  label: string;
  title: string;
  body?: string;
  center?: boolean;
}) => (
  <div className={center ? "mx-auto max-w-[820px] text-center" : "max-w-[880px]"}>
    <Label>{label}</Label>
    <h2
      style={serifStyle(locale)}
      className={`mt-4 ${
        isKo(locale)
          ? "text-[clamp(1.9rem,3.4vw,3.5rem)] font-medium leading-[1.28] tracking-[-0.04em]"
          : "editorial-serif text-[clamp(2.25rem,4vw,4.4rem)] leading-[0.98] tracking-[-0.035em]"
      }`}
    >
      {title}
    </h2>
    {body && <p className={`mt-5 max-w-[650px] text-[13px] leading-7 text-[#1E1C1A]/55 ${center ? "mx-auto" : ""}`}>{body}</p>}
  </div>
);

const SoftCard = ({ children, className = "" }: { children: React.ReactNode; className?: string }) => (
  <div className={`rounded-[5px] border border-[#1E1C1A]/10 bg-white/72 ${className}`}>{children}</div>
);

const ConsultationCta = ({ locale }: { locale: SiteLocale }) => (
  <section className="bg-[#211A16] text-[#F3EEE5]">
    <div className="site-shell grid gap-8 py-14 md:py-18 lg:grid-cols-[1.15fr_0.85fr] lg:items-end lg:py-20">
      <div>
        <Label light>{isKo(locale) ? "상담" : "Start here"}</Label>
        <h2
          style={serifStyle(locale)}
          className={`mt-5 max-w-[760px] ${
            isKo(locale)
              ? "text-[clamp(2.2rem,4.5vw,4.6rem)] font-medium leading-[1.22] tracking-[-0.04em]"
              : "editorial-serif text-[clamp(2.8rem,5.5vw,6rem)] leading-[0.92] tracking-[-0.04em]"
          }`}
        >
          {isKo(locale) ? "복잡한 상황을 더 단순하게 정리해 보세요." : "One clear conversation can simplify what comes next."}
        </h2>
      </div>
      <div className="rounded-[5px] bg-[#F3EEE5] p-6 text-[#1E1C1A] md:p-7">
        <p className="text-[12px] leading-6 text-[#1E1C1A]/56">
          {isKo(locale)
            ? "사고 경위와 현재 상황을 알려주시면 상담 가능 여부와 다음 단계를 확인할 수 있습니다."
            : "Tell us what happened and where things stand. We can determine whether the matter is a fit and what the next useful step may be."}
        </p>
        <div className="mt-6 flex flex-wrap gap-3">
          <PrimaryButton locale={locale} />
          <a href={brand.phoneHref} className="inline-flex items-center gap-2 rounded-full border border-[#1E1C1A]/14 px-5 py-3 text-[11px] font-medium">
            <Phone className="h-3.5 w-3.5" /> {brand.phoneDisplay}
          </a>
        </div>
      </div>
    </div>
  </section>
);

const PracticeCard = ({
  practice,
  index,
  locale,
  compact = false,
}: {
  practice: PracticeArea;
  index: number;
  locale: SiteLocale;
  compact?: boolean;
}) => (
  <a
    href={`${pathPrefix(locale)}/practice-areas/${practice.slug}`}
    className="group overflow-hidden rounded-[5px] border border-[#1E1C1A]/10 bg-white/76 transition-transform duration-300 hover:-translate-y-1"
  >
    <div className={`relative overflow-hidden bg-[#D8D2CA] ${compact ? "h-[150px]" : "h-[210px] md:h-[230px]"}`}>
      <img
        src={practiceImages[index % practiceImages.length]}
        alt=""
        loading="lazy"
        decoding="async"
        className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-[1.025]"
      />
      <div className="absolute inset-0 bg-[#1E1C1A]/14" />
      <span className="absolute left-4 top-4 rounded-full bg-[#F3EEE5]/92 px-2.5 py-1 text-[8px] font-semibold tracking-[0.1em] text-[#381907]">
        {String(index + 1).padStart(2, "0")}
      </span>
    </div>
    <div className={compact ? "p-5" : "p-6"}>
      <div className="flex items-start justify-between gap-5">
        <h3 style={serifStyle(locale)} className={`${compact ? "text-[1.35rem]" : "text-[1.55rem] md:text-[1.75rem]"} leading-[1.05]`}>
          {isKo(locale) ? practice.koTitle : practice.title}
        </h3>
        <ArrowRight className="mt-1 h-4 w-4 shrink-0 text-[#381907] transition-transform group-hover:translate-x-1" />
      </div>
      {!compact && (
        <p className="mt-3 line-clamp-2 text-[11px] leading-5 text-[#1E1C1A]/50">
          {isKo(locale) ? practice.koDescription : practice.description}
        </p>
      )}
    </div>
  </a>
);

const Portrait = ({ className = "" }: { className?: string }) => (
  <div className={`relative overflow-hidden bg-[#D8D1C8] ${className}`}>
    <img src={leadCounsel} alt="Howard Choi" className="h-full w-full object-cover object-center" fetchPriority="high" decoding="async" />
    <div className="absolute inset-0 bg-gradient-to-t from-[#1E1C1A]/34 via-transparent to-transparent" />
  </div>
);

export const AttorneyPage = ({ locale }: { locale: SiteLocale }) => (
  <Frame locale={locale}>
    <main>
      <section className="bg-[#211A16] pt-[60px] text-[#F3EEE5]">
        <div className="site-shell grid min-h-[calc(100svh-60px)] gap-5 py-5 lg:grid-cols-[1.05fr_0.95fr] lg:gap-7 lg:py-7">
          <Portrait className="min-h-[58svh] rounded-[5px] lg:min-h-0" />
          <div className="flex flex-col justify-between rounded-[5px] bg-[#2A211C] p-7 md:p-9 lg:p-10 xl:p-12">
            <div className="flex items-center justify-between gap-4">
              <Label light>{isKo(locale) ? "변호사" : "Attorney"}</Label>
              <span className="text-[9px] uppercase tracking-[0.14em] text-white/34">Buena Park · California</span>
            </div>
            <motion.div initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7 }} className="py-10">
              <h1
                style={serifStyle(locale)}
                className={`${
                  isKo(locale)
                    ? "text-[clamp(3rem,5vw,5.6rem)] font-medium leading-[1.1] tracking-[-0.05em]"
                    : "editorial-serif text-[clamp(4.2rem,7vw,8.2rem)] leading-[0.84] tracking-[-0.055em]"
                }`}
              >
                Howard<br />Choi
              </h1>
              <p className="mt-6 max-w-[500px] text-[13px] leading-7 text-white/58">
                {isKo(locale)
                  ? "사고·상해 사건을 중심으로, 의뢰인이 현재 상황과 다음 단계를 명확히 이해할 수 있도록 돕습니다."
                  : "Accident and injury counsel focused on direct communication, careful case development, and a clear path forward."}
              </p>
              <div className="mt-7 flex flex-wrap gap-3">
                <a href={`${pathPrefix(locale)}/contact`} className="rounded-full bg-[#F3EEE5] px-5 py-3 text-[11px] font-semibold text-[#1E1C1A]">
                  {isKo(locale) ? "상담 예약" : "Schedule a consultation"}
                </a>
                <a href={brand.phoneHref} className="rounded-full border border-white/18 px-5 py-3 text-[11px] text-white/72">{brand.phoneDisplay}</a>
              </div>
            </motion.div>
            <div className="grid gap-3 text-[10px] text-white/46 sm:grid-cols-2">
              <span>{brand.address}</span>
              <span className="sm:text-right">{isKo(locale) ? "사고 · 개인상해" : "Accident · Personal Injury"}</span>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-[#F3EEE5] py-16 md:py-20">
        <div className="site-shell">
          <SectionTitle
            locale={locale}
            label={isKo(locale) ? "신뢰" : "Trust, simply shown"}
            title={isKo(locale) ? "긴 이력보다 중요한 정보를 먼저 보여줍니다." : "Credibility should feel clear, not crowded."}
            body={isKo(locale) ? "실제 후기와 검증된 자격 정보가 준비되면 이 카드들에 바로 적용할 수 있습니다." : "Verified client feedback and professional recognition can live here without turning the page into a résumé wall."}
          />
          <div className="mt-10 grid gap-4 lg:grid-cols-[1.35fr_0.65fr]">
            <SoftCard className="p-7 md:p-9">
              <Quote className="h-5 w-5 stroke-[1.3] text-[#381907]" />
              <p style={serifStyle(locale)} className="mt-8 max-w-[760px] text-[clamp(1.7rem,3vw,3.2rem)] leading-[1.12] tracking-[-0.026em]">
                {isKo(locale) ? "실제 고객 후기 한 문장이 이곳에 들어갑니다." : "A verified client voice belongs here — short, human, and easy to trust."}
              </p>
              <div className="mt-8 rounded-[4px] bg-[#F3EEE5] px-4 py-3 text-[9px] uppercase tracking-[0.12em] text-[#1E1C1A]/38">
                {isKo(locale) ? "승인된 후기 입력 예정" : "Reserved for an approved testimonial"}
              </div>
            </SoftCard>
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-1">
              <SoftCard className="p-6">
                <Award className="h-4 w-4 stroke-[1.3] text-[#381907]" />
                <h3 className="mt-8 text-[13px] font-semibold">{isKo(locale) ? "수상 · 자격" : "Recognition"}</h3>
                <p className="mt-2 text-[10px] leading-5 text-[#1E1C1A]/46">{isKo(locale) ? "검증된 수상, 등록 및 협회 정보만 표시합니다." : "Only verified awards, admissions, and memberships will be shown."}</p>
              </SoftCard>
              <SoftCard className="p-6">
                <BadgeCheck className="h-4 w-4 stroke-[1.3] text-[#381907]" />
                <h3 className="mt-8 text-[13px] font-semibold">{isKo(locale) ? "전문 프로필" : "Professional profiles"}</h3>
                <p className="mt-2 text-[10px] leading-5 text-[#1E1C1A]/46">LinkedIn · Avvo · Justia</p>
              </SoftCard>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-[#F9F8F6] py-18 md:py-24">
        <div className="site-shell grid gap-8 lg:grid-cols-[0.95fr_1.05fr] lg:items-center">
          <div className="grid grid-cols-2 gap-4">
            <div className="relative min-h-[460px] overflow-hidden rounded-[5px]">
              <img src={heroOffice} alt="Law office interior" loading="lazy" className="absolute inset-0 h-full w-full object-cover" />
            </div>
            <div className="grid gap-4 pt-14">
              <div className="relative min-h-[230px] overflow-hidden rounded-[5px]">
                <img src={heroBoardroom} alt="Legal meeting room" loading="lazy" className="absolute inset-0 h-full w-full object-cover" />
              </div>
              <SoftCard className="p-6">
                <Label>{isKo(locale) ? "사무실" : "Office"}</Label>
                <p className="mt-4 text-[12px] leading-6">{brand.address}</p>
              </SoftCard>
            </div>
          </div>
          <div className="lg:pl-8 xl:pl-12">
            <SectionTitle
              locale={locale}
              label={isKo(locale) ? "접근 방식" : "Approach"}
              title={isKo(locale) ? "사건을 복잡하게 보이지 않게 만드는 일." : "Make the work feel understandable."}
              body={isKo(locale) ? "상해 사건은 치료, 보험, 증거와 일상생활의 변화가 함께 움직입니다. 핵심을 짧고 명확하게 정리하는 것이 중요합니다." : "Injury matters involve treatment, insurance, evidence, work, and daily life. The goal is to organize those moving parts into a clear case story."}
            />
            <div className="mt-8 grid gap-3 sm:grid-cols-3">
              {[
                [isKo(locale) ? "듣기" : "Listen", isKo(locale) ? "사실과 우려부터." : "Start with the facts."],
                [isKo(locale) ? "정리" : "Build", isKo(locale) ? "증거와 치료를 연결." : "Connect the evidence."],
                [isKo(locale) ? "진행" : "Move", isKo(locale) ? "다음 행동을 명확히." : "Keep the next step clear."],
              ].map(([title, body]) => (
                <SoftCard key={title} className="p-5">
                  <div className="text-[12px] font-semibold">{title}</div>
                  <p className="mt-2 text-[10px] leading-5 text-[#1E1C1A]/46">{body}</p>
                </SoftCard>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="bg-[#F3EEE5] py-18 md:py-24">
        <div className="site-shell">
          <SectionTitle locale={locale} label={isKo(locale) ? "업무 분야" : "Practice focus"} title={isKo(locale) ? "사고 유형별로 필요한 일을 빠르게 찾습니다." : "Find the kind of help that fits the accident."} />
          <div className="mt-10 grid gap-4 md:grid-cols-2 xl:grid-cols-4">
            {practiceAreas.slice(0, 4).map((practice, index) => <PracticeCard key={practice.slug} practice={practice} index={index} locale={locale} compact />)}
          </div>
        </div>
      </section>

      <ConsultationCta locale={locale} />
    </main>
  </Frame>
);

export const AboutFirmPage = ({ locale }: { locale: SiteLocale }) => (
  <Frame locale={locale}>
    <main>
      <section className="bg-[#F3EEE5] pt-[60px]">
        <div className="site-shell py-5 md:py-7">
          <div className="relative min-h-[72svh] overflow-hidden rounded-[5px] bg-[#211A16]">
            <img src={heroOffice} alt="Law office interior" className="absolute inset-0 h-full w-full object-cover" fetchPriority="high" />
            <div className="absolute inset-0 bg-gradient-to-r from-[#1E1C1A]/78 via-[#1E1C1A]/42 to-[#1E1C1A]/14" />
            <div className="relative z-10 flex min-h-[72svh] items-end p-6 md:p-10 lg:p-12">
              <motion.div initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7 }} className="max-w-[760px] rounded-[5px] bg-[#F3EEE5]/96 p-7 md:p-9">
                <Label>{isKo(locale) ? "로펌 소개" : "About the firm"}</Label>
                <h1 style={serifStyle(locale)} className={`${isKo(locale) ? "mt-4 text-[clamp(2.5rem,5vw,5.2rem)] font-medium leading-[1.12]" : "editorial-serif mt-4 text-[clamp(3.6rem,6.8vw,7.4rem)] leading-[0.88] tracking-[-0.05em]"}`}>
                  {isKo(locale) ? "크게 보이기보다, 더 명확하게 일합니다." : "Built to feel personal, not oversized."}
                </h1>
                <p className="mt-6 max-w-[590px] text-[13px] leading-7 text-[#1E1C1A]/58">
                  {isKo(locale) ? "사고 이후 복잡해진 상황을 더 복잡하게 만들지 않습니다. 필요한 사람, 사실, 다음 단계에 집중합니다." : "After an accident, the legal process should create direction. The firm stays focused on the person, the evidence, and the next useful step."}
                </p>
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-[#F9F8F6] py-18 md:py-24">
        <div className="site-shell">
          <SectionTitle locale={locale} label={isKo(locale) ? "원칙" : "What matters here"} title={isKo(locale) ? "단순한 구조가 더 좋은 경험을 만듭니다." : "A simple structure makes the experience better."} center />
          <div className="mx-auto mt-10 grid max-w-[1080px] gap-4 md:grid-cols-3">
            {[
              [Sparkles, isKo(locale) ? "명확성" : "Clarity", isKo(locale) ? "무엇이 중요한지 짧게 정리합니다." : "Explain what matters without burying it in legal language."],
              [ShieldCheck, isKo(locale) ? "검증" : "Proof", isKo(locale) ? "확인된 정보만 공개합니다." : "Use verified credentials, results, and testimonials only."],
              [MapPin, isKo(locale) ? "지역성" : "Local focus", isKo(locale) ? "Buena Park를 중심으로 인근 지역과 연결합니다." : "Keep Buena Park and nearby communities connected to the work."],
            ].map(([Icon, title, body], index) => {
              const IconCmp = Icon as typeof Sparkles;
              return (
                <SoftCard key={String(title)} className="p-7">
                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[#F3EEE5] text-[#381907]"><IconCmp className="h-4 w-4 stroke-[1.3]" /></div>
                  <div className="mt-10 text-[9px] text-[#1E1C1A]/26">0{index + 1}</div>
                  <h3 style={serifStyle(locale)} className="mt-3 text-[1.55rem] leading-tight">{String(title)}</h3>
                  <p className="mt-3 text-[11px] leading-6 text-[#1E1C1A]/50">{String(body)}</p>
                </SoftCard>
              );
            })}
          </div>
        </div>
      </section>

      <section className="bg-[#F3EEE5] py-18 md:py-24">
        <div className="site-shell grid gap-6 lg:grid-cols-[1.08fr_0.92fr]">
          <div className="grid min-h-[620px] grid-cols-[1.25fr_0.75fr] gap-4">
            <div className="relative overflow-hidden rounded-[5px]">
              <img src={heroBoardroom} alt="Legal meeting space" loading="lazy" className="absolute inset-0 h-full w-full object-cover" />
            </div>
            <div className="grid gap-4">
              <div className="relative overflow-hidden rounded-[5px]">
                <img src={heroJustice} alt="Law library" loading="lazy" className="absolute inset-0 h-full w-full object-cover" />
              </div>
              <div className="relative overflow-hidden rounded-[5px]">
                <img src={heroCourthouse} alt="Courthouse" loading="lazy" className="absolute inset-0 h-full w-full object-cover" />
              </div>
            </div>
          </div>
          <div className="flex flex-col justify-center rounded-[5px] bg-white/76 p-7 md:p-10 lg:p-12">
            <Label>{isKo(locale) ? "사고 이후" : "After the accident"}</Label>
            <h2 style={serifStyle(locale)} className={`${isKo(locale) ? "mt-5 text-[clamp(2rem,3.7vw,3.8rem)] font-medium leading-[1.25]" : "editorial-serif mt-5 text-[clamp(2.5rem,4.7vw,5rem)] leading-[0.96] tracking-[-0.035em]"}`}>
              {isKo(locale) ? "사람은 더 많은 정보보다 방향이 필요합니다." : "People need direction more than they need more information."}
            </h2>
            <p className="mt-6 max-w-[560px] text-[13px] leading-7 text-[#1E1C1A]/56">
              {isKo(locale) ? "치료, 보험 연락, 차량 문제, 업무와 가족 일정이 동시에 움직일 수 있습니다. 법률 업무는 그 복잡함을 하나의 명확한 이야기로 정리해야 합니다." : "Treatment, insurance calls, vehicle issues, work, and family life can all move at once. Legal work should organize that complexity into one understandable story."}
            </p>
            <div className="mt-8"><PrimaryButton locale={locale} label={isKo(locale) ? "상담 시작" : "Start a conversation"} /></div>
          </div>
        </div>
      </section>

      <section className="bg-[#F9F8F6] py-18 md:py-24">
        <div className="site-shell">
          <SectionTitle locale={locale} label={isKo(locale) ? "담당 변호사" : "The attorney"} title={isKo(locale) ? "결국 관계는 사건을 맡는 사람에게서 시작됩니다." : "The relationship starts with the person handling the work."} />
          <div className="mt-10 grid overflow-hidden rounded-[5px] border border-[#1E1C1A]/10 bg-[#F3EEE5] lg:grid-cols-[0.72fr_1.28fr]">
            <Portrait className="min-h-[480px]" />
            <div className="flex flex-col justify-between p-8 md:p-10 lg:p-12">
              <div>
                <Label>Howard Choi · {isKo(locale) ? "변호사" : "Attorney"}</Label>
                <h3 style={serifStyle(locale)} className="mt-5 max-w-[700px] text-[clamp(2.2rem,4vw,4.5rem)] leading-[0.98] tracking-[-0.03em]">
                  {isKo(locale) ? "직접적인 소통. 분명한 책임." : "Direct communication. Clear responsibility."}
                </h3>
              </div>
              <a href={`${pathPrefix(locale)}/attorney`} className="mt-10 inline-flex items-center gap-2 text-[11px] font-semibold text-[#381907]">
                {isKo(locale) ? "변호사 프로필 보기" : "View attorney profile"} <ArrowRight className="h-3.5 w-3.5" />
              </a>
            </div>
          </div>
        </div>
      </section>

      <ConsultationCta locale={locale} />
    </main>
  </Frame>
);

export const PracticeAreasPage = ({ locale }: { locale: SiteLocale }) => (
  <Frame locale={locale}>
    <main>
      <section className="bg-[#211A16] pt-[60px] text-[#F3EEE5]">
        <div className="site-shell grid gap-5 py-5 lg:grid-cols-[0.82fr_1.18fr] lg:items-stretch lg:py-7">
          <div className="flex min-h-[520px] flex-col justify-between rounded-[5px] bg-[#2A211C] p-7 md:p-10 lg:p-12">
            <Label light>{isKo(locale) ? "업무 분야" : "Practice areas"}</Label>
            <div>
              <h1 style={serifStyle(locale)} className={`${isKo(locale) ? "text-[clamp(2.8rem,5vw,5.5rem)] font-medium leading-[1.12]" : "editorial-serif text-[clamp(3.8rem,6.8vw,7.4rem)] leading-[0.88] tracking-[-0.05em]"}`}>
                {isKo(locale) ? "사고 유형부터 시작합니다." : "Start with what happened."}
              </h1>
              <p className="mt-6 max-w-[510px] text-[13px] leading-7 text-white/58">
                {isKo(locale) ? "사고 유형을 고르면 해당 사건에서 먼저 확인해야 할 증거, 보험과 손해 요소를 볼 수 있습니다." : "Choose the accident type to see the evidence, coverage questions, and injury issues that usually matter first."}
              </p>
            </div>
            <div className="text-[10px] text-white/38">{practiceAreas.length} {isKo(locale) ? "개 업무 분야" : "practice areas"}</div>
          </div>
          <div className="relative min-h-[58svh] overflow-hidden rounded-[5px] lg:min-h-[650px]">
            <img src={heroCourthouse} alt="Courthouse" className="absolute inset-0 h-full w-full object-cover" fetchPriority="high" />
            <div className="absolute inset-0 bg-[#1E1C1A]/18" />
          </div>
        </div>
      </section>

      <section className="bg-[#F9F8F6] py-18 md:py-24">
        <div className="site-shell">
          <SectionTitle locale={locale} label={isKo(locale) ? "사고 유형" : "Choose a starting point"} title={isKo(locale) ? "한눈에 보고, 필요한 페이지로 바로 이동합니다." : "Simple cards. Clear paths. No wall of copy."} />
          <div className="mt-10 grid gap-4 md:grid-cols-2 xl:grid-cols-4">
            {practiceAreas.map((practice, index) => <PracticeCard key={practice.slug} practice={practice} index={index} locale={locale} />)}
          </div>
        </div>
      </section>

      <section className="bg-[#F3EEE5] py-18 md:py-24">
        <div className="site-shell grid gap-8 lg:grid-cols-[0.9fr_1.1fr] lg:items-center">
          <div className="relative min-h-[470px] overflow-hidden rounded-[5px]">
            <img src={heroJustice} alt="Law library and scales" loading="lazy" className="absolute inset-0 h-full w-full object-cover" />
          </div>
          <div className="lg:pl-8">
            <SectionTitle locale={locale} label={isKo(locale) ? "첫 단계" : "The first days"} title={isKo(locale) ? "처음부터 모든 것을 해결할 필요는 없습니다." : "You do not need to solve the whole claim on day one."} />
            <div className="mt-8 grid gap-3 sm:grid-cols-2">
              {[
                [isKo(locale) ? "치료" : "Care", isKo(locale) ? "건강과 치료를 먼저." : "Put health and treatment first."],
                [isKo(locale) ? "기록" : "Document", isKo(locale) ? "사라지기 쉬운 증거를 보존." : "Preserve details that may disappear."],
                [isKo(locale) ? "보험" : "Coverage", isKo(locale) ? "관련 보험을 확인." : "Identify the relevant insurance."],
                [isKo(locale) ? "평가" : "Assess", isKo(locale) ? "부상의 실제 영향을 정리." : "Understand the real impact of the injury."],
              ].map(([title, body]) => <SoftCard key={title} className="p-5"><div className="text-[12px] font-semibold">{title}</div><p className="mt-2 text-[10px] leading-5 text-[#1E1C1A]/46">{body}</p></SoftCard>)}
            </div>
          </div>
        </div>
      </section>

      <ConsultationCta locale={locale} />
    </main>
  </Frame>
);

const mattersForPractice = (practice: PracticeArea, locale: SiteLocale) => {
  const issues = isKo(locale) ? practice.koIssues : practice.issues;
  return issues.map((item, index) => ({ title: item, icon: [Camera, ShieldCheck, FileText, Scale][index % 4] }));
};

export const PracticeAreaDetailPage = ({ locale }: { locale: SiteLocale }) => {
  const params = useParams({ strict: false }) as { slug?: string };
  const practice = params.slug ? getPracticeArea(params.slug) : undefined;

  if (!practice) return null;

  const title = isKo(locale) ? practice.koTitle : practice.title;
  const intro = isKo(locale) ? practice.koIntro : practice.intro;
  const practiceIndex = practiceAreas.findIndex((item) => item.slug === practice.slug);
  const related = practiceAreas.filter((item) => item.slug !== practice.slug).slice(0, 3);

  return (
    <Frame locale={locale}>
      <main>
        <section className="bg-[#F3EEE5] pt-[60px]">
          <div className="site-shell grid gap-5 py-5 lg:grid-cols-[0.82fr_1.18fr] lg:py-7">
            <div className="flex min-h-[520px] flex-col justify-between rounded-[5px] bg-[#381907] p-7 text-[#F3EEE5] md:p-10 lg:p-12">
              <div className="flex items-center justify-between gap-4"><Label light>{isKo(locale) ? "업무 분야" : "Practice area"}</Label><span className="text-[9px] text-white/34">{String(practiceIndex + 1).padStart(2, "0")}</span></div>
              <div>
                <h1 style={serifStyle(locale)} className={`${isKo(locale) ? "text-[clamp(2.8rem,5vw,5.4rem)] font-medium leading-[1.12]" : "editorial-serif text-[clamp(3.8rem,6.6vw,7.2rem)] leading-[0.88] tracking-[-0.05em]"}`}>{title}</h1>
                <p className="mt-6 max-w-[530px] text-[13px] leading-7 text-white/62">{intro}</p>
              </div>
              <div><PrimaryButton locale={locale} /></div>
            </div>
            <div className="relative min-h-[58svh] overflow-hidden rounded-[5px] lg:min-h-[650px]">
              <img src={practiceImages[practiceIndex % practiceImages.length]} alt="" className="absolute inset-0 h-full w-full object-cover" fetchPriority="high" />
              <div className="absolute inset-0 bg-[#1E1C1A]/16" />
            </div>
          </div>
        </section>

        <section className="bg-[#F9F8F6] py-18 md:py-24">
          <div className="site-shell">
            <SectionTitle locale={locale} label={isKo(locale) ? "먼저 보는 것" : "What matters first"} title={isKo(locale) ? "복잡한 설명보다, 중요한 질문부터." : "Start with the questions that actually shape the claim."} />
            <div className="mt-10 grid gap-4 md:grid-cols-2 xl:grid-cols-4">
              {mattersForPractice(practice, locale).map(({ title: matter, icon: Icon }, index) => (
                <SoftCard key={matter} className="p-6">
                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[#F3EEE5] text-[#381907]"><Icon className="h-4 w-4 stroke-[1.3]" /></div>
                  <div className="mt-8 text-[9px] text-[#1E1C1A]/26">0{index + 1}</div>
                  <h3 style={serifStyle(locale)} className="mt-3 text-[1.35rem] leading-tight">{matter}</h3>
                </SoftCard>
              ))}
            </div>
          </div>
        </section>

        <section className="bg-[#F3EEE5] py-18 md:py-24">
          <div className="site-shell grid gap-5 lg:grid-cols-[1.15fr_0.85fr]">
            <div className="relative min-h-[530px] overflow-hidden rounded-[5px]">
              <img src={heroBoardroom} alt="Legal meeting" loading="lazy" className="absolute inset-0 h-full w-full object-cover" />
            </div>
            <div className="grid gap-5">
              <SoftCard className="flex flex-col justify-between p-7 md:p-9">
                <div>
                  <Label>{isKo(locale) ? "사건 구성" : "Build the story"}</Label>
                  <h2 style={serifStyle(locale)} className="mt-5 text-[clamp(2rem,3.7vw,3.8rem)] leading-[1.02] tracking-[-0.03em]">
                    {isKo(locale) ? "증거, 치료와 보험을 한 흐름으로." : "Evidence, treatment, and coverage in one clear view."}
                  </h2>
                </div>
                <p className="mt-8 text-[12px] leading-6 text-[#1E1C1A]/52">{isKo(locale) ? "좋은 사건 정리는 서류의 양이 아니라 사실을 얼마나 이해하기 쉽게 연결하는지에 달려 있습니다." : "A strong claim is not about producing the most paperwork. It is about connecting the important facts in a way that is easy to understand."}</p>
              </SoftCard>
              <div className="relative min-h-[220px] overflow-hidden rounded-[5px]">
                <img src={heroOffice} alt="Law office" loading="lazy" className="absolute inset-0 h-full w-full object-cover" />
              </div>
            </div>
          </div>
        </section>

        <section className="bg-[#F9F8F6] py-18 md:py-24">
          <div className="site-shell">
            <SectionTitle locale={locale} label={isKo(locale) ? "관련 업무" : "Related practice areas"} title={isKo(locale) ? "사고는 한 가지 범주에만 머물지 않을 수 있습니다." : "An accident does not always fit neatly into one category."} />
            <div className="mt-10 grid gap-4 md:grid-cols-3">
              {related.map((item, index) => <PracticeCard key={item.slug} practice={item} index={practiceIndex + index + 1} locale={locale} compact />)}
            </div>
            <p className="mt-8 max-w-[800px] text-[9px] leading-5 text-[#1E1C1A]/36">{isKo(locale) ? "이 페이지는 일반적인 정보이며 법률 자문이 아닙니다. 구체적인 사건은 사실관계와 적용 법률에 따라 달라집니다." : "This page provides general information and is not legal advice. Specific matters depend on their own facts and applicable law."}</p>
          </div>
        </section>

        <ConsultationCta locale={locale} />
      </main>
    </Frame>
  );
};

export const ResultsPage = ({ locale }: { locale: SiteLocale }) => (
  <Frame locale={locale}>
    <main>
      <section className="bg-[#211A16] pt-[60px] text-[#F3EEE5]">
        <div className="site-shell py-5 md:py-7">
          <div className="relative min-h-[68svh] overflow-hidden rounded-[5px]">
            <img src={heroCourthouse} alt="Courthouse" className="absolute inset-0 h-full w-full object-cover" fetchPriority="high" />
            <div className="absolute inset-0 bg-gradient-to-r from-[#1E1C1A]/86 via-[#1E1C1A]/46 to-[#1E1C1A]/16" />
            <div className="relative z-10 flex min-h-[68svh] items-end p-7 md:p-10 lg:p-12">
              <div className="max-w-[820px]">
                <Label light>{isKo(locale) ? "사건 결과" : "Results"}</Label>
                <h1 style={serifStyle(locale)} className={`${isKo(locale) ? "mt-5 text-[clamp(2.7rem,5vw,5.4rem)] font-medium leading-[1.13]" : "editorial-serif mt-5 text-[clamp(3.8rem,6.8vw,7.6rem)] leading-[0.88] tracking-[-0.05em]"}`}>
                  {isKo(locale) ? "결과는 숫자보다 맥락이 중요합니다." : "Results should feel like stories, not scoreboards."}
                </h1>
                <p className="mt-6 max-w-[620px] text-[13px] leading-7 text-white/58">{isKo(locale) ? "검증된 합의와 평결만 사건의 배경과 함께 보여줍니다." : "Only verified settlements and verdicts should appear here, with enough context to understand what the outcome actually means."}</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-[#F9F8F6] py-18 md:py-24">
        <div className="site-shell">
          <SectionTitle locale={locale} label={isKo(locale) ? "대표 사건" : "Representative matters"} title={isKo(locale) ? "실제 결과가 준비되면 이 카드에 들어갑니다." : "A clean home for verified case outcomes."} body={isKo(locale) ? "현재는 디자인 구조만 보여주며 실제 성과로 표시하지 않습니다." : "For now, these are clearly marked placeholders so the design can be reviewed without inventing firm results."} />
          <div className="mt-10 grid gap-4 lg:grid-cols-[1.2fr_0.8fr]">
            <SoftCard className="overflow-hidden">
              <div className="relative min-h-[420px]">
                <img src={heroJustice} alt="Law library" loading="lazy" className="absolute inset-0 h-full w-full object-cover" />
                <div className="absolute inset-0 bg-gradient-to-t from-[#1E1C1A]/72 via-[#1E1C1A]/16 to-transparent" />
                <div className="absolute bottom-0 left-0 right-0 p-7 text-white md:p-9">
                  <span className="rounded-full bg-[#F3EEE5]/92 px-3 py-1 text-[8px] font-semibold uppercase tracking-[0.12em] text-[#381907]">{isKo(locale) ? "자리 표시" : "Placeholder"}</span>
                  <h3 style={serifStyle(locale)} className="mt-5 max-w-[620px] text-[clamp(2rem,3.5vw,3.8rem)] leading-[1.02]">{isKo(locale) ? "검증된 대표 사건" : "Verified featured matter"}</h3>
                </div>
              </div>
            </SoftCard>
            <div className="grid gap-4">
              {[heroBoardroom, heroOffice].map((image, index) => (
                <SoftCard key={index} className="overflow-hidden">
                  <div className="grid min-h-[205px] grid-cols-[0.82fr_1.18fr]">
                    <img src={image} alt="" loading="lazy" className="h-full w-full object-cover" />
                    <div className="flex flex-col justify-between p-5">
                      <Label>{isKo(locale) ? "사건" : "Matter"} 0{index + 2}</Label>
                      <div>
                        <h3 style={serifStyle(locale)} className="text-[1.45rem] leading-tight">{isKo(locale) ? ["자동차 사고", "중대 상해"][index] : ["Motor vehicle claim", "Serious injury claim"][index]}</h3>
                        <p className="mt-2 text-[10px] leading-5 text-[#1E1C1A]/44">{isKo(locale) ? "실제 데이터 승인 후 게시" : "Publishes only after the underlying result is approved."}</p>
                      </div>
                    </div>
                  </div>
                </SoftCard>
              ))}
            </div>
          </div>
          <SoftCard className="mt-4 p-5">
            <p className="text-[9px] leading-5 text-[#1E1C1A]/40">{isKo(locale) ? "과거 결과는 향후 사건의 결과를 보장하거나 예측하지 않습니다. 각 사건은 사실관계와 법률상 쟁점이 다릅니다." : "Prior results do not guarantee or predict a similar outcome in any future matter. Every case depends on its own facts and legal issues."}</p>
          </SoftCard>
        </div>
      </section>

      <section className="bg-[#F3EEE5] py-18 md:py-24">
        <div className="site-shell">
          <SectionTitle locale={locale} label={isKo(locale) ? "업무 분야" : "The work behind the result"} title={isKo(locale) ? "결과는 결국 어떤 일을 했는지로 연결됩니다." : "Every result should connect back to the work that produced it."} />
          <div className="mt-10 grid gap-4 md:grid-cols-2 xl:grid-cols-4">
            {practiceAreas.slice(0, 4).map((practice, index) => <PracticeCard key={practice.slug} practice={practice} index={index} locale={locale} compact />)}
          </div>
        </div>
      </section>

      <ConsultationCta locale={locale} />
    </main>
  </Frame>
);
