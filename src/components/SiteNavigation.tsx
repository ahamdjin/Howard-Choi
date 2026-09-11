import { AnimatePresence, motion } from "framer-motion";
import { ArrowRight, ChevronDown, Menu, Phone, X } from "lucide-react";
import { useEffect, useState } from "react";
import brandLogo from "@/assets/law-firm/howard-choi-mark.webp";
import LanguageSwitch from "@/components/LanguageSwitch";
import { brand, practiceAreas, serviceLocations, type SiteLocale } from "@/data/injurySite";

type PanelKey = "practice" | "locations" | "attorneys" | "results" | "blog" | "menu" | null;
type MobileGroup = "practice" | "locations" | null;

const SiteNavigation = ({ locale }: { locale: SiteLocale }) => {
  const ko = locale === "ko";
  const prefix = ko ? "/ko" : "";
  const homeHref = ko ? "/ko" : "/";
  const href = (path: string) => `${prefix}${path}`;
  const [panel, setPanel] = useState<PanelKey>(null);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [mobileGroup, setMobileGroup] = useState<MobileGroup>(null);

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
    firm: "로펌", language: "언어", call: "전화", viewAll: "전체 보기",
  } : {
    practice: "Practice Areas", locations: "Locations", attorneys: "Attorneys", results: "Results", blog: "Law Blog",
    menu: "Menu", about: "About", contact: "Contact", allPractices: "All Practice Areas", allLocations: "All Locations",
    firm: "Firm", language: "Language", call: "Call", viewAll: "View all",
  };

  const topItems = [
    { key: "practice" as const, label: labels.practice, href: href("/practice-areas") },
    { key: "locations" as const, label: labels.locations, href: href("/locations") },
    { key: "attorneys" as const, label: labels.attorneys, href: href("/attorney") },
    { key: "results" as const, label: labels.results, href: href("/results") },
    { key: "blog" as const, label: labels.blog, href: href("/blogs") },
  ];

  const PanelIntro = ({ number, eyebrow, title, body, link, linkLabel }: { number: string; eyebrow: string; title: string; body: string; link: string; linkLabel: string }) => (
    <div className="flex h-full flex-col justify-between border-b border-white/12 pb-6 lg:border-b-0 lg:border-r lg:pb-0 lg:pr-10 xl:pr-14">
      <div>
        <div className="flex items-center gap-3 text-[9px] font-medium uppercase tracking-[0.18em] text-white/34"><span>{number}</span><span className="h-px w-8 bg-white/18" /><span>{eyebrow}</span></div>
        <h2 className="mt-5 max-w-[330px] text-[1.35rem] font-medium leading-[1.14] tracking-[-0.035em] text-white xl:text-[1.55rem]">{title}</h2>
        <p className="mt-3 max-w-[320px] text-[12px] leading-5 text-white/48">{body}</p>
      </div>
      <a href={link} onClick={closeAll} className="mt-7 inline-flex w-fit items-center gap-2 text-[9px] font-medium uppercase tracking-[0.14em] text-white/46 transition-colors hover:text-white">{linkLabel}<ArrowRight className="h-3 w-3" /></a>
    </div>
  );

  const PanelLink = ({ number, title, body, link }: { number: string; title: string; body?: string; link: string }) => (
    <a href={link} onClick={closeAll} className="group flex min-h-[118px] flex-col justify-between border-b border-white/12 py-4 sm:px-5 sm:first:pl-0 xl:min-h-[132px] xl:border-l xl:first:border-l-0">
      <div className="flex items-start justify-between gap-4 text-[9px] tabular-nums text-white/28"><span>{number}</span><ArrowRight className="h-3.5 w-3.5 stroke-[1.3] transition-transform duration-300 group-hover:translate-x-1 group-hover:text-white" /></div>
      <div className="pt-5"><div className="text-[13px] font-medium tracking-[-0.02em] text-white">{title}</div>{body && <p className="mt-2 max-w-[250px] text-[10px] leading-4 text-white/40">{body}</p>}</div>
    </a>
  );

  const renderPanel = () => {
    if (panel === "practice") return (
      <div className="site-shell grid gap-8 py-8 lg:grid-cols-[0.42fr_1.58fr] lg:gap-10 lg:py-10 xl:gap-14">
        <PanelIntro number="01" eyebrow={labels.practice} title={ko ? "사고 유형에서 바로 시작하세요." : "Start with the accident, not the legal jargon."} body={ko ? "사고 유형별 정보, 담당 변호사, 관련 지역과 자료를 서로 연결합니다." : "Each practice page connects the claim, the attorneys, the locations served, results, and useful legal guides."} link={href("/practice-areas")} linkLabel={labels.allPractices} />
        <div className="grid border-t border-white/12 sm:grid-cols-2 xl:grid-cols-4">
          {practiceAreas.map((practice, index) => <PanelLink key={practice.slug} number={String(index + 1).padStart(2, "0")} title={ko ? practice.koTitle : practice.title} body={ko ? practice.koDescription : practice.description} link={href(`/practice-areas/${practice.slug}`)} />)}
        </div>
      </div>
    );

    if (panel === "locations") return (
      <div className="site-shell grid gap-8 py-8 lg:grid-cols-[0.42fr_1.58fr] lg:gap-10 lg:py-10 xl:gap-14">
        <PanelIntro number="02" eyebrow={labels.locations} title={ko ? "지역별로 필요한 정보를 연결합니다." : "A local hub for every community we serve."} body={ko ? "각 지역을 관련 업무 분야, 변호사, 결과와 법률 자료에 연결합니다." : "Location pages are built to connect local context with practice areas, attorneys, results, and resources — not duplicate city names."} link={href("/locations")} linkLabel={labels.allLocations} />
        <div className="grid border-t border-white/12 sm:grid-cols-2 lg:grid-cols-3">
          {serviceLocations.map((item, index) => <PanelLink key={item.slug} number={String(index + 1).padStart(2, "0")} title={ko ? item.koName : item.name} body={ko ? item.koDescription : item.description} link={href(`/locations/${item.slug}`)} />)}
        </div>
      </div>
    );

    if (panel === "attorneys") return (
      <div className="site-shell grid gap-8 py-8 lg:grid-cols-[0.42fr_1.58fr] lg:gap-10 lg:py-10 xl:gap-14">
        <PanelIntro number="03" eyebrow={labels.attorneys} title={ko ? "사건 뒤에 있는 사람을 보여줍니다." : "Meet the people responsible for the work."} body={ko ? "현재 확인된 프로필부터 시작하고 추가 변호사 프로필을 확장할 수 있는 구조입니다." : "The team area is built for multiple attorney profiles, with room for portraits, credentials, focus areas, results, and articles."} link={href("/attorney")} linkLabel={ko ? "변호사 보기" : "Meet the attorneys"} />
        <div className="grid border-t border-white/12 md:grid-cols-3">
          <PanelLink number="01" title="Howard Choi" body={ko ? "확인된 경력과 프로필 정보를 위한 기본 변호사 페이지." : "Primary attorney profile with space for verified credentials, case experience, and media."} link={href("/attorney")} />
          <PanelLink number="02" title={ko ? "추가 변호사 프로필" : "Additional attorney profiles"} body={ko ? "새 변호사 사진과 경력을 바로 추가할 수 있는 팀 구조." : "The page is ready to add more firm attorneys without redesigning the site."} link={href("/attorney")} />
          <PanelLink number="03" title={labels.about} body={ko ? "로펌의 구조와 접근 방식." : "How the firm, practice areas, locations, and team fit together."} link={href("/about")} />
        </div>
      </div>
    );

    if (panel === "results") return (
      <div className="site-shell grid gap-8 py-8 lg:grid-cols-[0.42fr_1.58fr] lg:gap-10 lg:py-10 xl:gap-14">
        <PanelIntro number="04" eyebrow={labels.results} title={ko ? "실제 결과를 맥락과 함께." : "Proof should connect back to the work."} body={ko ? "실제 사건 결과는 담당 변호사, 업무 분야와 지역에 연결할 수 있습니다." : "Verified outcomes can be tied to the responsible attorney, relevant practice area, location, and related legal guidance."} link={href("/results")} linkLabel={ko ? "사건 결과 보기" : "View results"} />
        <div className="grid border-t border-white/12 md:grid-cols-3">
          <PanelLink number="01" title={ko ? "사건 결과" : "Case outcomes"} body={ko ? "확인된 결과가 제공되는 대로 게시합니다." : "A structured home for verified settlements and verdicts once supplied."} link={href("/results")} />
          <PanelLink number="02" title={labels.practice} body={ko ? "결과를 관련 업무 분야에 연결합니다." : "Move from a result to the relevant type of injury claim."} link={href("/practice-areas")} />
          <PanelLink number="03" title={labels.contact} body={ko ? "새 사건 상담을 시작합니다." : "Start a conversation about a new matter."} link={href("/contact")} />
        </div>
      </div>
    );

    if (panel === "blog") return (
      <div className="site-shell grid gap-8 py-8 lg:grid-cols-[0.42fr_1.58fr] lg:gap-10 lg:py-10 xl:gap-14">
        <PanelIntro number="05" eyebrow={labels.blog} title={ko ? "사고 뒤의 질문을 명확하게." : "Useful answers that connect to the rest of the site."} body={ko ? "가이드는 관련 업무 분야, 지역, 변호사와 자연스럽게 연결됩니다." : "Guides should not live alone. They connect back to the practice area, local page, attorney, and next action."} link={href("/blogs")} linkLabel={ko ? "법률 블로그 보기" : "Browse the Law Blog"} />
        <div className="grid border-t border-white/12 md:grid-cols-3">
          <PanelLink number="01" title={ko ? "사고 후 해야 할 일" : "After an accident"} body={ko ? "초기 단계와 증거 보존에 관한 실용적인 가이드." : "Practical guidance around first steps, evidence, and insurance."} link={href("/blogs")} />
          <PanelLink number="02" title={ko ? "보험과 청구" : "Insurance & claims"} body={ko ? "보험 연락과 청구 과정에 관한 자료." : "Clear explanations of coverage, adjusters, and claim decisions."} link={href("/blogs")} />
          <PanelLink number="03" title={labels.contact} body={ko ? "온라인 정보보다 구체적인 도움이 필요할 때." : "When the question needs a conversation rather than another article."} link={href("/contact")} />
        </div>
      </div>
    );

    if (panel === "menu") return (
      <div className="site-shell py-8 lg:py-10">
        <div className="mb-6 flex items-center gap-3 text-[9px] font-medium uppercase tracking-[0.18em] text-white/34"><span>06</span><span className="h-px w-8 bg-white/18" /><span>{labels.menu}</span></div>
        <div className="grid border-t border-white/12 lg:grid-cols-[1.2fr_1fr_0.82fr_0.82fr]">
          <div className="py-6 lg:pr-8"><div className="text-[9px] font-medium uppercase tracking-[0.14em] text-white/38">{labels.practice}</div><div className="mt-5 grid grid-cols-2 gap-x-6 gap-y-3 text-[12px] text-white/72">{practiceAreas.slice(0, 8).map((practice) => <a key={practice.slug} href={href(`/practice-areas/${practice.slug}`)} onClick={closeAll} className="hover:text-white">{ko ? practice.koTitle : practice.title}</a>)}</div></div>
          <div className="border-t border-white/12 py-6 lg:border-l lg:border-t-0 lg:px-8"><div className="text-[9px] font-medium uppercase tracking-[0.14em] text-white/38">{labels.locations}</div><div className="mt-5 grid grid-cols-2 gap-x-6 gap-y-3 text-[12px] text-white/72">{serviceLocations.map((item) => <a key={item.slug} href={href(`/locations/${item.slug}`)} onClick={closeAll} className="hover:text-white">{ko ? item.koName : item.name}</a>)}</div></div>
          <div className="border-t border-white/12 py-6 lg:border-l lg:border-t-0 lg:px-8"><div className="text-[9px] font-medium uppercase tracking-[0.14em] text-white/38">{labels.firm}</div><div className="mt-5 space-y-3 text-[12px] text-white/72"><a href={href("/attorney")} onClick={closeAll} className="block hover:text-white">{labels.attorneys}</a><a href={href("/results")} onClick={closeAll} className="block hover:text-white">{labels.results}</a><a href={href("/about")} onClick={closeAll} className="block hover:text-white">{labels.about}</a><a href={href("/contact")} onClick={closeAll} className="block hover:text-white">{labels.contact}</a></div></div>
          <div className="border-t border-white/12 py-6 lg:border-l lg:border-t-0 lg:pl-8"><div className="text-[9px] font-medium uppercase tracking-[0.14em] text-white/38">{labels.blog}</div><div className="mt-5 space-y-3 text-[12px] text-white/72"><a href={href("/blogs")} onClick={closeAll} className="block hover:text-white">{labels.blog}</a><a href={brand.phoneHref} className="block hover:text-white">{labels.call} {brand.phoneDisplay}</a></div><div className="mt-6"><LanguageSwitch /></div></div>
        </div>
      </div>
    );

    return null;
  };

  return (
    <>
      <AnimatePresence initial={false}>{panel && <motion.div aria-hidden="true" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.2 }} onClick={() => setPanel(null)} className="fixed inset-x-[5px] bottom-[5px] top-[60px] z-[115] hidden bg-black/[0.16] backdrop-blur-[10px] lg:block sm:inset-x-[7px] sm:bottom-[7px]" />}</AnimatePresence>

      <motion.nav initial={{ y: -10, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }} onMouseLeave={() => setPanel(null)} className="fixed left-[5px] right-[5px] top-0 z-[120] overflow-hidden bg-background text-foreground sm:left-[7px] sm:right-[7px]" style={{ fontFamily: ko ? '"Noto Sans KR", sans-serif' : '"Inter", Arial, sans-serif' }}>
        <div className="site-shell h-[60px]">
          <div className="hidden h-full grid-cols-[minmax(220px,0.92fr)_minmax(590px,2.35fr)_minmax(190px,0.73fr)] items-center lg:grid">
            <a href={homeHref} onClick={closeAll} className="flex min-w-0 items-center gap-2.5 pr-5"><span className="flex h-7 w-7 shrink-0 items-center justify-center overflow-hidden rounded-[2px]"><img src={brandLogo} alt="" width={28} height={28} decoding="async" className="h-full w-full object-cover invert" /></span><span className="truncate text-[13px] font-semibold tracking-[-0.025em]">{brand.name}</span></a>
            <div className="grid h-full grid-cols-5">
              {topItems.map((item) => {
                const active = panel === item.key;
                return <a key={item.key} href={item.href} onMouseEnter={() => setPanel(item.key)} onFocus={() => setPanel(item.key)} onClick={closeAll} className={`flex h-full items-center justify-center gap-1.5 px-2 text-center text-[12px] font-medium tracking-[-0.02em] transition-colors xl:text-[13px] ${active ? "bg-[#17130f] text-[#f3eee5]" : "hover:bg-foreground/[0.045]"}`}><span>{item.label}</span>{(item.key === "practice" || item.key === "locations") && <ChevronDown className={`h-3 w-3 stroke-[1.45] transition-transform duration-300 ${active ? "rotate-180" : ""}`} />}</a>;
              })}
            </div>
            <div className="flex h-full items-center justify-end gap-5 pl-5"><a href={brand.phoneHref} onMouseEnter={() => setPanel(null)} className="hidden whitespace-nowrap text-[11px] font-medium transition-opacity hover:opacity-55 xl:block">{brand.phoneDisplay}</a><button type="button" onMouseEnter={() => setPanel("menu")} onFocus={() => setPanel("menu")} onClick={() => setPanel((current) => current === "menu" ? null : "menu")} className={`flex h-full w-14 items-center justify-center transition-colors ${panel === "menu" ? "bg-[#17130f] text-[#f3eee5]" : "hover:bg-foreground/[0.045]"}`} aria-label={labels.menu} aria-expanded={panel === "menu"}>{panel === "menu" ? <X className="h-[21px] w-[21px] stroke-[1.35]" /> : <Menu className="h-[21px] w-[21px] stroke-[1.35]" />}</button></div>
          </div>

          <div className="flex h-full items-center justify-between gap-3 lg:hidden"><a href={homeHref} onClick={closeAll} className="flex min-w-0 items-center gap-2.5"><span className="flex h-7 w-7 shrink-0 items-center justify-center overflow-hidden rounded-[2px]"><img src={brandLogo} alt="" width={28} height={28} decoding="async" className="h-full w-full object-cover invert" /></span><span className="max-w-[205px] truncate text-[12px] font-semibold tracking-[-0.025em] sm:max-w-[260px] sm:text-[13px]">{brand.name}</span></a><div className="flex shrink-0 items-center"><a href={brand.phoneHref} aria-label={`${labels.call} ${brand.phoneDisplay}`} className="flex h-[60px] w-11 items-center justify-center"><Phone className="h-4 w-4 stroke-[1.5]" /></a><button type="button" onClick={() => setMobileOpen((current) => !current)} className={`flex h-[60px] w-11 items-center justify-center ${mobileOpen ? "bg-[#17130f] text-[#f3eee5]" : ""}`} aria-label={labels.menu} aria-expanded={mobileOpen}>{mobileOpen ? <X className="h-5 w-5 stroke-[1.4]" /> : <Menu className="h-5 w-5 stroke-[1.4]" />}</button></div></div>
        </div>

        <AnimatePresence mode="wait" initial={false}>{panel && <motion.div key={panel} initial={{ height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }} exit={{ height: 0, opacity: 0 }} transition={{ height: { duration: 0.38, ease: [0.22, 1, 0.36, 1] }, opacity: { duration: 0.18 } }} className="hidden overflow-hidden bg-[#17130f] text-[#f3eee5] lg:block">{renderPanel()}</motion.div>}</AnimatePresence>

        <AnimatePresence initial={false}>{mobileOpen && <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: "calc(100svh - 60px)", opacity: 1 }} exit={{ height: 0, opacity: 0 }} transition={{ duration: 0.38, ease: [0.22, 1, 0.36, 1] }} className="overflow-hidden bg-[#17130f] text-[#f3eee5] lg:hidden"><div className="site-shell flex h-full flex-col overflow-y-auto pb-6 pt-3">
          <div>
            <button type="button" onClick={() => setMobileGroup((current) => current === "practice" ? null : "practice")} className="flex w-full items-center justify-between border-b border-white/12 py-4 text-left"><span className="text-[1.05rem] font-medium tracking-[-0.025em]">{labels.practice}</span><ChevronDown className={`h-4 w-4 stroke-[1.35] transition-transform ${mobileGroup === "practice" ? "rotate-180" : ""}`} /></button>
            <AnimatePresence initial={false}>{mobileGroup === "practice" && <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }} exit={{ height: 0, opacity: 0 }} className="overflow-hidden border-b border-white/12"><div className="grid grid-cols-2 gap-x-5 gap-y-3 py-5 text-[11px] text-white/68">{practiceAreas.map((practice) => <a key={practice.slug} href={href(`/practice-areas/${practice.slug}`)} onClick={closeAll} className="leading-5">{ko ? practice.koTitle : practice.title}</a>)}</div></motion.div>}</AnimatePresence>
            <button type="button" onClick={() => setMobileGroup((current) => current === "locations" ? null : "locations")} className="flex w-full items-center justify-between border-b border-white/12 py-4 text-left"><span className="text-[1.05rem] font-medium tracking-[-0.025em]">{labels.locations}</span><ChevronDown className={`h-4 w-4 stroke-[1.35] transition-transform ${mobileGroup === "locations" ? "rotate-180" : ""}`} /></button>
            <AnimatePresence initial={false}>{mobileGroup === "locations" && <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }} exit={{ height: 0, opacity: 0 }} className="overflow-hidden border-b border-white/12"><div className="grid grid-cols-2 gap-x-5 gap-y-3 py-5 text-[11px] text-white/68">{serviceLocations.map((item) => <a key={item.slug} href={href(`/locations/${item.slug}`)} onClick={closeAll}>{ko ? item.koName : item.name}</a>)}</div></motion.div>}</AnimatePresence>
            {[[labels.attorneys, href("/attorney")], [labels.results, href("/results")], [labels.blog, href("/blogs")], [labels.about, href("/about")], [labels.contact, href("/contact")]].map(([label, itemHref]) => <a key={itemHref} href={itemHref} onClick={closeAll} className="block border-b border-white/12 py-4 text-[1.05rem] font-medium tracking-[-0.025em]">{label}</a>)}
          </div>
          <div className="mt-auto pt-8"><div className="flex items-center justify-between gap-4 border-t border-white/12 pt-5"><span className="text-[9px] font-medium uppercase tracking-[0.14em] text-white/38">{labels.language}</span><LanguageSwitch /></div><a href={brand.phoneHref} className="mt-5 flex w-full items-center justify-between border border-white/18 px-5 py-4"><span className="text-[9px] font-medium uppercase tracking-[0.12em] text-white/52">{labels.call}</span><span className="text-[13px] font-medium">{brand.phoneDisplay}</span></a></div>
        </div></motion.div>}</AnimatePresence>
      </motion.nav>
    </>
  );
};

export default SiteNavigation;
