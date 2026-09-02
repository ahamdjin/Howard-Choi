import { Scale } from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-background py-16 text-foreground md:py-20">
      <div className="container mx-auto px-6 lg:px-12">
        <div className="grid gap-10 border-b border-black/10 pb-12 md:grid-cols-4">
          <div>
            <div className="mb-4 flex items-center gap-2">
              <Scale className="h-4 w-4" />
              <span className="text-sm font-medium">Howard Choi Law</span>
            </div>
            <p className="max-w-xs text-xs leading-5 text-muted-foreground">Focused legal counsel for businesses, founders, and private clients navigating important decisions.</p>
          </div>

          <div>
            <div className="mb-4 text-[10px] uppercase tracking-[0.18em] text-muted-foreground">Practice</div>
            <div className="space-y-2 text-xs">
              <a href="#practice" className="block hover:opacity-60">Corporate</a>
              <a href="#practice" className="block hover:opacity-60">Litigation</a>
              <a href="#practice" className="block hover:opacity-60">Regulatory</a>
            </div>
          </div>

          <div>
            <div className="mb-4 text-[10px] uppercase tracking-[0.18em] text-muted-foreground">Firm</div>
            <div className="space-y-2 text-xs">
              <a href="#approach" className="block hover:opacity-60">Approach</a>
              <a href="#faq" className="block hover:opacity-60">FAQ</a>
              <a href="#booking" className="block hover:opacity-60">Consultation</a>
            </div>
          </div>

          <div>
            <div className="mb-4 text-[10px] uppercase tracking-[0.18em] text-muted-foreground">Contact</div>
            <div className="space-y-2 text-xs text-muted-foreground">
              <a href="mailto:hello@howardchoilaw.com" className="block hover:text-foreground">hello@howardchoilaw.com</a>
              <p>Mon–Fri · 9:00–5:00</p>
              <p>Consultations by appointment</p>
            </div>
          </div>
        </div>

        <div className="flex flex-col gap-3 pt-6 text-[10px] uppercase tracking-[0.12em] text-muted-foreground sm:flex-row sm:items-center sm:justify-between">
          <span>© 2026 Howard Choi Law</span>
          <span>Attorney advertising · Placeholder content</span>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
