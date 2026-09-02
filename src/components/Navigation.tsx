import { AnimatePresence, motion } from "framer-motion";
import { Menu, Scale, X } from "lucide-react";
import { useEffect, useState } from "react";

const navItems = [
  ["Practice", "#practice"],
  ["Approach", "#approach"],
  ["FAQ", "#faq"],
];

const Navigation = () => {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50);
    onScroll();
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const goTo = (href: string) => {
    document.querySelector(href)?.scrollIntoView({ behavior: "smooth" });
    setOpen(false);
  };

  const dark = !scrolled && !open;

  return (
    <motion.nav
      initial={{ y: -60, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.7 }}
      className={`fixed inset-x-0 top-0 z-[100] transition-colors duration-500 ${open ? "bg-[#171717]" : scrolled ? "bg-background/92 backdrop-blur-xl" : "bg-transparent"}`}
    >
      <div className="container mx-auto px-6 py-5 lg:px-12">
        <div className="flex items-center justify-between">
          <button type="button" onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })} className={`flex items-center gap-2 ${dark ? "text-white" : "text-foreground"}`}>
            <Scale className="h-4 w-4" />
            <span className="text-sm font-medium tracking-tight">Howard Choi Law</span>
          </button>

          <div className="hidden items-center gap-8 md:flex">
            {navItems.map(([label, href]) => (
              <button key={href} type="button" onClick={() => goTo(href)} className={`text-[10px] uppercase tracking-[0.16em] transition-opacity hover:opacity-55 ${dark ? "text-white" : "text-foreground"}`}>
                {label}
              </button>
            ))}
            <button type="button" onClick={() => goTo("#booking")} className={`rounded-full px-5 py-2.5 text-[10px] uppercase tracking-[0.14em] ${dark ? "bg-white text-black" : "bg-foreground text-background"}`}>
              Schedule a consultation
            </button>
          </div>

          <button type="button" className={`md:hidden ${dark || open ? "text-white" : "text-foreground"}`} onClick={() => setOpen((value) => !value)} aria-label="Toggle menu">
            {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>

        <AnimatePresence>
          {open && (
            <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }} exit={{ height: 0, opacity: 0 }} className="overflow-hidden md:hidden">
              <div className="space-y-1 pb-4 pt-7 text-white">
                {navItems.map(([label, href]) => (
                  <button key={href} type="button" onClick={() => goTo(href)} className="block w-full py-3 text-left text-xs uppercase tracking-[0.16em]">
                    {label}
                  </button>
                ))}
                <button type="button" onClick={() => goTo("#booking")} className="mt-4 rounded-full bg-white px-5 py-3 text-[10px] uppercase tracking-[0.14em] text-black">
                  Schedule a consultation
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.nav>
  );
};

export default Navigation;
