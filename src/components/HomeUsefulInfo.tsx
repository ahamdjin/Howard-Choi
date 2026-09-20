import { ArrowUpRight } from "lucide-react";

const topics = [
  {
    number: "01",
    title: "What to do after an accident",
    body: "Start with safety and medical care, then preserve photos, reports, witness details, insurance information, and records of treatment and missed work.",
    href: "/blogs/what-to-do-after-a-car-accident-in-california",
    link: "Read the accident guide",
  },
  {
    number: "02",
    title: "California injury deadlines",
    body: "Many personal injury lawsuits have a two-year filing deadline, but shorter deadlines can apply in some situations, including claims involving public entities.",
    href: "/blogs/california-personal-injury-deadlines",
    link: "Understand the deadlines",
  },
  {
    number: "03",
    title: "Insurance & coverage",
    body: "A claim can involve liability coverage, vehicle-owner policies, commercial coverage, and uninsured or underinsured motorist coverage depending on the facts.",
    href: "/practice-areas/car-accidents",
    link: "See how coverage can matter",
  },
  {
    number: "04",
    title: "Damages & case value",
    body: "Medical expenses are only part of the picture. Lost income, future care, long-term limitations, pain, insurance limits, and evidence can all affect a claim.",
    href: "/case-value-calculator",
    link: "Explore case-value factors",
  },
];

const HomeUsefulInfo = () => (
  <section aria-labelledby="home-info-heading" className="bg-[#f7f6f3] py-16 text-foreground md:py-20">
    <div className="site-shell">
      <div className="max-w-[720px]">
        <div className="text-[10px] font-medium uppercase tracking-[0.16em] text-foreground/40">Useful personal injury information</div>
        <h2 id="home-info-heading" className="editorial-serif mt-4 text-[clamp(2.6rem,4vw,4.5rem)] leading-[0.96] tracking-[-0.03em]">
          The questions that usually matter first.
        </h2>
        <p className="mt-5 max-w-[560px] text-[13px] leading-6 text-foreground/55">
          Practical starting points for understanding the claim process before or after a consultation.
        </p>
      </div>

      <div className="mt-10 grid border-t border-foreground/12 md:grid-cols-2">
        {topics.map((topic, index) => (
          <article key={topic.title} className={`border-b border-foreground/12 py-7 md:px-7 ${index % 2 === 0 ? "md:border-r md:pl-0" : ""}`}>
            <div className="text-[9px] tabular-nums text-foreground/28">{topic.number}</div>
            <h3 className="editorial-serif mt-6 text-[1.7rem] leading-tight">{topic.title}</h3>
            <p className="mt-3 max-w-[520px] text-[12px] leading-6 text-foreground/52">{topic.body}</p>
            <a href={topic.href} className="mt-5 inline-flex items-center gap-2 text-[11px] font-medium underline underline-offset-4">
              {topic.link} <ArrowUpRight className="h-3.5 w-3.5" />
            </a>
          </article>
        ))}
      </div>
    </div>
  </section>
);

export default HomeUsefulInfo;
