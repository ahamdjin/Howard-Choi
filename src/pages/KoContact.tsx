import { motion, useScroll, useTransform } from "framer-motion";
import { ArrowRight, CalendarDays, FileText, Mail, MapPin, Phone, ShieldCheck } from "lucide-react";
import { Link } from "react-router-dom";
import PageBreadcrumb from "@/components/PageBreadcrumb";
import KoreanNavigation from "@/components/KoreanNavigation";
import KoreanFooter from "@/components/KoreanFooter";
import GHLCalendar from "@/components/GHLCalendar";
import WebsiteInquiryForm from "@/components/WebsiteInquiryForm";
import heroCityBoardroom from "@/assets/law-firm/hero-city-boardroom.webp";
import { brand } from "@/data/injurySite";

const koSerif = { fontFamily: '"Noto Serif KR", serif' } as const;

const KoContact = () => {
  const { scrollY } = useScroll();
  const heroY = useTransform(scrollY, [0, 700], [0, 90]);

  return (
    <div className="min-h-screen overflow-x-clip bg-background" style={{ fontFamily: '"Noto Sans KR", sans-serif' }}>
      <KoreanNavigation />

      <section className="relative flex min-h-[100svh] items-end pt-24 md:min-h-[560px] overflow-hidden bg-[#17130f] text-[#f3eee5]">
        <motion.img src={heroCityBoardroom} alt="프라이빗 로펌 회의실" style={{ y: heroY }} fetchPriority="high" decoding="async" className="absolute inset-0 h-[112%] w-full object-cover" />
        <div className="absolute inset-0 bg-[#17130f]/64" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#17130f]/78 via-transparent to-[#17130f]/12" />
        <div className="hero-bottom-readability" />

        <div className="site-shell relative z-10 pb-12 md:pb-14">
          <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.72 }} className="max-w-[730px]">
            <span className="mb-4 block text-[11px] text-[#f3eee5]/62">문의 · Buena Park</span>
            <PageBreadcrumb locale="ko" title="문의" />
            <h1 style={koSerif} className="text-[clamp(2.45rem,3.85vw,3.85rem)] font-medium leading-[1.18] tracking-[-0.045em]">사고 이후의 상황을 변호사와 직접 이야기하세요.</h1>
            <div className="mt-6 flex flex-wrap gap-3"><a href="#calendar" className="inline-flex min-h-11 items-center rounded-full bg-[#f3eee5] px-5 py-3 text-sm font-semibold text-[#17130f]">상담 예약</a><a href="#message" className="inline-flex min-h-11 items-center rounded-full border border-white/50 px-5 py-3 text-sm">메시지 보내기</a></div>
            <p className="mt-5 max-w-[590px] text-[14px] leading-7 text-[#f3eee5]/68 md:text-[15px]">사고 날짜와 장소, 현재 치료 상황, 보험 정보와 가장 궁금한 문제부터 알려주시면 됩니다. 첫 상담을 위해 모든 서류가 준비되어 있을 필요는 없습니다. 직원들이 영어, 한국어, 스페인어로 상담을 지원합니다.</p>
          </motion.div>
        </div>
      </section>

      <main className="site-shell py-16 md:py-20 lg:py-24">
        <div className="mb-12 grid gap-8 border-b border-foreground/10 pb-9 md:grid-cols-3">
          <a href="tel:+17148448494" className="group border-t border-foreground/10 pt-5 md:border-t-0 md:pt-0"><Phone className="mb-4 h-4 w-4 text-muted-foreground" /><div className="text-[11px] text-muted-foreground">전화</div><div className="mt-2 text-[15px] transition-opacity group-hover:opacity-60">+1 714-844-8494</div></a>
          <a href={brand.emailHref} className="group border-t border-foreground/10 pt-5 md:border-t-0 md:pt-0"><Mail className="mb-4 h-4 w-4 text-muted-foreground" /><div className="text-[11px] text-muted-foreground">이메일</div><div className="mt-2 text-[15px] transition-opacity group-hover:opacity-60">{brand.email}</div></a>
          <a href="https://share.google/LBJ1C8zWrZFjJBkVe" target="_blank" rel="noreferrer" className="group border-t border-foreground/10 pt-5 md:border-t-0 md:pt-0"><MapPin className="mb-4 h-4 w-4 text-muted-foreground" /><div className="text-[11px] text-muted-foreground">사무실</div><div className="mt-2 max-w-[260px] text-[15px] leading-6 transition-opacity group-hover:opacity-60">6301 Beach Blvd, Buena Park, CA 90621</div></a>
        </div>

        <div className="grid items-start gap-5 xl:grid-cols-[0.78fr_1.22fr]">
          <motion.section id="message" initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: 0.18 }} transition={{ duration: 0.68 }} className="scroll-mt-24 rounded-[4px] bg-[#e9e6e1] p-7 md:p-9 xl:sticky xl:top-24">
            <span className="text-[11px] text-foreground/48">메시지 보내기</span>
            <h2 style={koSerif} className="mt-3 text-[clamp(1.9rem,2.5vw,2.75rem)] font-medium leading-[1.22] tracking-[-0.04em]">현재 사건이 어느 단계인지 알려주세요.</h2>
            <p className="mt-4 max-w-[480px] text-[14px] leading-7 text-foreground/58">사고가 발생한 장소와 날짜, 부상과 치료 상황, 업무에 미친 영향, 현재 가지고 있는 보험·청구 정보가 좋은 시작점입니다. 모든 기록이 없어도 문의할 수 있습니다. 변호사-의뢰인 관계가 확인되기 전에는 기밀정보나 긴급한 민감정보를 보내지 마세요.</p>
            <WebsiteInquiryForm locale="ko" />
          </motion.section>

          <motion.section id="calendar" initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: 0.05 }} transition={{ duration: 0.68, delay: 0.06 }} className="w-full scroll-mt-20 rounded-[4px] bg-[#1a1714] p-4 text-[#f3eee5] md:p-5">
            <div className="flex items-start justify-between gap-6 px-3 pb-5 pt-3 md:px-4 md:pb-6 md:pt-4">
              <div><span className="text-[11px] text-[#f3eee5]/42">상담</span><h2 style={koSerif} className="mt-3 max-w-[620px] text-[clamp(1.9rem,2.7vw,2.85rem)] font-medium leading-[1.22] tracking-[-0.04em]">가능한 상담 시간을 예약하세요.</h2><p className="mt-4 max-w-[620px] text-[14px] leading-7 text-[#f3eee5]/52">날짜와 시간을 선택한 뒤 이 페이지에서 예약을 완료할 수 있습니다. 사진, 사고 기록, 보험 정보, 의료기록 또는 보험사 연락 내용이 있다면 상담을 위해 함께 정리해 두면 됩니다.</p></div>
              <CalendarDays className="mt-1 h-5 w-5 shrink-0 text-[#f3eee5]/42" />
            </div>
            <GHLCalendar locale="ko" />
          </motion.section>
        </div>

        <section className="mt-16 border-t border-foreground/12 pt-7 md:mt-20 md:pt-9">
          <div className="grid gap-8 lg:grid-cols-[0.38fr_1.62fr] lg:gap-12 xl:gap-16">
            <div><span className="text-[9px] font-semibold tracking-[0.08em] text-muted-foreground">상담 전에 준비할 것</span></div>
            <div>
              <h2 style={koSerif} className="max-w-[780px] text-[clamp(1.9rem,2.8vw,3rem)] font-medium leading-[1.3] tracking-[-0.04em]">현재 가지고 있는 사실부터 준비하세요. 첫 상담은 무엇이 더 필요한지 확인하는 과정입니다.</h2>
              <div className="mt-10 grid border-t border-foreground/12 md:grid-cols-3">
                {[
                  [MapPin, "사고 흐름", "사고 날짜, 정확한 장소, 사고 경위와 현재 가지고 있는 사건번호 또는 청구번호."],
                  [FileText, "현재 보유한 자료", "사진·영상, 보험 정보, 치료 내용, 의료비, 결근·업무 손실 자료와 중요한 연락 내용."],
                  [ShieldCheck, "기한과 다음 단계", "공공기관, 영상 보존, 보험사 요청이나 법적 기한이 걱정된다면 첫 상담에서 먼저 알려주세요."],
                ].map(([Icon, title, body]) => {
                  const ItemIcon = Icon as typeof MapPin;
                  return <div key={String(title)} className="border-b border-foreground/12 py-7 md:border-b-0 md:border-l md:px-7 md:first:border-l-0 md:first:pl-0"><ItemIcon className="h-4 w-4 text-foreground/52" /><div className="mt-8 text-[12px] font-semibold">{String(title)}</div><p className="mt-3 text-[11px] leading-6 text-foreground/52">{String(body)}</p></div>;
                })}
              </div>
              <div className="mt-8 flex flex-wrap gap-x-6 gap-y-3 text-[12px]">
                <Link to="/ko/practice-areas" className="inline-flex items-center gap-2 hover:opacity-60">업무 분야 보기 <ArrowRight className="h-3.5 w-3.5" /></Link>
                <Link to="/ko/attorney" className="inline-flex items-center gap-2 hover:opacity-60">변호사 보기 <ArrowRight className="h-3.5 w-3.5" /></Link>
              </div>
            </div>
          </div>
        </section>
      </main>

      <KoreanFooter />
    </div>
  );
};

export default KoContact;
