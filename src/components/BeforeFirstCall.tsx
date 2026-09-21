import { ArrowUpRight } from "lucide-react";

const steps = [
  {
    number: "01",
    title: "Get medical attention.",
    body: "See a doctor even if you feel alright at the scene. Some injuries show up a day or two later, and a gap between the accident and your first visit is the first thing an insurer will point to.",
  },
  {
    number: "02",
    title: "Save photos, reports, and witness details.",
    body: "Pictures of the scene and the damage, the police or incident report number, the other driver's insurance information, and the name of anyone who saw it. Nearby camera footage is often gone within days.",
  },
  {
    number: "03",
    title: "Be careful what you sign or say.",
    body: "You are not required to give a recorded statement to the other side's insurer, and a quick settlement check often comes with a release that closes your claim for good. Read it before you sign it.",
  },
  {
    number: "04",
    title: "Know that deadlines apply.",
    body: "California usually allows two years from the date of injury to file a personal injury lawsuit, and claims against a city or other public agency can require written notice in a matter of months.",
  },
];

const BeforeFirstCall = () => (
  <section id="before-your-call" aria-labelledby="home-info-heading" className="bg-[#f3efe8] py-20 text-foreground md:py-24 lg:py-28">
    <div className="site-shell">
      <div className="grid gap-14 lg:grid-cols-[0.72fr_1.28fr] lg:gap-20">
        <div>
          <div className="text-[10px] uppercase tracking-[0.16em] text-foreground/36">Before your first call</div>
          <h2 id="home-info-heading" className="editorial-serif mt-5 max-w-[520px] text-[clamp(2.5rem,4.4vw,4.8rem)] leading-[0.94] tracking-[-0.035em]">
            What should I do after an accident?
          </h2>
          <p className="mt-6 max-w-[430px] text-[14px] leading-7 text-foreground/52">
            Four practical steps that protect your health and your claim, whether or not you ever decide to hire a lawyer.
          </p>

          <div className="mt-8 flex flex-col gap-3">
            <a
              href="/blogs/what-to-do-after-a-car-accident-in-california"
              className="inline-flex items-center gap-2 text-[11px] font-medium underline underline-offset-4"
            >
              Read the full guide <ArrowUpRight className="h-3.5 w-3.5" />
            </a>
            <a
              href="/blogs/california-personal-injury-deadlines"
              className="inline-flex items-center gap-2 text-[11px] text-foreground/62 underline underline-offset-4"
            >
              California injury deadlines <ArrowUpRight className="h-3.5 w-3.5" />
            </a>
          </div>
        </div>

        <div className="border-t border-foreground/14">
          {steps.map((step) => (
            <div
              key={step.number}
              className="grid gap-4 border-b border-foreground/12 py-7 sm:grid-cols-[42px_1fr] sm:items-start md:py-8"
            >
              <span className="pt-1 text-[9px] tabular-nums text-foreground/26">{step.number}</span>
              <div>
                <h3 className="editorial-serif text-[clamp(1.5rem,2.3vw,2.3rem)] leading-[1.06] tracking-[-0.02em]">
                  {step.title}
                </h3>
                <p className="mt-3 max-w-[660px] text-[13px] leading-6 text-foreground/54">{step.body}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  </section>
);

export default BeforeFirstCall;
