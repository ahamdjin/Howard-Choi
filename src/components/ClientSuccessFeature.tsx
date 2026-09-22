import { useRef, useState } from "react";
import { ArrowLeft, ArrowRight, ArrowUpRight } from "lucide-react";
import { clientReviews } from "@/data/clientReviews";
import type { SiteLocale } from "@/data/injurySite";

const ClientSuccessFeature = ({ locale = "en" }: { locale?: SiteLocale }) => {
  const ko = locale === "ko";
  const [active, setActive] = useState(0);
  const touchStart = useRef<{ x: number; y: number } | null>(null);
  const items = clientReviews[locale];
  const review = items[active];
  const move = (direction: number) => setActive((value) => (value + direction + items.length) % items.length);
  return (
    <section id="reviews" aria-label={ko ? "의뢰인 경험" : "Client experiences"} aria-roledescription="carousel" className="flex min-h-[100svh] w-full bg-[#f7f6f3] text-foreground">
      <div className="site-shell flex w-full flex-col justify-center py-12 lg:py-16">
        <div className="text-center">
          <div className="text-xs text-foreground/65">{ko ? "의뢰인 경험" : "Client Experience"}</div>
          <h2 className="editorial-serif mt-4">{ko ? "복잡한 순간에도 명확한 안내." : <>Clear guidance<br /><span className="text-foreground/42">when the case feels complicated.</span></>}</h2>
          <p className="mx-auto mt-5 max-w-[430px] text-[14px] leading-6 text-foreground/64">{ko ? "의료 기록, 보험 문제와 다음 법적 단계까지 이해하기 쉽게 안내합니다." : "Good representation should make the process easier to understand, from medical records and insurance questions to settlement decisions and the next legal step."}</p>
          <a href={ko ? "/ko/contact" : "/contact"} className="mt-6 inline-flex min-h-11 items-center gap-2 bg-[#171717] px-5 py-3 text-sm font-medium text-white">{ko ? "상담 시작" : "Start a Conversation"}<ArrowUpRight className="h-4 w-4" /></a>
        </div>
        <div className="mt-10 grid w-full bg-[#e8e6e1] lg:grid-cols-[0.34fr_0.66fr]">
          <div className="relative aspect-[16/9] lg:aspect-auto">
            <img src="https://images.unsplash.com/photo-1521791055366-0d553872125f?auto=format&fit=crop&w=1200&q=84" alt={ko ? "법률 상담" : "Client meeting with personal injury legal counsel"} loading="lazy" className="absolute inset-0 h-full w-full object-cover" />
          </div>
          <div className="flex min-w-0 flex-col justify-between p-6 sm:p-8 lg:min-h-[430px] lg:p-10"
            onTouchStart={(event) => { const touch = event.touches[0]; touchStart.current = { x: touch.clientX, y: touch.clientY }; }}
            onTouchEnd={(event) => { if (!touchStart.current) return; const touch = event.changedTouches[0]; const dx = touch.clientX - touchStart.current.x; const dy = touch.clientY - touchStart.current.y; if (Math.abs(dx) > 50 && Math.abs(dx) > Math.abs(dy)) move(dx < 0 ? 1 : -1); touchStart.current = null; }}
            onTouchCancel={() => { touchStart.current = null; }}>
            <div aria-live="polite" aria-atomic="true" role="group" aria-roledescription="slide" aria-label={(active + 1) + " / " + items.length}>
              <blockquote className="editorial-serif text-[clamp(1.5rem,2.1vw,2.15rem)] leading-[1.35]">“{review.text}”</blockquote>
              <div className="mt-6 text-sm font-semibold">{review.name}</div>
              <div className="mt-1 text-sm text-foreground/70">{review.location}</div>
            </div>
            <div className="mt-8 flex flex-wrap items-center justify-between gap-4 border-t border-foreground/20 pt-5">
              <span className="inline-flex min-h-11 items-center text-xs text-foreground/48">{ko ? "실제 의뢰인 후기" : "Real client testimonial"}</span>
              <div className="flex items-center gap-3">
                <button type="button" onClick={() => move(-1)} aria-label={ko ? "이전 후기" : "Previous review"} className="flex h-11 w-11 items-center justify-center rounded-full border border-foreground/35 hover:bg-white"><ArrowLeft className="h-4 w-4" /></button>
                <span className="text-xs tabular-nums">{active + 1} / {items.length}</span>
                <button type="button" onClick={() => move(1)} aria-label={ko ? "다음 후기" : "Next review"} className="flex h-11 w-11 items-center justify-center rounded-full border border-foreground/35 hover:bg-white"><ArrowRight className="h-4 w-4" /></button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
export default ClientSuccessFeature;
