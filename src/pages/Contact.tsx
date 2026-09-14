import { motion, useScroll, useTransform } from "framer-motion";
import { ArrowRight, CalendarDays, FileText, Mail, MapPin, Phone, ShieldCheck } from "lucide-react";
import { Link } from "react-router-dom";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import GHLCalendar from "@/components/GHLCalendar";
import WebsiteInquiryForm from "@/components/WebsiteInquiryForm";
import heroCityBoardroom from "@/assets/law-firm/hero-city-boardroom.webp";

const Contact = () => {
  const { scrollY } = useScroll();
  const heroY = useTransform(scrollY, [0, 700], [0, 90]);

  return (
    <div className="min-h-screen overflow-x-clip bg-background">
      <Navigation />

      <section className="relative flex h-[54svh] min-h-[460px] items-end overflow-hidden bg-[#17130f] text-[#f3eee5]">
        <motion.img
          src={heroCityBoardroom}
          alt="Private law firm conference room"
          style={{ y: heroY }}
          fetchPriority="high"
          decoding="async"
          className="absolute inset-0 h-[112%] w-full object-cover"
        />
        <div className="absolute inset-0 bg-[#17130f]/64" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#17130f]/78 via-transparent to-[#17130f]/12" />
        <div className="hero-bottom-readability" />

        <div className="site-shell relative z-10 pb-12 md:pb-14">
          <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.72 }} className="max-w-[700px]">
            <span className="mb-4 block text-[11px] text-[#f3eee5]/62">Contact · Buena Park</span>
            <h1 className="editorial-serif text-[clamp(2.75rem,4.15vw,4.25rem)] leading-[0.95] tracking-[-0.024em]">
              Talk with a personal injury legal team about what happened.
            </h1>
            <p className="mt-5 max-w-[540px] text-[14px] leading-6 text-[#f3eee5]/68 md:text-[15px]">
              Start with the accident date and location, your current treatment, insurance information, and the questions you need answered. A simple outline is enough for the first conversation.
            </p>
          </motion.div>
        </div>
      </section>

      <main className="site-shell py-16 md:py-20 lg:py-24">
        <div className="mb-12 grid gap-8 border-b border-foreground/10 pb-9 md:grid-cols-3">
          <a href="tel:+17146900007" className="group border-t border-foreground/10 pt-5 md:border-t-0 md:pt-0">
            <Phone className="mb-4 h-4 w-4 text-muted-foreground" />
            <div className="text-[11px] text-muted-foreground">Phone</div>
            <div className="mt-2 text-[15px] transition-opacity group-hover:opacity-60">+1 714-690-0007</div>
          </a>
          <a href="mailto:hello@howardchoilaw.com" className="group border-t border-foreground/10 pt-5 md:border-t-0 md:pt-0">
            <Mail className="mb-4 h-4 w-4 text-muted-foreground" />
            <div className="text-[11px] text-muted-foreground">Email</div>
            <div className="mt-2 text-[15px] transition-opacity group-hover:opacity-60">hello@howardchoilaw.com</div>
          </a>
          <a href="https://www.google.com/maps/search/?api=1&query=6301+Beach+Blvd%2C+Buena+Park%2C+CA+90621" target="_blank" rel="noreferrer" className="group border-t border-foreground/10 pt-5 md:border-t-0 md:pt-0">
            <MapPin className="mb-4 h-4 w-4 text-muted-foreground" />
            <div className="text-[11px] text-muted-foreground">Office</div>
            <div className="mt-2 max-w-[260px] text-[15px] leading-6 transition-opacity group-hover:opacity-60">6301 Beach Blvd, Buena Park, CA 90621</div>
          </a>
        </div>

        <div className="grid items-start gap-5 xl:grid-cols-[0.78fr_1.22fr]">
          <motion.section initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: 0.18 }} transition={{ duration: 0.68 }} className="rounded-[4px] bg-[#e9e6e1] p-7 md:p-9 xl:sticky xl:top-24">
            <span className="text-[11px] text-foreground/48">Send a note</span>
            <h2 className="editorial-serif mt-3 text-[clamp(2rem,2.55vw,3rem)] leading-[0.98] tracking-[-0.022em]">Tell us where the case stands now.</h2>
            <p className="mt-4 max-w-[470px] text-[14px] leading-6 text-foreground/58">
              Helpful starting details include where and when the accident happened, the type of injury, treatment so far, whether work has been affected, and any insurance or claim information you already have. You do not need every record before reaching out. Avoid sending confidential or time-sensitive information until an attorney-client relationship has been confirmed.
            </p>
            <WebsiteInquiryForm locale="en" />
          </motion.section>

          <motion.section id="calendar" initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: 0.05 }} transition={{ duration: 0.68, delay: 0.06 }} className="w-full scroll-mt-20 rounded-[4px] bg-[#1a1714] p-4 text-[#f3eee5] md:p-5">
            <div className="flex items-start justify-between gap-6 px-3 pb-5 pt-3 md:px-4 md:pb-6 md:pt-4">
              <div>
                <span className="text-[11px] text-[#f3eee5]/42">Consultation</span>
                <h2 className="editorial-serif mt-3 max-w-[620px] text-[clamp(2rem,2.8vw,3rem)] leading-[0.98] tracking-[-0.022em]">Book an available consultation time.</h2>
                <p className="mt-4 max-w-[620px] text-[14px] leading-6 text-[#f3eee5]/52">
                  Choose an available date and time, then complete the booking here. If you have photos, reports, insurance information, medical records, or correspondence already available, keep them together for the conversation; they do not all need to be uploaded in advance.
                </p>
              </div>
              <CalendarDays className="mt-1 h-5 w-5 shrink-0 text-[#f3eee5]/42" />
            </div>
            <GHLCalendar locale="en" />
          </motion.section>
        </div>

        <section className="mt-16 border-t border-foreground/12 pt-7 md:mt-20 md:pt-9">
          <div className="grid gap-8 lg:grid-cols-[0.38fr_1.62fr] lg:gap-12 xl:gap-16">
            <div>
              <span className="text-[9px] font-semibold uppercase tracking-[0.16em] text-muted-foreground">Before the consultation</span>
            </div>
            <div>
              <h2 className="editorial-serif max-w-[760px] text-[clamp(2rem,3vw,3.2rem)] leading-[1.02] tracking-[-0.025em]">Bring the facts you have. The first conversation helps identify what is missing.</h2>
              <div className="mt-10 grid border-t border-foreground/12 md:grid-cols-3">
                {[
                  [MapPin, "Incident timeline", "Date, exact location, how the incident happened, and any report or claim number you already have."],
                  [FileText, "Records you already have", "Photos, video, insurance information, treatment details, bills, work-loss information, and important correspondence."],
                  [ShieldCheck, "Deadlines and next steps", "If a deadline, government agency, evidence-preservation issue, or insurer request is worrying you, flag it during the first conversation."],
                ].map(([Icon, title, body], index) => {
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
                <Link to="/attorney" className="inline-flex items-center gap-2 hover:opacity-60">Meet the attorneys <ArrowRight className="h-3.5 w-3.5" /></Link>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default Contact;