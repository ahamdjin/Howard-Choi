import { AnimatePresence, motion } from "framer-motion";
import { ArrowRight, ChevronDown, Menu, Phone, X } from "lucide-react";
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
    firm: "로펌", resources: "리소스", language: "언어", call: "전화", explore: "둘러보기",
  } : {
    practice: "Practice Areas", locations: "Locations", attorney: "Attorney", results: "Results", blog: "Law Blog",
    menu: "Menu", about: "About", contact: "Contact", allPractices: "All Practice Areas", allLocations: "All Locations",
    firm: "Firm", resources: "Resources", language: "Language", call: "Call", explore: "Explore",
  };

  const topItems = [
    { key: "practice" as const, label: labels.practice, href: href("/practice-areas") },
    { key: "locations" as const, label: labels.locations, href: href("/locations") },
    { key: "attorney" as const, label: labels.attorney, href: href("/attorney") },
    { key: "results" as const, label: labels.results, href: href("/results") },
    { key: "blog" as const, label: labels.blog, href: href("/blogs") },
  ];

  const PanelIntro = ({ number, eyebrow, title, body }: { number: string; eyebrow: string; title: string; body: string }) => (
    <div className="border-b border-foreground/10 pb-6 lg:border-b-0 lg:border-r lg:pb-0 lg:pr-10 xl:pr-14">
      <div className="flex items-center gap-3 text-[9px] font-medium uppercase tracking-[0.16em] text-foreground/34">
        <span>{number}</span><span className="h-px w-8 bg-foreground/16" /><span>{eyebrow}</span>
      </div>
      <h2 className="mt-5 max-w-[330px] text-[1.3rem] font-semibold leading-[1.12] tracking-[-0.035em] text-foreground xl:text-[1.45rem]">{title}</h2>
      <p className="mt-3 max-w-[320px] text-[12px] leading-5 text-foreground/48">{body}</p>
    </div>
  );

  const renderPanel = () => {
    if (panel === "practice") return (
      <div className="site-shell grid gap-8 py-7 lg:grid-cols-[0.48fr_1.52fr] lg:gap-10 lg:py-9 xl:gap-14">
        <PanelIntro number="01" eyebrow={labels.practice} title={ko ? "사고 유형에서 바로 시작하세요." : "Start with what happened."} body={ko ? "사고 유형별 핵심 정보와 관련 상해 업무로 바로 이동할 수 있습니다." : "A direct index of the accident and injury matters the firm is built to address."} />
        <div>
          <div className="grid border-t border-foreground/12 sm:grid-cols-2 xl:grid-cols-4">
            {practiceAreas.map((practice, index) => (
              <a key={practice.slug} href={href(`/practice-areas/${practice.slug}`)} onClick={closeAll} className="group relative min-h-[104px] border-b border-foreground/12 px-0 py-4 sm:px-5 sm:first:pl-0 xl:border-l xl:first:border-l-0">
                <div className="text-[9px] tabular-nums text-foreground/24">{String(index + 1).padStart(2, "0")}</div>
                <div className="mt-4 flex items-end justify-between gap-3">
                  <span className="text-[13px] font-medium tracking-[-0.02em]">{ko ? practice.koTitle : practice.title}</span>
                  <ArrowRight className="h-3.5 w-3.5 shrink-0 stroke-[1.35] text-foreground/28 transition-transform duration-300 group-hover:translate-x-1 group-hover:text-foreground" />
                </div>
              </a>
            ))}
          </div>
          <a href={href("/practice-areas")} onClick={closeAll} className="mt-5 inline-flex items-center gap-2 text-[10px] font-medium uppercase tracking-[0.12em] text-foreground/42 transition-colors hover:text-foreground">{labels.allPractices}<ArrowRight className="h-3 w-3" /></a>
        </div>
      </div>
    );

    if (panel === "locations") return (
      <div className="site-shell grid gap-8 py-7 lg:grid-cols-[0.48fr_1.52fr] lg:gap-10 lg:py-9 xl:gap-14">
        <PanelIntro number="02" eyebrow={labels.locations} title={ko ? "가까운 지역에서 시작하세요." : "Local pages, without the clutter."} body={ko ? "부에나파크를 중심으로 실제 서비스 지역을 명확하게 연결합니다." : "Buena Park at the center, with focused pages for the nearby communities the firm serves."} />
        <div>
          <div className="grid border-t border-foreground/12 sm:grid-cols-2 lg:grid-cols-3">
            {serviceLocations.map((item, index) => (
              <a key={item.slug} href={href(`/locations/${item.slug}`)} onClick={closeAll} className="group min-h-[104px] border-b border-foreground/12 py-4 sm:px-5 sm:first:pl-0 lg:border-l lg:first:border-l-0">
                <div className="text-[9px] tabular-nums text-foreground/24">{String(index + 1).padStart(2, "0")}</div>
                <div className="mt-4 flex items-end justify-between gap-3"><span className="text-[13px] font-medium tracking-[-0.02em]">{ko ? item.koName : item.name}</span><ArrowRight className="h-3.5 w-3.5 stroke-[1.35] text-foreground/28 transition-transform duration-300 group-hover:translate-x-1 group-hover:text-foreground" /></div>
              </a>
            ))}
          </div>
          <a href={href("/locations")} onClick={closeAll} className="mt-5 inline-flex items-center gap-2 text-[10px] font-medium uppercase tracking-[0.12em] text-foreground/42 transition-colors hover:text-foreground">{labels.allLocations}<ArrowRight className="h-3 w-3" /></a>
        </div>
      </div>
    );

    if (panel === "attorney") return (
      <div className="site-shell grid gap-8 py-7 lg:grid-cols-[0.48fr_1.52fr] lg:gap-10 lg:py-9 xl:gap-14">
        <PanelIntro number="03" eyebrow={labels.attorney} title="Howard Choi" body={ko ? "담당 변호사와 로펌의 접근 방식을 확인하세요." : "Meet the attorney and understand the direct approach behind the work."} />
        <div className="grid border-t border-foreground/12 md:grid-cols-3">
          {[
            [ko ? "Howard Choi 변호사" : "Attorney profile", href("/attorney")],
            [labels.about, href("/about")],
            [labels.contact, href("/contact")],
          ].map(([label, itemHref], index) => <a key={itemHref} href={itemHref} onClick={closeAll} className="group min-h-[116px] border-b border-foreground/12 py-5 md:border-l md:px-6 md:first:border-l-0 md:first:pl-0"><div className="text-[9px] tabular-nums text-foreground/24">0{index + 1}</div><div className="mt-5 flex items-center justify-between text-[13px] font-medium"><span>{label}</span><ArrowRight className="h-3.5 w-3.5 stroke-[1.35] text-foreground/28 transition-transform group-hover:translate-x-1 group-hover:text-foreground" /></div></a>)}
        </div>
      </div>
    );

    if (panel === "results") return (
      <div className="site-shell grid gap-8 py-7 lg:grid-cols-[0.48fr_1.52fr] lg:gap-10 lg:py-9 xl:gap-14">
        <PanelIntro number="04" eyebrow={labels.results} title={ko ? "검증된 결과만, 맥락과 함께." : "Verified outcomes, with context."} body={ko ? "확인된 사건 결과만 공개하고 사건별 맥락을 함께 제공합니다." : "A restrained results area built for real outcomes once they are approved for publication."} />
        <div className="grid border-t border-foreground/12 md:grid-cols-2">
          <a href={href("/results")} onClick={closeAll} className="group min-h-[116px] border-b border-foreground/12 py-5 md:pr-8"><div className="text-[9px] text-foreground/24">01</div><div className="mt-5 flex items-center justify-between text-[13px] font-medium"><span>{ko ? "사건 결과 보기" : "View Results"}</span><ArrowRight className="h-3.5 w-3.5 text-foreground/28 transition-transform group-hover:translate-x-1" /></div></a>
          <a href={href("/contact")} onClick={closeAll} className="group min-h-[116px] border-b border-foreground/12 py-5 md:border-l md:pl-8"><div className="text-[9px] text-foreground/24">02</div><div className="mt-5 flex items-center justify-between text-[13px] font-medium"><span>{ko ? "상담 문의" : "Discuss Your Matter"}</span><ArrowRight className="h-3.5 w-3.5 text-foreground/28 transition-transform group-hover:translate-x-1" /></div></a>
        </div>
      </div>
    );

    if (panel === "blog") return (
      <div className="site-shell grid gap-8 py-7 lg:grid-cols-[0.48fr_1.52fr] lg:gap-10 lg:py-9 xl:gap-14">
        <PanelIntro number="05" eyebrow={labels.blog} title={ko ? "사고 후 필요한 답을 더 명확하게." : "Clear answers, without legal clutter."} body={ko ? "실제 질문을 중심으로 정리한 사고·상해 법률 자료입니다." : "Practical guides built around the questions injured people actually need answered."} />
        <div className="grid border-t border-foreground/12 md:grid-cols-2">
          <a href={href("/blogs")} onClick={closeAll} className="group min-h-[116px] border-b border-foreground/12 py-5 md:pr-8"><div className="text-[9px] text-foreground/24">01</div><div className="mt-5 flex items-center justify-between text-[13px] font-medium"><span>{ko ? "모든 글 보기" : "Browse the Law Blog"}</span><ArrowRight className="h-3.5 w-3.5 text-foreground/28 transition-transform group-hover:translate-x-1" /></div></a>
          <a href={href("/contact")} onClick={closeAll} className="group min-h-[116px] border-b border-foreground/12 py-5 md:border-l md:pl-8"><div className="text-[9px] text-foreground/24">02</div><div className="mt-5 flex items-center justify-between text-[13px] font-medium"><span>{labels.contact}</span><ArrowRight className="h-3.5 w-3.5 text-foreground/28 transition-transform group-hover:translate-x-1" /></div></a>
        </div>
      </div>
    );

    if (panel === "menu") return (
      <div className="site-shell py-8 lg:py-10">
        <div className="mb-6 flex items-center gap-3 text-[9px] font-medium uppercase tracking-[0.16em] text-foreground/34"><span>06</span><span className="h-px w-8 bg-foreground/16" /><span>{labels.menu}</span></div>
        <div className="grid border-t border-foreground/12 lg:grid-cols-[1.2fr_1fr_0.8fr_0.8fr]">
          <div className="py-6 lg:pr-8"><div className="text-[10px] font-medium uppercase tracking-[0.12em] text-foreground/38">{labels.practice}</div><div className="mt-5 grid grid-cols-2 gap-x-6 gap-y-3 text-[12px]">{practiceAreas.slice(0, 6).map((practice) => <a key={practice.slug} href={href(`/practice-areas/${practice.slug}`)} onClick={closeAll} className="transition-opacity hover:opacity-50">{ko ? practice.koTitle : practice.title}</a>)}</div><a href={href("/practice-areas")} onClick={closeAll} className="mt-5 inline-flex text-[10px] font-medium text-foreground/42 hover:text-foreground">{labels.allPractices} ↗</a></div>
          <div className="border-t border-foreground/12 py-6 lg:border-l lg:border-t-0 lg:px-8"><div className="text-[10px] font-medium uppercase tracking-[0.12em] text-foreground/38">{labels.locations}</div><div className="mt-5 grid grid-cols-2 gap-x-6 gap-y-3 text-[12px]">{serviceLocations.map((item) => <a key={item.slug} href={href(`/locations/${item.slug}`)} onClick={closeAll} className="transition-opacity hover:opacity-50">{ko ? item.koName : item.name}</a>)}</div></div>
          <div className="border-t border-foreground/12 py-6 lg:border-l lg:border-t-0 lg:px-8"><div className="text-[10px] font-medium uppercase tracking-[0.12em] text-foreground/38">{labels.firm}</div><div className="mt-5 space-y-3 text-[12px]"><a href={href("/attorney")} onClick={closeAll} className="block hover:opacity-50">{labels.attorney}</a><a href={href("/results")} onClick={closeAll} className="block hover:opacity-50">{labels.results}</a><a href={href("/about")} onClick={closeAll} className="block hover:opacity-50">{labels.about}</a><a href={href("/contact")} onClick={closeAll} className="block hover:opacity-50">{labels.contact}</a></div></div>
          <div className="border-t border-foreground/12 py-6 lg:border-l lg:border-t-0 lg:pl-8"><div className="text-[10px] font-medium uppercase tracking-[0.12em] text-foreground/38">{labels.resources}</div><div className="mt-5 space-y-3 text-[12px]"><a href={href("/blogs")} onClick={closeAll} className="block hover:opacity-50">{labels.blog}</a><a href={brand.phoneHref} className="block hover:opacity-50">{labels.call} {brand.phoneDisplay}</a></div><div className="mt-6"><LanguageSwitch /></div></div>
        </div>
      </div>
    );

    return null;
  };

  return (
    <>
      <AnimatePresence initial={false}>
        {panel && (
          <motion.div aria-hidden="true" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.22, ease: "easeOut" }} onClick={() => setPanel(null)} className="fixed inset-x-[5px] bottom-[5px] top-[60px] z-[115] hidden bg-black/[0.09] backdrop-blur-[9px] lg:block sm:inset-x-[7px] sm:bottom-[7px]" />
        )}
      </AnimatePresence>

      <motion.nav initial={{ y: -10, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }} onMouseLeave={() => setPanel(null)} className="fixed left-[5px] right-[5px] top-0 z-[120] overflow-hidden bg-background text-foreground sm:left-[7px] sm:right-[7px]" style={{ fontFamily: ko ? '"Noto Sans KR", sans-serif' : '"Inter", Arial, sans-serif' }}>
        <div className="site-shell h-[60px]">
          <div className="hidden h-full grid-cols-[minmax(220px,0.92fr)_minmax(590px,2.35fr)_minmax(190px,0.73fr)] items-center lg:grid">
            <a href={homeHref} onClick={closeAll} className="flex min-w-0 items-center gap-2.5 pr-5"><span className="flex h-7 w-7 shrink-0 items-center justify-center overflow-hidden rounded-[2px]"><img src={brandLogo} alt="" width={28} height={28} decoding="async" className="h-full w-full object-cover invert" /></span><span className="truncate text-[13px] font-semibold tracking-[-0.025em]">{brand.name}</span></a>

            <div className="grid h-full grid-cols-5">
              {topItems.map((item) => (
                <a key={item.key} href={item.href} onMouseEnter={() => setPanel(item.key)} onFocus={() => setPanel(item.key)} onClick={closeAll} className={`relative flex h-full items-center justify-center gap-1.5 px-2 text-center text-[12px] font-medium tracking-[-0.02em] transition-opacity xl:text-[13px] ${panel && panel !== item.key ? "opacity-48 hover:opacity-100" : "opacity-100 hover:opacity-62"}`}>
                  <span>{item.label}</span>{(item.key === "practice" || item.key === "locations") && <ChevronDown className={`h-3 w-3 stroke-[1.45] transition-transform duration-300 ${panel === item.key ? "rotate-180" : ""}`} />}
                  {panel === item.key && <motion.span layoutId="nav-panel-active" className="absolute inset-x-4 bottom-0 h-px bg-foreground/70" />}
                </a>
              ))}
            </div>

            <div className="flex h-full items-center justify-end gap-5 pl-5">
              <a href={brand.phoneHref} onMouseEnter={() => setPanel(null)} className="hidden whitespace-nowrap text-[11px] font-medium tracking-[-0.01em] transition-opacity hover:opacity-55 xl:block">{brand.phoneDisplay}</a>
              <button type="button" onMouseEnter={() => setPanel("menu")} onFocus={() => setPanel("menu")} onClick={() => setPanel((current) => current === "menu" ? null : "menu")} className="relative flex h-10 w-12 items-center justify-center transition-opacity hover:opacity-55" aria-label={labels.menu} aria-expanded={panel === "menu"}>{panel === "menu" ? <X className="h-[22px] w-[22px] stroke-[1.35]" /> : <Menu className="h-[22px] w-[22px] stroke-[1.35]" />}{panel === "menu" && <motion.span layoutId="nav-menu-active" className="absolute inset-x-2 -bottom-[10px] h-px bg-foreground/70" />}</button>
            </div>
          </div>

          <div className="flex h-full items-center justify-between gap-3 lg:hidden">
            <a href={homeHref} onClick={closeAll} className="flex min-w-0 items-center gap-2.5"><span className="flex h-7 w-7 shrink-0 items-center justify-center overflow-hidden rounded-[2px]"><img src={brandLogo} alt="" width={28} height={28} decoding="async" className="h-full w-full object-cover invert" /></span><span className="max-w-[205px] truncate text-[12px] font-semibold tracking-[-0.025em] sm:max-w-[260px] sm:text-[13px]">{brand.name}</span></a>
            <div className="flex shrink-0 items-center gap-1"><a href={brand.phoneHref} aria-label={`${labels.call} ${brand.phoneDisplay}`} className="flex h-9 w-9 items-center justify-center"><Phone className="h-4 w-4 stroke-[1.5]" /></a><button type="button" onClick={() => setMobileOpen((current) => !current)} className="flex h-9 w-10 items-center justify-center" aria-label={labels.menu} aria-expanded={mobileOpen}>{mobileOpen ? <X className="h-5 w-5 stroke-[1.4]" /> : <Menu className="h-5 w-5 stroke-[1.4]" />}</button></div>
          </div>
        </div>

        <AnimatePresence mode="wait" initial={false}>{panel && <motion.div key={panel} initial={{ height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }} exit={{ height: 0, opacity: 0 }} transition={{ height: { duration: 0.4, ease: [0.22, 1, 0.36, 1] }, opacity: { duration: 0.2 } }} className="hidden overflow-hidden border-y border-foreground/[0.08] bg-background lg:block">{renderPanel()}</motion.div>}</AnimatePresence>

        <AnimatePresence initial={false}>{mobileOpen && <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: "calc(100svh - 60px)", opacity: 1 }} exit={{ height: 0, opacity: 0 }} transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }} className="overflow-hidden border-t border-foreground/[0.08] bg-background lg:hidden"><div className="site-shell flex h-full flex-col overflow-y-auto pb-6 pt-4">
          <div>
            <button type="button" onClick={() => setMobileGroup((current) => current === "practice" ? null : "practice")} className="flex w-full items-center justify-between border-b border-foreground/10 py-4 text-left"><span className="text-[1.25rem] font-semibold tracking-[-0.03em]">{labels.practice}</span><ChevronDown className={`h-4 w-4 stroke-[1.35] transition-transform ${mobileGroup === "practice" ? "rotate-180" : ""}`} /></button>
            <AnimatePresence initial={false}>{mobileGroup === "practice" && <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }} exit={{ height: 0, opacity: 0 }} className="overflow-hidden border-b border-foreground/10"><div className="grid grid-cols-2 gap-x-5 gap-y-3 py-5 text-[12px]">{practiceAreas.map((practice) => <a key={practice.slug} href={href(`/practice-areas/${practice.slug}`)} onClick={closeAll} className="leading-5 text-foreground/68">{ko ? practice.koTitle : practice.title}</a>)}<a href={href("/practice-areas")} onClick={closeAll} className="col-span-2 mt-1 text-[10px] font-medium uppercase tracking-[0.1em] text-foreground/44">{labels.allPractices} ↗</a></div></motion.div>}</AnimatePresence>

            <button type="button" onClick={() => setMobileGroup((current) => current === "locations" ? null : "locations")} className="flex w-full items-center justify-between border-b border-foreground/10 py-4 text-left"><span className="text-[1.25rem] font-semibold tracking-[-0.03em]">{labels.locations}</span><ChevronDown className={`h-4 w-4 stroke-[1.35] transition-transform ${mobileGroup === "locations" ? "rotate-180" : ""}`} /></button>
            <AnimatePresence initial={false}>{mobileGroup === "locations" && <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }} exit={{ height: 0, opacity: 0 }} className="overflow-hidden border-b border-foreground/10"><div className="grid grid-cols-2 gap-x-5 gap-y-3 py-5 text-[12px]">{serviceLocations.map((item) => <a key={item.slug} href={href(`/locations/${item.slug}`)} onClick={closeAll} className="leading-5 text-foreground/68">{ko ? item.koName : item.name}</a>)}<a href={href("/locations")} onClick={closeAll} className="col-span-2 mt-1 text-[10px] font-medium uppercase tracking-[0.1em] text-foreground/44">{labels.allLocations} ↗</a></div></motion.div>}</AnimatePresence>

            {[[labels.attorney, href("/attorney")], [labels.results, href("/results")], [labels.blog, href("/blogs")], [labels.about, href("/about")], [labels.contact, href("/contact")]].map(([label, itemHref]) => <a key={itemHref} href={itemHref} onClick={closeAll} className="block border-b border-foreground/10 py-4 text-[1.25rem] font-semibold tracking-[-0.03em]">{label}</a>)}
          </div>
          <div className="mt-auto pt-8"><div className="flex items-center justify-between gap-4 border-t border-foreground/10 pt-5"><span className="text-[9px] font-medium uppercase tracking-[0.12em] text-foreground/38">{labels.language}</span><LanguageSwitch /></div><a href={brand.phoneHref} className="mt-5 flex w-full items-center justify-between bg-foreground px-5 py-4 text-background"><span className="text-[10px] font-medium uppercase tracking-[0.1em]">{labels.call}</span><span className="text-[13px] font-semibold">{brand.phoneDisplay}</span></a></div>
        </div></motion.div>}</AnimatePresence>
      </motion.nav>
    </>
  );
};

export default SiteNavigation;