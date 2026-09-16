import { motion } from "framer-motion";
import { ArrowRight, Award, Phone, Quote, Scale } from "lucide-react";
import PageBreadcrumb from "@/components/PageBreadcrumb";
import Navigation from "@/components/Navigation";
import KoreanNavigation from "@/components/KoreanNavigation";
import Footer from "@/components/Footer";
import KoreanFooter from "@/components/KoreanFooter";
import leadCounsel from "@/assets/law-firm/lead-counsel.avif";
import { brand, practiceAreas, type SiteLocale } from "@/data/injurySite";

const ko = (locale: SiteLocale) => locale === "ko";
const prefix = (locale: SiteLocale) => (ko(locale) ? "/ko" : "");
const serif = (locale: SiteLocale) => ko(locale) ? { fontFamily: '"Noto Serif KR", serif' } : undefined;

const Frame = ({ locale, children }: { locale: SiteLocale; children: React.ReactNode }) => (
  <div className="min-h-screen overflow-x-clip bg-[#F9F8F6] text-[#1E1C1A]" style={ko(locale) ? { fontFamily: '"Noto Sans KR", sans-serif' } : undefined}>
    {ko(locale) ? <KoreanNavigation /> : <Navigation />}
    {children}
    {ko(locale) ? <KoreanFooter /> : <Footer />}
  </div>
);

const Eyebrow = ({ children, light = false }: { children: React.ReactNode; light?: boolean }) => (
  <div className={`text-[9px] font-semibold uppercase tracking-[0.18em] ${light ? "text-[#F3EEE5]/52" : "text-[#1E1C1A]/38"}`}>{children}</div>
);

const SectionHeading = ({ locale, eyebrow, title, body }: { locale: SiteLocale; eyebrow: string; title: string; body?: string }) => (
  <div className="grid gap-7 border-t border-[#1E1C1A]/12 pt-5 lg:grid-cols-[0.31fr_1.69fr] lg:gap-12 xl:gap-16">
    <Eyebrow>{eyebrow}</Eyebrow>
    <div>
      <h2 style={serif(locale)} className={`max-w-[930px] ${ko(locale) ? "text-[clamp(1.7rem,2.8vw,3rem)] font-medium leading-[1.35] tracking-[-0.04em]" : "editorial-serif text-[clamp(2rem,3.25vw,3.55rem)] leading-[1.01] tracking-[-0.032em]"}`}>{title}</h2>
      {body && <p className="mt-5 max-w-[720px] text-[13px] leading-7 text-[#1E1C1A]/56">{body}</p>}
    </div>
  </div>
);

const ConsultationCta = ({ locale }: { locale: SiteLocale }) => (
  <section className="bg-[#1E1C1A] text-[#F3EEE5]">
    <div className="site-shell grid min-h-[420px] items-center gap-12 py-16 lg:grid-cols-[0.95fr_1.05fr] lg:py-20">
      <div>
        <Eyebrow light>{ko(locale) ? "상담" : "Start the conversation"}</Eyebrow>
        <h2 style={serif(locale)} className={`mt-6 max-w-[650px] ${ko(locale) ? "text-[clamp(2rem,4vw,4rem)] font-medium leading-[1.3] tracking-[-0.04em]" : "editorial-serif text-[clamp(2.5rem,5vw,5.7rem)] leading-[0.92] tracking-[-0.04em]"}`}>
          {ko(locale) ? "사고 이후의 다음 단계를 명확하게 정리하세요." : "Clarity starts with one conversation."}
        </h2>
        <p className="mt-7 max-w-[520px] text-[13px] leading-7 text-[#F3EEE5]/56">{ko(locale) ? "사고 경위와 현재 상황을 알려주시면 상담 가능 여부와 다음 단계를 확인할 수 있습니다." : "Share what happened, where things stand, and what you are worried about. The legal team can determine whether the matter is a fit and what information or action should come next."}</p>
      </div>
      <div className="border-t border-white/14 pt-7 lg:border-l lg:border-t-0 lg:pl-12 lg:pt-0">
        <a href={`${prefix(locale)}/contact`} className="group flex items-center justify-between border-b border-white/14 py-6"><span className="text-[14px] font-medium">{ko(locale) ? "상담 예약" : "Schedule a consultation"}</span><ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" /></a>
        <a href={brand.phoneHref} className="group flex items-center justify-between border-b border-white/14 py-6"><span className="text-[14px] font-medium">{brand.phoneDisplay}</span><Phone className="h-4 w-4" /></a>
        <div className="pt-7 text-[10px] leading-5 text-white/38">{brand.address}<br />{ko(locale) ? "웹사이트 정보는 법률 자문이 아닙니다." : "Website information is general and is not legal advice."}</div>
      </div>
    </div>
  </section>
);

