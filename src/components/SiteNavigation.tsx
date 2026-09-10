import { AnimatePresence, motion } from "framer-motion";
import { ChevronDown, Menu, Phone, X } from "lucide-react";
import { useEffect, useState } from "react";
import brandLogo from "@/assets/law-firm/howard-choi-mark.webp";
import LanguageSwitch from "@/components/LanguageSwitch";
import { brand, practiceAreas, serviceLocations, type SiteLocale } from "@/data/injurySite";

type PanelKey = "practice" | "locations" | "attorney" | "results" | "blog" | "menu" | null;
type MobileGroup = "practice" | "locations" | null;

const SiteNavigation = ({ locale }: { locale: SiteLocale }) => {
  const ko = locale === "ko";
  const prefix = ko ? "/ko" : "";
  const homeHref = ko ? "/ko" : "/";
  const [panel, setPanel] = useState<PanelKey>(null);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [mobileGroup, setMobileGroup] = useState<MobileGroup>(null);
  const href = (path: string) => `${prefix}${path}`;
  const expanded = Boolean(panel) || mobileOpen;

  useEffect(() => {
    if (!mobileOpen) return;
    const previous = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => { document.body.style.overflow = previous; };
  }, [mobileOpen]);

  const closeAll = () => {
    setPanel(null);
    setMobileOpen(false);
    setMobileGroup(null);
  };

  const labels = ko ? {
    practice: "업무 분야", locations: "지역", attorney: "변호사", results: "사건 결과", blog: "법률 블로그",
    menu: "메뉴", about: "소개", contact: "문의", allPractices: "전체 업무 분야", allLocations: "전체 지역",
    firm: "로펌", resources: "리소스", language: "언어", call: "전화",
  } : {
    practice: "Practice Areas", locations: "Locations", attorney: "Attorney", results: "Results", blog: "Law Blog",
    menu: "Menu", about: "About", contact: "Contact", allPractices: "All Practice Areas", allLocations: "All Locations",
    firm: "Firm", resources: "Resources", language: "Language", call: "Call",
  };

  const topItems = [
    { key: "practice" as const, label: labels.practice, href: href("/practice-areas") },
    { key: "locations" as const, label: labels.locations, href: href("/locations") },
    { key: "attorney" as const, label: labels.attorney, href: href("/attorney") },
    { key: "results" as const, label: labels.results, href: href("/results") },
    { key: "blog" as const, label: labels.blog, href: href("/blogs") },
  ];

  const panelIntro = (eyebrow: string, title: string, body: string) => (
    <div className="max-w-[390px]">
      <span className="text-[10px] font-medium uppercase tracking-[0.12em] text-foreground/38">{eyebrow}</span>
      <h2 className="mt-3 text-[clamp(1.65rem,2.2vw,2.2rem)] font-semibold leading-[1.06] tracking-[-0.035em] text-foreground">{title}</h2>
      <p className="mt-3 max-w-[350px] text-[13px] leading-5 text-foreground/52">{body}</p>
    </div>
  );

  const renderPanel = () => {
    if (panel === "practice") return (
      <div className="site-shell grid gap-8 py-7 lg:grid-cols-[0.72fr_1.28fr] lg:py-8">
        {panelIntro(labels.practice, ko ? "사고 유형에 맞는 법률 도움." : "Injury law, organized around what happened.", ko ? "주요 사고 유형과 중대 상해 업무를 한곳에서 확인할 수 있습니다." : "Move directly from the type of accident to the information and representation that fits it.")}
        <div className="grid grid-cols-2 gap-x-8 xl:grid-cols-4">
          {practiceAreas.map((practice, index) => (
            <a key={practice.slug} href={href(`/practice-areas/${practice.slug}`)} onClick={closeAll} className="group flex min-h-[62px] items-center justify-between gap-4 border-b border-foreground/10 py-4 text-[13px] transition-opacity hover:opacity-55">
              <span>{ko ? practice.koTitle : practice.title}</span><span className="text-[10px] tabular-nums text-foreground/28">{String(index + 1).padStart(2, "0")}</span>
            </a>
          ))}
          <a href={href("/practice-areas")} onClick={closeAll} className="col-span-2 mt-5 inline-flex w-fit items-center gap-2 text-[11px] font-medium text-foreground/48 hover:text-foreground xl:col-span-4">{labels.allPractices} <span>↗</span></a>
        </div>
      </div>
    );

    if (panel === "locations") return (
      <div className="site-shell grid gap-8 py-7 lg:grid-cols-[0.72fr_1.28fr] lg:py-8">
        {panelIntro(labels.locations, ko ? "가까운 지역에서 시작하세요." : "Local representation, close to home.", ko ? "부에나파크를 중심으로 인근 여섯 지역의 사고·상해 정보를 제공합니다." : "Buena Park is the center, with focused local pages for the nearby communities we serve.")}
        <div className="grid grid-cols-2 gap-x-8 md:grid-cols-3">
          {serviceLocations.map((item) => <a key={item.slug} href={href(`/locations/${item.slug}`)} onClick={closeAll} className="flex min-h-[62px] items-center justify-between border-b border-foreground/10 py-4 text-[13px] transition-opacity hover:opacity-55"><span>{ko ? item.koName : item.name}</span><span className="text-foreground/26">↗</span></a>)}
          <a href={href("/locations")} onClick={closeAll} className="col-span-2 mt-5 inline-flex w-fit items-center gap-2 text-[11px] font-medium text-foreground/48 hover:text-foreground md:col-span-3">{labels.allLocations} <span>↗</span></a>
        </div>
      </div>
    );

    if (panel === "attorney") return (
      <div className="site-shell grid gap-8 py-7 lg:grid-cols-[0.72fr_1.28fr] lg:py-8">
        {panelIntro(labels.attorney, "Howard Choi", ko ? "담당 변호사와 로펌의 접근 방식을 확인하세요." : "Meet the attorney responsible for the work and the approach behind the firm.")}
        <div className="grid grid-cols-2 gap-x-8 md:grid-cols-3">
          <a href={href("/attorney")} onClick={closeAll} className="border-b border-foreground/10 py-5 text-[13px] hover:opacity-55">{ko ? "Howard Choi 변호사" : "Howard Choi"}</a>
          <a href={href("/about")} onClick={closeAll} className="border-b border-foreground/10 py-5 text-[13px] hover:opacity-55">{labels.about}</a>
          <a href={href("/contact")} onClick={closeAll} className="border-b border-foreground/10 py-5 text-[13px] hover:opacity-55">{labels.contact}</a>
        </div>
      </div>
    );

    if (panel === "results") return (
      <div className="site-shell grid gap-8 py-7 lg:grid-cols-[0.72fr_1.28fr] lg:py-8">
        {panelIntro(labels.results, ko ? "사건 결과를 맥락과 함께." : "Case outcomes, presented with context.", ko ? "확인된 사건 결과가 공개되는 공간입니다." : "A dedicated place for verified outcomes and the context behind them as they are published.")}
        <div className="grid grid-cols-2 gap-x-8">
          <a href={href("/results")} onClick={closeAll} className="border-b border-foreground/10 py-5 text-[13px] hover:opacity-55">{ko ? "사건 결과 보기" : "View Results"}</a>
          <a href={href("/contact")} onClick={closeAll} className="border-b border-foreground/10 py-5 text-[13px] hover:opacity-55">{ko ? "상담 문의" : "Discuss Your Matter"}</a>
        </div>
      </div>
    );

    if (panel === "blog") return (
      <div className="site-shell grid gap-8 py-7 lg:grid-cols-[0.72fr_1.28fr] lg:py-8">
        {panelIntro(labels.blog, ko ? "사고 후 필요한 정보를 더 명확하게." : "Useful answers before and after an accident.", ko ? "실제 질문을 중심으로 정리한 사고·상해 법률 자료입니다." : "Practical legal guides built around the questions injured people actually search for.")}
        <div className="grid grid-cols-2 gap-x-8">
          <a href={href("/blogs")} onClick={closeAll} className="border-b border-foreground/10 py-5 text-[13px] hover:opacity-55">{ko ? "모든 글 보기" : "Browse the Law Blog"}</a>
          <a href={href("/contact")} onClick={closeAll} className="border-b border-foreground/10 py-5 text-[13px] hover:opacity-55">{labels.contact}</a>
        </div>
      </div>
    );

    if (panel === "menu") return (
      <div className="site-shell py-8">
        <div className="grid gap-8 lg:grid-cols-[1.05fr_1fr_0.75fr_0.75fr] lg:gap-12">
          <div><span className="text-[10px] font-medium uppercase tracking-[0.12em] text-foreground/38">{labels.practice}</span><div className="mt-4 grid grid-cols-2 gap-x-5 gap-y-3 text-[13px]">{practiceAreas.slice(0, 6).map((practice) => <a key={practice.slug} href={href(`/practice-areas/${practice.slug}`)} onClick={closeAll} className="hover:opacity-55">{ko ? practice.koTitle : practice.title}</a>)}</div><a href={href("/practice-areas")} onClick={closeAll} className="mt-5 inline-flex text-[11px] font-medium text-foreground/46 hover:text-foreground">{labels.allPractices} ↗</a></div>
          <div><span className="text-[10px] font-medium uppercase tracking-[0.12em] text-foreground/38">{labels.locations}</span><div className="mt-4 grid grid-cols-2 gap-x-5 gap-y-3 text-[13px]">{serviceLocations.map((item) => <a key={item.slug} href={href(`/locations/${item.slug}`)} onClick={closeAll} className="hover:opacity-55">{ko ? item.koName : item.name}</a>)}</div></div>
          <div><span className="text-[10px] font-medium uppercase tracking-[0.12em] text-foreground/38">{labels.firm}</span><div className="mt-4 space-y-3 text-[13px]"><a href={href("/attorney")} onClick={closeAll} className="block hover:opacity-55">{labels.attorney}</a><a href={href("/results")} onClick={closeAll} className="block hover:opacity-55">{labels.results}</a><a href={href("/about")} onClick={closeAll} className="block hover:opacity-55">{labels.about}</a><a href={href("/contact")} onClick={closeAll} className="block hover:opacity-55">{labels.contact}</a></div></div>
          <div><span className="text-[10px] font-medium uppercase tracking-[0.12em] text-foreground/38">{labels.resources}</span><div className="mt-4 space-y-3 text-[13px]"><a href={href("/blogs")} onClick={closeAll} className="block hover:opacity-55">{labels.blog}</a><a href={brand.phoneHref} className="block hover:opacity-55">{labels.call} {brand.phoneDisplay}</a></div><div className="mt-5"><LanguageSwitch /></div></div>
        </div>
      </div>
    );

    return null;
  };

  return (
    <>
      <AnimatePresence initial={false}>
        {panel && (
          <motion.div
            aria-hidden="true"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.24, ease: "easeOut" }}
            onClick={() => setPanel(null)}
            className="fixed inset-x-[5px] bottom-[5px] top-[60px] z-[115] hidden bg-black/[0.07] backdrop-blur-[7px] lg:block sm:inset-x-[7px] sm:bottom-[7px]"
          />
        )}
      </AnimatePresence>

      <motion.nav
        initial={{ y: -10, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
        onMouseLeave={() => setPanel(null)}
        className={`fixed left-[5px] right-[5px] top-0 z-[120] overflow-hidden bg-background text-foreground transition-[border-radius] duration-300 sm:left-[7px] sm:right-[7px] ${expanded ? "rounded-b-[16px] sm:rounded-b-[18px]" : "rounded-none"}`}
        style={{ fontFamily: ko ? '"Noto Sans KR", sans-serif' : '"Inter", Arial, sans-serif' }}
      >
        <div className="site-shell h-[60px]">
          <div className="hidden h-full grid-cols-[minmax(205px,0.95fr)_minmax(560px,2.25fr)_minmax(185px,0.8fr)] items-center lg:grid">
            <a href={homeHref} onClick={closeAll} className="flex min-w-0 items-center gap-2.5 pr-5"><span className="flex h-7 w-7 shrink-0 items-center justify-center overflow-hidden rounded-[2px]"><img src={brandLogo} alt="" width={28} height={28} decoding="async" className="h-full w-full object-cover invert" /></span><span className="truncate text-[13px] font-semibold tracking-[-0.025em]">{brand.name}</span></a>

            <div className="grid h-full grid-cols-5">
              {topItems.map((item) => (
                <a key={item.key} href={item.href} onMouseEnter={() => setPanel(item.key)} onFocus={() => setPanel(item.key)} onClick={closeAll} className={`group flex h-full items-center justify-center gap-1.5 px-2 text-center text-[12px] font-medium tracking-[-0.02em] transition-opacity xl:text-[13px] ${panel && panel !== item.key ? "opacity-60 hover:opacity-100" : "opacity-100 hover:opacity-60"}`}>
                  <span>{item.label}</span>{(item.key === "practice" || item.key === "locations") && <ChevronDown className={`h-3 w-3 stroke-[1.45] transition-transform duration-300 ${panel === item.key ? "rotate-180" : ""}`} />}
                </a>
              ))}
            </div>

            <div className="flex h-full items-center justify-end gap-5 pl-5">
              <a href={brand.phoneHref} onMouseEnter={() => setPanel(null)} className="hidden whitespace-nowrap text-[11px] font-medium tracking-[-0.01em] transition-opacity hover:opacity-55 xl:block">{brand.phoneDisplay}</a>
              <button type="button" onMouseEnter={() => setPanel("menu")} onFocus={() => setPanel("menu")} onClick={() => setPanel((current) => current === "menu" ? null : "menu")} className="flex h-10 w-12 items-center justify-center transition-opacity hover:opacity-55" aria-label={labels.menu} aria-expanded={panel === "menu"}>{panel === "menu" ? <X className="h-[22px] w-[22px] stroke-[1.35]" /> : <Menu className="h-[22px] w-[22px] stroke-[1.35]" />}</button>
            </div>
          </div>

          <div className="flex h-full items-center justify-between gap-3 lg:hidden">
            <a href={homeHref} onClick={closeAll} className="flex min-w-0 items-center gap-2.5"><span className="flex h-7 w-7 shrink-0 items-center justify-center overflow-hidden rounded-[2px]"><img src={brandLogo} alt="" width={28} height={28} decoding="async" className="h-full w-full object-cover invert" /></span><span className="max-w-[205px] truncate text-[12px] font-semibold tracking-[-0.025em] sm:max-w-[260px] sm:text-[13px]">{brand.name}</span></a>
            <div className="flex shrink-0 items-center gap-1"><a href={brand.phoneHref} aria-label={`${labels.call} ${brand.phoneDisplay}`} className="flex h-9 w-9 items-center justify-center"><Phone className="h-4 w-4 stroke-[1.5]" /></a><button type="button" onClick={() => setMobileOpen((current) => !current)} className="flex h-9 w-10 items-center justify-center" aria-label={labels.menu} aria-expanded={mobileOpen}>{mobileOpen ? <X className="h-5 w-5 stroke-[1.4]" /> : <Menu className="h-5 w-5 stroke-[1.4]" />}</button></div>
          </div>
        </div>

        <AnimatePresence mode="wait" initial={false}>{panel && <motion.div key={panel} initial={{ height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }} exit={{ height: 0, opacity: 0 }} transition={{ height: { duration: 0.42, ease: [0.22, 1, 0.36, 1] }, opacity: { duration: 0.22 } }} className="hidden overflow-hidden border-t border-foreground/[0.08] bg-background lg:block">{renderPanel()}</motion.div>}</AnimatePresence>

        <AnimatePresence initial={false}>{mobileOpen && <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: "calc(100svh - 60px)", opacity: 1 }} exit={{ height: 0, opacity: 0 }} transition={{ duration: 0.42, ease: [0.22, 1, 0.36, 1] }} className="overflow-hidden border-t border-foreground/[0.08] bg-background lg:hidden"><div className="flex h-full flex-col overflow-y-auto pb-6 pt-4">
          <div>
            <button type="button" onClick={() => setMobileGroup((current) => current === "practice" ? null : "practice")} className="flex w-full items-center justify-between border-b border-foreground/10 py-4 text-left"><span className="text-[1.45rem] font-semibold tracking-[-0.035em]">{labels.practice}</span><ChevronDown className={`h-4 w-4 stroke-[1.35] transition-transform ${mobileGroup === "practice" ? "rotate-180" : ""}`} /></button>
            <AnimatePresence initial={false}>{mobileGroup === "practice" && <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }} exit={{ height: 0, opacity: 0 }} className="overflow-hidden border-b border-foreground/10"><div className="grid grid-cols-2 gap-x-5 gap-y-3 py-5 text-[12px]">{practiceAreas.map((practice) => <a key={practice.slug} href={href(`/practice-areas/${practice.slug}`)} onClick={closeAll} className="leading-5 text-foreground/68">{ko ? practice.koTitle : practice.title}</a>)}<a href={href("/practice-areas")} onClick={closeAll} className="col-span-2 mt-1 text-[11px] font-medium text-foreground/44">{labels.allPractices} ↗</a></div></motion.div>}</AnimatePresence>

            <button type="button" onClick={() => setMobileGroup((current) => current === "locations" ? null : "locations")} className="flex w-full items-center justify-between border-b border-foreground/10 py-4 text-left"><span className="text-[1.45rem] font-semibold tracking-[-0.035em]">{labels.locations}</span><ChevronDown className={`h-4 w-4 stroke-[1.35] transition-transform ${mobileGroup === "locations" ? "rotate-180" : ""}`} /></button>
            <AnimatePresence initial={false}>{mobileGroup === "locations" && <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }} exit={{ height: 0, opacity: 0 }} className="overflow-hidden border-b border-foreground/10"><div className="grid grid-cols-2 gap-x-5 gap-y-3 py-5 text-[12px]">{serviceLocations.map((item) => <a key={item.slug} href={href(`/locations/${item.slug}`)} onClick={closeAll} className="leading-5 text-foreground/68">{ko ? item.koName : item.name}</a>)}<a href={href("/locations")} onClick={closeAll} className="col-span-2 mt-1 text-[11px] font-medium text-foreground/44">{labels.allLocations} ↗</a></div></motion.div>}</AnimatePresence>

            {[[labels.attorney, href("/attorney")], [labels.results, href("/results")], [labels.blog, href("/blogs")], [labels.about, href("/about")], [labels.contact, href("/contact")]].map(([label, itemHref]) => <a key={itemHref} href={itemHref} onClick={closeAll} className="block border-b border-foreground/10 py-4 text-[1.45rem] font-semibold tracking-[-0.035em]">{label}</a>)}
          </div>
          <div className="mt-auto pt-8"><div className="flex items-center justify-between gap-4 border-t border-foreground/10 pt-5"><span className="text-[10px] font-medium uppercase tracking-[0.12em] text-foreground/38">{labels.language}</span><LanguageSwitch /></div><a href={brand.phoneHref} className="mt-5 flex w-full items-center justify-between rounded-[3px] bg-foreground px-5 py-4 text-background"><span className="text-[11px] font-medium">{labels.call}</span><span className="text-[13px] font-semibold">{brand.phoneDisplay}</span></a></div>
        </div></motion.div>}</AnimatePresence>
      </motion.nav>
    </>
  );
};

export default SiteNavigation;