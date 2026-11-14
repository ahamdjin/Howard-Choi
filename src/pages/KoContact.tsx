import SiteDepthSection from "@/components/SiteDepthSection";
import { ArrowRight, FileText, Mail, MapPin, Phone, ShieldCheck } from "lucide-react";
import { Link } from "@/lib/router-compat";
import KoreanNavigation from "@/components/KoreanNavigation";
import KoreanFooter from "@/components/KoreanFooter";
import ContactConsultation from "@/components/ContactConsultation";
import { brand } from "@/data/injurySite";

const koSerif = { fontFamily: '"Noto Serif KR", serif' } as const;

const KoContact = () => {
  return (
    <div className="min-h-screen overflow-x-clip bg-background" style={{ fontFamily: '"Noto Sans KR", sans-serif' }}>
      <KoreanNavigation />

      <main className="site-shell pb-16 pt-28 md:pb-20 md:pt-36">
        <ContactConsultation locale="ko" />

        <div className="mt-12 grid gap-8 border-b border-foreground/10 pb-9 md:grid-cols-3">
          <a href="tel:+17148448494" className="group border-t border-foreground/10 pt-5 md:border-t-0 md:pt-0"><Phone className="mb-4 h-4 w-4 text-muted-foreground" /><div className="text-[11px] text-muted-foreground">전화</div><div className="mt-2 text-[15px] transition-opacity group-hover:opacity-60">+1 714-844-8494</div></a>
          <a href={brand.emailHref} className="group border-t border-foreground/10 pt-5 md:border-t-0 md:pt-0"><Mail className="mb-4 h-4 w-4 text-muted-foreground" /><div className="text-[11px] text-muted-foreground">이메일</div><div className="mt-2 text-[15px] transition-opacity group-hover:opacity-60">{brand.email}</div></a>
          <a href="https://share.google/LBJ1C8zWrZFjJBkVe" target="_blank" rel="noreferrer" className="group border-t border-foreground/10 pt-5 md:border-t-0 md:pt-0"><MapPin className="mb-4 h-4 w-4 text-muted-foreground" /><div className="text-[11px] text-muted-foreground">사무실</div><div className="mt-2 max-w-[260px] text-[15px] leading-6 transition-opacity group-hover:opacity-60">6301 Beach Blvd, Suite 216, Buena Park, CA 90621</div></a>
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
        <SiteDepthSection locale="ko" topic="contact" />
      </main>

      <KoreanFooter />
    </div>
  );
};

export default KoContact;
