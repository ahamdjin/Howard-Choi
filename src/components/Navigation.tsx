import { AnimatePresence, motion } from "framer-motion";
import { ChevronDown, Menu, Phone, X } from "lucide-react";
import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import brandLogo from "@/assets/law-firm/howard-choi-mark.webp";
import LanguageSwitch from "@/components/LanguageSwitch";
import { brand, practiceAreas, serviceLocations } from "@/data/injurySite";

const Navigation = () => {
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
    >
      <div className="hidden h-9 bg-[#17130f] text-[#f3eee5] lg:block">
        <div className="site-shell flex h-full items-center justify-between">
          <div className="text-[9px] uppercase tracking-[0.16em] text-[#f3eee5]/52">
            Personal Injury Counsel <span className="mx-2 text-[#f3eee5]/20">•</span> Buena Park, California
          </div>
          <div className="flex items-center gap-4">
            <a href={brand.phoneHref} className="inline-flex items-center gap-2 text-[10px] font-medium tracking-[0.04em] text-[#f3eee5]/82 transition-colors hover:text-[#f3eee5]">
              <Phone className="h-3 w-3" /> Call {brand.phoneDisplay}
            </a>
            <span className="h-3 w-px bg-white/12" />
            <LanguageSwitch className="origin-right scale-[0.82]" />
          </div>
        </div>
      </div>

      <nav className="border-b border-[#211c17]/10 bg-[#f2eee7]/[0.985] text-[#211c17] shadow-[0_8px_30px_rgba(20,16,12,0.08)] backdrop-blur-xl">
        <div className="site-shell flex h-16 items-center justify-between gap-6 lg:h-[66px]">
          <Link to="/" onClick={closeMenus} className="flex min-w-0 shrink-0 items-center gap-2.5 text-[#211c17]">
            <span className="flex h-7 w-7 shrink-0 items-center justify-center overflow-hidden rounded-[2px]">
              <img src={brandLogo} alt="" width={28} height={28} decoding="async" className="h-full w-full object-cover invert" />
            </span>
            <span className="truncate text-[12px] font-medium tracking-[-0.025em] sm:text-[13px] xl:text-sm">{brand.name}</span>
          </Link>

          <div className="hidden h-full items-center lg:flex">
            <div className="relative flex h-full items-center" onMouseEnter={() => setDesktopMenu("practice")} onMouseLeave={() => setDesktopMenu(null)}>
              <Link
                to="/practice-areas"
                onFocus={() => setDesktopMenu("practice")}
                className={`inline-flex h-full items-center gap-1.5 px-3 text-[9px] uppercase tracking-[0.14em] transition-colors xl:px-4 xl:text-[10px] ${isActive("/practice-areas") ? "text-[#211c17]" : "text-[#211c17]/62 hover:text-[#211c17]"}`}
              >
                Practice Areas <ChevronDown className={`h-3 w-3 transition-transform ${desktopMenu === "practice" ? "rotate-180" : ""}`} />
              </Link>
              <AnimatePresence>
                {desktopMenu === "practice" && (
                  <motion.div initial={{ opacity: 0, y: 7 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: 5 }} transition={{ duration: 0.18 }} className="absolute left-0 top-full z-[140] w-[610px] pt-2">
                    <div className="overflow-hidden rounded-[4px] border border-[#211c17]/12 bg-[#f7f3ec] text-[#211c17] shadow-[0_24px_65px_rgba(20,16,12,0.22)] ring-1 ring-white/60">
                      <div className="border-b border-[#211c17]/10 bg-[#211c17] px-5 py-4 text-[#f3eee5]">
                        <div className="text-[9px] uppercase tracking-[0.16em] text-[#f3eee5]/46">Personal Injury</div>
                        <div className="editorial-serif mt-1 text-[1.45rem] leading-none">Practice Areas</div>
                      </div>
                      <div className="grid grid-cols-2 p-2">
                        {practiceAreas.map((practice) => (
                          <Link key={practice.slug} to={`/practice-areas/${practice.slug}`} onClick={closeMenus} className="rounded-[2px] px-4 py-3.5 text-[13px] transition-colors hover:bg-[#211c17]/[0.055]">
                            {practice.title}
                          </Link>
                        ))}
                      </div>
                      <Link to="/practice-areas" onClick={closeMenus} className="flex items-center justify-between border-t border-[#211c17]/10 px-5 py-3.5 text-[10px] uppercase tracking-[0.13em] text-[#211c17]/52 hover:text-[#211c17]">
                        View all practice areas <span>↗</span>
                      </Link>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            <Link to="/attorney" onClick={closeMenus} className={`flex h-full items-center px-3 text-[9px] uppercase tracking-[0.14em] transition-colors xl:px-4 xl:text-[10px] ${isActive("/attorney") ? "text-[#211c17]" : "text-[#211c17]/62 hover:text-[#211c17]"}`}>Attorney</Link>
            <Link to="/results" onClick={closeMenus} className={`flex h-full items-center px-3 text-[9px] uppercase tracking-[0.14em] transition-colors xl:px-4 xl:text-[10px] ${isActive("/results") ? "text-[#211c17]" : "text-[#211c17]/62 hover:text-[#211c17]"}`}>Results</Link>

            <div className="relative flex h-full items-center" onMouseEnter={() => setDesktopMenu("locations")} onMouseLeave={() => setDesktopMenu(null)}>
              <Link to="/locations" onFocus={() => setDesktopMenu("locations")} className={`inline-flex h-full items-center gap-1.5 px-3 text-[9px] uppercase tracking-[0.14em] transition-colors xl:px-4 xl:text-[10px] ${isActive("/locations") ? "text-[#211c17]" : "text-[#211c17]/62 hover:text-[#211c17]"}`}>
                Locations <ChevronDown className={`h-3 w-3 transition-transform ${desktopMenu === "locations" ? "rotate-180" : ""}`} />
              </Link>
              <AnimatePresence>
                {desktopMenu === "locations" && (
                  <motion.div initial={{ opacity: 0, y: 7 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: 5 }} transition={{ duration: 0.18 }} className="absolute left-1/2 top-full z-[140] w-[370px] -translate-x-1/2 pt-2">
                    <div className="overflow-hidden rounded-[4px] border border-[#211c17]/12 bg-[#f7f3ec] text-[#211c17] shadow-[0_24px_65px_rgba(20,16,12,0.22)] ring-1 ring-white/60">
                      <div className="border-b border-[#211c17]/10 bg-[#211c17] px-5 py-4 text-[#f3eee5]">
                        <div className="text-[9px] uppercase tracking-[0.16em] text-[#f3eee5]/46">Areas We Serve</div>
                        <div className="editorial-serif mt-1 text-[1.45rem] leading-none">North Orange County</div>
                      </div>
                      <div className="grid grid-cols-2 p-2">
                        {serviceLocations.map((item) => (
                          <Link key={item.slug} to={`/locations/${item.slug}`} onClick={closeMenus} className="rounded-[2px] px-4 py-3.5 text-[13px] transition-colors hover:bg-[#211c17]/[0.055]">{item.name}</Link>
                        ))}
                      </div>
                      <Link to="/locations" onClick={closeMenus} className="flex items-center justify-between border-t border-[#211c17]/10 px-5 py-3.5 text-[10px] uppercase tracking-[0.13em] text-[#211c17]/52 hover:text-[#211c17]">View all locations <span>↗</span></Link>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            <Link to="/blogs" onClick={closeMenus} className={`flex h-full items-center px-3 text-[9px] uppercase tracking-[0.14em] transition-colors xl:px-4 xl:text-[10px] ${isActive("/blogs") ? "text-[#211c17]" : "text-[#211c17]/62 hover:text-[#211c17]"}`}>Law Blog</Link>

            <div className="relative flex h-full items-center" onMouseEnter={() => setDesktopMenu("firm")} onMouseLeave={() => setDesktopMenu(null)}>
              <button type="button" onFocus={() => setDesktopMenu("firm")} onClick={() => setDesktopMenu((current) => current === "firm" ? null : "firm")} className="inline-flex h-full items-center gap-1.5 px-3 text-[9px] uppercase tracking-[0.14em] text-[#211c17]/62 transition-colors hover:text-[#211c17] xl:px-4 xl:text-[10px]">
                Firm <ChevronDown className={`h-3 w-3 transition-transform ${desktopMenu === "firm" ? "rotate-180" : ""}`} />
              </button>
              <AnimatePresence>
                {desktopMenu === "firm" && (
                  <motion.div initial={{ opacity: 0, y: 7 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: 5 }} transition={{ duration: 0.18 }} className="absolute right-0 top-full z-[140] w-[250px] pt-2">
                    <div className="rounded-[4px] border border-[#211c17]/12 bg-[#f7f3ec] p-2 text-[#211c17] shadow-[0_24px_65px_rgba(20,16,12,0.22)] ring-1 ring-white/60">
                      <Link to="/about" onClick={closeMenus} className="block rounded-[2px] px-4 py-3.5 text-[13px] hover:bg-[#211c17]/[0.055]">About the Firm</Link>
                      <Link to="/contact" onClick={closeMenus} className="block rounded-[2px] px-4 py-3.5 text-[13px] hover:bg-[#211c17]/[0.055]">Contact</Link>
                      <a href="/#faq" onClick={closeMenus} className="block rounded-[2px] px-4 py-3.5 text-[13px] hover:bg-[#211c17]/[0.055]">Frequently Asked Questions</a>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>

          <div className="flex items-center gap-1.5 lg:hidden">
            <a href={brand.phoneHref} aria-label={`Call ${brand.phoneDisplay}`} className="flex h-9 w-9 items-center justify-center rounded-full bg-[#211c17] text-[#f3eee5]"><Phone className="h-4 w-4" /></a>
            <button type="button" className="flex h-9 w-9 items-center justify-center text-[#211c17]" onClick={() => setOpen((value) => !value)} aria-label="Toggle menu">{open ? <X className="h-5 w-5 stroke-[1.7]" /> : <Menu className="h-5 w-5" />}</button>
          </div>
        </div>
      </nav>

      <AnimatePresence>
        {open && (
          <motion.div initial={{ opacity: 0, y: -8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -8 }} transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }} className="fixed inset-x-0 bottom-0 top-16 overflow-y-auto bg-[#17130f] text-[#f3eee5] lg:hidden">
            <div className="site-shell flex min-h-full flex-col py-7">
              <div className="grid">
                {[["Practice Areas", "/practice-areas"], ["Attorney", "/attorney"], ["Results", "/results"], ["Locations", "/locations"], ["Law Blog", "/blogs"]].map(([label, href]) => (
                  <Link key={href} to={href} onClick={closeMenus} className="editorial-serif flex items-center justify-between border-b border-white/[0.08] py-3.5 text-[clamp(1.45rem,7vw,2rem)] leading-none tracking-[-0.015em]">
                    {label}<span className="text-base text-white/28">↗</span>
                  </Link>
                ))}
              </div>

              <div className="grid gap-7 py-7 sm:grid-cols-2">
                <div>
                  <div className="mb-3 text-[9px] uppercase tracking-[0.16em] text-white/36">Popular Practice Areas</div>
                  <div className="grid grid-cols-2 gap-x-4 gap-y-2.5 text-[12px] text-white/64">
                    {practiceAreas.slice(0, 6).map((practice) => <Link key={practice.slug} to={`/practice-areas/${practice.slug}`} onClick={closeMenus}>{practice.title}</Link>)}
                  </div>
                </div>
                <div>
                  <div className="mb-3 text-[9px] uppercase tracking-[0.16em] text-white/36">Areas We Serve</div>
                  <div className="grid grid-cols-2 gap-x-4 gap-y-2.5 text-[12px] text-white/64">
                    {serviceLocations.map((item) => <Link key={item.slug} to={`/locations/${item.slug}`} onClick={closeMenus}>{item.name}</Link>)}
                  </div>
                </div>
              </div>

              <div className="mt-auto border-t border-white/10 pt-6">
                <div className="mb-5 flex items-center justify-between gap-4">
                  <div className="flex gap-5 text-[12px] text-white/60"><Link to="/about" onClick={closeMenus}>About</Link><Link to="/contact" onClick={closeMenus}>Contact</Link></div>
                  <LanguageSwitch />
                </div>
                <a href={brand.phoneHref} className="liquid-cta flex w-full items-center justify-center gap-2 rounded-full px-5 py-4 text-[11px] font-medium"><Phone className="relative z-10 h-4 w-4" /><span className="relative z-10">Call {brand.phoneDisplay}</span></a>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
};

export default Navigation;
