import SiteDepthSection from "@/components/SiteDepthSection";
import { ArrowRight, FileText, Mail, MapPin, Phone, ShieldCheck } from "lucide-react";
import { Link } from "@/lib/router-compat";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import ContactConsultation from "@/components/ContactConsultation";
import { brand } from "@/data/injurySite";

const Contact = () => {
  return (
    <div className="min-h-screen overflow-x-clip bg-background">
      <Navigation />

      <main className="site-shell pb-16 pt-28 md:pb-20 md:pt-36">
        <ContactConsultation locale="en" />

        <div className="mt-12 grid gap-8 border-b border-foreground/10 pb-9 md:grid-cols-3">
          <a href={brand.phoneHref} className="group border-t border-foreground/10 pt-5 md:border-t-0 md:pt-0">
            <Phone className="mb-4 h-4 w-4 text-muted-foreground" />
            <div className="text-[11px] text-muted-foreground">Phone</div>
            <div className="mt-2 text-[15px] transition-opacity group-hover:opacity-60">{brand.phoneDisplay}</div>
          </a>
          <a href={brand.emailHref} className="group border-t border-foreground/10 pt-5 md:border-t-0 md:pt-0">
            <Mail className="mb-4 h-4 w-4 text-muted-foreground" />
            <div className="text-[11px] text-muted-foreground">Email</div>
            <div className="mt-2 text-[15px] transition-opacity group-hover:opacity-60">{brand.email}</div>
          </a>
          <a href="https://share.google/LBJ1C8zWrZFjJBkVe" target="_blank" rel="noreferrer" className="group border-t border-foreground/10 pt-5 md:border-t-0 md:pt-0">
            <MapPin className="mb-4 h-4 w-4 text-muted-foreground" />
            <div className="text-[11px] text-muted-foreground">Office</div>
            <div className="mt-2 max-w-[260px] text-[15px] leading-6 transition-opacity group-hover:opacity-60">{brand.address}</div>
          </a>
        </div>

        <section className="mt-16 border-t border-foreground/12 pt-7 md:mt-20 md:pt-9">
          <div className="grid gap-8 lg:grid-cols-[0.38fr_1.62fr] lg:gap-12 xl:gap-16">
            <div>
              <span className="text-[9px] font-semibold uppercase tracking-[0.16em] text-muted-foreground">Before the consultation</span>
            </div>
            <div>
              <h2 className="editorial-serif max-w-[760px] text-[clamp(2rem,3vw,3.2rem)] leading-[1.02] tracking-[-0.025em]">Bring what you have. The first call is mostly about finding what is missing.</h2>
              <div className="mt-10 grid border-t border-foreground/12 md:grid-cols-3">
                {[
                  [MapPin, "Incident timeline", "The date, the exact spot, how it happened, and any report or claim number you were given."],
                  [FileText, "Records you already have", "Photos, video, insurance information, treatment details, bills, work-loss information, and important correspondence."],
                  [ShieldCheck, "Deadlines and next steps", "If a deadline, government agency, evidence-preservation issue, or insurer request is worrying you, flag it during the first conversation."],
                ].map(([Icon, title, body]) => {
                  const ItemIcon = Icon as typeof MapPin;
                  return (
                    <div key={String(title)} className="border-b border-foreground/12 py-7 md:border-b-0 md:border-l md:px-7 md:first:border-l-0 md:first:pl-0">
                      <ItemIcon className="h-4 w-4 text-foreground/52" />
                      <div className="mt-8 text-[12px] font-semibold">{String(title)}</div>
                      <p className="mt-3 text-[11px] leading-5 text-foreground/52">{String(body)}</p>
                    </div>
                  );
                })}
              </div>
              <div className="mt-8 flex flex-wrap gap-x-6 gap-y-3 text-[12px]">
                <Link to="/practice-areas" className="inline-flex items-center gap-2 hover:opacity-60">Explore practice areas <ArrowRight className="h-3.5 w-3.5" /></Link>
                <Link to="/attorney" className="inline-flex items-center gap-2 hover:opacity-60">Meet Howard Choi <ArrowRight className="h-3.5 w-3.5" /></Link>
              </div>
            </div>
          </div>
        </section>
        <SiteDepthSection locale="en" topic="contact" />
      </main>

      <Footer />
    </div>
  );
};

export default Contact;
