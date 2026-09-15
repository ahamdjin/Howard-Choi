import { ArrowRight, BriefcaseBusiness, FileText, Languages, MapPin, MessageCircleMore, Scale, ShieldCheck } from "lucide-react";
import leadCounselImage from "@/assets/law-firm/lead-counsel.avif";
import heroBoardroom from "@/assets/law-firm/hero-city-boardroom.webp";
import heroLawOffice from "@/assets/law-firm/hero-law-office.webp";
import heroJustice from "@/assets/law-firm/hero-justice-library.webp";
import { practiceAreas, serviceLocations } from "@/data/injurySite";

const SectionIntro = ({ eyebrow, title, body }: { eyebrow: string; title: string; body?: string }) => (
  <div className="max-w-[700px]">
    <div className="text-[10px] font-semibold uppercase tracking-[0.16em] text-black/42">{eyebrow}</div>
    <h2 className="editorial-serif mt-4 text-[clamp(2.2rem,4.6vw,4.4rem)] leading-[0.98] tracking-[-0.04em] text-[#191817]">{title}</h2>
    {body ? <p className="mt-5 max-w-[560px] text-[14px] leading-6 text-black/56 md:text-[15px]">{body}</p> : null}
  </div>
);

const HomeSections = () => (
  <>
    <section className="border-y border-black/10 bg-[#f7f6f2]">
      <div className="site-shell grid sm:grid-cols-3">
        {[
          ["California Bar", "Howard Choi · No. 284364"],
          ["Languages", "English + Korean"],
          ["Local Office", "6301 Beach Blvd · Buena Park"],
        ].map(([label, value], index) => (
          <div key={label} className={`py-5 sm:px-6 ${index ? "border-t border-black/10 sm:border-l sm:border-t-0" : ""}`}>
            <div className="text-[9px] font-semibold uppercase tracking-[0.15em] text-black/36">{label}</div>
            <div className="mt-2 text-[13px] font-medium">{value}</div>
          </div>
        ))}
      </div>
    </section>

    <section className="bg-white py-16 md:py-24">
      <div className="site-shell grid gap-10 lg:grid-cols-[0.78fr_1.22fr] lg:items-center lg:gap-16">
        <SectionIntro eyebrow="Start here" title="Tell us what happened. We’ll help make the next step clear." body="You do not need to understand the insurance process before you call. Start with the accident, the injury, and what is worrying you most right now." />
        <div className="grid gap-3 sm:grid-cols-2">
          {[
            [MessageCircleMore, "Talk through the accident", "A direct conversation about what happened and what needs attention first."],
            [FileText, "Protect the record", "Photos, reports, treatment, insurance information, and other useful evidence."],
            [Scale, "Understand the claim", "A clearer view of responsibility, damages, coverage, and the legal process."],
            [ShieldCheck, "Plan the next move", "Know what matters now, what can wait, and what should not be missed."],
          ].map(([Icon, title, body]) => {
            const CardIcon = Icon as typeof MessageCircleMore;
            return (
              <div key={title as string} className="min-h-[190px] border border-black/10 bg-[#f7f6f2] p-5 md:p-6">
                <CardIcon className="h-5 w-5 stroke-[1.4]" />
                <h3 className="mt-10 text-[16px] font-semibold tracking-[-0.02em]">{title as string}</h3>
                <p className="mt-3 text-[12px] leading-5 text-black/50">{body as string}</p>
              </div>
            );
          })}
        </div>
      </div>
    </section>

    <section className="bg-[#f2f0eb] py-16 md:py-24">
      <div className="site-shell">
        <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
          <SectionIntro eyebrow="Practice areas" title="Start with the type of accident." body="Choose the situation closest to yours. Each page explains the important evidence, insurance questions, and next steps without burying the answer in legal jargon." />
          <a href="/practice-areas" className="inline-flex items-center gap-2 text-[12px] font-semibold">All practice areas <ArrowRight className="h-4 w-4" /></a>
        </div>
        <div className="mt-10 grid border-t border-black/12 sm:grid-cols-2 lg:grid-cols-3">
          {practiceAreas.slice(0, 6).map((practice, index) => (
            <a key={practice.slug} href={`/practice-areas/${practice.slug}`} className="group min-h-[190px] border-b border-black/12 p-5 sm:border-r md:p-6">
              <div className="flex items-start justify-between text-[10px] text-black/34"><span>{String(index + 1).padStart(2, "0")}</span><ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" /></div>
              <h3 className="editorial-serif mt-12 text-[1.7rem] leading-none tracking-[-0.03em]">{practice.title}</h3>
              <p className="mt-4 max-w-[330px] text-[11px] leading-5 text-black/48">{practice.description.replace(/^Buena Park [^.]+? /, "")}</p>
            </a>
          ))}
        </div>
      </div>
    </section>

    <section className="bg-white py-16 md:py-24">
      <div className="site-shell">
        <SectionIntro eyebrow="How it works" title="Three clear steps. No mystery." body="The legal process can be complicated. Your experience with it should not be." />
        <div className="mt-10 grid gap-4 lg:grid-cols-3">
          {[
            ["01", "Free case review", "Tell us what happened, where treatment stands, and what the insurance company has done so far.", heroJustice],
            ["02", "Build the record", "The claim is organized around liability, medical treatment, insurance, financial loss, and the evidence that supports it.", heroBoardroom],
            ["03", "Move toward resolution", "You stay informed while the case moves through negotiation and, when necessary, the next legal step.", heroLawOffice],
          ].map(([number, title, body, image]) => (
            <article key={number} className="overflow-hidden bg-[#f7f6f2]">
              <div className="aspect-[16/10] overflow-hidden bg-black/5"><img src={image} alt="" loading="lazy" className="h-full w-full object-cover transition-transform duration-500 hover:scale-[1.015]" /></div>
              <div className="p-5 md:p-6">
                <div className="text-[10px] font-semibold text-black/35">{number}</div>
                <h3 className="mt-5 text-[18px] font-semibold tracking-[-0.025em]">{title}</h3>
                <p className="mt-3 text-[12px] leading-5 text-black/52">{body}</p>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>

    <section className="bg-[#171717] py-16 text-white md:py-24">
      <div className="site-shell grid gap-12 lg:grid-cols-[0.9fr_1.1fr] lg:gap-16">
        <div>
          <div className="text-[10px] font-semibold uppercase tracking-[0.16em] text-white/42">More than paperwork</div>
          <h2 className="editorial-serif mt-4 max-w-[620px] text-[clamp(2.4rem,4.8vw,4.6rem)] leading-[0.96] tracking-[-0.04em]">An accident creates more than one problem.</h2>
        </div>
        <div className="grid sm:grid-cols-2">
          {[
            [BriefcaseBusiness, "Missing work?", "Document wage loss and how the injury is affecting your ability to work."],
            [ShieldCheck, "Insurance calling?", "Understand what they are asking for before making decisions that affect the claim."],
            [MapPin, "Need local help?", "Start from the Buena Park office and the community where the accident happened."],
            [Languages, "Prefer Korean?", "Important conversations can happen in English or Korean so the details stay clear."],
          ].map(([Icon, title, body], index) => {
            const CardIcon = Icon as typeof BriefcaseBusiness;
            return (
              <div key={title as string} className={`min-h-[200px] border-white/12 p-5 md:p-6 ${index % 2 ? "sm:border-l" : ""} ${index > 1 ? "border-t" : index ? "border-t sm:border-t-0" : "border-t"}`}>
                <CardIcon className="h-5 w-5 stroke-[1.4] text-white/70" />
                <h3 className="mt-10 text-[17px] font-semibold">{title as string}</h3>
                <p className="mt-3 max-w-[320px] text-[12px] leading-5 text-white/48">{body as string}</p>
              </div>
            );
          })}
        </div>
      </div>
    </section>

    <section className="bg-[#f7f6f2] py-16 md:py-24">
      <div className="site-shell">
        <SectionIntro eyebrow="Explore" title="Find the path that fits your situation." />
        <div className="mt-10 grid gap-4 lg:grid-cols-2">
          <a href="/locations" className="group relative min-h-[390px] overflow-hidden bg-[#ddd8cf] p-6 md:p-8">
            <img src={heroBoardroom} alt="" loading="lazy" className="absolute inset-0 h-full w-full object-cover opacity-35 transition-transform duration-500 group-hover:scale-[1.015]" />
            <div className="absolute inset-0 bg-gradient-to-t from-black/65 via-black/10 to-transparent" />
            <div className="relative z-10 flex h-full min-h-[330px] flex-col justify-end text-white">
              <div className="text-[10px] font-semibold uppercase tracking-[0.15em] text-white/60">Locations</div>
              <h3 className="editorial-serif mt-3 text-[2.6rem] leading-none tracking-[-0.035em]">Help close to home.</h3>
              <p className="mt-4 max-w-[400px] text-[12px] leading-5 text-white/66">Buena Park and nearby North Orange County and Los Angeles County communities.</p>
              <div className="mt-6 inline-flex items-center gap-2 text-[12px] font-semibold">View locations <ArrowRight className="h-4 w-4" /></div>
            </div>
          </a>
          <a href="/practice-areas" className="group relative min-h-[390px] overflow-hidden bg-[#ddd8cf] p-6 md:p-8">
            <img src={heroJustice} alt="" loading="lazy" className="absolute inset-0 h-full w-full object-cover opacity-35 transition-transform duration-500 group-hover:scale-[1.015]" />
            <div className="absolute inset-0 bg-gradient-to-t from-black/65 via-black/10 to-transparent" />
            <div className="relative z-10 flex h-full min-h-[330px] flex-col justify-end text-white">
              <div className="text-[10px] font-semibold uppercase tracking-[0.15em] text-white/60">Practice areas</div>
              <h3 className="editorial-serif mt-3 text-[2.6rem] leading-none tracking-[-0.035em]">Start with what happened.</h3>
              <p className="mt-4 max-w-[400px] text-[12px] leading-5 text-white/66">Car, truck, motorcycle, rideshare, pedestrian, premises, wrongful death, and serious injury claims.</p>
              <div className="mt-6 inline-flex items-center gap-2 text-[12px] font-semibold">View case types <ArrowRight className="h-4 w-4" /></div>
            </div>
          </a>
        </div>
      </div>
    </section>

    <section className="bg-white py-16 md:py-24">
      <div className="site-shell grid overflow-hidden bg-[#ece9e3] lg:grid-cols-[0.92fr_1.08fr]">
        <div className="relative min-h-[460px] lg:min-h-[620px]"><img src={leadCounselImage} alt="Howard Choi" loading="lazy" className="absolute inset-0 h-full w-full object-cover object-top" /></div>
        <div className="flex flex-col justify-center p-7 md:p-10 lg:p-14">
          <div className="text-[10px] font-semibold uppercase tracking-[0.16em] text-black/40">Howard Choi · Attorney</div>
          <h2 className="editorial-serif mt-5 text-[clamp(2.3rem,4.5vw,4.5rem)] leading-[0.96] tracking-[-0.04em]">Clear advice when the situation feels anything but clear.</h2>
          <p className="mt-6 max-w-[520px] text-[14px] leading-6 text-black/56">The goal is simple: understand the facts, explain the options plainly, and keep the client close to the decisions that matter.</p>
          <div className="mt-8 flex flex-wrap gap-3">
            <a href="/attorney" className="inline-flex min-h-11 items-center gap-2 bg-[#171717] px-5 text-[11px] font-semibold text-white">Meet Howard <ArrowRight className="h-4 w-4" /></a>
            <a href="https://apps.calbar.ca.gov/attorney/Licensee/Detail/284364" target="_blank" rel="noreferrer" className="inline-flex min-h-11 items-center border border-black/15 px-5 text-[11px] font-semibold">Verify State Bar</a>
          </div>
        </div>
      </div>
    </section>

    <section className="bg-[#f2f0eb] py-16 md:py-24">
      <div className="site-shell">
        <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
          <SectionIntro eyebrow="Resources" title="Clear answers before the next decision." body="Short, useful guides on case value, deadlines, insurance, fault, and what to preserve after an accident." />
          <a href="/blogs" className="inline-flex items-center gap-2 text-[12px] font-semibold">Explore resources <ArrowRight className="h-4 w-4" /></a>
        </div>
        <div className="mt-10 grid gap-px bg-black/10 md:grid-cols-3">
          {[
            ["Case value", "What can actually move a California personal injury case value up or down?", "/blogs/how-much-is-my-personal-injury-case-worth-california"],
            ["Deadlines", "How long do you have to bring a California personal injury claim?", "/blogs/california-personal-injury-deadlines"],
            ["Fault", "What happens when both sides share responsibility for an accident?", "/blogs/california-comparative-fault-personal-injury"],
          ].map(([label, title, link]) => (
            <a key={link} href={link} className="group min-h-[250px] bg-[#f2f0eb] p-6 md:p-7">
              <div className="text-[10px] font-semibold uppercase tracking-[0.14em] text-black/38">{label}</div>
              <h3 className="editorial-serif mt-10 text-[1.75rem] leading-[1.05] tracking-[-0.03em]">{title}</h3>
              <div className="mt-8 inline-flex items-center gap-2 text-[11px] font-semibold">Read guide <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" /></div>
            </a>
          ))}
        </div>
      </div>
    </section>

    <section className="bg-white py-16 md:py-24">
      <div className="site-shell grid gap-10 lg:grid-cols-[0.75fr_1.25fr] lg:gap-16">
        <SectionIntro eyebrow="Frequently asked" title="Start with the question on your mind." />
        <div className="border-t border-black/12">
          {[
            ["Do I need a lawyer after an accident?", "Not every injury claim needs the same level of legal help. A consultation can clarify liability, insurance, deadlines, and whether professional representation would add value."],
            ["What should I keep after a crash?", "Save scene photos, reports, insurance information, treatment records, bills, wage-loss documents, and important messages or letters related to the accident."],
            ["How much is my case worth?", "Case value depends on the supported losses, injury and treatment, future needs, fault, coverage, liens, and the strength of the evidence. A calculator can only provide an educational starting point."],
            ["Can I speak in Korean?", "Yes. Important conversations can be handled in Korean or English."],
          ].map(([question, answer]) => (
            <details key={question} className="group border-b border-black/12 py-5">
              <summary className="flex cursor-pointer list-none items-center justify-between gap-5 text-[15px] font-semibold marker:hidden">{question}<span className="text-xl font-light transition-transform group-open:rotate-45">+</span></summary>
              <p className="max-w-[650px] pt-4 text-[12px] leading-6 text-black/52">{answer}</p>
            </details>
          ))}
        </div>
      </div>
    </section>

    <section className="bg-[#171717] py-16 text-white md:py-20">
      <div className="site-shell flex flex-col gap-8 md:flex-row md:items-end md:justify-between">
        <div>
          <div className="text-[10px] font-semibold uppercase tracking-[0.16em] text-white/42">Free consultation</div>
          <h2 className="editorial-serif mt-4 max-w-[760px] text-[clamp(2.5rem,5vw,5rem)] leading-[0.94] tracking-[-0.04em]">You bring the story. We’ll help make the next step clear.</h2>
        </div>
        <div className="shrink-0">
          <a href="/contact" className="inline-flex min-h-12 items-center gap-3 bg-white px-6 text-[12px] font-semibold text-[#171717]">Start a conversation <ArrowRight className="h-4 w-4" /></a>
          <div className="mt-3 text-[11px] text-white/50">714-690-0007 · Buena Park</div>
        </div>
      </div>
    </section>
  </>
);

export default HomeSections;
