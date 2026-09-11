import { motion, useScroll, useTransform } from "framer-motion";
import { CalendarDays, Mail, MapPin, Phone } from "lucide-react";
import KoreanNavigation from "@/components/KoreanNavigation";
import KoreanFooter from "@/components/KoreanFooter";
import GHLCalendar from "@/components/GHLCalendar";
import WebsiteInquiryForm from "@/components/WebsiteInquiryForm";
import heroCityBoardroom from "@/assets/law-firm/hero-city-boardroom.webp";

const koSerif = { fontFamily: '"Noto Serif KR", serif' } as const;

const KoContact = () => {
  const { scrollY } = useScroll();
  const heroY = useTransform(scrollY, [0, 700], [0, 90]);

  return (
    <div className="min-h-screen overflow-x-clip bg-background" style={{ fontFamily: '"Noto Sans KR", sans-serif' }}>
      <KoreanNavigation />

      <section className="relative flex h-[54svh] min-h-[460px] items-end overflow-hidden bg-[#17130f] text-[#f3eee5]">
        <motion.img
          src={heroCityBoardroom}
          alt="프라이빗 로펌 회의실"
          style={{ y: heroY }}
          fetchPriority="high"
          decoding="async"
          className="absolute inset-0 h-[112%] w-full object-cover"
        />
        <div className="absolute inset-0 bg-[#17130f]/64" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#17130f]/78 via-transparent to-[#17130f]/12" />

        <div className="site-shell relative z-10 pb-12 md:pb-14">
          <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.72 }} className="max-w-[730px]">
            <span className="mb-4 block text-[11px] text-[#f3eee5]/62">문의</span>
            <h1 style={koSerif} className="text-[clamp(2.45rem,3.85vw,3.85rem)] font-medium leading-[1.18] tracking-[-0.045em]">
              명확한 대화에서 시작합니다.
            </h1>
            <p className="mt-5 max-w-[570px] text-[14px] leading-7 text-[#f3eee5]/68 md:text-[15px]">
              사안의 개요를 남기거나 아래에서 가능한 상담 시간을 바로 예약해 주세요.
            </p>
          </motion.div>
        </div>
      </section>

      <main className="site-shell py-16 md:py-20 lg:py-24">
        <div className="mb-12 grid gap-8 border-b border-foreground/10 pb-9 md:grid-cols-3">
          <a href="tel:+17146900007" className="group border-t border-foreground/10 pt-5 md:border-t-0 md:pt-0">
            <Phone className="mb-4 h-4 w-4 text-muted-foreground" /><div className="text-[11px] text-muted-foreground">전화</div><div className="mt-2 text-[15px] transition-opacity group-hover:opacity-60">+1 714-690-0007</div>
          </a>
          <a href="mailto:hello@howardchoilaw.com" className="group border-t border-foreground/10 pt-5 md:border-t-0 md:pt-0">
            <Mail className="mb-4 h-4 w-4 text-muted-foreground" /><div className="text-[11px] text-muted-foreground">이메일</div><div className="mt-2 text-[15px] transition-opacity group-hover:opacity-60">hello@howardchoilaw.com</div>
          </a>
          <a href="https://www.google.com/maps/search/?api=1&query=6301+Beach+Blvd%2C+Buena+Park%2C+CA+90621" target="_blank" rel="noreferrer" className="group border-t border-foreground/10 pt-5 md:border-t-0 md:pt-0">
            <MapPin className="mb-4 h-4 w-4 text-muted-foreground" /><div className="text-[11px] text-muted-foreground">사무실</div><div className="mt-2 max-w-[260px] text-[15px] leading-6 transition-opacity group-hover:opacity-60">6301 Beach Blvd, Buena Park, CA 90621</div>
          </a>
        </div>

        <div className="grid gap-5 lg:grid-cols-[0.78fr_1.22fr]">
          <motion.section initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: 0.18 }} transition={{ duration: 0.68 }} className="rounded-[4px] bg-[#e9e6e1] p-7 md:p-9">
            <span className="text-[11px] text-foreground/48">메시지 보내기</span>
            <h2 style={koSerif} className="mt-3 text-[clamp(1.95rem,2.8vw,2.9rem)] font-medium leading-[1.22] tracking-[-0.04em]">어떤 도움이 필요한지 간단히 알려주세요.</h2>
            <p className="mt-4 max-w-[480px] text-[14px] leading-7 text-foreground/58">
              짧은 개요만으로 충분합니다. 변호사-의뢰인 관계가 확인되기 전에는 기밀정보나 긴급한 민감정보를 보내지 마세요.
            </p>

            <WebsiteInquiryForm locale="ko" />
          </motion.section>

          <motion.section id="calendar" initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: 0.08 }} transition={{ duration: 0.68, delay: 0.06 }} className="scroll-mt-24 rounded-[4px] bg-[#1a1714] p-4 text-[#f3eee5] md:p-6">
            <div className="flex items-start justify-between gap-6 px-3 pb-5 pt-3 md:px-4 md:pb-6 md:pt-4">
              <div>
                <span className="text-[11px] text-[#f3eee5]/42">상담</span>
                <h2 style={koSerif} className="mt-3 max-w-[540px] text-[clamp(1.9rem,2.7vw,2.85rem)] font-medium leading-[1.22] tracking-[-0.04em]">가능한 상담 시간을 예약하세요.</h2>
                <p className="mt-4 max-w-[540px] text-[14px] leading-7 text-[#f3eee5]/52">
                  실제 예약 가능 시간이 바로 표시됩니다. 원하는 시간을 선택하고 아래에서 예약을 완료해 주세요.
                </p>
              </div>
              <CalendarDays className="mt-1 h-5 w-5 shrink-0 text-[#f3eee5]/42" />
            </div>

            <GHLCalendar locale="ko" />

            <div className="px-3 pb-2 pt-4 text-[11px] leading-5 text-[#f3eee5]/38 md:px-4">
              예약 가능 시간과 확인은 HighLevel 일정 시스템을 통해 관리됩니다.
            </div>
          </motion.section>
        </div>
      </main>

      <KoreanFooter />
    </div>
  );
};

export default KoContact;
