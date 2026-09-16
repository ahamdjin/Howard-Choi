import { Calculator, UserRound } from "lucide-react";
import { useLocation } from "react-router-dom";
import { brand, type SiteLocale } from "@/data/injurySite";

export default function UtilityBar({ locale }: { locale: SiteLocale }) {
  const { pathname, searchStr, hash } = useLocation();
  const ko = locale === "ko";
  const englishPath = pathname.replace(/^\/ko(?=\/|$)/, "") || "/";
  const koreanPath = englishPath === "/" ? "/ko" : "/ko" + englishPath;
  const suffix = (searchStr || "") + (hash ? `#${hash.replace(/^#/, "")}` : "");
  return (
    <div aria-label={ko ? "빠른 메뉴" : "Utility navigation"} className="h-11 border-b border-[#b99a70]/30 bg-[#211c17] text-[#f3eee5]">
      <div className="site-shell flex h-full items-center justify-between gap-2 text-[11px] sm:text-xs">
        <div className="flex items-center gap-3">
          <span className="hidden text-[#f3eee5]/75 lg:inline">{ko ? "편한 언어를 선택하세요." : "Choose your language."}</span>
          <div className="flex items-center gap-1" aria-label={ko ? "언어" : "Language"}>
            <a href={englishPath + suffix} hrefLang="en-US" lang="en" aria-current={!ko ? "true" : undefined} className={`inline-flex min-h-9 items-center rounded-sm px-2 transition-colors hover:bg-white/15 ${!ko ? "bg-white/10 text-white" : "text-[#f3eee5]/70"}`}><span className="sm:hidden">EN</span><span className="hidden sm:inline">English</span></a>
            <span aria-hidden="true" className="h-4 w-px bg-white/25" />
            <a href={koreanPath + suffix} hrefLang="ko-US" lang="ko" aria-current={ko ? "true" : undefined} className={`inline-flex min-h-9 items-center rounded-sm px-2 transition-colors hover:bg-white/15 ${ko ? "bg-white/10 text-white" : "text-[#f3eee5]/70"}`}>한국어</a>
          </div>
        </div>
        <div className="flex items-center gap-3 sm:gap-6">
          <a href={(ko ? "/ko" : "") + "/case-value-calculator"} className="inline-flex min-h-11 items-center gap-1.5 hover:text-[#d8bd94]"><Calculator aria-hidden="true" className="h-4 w-4 shrink-0" /><span className="underline decoration-[#b99a70] underline-offset-4"><span className="hidden md:inline">{ko ? "예상 배상액 계산기" : "Injury Settlement Calculator"}</span><span className="md:hidden">{ko ? "계산기" : "Calculator"}</span></span></a>
          <a href={brand.phoneHref} aria-label={ko ? "기존 의뢰인: 사무실에 전화" : "Current clients: call the office"} className="inline-flex min-h-11 items-center gap-1.5 hover:text-[#d8bd94]"><UserRound aria-hidden="true" className="h-4 w-4 shrink-0" /><span className="underline decoration-[#b99a70] underline-offset-4"><span className="hidden sm:inline">{ko ? "기존 의뢰인" : "Current Clients"}</span><span className="sm:hidden">{ko ? "의뢰인" : "Clients"}</span></span></a>
        </div>
      </div>
    </div>
  );
}