const PracticeLinks = ({ locale, limit = 8 }: { locale: SiteLocale; limit?: number }) => (
  <div className="grid border-t border-[#1E1C1A]/12 sm:grid-cols-2 xl:grid-cols-4">
    {practiceAreas.slice(0, limit).map((practice, index) => (
      <a key={practice.slug} href={`${prefix(locale)}/practice-areas/${practice.slug}`} className="group min-h-[120px] border-b border-[#1E1C1A]/12 py-6 sm:px-6 sm:first:pl-0 xl:border-l xl:first:border-l-0">
        <div className="flex items-center justify-between text-[9px] tabular-nums text-[#1E1C1A]/28"><span>{String(index + 1).padStart(2, "0")}</span><ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-1" /></div>
        <h3 style={serif(locale)} className="mt-5 text-[1.35rem] leading-tight">{ko(locale) ? practice.koTitle : practice.title}</h3>
        <p className="mt-3 max-w-[270px] text-[10px] leading-5 text-[#1E1C1A]/70">{ko(locale) ? practice.koDescription : practice.description}</p>
      </a>
    ))}
  </div>
);

const AttorneyPortrait = ({ className = "" }: { className?: string }) => (
  <div className={`relative overflow-hidden bg-[#D9D3CB] ${className}`}>
    <img src={leadCounsel} alt="Howard Choi, California attorney in Buena Park" className="h-full w-full object-cover object-center" loading="eager" decoding="async" />
    <div className="absolute inset-0 bg-gradient-to-t from-[#1E1C1A]/40 via-transparent to-transparent" />
  </div>
);

const ProfileLinks = ({ locale }: { locale: SiteLocale }) => (
  <div className="mt-8 border-t border-white/14 pt-5">
    <div className="mb-3 text-[8px] font-semibold uppercase tracking-[0.16em] text-white/35">{ko(locale) ? "업무 초점" : "Practice focus"}</div>
    <div className="flex flex-wrap gap-x-5 gap-y-2 text-[11px] text-white/62">
      <span>{ko(locale) ? "개인상해" : "Personal injury"}</span><span>{ko(locale) ? "교통사고" : "Accident claims"}</span><span>Buena Park</span><span>{ko(locale) ? "Orange County 인근" : "Nearby communities"}</span>
    </div>
  </div>
);

