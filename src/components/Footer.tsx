import brandMark from "@/assets/law-firm/howard-choi-mark.webp";

const Footer = () => {
  return (
    <footer className="bg-background py-24 text-foreground md:py-28 lg:py-32">
      <div className="site-shell">
        <div className="grid gap-12 border-b border-black/10 pb-16 md:grid-cols-4 lg:gap-16">
          <div>
            <div className="mb-5 flex items-center gap-2">
              <span className="flex h-7 w-7 items-center justify-center overflow-hidden rounded-[2px] bg-black">
                <img src={brandMark} alt="" className="h-full w-full scale-[1.65] object-cover" />
              </span>
              <span className="text-[15px] font-medium">Howard Choi Law</span>
            </div>
            <p className="max-w-xs text-[13px] leading-6 text-muted-foreground">
              Focused legal counsel for businesses, founders, and private clients navigating important decisions.
            </p>
          </div>

          <div>
            <div className="mb-5 text-[12px] text-muted-foreground">Practice</div>
            <div className="space-y-3 text-[13px]">
              <a href="#practice" className="block hover:opacity-60">Corporate</a>
              <a href="#practice" className="block hover:opacity-60">Litigation</a>
              <a href="#practice" className="block hover:opacity-60">Regulatory</a>
            </div>
          </div>

          <div>
            <div className="mb-5 text-[12px] text-muted-foreground">Firm</div>
            <div className="space-y-3 text-[13px]">
              <a href="#approach" className="block hover:opacity-60">Approach</a>
              <a href="#faq" className="block hover:opacity-60">FAQ</a>
              <a href="#booking" className="block hover:opacity-60">Consultation</a>
            </div>
          </div>

          <div>
            <div className="mb-5 text-[12px] text-muted-foreground">Contact</div>
            <div className="space-y-3 text-[13px] text-muted-foreground">
              <a href="mailto:hello@howardchoilaw.com" className="block hover:text-foreground">hello@howardchoilaw.com</a>
              <p>(+1) 212 555 0148</p>
              <p>Mon–Fri · 9:00–5:00</p>
              <p>Consultations by appointment</p>
            </div>
          </div>
        </div>

        <div className="flex flex-col gap-4 pt-8 text-[11px] text-muted-foreground sm:flex-row sm:items-center sm:justify-between">
          <span>© 2026 Howard Choi Law</span>
          <span>Attorney advertising · Placeholder content</span>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
