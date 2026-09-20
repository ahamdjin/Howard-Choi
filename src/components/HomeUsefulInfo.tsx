import { ArrowUpRight } from "lucide-react";

const topics = [
  {
    number: "01",
    title: "What should I do after an accident?",
    body: "Start with safety and appropriate medical care, then preserve the information that may later explain what happened and what the injury changed.",
    href: "/blogs/what-to-do-after-a-car-accident-in-california",
  },
  {
    number: "02",
    title: "How long do I have to take legal action?",
    body: "California injury claims can involve strict filing and notice deadlines, and the correct deadline can change with the facts and the parties involved.",
    href: "/blogs/california-personal-injury-deadlines",
  },
  {
    number: "03",
    title: "What insurance may apply?",
    body: "Coverage can involve liability insurance, vehicle-owner or commercial policies, and uninsured or underinsured motorist coverage depending on the accident.",
    href: "/practice-areas/car-accidents",
  },
  {
    number: "04",
    title: "What can affect the value of an injury claim?",
    body: "Treatment, lost income, future care, long-term limitations, pain, available insurance, liability, and the strength of the evidence can all matter.",
    href: "/case-value-calculator",
  },
];

const HomeUsefulInfo = () => (
  <section aria-labelledby="home-info-heading" className="bg-[#f3efe8] py-24 text-foreground md:py-28 lg:py-32">
    <div className="site-shell">
      <div className="grid gap-14 lg:grid-cols-[0.72fr_1.28fr] lg:gap-20">
        <div>
          <div className="text-[10px] uppercase tracking-[0.16em] text-foreground/36">Before your first call</div>
          <h2 id="home-info-heading" className="editorial-serif mt-5 max-w-[520px] text-[clamp(3rem,4.8vw,5.2rem)] leading-[0.93] tracking-[-0.035em]">
            A few things worth knowing early.
          </h2>
          <p className="mt-6 max-w-[430px] text-[13px] leading-6 text-foreground/50">
            Short, practical starting points for understanding an injury claim before or after a consultation.
          </p>
        </div>

        <div className="border-t border-foreground/14">
          {topics.map((topic) => (
            <a
              key={topic.number}
              href={topic.href}
              className="group grid gap-4 border-b border-foreground/12 py-7 sm:grid-cols-[42px_1fr_auto] sm:items-start md:py-8"
            >
              <span className="pt-1 text-[9px] tabular-nums text-foreground/26">{topic.number}</span>
              <div>
                <h3 className="editorial-serif text-[clamp(1.55rem,2.4vw,2.45rem)] leading-[1.05] tracking-[-0.02em]">{topic.title}</h3>
                <p className="mt-3 max-w-[660px] text-[12px] leading-6 text-foreground/50">{topic.body}</p>
              </div>
              <ArrowUpRight className="mt-1 h-4 w-4 text-foreground/30 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
            </a>
          ))}
        </div>
      </div>
    </div>
  </section>
);

export default HomeUsefulInfo;
