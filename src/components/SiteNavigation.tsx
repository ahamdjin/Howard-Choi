import { AnimatePresence, motion } from "framer-motion";
import { ChevronDown, Menu, Phone, X } from "lucide-react";
import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import brandLogo from "@/assets/law-firm/howard-choi-logo.png";
import { brand, practiceAreas, serviceLocations, type SiteLocale } from "@/data/injurySite";

type Panel = "practice" | "locations" | null;

const SiteNavigation = ({ locale }: { locale: SiteLocale }) => {
  const { pathname } = useLocation();
  const ko = locale === "ko";
  const prefix = ko ? "/ko" : "";
  const href = (path: string) => `${prefix}${path}`;
  const homeHref = ko ? "/ko" : "/";
  const languageHref = ko ? (pathname.replace(/^\/ko/, "") || "/") : `/ko${pathname === "/" ? "" : pathname}`;

  const [scrolled, setScrolled] = useState(false);
  const [panel, setPanel] = useState<Panel>(null);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    if (!mobileOpen) return;
    const previous = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => { document.body.style.overflow = previous; };
  }, [mobileOpen]);

  const closeAll = () => {
    setPanel(null);
    setMobileOpen(false);
  };

  const labels = ko ? {
    practice: "업무 분야", locations: "지역", attorney: "변호사", about: "소개", resources: "자료", contact: "문의",
    estimate: "무료 사건 가치 확인", menu: "메뉴", allPractice: "전체 업무 분야", allLocations: "전체 지역",
  } : {
    practice: "Practice Areas", locations: "Locations", attorney: "Attorney", about: "About", resources: "Resources", contact: "Contact",
    estimate: "Free Case Estimate", menu: "Menu", allPractice: "All Practice Areas", allLocations: "All Locations",
  };

  return (
    <>
      <header className="fixed inset-x-0 top-0 z-[150] bg-[#f7f6f2] text-[#171717]">
        <motion.div
          animate={{ height: scrolled ? 0 : 32, opacity: scrolled ? 0 : 1 }}
          transition={{ duration: 0.22, ease: [0.22, 1, 0.36, 1] }}
          className="overflow-hidden bg-[#171717] text-white"
        >
          <div className="site-shell flex h-8 items-center justify-between text-[10px] font-medium">
            <a href={languageHref} className="opacity-80 transition-opacity hover:opacity-100">{ko ? "English" : "한국어"}</a>
            <div className="flex items-center gap-5">
              <a href={href("/case-value-calculator")} className="opacity-80 transition-opacity hover:opacity-100">{labels.estimate}</a>
              <a href={brand.phoneHref} className="hidden opacity-80 transition-opacity hover:opacity-100 sm:block">{brand.phoneDisplay}</a>
            </div>
          </div>
        </motion.div>

        <div className="border-b border-black/10 bg-[#f7f6f2]">
          <div className="site-shell flex h-16 items-center justify-between gap-5">
            <a href={homeHref} onClick={closeAll} className="flex min-w-0 items-center gap-2.5">
              <span className="flex h-8 w-8 shrink-0 items-center justify-center overflow-hidden rounded-[2px]"><img src={brandLogo} alt="" width={32} height={32} className="h-full w-full object-contain" /></span>
              <span className="truncate text-[13px] font-semibold tracking-[-0.025em]">{brand.name}</span>
            </a>

            <nav className="hidden h-full items-center lg:flex" aria-label={ko ? "주요 메뉴" : "Primary navigation"}>
              <button type="button" onClick={() => setPanel(panel === "practice" ? null : "practice")} onMouseEnter={() => setPanel("practice")} aria-expanded={panel === "practice"} className="flex h-full items-center gap-1.5 px-4 text-[12px] font-medium hover:bg-black/[0.035]">{labels.practice}<ChevronDown className="h-3.5 w-3.5" /></button>
              <button type="button" onClick={() => setPanel(panel === "locations" ? null : "locations")} onMouseEnter={() => setPanel("locations")} aria-expanded={panel === "locations"} className="flex h-full items-center gap-1.5 px-4 text-[12px] font-medium hover:bg-black/[0.035]">{labels.locations}<ChevronDown className="h-3.5 w-3.5" /></button>
              <a href={href("/attorney")} onMouseEnter={() => setPanel(null)} className="flex h-full items-center px-4 text-[12px] font-medium hover:bg-black/[0.035]">{labels.attorney}</a>
              <a href={href("/about")} onMouseEnter={() => setPanel(null)} className="flex h-full items-center px-4 text-[12px] font-medium hover:bg-black/[0.035]">{labels.about}</a>
              <a href={href("/blogs")} onMouseEnter={() => setPanel(null)} className="flex h-full items-center px-4 text-[12px] font-medium hover:bg-black/[0.035]">{labels.resources}</a>
            </nav>

            <div className="hidden items-center gap-3 lg:flex">
              <a href={brand.phoneHref} className="text-[11px] font-medium">{brand.phoneDisplay}</a>
              <a href={href("/contact")} className="inline-flex min-h-10 items-center bg-[#171717] px-5 text-[10px] font-semibold uppercase tracking-[0.12em] text-white transition-opacity hover:opacity-80">{labels.contact}</a>
            </div>

            <div className="flex items-center lg:hidden">
              <a href={brand.phoneHref} aria-label={brand.phoneDisplay} className="flex h-12 w-11 items-center justify-center"><Phone className="h-4 w-4" /></a>
              <button type="button" onClick={() => setMobileOpen((value) => !value)} aria-label={labels.menu} aria-expanded={mobileOpen} className="flex h-12 w-11 items-center justify-center">{mobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}</button>
            </div>
          </div>
        </div>

        <AnimatePresence initial={false}>
          {panel && (
            <motion.div initial={{ opacity: 0, y: -8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -8 }} transition={{ duration: 0.18 }} onMouseLeave={() => setPanel(null)} className="hidden border-b border-black/10 bg-[#f7f6f2] shadow-[0_18px_45px_rgba(0,0,0,0.08)] lg:block">
              <div className="site-shell grid grid-cols-[0.38fr_1.62fr] gap-10 py-8">
                <div className="border-r border-black/10 pr-8">
                  <div className="text-[10px] font-semibold uppercase tracking-[0.16em] text-black/45">{panel === "practice" ? labels.practice : labels.locations}</div>
                  <h2 className="editorial-serif mt-4 text-[1.8rem] leading-[1.05] tracking-[-0.03em]">{panel === "practice" ? (ko ? "사고 유형에서 시작하세요." : "Start with what happened.") : (ko ? "가까운 지역에서 시작하세요." : "Find help near you.")}</h2>
                  <a href={panel === "practice" ? href("/practice-areas") : href("/locations")} onClick={closeAll} className="mt-6 inline-block text-[11px] font-semibold underline underline-offset-4">{panel === "practice" ? labels.allPractice : labels.allLocations}</a>
                </div>
                <div className="grid grid-cols-3 gap-x-8 gap-y-1">
                  {panel === "practice" ? practiceAreas.map((item) => <a key={item.slug} href={href(`/practice-areas/${item.slug}`)} onClick={closeAll} className="border-b border-black/10 py-4 text-[13px] font-medium transition-transform hover:translate-x-1">{ko ? item.koTitle : item.title}</a>) : serviceLocations.map((item) => <a key={item.slug} href={href(`/locations/${item.slug}`)} onClick={closeAll} className="border-b border-black/10 py-4 text-[13px] font-medium transition-transform hover:translate-x-1">{ko ? item.koName : item.name}</a>)}
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        <AnimatePresence initial={false}>
          {mobileOpen && (
            <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: "calc(100svh - 64px)" }} exit={{ opacity: 0, height: 0 }} className="overflow-hidden border-b border-black/10 bg-[#f7f6f2] lg:hidden">
              <div className="site-shell flex h-full flex-col overflow-y-auto py-4">
                {[
                  [labels.practice, "/practice-areas"], [labels.locations, "/locations"], [labels.attorney, "/attorney"], [labels.about, "/about"], [labels.resources, "/blogs"],
                ].map(([label, path]) => <a key={path} href={href(path)} onClick={closeAll} className="border-b border-black/10 py-4 text-[1.25rem] font-medium tracking-[-0.03em]">{label}</a>)}
                <a href={href("/case-value-calculator")} onClick={closeAll} className="mt-5 inline-flex min-h-12 items-center justify-center border border-black/15 text-sm font-semibold">{labels.estimate}</a>
                <a href={href("/contact")} onClick={closeAll} className="mt-3 inline-flex min-h-12 items-center justify-center bg-[#171717] text-sm font-semibold text-white">{labels.contact}</a>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </header>

      {panel ? <button type="button" aria-label="Close navigation" onClick={() => setPanel(null)} className="fixed inset-0 z-[140] hidden bg-black/10 backdrop-blur-[2px] lg:block" /> : null}
    </>
  );
};

export default SiteNavigation;
