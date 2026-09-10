import { AnimatePresence, motion } from "framer-motion";
import { ChevronDown, Menu, Phone, X } from "lucide-react";
import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import brandLogo from "@/assets/law-firm/howard-choi-mark.webp";
import LanguageSwitch from "@/components/LanguageSwitch";
import { brand, practiceAreas, serviceLocations } from "@/data/injurySite";

const KoreanNavigation = () => {
  const [open, setOpen] = useState(false);
  const [desktopMenu, setDesktopMenu] = useState<"practice" | "locations" | "firm" | null>(null);
  const location = useLocation();

  const closeMenus = () => {
    setOpen(false);
    setDesktopMenu(null);
  };

  const isActive = (path: string) => location.pathname === path || location.pathname.startsWith(`${path}/`);

  return (
    <motion.header
      initial={{ y: -56, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.68, ease: [0.22, 1, 0.36, 1] }}
      className="fixed inset-x-0 top-0 z-[120]"
      style={{ fontFamily: '"Noto Sans KR", sans-serif' }}
    >
      <div className="hidden h-9 bg-[#17130f] text-[#f3eee5] lg:block">
        <div className="site-shell flex h-full items-center justify-between">
          <div className="text-[10px] tracking-[-0.01em] text-[#f3eee5]/52">
            사고 · 상해 법률상담 <span className="mx-2 text-[#f3eee5]/20">•</span> 부에나파크, 캘리포니아
          </div>
          <div className="flex items-center gap-4">
            <a href={brand.phoneHref} className="inline-flex items-center gap-2 text-[10px] font-medium text-[#f3eee5]/82 transition-colors hover:text-[#f3eee5]">
              <Phone className="h-3 w-3" /> 전화 {brand.phoneDisplay}
            </a>
            <span className="h-3 w-px bg-white/12" />
            <LanguageSwitch className="origin-right scale-[0.82]" />
          </div>
        </div>
      </div>

      <nav className="border-b border-[#211c17]/10 bg-[#f2eee7]/[0.985] text-[#211c17] shadow-[0_8px_30px_rgba(20,16,12,0.08)] backdrop-blur-xl">
        <div className="site-shell flex h-16 items-center justify-between gap-6 lg:h-[66px]">
          <Link to="/ko" onClick={closeMenus} className="flex min-w-0 shrink-0 items-center gap-2.5 text-[#211c17]">
            <span className="flex h-7 w-7 shrink-0 items-center justify-center overflow-hidden rounded-[2px]">
              <img src={brandLogo} alt="" width={28} height={28} decoding="async" className="h-full w-full object-cover invert" />
            </span>
            <span className="truncate text-[12px] font-medium tracking-[-0.025em] sm:text-[13px] xl:text-sm">{brand.name}</span>
          </Link>

          <div className="hidden h-full items-center lg:flex">
            <div className="relative flex h-full items-center" onMouseEnter={() => setDesktopMenu("practice")} onMouseLeave={() => setDesktopMenu(null)}>
              <Link to="/ko/practice-areas" onFocus={() => setDesktopMenu("practice")} className={`inline-flex h-full items-center gap-1.5 px-3 text-[10px] transition-colors xl:px-4 ${isActive("/ko/practice-areas") ? "text-[#211c17]" : "text-[#211c17]/62 hover:text-[#211c17]"}`}>
                업무 분야 <ChevronDown className={`h-3 w-3 transition-transform ${desktopMenu === "practice" ? "rotate-180" : ""}`} />
              </Link>
              <AnimatePresence>
                {desktopMenu === "practice" && (
                  <motion.div initial={{ opacity: 0, y: 7 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: 5 }} transition={{ duration: 0.18 }} className="absolute left-0 top-full z-[140] w-[610px] pt-2">
                    <div className="overflow-hidden rounded-[4px] border border-[#211c17]/12 bg-[#f7f3ec] text-[#211c17] shadow-[0_24px_65px_rgba(20,16,12,0.22)] ring-1 ring-white/60">
                      <div className="border-b border-[#211c17]/10 bg-[#211c17] px-5 py-4 text-[#f3eee5]">
                        <div className="text-[9px] tracking-[0.08em] text-[#f3eee5]/46">개인 상해</div>
                        <div style={{ fontFamily: '"Noto Serif KR", serif' }} className="mt-1 text-[1.35rem] font-medium leading-none">업무 분야</div>
                      </div>
                      <div className="grid grid-cols-2 p-2">
                        {practiceAreas.map((practice) => (
                          <Link key={practice.slug} to={`/ko/practice-areas/${practice.slug}`} onClick={closeMenus} className="rounded-[2px] px-4 py-3.5 text-[13px] transition-colors hover:bg-[#211c17]/[0.055]">
                            {practice.koTitle}
                          </Link>
                        ))}
                      </div>
                      <Link to="/ko/practice-areas" onClick={closeMenus} className="flex items-center justify-between border-t border-[#211c17]/10 px-5 py-3.5 text-[11px] text-[#211c17]/52 hover:text-[#211c17]">전체 업무 분야 <span>↗</span></Link>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            <Link to="/ko/attorney" onClick={closeMenus} className={`flex h-full items-center px-3 text-[10px] transition-colors xl:px-4 ${isActive("/ko/attorney") ? "text-[#211c17]" : "text-[#211c17]/62 hover:text-[#211c17]"}`}>변호사</Link>
            <Link to="/ko/results" onClick={closeMenus} className={`flex h-full items-center px-3 text-[10px] transition-colors xl:px-4 ${isActive("/ko/results") ? "text-[#211c17]" : "text-[#211c17]/62 hover:text-[#211c17]"}`}>사건 결과</Link>

            <div className="relative flex h-full items-center" onMouseEnter={() => setDesktopMenu("locations")} onMouseLeave={() => setDesktopMenu(null)}>
              <Link to="/ko/locations" onFocus={() => setDesktopMenu("locations")} className={`inline-flex h-full items-center gap-1.5 px-3 text-[10px] transition-colors xl:px-4 ${isActive("/ko/locations") ? "text-[#211c17]" : "text-[#211c17]/62 hover:text-[#211c17]"}`}>
                지역 <ChevronDown className={`h-3 w-3 transition-transform ${desktopMenu === "locations" ? "rotate-180" : ""}`} />
              </Link>
              <AnimatePresence>
                {desktopMenu === "locations" && (
                  <motion.div initial={{ opacity: 0, y: 7 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: 5 }} transition={{ duration: 0.18 }} className="absolute left-1/2 top-full z-[140] w-[370px] -translate-x-1/2 pt-2">
                    <div className="overflow-hidden rounded-[4px] border border-[#211c17]/12 bg-[#f7f3ec] text-[#211c17] shadow-[0_24px_65px_rgba(20,16,12,0.22)] ring-1 ring-white/60">
                      <div className="border-b border-[#211c17]/10 bg-[#211c17] px-5 py-4 text-[#f3eee5]">
                        <div className="text-[9px] tracking-[0.08em] text-[#f3eee5]/46">서비스 지역</div>
                        <div style={{ fontFamily: '"Noto Serif KR", serif' }} className="mt-1 text-[1.35rem] font-medium leading-none">북부 오렌지카운티</div>
                      </div>
                      <div className="grid grid-cols-2 p-2">
                        {serviceLocations.map((item) => (
                          <Link key={item.slug} to={`/ko/locations/${item.slug}`} onClick={closeMenus} className="rounded-[2px] px-4 py-3.5 text-[13px] transition-colors hover:bg-[#211c17]/[0.055]">{item.koName}</Link>
                        ))}
                      </div>
                      <Link to="/ko/locations" onClick={closeMenus} className="flex items-center justify-between border-t border-[#211c17]/10 px-5 py-3.5 text-[11px] text-[#211c17]/52 hover:text-[#211c17]">전체 지역 <span>↗</span></Link>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            <Link to="/ko/blogs" onClick={closeMenus} className={`flex h-full items-center px-3 text-[10px] transition-colors xl:px-4 ${isActive("/ko/blogs") ? "text-[#211c17]" : "text-[#211c17]/62 hover:text-[#211c17]"}`}>법률 블로그</Link>

            <div className="relative flex h-full items-center" onMouseEnter={() => setDesktopMenu("firm")} onMouseLeave={() => setDesktopMenu(null)}>
              <button type="button" onFocus={() => setDesktopMenu("firm")} onClick={() => setDesktopMenu((current) => current === "firm" ? null : "firm")} className="inline-flex h-full items-center gap-1.5 px-3 text-[10px] text-[#211c17]/62 transition-colors hover:text-[#211c17] xl:px-4">
                로펌 <ChevronDown className={`h-3 w-3 transition-transform ${desktopMenu === "firm" ? "rotate-180" : ""}`} />
              </button>
              <AnimatePresence>
                {desktopMenu === "firm" && (
                  <motion.div initial={{ opacity: 0, y: 7 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: 5 }} transition={{ duration: 0.18 }} className="absolute right-0 top-full z-[140] w-[250px] pt-2">
                    <div className="rounded-[4px] border border-[#211c17]/12 bg-[#f7f3ec] p-2 text-[#211c17] shadow-[0_24px_65px_rgba(20,16,12,0.22)] ring-1 ring-white/60">
                      <Link to="/ko/about" onClick={closeMenus} className="block rounded-[2px] px-4 py-3.5 text-[13px] hover:bg-[#211c17]/[0.055]">로펌 소개</Link>
                      <Link to="/ko/contact" onClick={closeMenus} className="block rounded-[2px] px-4 py-3.5 text-[13px] hover:bg-[#211c17]/[0.055]">문의</Link>
                      <a href="/ko/#faq" onClick={closeMenus} className="block rounded-[2px] px-4 py-3.5 text-[13px] hover:bg-[#211c17]/[0.055]">자주 묻는 질문</a>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>

          <div className="flex items-center gap-1.5 lg:hidden">
            <a href={brand.phoneHref} aria-label={`전화 ${brand.phoneDisplay}`} className="flex h-9 w-9 items-center justify-center rounded-full bg-[#211c17] text-[#f3eee5]"><Phone className="h-4 w-4" /></a>
            <button type="button" className="flex h-9 w-9 items-center justify-center text-[#211c17]" onClick={() => setOpen((value) => !value)} aria-label="메뉴 열기">{open ? <X className="h-5 w-5 stroke-[1.7]" /> : <Menu className="h-5 w-5" />}</button>
          </div>
        </div>
      </nav>

      <AnimatePresence>
        {open && (
          <motion.div initial={{ opacity: 0, y: -8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -8 }} transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }} className="fixed inset-x-0 bottom-0 top-16 overflow-y-auto bg-[#17130f] text-[#f3eee5] lg:hidden">
            <div className="site-shell flex min-h-full flex-col py-7">
              <div className="grid">
                {[["업무 분야", "/ko/practice-areas"], ["변호사", "/ko/attorney"], ["사건 결과", "/ko/results"], ["지역", "/ko/locations"], ["법률 블로그", "/ko/blogs"]].map(([label, href]) => (
                  <Link key={href} to={href} onClick={closeMenus} style={{ fontFamily: '"Noto Serif KR", serif' }} className="flex items-center justify-between border-b border-white/[0.08] py-3.5 text-[clamp(1.4rem,6.5vw,1.9rem)] font-medium leading-[1.2] tracking-[-0.04em]">
                    {label}<span className="text-base text-white/28">↗</span>
                  </Link>
                ))}
              </div>

              <div className="grid gap-7 py-7 sm:grid-cols-2">
                <div>
                  <div className="mb-3 text-[10px] text-white/36">주요 업무 분야</div>
                  <div className="grid grid-cols-2 gap-x-4 gap-y-2.5 text-[12px] text-white/64">
                    {practiceAreas.slice(0, 6).map((practice) => <Link key={practice.slug} to={`/ko/practice-areas/${practice.slug}`} onClick={closeMenus}>{practice.koTitle}</Link>)}
                  </div>
                </div>
                <div>
                  <div className="mb-3 text-[10px] text-white/36">서비스 지역</div>
                  <div className="grid grid-cols-2 gap-x-4 gap-y-2.5 text-[12px] text-white/64">
                    {serviceLocations.map((item) => <Link key={item.slug} to={`/ko/locations/${item.slug}`} onClick={closeMenus}>{item.koName}</Link>)}
                  </div>
                </div>
              </div>

              <div className="mt-auto border-t border-white/10 pt-6">
                <div className="mb-5 flex items-center justify-between gap-4">
                  <div className="flex gap-5 text-[12px] text-white/60"><Link to="/ko/about" onClick={closeMenus}>소개</Link><Link to="/ko/contact" onClick={closeMenus}>문의</Link></div>
                  <LanguageSwitch />
                </div>
                <a href={brand.phoneHref} className="liquid-cta flex w-full items-center justify-center gap-2 rounded-full px-5 py-4 text-[11px] font-medium"><Phone className="relative z-10 h-4 w-4" /><span className="relative z-10">전화 {brand.phoneDisplay}</span></a>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
};

export default KoreanNavigation;
