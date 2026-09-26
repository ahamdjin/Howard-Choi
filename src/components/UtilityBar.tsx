import { Calculator, UserRound } from "lucide-react";
import { useLocation } from "react-router-dom";
import { brand, type SiteLocale } from "@/data/injurySite";

export default function UtilityBar({ locale }: { locale: SiteLocale }) {
  const { pathname, searchStr, hash } = useLocation();
  const ko = locale === "ko";
  const es = locale === "es";
  const basePath = pathname.replace(/^\/(?:ko|es)(?=\/|$)/, "") || "/";
  const englishPath = basePath;
  const koreanPath = basePath === "/" ? "/ko" : "/ko" + basePath;
  const spanishPath = basePath === "/" ? "/es" : "/es" + basePath;
  const suffix = (searchStr || "") + (hash ? `#${hash.replace(/^#/, "")}` : "");

  const calculatorLabel = ko ? "예상 배상액 계산기" : es ? "Calculadora de indemnización" : "Injury Settlement Calculator";
  const calculatorShort = ko ? "계산기" : es ? "Calculadora" : "Calculator";
  const clientsLabel = ko ? "기존 의뢰인" : es ? "Clientes actuales" : "Current Clients";
  const clientsShort = ko ? "의뢰인" : es ? "Clientes" : "Clients";
  const languageLabel = ko ? "언어" : es ? "Idioma" : "Language";

  return (
    <div aria-label={ko ? "빠른 메뉴" : es ? "Navegación rápida" : "Utility navigation"} className="h-11 border-b border-[#b99a70]/30 bg-[#211c17] text-[#f3eee5]">
      <div className="site-shell flex h-full items-center justify-between gap-2 text-[11px] sm:text-xs">
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-1" aria-label={languageLabel}>
            <a href={englishPath + suffix} hrefLang="en-US" lang="en" aria-current={!ko && !es ? "true" : undefined} className={`inline-flex min-h-9 items-center rounded-sm px-2 transition-colors hover:bg-white/15 ${!ko && !es ? "bg-white/10 text-white" : "text-[#f3eee5]/70"}`}><span className="sm:hidden">EN</span><span className="hidden sm:inline">English</span></a>
            <span aria-hidden="true" className="h-4 w-px bg-white/25" />
            <a href={koreanPath + suffix} hrefLang="ko-US" lang="ko" aria-current={ko ? "true" : undefined} className={`inline-flex min-h-9 items-center rounded-sm px-2 transition-colors hover:bg-white/15 ${ko ? "bg-white/10 text-white" : "text-[#f3eee5]/70"}`}>한국어</a>
            <span aria-hidden="true" className="h-4 w-px bg-white/25" />
            <a href={spanishPath + suffix} hrefLang="es-US" lang="es" aria-current={es ? "true" : undefined} className={`inline-flex min-h-9 items-center rounded-sm px-2 transition-colors hover:bg-white/15 ${es ? "bg-white/10 text-white" : "text-[#f3eee5]/70"}`}>Español</a>
          </div>
        </div>
        <div className="flex items-center gap-3 sm:gap-6">
          <a href={(ko ? "/ko" : es ? "/es" : "") + "/case-value-calculator"} className="inline-flex min-h-11 items-center gap-1.5 hover:text-[#d8bd94]"><Calculator aria-hidden="true" className="h-4 w-4 shrink-0" /><span className="underline decoration-[#b99a70] underline-offset-4"><span className="hidden md:inline">{calculatorLabel}</span><span className="md:hidden">{calculatorShort}</span></span></a>
          <a href={brand.phoneHref} aria-label={ko ? "기존 의뢰인: 사무실에 전화" : es ? "Clientes actuales: llamar a la oficina" : "Current clients: call the office"} className="inline-flex min-h-11 items-center gap-1.5 hover:text-[#d8bd94]"><UserRound aria-hidden="true" className="h-4 w-4 shrink-0" /><span className="underline decoration-[#b99a70] underline-offset-4"><span className="hidden sm:inline">{clientsLabel}</span><span className="sm:hidden">{clientsShort}</span></span></a>
        </div>
      </div>
    </div>
  );
}
