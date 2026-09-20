import { ArrowRight, BookOpenCheck, FileCheck2, RefreshCw, Scale } from "lucide-react";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { trustProfile } from "@/data/trustProfile";

const standards = [
  {
    Icon: Scale,
    title: "Primary legal sources first",
    body: "When a page explains California law, deadlines, court procedure, insurance rules, or official records, the goal is to support key statements with primary court, statute, agency, or government sources whenever practical.",
  },
  {
    Icon: BookOpenCheck,
    title: "Clear attorney identity",
    body: "The site identifies Howard Choi and links to his State Bar of California profile so licensing information can be checked independently.",
  },
  {
    Icon: FileCheck2,
    title: "Results and testimonials stay attributable",
    body: "Case results, client testimonials, awards, memberships, and other credibility claims should be published only when the firm can support the underlying fact or original source.",
  },
  {
    Icon: RefreshCw,
    title: "Updates and corrections",
    body: "Legal information can change. Pages should be updated when a cited rule, agency source, deadline, or material fact changes, and attorney-review dates should only appear after an actual review.",
  },
];

export default function EditorialStandardsPage() {
  return (
    <div className="min-h-screen overflow-x-clip bg-[#f8f7f4] text-foreground">
      <Navigation />
      <main>
        <section className="flex min-h-[68svh] items-end bg-[#17130f] text-[#f3eee5]">
          <div className="site-shell w-full py-14 md:py-20">
            <div className="max-w-[900px]">
              <div className="text-[10px] uppercase tracking-[0.18em] text-white/42">Editorial standards</div>
              <h1 className="editorial-serif mt-5 text-[clamp(3rem,6vw,6.4rem)] leading-[0.9] tracking-[-0.045em]">
                How legal information<br />
                <span className="text-white/42">earns trust here.</span>
              </h1>
              <p className="mt-7 max-w-[680px] text-[15px] leading-7 text-white/65">
                The standard is simple: identify the attorney, use strong sources, separate verified facts from marketing language, and never label a page attorney-reviewed unless that review actually happened.
              </p>
            </div>
          </div>
        </section>

        <section className="site-shell py-16 md:py-24">
          <div className="grid border-t border-foreground/14 md:grid-cols-2">
            {standards.map(({ Icon, title, body }, index) => (
              <div key={title} className={`border-b border-foreground/14 py-8 md:min-h-[270px] md:px-8 ${index % 2 === 1 ? "md:border-l" : ""} ${index % 2 === 0 ? "md:pl-0" : ""}`}>
                <Icon className="h-5 w-5 stroke-[1.35] text-foreground/55" />
                <h2 className="editorial-serif mt-10 text-[2rem] leading-[1.02]">{title}</h2>
                <p className="mt-4 max-w-[520px] text-[14px] leading-7 text-foreground/58">{body}</p>
              </div>
            ))}
          </div>
        </section>

        <section className="bg-[#ece7df]">
          <div className="site-shell grid gap-10 py-16 md:py-20 lg:grid-cols-[0.72fr_1.28fr] lg:items-start">
            <div>
              <div className="text-[10px] uppercase tracking-[0.18em] text-foreground/40">Attorney information</div>
              <h2 className="editorial-serif mt-4 text-[clamp(2.3rem,4vw,4.4rem)] leading-[0.94]">Howard Choi</h2>
            </div>
            <div className="border-t border-foreground/14">
              <div className="grid gap-4 border-b border-foreground/14 py-5 sm:grid-cols-2">
                <div><div className="text-[10px] text-foreground/38">California Bar No.</div><div className="mt-1 text-[14px]">{trustProfile.attorney.barNumber}</div></div>
                <div><div className="text-[10px] text-foreground/38">Admitted</div><div className="mt-1 text-[14px]">{trustProfile.attorney.admitted}</div></div>
              </div>
              <div className="grid gap-4 border-b border-foreground/14 py-5 sm:grid-cols-2">
                <div><div className="text-[10px] text-foreground/38">Law school</div><div className="mt-1 text-[14px]">{trustProfile.attorney.lawSchool}</div></div>
                <div><div className="text-[10px] text-foreground/38">Languages</div><div className="mt-1 text-[14px]">{trustProfile.attorney.languages.join(" · ")}</div></div>
              </div>
              <a href={trustProfile.attorney.stateBarUrl} target="_blank" rel="noreferrer" className="mt-6 inline-flex items-center gap-2 text-[12px] font-medium underline underline-offset-4">
                State Bar of California profile <ArrowRight className="h-3.5 w-3.5" />
              </a>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
