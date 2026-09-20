import { ArrowUpRight, BadgeCheck, MapPin, Star } from "lucide-react";
import type { SiteLocale } from "@/data/injurySite";
import { brand } from "@/data/injurySite";

const ClientSuccessFeature = ({ locale = "en" }: { locale?: SiteLocale }) => {
  const ko = locale === "ko";
  return (
    <section id="reviews" aria-label={ko ? "독립 확인 정보" : "Independent verification"} className="flex min-h-[100svh] w-full bg-[#f7f6f3] text-foreground">
      <div className="site-shell flex w-full flex-col justify-center py-12 lg:py-16">
        <div className="text-center">
          <div className="text-xs text-foreground/65">{ko ? "신뢰 확인" : "Independent verification"}</div>
          <h2 className="editorial-serif mt-4">
            {ko ? "웹사이트 밖에서도 확인할 수 있어야 합니다." : <>Trust should be<br /><span className="text-foreground/42">verifiable beyond this website.</span></>}
          </h2>
          <p className="mx-auto mt-5 max-w-[520px] text-[14px] leading-6 text-foreground/64">
            {ko ? "변호사 등록, 공개 리뷰와 사무실 연락처처럼 핵심 신뢰 정보는 외부 출처에서도 확인할 수 있습니다." : "Attorney licensing, public reviews, and office information should be checkable at their original sources—not just claimed on a law-firm website."}
          </p>
        </div>

        <div className="mt-10 grid w-full overflow-hidden bg-[#e8e6e1] lg:grid-cols-[0.42fr_0.58fr]">
          <div className="relative min-h-[360px] lg:min-h-[520px]">
            <img
              src="https://images.unsplash.com/photo-1521791055366-0d553872125f?auto=format&fit=crop&w=1200&q=84"
              alt={ko ? "법률 상담" : "Client meeting with legal counsel"}
              loading="lazy"
              className="absolute inset-0 h-full w-full object-cover"
            />
            <div className="absolute inset-0 bg-black/16" />
          </div>

          <div className="flex flex-col justify-center p-6 sm:p-8 lg:p-10">
            <a href="https://apps.calbar.ca.gov/attorney/Licensee/Detail/284364" target="_blank" rel="noreferrer" className="group grid grid-cols-[42px_1fr_auto] items-center gap-4 border-t border-foreground/16 py-6">
              <BadgeCheck className="h-5 w-5 stroke-[1.5] text-foreground/60" />
              <div>
                <div className="text-[12px] font-semibold">{ko ? "캘리포니아 주 변호사 협회" : "State Bar of California"}</div>
                <div className="mt-1 text-[12px] text-foreground/52">Howard Choi · Bar No. 284364</div>
              </div>
              <ArrowUpRight className="h-4 w-4 text-foreground/40 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
            </a>

            <a href="https://www.google.com/maps/search/?api=1&query=Buena+Park+Injury+Lawyer+6301+Beach+Blvd+Suite+216" target="_blank" rel="noreferrer" className="group grid grid-cols-[42px_1fr_auto] items-center gap-4 border-t border-foreground/16 py-6">
              <Star className="h-5 w-5 stroke-[1.5] text-foreground/60" />
              <div>
                <div className="text-[12px] font-semibold">{ko ? "Google 비즈니스 프로필" : "Google Business Profile"}</div>
                <div className="mt-1 text-[12px] text-foreground/52">{ko ? "공개 리뷰와 위치 보기" : "View public reviews and location at the source"}</div>
              </div>
              <ArrowUpRight className="h-4 w-4 text-foreground/40 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
            </a>

            <div className="grid grid-cols-[42px_1fr] items-center gap-4 border-y border-foreground/16 py-6">
              <MapPin className="h-5 w-5 stroke-[1.5] text-foreground/60" />
              <div>
                <div className="text-[12px] font-semibold">{ko ? "부에나파크 사무실" : "Buena Park office"}</div>
                <div className="mt-1 text-[12px] leading-5 text-foreground/52">{brand.address}<br />{brand.phoneDisplay}</div>
              </div>
            </div>

            <p className="mt-5 max-w-[560px] text-[11px] leading-5 text-foreground/42">
              {ko ? "검증된 고객 후기 문구는 원본 출처와 확인된 후에만 이 사이트에 표시합니다." : "Client testimonial quotes should only be published here after they can be matched to a genuine source."}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ClientSuccessFeature;
