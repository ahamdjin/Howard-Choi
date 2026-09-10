import { AnimatePresence, motion } from "framer-motion";
import { ChevronDown, Menu, Phone, X } from "lucide-react";
import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import brandLogo from "@/assets/law-firm/howard-choi-mark.webp";
import LanguageSwitch from "@/components/LanguageSwitch";
import { brand, practiceAreas, serviceLocations } from "@/data/injurySite";

const primaryLinks = [
  ["변호사", "/ko/attorney"],
  ["사건 결과", "/ko/results"],
  ["법률 블로그", "/ko/blogs"],
  ["소개", "/ko/about"],
] as const;

const KoreanNavigation = () => {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [desktopMenu, setDesktopMenu] = useState<"practice" | "locations" | null>(null);
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 44);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const goTo = (href: string) => {
    navigate(href);
    setOpen(false);
    setDesktopMenu(null);
  };

  const goHome = () => {
    if (location.pathname === "/ko" || location.pathname === "/ko/") window.scrollTo({ top: 0, behavior: "smooth" });
    else navigate("/ko");
    setOpen(false);
  };

  const dark = open || !scrolled;
  const textColor = dark ? "text-white" : "text-foreground";

  return (
    <motion.nav initial={{ y: -60, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ duration: 0.7 }} className={`fixed inset-x-0 top-0 z-[100] transition-all duration-500 ${open ? "bg-[#171717]" : scrolled ? "border-b border-black/[0.06] bg-background/94 shadow-[0_8px_28px_rgba(20,16,12,0.05)] backdrop-blur-xl" : "bg-transparent"}`} style={{ fontFamily: '"Noto Sans KR", sans-serif' }}>
      <div className="site-shell py-4">
        <div className="flex items-center justify-between gap-5">
          <button type="button" onClick={goHome} className={`flex shrink-0 items-center gap-2.5 ${textColor}`}>
            <span className="flex h-7 w-7 items-center justify-center overflow-hidden rounded-[2px]"><img src={brandLogo} alt="" width={28} height={28} decoding="async" className={`h-full w-full object-cover transition-[filter] duration-500 ${dark ? "" : "invert"}`} /></span>
            <span className="text-[13px] font-medium tracking-[-0.025em] xl:text-sm">{brand.name}</span>
          </button>

          <div className="hidden items-center gap-3 lg:flex xl:gap-5">
            <div className="relative" onMouseEnter={() => setDesktopMenu("practice")} onMouseLeave={() => setDesktopMenu(null)}>
              <button type="button" onClick={() => goTo("/ko/practice-areas")} className={`inline-flex items-center gap-1.5 py-3 text-[10px] tracking-[-0.01em] transition-opacity hover:opacity-55 ${textColor}`} aria-expanded={desktopMenu === "practice"}>업무 분야 <ChevronDown className={`h-3 w-3 transition-transform ${desktopMenu === "practice" ? "rotate-180" : ""}`} /></button>
              <AnimatePresence>{desktopMenu === "practice" && <motion.div initial={{ opacity: 0, y: 7 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: 5 }} transition={{ duration: 0.2 }} className="absolute left-1/2 top-full w-[560px] -translate-x-1/2 pt-2"><div className="rounded-[4px] border border-[#211c17]/10 bg-[#f1ede6]/98 p-2 text-[#211c17] shadow-[0_18px_55px_rgba(20,16,12,0.16)] backdrop-blur-xl"><button type="button" onClick={() => goTo("/ko/practice-areas")} className="flex w-full items-center justify-between border-b border-[#211c17]/10 px-4 py-3 text-left text-[11px] text-[#211c17]/48 hover:text-[#211c17]">전체 업무 분야 <span>↗</span></button><div className="grid grid-cols-2 gap-px py-1">{practiceAreas.map((practice) => <button key={practice.slug} type="button" onClick={() => goTo(`/ko/practice-areas/${practice.slug}`)} className="rounded-[2px] px-4 py-3 text-left text-[13px] transition-colors hover:bg-[#211c17]/[0.055]">{practice.koTitle}</button>)}</div></div></motion.div>}</AnimatePresence>
            </div>

            {primaryLinks.slice(0, 2).map(([label, href]) => <button key={href} type="button" onClick={() => goTo(href)} className={`py-3 text-[10px] tracking-[-0.01em] transition-opacity hover:opacity-55 ${textColor} ${location.pathname.startsWith(href) ? "opacity-100" : "opacity-72"}`}>{label}</button>)}

            <div className="relative" onMouseEnter={() => setDesktopMenu("locations")} onMouseLeave={() => setDesktopMenu(null)}>
              <button type="button" onClick={() => goTo("/ko/locations")} className={`inline-flex items-center gap-1.5 py-3 text-[10px] tracking-[-0.01em] transition-opacity hover:opacity-55 ${textColor}`} aria-expanded={desktopMenu === "locations"}>지역 <ChevronDown className={`h-3 w-3 transition-transform ${desktopMenu === "locations" ? "rotate-180" : ""}`} /></button>
              <AnimatePresence>{desktopMenu === "locations" && <motion.div initial={{ opacity: 0, y: 7 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: 5 }} transition={{ duration: 0.2 }} className="absolute left-1/2 top-full w-[330px] -translate-x-1/2 pt-2"><div className="rounded-[4px] border border-[#211c17]/10 bg-[#f1ede6]/98 p-2 text-[#211c17] shadow-[0_18px_55px_rgba(20,16,12,0.16)] backdrop-blur-xl"><button type="button" onClick={() => goTo("/ko/locations")} className="flex w-full items-center justify-between border-b border-[#211c17]/10 px-4 py-3 text-left text-[11px] text-[#211c17]/48 hover:text-[#211c17]">전체 지역 <span>↗</span></button><div className="grid grid-cols-2 gap-px py-1">{serviceLocations.map((item) => <button key={item.slug} type="button" onClick={() => goTo(`/ko/locations/${item.slug}`)} className="rounded-[2px] px-4 py-3 text-left text-[13px] hover:bg-[#211c17]/[0.055]">{item.koName}</button>)}</div></div></motion.div>}</AnimatePresence>
            </div>

            {primaryLinks.slice(2).map(([label, href]) => <button key={href} type="button" onClick={() => goTo(href)} className={`py-3 text-[10px] tracking-[-0.01em] transition-opacity hover:opacity-55 ${textColor} ${location.pathname.startsWith(href) ? "opacity-100" : "opacity-72"}`}>{label}</button>)}

            <LanguageSwitch />
            <a href={brand.phoneHref} className={`inline-flex h-9 shrink-0 items-center gap-2 rounded-full px-4 text-[10px] font-medium shadow-[0_5px_22px_rgba(20,16,12,0.14)] transition-all hover:-translate-y-px ${dark ? "bg-[#ded8cf] text-[#211c17]" : "bg-[#211c17] text-[#f3eee5]"}`} aria-label={`전화 ${brand.phoneDisplay}`}><Phone className="h-3.5 w-3.5" /> {brand.phoneDisplay}</a>
          </div>

          <div className="flex items-center gap-2 lg:hidden"><a href={brand.phoneHref} aria-label={`전화 ${brand.phoneDisplay}`} className={`flex h-9 w-9 items-center justify-center rounded-full border ${dark ? "border-white/18 text-white" : "border-foreground/14 text-foreground"}`}><Phone className="h-4 w-4" /></a><button type="button" className={`flex h-9 w-9 items-center justify-center ${textColor}`} onClick={() => setOpen((value) => !value)} aria-label="메뉴 열기">{open ? <X className="h-6 w-6 stroke-[1.6]" /> : <Menu className="h-5 w-5" />}</button></div>
        </div>

        <AnimatePresence>{open && <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }} exit={{ height: 0, opacity: 0 }} transition={{ duration: 0.38, ease: [0.22, 1, 0.36, 1] }} className="overflow-hidden lg:hidden"><div className="flex min-h-[calc(100svh-64px)] flex-col pb-5 pt-7 text-white"><div className="grid gap-0.5">{[["업무 분야", "/ko/practice-areas"], ["변호사", "/ko/attorney"], ["사건 결과", "/ko/results"], ["지역", "/ko/locations"], ["법률 블로그", "/ko/blogs"], ["소개", "/ko/about"], ["문의", "/ko/contact"]].map(([label, href]) => <button key={href} type="button" onClick={() => goTo(href)} style={{ fontFamily: '"Noto Serif KR", serif' }} className="block w-full border-b border-white/[0.07] py-3.5 text-left text-[clamp(1.4rem,6vw,1.85rem)] font-medium tracking-[-0.035em] text-white transition-opacity active:opacity-55">{label}</button>)}</div><div className="mt-7 grid grid-cols-2 gap-x-4 gap-y-2 border-t border-white/10 pt-5">{serviceLocations.map((item) => <button key={item.slug} type="button" onClick={() => goTo(`/ko/locations/${item.slug}`)} className="py-1.5 text-left text-[11px] text-white/48">{item.koName}</button>)}</div><div className="mt-auto border-t border-white/10 pt-6"><div className="mb-4 flex items-center justify-between gap-4"><span className="text-[10px] text-white/38">언어</span><LanguageSwitch /></div><a href={brand.phoneHref} className="liquid-cta flex w-full items-center justify-center gap-2 rounded-full px-5 py-4 text-[11px] font-medium"><Phone className="relative z-10 h-4 w-4" /><span className="relative z-10">전화 {brand.phoneDisplay}</span></a></div></div></motion.div>}</AnimatePresence>
      </div>
    </motion.nav>
  );
};

export default KoreanNavigation;
