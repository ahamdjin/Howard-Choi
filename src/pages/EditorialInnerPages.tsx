import { motion } from "framer-motion";
import {
  ArrowRight,
  Award,
  Clock3,
  FileText,
  MapPin,
  Phone,
  Quote,
  Scale,
  ShieldCheck,
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

const ko = (locale: SiteLocale) => locale === "ko";
const prefix = (locale: SiteLocale) => (ko(locale) ? "/ko" : "");
const serif = (locale: SiteLocale) =>
  ko(locale) ? { fontFamily: '"Noto Serif KR", serif' } : undefined;

const Frame = ({ locale, children }: { locale: SiteLocale; children: React.ReactNode }) => (
  <div
    className="min-h-screen overflow-x-clip bg-[#F9F8F6] text-[#1E1C1A]"
    style={ko(locale) ? { fontFamily: '"Noto Sans KR", sans-serif' } : undefined}
  >
    {ko(locale) ? <KoreanNavigation /> : <Navigation />}
    {children}
    {ko(locale) ? <KoreanFooter /> : <Footer />}
  </div>
);

const Eyebrow = ({ children, light = false }: { children: React.ReactNode; light?: boolean }) => (
  <div
    className={`text-[9px] font-semibold uppercase tracking-[0.18em] ${
      light ? "text-[#F3EEE5]/52" : "text-[#1E1C1A]/38"
    }`}
  >
    {children}
  </div>
);

const SectionHeading = ({
  locale,
  eyebrow,
  title,
  body,
}: {
  locale: SiteLocale;
  eyebrow: string;
  title: string;
  body?: string;
}) => (
  <div className="grid gap-7 border-t border-[#1E1C1A]/12 pt-5 lg:grid-cols-[0.31fr_1.69fr] lg:gap-12 xl:gap-16">
    <Eyebrow>{eyebrow}</Eyebrow>
    <div>
      <h2
        style={serif(locale)}
        className={`max-w-[930px] ${
          ko(locale)
            ? "text-[clamp(1.7rem,2.8vw,3rem)] font-medium leading-[1.35] tracking-[-0.04em]"
            : "editorial-serif text-[clamp(2rem,3.25vw,3.55rem)] leading-[1.01] tracking-[-0.032em]"
        }`}
      >
        {title}
      </h2>
      {body && <p className="mt-5 max-w-[720px] text-[13px] leading-7 text-[#1E1C1A]/56">{body}</p>}
    </div>
  </div>
);

const ConsultationCta = ({ locale }: { locale: SiteLocale }) => (
  <section className="bg-[#1E1C1A] text-[#F3EEE5]">
    <div className="site-shell grid min-h-[72svh] items-center gap-12 py-16 lg:grid-cols-[0.95fr_1.05fr] lg:py-20">
      <div>
        <Eyebrow light>{ko(locale) ? "상담" : "Start the conversation"}</Eyebrow>
        <h2
          style={serif(locale)}
          className={`mt-6 max-w-[650px] ${
            ko(locale)
              ? "text-[clamp(2rem,4vw,4rem)] font-medium leading-[1.3] tracking-[-0.04em]"
              : "editorial-serif text-[clamp(2.5rem,5vw,5.7rem)] leading-[0.92] tracking-[-0.04em]"
          }`}
        >
          {ko(locale) ? "사고 이후의 다음 단계를 명확하게 정리하세요." : "Clarity starts with one conversation."}
        </h2>
        <p className="mt-7 max-w-[520px] text-[13px] leading-7 text-[#F3EEE5]/56">
          {ko(locale)
            ? "사고 경위와 현재 상황을 알려주시면 상담 가능 여부와 다음 단계를 확인할 수 있습니다."
            : "Share what happened, where things stand, and what you are worried about. The firm can determine whether the matter is a fit and what should happen next."}
        </p>
      </div>
      <div className="border-t border-white/14 pt-7 lg:border-l lg:border-t-0 lg:pl-12 lg:pt-0">
        <a
          href={`${prefix(locale)}/contact`}
          className="group flex items-center justify-between border-b border-white/14 py-6"
        >
          <span className="text-[14px] font-medium">{ko(locale) ? "상담 예약" : "Schedule a consultation"}</span>
          <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
        </a>
        <a href={brand.phoneHref} className="group flex items-center justify-between border-b border-white/14 py-6">
          <span className="text-[14px] font-medium">{brand.phoneDisplay}</span>
          <Phone className="h-4 w-4" />
        </a>
        <div className="pt-7 text-[10px] leading-5 text-white/38">
          {brand.address}
          <br />
          {ko(locale) ? "웹사이트 정보는 법률 자문이 아닙니다." : "Website information is general and is not legal advice."}
        </div>
      </div>
    </div>
  </section>
);

const PracticeLinks = ({ locale, limit = 8 }: { locale: SiteLocale; limit?: number }) => (
  <div className="grid border-t border-[#1E1C1A]/12 sm:grid-cols-2 xl:grid-cols-4">
    {practiceAreas.slice(0, limit).map((practice, index) => (
      <a
        key={practice.slug}
        href={`${prefix(locale)}/practice-areas/${practice.slug}`}
        className="group min-h-[190px] border-b border-[#1E1C1A]/12 py-6 sm:px-6 sm:first:pl-0 xl:border-l xl:first:border-l-0"
      >
        <div className="flex items-center justify-between text-[9px] tabular-nums text-[#1E1C1A]/28">
          <span>{String(index + 1).padStart(2, "0")}</span>
          <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-1" />
        </div>
        <h3 style={serif(locale)} className="mt-12 text-[1.35rem] leading-tight">
          {ko(locale) ? practice.koTitle : practice.title}
        </h3>
        <p className="mt-3 max-w-[270px] text-[10px] leading-5 text-[#1E1C1A]/45">
          {ko(locale) ? practice.koDescription : practice.description}
        </p>
      </a>
    ))}
  </div>
);

const AttorneyPortrait = ({ className = "" }: { className?: string }) => (
  <div className={`relative overflow-hidden bg-[#D9D3CB] ${className}`}>
    <img src={leadCounsel} alt="Howard Choi" className="h-full w-full object-cover object-center" loading="eager" decoding="async" />
    <div className="absolute inset-0 bg-gradient-to-t from-[#1E1C1A]/40 via-transparent to-transparent" />
  </div>
);

const ProfileLinks = ({ locale }: { locale: SiteLocale }) => (
  <div className="mt-8 border-t border-white/14 pt-5">
    <div className="mb-3 text-[8px] font-semibold uppercase tracking-[0.16em] text-white/35">
      {ko(locale) ? "전문 프로필" : "Professional profiles"}
    </div>
    <div className="flex flex-wrap gap-x-5 gap-y-2 text-[11px] text-white/62">
      <span>LinkedIn</span>
      <span>Avvo</span>
      <span>Justia</span>
      <span className="text-white/28">{ko(locale) ? "링크 확인 후 연결" : "links connect once verified"}</span>
    </div>
  </div>
);

export const AttorneyPage = ({ locale }: { locale: SiteLocale }) => (
  <Frame locale={locale}>
    <main>
      <section className="bg-[#211A16] pt-[60px] text-[#F3EEE5]">
        <div className="grid min-h-[calc(100svh-60px)] lg:grid-cols-[1.1fr_0.9fr]">
          <AttorneyPortrait className="min-h-[55svh] lg:min-h-[calc(100svh-60px)]" />
          <div className="flex min-h-[520px] flex-col justify-between px-6 py-10 sm:px-10 lg:px-12 lg:py-12 xl:px-16">
            <div className="flex items-center justify-between border-t border-white/16 pt-4">
              <Eyebrow light>{ko(locale) ? "변호사" : "Attorney"}</Eyebrow>
              <span className="text-[9px] uppercase tracking-[0.14em] text-white/34">Buena Park · California</span>
            </div>
            <motion.div initial={{ opacity: 0, y: 22 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}>
              <h1
                style={serif(locale)}
                className={`max-w-[680px] ${
                  ko(locale)
                    ? "text-[clamp(2.8rem,5vw,5.7rem)] font-medium leading-[1.12] tracking-[-0.05em]"
                    : "editorial-serif text-[clamp(4rem,7.2vw,8.6rem)] leading-[0.82] tracking-[-0.055em]"
                }`}
              >
                Howard<br />Choi
              </h1>
              <p className="mt-7 max-w-[500px] text-[13px] leading-7 text-white/58">
                {ko(locale)
                  ? "사고·상해 사건에서 의뢰인이 상황을 이해하고 다음 단계를 명확히 볼 수 있도록 돕는 데 초점을 둡니다."
                  : "Focused on accident and injury matters, with an emphasis on direct communication, careful case development, and a clear path forward."}
              </p>
              <div className="mt-8 flex flex-wrap gap-3">
                <a href={`${prefix(locale)}/contact`} className="rounded-full bg-[#F3EEE5] px-6 py-3 text-[11px] font-semibold text-[#1E1C1A]">
                  {ko(locale) ? "상담 예약" : "Schedule a consultation"}
                </a>
                <a href={brand.phoneHref} className="rounded-full border border-white/20 px-6 py-3 text-[11px] text-white/74">
                  {brand.phoneDisplay}
                </a>
              </div>
              <ProfileLinks locale={locale} />
            </motion.div>
            <div className="grid gap-2 border-t border-white/14 pt-4 text-[9px] uppercase tracking-[0.13em] text-white/34 sm:grid-cols-2">
              <span>{brand.address}</span>
              <span className="sm:text-right">{ko(locale) ? "개인상해 · 사고" : "Personal injury · Accidents"}</span>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-[#F3EEE5]">
        <div className="site-shell py-16 md:py-20">
          <SectionHeading
            locale={locale}
            eyebrow={ko(locale) ? "추천 · 수상" : "Testimonials · Recognition"}
            title={ko(locale) ? "프로필의 첫 인상 다음에는 신뢰를 보여줍니다." : "The profile should earn trust before it asks for attention."}
            body={ko(locale) ? "실제 고객 후기와 검증된 수상·협회 정보가 전달되면 이 영역에 바로 적용할 수 있습니다." : "The structure is ready for verified client testimonials, awards, professional memberships, and third-party recognition as soon as the firm supplies them."}
          />
          <div className="mt-12 grid gap-0 border-y border-[#1E1C1A]/12 lg:grid-cols-[1.18fr_0.82fr]">
            <div className="py-8 lg:border-r lg:border-[#1E1C1A]/12 lg:pr-10">
              <Quote className="h-5 w-5 stroke-[1.2] text-[#381907]" />
              <p style={serif(locale)} className="mt-8 max-w-[720px] text-[clamp(1.65rem,2.8vw,3rem)] leading-[1.15] tracking-[-0.025em]">
                {ko(locale) ? "검증된 고객 후기 한 문장이 이곳에서 크게 보이도록 설계되었습니다." : "A verified client quote belongs here — large enough to feel human, restrained enough to feel credible."}
              </p>
              <div className="mt-8 text-[9px] uppercase tracking-[0.14em] text-[#1E1C1A]/38">
                {ko(locale) ? "실제 후기 승인 후 교체" : "Placeholder · replace with approved testimonial"}
              </div>
            </div>
            <div className="grid sm:grid-cols-2 lg:grid-cols-1">
              {[Award, Scale].map((Icon, index) => (
                <div key={index} className="border-t border-[#1E1C1A]/12 py-7 sm:first:border-t-0 sm:first:pr-6 sm:last:border-l sm:last:pl-6 lg:first:border-t-0 lg:last:border-l-0 lg:last:border-t lg:last:pl-0">
                  <Icon className="h-4 w-4 stroke-[1.3] text-[#381907]" />
                  <div className="mt-10 text-[12px] font-semibold">{index === 0 ? (ko(locale) ? "수상·인정" : "Awards & recognition") : (ko(locale) ? "자격·협회" : "Credentials & memberships")}</div>
                  <p className="mt-2 text-[10px] leading-5 text-[#1E1C1A]/46">{ko(locale) ? "검증된 정보가 제공되면 게시합니다." : "Reserved for verified information supplied by the firm."}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="bg-[#F9F8F6]">
        <div className="site-shell py-20 md:py-28">
          <SectionHeading
            locale={locale}
            eyebrow={ko(locale) ? "소개" : "About Howard"}
            title={ko(locale) ? "사건을 맡는 사람과 일하는 방식을 분명하게." : "Know who is handling the work — and how the work gets handled."}
          />
          <div className="mt-14 grid gap-12 lg:grid-cols-[0.7fr_1.3fr] lg:gap-16">
            <aside className="lg:sticky lg:top-24 lg:self-start">
              <div className="border-t border-[#1E1C1A]/12">
                {[
                  [ko(locale) ? "업무 초점" : "Focus", ko(locale) ? "사고 및 개인상해" : "Accident & injury claims"],
                  [ko(locale) ? "사무실" : "Office", brand.address],
                  [ko(locale) ? "상담" : "Consultations", brand.phoneDisplay],
                ].map(([label, value]) => (
                  <div key={label} className="border-b border-[#1E1C1A]/12 py-5">
                    <div className="text-[8px] font-semibold uppercase tracking-[0.15em] text-[#1E1C1A]/34">{label}</div>
                    <div className="mt-2 text-[12px] leading-5">{value}</div>
                  </div>
                ))}
              </div>
            </aside>
            <div>
              <p style={serif(locale)} className="max-w-[820px] text-[clamp(1.7rem,3vw,3.25rem)] leading-[1.12] tracking-[-0.026em]">
                {ko(locale)
                  ? "상해 사건은 사고 사실만이 아니라 치료, 보험, 업무, 가족과 일상생활의 변화까지 함께 봐야 합니다."
                  : "An injury case is rarely only about the collision. Medical care, insurance, work, family, and the way daily life changes all become part of the story."}
              </p>
              <div className="mt-10 grid gap-8 text-[13px] leading-7 text-[#1E1C1A]/58 md:grid-cols-2">
                <p>{ko(locale) ? "이 페이지는 단순한 이력서 대신 Howard Choi가 어떤 사건을 맡고, 의뢰인과 어떻게 소통하며, 사건을 어떤 방식으로 준비하는지 보여주도록 설계되었습니다." : "This profile is designed to do more than list credentials. It explains the kind of work Howard handles, how communication is approached, and how a matter is developed from the first conversation forward."}</p>
                <p>{ko(locale) ? "학력, 변호사 등록, 실제 수상, 협회 활동과 대표 사건은 확인된 자료가 제공되는 대로 같은 구조 안에서 추가할 수 있습니다." : "Education, bar admissions, verified recognition, memberships, representative matters, and media can slot into this structure once the underlying information is confirmed."}</p>
              </div>
              <div className="mt-12 grid border-t border-[#1E1C1A]/12 sm:grid-cols-3">
                {[
                  ["01", ko(locale) ? "듣기" : "Listen", ko(locale) ? "사실과 우려를 먼저 정리합니다." : "Start with the facts and what is worrying the client now."],
                  ["02", ko(locale) ? "정리" : "Build", ko(locale) ? "증거, 치료, 보험을 하나의 흐름으로 봅니다." : "Connect evidence, treatment, coverage, and the human impact."],
                  ["03", ko(locale) ? "진행" : "Move", ko(locale) ? "각 단계에서 다음 행동을 명확하게 합니다." : "Keep the next decision and next action understandable."],
                ].map(([n, title, body]) => (
                  <div key={n} className="border-b border-[#1E1C1A]/12 py-6 sm:border-l sm:px-6 sm:first:border-l-0 sm:first:pl-0">
                    <div className="text-[9px] text-[#1E1C1A]/25">{n}</div>
                    <div className="mt-8 text-[12px] font-semibold">{title}</div>
                    <p className="mt-2 text-[10px] leading-5 text-[#1E1C1A]/46">{body}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-[#F3EEE5]">
        <div className="site-shell py-20 md:py-24">
          <SectionHeading
            locale={locale}
            eyebrow={ko(locale) ? "업무 분야" : "Practice focus"}
            title={ko(locale) ? "프로필에서 실제 업무로 바로 이어집니다." : "The profile should lead directly into the work."}
          />
          <div className="mt-12"><PracticeLinks locale={locale} /></div>
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
        <div className="site-shell grid min-h-[calc(100svh-60px)] items-stretch py-6 lg:grid-cols-[0.82fr_1.18fr] lg:py-8">
          <div className="flex flex-col justify-between border-t border-[#1E1C1A]/14 py-7 pr-0 lg:pr-12">
            <Eyebrow>{ko(locale) ? "로펌 소개" : "About the firm"}</Eyebrow>
            <div className="py-12">
              <h1 style={serif(locale)} className={`${ko(locale) ? "text-[clamp(2.8rem,6vw,6rem)] font-medium leading-[1.12] tracking-[-0.05em]" : "editorial-serif text-[clamp(4rem,8vw,8.5rem)] leading-[0.84] tracking-[-0.06em]"}`}>
                {ko(locale) ? <>사람을 먼저<br />보는 상해 로펌.</> : <>A smaller firm<br />by design.</>}
              </h1>
              <p className="mt-8 max-w-[520px] text-[13px] leading-7 text-[#1E1C1A]/56">
                {ko(locale) ? "사고 이후 복잡해진 상황을 더 복잡하게 만들지 않는 것. 필요한 사실, 사람, 다음 단계에 집중합니다." : "Injury cases can become complicated fast. The firm is designed to make the people, the facts, and the next step easier to understand — not harder."}
              </p>
            </div>
            <div className="grid gap-2 border-t border-[#1E1C1A]/12 pt-4 text-[9px] uppercase tracking-[0.13em] text-[#1E1C1A]/34 sm:grid-cols-2">
              <span>Buena Park, California</span><span className="sm:text-right">{brand.phoneDisplay}</span>
            </div>
          </div>
          <div className="relative min-h-[48svh] overflow-hidden bg-[#D8D1C8] lg:min-h-0">
            <img src={heroOffice} alt="Law office interior" className="absolute inset-0 h-full w-full object-cover" fetchPriority="high" />
            <div className="absolute inset-0 bg-[#1E1C1A]/14" />
            <div className="hero-bottom-readability" />
            <div className="absolute bottom-6 left-6 right-6 border-t border-white/30 pt-4 text-[9px] uppercase tracking-[0.14em] text-white/72">{brand.address}</div>
          </div>
        </div>
      </section>

      <section className="bg-[#F9F8F6]">
        <div className="site-shell py-20 md:py-28">
          <SectionHeading locale={locale} eyebrow={ko(locale) ? "이야기" : "The story"} title={ko(locale) ? "사고 이후 사람에게 필요한 것은 더 많은 소음이 아니라 방향입니다." : "After an accident, people do not need more noise. They need direction."} />
          <div className="mt-14 grid gap-10 lg:grid-cols-[0.72fr_1.28fr] lg:gap-16">
            <div className="relative min-h-[420px] overflow-hidden">
              <img src={heroBoardroom} alt="A focused legal meeting space" className="absolute inset-0 h-full w-full object-cover" loading="lazy" />
              <div className="absolute inset-0 bg-[#1E1C1A]/18" />
            </div>
            <div className="flex flex-col justify-between">
              <div className="grid gap-8 text-[13px] leading-7 text-[#1E1C1A]/58 md:grid-cols-2">
                <p>{ko(locale) ? "큰 사고 뒤에는 치료 일정, 보험 연락, 차량 문제, 업무 공백과 가족의 걱정이 동시에 생길 수 있습니다. 로펌의 역할은 그 모든 요소를 하나의 명확한 사건 이야기로 정리하는 것입니다." : "After a serious accident, medical appointments, insurance calls, vehicle problems, missed work, and family concerns can all arrive at once. The legal work should turn that noise into one coherent case story."}</p>
                <p>{ko(locale) ? "Buena Park Injury Lawyer는 지역 중심의 상해 법률 정보를 한 곳에 연결하고, 의뢰인이 담당 변호사와 다음 단계를 쉽게 이해할 수 있도록 구성되어 있습니다." : "Buena Park Injury Lawyer is built around a local focus: connect the client to the attorney, the relevant injury practice, the nearby community, and the next useful action without unnecessary layers."}</p>
              </div>
              <div className="mt-12 grid border-t border-[#1E1C1A]/12 sm:grid-cols-2">
                {[
                  ["01", ko(locale) ? "직접성" : "Direct access", ko(locale) ? "누가 사건을 맡는지 분명하게." : "Make it obvious who is responsible for the work."],
                  ["02", ko(locale) ? "명확성" : "Clarity", ko(locale) ? "다음 단계와 이유를 이해하기 쉽게." : "Explain the next step and why it matters."],
                  ["03", ko(locale) ? "증거" : "Proof", ko(locale) ? "검증된 결과와 자격만 사용." : "Publish results and credentials only when verified."],
                  ["04", ko(locale) ? "지역성" : "Local context", ko(locale) ? "Buena Park와 인근 지역을 실제 업무와 연결." : "Connect Buena Park and nearby communities to the work."],
                ].map(([n, title, body]) => (
                  <div key={n} className="border-b border-[#1E1C1A]/12 py-6 sm:border-l sm:px-6 sm:first:border-l-0 sm:first:pl-0">
                    <div className="text-[9px] text-[#1E1C1A]/25">{n}</div>
                    <div className="mt-8 text-[12px] font-semibold">{title}</div>
                    <p className="mt-2 text-[10px] leading-5 text-[#1E1C1A]/46">{body}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-[#381907] text-[#F3EEE5]">
        <div className="site-shell py-20 md:py-28">
          <div className="grid gap-12 lg:grid-cols-[0.62fr_1.38fr] lg:items-end">
            <div>
              <Eyebrow light>{ko(locale) ? "지역 중심" : "Local by design"}</Eyebrow>
              <div className="mt-8 flex items-start gap-3 text-[12px] leading-6 text-white/58"><MapPin className="mt-1 h-4 w-4 shrink-0" /><span>{brand.address}</span></div>
            </div>
            <p style={serif(locale)} className={`${ko(locale) ? "text-[clamp(2rem,4vw,4.2rem)] font-medium leading-[1.25]" : "editorial-serif text-[clamp(2.8rem,5vw,5.8rem)] leading-[0.96] tracking-[-0.04em]"}`}>
              {ko(locale) ? "지역을 아는 것보다 중요한 것은, 의뢰인이 이 로펌에서 길을 잃지 않는 것입니다." : "Local is not a slogan. It is making sure a client never feels lost inside the firm."}
            </p>
          </div>
        </div>
      </section>

      <section className="bg-[#F3EEE5]">
        <div className="site-shell py-20 md:py-28">
          <SectionHeading locale={locale} eyebrow={ko(locale) ? "사람" : "The attorney"} title={ko(locale) ? "로펌의 이야기는 결국 사건을 맡는 사람으로 이어집니다." : "The firm story should end where the relationship begins: with the attorney."} />
          <div className="mt-14 grid overflow-hidden border border-[#1E1C1A]/12 lg:grid-cols-[0.8fr_1.2fr]">
            <AttorneyPortrait className="min-h-[480px]" />
            <div className="flex flex-col justify-between p-8 md:p-12">
              <div>
                <Eyebrow>Howard Choi · {ko(locale) ? "변호사" : "Attorney"}</Eyebrow>
                <h3 style={serif(locale)} className="mt-6 text-[clamp(2.3rem,4vw,4.8rem)] leading-[0.95] tracking-[-0.035em]">{ko(locale) ? "직접적인 소통. 명확한 책임." : "Direct communication. Clear responsibility."}</h3>
                <p className="mt-6 max-w-[620px] text-[12px] leading-6 text-[#1E1C1A]/54">{ko(locale) ? "변호사 프로필에서 업무 분야, 접근 방식, 대표 사건과 검증된 자격 정보를 한 흐름으로 확인할 수 있습니다." : "The attorney profile brings practice focus, approach, representative matters, and verified credentials into one coherent view."}</p>
              </div>
              <a href={`${prefix(locale)}/attorney`} className="mt-10 inline-flex w-fit items-center gap-2 border-b border-[#1E1C1A]/25 pb-1 text-[11px] font-semibold">{ko(locale) ? "Howard Choi 보기" : "Meet Howard Choi"}<ArrowRight className="h-3.5 w-3.5" /></a>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-[#F9F8F6]">
        <div className="site-shell py-20 md:py-24">
          <SectionHeading locale={locale} eyebrow={ko(locale) ? "업무" : "The work"} title={ko(locale) ? "소개 페이지에서 실제 도움을 받을 수 있는 영역으로." : "From the firm story, move directly into the work."} />
          <div className="mt-12"><PracticeLinks locale={locale} /></div>
        </div>
      </section>

      <ConsultationCta locale={locale} />
    </main>
  </Frame>
);

const practiceImages = [heroCourthouse, heroBoardroom, heroOffice, heroJustice];

export const PracticeAreasPage = ({ locale }: { locale: SiteLocale }) => (
  <Frame locale={locale}>
    <main>
      <section className="relative min-h-[78svh] overflow-hidden bg-[#1E1C1A] pt-[60px] text-[#F3EEE5]">
        <img src={heroJustice} alt="" className="absolute inset-0 h-full w-full object-cover opacity-55" fetchPriority="high" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#1E1C1A]/95 via-[#1E1C1A]/46 to-[#1E1C1A]/24" />
        <div className="hero-bottom-readability" />
        <div className="site-shell relative z-10 flex min-h-[calc(78svh-60px)] items-end py-10 md:py-14">
          <div className="grid w-full gap-8 border-t border-white/16 pt-5 lg:grid-cols-[0.3fr_1.7fr]">
            <Eyebrow light>{ko(locale) ? "업무 분야" : "Practice areas"}</Eyebrow>
            <div>
              <h1 style={serif(locale)} className={`${ko(locale) ? "text-[clamp(2.5rem,5.5vw,5.8rem)] font-medium leading-[1.18] tracking-[-0.05em]" : "editorial-serif text-[clamp(3.8rem,7vw,8.2rem)] leading-[0.86] tracking-[-0.055em]"}`}>{ko(locale) ? "사고 유형에서 시작하고, 사람의 영향까지 봅니다." : "Start with what happened. Build around what changed."}</h1>
              <p className="mt-7 max-w-[720px] text-[13px] leading-7 text-white/58">{ko(locale) ? "각 업무 페이지는 사고 유형, 증거, 보험, 치료와 일상생활에 미친 영향을 함께 설명하도록 구성되어 있습니다." : "Each practice page is structured around the accident itself, the evidence, insurance, treatment, and the real-life consequences that can shape an injury claim."}</p>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-[#F9F8F6]">
        <div className="site-shell py-20 md:py-28">
          <SectionHeading locale={locale} eyebrow={ko(locale) ? "사고 유형" : "What we handle"} title={ko(locale) ? "필요한 페이지를 빨리 찾되, 각 사건의 차이는 잃지 않습니다." : "Find the right starting point without flattening every case into the same template."} />
          <div className="mt-14 grid gap-px bg-[#1E1C1A]/12 md:grid-cols-2">
            {practiceAreas.map((practice, index) => (
              <a key={practice.slug} href={`${prefix(locale)}/practice-areas/${practice.slug}`} className={`group bg-[#F9F8F6] ${index === 0 ? "md:col-span-2" : ""}`}>
                <div className={`${index === 0 ? "grid lg:grid-cols-[1.08fr_0.92fr]" : ""}`}>
                  <div className={`relative overflow-hidden ${index === 0 ? "min-h-[420px]" : "h-[260px]"}`}>
                    <img src={practiceImages[index % practiceImages.length]} alt="" className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 group-hover:scale-[1.025]" loading="lazy" />
                    <div className="absolute inset-0 bg-[#1E1C1A]/20" />
                    <div className="absolute left-5 top-5 text-[9px] uppercase tracking-[0.16em] text-white/70">{String(index + 1).padStart(2, "0")}</div>
                  </div>
                  <div className={`flex flex-col justify-between p-7 md:p-9 ${index === 0 ? "min-h-[360px]" : "min-h-[260px]"}`}>
                    <div>
                      <h2 style={serif(locale)} className={`${index === 0 ? "text-[clamp(2.3rem,4vw,4.7rem)]" : "text-[clamp(1.7rem,2.5vw,2.6rem)]"} leading-[1.02] tracking-[-0.03em]`}>{ko(locale) ? practice.koTitle : practice.title}</h2>
                      <p className="mt-5 max-w-[580px] text-[11px] leading-6 text-[#1E1C1A]/50">{ko(locale) ? practice.koDescription : practice.description}</p>
                    </div>
                    <div className="mt-8 flex items-center justify-between border-t border-[#1E1C1A]/12 pt-4 text-[9px] uppercase tracking-[0.13em] text-[#1E1C1A]/38"><span>{ko(locale) ? "자세히 보기" : "Explore practice"}</span><ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-1" /></div>
                  </div>
                </div>
              </a>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-[#F3EEE5]">
        <div className="site-shell py-20 md:py-28">
          <SectionHeading locale={locale} eyebrow={ko(locale) ? "초기 단계" : "The first days"} title={ko(locale) ? "사건의 방향은 초기 기록과 결정에서 시작됩니다." : "Good case development often starts before the claim feels like a legal case."} />
          <div className="mt-14 grid border-y border-[#1E1C1A]/12 md:grid-cols-4">
            {[
              [Clock3, ko(locale) ? "치료" : "Care", ko(locale) ? "필요한 치료를 받고 의료 기록을 남깁니다." : "Get appropriate care and keep the medical story documented."],
              [FileText, ko(locale) ? "기록" : "Document", ko(locale) ? "사진, 영상, 목격자와 관련 기록을 보존합니다." : "Preserve photos, video, witnesses, reports, and other evidence."],
              [ShieldCheck, ko(locale) ? "보험" : "Coverage", ko(locale) ? "어떤 보험이 적용되는지 확인합니다." : "Identify the policies and coverage that may matter."],
              [Scale, ko(locale) ? "평가" : "Assess", ko(locale) ? "사고의 영향과 장기적인 필요를 함께 봅니다." : "Understand the full impact before treating the claim as finished."],
            ].map(([Icon, title, body], index) => {
              const I = Icon as typeof Clock3;
              return <div key={String(title)} className="border-b border-[#1E1C1A]/12 py-7 md:border-l md:px-6 md:first:border-l-0 md:first:pl-0"><div className="flex items-center justify-between"><I className="h-4 w-4 stroke-[1.3] text-[#381907]" /><span className="text-[9px] text-[#1E1C1A]/25">0{index + 1}</span></div><div className="mt-12 text-[12px] font-semibold">{String(title)}</div><p className="mt-2 text-[10px] leading-5 text-[#1E1C1A]/46">{String(body)}</p></div>;
            })}
          </div>
        </div>
      </section>

      <ConsultationCta locale={locale} />
    </main>
  </Frame>
);

const PracticeDetailHero = ({ locale, practice, image }: { locale: SiteLocale; practice: PracticeArea; image: string }) => (
  <section className="relative min-h-[82svh] overflow-hidden bg-[#1E1C1A] pt-[60px] text-[#F3EEE5]">
    <img src={image} alt="" className="absolute inset-0 h-full w-full object-cover opacity-52" fetchPriority="high" />
    <div className="absolute inset-0 bg-gradient-to-t from-[#1E1C1A]/96 via-[#1E1C1A]/52 to-[#1E1C1A]/24" />
    <div className="hero-bottom-readability" />
    <div className="site-shell relative z-10 flex min-h-[calc(82svh-60px)] items-end py-10 md:py-14">
      <div className="grid w-full gap-8 border-t border-white/16 pt-5 lg:grid-cols-[0.3fr_1.7fr]">
        <div><Eyebrow light>{ko(locale) ? "업무 분야" : "Practice area"}</Eyebrow><div className="mt-5 text-[9px] leading-5 text-white/34">Buena Park<br />{brand.phoneDisplay}</div></div>
        <div>
          <h1 style={serif(locale)} className={`${ko(locale) ? "text-[clamp(2.8rem,5.5vw,6rem)] font-medium leading-[1.16] tracking-[-0.05em]" : "editorial-serif text-[clamp(4rem,7vw,8.4rem)] leading-[0.86] tracking-[-0.055em]"}`}>{ko(locale) ? practice.koTitle : practice.title}</h1>
          <p className="mt-7 max-w-[760px] text-[13px] leading-7 text-white/60">{ko(locale) ? practice.koDescription : practice.description}</p>
        </div>
      </div>
    </div>
  </section>
);

export const PracticeAreaDetailPage = ({ locale }: { locale: SiteLocale }) => {
  const params = useParams({ strict: false }) as { slug?: string };
  const practice = getPracticeArea(params.slug || "");
  if (!practice) return null;
  const index = practiceAreas.findIndex((item) => item.slug === practice.slug);
  const title = ko(locale) ? practice.koTitle : practice.title;
  const intro = ko(locale) ? practice.koIntro : practice.intro;
  const issues = ko(locale) ? practice.koIssues : practice.issues;
  const related = practiceAreas.filter((item) => item.slug !== practice.slug).slice(0, 3);

  return (
    <Frame locale={locale}>
      <main>
        <PracticeDetailHero locale={locale} practice={practice} image={practiceImages[index % practiceImages.length]} />

        <div className="sticky top-[60px] z-40 border-y border-[#1E1C1A]/10 bg-[#F9F8F6]/95 backdrop-blur-md">
          <div className="site-shell flex gap-6 overflow-x-auto py-4 text-[9px] font-semibold uppercase tracking-[0.13em] text-[#1E1C1A]/44">
            <a href="#overview">{ko(locale) ? "개요" : "Overview"}</a><a href="#issues">{ko(locale) ? "주요 쟁점" : "What matters"}</a><a href="#process">{ko(locale) ? "진행" : "Process"}</a><a href="#related">{ko(locale) ? "관련 업무" : "Related"}</a>
          </div>
        </div>

        <section id="overview" className="scroll-mt-28 bg-[#F9F8F6]">
          <div className="site-shell py-20 md:py-28">
            <SectionHeading locale={locale} eyebrow="01 · Overview" title={ko(locale) ? `${title} 사건에서 먼저 보아야 할 것.` : `What matters first in a ${title.toLowerCase()} claim.`} />
            <div className="mt-14 grid gap-12 lg:grid-cols-[1.12fr_0.88fr] lg:gap-16">
              <div>
                <p style={serif(locale)} className="max-w-[800px] text-[clamp(1.75rem,3vw,3.25rem)] leading-[1.13] tracking-[-0.025em]">{intro}</p>
                <p className="mt-8 max-w-[700px] text-[12px] leading-6 text-[#1E1C1A]/52">{ko(locale) ? "모든 사건은 사실관계와 보험, 부상 정도가 다르므로 이 페이지는 일반적인 정보만 제공합니다. 실제 전략은 개별 상황을 검토한 뒤 결정됩니다." : "Every case turns on its own facts, available coverage, and injuries. This page gives a useful framework, but the actual strategy depends on the individual matter."}</p>
              </div>
              <div className="relative min-h-[380px] overflow-hidden">
                <img src={practiceImages[(index + 1) % practiceImages.length]} alt="" className="absolute inset-0 h-full w-full object-cover" loading="lazy" />
                <div className="absolute inset-0 bg-[#1E1C1A]/16" />
              </div>
            </div>
          </div>
        </section>

        <section id="issues" className="scroll-mt-28 bg-[#F3EEE5]">
          <div className="site-shell py-20 md:py-28">
            <SectionHeading locale={locale} eyebrow="02 · Evidence" title={ko(locale) ? "좋은 주장은 좋은 기록에서 시작됩니다." : "A strong claim starts with a record that can withstand questions."} />
            <div className="mt-14 grid gap-px bg-[#1E1C1A]/12 md:grid-cols-3">
              {[
                [FileText, ko(locale) ? "사고 증거" : "Collision evidence", ko(locale) ? "사진, 영상, 신고서, 목격자 및 현장 기록." : "Photos, video, reports, witnesses, and scene information."],
                [ShieldCheck, ko(locale) ? "보험" : "Insurance", ko(locale) ? "관련 운전자·회사와 적용 가능한 보험 확인." : "Identify the people, companies, and policies that may apply."],
                [Clock3, ko(locale) ? "치료 기록" : "Medical timeline", ko(locale) ? "증상, 치료, 제한과 회복 과정을 시간 순서로." : "Connect symptoms, treatment, limitations, and recovery over time."],
              ].map(([Icon, heading, body]) => {
                const I = Icon as typeof FileText;
                return <div key={String(heading)} className="bg-[#F3EEE5] p-7 md:p-9"><I className="h-5 w-5 stroke-[1.25] text-[#381907]" /><h3 className="mt-12 text-[13px] font-semibold">{String(heading)}</h3><p className="mt-3 text-[11px] leading-6 text-[#1E1C1A]/48">{String(body)}</p></div>;
              })}
            </div>
            <div className="mt-16 grid gap-8 lg:grid-cols-[0.55fr_1.45fr]">
              <Eyebrow>{ko(locale) ? "자주 발생하는 쟁점" : "Common issues"}</Eyebrow>
              <div className="border-t border-[#1E1C1A]/12">
                {issues.map((issue, issueIndex) => (
                  <div key={issue} className="grid grid-cols-[48px_1fr] border-b border-[#1E1C1A]/12 py-5"><span className="text-[9px] text-[#1E1C1A]/25">0{issueIndex + 1}</span><span style={serif(locale)} className="text-[1.25rem] leading-tight">{issue}</span></div>
                ))}
              </div>
            </div>
          </div>
        </section>

        <section id="process" className="scroll-mt-28 bg-[#F9F8F6]">
          <div className="site-shell py-20 md:py-28">
            <SectionHeading locale={locale} eyebrow="03 · Process" title={ko(locale) ? "사건은 한 번에 해결되지 않습니다. 단계별로 쌓입니다." : "A claim gets stronger by building the right things in the right order."} />
            <div className="mt-14 grid border-y border-[#1E1C1A]/12 md:grid-cols-4">
              {[
                ["01", ko(locale) ? "사실 확인" : "Understand", ko(locale) ? "사고, 당사자, 보험과 초기 자료를 정리합니다." : "Clarify the event, parties, coverage, and immediate records."],
                ["02", ko(locale) ? "증거 보존" : "Preserve", ko(locale) ? "사라질 수 있는 자료와 기록을 확보합니다." : "Secure evidence that may disappear or become harder to obtain."],
                ["03", ko(locale) ? "손실 파악" : "Measure", ko(locale) ? "치료와 생활 변화가 실제로 어떤 영향을 주었는지 봅니다." : "Understand medical, work, financial, and day-to-day impact."],
                ["04", ko(locale) ? "해결 전략" : "Resolve", ko(locale) ? "사실과 증거에 맞는 협상 또는 소송 전략을 세웁니다." : "Choose the negotiation or litigation path the facts support."],
              ].map(([n, heading, body]) => (
                <div key={n} className="border-b border-[#1E1C1A]/12 py-7 md:border-l md:px-6 md:first:border-l-0 md:first:pl-0"><div className="text-[9px] text-[#1E1C1A]/25">{n}</div><h3 className="mt-12 text-[12px] font-semibold">{heading}</h3><p className="mt-3 text-[10px] leading-5 text-[#1E1C1A]/46">{body}</p></div>
              ))}
            </div>
          </div>
        </section>

        <section id="related" className="scroll-mt-28 bg-[#F3EEE5]">
          <div className="site-shell py-20 md:py-24">
            <SectionHeading locale={locale} eyebrow="04 · Related" title={ko(locale) ? "사건이 겹치는 경우도 많습니다." : "Injury matters rarely fit into one neat box."} />
            <div className="mt-12 grid border-t border-[#1E1C1A]/12 md:grid-cols-3">
              {related.map((item, relatedIndex) => (
                <a key={item.slug} href={`${prefix(locale)}/practice-areas/${item.slug}`} className="group border-b border-[#1E1C1A]/12 py-6 md:border-l md:px-6 md:first:border-l-0 md:first:pl-0"><div className="flex items-center justify-between text-[9px] text-[#1E1C1A]/26"><span>0{relatedIndex + 1}</span><ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-1" /></div><h3 style={serif(locale)} className="mt-10 text-[1.55rem] leading-tight">{ko(locale) ? item.koTitle : item.title}</h3><p className="mt-3 text-[10px] leading-5 text-[#1E1C1A]/46">{ko(locale) ? item.koDescription : item.description}</p></a>
              ))}
            </div>
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
      <section className="relative min-h-[78svh] overflow-hidden bg-[#1E1C1A] pt-[60px] text-[#F3EEE5]">
        <img src={heroBoardroom} alt="" className="absolute inset-0 h-full w-full object-cover opacity-52" fetchPriority="high" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#1E1C1A]/96 via-[#1E1C1A]/50 to-[#1E1C1A]/24" />
        <div className="hero-bottom-readability" />
        <div className="site-shell relative z-10 flex min-h-[calc(78svh-60px)] items-end py-10 md:py-14">
          <div className="grid w-full gap-8 border-t border-white/16 pt-5 lg:grid-cols-[0.3fr_1.7fr]">
            <Eyebrow light>{ko(locale) ? "사건 결과" : "Results"}</Eyebrow>
            <div><h1 style={serif(locale)} className={`${ko(locale) ? "text-[clamp(2.8rem,5.5vw,5.8rem)] font-medium leading-[1.16] tracking-[-0.05em]" : "editorial-serif text-[clamp(4rem,7.2vw,8.4rem)] leading-[0.86] tracking-[-0.055em]"}`}>{ko(locale) ? "숫자보다 중요한 것은 그 숫자가 만들어진 맥락입니다." : "A result means more when you can understand the story behind it."}</h1><p className="mt-7 max-w-[760px] text-[13px] leading-7 text-white/58">{ko(locale) ? "검증된 합의·평결 정보가 제공되면 사건 유형, 담당 변호사와 핵심 맥락을 함께 보여주도록 설계했습니다." : "This page is designed for verified settlements and verdicts, presented with the case type, responsible attorney, and enough context to make the outcome meaningful."}</p></div>
          </div>
        </div>
      </section>

      <section className="bg-[#F9F8F6]">
        <div className="site-shell py-20 md:py-28">
          <SectionHeading locale={locale} eyebrow={ko(locale) ? "대표 결과" : "Featured outcome"} title={ko(locale) ? "가장 중요한 결과 하나를 크게, 나머지는 이야기가 보이도록." : "One result gets the room to breathe. The others still get a story."} body={ko(locale) ? "현재 아래 결과 영역은 디자인용 자리입니다. 실제 금액과 사건 정보가 확인되기 전까지 성과로 표시하지 않습니다." : "The result modules below are intentionally marked as design placeholders. No amount or outcome should be published as firm performance until it has been verified and approved."} />
          <div className="mt-14 grid overflow-hidden border border-[#1E1C1A]/12 lg:grid-cols-[1.12fr_0.88fr]">
            <div className="relative min-h-[480px] overflow-hidden">
              <img src={heroCourthouse} alt="" className="absolute inset-0 h-full w-full object-cover" loading="lazy" />
              <div className="absolute inset-0 bg-[#1E1C1A]/26" />
              <div className="absolute left-6 top-6 rounded-full border border-white/28 bg-black/10 px-3 py-1 text-[8px] font-semibold uppercase tracking-[0.14em] text-white/80">{ko(locale) ? "디자인 샘플" : "Design sample"}</div>
            </div>
            <div className="flex min-h-[480px] flex-col justify-between bg-[#F3EEE5] p-8 md:p-10">
              <div><Eyebrow>{ko(locale) ? "결과 금액" : "Outcome amount"}</Eyebrow><div style={serif(locale)} className="mt-8 text-[clamp(3.5rem,7vw,7.8rem)] leading-none text-[#381907]">—</div><h3 style={serif(locale)} className="mt-10 text-[clamp(1.8rem,3vw,3.2rem)] leading-[1.05]">{ko(locale) ? "검증된 대표 사건이 들어갈 자리" : "Reserved for a verified representative matter"}</h3><p className="mt-5 text-[11px] leading-6 text-[#1E1C1A]/50">{ko(locale) ? "사건 유형, 핵심 사실, 결과, 담당 변호사와 관련 업무 분야를 함께 보여줍니다." : "The finished module can show the case type, essential facts, outcome, responsible attorney, related practice area, and the required result disclaimer."}</p></div>
              <div className="border-t border-[#1E1C1A]/12 pt-4 text-[8px] uppercase tracking-[0.13em] text-[#1E1C1A]/35">{ko(locale) ? "실제 데이터 제공 후 교체" : "Replace once real case data is approved"}</div>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-[#F3EEE5]">
        <div className="site-shell py-20 md:py-28">
          <SectionHeading locale={locale} eyebrow={ko(locale) ? "사건 이야기" : "Case stories"} title={ko(locale) ? "결과 페이지를 숫자 벽으로 만들지 않습니다." : "The rest should read like case stories, not a wall of numbers."} />
          <div className="mt-14 grid gap-px bg-[#1E1C1A]/12 md:grid-cols-3">
            {["Motor Vehicle Claim", "Serious Injury", "Premises Claim"].map((label, index) => (
              <article key={label} className="bg-[#F3EEE5]">
                <div className="relative h-[270px] overflow-hidden"><img src={practiceImages[(index + 1) % practiceImages.length]} alt="" className="absolute inset-0 h-full w-full object-cover" loading="lazy" /><div className="absolute inset-0 bg-[#1E1C1A]/20" /><div className="absolute left-5 top-5 rounded-full border border-white/25 px-3 py-1 text-[8px] uppercase tracking-[0.13em] text-white/75">{ko(locale) ? "샘플" : "Sample"}</div></div>
                <div className="p-7"><div className="text-[9px] text-[#1E1C1A]/28">0{index + 1}</div><h3 style={serif(locale)} className="mt-8 text-[1.7rem] leading-tight">{ko(locale) ? ["자동차 사고", "중대 상해", "시설 책임"][index] : label}</h3><p className="mt-3 text-[10px] leading-5 text-[#1E1C1A]/46">{ko(locale) ? "실제 사건 결과가 승인되면 금액, 짧은 이야기와 관련 업무 링크를 넣습니다." : "Ready for an approved amount, a concise case narrative, the responsible attorney, and related practice links."}</p></div>
              </article>
            ))}
          </div>
          <p className="mt-8 max-w-[820px] text-[9px] leading-5 text-[#1E1C1A]/38">{ko(locale) ? "과거 결과는 향후 사건의 결과를 보장하지 않습니다. 각 사건은 사실관계와 법률상 쟁점이 다릅니다." : "Prior results do not guarantee or predict a similar outcome in any future matter. Every case depends on its own facts and legal issues."}</p>
        </div>
      </section>

      <section className="bg-[#F9F8F6]">
        <div className="site-shell py-20 md:py-24">
          <SectionHeading locale={locale} eyebrow={ko(locale) ? "연결" : "From proof to practice"} title={ko(locale) ? "결과는 관련 업무 분야로 다시 연결됩니다." : "Every result should lead back to the kind of work that produced it."} />
          <div className="mt-12"><PracticeLinks locale={locale} limit={4} /></div>
        </div>
      </section>

      <ConsultationCta locale={locale} />
    </main>
  </Frame>
);
