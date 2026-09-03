import { AnimatePresence, motion } from "framer-motion";
import { Menu, X } from "lucide-react";
import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import brandLogo from "@/assets/law-firm/howard-choi-mark.webp";

const navItems = [
  ["업무 분야", "#practice"],
  ["업무 방식", "#approach"],
  ["FAQ", "#faq"],
  ["인사이트", "/ko/blogs"],
  ["문의", "/ko/contact"],
];

const toEnglishPath = (pathname: string) => {
  if (pathname === "/ko" || pathname === "/ko/") return "/";
  if (pathname === "/ko/blogs") return "/blogs";
  if (pathname.startsWith("/ko/blogs/")) return pathname.replace("/ko/blogs/", "/blogs/");
  if (pathname === "/ko/contact") return "/contact";
  return "/";
};

const KoreanNavigation = () => {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const goTo = (href: string) => {
    if (href.startsWith("#")) {
      if (location.pathname === "/ko" || location.pathname === "/ko/") {
        document.querySelector(href)?.scrollIntoView({ behavior: "smooth" });
      } else {
        navigate("/ko/");
        window.setTimeout(() => {
          document.querySelector(href)?.scrollIntoView({ behavior: "smooth" });
        }, 90);
      }
    } else {
      navigate(href);
    }
    setOpen(false);
  };

  const goHome = () => {
    if (location.pathname === "/ko" || location.pathname === "/ko/") {
      window.scrollTo({ top: 0, behavior: "smooth" });
    } else {
      navigate("/ko/");
    }
  };

  const dark = !scrolled && !open;

  return (
    <motion.nav
      initial={{ y: -60, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.7 }}
      className={`fixed inset-x-0 top-0 z-[100] transition-colors duration-500 ${open ? "bg-[#171717]" : scrolled ? "bg-background/92 backdrop-blur-xl" : "bg-transparent"}`}
      style={{ fontFamily: '"Noto Sans KR", sans-serif' }}
    >
      <div className="site-shell py-5">
        <div className="flex items-center justify-between">
          <button type="button" onClick={goHome} className={`flex items-center gap-2 ${dark ? "text-white" : "text-foreground"}`}>
            <span className="flex h-7 w-7 items-center justify-center overflow-hidden rounded-[2px]">
              <img
                src={brandLogo}
                alt=""
                width={28}
                height={28}
                decoding="async"
                className={`h-full w-full object-cover transition-[filter] duration-500 ${dark ? "" : "invert"}`}
              />
            </span>
            <span className="text-sm font-medium tracking-tight">Howard Choi Law</span>
          </button>

          <div className="hidden items-center gap-4 lg:flex xl:gap-6">
            {navItems.map(([label, href]) => {
              const active = href.startsWith("/") && location.pathname.startsWith(href);
              return (
                <button
                  key={href}
                  type="button"
                  onClick={() => goTo(href)}
                  className={`text-[11px] tracking-[-0.01em] transition-opacity hover:opacity-55 ${dark ? "text-white" : "text-foreground"} ${active ? "opacity-100" : "opacity-75"}`}
                >
                  {label}
                </button>
              );
            })}
            <button
              type="button"
              onClick={() => navigate(toEnglishPath(location.pathname))}
              className={`border-l pl-4 text-[10px] uppercase tracking-[0.14em] transition-opacity hover:opacity-55 ${dark ? "border-white/20 text-white/72" : "border-foreground/15 text-foreground/62"}`}
            >
              EN
            </button>
            <button
              type="button"
              onClick={() => goTo("#booking")}
              className="liquid-cta inline-flex items-center rounded-full px-5 py-2.5 text-[11px] font-medium"
            >
              <span className="relative z-10">상담 예약</span>
            </button>
          </div>

          <button type="button" className={`lg:hidden ${dark || open ? "text-white" : "text-foreground"}`} onClick={() => setOpen((value) => !value)} aria-label="메뉴 열기">
            {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>

        <AnimatePresence>
          {open && (
            <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }} exit={{ height: 0, opacity: 0 }} className="overflow-hidden lg:hidden">
              <div className="space-y-1 pb-4 pt-7 text-white">
                {navItems.map(([label, href]) => (
                  <button key={href} type="button" onClick={() => goTo(href)} className="block w-full py-3 text-left text-[13px]">
                    {label}
                  </button>
                ))}
                <button type="button" onClick={() => navigate(toEnglishPath(location.pathname))} className="block w-full py-3 text-left text-[11px] uppercase tracking-[0.14em] text-white/62">
                  English
                </button>
                <button
                  type="button"
                  onClick={() => goTo("#booking")}
                  className="liquid-cta mt-4 inline-flex rounded-full px-5 py-3 text-[11px] font-medium"
                >
                  <span className="relative z-10">상담 예약</span>
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.nav>
  );
};

export default KoreanNavigation;