export const AttorneyPage = ({ locale }: { locale: SiteLocale }) => (
  <Frame locale={locale}>
    <main className="attorney-page">
      <section className="bg-[#211A16] pt-[60px] text-[#F3EEE5]">
        <div className="grid min-h-[calc(100svh-60px)] lg:grid-cols-[1.1fr_0.9fr]">
          <AttorneyPortrait className="order-2 h-[360px] lg:order-none lg:h-auto lg:min-h-[calc(100svh-60px)]" />
          <div className="flex min-h-[540px] flex-col justify-between gap-8 px-6 py-10 sm:px-10 lg:px-12 lg:py-12 xl:px-16">
            <div className="flex items-center justify-between border-t border-white/16 pt-4"><Eyebrow light>{ko(locale) ? "변호사" : "Attorneys"}</Eyebrow><span className="text-[9px] uppercase tracking-[0.14em] text-white/34">Buena Park · California</span></div>
            <motion.div initial={{ opacity: 0, y: 22 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}>
              <PageBreadcrumb locale={locale} title={ko(locale) ? "변호사" : "Attorneys"} />
              <h1 style={serif(locale)} className={`max-w-[680px] ${ko(locale) ? "text-[clamp(2.8rem,5vw,5.7rem)] font-medium leading-[1.12] tracking-[-0.05em]" : "editorial-serif text-[clamp(4rem,7.2vw,8.6rem)] leading-[0.82] tracking-[-0.055em]"}`}>
                {ko(locale) ? <>개인상해<br />변호사</> : <>Our<br />Attorneys</>}
              </h1>
              <p className="mt-7 max-w-[500px] text-base leading-7 text-white/80">{ko(locale) ? "부에나파크의 Howard Choi 변호사를 만나보세요. 사고와 관련된 질문을 상담할 수 있습니다." : "Meet Howard Choi, a personal injury attorney in Buena Park. Get answers to your questions about an accident claim."}</p>
              <div className="mt-8 flex flex-wrap gap-3">
                <a href={`${prefix(locale)}/contact`} className="rounded-full bg-[#F3EEE5] px-6 py-3 text-[14px] font-semibold text-[#1E1C1A]">{ko(locale) ? "상담 예약" : "Schedule a consultation"}</a>
                <a href="#profile" className="inline-flex min-h-11 items-center gap-2 rounded-full border border-white/30 px-6 py-3 text-sm text-white">{ko(locale) ? "프로필 보기" : "View profile"}<ArrowRight className="h-4 w-4" /></a>
                <a href={brand.phoneHref} className="rounded-full border border-white/20 px-6 py-3 text-[14px] text-white/90">{brand.phoneDisplay}</a>
              </div>
              <ProfileLinks locale={locale} />
            </motion.div>
            <div className="grid gap-2 border-t border-white/14 pt-4 text-[9px] uppercase tracking-[0.13em] text-white/34 sm:grid-cols-2"><span>{brand.address}</span><span className="sm:text-right">{ko(locale) ? "개인상해 · 사고" : "Personal injury · Accidents"}</span></div>
          </div>
        </div>
      </section>

      <section className="bg-[#F3EEE5]">
        <div className="site-shell py-16 md:py-20">
          <SectionHeading locale={locale} eyebrow={ko(locale) ? "의뢰인 경험" : "What clients can expect"} title={ko(locale) ? "신뢰는 큰 약속보다 명확한 과정에서 시작됩니다." : "What can we help you with?"} body={ko(locale) ? "상해 사건에서는 결과뿐 아니라 현재 단계, 필요한 기록, 보험 문제와 다음 결정이 무엇인지 이해하는 것이 중요합니다." : "Discuss your accident, your records, and the questions you need answered."} />
          <div className="mt-12 grid gap-0 border-y border-[#1E1C1A]/12 lg:grid-cols-[1.18fr_0.82fr]">
            <div className="py-8 lg:border-r lg:border-[#1E1C1A]/12 lg:pr-10">
              <Quote className="h-5 w-5 stroke-[1.2] text-[#381907]" />
              <p style={serif(locale)} className="mt-8 max-w-[720px] text-[clamp(1.65rem,2.8vw,3rem)] leading-[1.15] tracking-[-0.025em]">{ko(locale) ? "좋은 법률 서비스는 의뢰인이 자신의 사건에서 무엇이 일어나고 있는지 이해할 수 있게 해야 합니다." : "Know what happens next."}</p>
              <div className="mt-8 text-[9px] uppercase tracking-[0.14em] text-[#1E1C1A]/38">{ko(locale) ? "업무 원칙" : "How the team works"}</div>
            </div>
            <div className="grid sm:grid-cols-2 lg:grid-cols-1">
              {[Award, Scale].map((Icon, index) => (
                <div key={index} className="border-t border-[#1E1C1A]/12 py-7 sm:first:border-t-0 sm:first:pr-6 sm:last:border-l sm:last:pl-6 lg:first:border-t-0 lg:last:border-l-0 lg:last:border-t lg:last:pl-0">
                  <Icon className="h-4 w-4 stroke-[1.3] text-[#381907]" />
                  <div className="mt-10 text-[12px] font-semibold">{index === 0 ? (ko(locale) ? "사건 준비" : "Case preparation") : (ko(locale) ? "소통" : "Communication")}</div>
                  <p className="mt-2 text-[10px] leading-5 text-[#1E1C1A]/46">{index === 0 ? (ko(locale) ? "증거, 치료, 보험과 손실을 하나의 사건 기록으로 정리합니다." : "Organize liability evidence, treatment, insurance, financial loss, and future needs into one coherent record.") : (ko(locale) ? "현재 단계와 다음 결정을 이해하기 쉬운 언어로 설명합니다." : "Explain the current stage, open questions, and next decision in language the client can actually use.")}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section id="profile" className="scroll-mt-24 bg-[#F9F8F6]">
        <div className="site-shell py-20 md:py-28">
          <SectionHeading locale={locale} eyebrow={ko(locale) ? "변호사 프로필" : "Attorney profile"} title={ko(locale) ? "Howard Choi 변호사" : "Howard Choi"} body={ko(locale) ? "공개된 캘리포니아 변호사 등록 정보를 바탕으로 확인할 수 있는 현재 프로필입니다." : "Personal injury attorney based in Buena Park, California."} />
          <div className="mt-14 grid gap-12 lg:grid-cols-[0.7fr_1.3fr] lg:gap-16">
            <aside className="lg:sticky lg:top-24 lg:self-start">
              <div className="border-t border-[#1E1C1A]/12">
                {[
                  [ko(locale) ? "이름" : "Name", "Howard Jong-yol Choi"],
                  [ko(locale) ? "캘리포니아 변호사 번호" : "California Bar No.", "284364"],
                  [ko(locale) ? "등록 연도" : "Admitted", "2012"],
                  [ko(locale) ? "사무실" : "Office", "Buena Park, California"],
                ].map(([label, value]) => <div key={label} className="border-b border-[#1E1C1A]/12 py-5"><div className="text-[8px] font-semibold uppercase tracking-[0.15em] text-[#1E1C1A]/34">{label}</div><div className="mt-2 text-[12px] leading-5">{value}</div></div>)}
              </div>
              <a href="https://apps.calbar.ca.gov/attorney/Licensee/Detail/284364" target="_blank" rel="noreferrer" className="group mt-6 flex items-center justify-between border-b border-[#1E1C1A]/12 pb-4 text-[11px]"><span>{ko(locale) ? "캘리포니아 주 변호사 등록 확인" : "Verify with the State Bar of California"}</span><ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-1" /></a>
            </aside>
            <div>
              <p style={serif(locale)} className="max-w-[820px] text-[clamp(1.7rem,3vw,3.25rem)] leading-[1.12] tracking-[-0.026em]">{ko(locale) ? "상해 사건은 사고 사실만이 아니라 치료, 보험, 업무, 가족과 일상생활의 변화까지 함께 봐야 합니다." : "An accident affects more than your vehicle."}</p>
              <div className="mt-10 grid gap-8 text-[13px] leading-7 text-[#1E1C1A]/58 md:grid-cols-2">
                <p>{ko(locale) ? "법률팀은 사고 경위와 현재 치료 상황부터 시작해 책임, 보험, 증거와 손실을 단계별로 정리합니다." : "We review what happened, your treatment, available insurance, and how the injury has affected your work and daily life."}</p>
                <p>{ko(locale) ? "사건 진행 중에는 어떤 기록이 필요한지, 무엇이 아직 확인되지 않았는지, 다음 단계가 무엇인지 의뢰인이 이해할 수 있어야 합니다." : "Bring your questions to the consultation. Ask what records are needed and what options may be available."}</p>
              </div>
              <div className="mt-12 grid border-t border-[#1E1C1A]/12 sm:grid-cols-3">
                {[
                  ["01", ko(locale) ? "듣기" : "Listen", ko(locale) ? "사실과 우려를 먼저 정리합니다." : "Start with the facts, treatment, and the client's immediate concerns."],
                  ["02", ko(locale) ? "정리" : "Build", ko(locale) ? "증거, 치료, 보험을 하나의 흐름으로 봅니다." : "Connect liability evidence, treatment, coverage, and the full impact of the injury."],
                  ["03", ko(locale) ? "진행" : "Move", ko(locale) ? "각 단계에서 다음 행동을 명확하게 합니다." : "Explain the choices and keep the next action understandable."],
                ].map(([n, title, body]) => <div key={n} className="border-b border-[#1E1C1A]/12 py-6 sm:border-l sm:px-6 sm:first:border-l-0 sm:first:pl-0"><div className="text-[9px] text-[#1E1C1A]/25">{n}</div><div className="mt-8 text-[12px] font-semibold">{title}</div><p className="mt-2 text-[10px] leading-5 text-[#1E1C1A]/46">{body}</p></div>)}
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-[#F3EEE5]">
        <div className="site-shell py-20 md:py-24">
          <SectionHeading locale={locale} eyebrow={ko(locale) ? "업무 분야" : "Practice focus"} title={ko(locale) ? "사고 유형에 맞는 안내를 확인하세요." : "Find help for your type of accident."} body={ko(locale) ? "각 업무 분야 페이지에서 사고 유형별 증거, 보험, 손실과 다음 단계를 확인할 수 있습니다." : "Each practice guide explains the evidence, insurance issues, damages, and next steps that are specific to that kind of accident or injury."} />
          <div className="mt-12"><PracticeLinks locale={locale} /></div>
        </div>
      </section>

      <ConsultationCta locale={locale} />
    </main>
  </Frame>
);
