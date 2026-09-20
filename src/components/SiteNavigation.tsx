import { AnimatePresence, motion } from "framer-motion";
import { ArrowRight, ChevronDown, Menu, Phone, X } from "lucide-react";
import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import brandLogo from "@/assets/law-firm/howard-choi-logo.png";
import UtilityBar from "@/components/UtilityBar";
import { brand, practiceAreas, serviceLocations, type SiteLocale } from "@/data/injurySite";

type PanelKey = "practice" | "locations" | null;
type MobileGroup = "practice" | "locations" | null;

const SiteNavigation = ({ locale }: { locale: SiteLocale }) => {
  const { pathname } = useLocation();
  const isCurrent = (path: string) => pathname === path || pathname.startsWith(path + "/");
  const ko = locale === "ko";
  const prefix = ko ? "/ko" : "";
  const homeHref = ko ? "/ko" : "/";
  const href = (path: string) => `${prefix}${path}`;
  const [panel, setPanel] = useState<PanelKey>(null);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [mobileGroup, setMobileGroup] = useState<MobileGroup>(null);
  const [utilityOffset, setUtilityOffset] = useState(0);

  useEffect(() => {
    const updateOffset = () => setUtilityOffset(Math.min(44, Math.max(0, window.scrollY)));
    updateOffset();
    window.addEventListener("scroll", updateOffset, { passive: true });
    return () => window.removeEventListener("scroll", updateOffset);
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
    setMobileGroup(null);
  };

  const labels = ko ? {
    practice: "업무 분야", locations: "지역", attorneys: "변호사", results: "사건 결과", blog: "법률 블로그",
    menu: "메뉴", about: "소개", contact: "문의", allPractices: "전체 업무 분야", allLocations: "전체 지역",
    language: "언어", call: "전화",
  } : {
    practice: "Practice Areas", locations: "Locations", attorneys: "Attorneys", results: "Results", blog: "Blogs",
    menu: "Menu", about: "About", contact: "Contact", allPractices: "All Practice Areas", allLocations: "All Locations",
    language: "Language", call: "Call",
  };

  const topItems = [
    { key: "practice" as const, label: labels.practice, href: href("/practice-areas") },
    { key: "locations" as const, label: labels.locations, href: href("/locations") },
    { key: "attorneys" as const, label: labels.attorneys, href: href("/attorney") },
    { key: "results" as const, label: labels.results, href: href("/results") },
    { key: "blog" as const, label: labels.blog, href: href("/blogs") },

  ];

  const PanelIntro = ({ number, eyebrow, title, body, link, linkLabel }: { number: string; eyebrow: string; title: string; body: string; link: string; linkLabel: string }) => (
    <div className="flex h-full flex-col justify-between border-b border-foreground/12 pb-6 lg:border-b-0 lg:border-r lg:pb-0 lg:pr-10 xl:pr-14">
      <div>
        <div className="flex items-center gap-3 text-[9px] font-medium uppercase tracking-[0.18em] text-foreground/34"><span>{number}</span><span className="h-px w-8 bg-foreground/18" /><span>{eyebrow}</span></div>
        <h2 className="mt-5 max-w-[330px] text-[1.35rem] font-medium leading-[1.14] tracking-[-0.035em] text-foreground xl:text-[1.55rem]">{title}</h2>
        <p className="mt-3 max-w-[320px] text-[12px] leading-5 text-foreground/70">{body}</p>
      </div>
      <a href={link} onClick={closeAll} className="mt-7 inline-flex w-fit items-center gap-2 text-[9px] font-medium uppercase tracking-[0.14em] text-foreground/70 transition-colors hover:text-foreground">{linkLabel}<ArrowRight className="h-3 w-3" /></a>
    </div>
  );

  const PanelLink = ({ number, title, body, link }: { number: string; title: string; body?: string; link: string }) => (
    <a href={link} aria-current={isCurrent(link) ? "page" : undefined} onClick={closeAll} className="group flex min-h-[76px] flex-col justify-between border-b border-foreground/12 py-4 sm:px-5 sm:first:pl-0 xl:min-h-[88px] xl:border-l xl:first:border-l-0">
      <div className="flex items-start justify-between gap-4 text-[9px] tabular-nums text-foreground/28"><span>{number}</span><ArrowRight className="h-3.5 w-3.5 stroke-[1.3] transition-transform duration-300 group-hover:translate-x-1 group-hover:text-foreground" /></div>
      <div className="pt-5"><div className="text-[13px] font-medium tracking-[-0.02em] text-foreground">{title}</div>{body && <p className="mt-2 max-w-[250px] text-[10px] leading-4 text-foreground/70">{body}</p>}</div>
    </a>
  );

  const renderPanel = () => {
    if (panel === "practice") return (
      <div className="site-shell grid gap-8 py-8 lg:grid-cols-[0.42fr_1.58fr] lg:gap-10 lg:py-10 xl:gap-14">
        <PanelIntro number="01" eyebrow={labels.practice} title={ko ? "사고 유형에서 바로 시작하세요." : "Start with the accident, not the legal jargon."} body={ko ? "사고 유형별 정보, 담당 변호사, 관련 지역과 자료를 서로 연결합니다." : "Choose the accident or injury you need help with."} link={href("/practice-areas")} linkLabel={labels.allPractices} />
        <div className="grid border-t border-foreground/12 sm:grid-cols-2 xl:grid-cols-4">{practiceAreas.map((practice, index) => <PanelLink key={practice.slug} number={String(index + 1).padStart(2, "0")} title={ko ? practice.koTitle : practice.title} link={href(`/practice-areas/${practice.slug}`)} />)}</div>
      </div>
    );

    if (panel === "locations") return (
      <div className="site-shell grid gap-8 py-8 lg:grid-cols-[0.42fr_1.58fr] lg:gap-10 lg:py-10 xl:gap-14">
        <PanelIntro number="02" eyebrow={labels.locations} title={ko ? "지역별로 필요한 정보를 연결합니다." : "A local hub for every community we serve."} body={ko ? "각 지역을 관련 업무 분야, 변호사, 결과와 법률 자료에 연결합니다." : "Find guidance and contact information for your community."} link={href("/locations")} linkLabel={labels.allLocations} />
        <div className="grid border-t border-foreground/12 sm:grid-cols-2 lg:grid-cols-3">{serviceLocations.map((item, index) => <PanelLink key={item.slug} number={String(index + 1).padStart(2, "0")} title={ko ? item.koName : item.name} link={href(`/locations/${item.slug}`)} />)}</div>
      </div>
    );

    return null;
  };

  return (
    <>
      <div className="h-11" aria-hidden="true" />
      <AnimatePresence initial={false}>{panel && <motion.div aria-hidden="true" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.2 }} onClick={() => setPanel(null)} style={{ top: 104 - utilityOffset }} className="fixed inset-x-[5px] bottom-[5px] top-[104px] z-[115] hidden bg-black/[0.10] backdrop-blur-[8px] lg:block sm:inset-x-[7px] sm:bottom-[7px]" />}</AnimatePresence>

      <motion.nav initial={{ y: -10, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }} onKeyDown={(event) => { if (event.key === "Escape") { const trigger = event.currentTarget.querySelector<HTMLButtonElement>('[aria-expanded="true"]'); closeAll(); trigger?.focus(); } }} onPointerLeave={(event) => { if (event.pointerType === "mouse") setPanel(null); }} onBlur={(event) => { if (!event.currentTarget.contains(event.relatedTarget)) setPanel(null); }} className="fixed left-0 right-0 top-0 z-[120] overflow-hidden bg-background text-foreground" style={{ top: -utilityOffset, fontFamily: ko ? '"Noto Sans KR", sans-serif' : '"Inter", Arial, sans-serif' }}>
        <UtilityBar locale={locale} />
        <div className="site-shell h-[60px]">
          <div className="hidden h-full grid-cols-[minmax(190px,1fr)_minmax(500px,2.1fr)_minmax(190px,1fr)] items-center lg:grid">
            <a href={homeHref} onClick={closeAll} className="flex min-w-0 items-center gap-2.5 pr-5"><span className="flex h-7 w-7 shrink-0 items-center justify-center overflow-hidden rounded-[2px]"><img src={brandLogo} alt="" width={28} height={28} decoding="async" className="h-full w-full object-contain" /></span><span className="truncate text-[13px] font-semibold tracking-[-0.025em]">{brand.name}</span></a>
            <div className="grid h-full grid-cols-5">{topItems.map((item) => {
              const expandable = item.key === "practice" || item.key === "locations";
              const active = panel === item.key;
              const className = (isCurrent(item.href) ? "border-b-2 border-current bg-foreground/[0.045] " : "border-b-2 border-transparent ") + "flex h-full items-center justify-center gap-1.5 px-2 text-center text-[13px] font-medium transition-colors hover:bg-foreground/[0.045]";
              return expandable ? <button key={item.key} type="button" aria-current={isCurrent(item.href) ? "location" : undefined} onPointerEnter={(event) => { if (event.pointerType === "mouse") setPanel(item.key); }} aria-expanded={active} aria-controls="desktop-navigation-panel" onClick={() => setPanel(active ? null : item.key)} className={className}>{item.label}<ChevronDown className="h-3 w-3" /></button> : <a key={item.key} href={item.href} aria-current={isCurrent(item.href) ? "page" : undefined} onPointerEnter={() => setPanel(null)} onFocus={() => setPanel(null)} onClick={closeAll} className={className}>{item.label}</a>;
            })}</div>
            <div className="flex h-full items-center justify-end gap-3 pl-4"><a href={brand.phoneHref} onMouseEnter={() => setPanel(null)} className="hidden whitespace-nowrap text-[11px] font-medium transition-opacity hover:opacity-55 xl:block">{brand.phoneDisplay}</a><a href={href("/contact")} onMouseEnter={() => setPanel(null)} onFocus={() => setPanel(null)} onClick={closeAll} className="inline-flex h-9 items-center justify-center whitespace-nowrap border border-foreground/15 px-4 text-[10px] font-semibold uppercase tracking-[0.11em] transition-colors hover:bg-foreground hover:text-background">{labels.contact}</a></div>
          </div>

          <div className="flex h-full items-center justify-between gap-3 lg:hidden"><a href={homeHref} onClick={closeAll} className="flex min-w-0 items-center gap-2.5"><span className="flex h-7 w-7 shrink-0 items-center justify-center overflow-hidden rounded-[2px]"><img src={brandLogo} alt="" width={28} height={28} decoding="async" className="h-full w-full object-contain" /></span><span className="max-w-[205px] truncate text-[12px] font-semibold tracking-[-0.025em] sm:max-w-[260px] sm:text-[13px]">{brand.name}</span></a><div className="flex shrink-0 items-center"><a href={brand.phoneHref} aria-label={`${labels.call} ${brand.phoneDisplay}`} className="flex h-[60px] w-11 items-center justify-center"><Phone className="h-4 w-4 stroke-[1.5]" /></a><button type="button" onClick={() => setMobileOpen((current) => !current)} className={`flex h-[60px] w-11 items-center justify-center ${mobileOpen ? "bg-foreground/[0.045]" : ""}`} aria-label={labels.menu} aria-expanded={mobileOpen}>{mobileOpen ? <X className="h-5 w-5 stroke-[1.4]" /> : <Menu className="h-5 w-5 stroke-[1.4]" />}</button></div></div>
        </div>

        <AnimatePresence mode="wait" initial={false}>{panel && <motion.div id="desktop-navigation-panel" key={panel} initial={{ height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }} exit={{ height: 0, opacity: 0 }} transition={{ height: { duration: 0.38, ease: [0.22, 1, 0.36, 1] }, opacity: { duration: 0.18 } }} className="hidden overflow-hidden border-t border-foreground/[0.08] bg-background text-foreground lg:block">{renderPanel()}</motion.div>}</AnimatePresence>

        <AnimatePresence initial={false}>{mobileOpen && <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: `calc(100svh - ${104 - utilityOffset}px)`, opacity: 1 }} exit={{ height: 0, opacity: 0 }} transition={{ duration: 0.38, ease: [0.22, 1, 0.36, 1] }} className="overflow-hidden border-t border-foreground/[0.08] bg-background text-foreground lg:hidden"><div className="site-shell flex h-full flex-col overflow-y-auto pb-6 pt-3">
          <div>
            <button type="button" aria-expanded={mobileGroup === "practice"} aria-controls="mobile-practice-links" onClick={() => setMobileGroup((current) => current === "practice" ? null : "practice")} className="flex w-full items-center justify-between border-b border-foreground/10 py-4 text-left"><span className="text-[1.05rem] font-medium tracking-[-0.025em]">{labels.practice}</span><ChevronDown className={`h-4 w-4 stroke-[1.35] transition-transform ${mobileGroup === "practice" ? "rotate-180" : ""}`} /></button>
            <AnimatePresence initial={false}>{mobileGroup === "practice" && <motion.div id="mobile-practice-links" initial={{ height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }} exit={{ height: 0, opacity: 0 }} className="overflow-hidden border-b border-foreground/10"><div className="grid grid-cols-2 gap-x-5 gap-y-3 py-5 text-[14px] text-foreground/80">{practiceAreas.map((practice) => <a key={practice.slug} href={href(`/practice-areas/${practice.slug}`)} aria-current={isCurrent(href("/practice-areas/" + practice.slug)) ? "page" : undefined} onClick={closeAll} className="flex min-h-11 items-center leading-5">{ko ? practice.koTitle : practice.title}</a>)}</div></motion.div>}</AnimatePresence>
            <button type="button" aria-expanded={mobileGroup === "locations"} aria-controls="mobile-location-links" onClick={() => setMobileGroup((current) => current === "locations" ? null : "locations")} className="flex w-full items-center justify-between border-b border-foreground/10 py-4 text-left"><span className="text-[1.05rem] font-medium tracking-[-0.025em]">{labels.locations}</span><ChevronDown className={`h-4 w-4 stroke-[1.35] transition-transform ${mobileGroup === "locations" ? "rotate-180" : ""}`} /></button>
            <AnimatePresence initial={false}>{mobileGroup === "locations" && <motion.div id="mobile-location-links" initial={{ height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }} exit={{ height: 0, opacity: 0 }} className="overflow-hidden border-b border-foreground/10"><div className="grid grid-cols-2 gap-x-5 gap-y-3 py-5 text-[14px] text-foreground/80">{serviceLocations.map((item) => <a key={item.slug} href={href(`/locations/${item.slug}`)} aria-current={isCurrent(href("/locations/" + item.slug)) ? "page" : undefined} onClick={closeAll} className="flex min-h-11 items-center">{ko ? item.koName : item.name}</a>)}</div></motion.div>}</AnimatePresence>
            {[[labels.attorneys, href("/attorney")], [labels.results, href("/results")], [labels.blog, href("/blogs")], [labels.about, href("/about")], [labels.contact, href("/contact")]].map(([label, itemHref]) => <a key={itemHref} href={itemHref} aria-current={isCurrent(itemHref) ? "page" : undefined} onClick={closeAll} className="block border-b border-foreground/10 py-4 text-[1.05rem] font-medium tracking-[-0.025em]">{label}</a>)}
          </div>
          <div className="mt-auto pt-8"><a href={brand.phoneHref} className="mt-5 flex w-full items-center justify-between border border-foreground/14 px-5 py-4"><span className="text-[9px] font-medium uppercase tracking-[0.12em] text-foreground/52">{labels.call}</span><span className="text-[13px] font-medium">{brand.phoneDisplay}</span></a></div>
        </div></motion.div>}</AnimatePresence>
      </motion.nav>
    </>
  );
};

export default SiteNavigation;
