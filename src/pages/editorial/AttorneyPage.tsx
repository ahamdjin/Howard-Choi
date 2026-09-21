import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import PageBreadcrumb from "@/components/PageBreadcrumb";
import Navigation from "@/components/Navigation";
import KoreanNavigation from "@/components/KoreanNavigation";
import Footer from "@/components/Footer";
import KoreanFooter from "@/components/KoreanFooter";
import leadCounsel from "@/assets/law-firm/lead-counsel.avif";
import { brand, type SiteLocale } from "@/data/injurySite";
import AttorneyContent from "./AttorneyContent";

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
      <section className="attorney-hero bg-[#211A16] pt-[60px] text-[#F3EEE5]">
        <div className="grid min-h-[calc(100svh-60px)] lg:grid-cols-[1.1fr_0.9fr]">
          <AttorneyPortrait className="order-2 h-[360px] lg:order-none lg:h-auto lg:min-h-[calc(100svh-60px)]" />
          <div className="flex min-h-[540px] flex-col justify-between gap-8 px-6 py-10 sm:px-10 lg:px-12 lg:py-12 xl:px-16">
            <div className="flex items-center justify-between border-t border-white/16 pt-4"><Eyebrow light>{ko(locale) ? "변호사" : "Attorney"}</Eyebrow><span className="text-[9px] uppercase tracking-[0.14em] text-white/34">Buena Park · California</span></div>
            <motion.div initial={{ opacity: 0, y: 22 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}>
              <PageBreadcrumb locale={locale} title={ko(locale) ? "변호사" : "Attorney"} />
              <h1 style={serif(locale)} className={`max-w-[680px] ${ko(locale) ? "text-[clamp(2.8rem,5vw,5.7rem)] font-medium leading-[1.12] tracking-[-0.05em]" : "editorial-serif text-[clamp(4rem,7.2vw,8.6rem)] leading-[0.82] tracking-[-0.055em]"}`}>
                {ko(locale) ? <>개인상해<br />변호사</> : <>Howard<br />Choi</>}
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

      <AttorneyContent locale={locale} />
    </main>
  </Frame>
);
