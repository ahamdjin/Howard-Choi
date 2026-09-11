import { ArrowLeft, Phone } from "lucide-react";
import Navigation from "@/components/Navigation";
import KoreanNavigation from "@/components/KoreanNavigation";
import Footer from "@/components/Footer";
import KoreanFooter from "@/components/KoreanFooter";

type ThankYouProps = {
  locale?: "en" | "ko";
};

const ThankYou = ({ locale = "en" }: ThankYouProps) => {
  const isKorean = locale === "ko";
  const NavigationComponent = isKorean ? KoreanNavigation : Navigation;
  const FooterComponent = isKorean ? KoreanFooter : Footer;
  const homeHref = isKorean ? "/ko" : "/";

  return (
    <div
      className="min-h-screen overflow-x-clip bg-background"
      style={isKorean ? { fontFamily: '"Noto Sans KR", sans-serif' } : undefined}
    >
      <NavigationComponent />

      <main className="flex min-h-[72svh] items-center bg-[#17130f] px-0 pt-[60px] text-[#f3eee5]">
        <div className="site-shell w-full py-20 md:py-28">
          <div className="grid gap-12 border-t border-[#f3eee5]/14 pt-7 lg:grid-cols-[0.72fr_1.28fr] lg:gap-20">
            <div>
              <span className="text-[10px] font-medium uppercase tracking-[0.18em] text-[#f3eee5]/42">
                {isKorean ? "문의 접수 완료" : "Message received"}
              </span>
            </div>

            <div className="max-w-[760px]">
              <h1
                className="editorial-serif text-[clamp(2.7rem,4.2vw,4.5rem)] leading-[0.96] tracking-[-0.026em]"
                style={isKorean ? { fontFamily: '"Noto Serif KR", serif', lineHeight: 1.18, letterSpacing: "-0.045em" } : undefined}
              >
                {isKorean ? "문의 내용을 잘 받았습니다." : "We’ve received your message."}
              </h1>

              <p className="mt-6 max-w-[600px] text-[15px] leading-7 text-[#f3eee5]/62 md:text-[16px]">
                {isKorean
                  ? "보내주신 내용을 확인한 뒤 담당자가 곧 연락드리겠습니다."
                  : "Thank you for reaching out. Our team will review what you sent and contact you soon."}
              </p>

              <div className="mt-10 border-t border-[#f3eee5]/12 pt-6">
                <p className="max-w-[560px] text-[12px] leading-6 text-[#f3eee5]/42">
                  {isKorean
                    ? "긴급하거나 시효와 관련된 사안이라면 온라인 답변을 기다리지 말고 사무실로 직접 전화해 주세요."
                    : "If your matter is urgent or time-sensitive, please call the office rather than waiting for an online response."}
                </p>

                <div className="mt-7 flex flex-col gap-3 sm:flex-row sm:items-center">
                  <a
                    href={homeHref}
                    className="liquid-cta inline-flex w-fit items-center gap-3 rounded-full px-6 py-3 text-[12px] font-medium"
                  >
                    <ArrowLeft className="relative z-10 h-4 w-4" />
                    <span className="relative z-10">{isKorean ? "홈으로 돌아가기" : "Back to home"}</span>
                  </a>
                  <a
                    href="tel:+17146900007"
                    className="inline-flex w-fit items-center gap-2 px-2 py-3 text-[12px] text-[#f3eee5]/64 transition-colors hover:text-[#f3eee5]"
                  >
                    <Phone className="h-3.5 w-3.5" />
                    <span>714-690-0007</span>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>

      <FooterComponent />
    </div>
  );
};

export default ThankYou;
